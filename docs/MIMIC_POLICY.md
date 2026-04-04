# Mimic Policy

## Purpose

This document defines how `abc-player` should mimic `mikuscore`.

The goal is not vague inspiration. The goal is to intentionally inherit the parts of `mikuscore` that are already working well for:

- single-file web app distribution
- offline runtime
- smartphone-friendly UI structure
- split TypeScript development
- deterministic local build
- testable browser-side code

`abc-player` is a smaller derived app, but its project shape SHOULD stay as close to `mikuscore` as practical.

## Non-Goal

`abc-player` SHOULD NOT become a copy of all `mikuscore` features.

We mimic:

- project structure
- build model
- UI component policy
- TypeScript / test baseline
- reuse boundary with vendored upstream

We do not mimic:

- full format-converter scope
- full editing workflow
- unnecessary multi-format UI

Even when some editing/exporting surfaces are retained, the product identity SHOULD remain player-first.

## Upstream Reference

The upstream reference is `vendor/mikuscore/`.

`vendor/mikuscore` is treated as the primary local reference for:

- architecture
- build process
- UI conventions
- reusable ABC / playback modules

## Core Mimic Principles

## 1. Single-file distribution model

`abc-player` SHOULD follow the same development/distribution split as `mikuscore`.

- editable source template HTML
- split files under `src/`
- generated single HTML artifact for distribution

Recommended artifact naming:

- source template: `abc-player-src.html`
- distribution artifact: `abc-player.html`

This mirrors:

- `mikuscore-src.html`
- `mikuscore.html`

## 2. Split TypeScript development

Application code SHOULD be written in TypeScript under `src/ts/`.

Recommended structure:

- `src/ts/main.ts`
- `src/ts/app.ts`
- `src/ts/mikuscore-adapter.ts`
- `src/ts/state.ts`
- `src/ts/ui.ts`

The TypeScript baseline SHOULD mimic `mikuscore`:

- `target: ES2018`
- `module: ESNext`
- `moduleResolution: Bundler`
- `strict: true`
- `noEmit: true`
- DOM browser libs enabled

## 3. Build from source HTML template

`abc-player` SHOULD use the same build philosophy as `mikuscore`:

1. compile TypeScript for browser runtime use
2. validate source HTML include structure
3. inline local CSS and JS
4. emit a self-contained HTML file

The editable file is the `*-src.html` template.
The generated single-file artifact MUST NOT be edited directly.

## 4. Offline runtime

The generated app MUST run offline.

Therefore:

- no runtime CDN dependency
- no runtime fetch of framework assets
- required JS/CSS must be local or vendored
- vendored UI/runtime assets may be inlined during build

## 5. `lht-cmn`-based UI policy

`abc-player` SHOULD mimic `mikuscore`'s UI composition policy and use `lht-cmn` as the shared component layer.

UI pages SHOULD prefer:

- `lht-help-tooltip`
- `lht-text-field-help`
- `lht-select-help`
- `lht-switch-help`
- `lht-file-select`
- `lht-error-alert`

The app SHOULD avoid introducing direct page-level dependency on raw `md-*` elements when `lht-*` already covers the use case.

This keeps `abc-player` aligned with `mikuscore`'s component boundary:

- app code uses `lht-*`
- shared component behavior lives in `lht-cmn`

## 6. MD3-compatible visual direction

`abc-player` SHOULD remain visually compatible with the same MD3-oriented direction used by `mikuscore`.

This means:

- use `lht-cmn/css/components.css`
- define app-specific styling in `src/css/app.css`
- keep tokens, spacing, card layout, button treatment, and form density broadly aligned with `mikuscore`

This does not require pixel-perfect cloning.
It does require staying inside the same visual family.

## 7. Vitest-based test policy

`abc-player` SHOULD mimic `mikuscore`'s testing baseline:

- `vitest`
- `jsdom`
- `tests/**/*.spec.ts`

Initial priority is unit tests for:

- adapter behavior
- state transitions
- ABC load / parse / playback entry logic

## 8. Vendored upstream boundary

`vendor/mikuscore` is upstream-derived code.

Default policy:

- do not edit `vendor/mikuscore` unless clearly necessary
- prefer thin adapter code in `abc-player`
- keep upstream update path simple

