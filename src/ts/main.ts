import "../../vendor/mikuscore/src/ts/main";
import { sampleXml1 } from "../../vendor/mikuscore/src/ts/sampleXml1";
import { sampleXml2 } from "../../vendor/mikuscore/src/ts/sampleXml2";
import { sampleXml3 } from "../../vendor/mikuscore/src/ts/sampleXml3";
import { sampleXml4 } from "../../vendor/mikuscore/src/ts/sampleXml4";
import { sampleXml6 } from "../../vendor/mikuscore/src/ts/sampleXml6";
import { sampleXml7 } from "../../vendor/mikuscore/src/ts/sampleXml7";
import { getAbcParamFromUrl, loadAbcSourceIntoDocument, loadSampleAbcIntoDocument } from "./abc-player-integration";

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

const applyAbcPlayerRestrictions = (): void => {
  document.title = "miku-abc-player";

  setText(".ms-hero-title > span:nth-of-type(2)", "miku-abc-player");

  const inputHelp = q<HTMLElement>('lht-help-tooltip[label="Input help"] .ms-section-help-tooltip');
  if (inputHelp) {
    inputHelp.textContent =
      "Load ABC directly, or load another supported file and open it as ABC. Non-ABC inputs are normalized through MusicXML before preview, playback, lightweight edit, and output workflows continue.";
  }

  const inputEntryNew = q<HTMLInputElement>("#inputEntryNew");
  const inputEntrySource = q<HTMLInputElement>("#inputEntrySource");
  const inputEntryFile = q<HTMLInputElement>("#inputEntryFile");
  const sourceTypeAbc = q<HTMLInputElement>("#sourceTypeAbc");
  const sourceTypeMuseScore = q<HTMLInputElement>("#sourceTypeMuseScore");
  const sourceTypeVsqx = q<HTMLInputElement>("#sourceTypeVsqx");
  const sourceTypeMei = q<HTMLInputElement>("#sourceTypeMei");
  const sourceTypeLilyPond = q<HTMLInputElement>("#sourceTypeLilyPond");

  if (sourceTypeAbc) sourceTypeAbc.checked = true;
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

  if (inputEntrySource) {
    inputEntrySource.checked = true;
  }
  if (inputEntryFile) {
    inputEntryFile.checked = false;
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

  const initialAbc = getAbcParamFromUrl(window.location.href);
  if (initialAbc) {
    loadAbcSourceIntoDocument(document, initialAbc);
  }

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
        loadSampleAbcIntoDocument(document, xml);
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
