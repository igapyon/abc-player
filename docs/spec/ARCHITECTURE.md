# Architecture (Initial)

## Purpose

This document defines high-level architecture boundaries for `abc-player`.

The architecture intentionally stays close to `mikuscore`, with simplification centered on product scope rather than build/runtime philosophy.

## Architectural Separation

- `Vendor / Upstream-derived layer`
  - `vendor/mikuscore`
  - reusable ABC, playback, MusicXML-related logic
  - reused UI/build references
- `App layer`
  - `abc-player` specific UI
  - ABC-focused input restriction
  - product-specific state and adapter code

## UI vs Processing Boundary

- UI:
  - input controls
  - tab flow
  - selection state
  - playback controls
  - diagnostics display
- Processing / reuse layer:
  - ABC parsing / conversion
  - playback event building
  - score-related document handling

UI SHOULD NOT directly own complex format-conversion logic when equivalent `mikuscore` assets already exist.

## Input Simplification Rule

The largest architectural simplification relative to `mikuscore` is at the input boundary.

`abc-player` SHOULD:

- expose ABC file input
- expose ABC text input
- remove broader multi-format import surface from the initial app UI

## Retained Surface Rule

Early versions MAY keep `Score`, `Edit`, and `Output` surfaces close to `mikuscore` to minimize implementation cost.

This is allowed as long as:

- product messaging remains playback-first
- the codebase does not unnecessarily fork upstream-heavy logic

## Runtime and Build Model

- runtime distribution: `abc-player.html`
- editable template: `abc-player-src.html`
- source layout: split TypeScript under `src/`
- build: compile and inline local CSS/JS into one HTML file
- runtime dependency rule: no external network dependency

## Language and Test Baseline

- TypeScript baseline SHOULD follow `mikuscore`
- test baseline SHOULD follow `vitest + jsdom`
- browser target SHOULD remain aligned with `mikuscore`'s ES2018-oriented output policy

## Upstream Boundary Rule

Imports from `vendor/mikuscore` SHOULD be narrowed through local adapter modules when practical.

Preferred pattern:

- app code imports local adapter
- adapter imports vendored upstream modules

This keeps future upstream sync simpler.
