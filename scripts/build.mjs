import { existsSync, readFileSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const ENTRY_TS = "src/ts/main.ts";
const ENTRY_JS = ENTRY_TS.replace(/\.ts$/, ".js");
const TEMPLATE = "abc-player-src.html";
const DIST = "abc-player.html";
const INDEX_TEMPLATE = "index-src.html";
const INDEX_DIST = "index.html";
const TMP_DIR = ".abc-player-build";

const normalize = (p) => p.split(path.sep).join("/");
const toAbs = (relPath) => path.join(ROOT, relPath);
const readText = (relPath) => readFileSync(toAbs(relPath), "utf8");
const buildDateText = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const importRe =
  /(?:import|export)\s+[^"']*?from\s+["'](.+?)["']|import\s*\(\s*["'](.+?)["']\s*\)|import\s+["'](.+?)["']/g;

const resolveTsModule = (fromId, specifier) => {
  if (!specifier.startsWith(".")) return null;
  const fromDir = path.dirname(fromId);
  const candidateBase = normalize(path.join(fromDir, specifier));
  const tsFile = `${candidateBase}.ts`;
  const indexTs = `${candidateBase}/index.ts`;
  if (existsSync(toAbs(tsFile))) return tsFile;
  if (existsSync(toAbs(indexTs))) return indexTs;
  throw new Error(`Cannot resolve module: ${specifier} (from ${fromId})`);
};

const collectGraph = () => {
  const queue = [ENTRY_TS];
  const seen = new Set();
  const order = [];

  while (queue.length > 0) {
    const id = queue.pop();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    order.push(id);

    const src = readText(id);
    importRe.lastIndex = 0;
    for (;;) {
      const match = importRe.exec(src);
      if (!match) break;
      const spec = match[1] ?? match[2] ?? match[3];
      if (!spec) continue;
      const resolved = resolveTsModule(id, spec);
      if (resolved) queue.push(resolved);
    }
  }

  return order;
};

const compileWithTsc = (tsModules) => {
  rmSync(toAbs(TMP_DIR), { recursive: true, force: true });
  mkdirSync(toAbs(TMP_DIR), { recursive: true });

  execFileSync(
    "tsc",
    [
      "--target",
      "ES2018",
      "--module",
      "CommonJS",
      "--lib",
      "DOM,DOM.Iterable,ES2018",
      "--strict",
      "--skipLibCheck",
      "--moduleResolution",
      "node",
      "--outDir",
      TMP_DIR,
      "--rootDir",
      ".",
      ...tsModules,
    ],
    { cwd: ROOT, stdio: "pipe" }
  );
};

const bundle = (tsModules) => {
  const moduleEntries = tsModules
    .map((tsId) => {
      const jsId = tsId.replace(/\.ts$/, ".js");
      const compiled = normalize(path.join(TMP_DIR, jsId));
      return `  ${JSON.stringify(jsId)}: function (require, module, exports) {\n${readText(compiled)}\n  }`;
    })
    .join(",\n");

  return `(function () {\nconst modules = {\n${moduleEntries}\n};\nconst cache = {};\nfunction normalizePath(p) {\n  const parts = [];\n  for (const part of p.split('/')) {\n    if (!part || part === '.') continue;\n    if (part === '..') parts.pop();\n    else parts.push(part);\n  }\n  return parts.join('/');\n}\nfunction resolve(fromId, specifier) {\n  if (!specifier.startsWith('.')) throw new Error('External module is not allowed: ' + specifier);\n  const fromParts = fromId.split('/');\n  fromParts.pop();\n  const resolvedBase = normalizePath(fromParts.concat(specifier.split('/')).join('/'));\n  const candidates = [resolvedBase + '.js', resolvedBase + '/index.js'];\n  for (const c of candidates) if (Object.prototype.hasOwnProperty.call(modules, c)) return c;\n  throw new Error('Cannot resolve module at runtime: ' + specifier + ' from ' + fromId);\n}\nfunction load(id) {\n  if (cache[id]) return cache[id].exports;\n  const factory = modules[id];\n  if (!factory) throw new Error('Unknown module: ' + id);\n  const module = { exports: {} };\n  cache[id] = module;\n  const localRequire = function (specifier) { return load(resolve(id, specifier)); };\n  factory(localRequire, module, module.exports);\n  return module.exports;\n}\nload(${JSON.stringify(ENTRY_JS)});\n})();\n`;
};

const inlineTemplate = (jsBundle) => {
  const template = readText(TEMPLATE);
  const replacements = [
    {
      search: /<link[^>]*href="vendor\/mikuscore\/lht-cmn\/css\/components\.css"[^>]*>/,
      value: `<style>\n${readText("vendor/mikuscore/lht-cmn/css/components.css")}\n</style>`,
    },
    {
      search: /<link[^>]*href="vendor\/mikuscore\/src\/css\/app\.css"[^>]*>/,
      value: `<style>\n${readText("vendor/mikuscore/src/css/app.css")}\n</style>`,
    },
    {
      search: /<script\s+src="vendor\/mikuscore\/src\/js\/verovio\.js"><\/script>/,
      value: `<script>\n${readText("vendor/mikuscore/src/js/verovio.js")}\n</script>`,
    },
    {
      search: /<script\s+src="vendor\/mikuscore\/src\/js\/midi-writer\.js"><\/script>/,
      value: `<script>\n${readText("vendor/mikuscore/src/js/midi-writer.js")}\n</script>`,
    },
    {
      search: /<script\s+src="vendor\/mikuscore\/src\/vendor\/utaformatix3\/utaformatix3-ts-plus\.mikuscore\.iife\.js"><\/script>/,
      value: `<script>\n${readText("vendor/mikuscore/src/vendor/utaformatix3/utaformatix3-ts-plus.mikuscore.iife.js")}\n</script>`,
    },
    {
      search: /<script\s+src="vendor\/mikuscore\/lht-cmn\/js\/components\.js"><\/script>/,
      value: `<script>\n${readText("vendor/mikuscore/lht-cmn/js/components.js")}\n</script>`,
    },
    {
      search: /<script\s+src="src\/js\/main\.js"><\/script>/,
      value: `<script>\n${jsBundle}\n</script>`,
    },
  ];

  let html = template;
  for (const replacement of replacements) {
    html = html.replace(replacement.search, replacement.value);
  }
  return html;
};

const run = () => {
  const tsModules = collectGraph();
  compileWithTsc(tsModules);
  const jsBundle = bundle(tsModules);
  writeFileSync(toAbs(DIST), inlineTemplate(jsBundle), "utf8");
  if (existsSync(toAbs(INDEX_TEMPLATE))) {
    const indexHtml = readText(INDEX_TEMPLATE).replaceAll("{{BUILD_DATE}}", buildDateText());
    writeFileSync(toAbs(INDEX_DIST), indexHtml, "utf8");
  }
  rmSync(toAbs(TMP_DIR), { recursive: true, force: true });
};

run();
