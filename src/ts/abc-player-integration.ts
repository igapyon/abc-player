import { exportMusicXmlDomToAbc } from "../../vendor/mikuscore/src/ts/abc-io";
import { parseMusicXmlDocument } from "../../vendor/mikuscore/src/ts/musicxml-io";

const q = <T extends Element>(root: ParentNode, selector: string): T | null => {
  return root.querySelector(selector) as T | null;
};

export const convertSampleXmlToAbc = (xml: string): string => {
  const doc = parseMusicXmlDocument(xml);
  if (!doc) throw new Error("Failed to parse built-in sample MusicXML.");
  return exportMusicXmlDomToAbc(doc);
};

export const getAbcParamFromUrl = (href: string): string | null => {
  const url = new URL(href, "https://example.invalid");
  const abc = url.searchParams.get("abc");
  return abc && abc.length > 0 ? abc : null;
};

export const loadAbcSourceIntoDocument = (root: Document | HTMLElement, abcSource: string): void => {
  const inputEntrySource = q<HTMLInputElement>(root, "#inputEntrySource");
  const inputEntryFile = q<HTMLInputElement>(root, "#inputEntryFile");
  const sourceTypeAbc = q<HTMLInputElement>(root, "#sourceTypeAbc");
  const abcInput = q<HTMLTextAreaElement>(root, "#abcInput");
  const loadBtn = q<HTMLButtonElement>(root, "#loadBtn");

  if (inputEntrySource) inputEntrySource.checked = true;
  if (inputEntryFile) inputEntryFile.checked = false;
  if (sourceTypeAbc) sourceTypeAbc.checked = true;

  inputEntrySource?.dispatchEvent(new Event("change", { bubbles: true }));
  sourceTypeAbc?.dispatchEvent(new Event("change", { bubbles: true }));

  if (abcInput) {
    abcInput.value = abcSource;
    abcInput.dispatchEvent(new Event("input", { bubbles: true }));
  }

  loadBtn?.click();
};

export const loadSampleAbcIntoDocument = (
  root: Document | HTMLElement,
  xml: string,
  toAbc: (sourceXml: string) => string = convertSampleXmlToAbc
): void => {
  loadAbcSourceIntoDocument(root, toAbc(xml));
};