`abc-player` SHOULD depend on vendored `mikuscore` through a narrow local adapter rather than scattering direct imports across many files.

Recommended entry points:

- `vendor/mikuscore/src/ts/abc-io.ts`
- `vendor/mikuscore/src/ts/playback.ts`
- `vendor/mikuscore/src/ts/playback-flow.ts`
- `vendor/mikuscore/src/ts/musicxml-io.ts`

## 8.1 Upstream Sync Priority

The project SHOULD prioritize easy future sync from `mikuscore` over aggressive local cleanup.

This means:

- keep local divergence small
- avoid large structural refactors of upstream-derived logic
- avoid rewriting reusable upstream behavior just to make the local tree look smaller

## 8.2 Feature Restriction over Code Reduction

For `abc-player`, the preferred strategy is:

- keep much of `mikuscore` internally available
- expose only `abc-player`-appropriate features in the UI
- accept some unused or currently unreachable code if that keeps upstream sync simple

In other words:

- restrict visible functionality
- do not over-optimize internal reduction

## 8.3 Avoid Premature Cleanup

`abc-player` SHOULD NOT introduce a second-stage cleanup effort whose main purpose is:

- deleting upstream code that is merely unused in current UI
- deeply reshaping module boundaries away from `mikuscore`
- aggressively minimizing dead code at the cost of future merge difficulty

Such cleanup is usually a bad trade if it makes future subtree updates harder.

## 8.4 Preferred Change Style

Preferred change style:

- thin wrapper
- thin adapter
- UI hiding / disabling
- restricted input paths
- product-specific wording

Avoid when possible:

- invasive upstream surgery
- broad file moves
- large fork-specific architectural rewrites

## 8.5 Long-Term Maintenance Rule

If there is tension between:

- a cleaner smaller local codebase today
- easier `mikuscore` sync tomorrow

the default decision SHOULD favor easier `mikuscore` sync tomorrow.

This rule exists specifically to avoid future maintenance traps.

## 9. Product scope simplification

Even while mimicking project structure, `abc-player` remains a smaller product.

Initial scope SHOULD stay focused on:

- ABC input
- ABC file import
- score preview
- playback
- minimal player controls
- error/status display

It MAY retain parts of `mikuscore`'s edit/export surface when doing so lowers implementation cost.

However:

- those retained surfaces are secondary
- they SHOULD be described as lightweight or inherited capabilities
- they SHOULD NOT redefine the product as a strong score editor

## Recommended Project Layout

```text
abc-player/
  abc-player-src.html
  abc-player.html
  package.json
  tsconfig.json
  vitest.config.ts
  README.md
  docs/
    MIMIC_POLICY.md
  src/
    css/
      app.css
    ts/
      main.ts
      app.ts
      mikuscore-adapter.ts
      state.ts
      ui.ts
    js/
      main.js
  scripts/
    build.mjs
  tests/
    unit/
  vendor/
    mikuscore/
```

## Decision Rules

When a design choice appears, prefer the option that is closer to `mikuscore` if:

- it reduces project-specific maintenance
- it preserves offline single-file behavior
- it keeps vendor update flow simple
- it avoids introducing a second UI/build philosophy

Prefer divergence only when:

- `abc-player` is materially simpler than `mikuscore`
- the additional `mikuscore` structure would be dead weight
- the deviation clearly improves maintainability for this smaller app

However, even when divergence seems attractive, avoid it if it would make future upstream incorporation noticeably harder.

## Product Identity Rule

If there is tension between:

- preserving inherited `mikuscore` edit/export capability
- presenting the app clearly to users

the presentation SHOULD favor clarity.

That means `abc-player` SHOULD be described as:

- an ABC player
- a preview/check tool
- a lightweight playback-first derivative of `mikuscore`

and not as a full editor.

## Immediate Follow-up

Based on this policy, the next setup steps SHOULD be:

1. create `abc-player-src.html`
2. create `abc-player.html` as generated artifact target
3. create `tsconfig.json` aligned with `mikuscore`
4. create `vitest.config.ts` aligned with `mikuscore`
5. create `scripts/build.mjs` modeled after `vendor/mikuscore/scripts/build.mjs`
6. create a thin `src/ts/mikuscore-adapter.ts`
7. document player-first product positioning explicitly
