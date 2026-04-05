# Upstream Sync Retrospective (2026-04-06)

## Purpose

This document records what actually happened when `abc-player` updated its vendored `mikuscore` copy from upstream `576aefa` to `37066f8`.

This is not just a procedure note.
It captures:

- what changed in practice
- what initially looked risky
- what actually broke
- what turned out not to require upstream changes
- what context should be remembered next time

## Upstream Context

The relevant upstream change was:

- `b8349e2` `ABC 互換パーサと ABC I/O の対応範囲を拡張し、仕様・回帰テストを強化`
- merged into `mikuscore/devel` as `37066f8`

Files changed upstream in the relevant batch:

- `src/ts/abc-io.ts`
- `tests/unit/abc-io.spec.ts`
- `docs/spec/ABC_IO.md`
- `docs/spec/abc-compat-parser-ebnf.md`
- `TODO.md`
- generated artifacts `src/js/main.js`, `mikuscore.html`

## What Initially Looked Scary

At first glance, the change looked like a broad parser expansion and therefore high-risk for `abc-player`.

Reasons for concern:

- `abc-player` depends directly on vendored `abc-io.ts`
- `mikuscore` is MusicXML-centered, so ABC changes can also change `ABC <-> MusicXML` contracts
- `abc-player` acceptance tests had explicit expectations around `%@mks` repeat metadata and diagnostics
- there was concern that upstream might need new product-profile switches

## What Actually Changed

In practice, this was not only a parser update.
It was a broader `ABC <-> MusicXML` behavior update.

Observed practical changes included:

- broader ABC parser compatibility
- stronger standard repeat / ending handling
- more standard ABC surface syntax on export
- reduced reliance on `%@mks` comments for repeat/key cases now expressible in standard ABC
- broader ABC I/O coverage documented and tested upstream

The important point is:

- the semantic contract changed more than the public function names changed

## What We Actually Did

The successful working method was:

1. update vendored `mikuscore` files first
2. run `npm run typecheck`
3. run `npm run test:all`
4. inspect failures before inventing any upstream request
5. fix only thin downstream expectations in `abc-player`

Vendored files updated in practice:

- [vendor/mikuscore/src/ts/abc-io.ts](/Users/igapyon/Documents/git/abc-player/vendor/mikuscore/src/ts/abc-io.ts)
- [vendor/mikuscore/tests/unit/abc-io.spec.ts](/Users/igapyon/Documents/git/abc-player/vendor/mikuscore/tests/unit/abc-io.spec.ts)
- [vendor/mikuscore/docs/spec/ABC_IO.md](/Users/igapyon/Documents/git/abc-player/vendor/mikuscore/docs/spec/ABC_IO.md)
- [vendor/mikuscore/docs/spec/abc-compat-parser-ebnf.md](/Users/igapyon/Documents/git/abc-player/vendor/mikuscore/docs/spec/abc-compat-parser-ebnf.md)
- [vendor/mikuscore/TODO.md](/Users/igapyon/Documents/git/abc-player/vendor/mikuscore/TODO.md)
- [vendor/mikuscore/src/js/main.js](/Users/igapyon/Documents/git/abc-player/vendor/mikuscore/src/js/main.js)
- [vendor/mikuscore/mikuscore.html](/Users/igapyon/Documents/git/abc-player/vendor/mikuscore/mikuscore.html)

## What Broke

After the vendor update:

- `npm run typecheck` passed immediately
- `npm run test:all` failed only in `abc-player` acceptance tests

The failures were not core runtime breakage.
They were outdated downstream assertions in:

- [tests/unit/abc-io-acceptance.spec.ts](/Users/igapyon/Documents/git/abc-player/tests/unit/abc-io-acceptance.spec.ts)

Specifically:

- alternate ending import no longer emitted the diagnostic count that the old test expected
- exported ABC no longer carried `%@mks measure ... repeat=...` for standard repeat cases
- exported ABC used standard repeat/ending syntax such as `|:`, `:|`, `[1`
- `times="2"` no longer roundtripped as a retained non-standard hint in the tested case

## What Did Not Break

The following did **not** require changes:

- [src/ts/main.ts](/Users/igapyon/Documents/git/abc-player/src/ts/main.ts)
- [src/ts/abc-player-integration.ts](/Users/igapyon/Documents/git/abc-player/src/ts/abc-player-integration.ts)
- local selector / title / hidden-panel logic
- sample-load integration path

This matters because earlier reasoning overestimated the need for:

- new upstream profile switches
- upstream changes for current `abc-player` UI customization

