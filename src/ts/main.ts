import "../../vendor/mikuscore/src/ts/main";
import { exportMusicXmlDomToAbc } from "../../vendor/mikuscore/src/ts/abc-io";
import { parseMusicXmlDocument } from "../../vendor/mikuscore/src/ts/musicxml-io";
import { sampleXml1 } from "../../vendor/mikuscore/src/ts/sampleXml1";
import { sampleXml2 } from "../../vendor/mikuscore/src/ts/sampleXml2";
import { sampleXml3 } from "../../vendor/mikuscore/src/ts/sampleXml3";
import { sampleXml4 } from "../../vendor/mikuscore/src/ts/sampleXml4";
import { sampleXml6 } from "../../vendor/mikuscore/src/ts/sampleXml6";
import { sampleXml7 } from "../../vendor/mikuscore/src/ts/sampleXml7";

const q = <T extends Element>(selector: string): T | null => document.querySelector(selector) as T | null;
const qa = <T extends Element>(selector: string): T[] => Array.from(document.querySelectorAll(selector)) as T[];

const hide = (selector: string): void => {
  for (const el of qa<HTMLElement>(selector)) {
    el.classList.add("md-hidden");
    el.setAttribute("hidden", "");
  }
};

const setText = (selector: string, value: string): void => {
  const el = q<HTMLElement>(selector);
  if (el) el.textContent = value;
};

const convertSampleXmlToAbc = (xml: string): string => {
  const doc = parseMusicXmlDocument(xml);
  if (!doc) throw new Error("Failed to parse built-in sample MusicXML.");
  return exportMusicXmlDomToAbc(doc);
};

const loadSampleAbc = (xml: string): void => {
  const inputEntrySource = q<HTMLInputElement>("#inputEntrySource");
  const inputEntryFile = q<HTMLInputElement>("#inputEntryFile");
  const sourceTypeAbc = q<HTMLInputElement>("#sourceTypeAbc");
  const abcInput = q<HTMLTextAreaElement>("#abcInput");
  const loadBtn = q<HTMLButtonElement>("#loadBtn");

  if (inputEntrySource) inputEntrySource.checked = true;
  if (inputEntryFile) inputEntryFile.checked = false;
  if (sourceTypeAbc) sourceTypeAbc.checked = true;

  inputEntrySource?.dispatchEvent(new Event("change", { bubbles: true }));
  sourceTypeAbc?.dispatchEvent(new Event("change", { bubbles: true }));

  if (abcInput) {
    abcInput.value = convertSampleXmlToAbc(xml);
    abcInput.dispatchEvent(new Event("input", { bubbles: true }));
  }

  loadBtn?.click();
};

const applyAbcPlayerRestrictions = (): void => {
  document.title = "mikuku's abc-player";

  setText(".ms-hero-title > span:nth-of-type(2)", "mikuku's abc-player");

  const inputHelp = q<HTMLElement>('lht-help-tooltip[label="Input help"] .ms-section-help-tooltip');
  if (inputHelp) {
    inputHelp.textContent =
      "Load your ABC here from file or source text. abc-player restricts input to ABC while keeping score preview, playback, lightweight edit, and output workflows available after loading.";
  }

  const inputEntryNew = q<HTMLInputElement>("#inputEntryNew");
  const inputEntrySource = q<HTMLInputElement>("#inputEntrySource");
  const inputEntryFile = q<HTMLInputElement>("#inputEntryFile");
  const sourceTypeAbc = q<HTMLInputElement>("#sourceTypeAbc");
  const sourceTypeXml = q<HTMLInputElement>("#sourceTypeXml");
  const sourceTypeMuseScore = q<HTMLInputElement>("#sourceTypeMuseScore");
  const sourceTypeVsqx = q<HTMLInputElement>("#sourceTypeVsqx");
  const sourceTypeMei = q<HTMLInputElement>("#sourceTypeMei");
  const sourceTypeLilyPond = q<HTMLInputElement>("#sourceTypeLilyPond");

  if (sourceTypeAbc) sourceTypeAbc.checked = true;
  if (sourceTypeXml) sourceTypeXml.checked = false;
  if (sourceTypeMuseScore) sourceTypeMuseScore.checked = false;
  if (sourceTypeVsqx) sourceTypeVsqx.checked = false;
  if (sourceTypeMei) sourceTypeMei.checked = false;
  if (sourceTypeLilyPond) sourceTypeLilyPond.checked = false;

  if (inputEntryNew) {
    const label = inputEntryNew.closest("label");
    if (label) {
      label.classList.add("md-hidden");
      label.setAttribute("hidden", "");
    }
    inputEntryNew.disabled = true;
    inputEntryNew.checked = false;
  }

  hide("#sourceTypeBlock");
  hide("#newInputBlock");
  hide("#sourceXmlInputBlock");
  hide("#museScoreInputBlock");
  hide("#vsqxInputBlock");
  hide("#meiInputBlock");
  hide("#lilyPondInputBlock");
  hide("#zipEntrySelectBlock");
  hide("#copyAiJsonPromptBtn");
  hide("#downloadMeasureJsonBtn");

  const fileInput = q<HTMLInputElement>("#fileInput");
  if (fileInput) {
    fileInput.setAttribute("accept", ".abc,text/vnd.abc,application/abc,text/x-abc,text/plain");
  }

  const fileSelect = q<HTMLElement>("lht-file-select");
  if (fileSelect) {
    fileSelect.setAttribute("accept", ".abc,text/vnd.abc,application/abc,text/x-abc,text/plain");
  }

  if (inputEntryFile && !inputEntrySource?.checked) {
    inputEntryFile.checked = true;
  }

  const refresh = (): void => {
    if (sourceTypeAbc) {
      sourceTypeAbc.checked = true;
      sourceTypeAbc.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  inputEntryFile?.addEventListener("change", refresh);
  inputEntrySource?.addEventListener("change", refresh);
  refresh();

  const sampleBindings: Array<[string, string]> = [
    ["#loadSample1Btn", sampleXml1],
    ["#loadSample2Btn", sampleXml2],
    ["#loadSample3Btn", sampleXml3],
    ["#loadSample4Btn", sampleXml4],
    ["#loadSampleBtn6", sampleXml6],
    ["#loadSample7Btn", sampleXml7],
  ];

  for (const [selector, xml] of sampleBindings) {
    const button = q<HTMLButtonElement>(selector);
    if (!button) continue;
    button.classList.remove("md-hidden");
    button.removeAttribute("hidden");
    button.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        loadSampleAbc(xml);
      },
      true
    );
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyAbcPlayerRestrictions, { once: true });
} else {
  applyAbcPlayerRestrictions();
}
