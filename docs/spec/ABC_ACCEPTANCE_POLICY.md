# ABC Acceptance Policy

## Purpose

This document defines what kinds of `ABC` conversion changes are acceptable for `abc-player` when syncing `vendor/mikuscore/src/ts/abc-io.ts`.

`abc-player` is not the primary implementation home for `abc-io.ts`.
Its job is to accept upstream improvements while rejecting changes that materially harm the player-first workflow.

## Scope

This policy applies to:

- `MusicXML -> ABC`
- `ABC -> MusicXML`
- practical roundtrip behavior through the vendored `mikuscore` `abc-io.ts`

This policy is narrower than the full upstream `mikuscore` `ABC` specification.
It is an `abc-player` acceptance policy, not a full normative format spec.

## Acceptance Priorities

The following are highest priority for `abc-player`:

- supported content can still be opened as `ABC`
- resulting `ABC` remains playable / previewable in the inherited workflow
- recoverable compatibility cases do not become fatal unexpectedly
- roundtrip-sensitive metadata needed by `abc-player` is not dropped accidentally

## Acceptable Deltas

The following kinds of upstream changes are usually acceptable:

- broader parser leniency for real-world `ABC` inputs
- warning wording changes, if the issue remains non-fatal and the warning volume stays reasonable
- formatting-only `ABC` output changes that do not break playback-oriented use
- equivalent `ABC` spellings that preserve practical musical meaning for the player workflow
- additional `%@mks` metadata when it does not break existing parsing or create noisy regressions

## Non-Acceptable Deltas

The following should fail `abc-player` acceptance unless explicitly re-approved:

- previously loadable player-target inputs become fatal
- `MusicXML -> ABC` output loses basic headers or fails to produce practical note content
- repeat / transpose / measure metadata needed by `abc-player` roundtrip is lost unexpectedly
- slur / tie / tuplet handling regresses in a way that breaks roundtrip acceptance tests
- diagnostic behavior becomes substantially noisier or changes from recoverable warning to hard failure without a deliberate product decision

## Default Test Gate

Upstream `abc-io.ts` sync is expected to keep the following green in `abc-player`:

- real-world lenient import cases
- overfull compatibility behavior
- slur / tie / tuplet roundtrip behavior
- `%@mks` measure / repeat / transpose metadata roundtrip
- player-facing `MusicXML -> ABC` header/body expectations
- representative multi-voice / sample-driven acceptance cases
- UI-adjacent sample-load integration behavior for the local `abc-player` wrapper logic

## Policy Buckets

Map acceptance checks into the following buckets:

- `lenient_import`
  - repeat-ending markers and similar real-world compatibility cases
- `compat_reflow`
  - overfull compatibility behavior that keeps the player workflow usable
- `roundtrip_structure`
  - slur / tie / tuplet behavior
  - `%@mks` measure / repeat / transpose metadata
- `player_output`
  - `MusicXML -> ABC` header/body expectations needed by the player-first workflow
- `diagnostic_quality`
  - recoverable warning / diagnostic behavior
- `workflow_sample`
  - sample-driven paths close to `abc-player` runtime usage

If upstream change volume grows, new fixtures/tests should be attached to one of these buckets instead of adding ad-hoc acceptance rules.

## Review Rule

If a sync changes `ABC` output but all acceptance tests stay green, the default interpretation is:

- acceptable unless there is a specific user-visible regression in `abc-player`

If a sync causes acceptance tests to fail, the default interpretation is:

- do not import blindly
- first decide whether the change is:
  - an upstream improvement that requires `abc-player` acceptance updates
  - or a real regression for `abc-player`
