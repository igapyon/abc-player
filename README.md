# abc-player

`abc-player` is a browser-based ABC notation player delivered as a single-file web app.

This project intentionally reuses and mimics `mikuscore` as much as practical.
It is not starting from a blank architectural style.

## Status

This repository is in specification and bootstrap phase.

Current focus:

- define project policy and structure
- mimic `mikuscore` project shape
- reuse vendored `mikuscore` assets where reasonable
- narrow the initial product scope to an ABC player

## Product Goal

`abc-player` aims to provide a small, local, offline-capable ABC player with:

- ABC text input
- ABC file input
- score preview
- playback
- minimal player controls
- smartphone-friendly single-page UI

Editing and export may remain available when inherited from `mikuscore`, but they are secondary.

## Relationship to `mikuscore`

This repository vendors `mikuscore` under `vendor/mikuscore/`.

The intention is:

- reuse existing ABC-related assets
- reuse existing playback-related assets
- reuse the single-file build philosophy
- reuse the `lht-cmn` UI component direction
- stay close to the same TypeScript and test baseline

`abc-player` is a smaller derived app, not a full clone of `mikuscore`.

Its primary value is preview and playback, not strong score editing.

## Development Direction

The project SHOULD mimic these `mikuscore` characteristics:

- single-file distribution artifact
- offline runtime
- split TypeScript source layout
- source-template HTML plus generated HTML
- `lht-cmn` based MD3-compatible UI composition
- `vitest` + `jsdom` test baseline

## Positioning

Primary:

- load ABC
- preview score
- play back quickly
- make small confirmation-oriented adjustments when needed

Secondary:

- lightweight edit inherited from `mikuscore`
- export inherited from `mikuscore`

Non-goal:

- become a strong full-featured score editor

## Repository Layout

Current / planned layout:

```text
abc-player/
  README.md
  docs/
  src/
  scripts/
  vendor/
    mikuscore/
```

The precise target layout is documented in [docs/MIMIC_POLICY.md](/Users/igapyon/Documents/git/abc-player/docs/MIMIC_POLICY.md).

## Documentation

- [docs/README.md](/Users/igapyon/Documents/git/abc-player/docs/README.md)
- [docs/MIMIC_POLICY.md](/Users/igapyon/Documents/git/abc-player/docs/MIMIC_POLICY.md)
- [docs/PRODUCT_POSITIONING.md](/Users/igapyon/Documents/git/abc-player/docs/PRODUCT_POSITIONING.md)

## License

This repository is licensed under Apache License 2.0.

Vendored components keep their own license and notice files where applicable.
