// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { loadSampleAbcIntoDocument } from "../../src/ts/abc-player-integration";

describe("abc-player integration helpers", () => {
  it("loads sample ABC into the DOM flow used by abc-player", () => {
    document.body.innerHTML = `
      <label><input id="inputEntryFile" type="radio" name="inputEntry" checked></label>
      <label><input id="inputEntrySource" type="radio" name="inputEntry"></label>
      <label><input id="sourceTypeAbc" type="radio" name="sourceType"></label>
      <textarea id="abcInput"></textarea>
      <button id="loadBtn" type="button">Load</button>
    `;

    const inputEntrySource = document.querySelector<HTMLInputElement>("#inputEntrySource");
    const inputEntryFile = document.querySelector<HTMLInputElement>("#inputEntryFile");
    const sourceTypeAbc = document.querySelector<HTMLInputElement>("#sourceTypeAbc");
    const abcInput = document.querySelector<HTMLTextAreaElement>("#abcInput");
    const loadBtn = document.querySelector<HTMLButtonElement>("#loadBtn");

    expect(inputEntrySource).not.toBeNull();
    expect(inputEntryFile).not.toBeNull();
    expect(sourceTypeAbc).not.toBeNull();
    expect(abcInput).not.toBeNull();
    expect(loadBtn).not.toBeNull();
    if (!inputEntrySource || !inputEntryFile || !sourceTypeAbc || !abcInput || !loadBtn) return;

    const sourceChange = vi.fn();
    const abcChange = vi.fn();
    const abcInputEvent = vi.fn();
    const loadClick = vi.fn();

    inputEntrySource.addEventListener("change", sourceChange);
    sourceTypeAbc.addEventListener("change", abcChange);
    abcInput.addEventListener("input", abcInputEvent);
    loadBtn.addEventListener("click", loadClick);

    loadSampleAbcIntoDocument(document, "<score-partwise/>", () => "X:1\nT:Sample\nM:4/4\nL:1/8\nK:C\nC D E F |");

    expect(inputEntrySource.checked).toBe(true);
    expect(inputEntryFile.checked).toBe(false);
    expect(sourceTypeAbc.checked).toBe(true);
    expect(abcInput.value).toContain("X:1");
    expect(abcInput.value).toContain("K:C");
    expect(sourceChange).toHaveBeenCalledTimes(1);
    expect(abcChange).toHaveBeenCalledTimes(1);
    expect(abcInputEvent).toHaveBeenCalledTimes(1);
    expect(loadClick).toHaveBeenCalledTimes(1);
  });
});
