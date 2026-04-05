// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { ScoreCore } from "../../vendor/mikuscore/core/ScoreCore";
import { convertAbcToMusicXml, exportMusicXmlDomToAbc } from "../../vendor/mikuscore/src/ts/abc-io";
import { parseMusicXmlDocument } from "../../vendor/mikuscore/src/ts/musicxml-io";
import { sampleXml6 } from "../../vendor/mikuscore/src/ts/sampleXml6";
import { sampleXml7 } from "../../vendor/mikuscore/src/ts/sampleXml7";

const convertSampleXmlToAbc = (xml: string): string => {
  const doc = parseMusicXmlDocument(xml);
  if (!doc) throw new Error("Failed to parse sample MusicXML.");
  return exportMusicXmlDomToAbc(doc);
};

describe("abc-player acceptance for vendored abc-io", () => {
  it("accepts ABC alternate ending markers used by real-world inputs", () => {
    const abc = `X:1
T:Alternate endings
M:4/4
L:1/8
K:C
|: C D E F |
[1 G A B c :|]
[2 c B A G ||`;

    const xml = convertAbcToMusicXml(abc);
    const outDoc = parseMusicXmlDocument(xml);
    expect(outDoc).not.toBeNull();
    if (!outDoc) return;

    const notes = Array.from(outDoc.querySelectorAll("part > measure > note"));
    expect(notes.length).toBeGreaterThan(0);
    expect(outDoc.querySelector('miscellaneous-field[name="mks:diag:count"]')).toBeNull();

    const core = new ScoreCore();
    core.load(xml);
    const save = core.save();
    expect(save.ok).toBe(true);
  });

  it("keeps overfull ABC import in compatibility mode loadable for abc-player", () => {
    const abc = `X:1
T:Overfull
M:4/4
L:1/8
K:C
V:1
C D E F G A B c d |`;

    const xml = convertAbcToMusicXml(abc);
    const outDoc = parseMusicXmlDocument(xml);
    expect(outDoc).not.toBeNull();
    if (!outDoc) return;

    expect(outDoc.querySelectorAll("part > measure").length).toBeGreaterThanOrEqual(2);
    expect(
      outDoc.querySelector('miscellaneous-field[name="mks:diag:0001"]')?.textContent
    ).toContain("code=OVERFULL_REFLOWED");

    const core = new ScoreCore();
    core.load(xml);
    const save = core.save();
    expect(save.ok).toBe(true);
  });

  it("preserves slur, tie, and tuplet semantics through the ABC path", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1"><part-name>Lead</part-name></score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>960</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>
      <note>
        <pitch><step>C</step><octave>4</octave></pitch>
        <duration>320</duration><voice>1</voice><type>eighth</type>
        <time-modification><actual-notes>3</actual-notes><normal-notes>2</normal-notes></time-modification>
        <notations>
          <tuplet type="start" number="1"/>
          <slur type="start" number="1"/>
        </notations>
      </note>
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>320</duration><voice>1</voice><type>eighth</type>
        <time-modification><actual-notes>3</actual-notes><normal-notes>2</normal-notes></time-modification>
        <tie type="start"/><notations><tied type="start"/></notations>
      </note>
      <note>
        <pitch><step>D</step><octave>4</octave></pitch>
        <duration>320</duration><voice>1</voice><type>eighth</type>
        <time-modification><actual-notes>3</actual-notes><normal-notes>2</normal-notes></time-modification>
        <tie type="stop"/><notations><tied type="stop"/><tuplet type="stop" number="1"/><slur type="stop" number="1"/></notations>
      </note>
      <note><rest/><duration>2880</duration><voice>1</voice><type>half</type><type>quarter</type></note>
    </measure>
  </part>
</score-partwise>`;

    const srcDoc = parseMusicXmlDocument(xml);
    expect(srcDoc).not.toBeNull();
    if (!srcDoc) return;

    const abc = exportMusicXmlDomToAbc(srcDoc);
    expect(abc).toContain("(3:2:3");
    expect(abc).toContain("(");
    expect(abc).toContain(")");
    expect(abc).toContain("-");

    const roundtripXml = convertAbcToMusicXml(abc);
    const outDoc = parseMusicXmlDocument(roundtripXml);
    expect(outDoc).not.toBeNull();
    if (!outDoc) return;

    expect(outDoc.querySelector('note > notations > tuplet[type="start"]')).not.toBeNull();
    expect(outDoc.querySelector('note > notations > tuplet[type="stop"]')).not.toBeNull();
    expect(outDoc.querySelector('note > notations > slur[type="start"]')).not.toBeNull();
    expect(outDoc.querySelector('note > notations > slur[type="stop"]')).not.toBeNull();
    expect(outDoc.querySelector('note > tie[type="start"]')).not.toBeNull();
    expect(outDoc.querySelector('note > tie[type="stop"]')).not.toBeNull();
  });

  it("retains abc-player-relevant mks metadata in the ABC roundtrip path", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1"><part-name>Clarinet in A</part-name></score-part>
  </part-list>
  <part id="P1">
    <measure number="0" implicit="yes">
      <barline location="left"><repeat direction="forward"/></barline>
      <attributes>
        <divisions>960</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>3</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
        <transpose><diatonic>-2</diatonic><chromatic>-3</chromatic></transpose>
      </attributes>
      <note><pitch><step>C</step><octave>5</octave></pitch><duration>960</duration><voice>1</voice><type>quarter</type></note>
      <note><rest/><duration>1920</duration><voice>1</voice><type>half</type></note>
    </measure>
    <measure number="1">
      <note><rest/><duration>2880</duration><voice>1</voice><type>half</type><dot/></note>
      <barline location="right"><repeat direction="backward" times="2"/></barline>
    </measure>
  </part>
</score-partwise>`;

    const srcDoc = parseMusicXmlDocument(xml);
    expect(srcDoc).not.toBeNull();
    if (!srcDoc) return;

    const abc = exportMusicXmlDomToAbc(srcDoc);
    expect(abc).toContain("%@mks transpose voice=P1 chromatic=-3 diatonic=-2");
    expect(abc).toContain("|:");
    expect(abc).toContain(":|");
    expect(abc).toContain("%@mks measure voice=P1 measure=1 number=0 implicit=1");
    expect(abc).toContain("%@mks measure voice=P1 measure=2 number=1 implicit=0");
    expect(abc).not.toContain("repeat=forward");
    expect(abc).not.toContain("repeat=backward");

    const roundtripXml = convertAbcToMusicXml(abc);
    const outDoc = parseMusicXmlDocument(roundtripXml);
    expect(outDoc).not.toBeNull();
    if (!outDoc) return;

    expect(outDoc.querySelector('part > measure[number="0"]')?.getAttribute("implicit")).toBe("yes");
    expect(
      outDoc.querySelector('part > measure[number="0"] > barline[location="left"] > repeat')?.getAttribute("direction")
    ).toBe("forward");
    expect(
      outDoc.querySelector('part > measure[number="1"] > barline[location="right"] > repeat')?.getAttribute("direction")
    ).toBe("backward");
    expect(
      outDoc.querySelector('part > measure[number="1"] > barline[location="right"] > repeat')?.getAttribute("times")
    ).toBeNull();
    expect(outDoc.querySelector("part > measure > attributes > transpose > chromatic")?.textContent?.trim()).toBe("-3");
    expect(outDoc.querySelector("part > measure > attributes > transpose > diatonic")?.textContent?.trim()).toBe("-2");
  });

  it("exports MusicXML into playable ABC with the basic headers abc-player expects", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1"><part-name>Piano RH</part-name></score-part>
    <score-part id="P2"><part-name>Piano LH</part-name></score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>480</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>
      <direction>
        <direction-type><metronome><beat-unit>quarter</beat-unit><per-minute>132</per-minute></metronome></direction-type>
        <sound tempo="132"/>
      </direction>
      <note><pitch><step>C</step><octave>5</octave></pitch><duration>960</duration><voice>1</voice><type>half</type></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>960</duration><voice>1</voice><type>half</type></note>
    </measure>
  </part>
  <part id="P2">
    <measure number="1">
      <attributes>
        <divisions>480</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>F</sign><line>4</line></clef>
      </attributes>
      <note><pitch><step>C</step><octave>3</octave></pitch><duration>1920</duration><voice>1</voice><type>whole</type></note>
    </measure>
  </part>
</score-partwise>`;

    const srcDoc = parseMusicXmlDocument(xml);
    expect(srcDoc).not.toBeNull();
    if (!srcDoc) return;

    const abc = exportMusicXmlDomToAbc(srcDoc);
    expect(abc).toContain("X:1");
    expect(abc).toContain("T:");
    expect(abc).toContain("M:");
    expect(abc).toContain("L:1/8");
    expect(abc).toContain("K:");
    expect(abc).toContain("V:");

    const bodyLine = abc
      .split("\n")
      .find((line) => /[A-Ga-gzx]/.test(line) && !line.startsWith("%@mks"));
    expect(bodyLine).toBeTruthy();
  });

  it("keeps a practical multi-voice fixture loadable after MusicXML -> ABC -> MusicXML", () => {
    const srcDoc = parseMusicXmlDocument(sampleXml6);
    expect(srcDoc).not.toBeNull();
    if (!srcDoc) return;

    const abc = exportMusicXmlDomToAbc(srcDoc);
    expect((abc.match(/^V:/gm) ?? []).length).toBeGreaterThan(1);
    const roundtripXml = convertAbcToMusicXml(abc);
    const outDoc = parseMusicXmlDocument(roundtripXml);
    expect(outDoc).not.toBeNull();
    if (!outDoc) return;

    const core = new ScoreCore();
    core.load(roundtripXml);
    const save = core.save();
    expect(save.ok).toBe(true);
    expect(outDoc.querySelectorAll("part > measure").length).toBeGreaterThan(0);
  });

  it("keeps parser fallback issues as diagnostics instead of hard failure for recoverable ABC", () => {
    const abc = `X:1
T:Bad header
M:not-a-meter
L:1/8
K:C
V:1
C D E F |`;

    const xml = convertAbcToMusicXml(abc);
    const outDoc = parseMusicXmlDocument(xml);
    expect(outDoc).not.toBeNull();
    if (!outDoc) return;

    expect(outDoc.querySelector('miscellaneous-field[name="mks:diag:count"]')?.textContent?.trim()).toBe("1");
    expect(outDoc.querySelector('miscellaneous-field[name="mks:diag:0001"]')?.textContent).toContain(
      "code=ABC_IMPORT_WARNING"
    );
    expect(outDoc.querySelector('miscellaneous-field[name="mks:diag:0002"]')).toBeNull();

    const core = new ScoreCore();
    core.load(xml);
    const save = core.save();
    expect(save.ok).toBe(true);
  });

  it("keeps the sample MusicXML -> ABC path used by abc-player loadable", () => {
    const srcDoc = parseMusicXmlDocument(sampleXml6);
    expect(srcDoc).not.toBeNull();
    if (!srcDoc) return;

    const abc = exportMusicXmlDomToAbc(srcDoc);
    expect(abc).toContain("X:1");
    expect(abc).toContain("K:");

    const xml = convertAbcToMusicXml(abc);
    const outDoc = parseMusicXmlDocument(xml);
    expect(outDoc).not.toBeNull();
    if (!outDoc) return;

    const core = new ScoreCore();
    core.load(xml);
    const save = core.save();
    expect(save.ok).toBe(true);
  });

  it("keeps a second built-in sample conversion path loadable for broader practical coverage", () => {
    const srcDoc = parseMusicXmlDocument(sampleXml7);
    expect(srcDoc).not.toBeNull();
    if (!srcDoc) return;

    const abc = exportMusicXmlDomToAbc(srcDoc);
    expect(abc).toContain("X:1");
    expect(abc).toContain("K:");

    const xml = convertAbcToMusicXml(abc);
    const outDoc = parseMusicXmlDocument(xml);
    expect(outDoc).not.toBeNull();
    if (!outDoc) return;

    const core = new ScoreCore();
    core.load(xml);
    const save = core.save();
    expect(save.ok).toBe(true);
    expect(outDoc.querySelectorAll("part > measure").length).toBeGreaterThan(0);
  });

  it("keeps a repeat-heavy piano-style sample stable across the ABC path", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1"><part-name>Piano</part-name></score-part>
  </part-list>
  <part id="P1">
    <measure number="0" implicit="yes">
      <barline location="left"><repeat direction="forward"/></barline>
      <attributes>
        <divisions>960</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>3</beats><beat-type>4</beat-type></time>
        <staves>2</staves>
        <clef number="1"><sign>G</sign><line>2</line></clef>
        <clef number="2"><sign>F</sign><line>4</line></clef>
      </attributes>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>960</duration><voice>1</voice><type>quarter</type><staff>1</staff></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>1920</duration><voice>1</voice><type>half</type><staff>1</staff></note>
      <backup><duration>2880</duration></backup>
      <note><pitch><step>C</step><octave>3</octave></pitch><duration>2880</duration><voice>2</voice><type>half</type><dot/><staff>2</staff></note>
    </measure>
    <measure number="1">
      <barline location="right">
        <ending type="start" number="1"/>
        <repeat direction="backward" times="2"/>
      </barline>
      <note><rest/><duration>2880</duration><voice>1</voice><type>half</type><dot/><staff>1</staff></note>
      <backup><duration>2880</duration></backup>
      <note><pitch><step>G</step><octave>2</octave></pitch><duration>2880</duration><voice>2</voice><type>half</type><dot/><staff>2</staff></note>
    </measure>
    <measure number="2">
      <barline location="left"><ending type="stop" number="1"/><ending type="start" number="2"/></barline>
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>2880</duration><voice>1</voice><type>half</type><dot/><staff>1</staff></note>
      <backup><duration>2880</duration></backup>
      <note><pitch><step>C</step><octave>3</octave></pitch><duration>2880</duration><voice>2</voice><type>half</type><dot/><staff>2</staff></note>
      <barline location="right"><ending type="stop" number="2"/></barline>
    </measure>
  </part>
</score-partwise>`;

    const srcDoc = parseMusicXmlDocument(xml);
    expect(srcDoc).not.toBeNull();
    if (!srcDoc) return;

    const abc = exportMusicXmlDomToAbc(srcDoc);
    expect(abc).toContain("V:P1_s1_v1");
    expect(abc).toContain("V:P1_s2_v2");
    expect(abc).toContain("|:");
    expect(abc).toContain(":|");
    expect(abc).toContain("[1");
    expect(abc).toContain("%@mks measure voice=P1_s1_v1 measure=1 number=0 implicit=1");
    expect(abc).toContain("%@mks measure voice=P1_s1_v1 measure=2 number=1 implicit=0");
    expect(abc).toContain("%@mks measure voice=P1_s1_v1 measure=3 number=2 implicit=0");
    expect(abc).toContain("%@mks measure voice=P1_s2_v2 measure=1 number=0 implicit=1");
    expect(abc).toContain("%@mks measure voice=P1_s2_v2 measure=2 number=1 implicit=0");
    expect(abc).toContain("%@mks measure voice=P1_s2_v2 measure=3 number=2 implicit=0");
    expect(abc).not.toContain("repeat=forward");
    expect(abc).not.toContain("repeat=backward");

    const roundtripXml = convertAbcToMusicXml(abc);
    const outDoc = parseMusicXmlDocument(roundtripXml);
    expect(outDoc).not.toBeNull();
    if (!outDoc) return;

    const core = new ScoreCore();
    core.load(roundtripXml);
    const save = core.save();
    expect(save.ok).toBe(true);
    expect(outDoc.querySelector('part[id="P1"] > measure[number="0"]')?.getAttribute("implicit")).toBe("yes");
    expect(
      outDoc.querySelector('part[id="P1"] > measure[number="1"] > barline[location="right"] > repeat')?.getAttribute("direction")
    ).toBe("backward");
  });

  it("keeps ornament-and-grace heavy content stable across the ABC path", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<score-partwise version="4.0">
  <part-list>
    <score-part id="P1"><part-name>Ornament Test</part-name></score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>960</divisions>
        <key><fifths>0</fifths></key>
        <time><beats>4</beats><beat-type>4</beat-type></time>
        <clef><sign>G</sign><line>2</line></clef>
      </attributes>
      <note>
        <grace slash="yes"/>
        <pitch><step>G</step><octave>4</octave></pitch>
        <voice>1</voice><type>eighth</type>
      </note>
      <note>
        <pitch><step>A</step><octave>4</octave></pitch>
        <duration>1920</duration><voice>1</voice><type>half</type>
        <notations>
          <ornaments><trill-mark/></ornaments>
          <articulations><staccato/></articulations>
        </notations>
      </note>
      <note>
        <pitch><step>B</step><octave>4</octave></pitch>
        <duration>1920</duration><voice>1</voice><type>half</type>
        <notations><ornaments><turn/></ornaments></notations>
      </note>
    </measure>
  </part>
</score-partwise>`;

    const srcDoc = parseMusicXmlDocument(xml);
    expect(srcDoc).not.toBeNull();
    if (!srcDoc) return;

    const abc = exportMusicXmlDomToAbc(srcDoc);
    expect(abc).toContain("!trill!");
    expect(abc).toContain("!turn!");
    expect(abc).toContain("!staccato!");
    expect(abc).toMatch(/\{\/[^}]+\}/);

    const roundtripXml = convertAbcToMusicXml(abc);
    const outDoc = parseMusicXmlDocument(roundtripXml);
    expect(outDoc).not.toBeNull();
    if (!outDoc) return;

    const core = new ScoreCore();
    core.load(roundtripXml);
    const save = core.save();
    expect(save.ok).toBe(true);
    expect(outDoc.querySelector('note > grace[slash="yes"]')).not.toBeNull();
    expect(outDoc.querySelector("note > notations > ornaments > trill-mark")).not.toBeNull();
    expect(outDoc.querySelector("note > notations > ornaments > turn")).not.toBeNull();
    expect(outDoc.querySelector("note > notations > articulations > staccato")).not.toBeNull();
  });

  it("matches the sample-conversion workflow used by abc-player main.ts", () => {
    const abc = convertSampleXmlToAbc(sampleXml6);
    expect(abc).toContain("X:1");
    expect(abc).toContain("K:");

    const xml = convertAbcToMusicXml(abc);
    const outDoc = parseMusicXmlDocument(xml);
    expect(outDoc).not.toBeNull();
    if (!outDoc) return;

    const core = new ScoreCore();
    core.load(xml);
    const save = core.save();
    expect(save.ok).toBe(true);
  });
});
