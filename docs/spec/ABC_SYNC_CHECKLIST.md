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

## Working Method

Default working method for `abc-player`:

1. update vendored `mikuscore` files in a coherent batch first
2. run local gates and inspect what actually broke
3. fix thin downstream expectations or UI glue in `abc-player` when the break is only local adaptation
4. only then decide whether a real upstream change request is necessary

This project should not start by speculating about new upstream switches when a straightforward vendor upgrade plus thin downstream adjustment is sufficient.

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
- [ ] If tests fail, first check whether the failure is only an outdated downstream expectation in `abc-player` rather than a real regression in vendored behavior.
- [ ] Check the `abc-player` acceptance policy buckets:
  - lenient import still works for representative real-world cases
  - player-facing `MusicXML -> ABC` output still produces usable headers/body
  - roundtrip-sensitive repeat / measure / transpose semantics still survive where `abc-player` depends on them
  - recoverable parser fallback remains recoverable and not excessively noisy
- [ ] If tests fail, classify the change before importing:
  - upstream improvement that requires only local acceptance updates
  - real regression for `abc-player`

## Decision Notes

Good candidates for quick import:

- parser leniency improvements
- warning-quality improvements
- local roundtrip fixes that keep acceptance behavior green
- changes where standard ABC surface syntax replaces older `mikuscore`-specific `%@mks` expectations without losing player-relevant semantics

Changes that deserve slower review:

- broad output-format changes
- metadata emission policy changes
- changes that alter warning volume or downgrade/upgrade severity
- changes that require additional helper modules or test fixtures to move together
