# Upstream Sync Policy

## Purpose

This document defines how `abc-player` should remain easy to update from `mikuscore` in the future.

The key rule is simple:

- prefer easy upstream sync over local codebase neatness

## Background

`abc-player` is intentionally built as a narrow, player-first derivative of `mikuscore`.

Because of that, one of the main long-term values of this repository is:

- future `mikuscore` improvements should remain incorporable with low friction

If local cleanup or optimization makes that hard, it is usually the wrong trade.

## Main Strategy

The preferred implementation strategy is:

- keep much of `mikuscore` internally
- expose only `abc-player` functionality externally
- tolerate some unused or unreachable code
- minimize invasive divergence

This is a deliberate choice, not accidental technical debt.

## What To Prefer

- subtree-based upstream sync
- larger coherent upstream sync over ad-hoc slice sync when the change spans shared contracts
- thin wrappers
- thin adapters
- entry-point level customization
- UI-level hiding or disabling
- wording and product-scope restriction
- upstream option / hook / profile points when they can replace downstream-only divergence

## What To Avoid

- broad internal rewrites of upstream-derived code
- large-scale deletion of code merely because current UI does not expose it
- refactors whose main benefit is cosmetic slimming
- module graph reshaping that makes future sync difficult
- turning `abc-player` into a conceptually independent architecture too early

## Dead Code Tolerance Rule

Some dead code, dormant code paths, or currently unused upstream capability is acceptable.

That is often a better trade than aggressively pruning the codebase and making future sync expensive.

The cost of carrying some extra code is usually lower than the cost of rebuilding upstream compatibility later.

## Feature Restriction Rule

The product should be restricted mainly by:

- UI surface
- available input modes
- user-visible workflow
- product messaging

The product should not be restricted primarily by deep internal removal unless there is a very strong reason.

## Default Decision Rule

When choosing between:

- cleaner local reduction now
- easier `mikuscore` incorporation later

the default choice SHOULD be:

- easier `mikuscore` incorporation later

In practical update work, this usually means:

- upgrade vendored `mikuscore` first
- keep downstream fixes thin
- only request upstream changes after a real repeated downstream pain point is confirmed

## Exception Rule

Deviation from this policy should happen only when all of the following are true:

- the local simplification has clear practical benefit
- the benefit is not achievable by UI restriction alone
- future upstream sync cost remains acceptable
- the change is explicitly documented

## Summary

The intended model is:

- internally: broad reuse of `mikuscore`
- externally: narrow `abc-player` functionality

This policy exists to keep the project sustainable over time.

Preferred long-term direction:

- move from "downstream fork with local restriction logic" toward "thin downstream profile of `mikuscore`"

See [UPSTREAM_PROFILE_STRATEGY.md](UPSTREAM_PROFILE_STRATEGY.md).
