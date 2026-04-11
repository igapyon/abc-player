# miku-abc-player

## English

`miku-abc-player` is a single-file web app for opening music as `ABC`, previewing the score, and playing it back locally in the browser.

It focuses on ABC-centered preview and playback. Supported non-ABC input is normalized through MusicXML and then presented as ABC.

## What You Can Do

- paste ABC text and load it directly
- open an ABC file
- import supported non-ABC files and inspect them as generated ABC
- preview score rendering in the browser
- play back the loaded score locally
- export to MIDI, MusicXML, and other score-related formats when needed
- use lightweight inherited edit/output features when needed

## Quick Start

1. Open `miku-abc-player.html` in a web browser.
2. Use `Source input` for pasted ABC text, or `File input` for file-based loading.
3. Load the score.
4. Check the rendered score and use playback.
5. Use edit or output functions only when needed.

## Input Options

- `Source input`
  - paste ABC text directly
- `File input`
- load ABC files
- load supported non-ABC files that will be normalized through MusicXML and opened as ABC

Current default input mode is `Source input`.

## Use Cases

- paste ABC text and hear it quickly
- import an ABC file and verify the result
- import a supported non-ABC file and inspect it as generated ABC
- preview score rendering before sharing or exporting
- make small confirmation-oriented adjustments before replaying
- export loaded ABC into MIDI, MusicXML, and other score-related formats when conversion is needed

## URL Query Input

- The app can accept ABC text from the `?abc=` query parameter.
- Pass URL-encoded ABC text and the app loads it into `Source input` as `ABC`.
- This flow reads only the query string already present in the URL. It does not fetch an external URL.

Example:

```text
?abc=X%3A1%0AT%3ASample%0AM%3A4%2F4%0AL%3A1%2F8%0AK%3AC%0ACDEF%7CGABc%7C
```

## Notes

- The app is intended for preview, playback, and quick verification first.
- Lightweight editing and output are available, but they are secondary.
- The single-file distribution artifact is designed to run locally in the browser.

## Screenshots

![Input screen](docs/screenshots/screen01.png)
English: Input screen for providing ABC directly or importing another supported format that will be normalized through MusicXML and opened as ABC.  
日本語: ABC を直接入力するか、他の対応形式を読み込んで MusicXML 正規化経由で ABC として開くための Input 画面です。

![Score screen](docs/screenshots/screen02.png)
English: Score screen showing rendered notation for visual confirmation together with playback controls.  
日本語: 描画された譜面を見て内容を確認し、そのまま簡易再生できる Score 画面です。

![Edit screen](docs/screenshots/screen03.png)
English: Edit screen for lightweight note and measure adjustment inherited from mikuscore.  
日本語: mikuscore 由来の軽量で簡易な編集機能で、音符などの調整を行う Edit 画面です。

![Output screen](docs/screenshots/screen04.png)
English: Output screen for exporting the current work as ABC, MIDI, MusicXML, and other score-related formats.  
日本語: 現在の内容を ABC、MIDI、MusicXML などの譜面関連形式として書き出すための Output 画面です。

## 日本語

`miku-abc-player` は、音楽データを `ABC` として開き、譜面プレビューと再生をブラウザ内でローカルに行うための single-file web app です。

ABC 中心のプレビューと再生を主目的にしています。ABC 以外のいくつかの形式データも読み書きできます。

## できること

- ABC テキストを貼り付けて読み込む
- ABC ファイルを開く
- ABC 以外の対応形式を読み込み、生成された ABC として確認する
- ブラウザ内で譜面表示を確認する
- ローカルで再生する
- 必要に応じて MIDI、MusicXML などの譜面関連形式へ書き出す
- 必要に応じて軽量な編集・出力機能を使う

## 使い方

1. `miku-abc-player.html` を Web ブラウザで開きます。
2. ABC を貼り付ける場合は `Source input`、ファイルを読み込む場合は `File input` を使います。
3. 譜面を読み込みます。
4. 描画結果を確認し、必要に応じて再生します。
5. 編集や出力は必要な場合だけ使います。

## 入力方法

- `Source input`
  - ABC テキストを直接貼り付ける
- `File input`
  - ABC ファイルを読み込む
  - ABC 以外の対応形式を読み込み、MusicXML 正規化を経て ABC として開く

現在のデフォルト入力モードは `Source input` です。

## 利用例

- ABC テキストを貼り付けてすぐに音を確認したい
- ABC ファイルを読み込んで内容を確認したい
- ABC 以外の対応形式を読み込み、生成された ABC として確認したい
- 共有や書き出しの前に譜面表示を確認したい
- 再生前に小さな確認用修正を行いたい
- 必要に応じて、読み込んだ ABC を MIDI や MusicXML などの譜面関連形式へ書き出したい

## URL クエリ入力

- アプリは `?abc=` クエリパラメータから ABC テキストを受け取れます。
- URL エンコードした ABC テキストを渡すと、`Source input` の `ABC` として読み込みます。
- この動作は URL に含まれているクエリ文字列を読むだけで、外部 URL の取得は行いません。

例:

```text
?abc=X%3A1%0AT%3ASample%0AM%3A4%2F4%0AL%3A1%2F8%0AK%3AC%0ACDEF%7CGABc%7C
```

## 注意

- このアプリは、まずプレビュー、再生、簡易確認を目的としています。
- 軽量な編集と出力は利用できますが、主目的ではありません。
- 単一 HTML の配布物として、ブラウザ内でローカル動作する前提です。

## Project Notes

This project intentionally reuses and mimics `mikuscore` as much as practical.

`miku-abc-player` is a smaller derived app, not a full clone of `mikuscore`.
Its primary value is preview, playback, and quick verification, not strong score editing.

Useful project documents:

- [CHANGELOG.md](CHANGELOG.md)
- [docs/README.md](docs/README.md)
- [docs/MIMIC_POLICY.md](docs/MIMIC_POLICY.md)
- [docs/PRODUCT_POSITIONING.md](docs/PRODUCT_POSITIONING.md)
- [docs/UPSTREAM_PROFILE_STRATEGY.md](docs/UPSTREAM_PROFILE_STRATEGY.md)

## License

This repository is licensed under Apache License 2.0.

Vendored components keep their own license and notice files where applicable.