For this update, those were unnecessary.

## Thin Downstream Fixes That Were Enough

The only code-level downstream adjustment needed was:

- update `abc-player` acceptance expectations to follow the newer standard-ABC-first export behavior

That meant changing tests so they assert:

- repeat / ending semantics survive
- transpose / measure semantics survive
- player-facing behavior remains loadable

and not over-assert:

- exact `%@mks` repeat comments
- exact old diagnostic presence
- exact old ABC spelling when semantics are preserved

## Main Knowledge Gained

### 1. Upgrade first, theorize second

The most important lesson is:

- do the vendor upgrade first
- measure breakage second
- only then decide whether deeper design action is needed

Earlier reasoning spent too much time on possible upstream hooks before confirming whether the current downstream layer could absorb the change.

### 2. `%@mks` is not the semantic contract

For `abc-player`, the important contract is:

- whether repeat / measure / transpose semantics survive the `ABC <-> MusicXML` path

It is **not**:

- whether those semantics are spelled in exactly the same `%@mks` comments as before

This was the most concrete acceptance-policy correction learned from the update.

### 3. `abc-player` currently depends more on semantics than on exact text shape

The current downstream implementation tolerated the upstream change because:

- public entry points stayed the same
- `ScoreCore` still accepted the resulting MusicXML
- the sample-based workflow still worked
- the local UI integration did not depend on the changed ABC surface details

### 4. Current `main.ts` differences are not the real sync pain

This update did not break the current `main.ts`-level overrides.

So the immediate sync pain is not:

- app title
- hidden sections
- help wording
- sample button interception

The real sync sensitivity is:

- `ABC <-> MusicXML` behavior
- downstream acceptance assumptions

## Practical Rule For Next Time

Next time, start with this assumption:

- a broad upstream `abc-io.ts` update may look scary, but first check whether only `abc-player` acceptance expectations are stale

Recommended order:

1. upgrade vendored upstream files
2. run local gates
3. inspect whether failures are:
   - stale downstream assertions
   - thin UI glue mismatch
   - or real player-visible regressions
4. only escalate to upstream-change discussion if step 3 reveals a real repeated downstream pain

## Result

The update was successful.

Final practical outcome:

- vendored `mikuscore` updated
- `abc-player` local runtime glue unchanged
- local acceptance updated
- `npm run typecheck` passed
- `npm run test:all` passed

## Same-Day Follow-Up

Later on 2026-04-06, `abc-player` imported a further upstream `mikuscore/devel` batch from `37066f8` to `c3f3fd9`.

That later batch included additional `abc-io.ts` coverage expansion together with upstream docs/tests and generated artifacts, including:

- `vendor/mikuscore/src/ts/abc-io.ts`
- `vendor/mikuscore/tests/unit/abc-io.spec.ts`
- `vendor/mikuscore/docs/spec/ABC_IO.md`
- `vendor/mikuscore/docs/spec/abc-compat-parser-ebnf.md`
- `vendor/mikuscore/docs/spec/ABC_STANDARD_COVERAGE.md`
- `vendor/mikuscore/README.md`
- `vendor/mikuscore/docs/FORMAT_COVERAGE.md`
- `vendor/mikuscore/TODO.md`
- `vendor/mikuscore/src/js/main.js`
- `vendor/mikuscore/mikuscore.html`

Observed result for that later batch:

- `npm run typecheck` passed
- `npm run test:all` passed
- no `abc-player` source changes were required
- no `abc-player` acceptance-test expectation changes were required

This follow-up strengthens the practical conclusion from the earlier update:

- the current `abc-player` sync boundary is good enough to absorb at least some further `abc-io.ts`-centered upstream growth unchanged
- the first action should still be to import the vendor batch and run local gates before theorizing about additional downstream or upstream design work

## Related Documents

- [docs/spec/ABC_SYNC_CHECKLIST.md](/Users/igapyon/Documents/git/abc-player/docs/spec/ABC_SYNC_CHECKLIST.md)
- [docs/spec/ABC_ACCEPTANCE_POLICY.md](/Users/igapyon/Documents/git/abc-player/docs/spec/ABC_ACCEPTANCE_POLICY.md)
- [docs/UPSTREAM_SYNC_POLICY.md](/Users/igapyon/Documents/git/abc-player/docs/UPSTREAM_SYNC_POLICY.md)
- [tests/unit/abc-io-acceptance.spec.ts](/Users/igapyon/Documents/git/abc-player/tests/unit/abc-io-acceptance.spec.ts)
