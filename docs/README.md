# Documentation Map

This directory contains project documents for `abc-player`.

At the current stage, documentation is centered on project direction rather than implementation detail.

## Current Documents

- [MIMIC_POLICY.md](/Users/igapyon/Documents/git/abc-player/docs/MIMIC_POLICY.md)
  - defines how `abc-player` should intentionally mimic `mikuscore`
- [PRODUCT_POSITIONING.md](/Users/igapyon/Documents/git/abc-player/docs/PRODUCT_POSITIONING.md)
  - defines the player-first product identity
- [UPSTREAM_SYNC_POLICY.md](/Users/igapyon/Documents/git/abc-player/docs/UPSTREAM_SYNC_POLICY.md)
  - defines how to keep future `mikuscore` sync easy
- [spec/SPEC.md](/Users/igapyon/Documents/git/abc-player/docs/spec/SPEC.md)
  - top-level initial specification
- [spec/ARCHITECTURE.md](/Users/igapyon/Documents/git/abc-player/docs/spec/ARCHITECTURE.md)
  - initial architecture boundary
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
