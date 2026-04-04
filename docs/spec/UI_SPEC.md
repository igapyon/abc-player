# UI Specification (Initial)

## Purpose

This document defines the initial intended UI behavior for `abc-player`.

The key design rule is:

- preserve `mikuscore` structure where useful
- simplify mainly at the input surface
- present the app as playback-first

## Top-Level Structure

The top-level single-page flow SHOULD remain close to `mikuscore`:

1. Input
2. Score
3. Edit
4. Output

## Input Behavior

The `Input` panel SHOULD remain ABC-centered while allowing broader file import.

### Supported entry modes

- ABC file input
- ABC source text input
- supported non-ABC file input that is normalized through MusicXML and then opened as ABC

### Removed direct source modes from UI

- MusicXML input
- MuseScore input
- MIDI input
- VSQX input
- MEI input
- LilyPond input

These direct source-specific text entry surfaces MAY stay hidden even when file import for the same formats is supported.

### Notes

- ABC text input SHOULD be preserved or created explicitly if missing in the derived UI
- imported non-ABC files SHOULD appear to the user as ABC after MusicXML normalization
- if a `New Score` surface remains temporarily, it SHOULD be treated as optional and subject to later review

## Score Behavior

The `Score` panel MAY initially remain close to `mikuscore`.

Expected retained capabilities:

- score preview
- playback controls
- selection flow into edit

## Edit Behavior

The `Edit` panel MAY initially remain close to `mikuscore`.

Rationale:

- this lowers initial implementation cost
- inherited edit capability is acceptable as a secondary feature

## Output Behavior

The `Output` panel MAY initially remain close to `mikuscore`.

Rationale:

- export surfaces already exist upstream
- retaining them is cheaper than re-specifying a reduced export stack immediately

## Messaging Rule

Even if `Edit` and `Output` remain present, UI wording SHOULD gradually present the app as:

- an ABC player
- a tool that can open supported formats as ABC
- a preview/check tool
- a lightweight derivative of `mikuscore`

and not as a strong full editor.
