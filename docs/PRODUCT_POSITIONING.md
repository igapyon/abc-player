# Product Positioning

## Purpose

This document defines how `abc-player` should be presented and understood as a product.

## Short Definition

`abc-player` is a playback-first, preview-first ABC-centered notation web app.

It is derived from `mikuscore`, but it is not positioned as a strong score editor.

## Core Value

The main user value is:

- load ABC quickly
- open supported non-ABC formats as ABC
- preview the score
- listen to the result
- make small adjustments if needed

## Why `player`

The project intentionally uses `player` as its identity because:

- playback and preview are the main user goals
- `mikuscore` editing capability is intentionally lightweight
- inherited edit/export features may remain, but they are not the product center

## Primary Use Cases

- paste ABC text and hear it
- import an ABC file and verify it
- import a supported non-ABC file and inspect the generated ABC
- preview score rendering from ABC
- do small corrections before replaying
- export when needed through inherited `mikuscore` functionality

## Secondary Use Cases

- limited edit operations inherited from `mikuscore`
- lightweight export workflows inherited from `mikuscore`

These are useful, but not the main reason the app exists.

## Non-Goals

`abc-player` is not intended to be:

- a full-featured notation editor
- a broad score-conversion workbench
- a replacement for dedicated engraving software

## Relationship to `mikuscore`

`abc-player` should be understood as a narrower derivative of `mikuscore`.

`mikuscore` contributes:

- project structure
- build model
- UI conventions
- ABC-related logic
- playback-related logic
- lightweight edit/export surfaces

`abc-player` narrows the product around ABC playback, preview, and lightweight conversion.
Supported non-ABC imports are acceptable when they are normalized through MusicXML and opened as ABC for the user-facing workflow.

## Messaging Rule

When describing the app in README, docs, UI copy, or future release notes:

- emphasize playback first
- emphasize preview/check workflow second
- describe non-ABC import as "opened as ABC" rather than as a general conversion workbench
- mention editing/export only as lightweight inherited capability

## Summary

The right mental model is:

- `mikuscore`: broader score tool with lightweight editing
- `abc-player`: ABC-centered player that can open supported formats as ABC, with inherited lightweight editing/export
