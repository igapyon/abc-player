# ABC Sync Checklist

## Purpose

This document is the practical checklist for importing `vendor/mikuscore/src/ts/abc-io.ts` updates into `abc-player`.

It is intentionally narrower than full upstream review.
The goal is to decide whether an upstream `abc-io.ts` change is acceptable for the `abc-player` workflow.

## When To Use This

Use this checklist when:

- syncing `vendor/mikuscore/src/ts/abc-io.ts`
- syncing helper modules that `abc-io.ts` newly depends on
- reviewing an upstream `abc-io.ts` change bundle before import

## Acceptance Rule

Default rule:

- import the upstream change if it improves compatibility and the local `abc-player` acceptance gates remain green

Default rejection rule:

- do not import blindly if the change breaks acceptance tests, expands dependencies unexpectedly, or changes player-visible ABC behavior without deliberate approval

## Checklist

- [ ] Confirm the upstream change is actually centered on `abc-io.ts` and not bundled with unrelated app-level changes.
- [ ] Confirm the public API used by `abc-player` remains compatible:
  - `exportMusicXmlDomToAbc(doc)`
  - `parseMusicXmlDocument(xml)`
  - `convertAbcToMusicXml(abcSource)` when inherited import behavior matters
- [ ] Confirm any new imports introduced by `abc-io.ts` are limited and understandable.
- [ ] Confirm there is no hidden requirement to sync `mikuscore` HTML, `main.ts`, or build scripts at the same time.
- [ ] Run local `abc-player` gates:
  - `npm run typecheck`
  - `npm run test:all`
- [ ] Check the `abc-player` acceptance policy buckets:
  - lenient import still works for representative real-world cases
  - player-facing `MusicXML -> ABC` output still produces usable headers/body
  - `%@mks` roundtrip metadata still survives where `abc-player` depends on it
  - recoverable parser fallback remains recoverable and not excessively noisy
- [ ] If tests fail, classify the change before importing:
  - upstream improvement that requires local acceptance updates
  - real regression for `abc-player`

## Decision Notes

Good candidates for quick import:

- parser leniency improvements
- warning-quality improvements
- local roundtrip fixes that keep acceptance behavior green

Changes that deserve slower review:

- broad output-format changes
- metadata emission policy changes
- changes that alter warning volume or downgrade/upgrade severity
- changes that require additional helper modules or test fixtures to move together
