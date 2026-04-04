import "../../vendor/mikuscore/src/ts/main";

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
  hide("#loadSample1Btn");
  hide("#loadSample2Btn");
  hide("#loadSample3Btn");
  hide("#loadSample4Btn");
  hide("#loadSampleBtn6");
  hide("#loadSample7Btn");

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
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyAbcPlayerRestrictions, { once: true });
} else {
  applyAbcPlayerRestrictions();
}
