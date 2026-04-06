# Changelog

## 2026-04-06

### Changed
- Synced vendored `mikuscore` from upstream `c3f3fd9` to `c134a4b`.
- Regenerated `abc-player.html` to reflect the updated vendored parser/runtime assets.

### Benefits
- Improved `ABC -> MusicXML` import robustness in `abc-player` through upstream parser hardening.
- More partially unsupported or non-strict `ABC` inputs now load with warnings instead of failing the whole import.
- Better tolerance for body-side standalone `K:` / `M:` / `L:` / `Q:` shorthand in practical `ABC` inputs.
- Reduced whole-tune failure risk from malformed continuation markers, unsupported directives, malformed accidental leftovers, invalid note lengths, and unsupported octave ranges.
