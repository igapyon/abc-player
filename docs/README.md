# Documentation Map

This directory contains project documents for `abc-player`.

Documentation currently centers on product scope, upstream sync policy, and implementation boundaries that matter for ongoing development.

## Current Documents

- [../THIRD_PARTY_NOTICES.md](/Users/igapyon/Documents/git/abc-player/THIRD_PARTY_NOTICES.md)
  - lists third-party software and reference materials used or referred to by the project
- [../CONTRIBUTING.md](/Users/igapyon/Documents/git/abc-player/CONTRIBUTING.md)
  - contribution guide and contribution license notes
- [../CONTRIBUTORS.md](/Users/igapyon/Documents/git/abc-player/CONTRIBUTORS.md)
  - contributor acknowledgement list
- [MIMIC_POLICY.md](/Users/igapyon/Documents/git/abc-player/docs/MIMIC_POLICY.md)
  - defines how `abc-player` should intentionally mimic `mikuscore`
- [PRODUCT_POSITIONING.md](/Users/igapyon/Documents/git/abc-player/docs/PRODUCT_POSITIONING.md)
  - defines the player-first product identity
- [TODO.md](/Users/igapyon/Documents/git/abc-player/docs/TODO.md)
  - tracks local follow-up items for upstream sync acceptance and regression hardening
- [UPSTREAM_SYNC_POLICY.md](/Users/igapyon/Documents/git/abc-player/docs/UPSTREAM_SYNC_POLICY.md)
  - defines how to keep future `mikuscore` sync easy
- [UPSTREAM_PROFILE_STRATEGY.md](/Users/igapyon/Documents/git/abc-player/docs/UPSTREAM_PROFILE_STRATEGY.md)
  - defines the preferred long-term strategy of turning `abc-player` into a thin downstream profile of `mikuscore`
- [UPSTREAM_PROFILE_REQUEST_DRAFT.md](/Users/igapyon/Documents/git/abc-player/docs/UPSTREAM_PROFILE_REQUEST_DRAFT.md)
  - draft text for requesting a general profile / option mechanism upstream in `mikuscore`
- [UPSTREAM_SYNC_RETROSPECTIVE_2026-04-06.md](/Users/igapyon/Documents/git/abc-player/docs/UPSTREAM_SYNC_RETROSPECTIVE_2026-04-06.md)
  - records what actually happened during the 2026-04-06 vendored `mikuscore` upgrade and what was learned from it
- [spec/SPEC.md](/Users/igapyon/Documents/git/abc-player/docs/spec/SPEC.md)
  - top-level product and implementation scope
- [spec/ARCHITECTURE.md](/Users/igapyon/Documents/git/abc-player/docs/spec/ARCHITECTURE.md)
  - architecture boundary and reuse split
- [spec/ABC_ACCEPTANCE_POLICY.md](/Users/igapyon/Documents/git/abc-player/docs/spec/ABC_ACCEPTANCE_POLICY.md)
  - defines acceptable vs non-acceptable ABC conversion deltas when syncing vendored `mikuscore` `abc-io.ts`
- [spec/ABC_SYNC_CHECKLIST.md](/Users/igapyon/Documents/git/abc-player/docs/spec/ABC_SYNC_CHECKLIST.md)
  - practical checklist for deciding whether an upstream `abc-io.ts` sync is acceptable for `abc-player`
- [spec/BUILD_PROCESS.md](/Users/igapyon/Documents/git/abc-player/docs/spec/BUILD_PROCESS.md)
  - single-file build model
- [spec/UI_SPEC.md](/Users/igapyon/Documents/git/abc-player/docs/spec/UI_SPEC.md)
  - current UI scope and simplification rule

## Planned Document Areas

The following document categories may still be added as the project grows:

- product positioning
- architecture
- build process
- UI specification
- screen specification
- playback specification
- test strategy

## Policy

Documentation SHOULD be written before or alongside structure-heavy implementation changes when those changes affect:

- project layout
- build model
- upstream reuse boundary
- UI framework direction
- scope decisions

For now, `MIMIC_POLICY.md` is the main starting point.
For practical sync work, also start from `UPSTREAM_SYNC_POLICY.md` and `spec/ABC_SYNC_CHECKLIST.md`.
