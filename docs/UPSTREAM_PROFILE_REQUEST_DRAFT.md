# Upstream Profile Request Draft

## Goal

Ask `mikuscore` to support a general profile / option mechanism so narrower downstream products such as `abc-player` can stay thin and avoid re-owning upstream behavior.

## Problem Statement

`abc-player` is intentionally a narrower derivative of `mikuscore`, but it currently has to maintain downstream logic for:

- product naming
- wording
- default input behavior
- visibility of some input/edit/output surfaces
- sample-loading behavior

This becomes fragile when upstream changes span shared contracts such as:

- `ABC <-> MusicXML`
- diagnostics / metadata
- UI/runtime assumptions

At that point, selective downstream sync starts fighting upstream coherence.

## Request

Please consider adding a general product-profile mechanism in `mikuscore`, so downstream variants can:

- take upstream more completely
- override only a small set of profile inputs
- avoid carrying local patch logic for broad UI/runtime behavior

## Good First Scope

Useful first profile hooks would be:

- app title / branding text
- hero/help wording
- default input mode
- visibility toggles for source/input methods
- visibility toggles for edit/output surfaces
- sample-loading / onboarding configuration

## Preferred Shape

Any of these would be acceptable:

- build-time profile flag
- runtime config object
- entry-point bootstrap options
- shared app with profile-specific wrappers

The key requirement is:

- downstream products should be able to stay mostly "upstream as-is + small config"

## Non-Goal

This is not a request for `abc-player`-specific special cases.

The request is for a general mechanism that keeps the `mikuscore` product family coherent while allowing narrower distributions.

## Expected Benefit

- easier downstream sync
- fewer local patches
- lower risk when upstream changes span parser / MusicXML / UI contracts
- clearer ownership: upstream owns behavior, downstream mainly owns profile

## Local Intent From `abc-player`

If such a mechanism exists, `abc-player` intends to move toward:

- larger coherent upstream imports
- fewer downstream code overrides
- product shaping mainly through upstream-supported profile configuration
