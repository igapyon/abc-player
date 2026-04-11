# Build Process (Single-file Runtime / Split TS Dev)

## Purpose

`abc-player` follows the same broad build philosophy as `mikuscore`:

- develop with split TypeScript source files
- distribute as a single self-contained HTML file

## Target Artifact

- development template: `miku-abc-player-src.html`
- distribution artifact: `miku-abc-player.html`

## Build Rule

The build SHOULD:

1. compile TypeScript source for browser runtime use
2. validate HTML template include structure
3. inline local CSS and JS into the template
4. emit `miku-abc-player.html`

## Suggested Layout

- `miku-abc-player-src.html`
- `miku-abc-player.html` (generated)
- `src/css/app.css`
- `src/ts/main.ts`
- `src/ts/**/*.ts`
- `src/js/main.js` (generated)
- `vendor/mikuscore/**` (vendored upstream assets)

## Runtime Constraints

- `miku-abc-player.html` MUST run offline
- `miku-abc-player.html` MUST NOT require CDN/runtime fetches
- required CSS/JS MUST be bundled or vendored locally

## Editing Rules

- do not edit `miku-abc-player.html` directly
- edit `miku-abc-player-src.html`, `src/`, `scripts/`, and docs
- keep build structure close to `mikuscore` unless divergence is clearly justified
