# ABC Player
## Core Specification (Initial)

Scope note:

- This file is the top-level product/core spec for `abc-player`.
- Detailed architecture boundaries are defined in `docs/spec/ARCHITECTURE.md`.
- Detailed UI behavior is defined in `docs/spec/UI_SPEC.md`.
- Detailed build/runtime constraints are defined in `docs/spec/BUILD_PROCESS.md`.

---

# 1. Product Shape

`abc-player` is a playback-first derivative of `mikuscore`.

Its main job is:

- accept ABC input
- accept supported non-ABC formats and open them as ABC after MusicXML normalization
- preview score rendering
- play back score content

It MAY retain lightweight edit/export capability inherited from `mikuscore`, but those are secondary.

---

# 2. Input Scope

## 2.1 Primary Input Format

The primary input format is ABC.

Supported initial entry routes SHOULD be:

- ABC file import
- ABC text input
- supported non-ABC file import with user-facing ABC presentation after MusicXML normalization

## 2.2 Removed Direct Input Surface

Compared with `mikuscore`, the initial `abc-player` UI SHOULD remove direct source-specific text input surface for:

- MusicXML
- MuseScore
- MIDI
- VSQX
- MEI
- LilyPond

## 2.3 Internal Representation

Even though the user-facing input is ABC, downstream processing MAY continue through MusicXML-compatible internal representation inherited from `mikuscore`.
For non-ABC imports, the expected flow is:

- source file
- normalize to MusicXML
- generate user-facing ABC

---

# 3. Product Priority

Primary priority:

- playback
- preview
- fast ABC verification

Secondary priority:

- lightweight edit
- lightweight export

Non-goal:

- strong full-featured score editing

---

# 4. Mimic Rule

`abc-player` SHOULD mimic `mikuscore` where that reduces implementation and maintenance cost.

This includes:

- project layout
- single-file build model
- split TypeScript development
- `lht-cmn`-based UI composition
- test baseline

---

# 5. UI Surface Rule

The app SHOULD remain close to the existing `mikuscore` tab structure:

- Input
- Score
- Edit
- Output

Initial simplification SHOULD happen mainly in `Input`.

`Score`, `Edit`, and `Output` MAY remain substantially inherited in early phases.

---

# 6. Edit / Output Retention Rule

If inherited `mikuscore` edit or output features remain available:

- they are valid supported features
- they SHOULD be treated as secondary
- they SHOULD NOT redefine the product identity away from player-first

---

# 7. Runtime Model

The distribution target is a single self-contained HTML file:

- source template: `miku-abc-player-src.html`
- generated artifact: `miku-abc-player.html`

The generated artifact MUST run offline.

---

# 8. Upstream Reuse Rule

`vendor/mikuscore` is the main upstream-derived asset base.

Default rule:

- prefer reuse over rewrite
- prefer local adapters over direct invasive edits
- keep subtree update path simple

---

# 9. Immediate MVP Interpretation

The current intended MVP interpretation is:

- start from `mikuscore`
- keep `Input` ABC-centered while allowing supported file import routes that open as ABC
- preserve `Score`
- preserve `Edit`
- preserve `Output`
- present the whole product as ABC playback/preview first
