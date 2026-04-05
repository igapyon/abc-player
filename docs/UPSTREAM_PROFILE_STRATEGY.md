# Upstream Profile Strategy

## Purpose

This document defines the preferred long-term strategy for keeping `abc-player` aligned with `mikuscore`.

The target is no longer just "easy partial sync".
The preferred target is:

- make `abc-player` mostly a thin downstream profile of `mikuscore`
- move product-shaping switches upstream when practical
- keep downstream-only overrides as small as possible

## Why This Strategy Exists

`abc-player` currently depends on `mikuscore` for:

- project structure
- build model
- TypeScript/runtime baseline
- MusicXML-centered processing
- ABC import/export behavior
- playback and preview behavior
- inherited edit/output surfaces

As `mikuscore` evolves, selective downstream sync becomes harder when one upstream change spans:

- ABC parser behavior
- `ABC <-> MusicXML` roundtrip contracts
- diagnostics / metadata conventions
- UI/runtime assumptions

In those cases, importing only narrow slices can fight upstream coherence.

## Preferred End State

Preferred end state:

- `mikuscore` owns the main implementation and product-family architecture
- `abc-player` consumes upstream mostly as-is
- `abc-player` changes are limited to:
  - product naming
  - product messaging
  - default mode / entry behavior
  - feature visibility
  - a small amount of downstream glue only when upstream has no hook yet

This means `abc-player` should behave more like:

- a branded profile / mode / distribution of `mikuscore`

and less like:

- a separately curated fork that manually re-decides many upstream internals

## Default Downstream Rule

When deciding between:

- local downstream customization
- an upstream option / hook / profile point

the default preference SHOULD be:

- upstream option / hook / profile point

Downstream-only customization is still allowed, but it should be treated as a temporary fallback unless there is a strong reason not to upstream it.

## What Should Move Upstream

The following areas are good candidates for upstream profile support:

- app title / product name
- hero text / help text / product wording
- default input mode
- feature visibility for input methods
- feature visibility for advanced edit/output surfaces
- sample-loading behavior
- player-first vs editor-first initial presentation

Possible implementation styles upstream:

- build-time profile flag
- runtime config object
- HTML data attributes / bootstrap options
- profile-specific entry point with shared core modules

## What Should Usually Stay Downstream

These are more acceptable as downstream-only concerns:

- repository-specific README / docs
- release packaging for `abc-player`
- branding assets unique to `abc-player`
- temporary glue while upstream hooks are being discussed or prepared

## Immediate Working Interpretation

Until upstream profile support exists, `abc-player` SHOULD move toward this interim model:

- vendor/import `mikuscore` in larger coherent batches
- avoid selectively re-owning upstream behavior that is part of a broader MusicXML-centered contract
- keep local overrides concentrated at entry-point and UI-surface level

This is especially important for changes that touch:

- `ABC <-> MusicXML` contracts
- diagnostics / `%@mks` metadata behavior
- feature visibility assumptions across Input / Score / Edit / Output

## Upstream Request Direction

The preferred upstream request is not:

- "please add abc-player-specific hacks"

The preferred upstream request is:

- "please add a general profile / option mechanism that allows narrower downstream products such as `abc-player` to stay thin"

Good request themes:

- player-first profile
- feature visibility controls
- branding / wording injection points
- default workflow configuration

## Decision Rule For New Work

For substantial new divergence, ask:

1. Can this be solved by taking more of `mikuscore` unchanged?
2. Can this be solved by a small upstream option / profile point?
3. Only if both answers are effectively "no", should `abc-player` add a larger downstream-only customization.

## Summary

The strategic goal is:

- stop drifting into a medium-sized downstream fork
- move toward "upstream-managed product family, downstream-thin profile"

For `abc-player`, aiming for upstream profile support is the preferred long-term path.
