# TODO

## Upstream Sync

- [ ] Pursue upstream profile / option support so `abc-player` can stay thin.
  - Goal:
    - prefer a `mikuscore`-side profile / option mechanism over accumulating downstream-only UI restriction logic
  - Candidate request areas:
    - app title / product wording injection points
    - player-first default mode
    - feature visibility for input methods
    - feature visibility for edit/output surfaces
    - sample-loading / onboarding hooks
  - Local rule while this is unresolved:
    - prefer larger coherent `mikuscore` sync when changes span shared `ABC <-> MusicXML` or UI/runtime contracts
    - keep downstream overrides concentrated near entry-point / visibility logic
  - Reference:
    - [UPSTREAM_PROFILE_STRATEGY.md](UPSTREAM_PROFILE_STRATEGY.md)

- [x] Define the acceptance rule for importing `mikuscore` `abc-io.ts` updates into `abc-player`.
  - Treat `vendor/mikuscore/src/ts/abc-io.ts` as a high-impact upstream dependency for `abc-player`, even when DOM and `main.ts` are unchanged.
  - Prefer taking `abc-io.ts` improvements from `mikuscore` after the behavior is backed by upstream unit tests, rather than re-implementing the fixes locally in `abc-player`.
  - Separate review of `abc-io.ts` updates from broader `mikuscore` app updates such as `src/ts/main.ts`, HTML templates, or build scripts.
  - Progress (2026-04-05): documented the rule in [spec/ABC_SYNC_CHECKLIST.md](spec/ABC_SYNC_CHECKLIST.md) and aligned it with [spec/ABC_ACCEPTANCE_POLICY.md](spec/ABC_ACCEPTANCE_POLICY.md).

- [x] Add a small `abc-player` acceptance checklist for `mikuscore` `abc-io.ts` syncs.
  - Confirm the public API used by `abc-player` is still compatible:
    - `exportMusicXmlDomToAbc(doc)`
    - `parseMusicXmlDocument(xml)`
    - `convertAbcToMusicXml(abcSource)` when relevant to inherited upstream behavior
  - Confirm no new `abc-io.ts` dependencies require synchronized changes outside the intended upstream update slice.
  - Confirm `abc-player` still behaves correctly for its player-first workflow: load as ABC, preview, playback, lightweight inherited edit/export.
  - Progress (2026-04-05): documented the checklist in [spec/ABC_SYNC_CHECKLIST.md](spec/ABC_SYNC_CHECKLIST.md).
  - Progress (2026-04-06): confirmed the practical workflow is:
    - update vendored `mikuscore` first
    - run local gates
    - adjust thin `abc-player` acceptance expectations where upstream moved semantics from `%@mks` into standard ABC surface syntax
    - treat upstream changes as unnecessary unless a real downstream pain remains after that
  - Progress (2026-04-06): confirmed a later same-day upstream batch (`37066f8` -> `c3f3fd9`) imported cleanly with no `abc-player` code or acceptance updates, reinforcing that the current local gates are a workable sync boundary.

- [x] Add focused regression checks for the `abc-io.ts` behaviors that matter most to `abc-player`.
  - ABC import compatibility improvements should be verified with representative inputs, especially lenient/real-world cases.
  - MusicXML -> ABC output changes should be checked for unintended drift in player-facing output.
  - `%@mks` metadata, warning/diagnostic behavior, and roundtrip-sensitive constructs should be sampled before accepting upstream sync.
  - Minimum recommended coverage:
    - repeat ending markers
    - overfull compatibility reflow
    - slur / tie
    - tuplet
    - `%@mks` measure / repeat / transpose metadata

- [x] Add local tests in `abc-player` for upstream-sensitive ABC conversion behavior.
  - Current test coverage is too weak to detect semantic regressions from `vendor/mikuscore/src/ts/abc-io.ts`.
  - At minimum, add a few targeted tests that fail when upstream ABC compatibility changes break the `abc-player` workflow.
  - Progress (2026-04-05): added an initial acceptance-test set for:
    - alternate ending markers in real-world ABC
    - overfull compatibility reflow
    - slur / tie / tuplet roundtrip
    - `%@mks` measure / repeat / transpose metadata roundtrip
  - Progress (2026-04-05): expanded the acceptance-test set further for:
    - `MusicXML -> ABC` player-facing header/body expectations
    - fixture-based roundtrip coverage using vendored `mikuscore` fixtures
    - recoverable parser warning / diagnostic acceptance
    - a sample-driven conversion path close to the one used by `src/ts/main.ts`
  - Progress (2026-04-05): added further acceptance hardening for:
    - repeat-heavy piano-style roundtrip coverage
    - tighter recoverable diagnostic count/noise expectations
    - explicit `convertSampleXmlToAbc`-style workflow coverage matching `abc-player` main.ts usage
  - Progress (2026-04-05): added a UI-adjacent integration test for the sample-load DOM flow by extracting the local helper used by `src/ts/main.ts`.
  - Progress (2026-04-05): expanded fixture coverage further with an ornament/grace-heavy acceptance case.
  - Progress (2026-04-05): broadened built-in sample coverage beyond `sampleXml6` with a second sample-driven acceptance case.
  - Future expansion if upstream change volume increases:
    - add still more small fixture-based tests closer to additional real `abc-player` inputs
    - refine the acceptance policy into more concrete fixture-by-fixture rules

- [x] Define which ABC output deltas are acceptable for `abc-player` and which should fail acceptance.
  - Progress (2026-04-05): added [spec/ABC_ACCEPTANCE_POLICY.md](spec/ABC_ACCEPTANCE_POLICY.md) as the first local acceptance policy.
  - Progress (2026-04-05): connected acceptance-test clusters to explicit policy buckets in [spec/ABC_ACCEPTANCE_POLICY.md](spec/ABC_ACCEPTANCE_POLICY.md).
  - Progress (2026-04-06): clarified that standard ABC spellings may replace redundant `%@mks` repeat metadata without counting as a regression, as long as roundtrip semantics remain intact.
  - Future refinement if needed:
    - tighten the boundary between "formatting-only acceptable delta" and "player-visible regression" if upstream change volume increases further

## Notes

- Current conclusion: `abc-io.ts`-only upstream changes are structurally safer than syncing `mikuscore` `main.ts` or DOM-level changes, but they are still high-impact because `abc-player` is centered on opening content as ABC.
- Current operating model: the implementation work happens in `mikuscore`; `abc-player` should mainly define acceptance criteria and import upstream changes in coherent batches.
