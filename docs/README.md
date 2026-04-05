# Documentation Map

This directory contains project documents for `abc-player`.

At the current stage, documentation is centered on project direction rather than implementation detail.

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
- [spec/SPEC.md](/Users/igapyon/Documents/git/abc-player/docs/spec/SPEC.md)
  - top-level initial specification
- [spec/ARCHITECTURE.md](/Users/igapyon/Documents/git/abc-player/docs/spec/ARCHITECTURE.md)
  - initial architecture boundary
- [spec/ABC_ACCEPTANCE_POLICY.md](/Users/igapyon/Documents/git/abc-player/docs/spec/ABC_ACCEPTANCE_POLICY.md)
  - defines acceptable vs non-acceptable ABC conversion deltas when syncing vendored `mikuscore` `abc-io.ts`
- [spec/ABC_SYNC_CHECKLIST.md](/Users/igapyon/Documents/git/abc-player/docs/spec/ABC_SYNC_CHECKLIST.md)
  - practical checklist for deciding whether an upstream `abc-io.ts` sync is acceptable for `abc-player`
- [spec/BUILD_PROCESS.md](/Users/igapyon/Documents/git/abc-player/docs/spec/BUILD_PROCESS.md)
  - single-file build model
- [spec/UI_SPEC.md](/Users/igapyon/Documents/git/abc-player/docs/spec/UI_SPEC.md)
  - initial UI scope and simplification rule

## Planned Document Areas

The following document categories are expected to be added as the project grows:

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
