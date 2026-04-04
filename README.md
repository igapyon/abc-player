# Mikuku's abc-player

`Mikuku's abc-player` is a single-file web app for local ABC preview and quick playback, with export to MIDI and other score formats via mikuscore-derived functionality.

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

`Mikuku's abc-player` aims to provide a small, local, offline-capable ABC player with:

- ABC text input
- ABC file input
- score preview
- quick playback
- export to MIDI and other score formats
- smartphone-friendly single-page UI

Lightweight editing and output are inherited from `mikuscore`, but playback and preview remain primary.

## Relationship to `mikuscore`

This repository vendors `mikuscore` under `vendor/mikuscore/`.

The intention is:

- reuse existing ABC-related assets
- reuse existing playback-related assets
- reuse the single-file build philosophy
- reuse the `lht-cmn` UI component direction
- stay close to the same TypeScript and test baseline

`Mikuku's abc-player` is a smaller derived app, not a full clone of `mikuscore`.

Its primary value is preview, playback, and quick verification, not strong score editing.

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
- export when needed
- make small confirmation-oriented adjustments when needed

Secondary:

- lightweight edit inherited from `mikuscore`
- export inherited from `mikuscore`

Non-goal:

- become a strong full-featured score editor

## Use Cases

- paste ABC text and hear it quickly
- import an ABC file and verify the result
- preview score rendering before sharing or exporting
- make small confirmation-oriented adjustments before replaying
- export loaded ABC into MIDI, MusicXML, and other score-related formats when conversion is needed

- ABC テキストを貼り付けてすぐに音を確認したい
- ABC ファイルを読み込んで内容を確認したい
- 共有や書き出しの前に譜面表示を確認したい
- 再生前に小さな確認用修正を行いたい
- 必要に応じて、読み込んだ ABC を MIDI や MusicXML などの譜面関連形式へ書き出したい

## How It Works

- load ABC in the browser
- convert ABC into internal score data through reused `mikuscore` assets
- render the score for preview
- play back the score locally in the browser

- ブラウザ内で ABC を読み込む
- 再利用している `mikuscore` アセットを通じて内部の譜面データへ変換する
- プレビュー用に譜面を描画する
- ブラウザ内で譜面をローカル再生する

## Screenshots

![Input screen](docs/screenshots/screen01.png)
English: Input screen for providing the ABC score text you want to use, either by loading a file or by pasting the text directly.  
日本語: 使用したい ABC 譜面テキストを、ファイル読み込みまたは直接貼り付けで与えるための Input 画面です。

![Score screen](docs/screenshots/screen02.png)
English: Score screen showing rendered notation for visual confirmation together with playback controls.  
日本語: 描画された譜面を見て内容を確認し、そのまま簡易再生できる Score 画面です。

![Edit screen](docs/screenshots/screen03.png)
English: Edit screen for lightweight note and measure adjustment inherited from mikuscore.  
日本語: mikuscore 由来の軽量で簡易な編集機能で、音符などの調整を行う Edit 画面です。

![Output screen](docs/screenshots/screen04.png)
English: Output screen for exporting the current work as ABC, MIDI, MusicXML, and other score-related formats.  
日本語: 現在の内容を ABC、MIDI、MusicXML などの譜面関連形式として書き出すための Output 画面です。

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
