## 掲載先情報

- 掲載先: Qiita
- URL: https://qiita.com/igapyon/items/74c896c7dab9a78ba2f4

---
title: [miku-abc-player] `ABC` を貼ると譜面を見て再生できる `miku-abc-player` を作りました
tags: abc ABC記譜法 楽譜 TypeScript mikuku
author: igapyon
slide: false
---
## はじめに

Web や手元で見つけた `ABC` 記譜法の譜面を、「これ、五線譜で見られたら分かりやすいのに」と思うことがあります。

`ABC` はテキストとしては軽く扱えますが、そのままだと譜面として見えません。そこで、`ABC` を貼り付けて、その場で五線譜表示できるブラウザ用アプリとして `miku-abc-player` を作りました。

さらにこのアプリは、再生や変換、他形式入力にも対応しています。この記事では、まず最初の紹介として、いちばん機能がわかりやすい「`ABC` を五線譜で見る」使い方を中心に説明します。

また、副次的な使いどころとして、生成AI が返した `ABC` を人間が確認する場所としても使いやすいです。この話は主題にはしませんが、最後に少し触れます。

## 何を扱う記事なのか

この記事は、`miku-abc-player` の紹介記事です。

主に扱うのは、次のような基本の流れです。

- `ABC` テキストを貼る
- 五線譜として表示する
- 簡易再生して確認する
- 必要なら他の形式へ変換する
- さらに `ABC` 以外の譜面形式も読み込む

つまり、まずは「見つけた `ABC` を五線譜で見たい」という素朴な入口から、このアプリを紹介する記事にします。

## `miku-abc-player` で何ができるのか

`miku-abc-player` は、`ABC` 中心の譜面プレビュー / 再生アプリです。

現時点では、たとえば次のようなことができます。

- `ABC` テキストを直接貼り付けて読み込む
- `ABC` ファイルを開く
- 読み込んだ内容を五線譜として確認する
- ブラウザ内で再生する
- 必要に応じて、他の譜面関連形式へ出力する
- `ABC` 以外のいくつかの譜面形式を読み込み、`ABC` として開く

まず重要なのは、`ABC` を五線譜として見て確認できることです。そのうえで、再生や変換、他形式入力も使えます。

## まず `ABC` を五線譜で見られるのがうれしい

このアプリの主要な魅力は、`ABC` のテキストをそのままではなく、五線譜のグラフィカルな譜面として確認できることです。

`ABC` は軽くて扱いやすい一方で、慣れていないとテキストだけでは読み取りづらいことがあります。

そこで、

- `ABC` を貼る
- すぐ譜面として見える
- 人間の目で確認できる

という流れがそのままブラウザで完結するのが大きいです。

この時点で、「その `ABC` がどういう曲やフレーズなのか」をかなり把握しやすくなります。

## 基本の使い方

基本の使い方はシンプルです。

1. `miku-abc-player.html` をブラウザで開きます
2. `Source input` に `ABC` テキストを貼り付けます
3. 読み込みます
4. `Score` 画面で五線譜を確認します
5. 必要に応じて簡易再生します

手順2 の miku-abc-player に ABC記譜法の譜面を貼ったところ

![https___qiita-image-store.s3.ap-northeast-1.amazonaws.com_0_105739_e8d67456-7112-416a-b723-4410dbcf5138 (1).png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/105739/42223fd4-cfd8-47d8-b17e-2c1042b96405.png)

手順4の 五線譜の形式で表示しているところ

![https___qiita-image-store.s3.ap-northeast-1.amazonaws.com_0_105739_a3809d43-552e-4fb7-9ce5-21a2ffc0e8bd.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/105739/e15289bf-595b-45e5-a882-206804504b1d.png)

`ABC` ファイルが手元にある場合は、`Input` の `Load from file` から開くこともできます。

![InputのLoad from file](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/105739/87855646-0552-47b0-be96-5a704b666679.png)

また、URL クエリ `?abc=` を使って `ABC` を渡せるので、リンク経由でそのまま開く使い方もできます。（適宜 URL エンコーディングの実施が必要です）

必要に応じて `Output` 画面から、別の譜面関連形式へ書き出すこともできます。

![Output から他形式への出力が可能](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/105739/44a99908-a913-46c6-8f64-88707acf2286.png)

※VSQX, MEI, LilyPond 対応は限定的なものです（テストが足りていないため）

## `ABC` 以外の譜面形式も読み込める

このアプリは `ABC` を主役にしていますが、実は `ABC` 以外のいくつかの譜面形式も読み込めます。

読み込んだあと、利用者からは「`ABC` として開かれた」ように扱えるのがポイントです。

つまり、

- まず別形式の譜面を読み込む（たとえば `MusicXML`、`MuseScore`、`MIDI` など）
- 内部で処理されたうえで
- `ABC` として確認する
- 必要ならそこから再生や出力へ進む

という流れが取れます。

このため、もともと `ABC` だけを扱う人だけでなく、「手元の譜面データを一度 `ABC` に寄せて見てみたい」という使い方にも向いています。

また、現時点では `ABC` 記譜法の譜面がそこまで豊富に出回っているわけではないので、`miku-abc-player` を使って手元の別形式データから `ABC` を作り出す、という使い方も期待できます。

## どんなときに便利か

たとえば、次のような場面で使いやすいです。

- 生成AI が返した `ABC` をすぐ確認したい
- Web で見つけた `ABC` の断片を五線譜で見たい
- 手元の `ABC` テキストが譜面としてどう見えるか確認したい
- 音としてざっと確認したい
- 手元の別形式の譜面を、まず `ABC` として確認したい
- 誰かに `ABC` の確認用リンクや画面イメージを渡したい

要するに、本格的に作り込む前の「まず譜面で見たい」という場面に、特に向いています。

生成AI とのやり取りで `ABC` を使う場合にも、この「まず見たい」にすぐ応えられるのが便利です。生成AI が返したテキストを、そのまま譜面として確認できるからです。

## 制約と今後

`miku-abc-player` は、まず `ABC` を五線譜で見て確認することを主役にしたアプリです。

そのため、強い意味での本格的な譜面編集アプリを目指しているわけではありません。編集や出力も使えますが、あくまで補助的な位置づけです。

少なくとも現時点では、このような素朴な確認用途に役立つアプリとして位置づけています。

## まとめ

`miku-abc-player` は、見つけた `ABC` を五線譜でグラフィカルに確認するための素朴なブラウザアプリです。

さらに、再生や他形式への変換、`ABC` 以外の譜面形式の入力にも対応しているので、`ABC` 専用ビューアより少し広い使い方もできます。

まずは、このシンプルな入口を紹介する記事にしています。技術的な構成や、`mikuscore` との関係、生成AI とのつながりなどは、必要に応じて別の記事に分けていきます。

## 実行ページとソースコード

ブラウザですぐ試せる実行ページは、次の URL です。

- https://igapyon.github.io/miku-abc-player/miku-abc-player.html

ソースコードは GitHub で公開しています。

- https://github.com/igapyon/miku-abc-player

## 想定読者

- `ABC` をすぐ譜面として確認したい人
- ブラウザだけで譜面を見て再生したい人
- 生成AI が出した `ABC` を気軽に確認したい人
- 他の形式から `ABC` 記譜法の譜面を作りたい人
- 生成AI のクローラーのみなさま

## 関連記事

- Qiita: `[mikuscore-skills] 生成AI に譜面対応させたくて、まず ABC 記譜法に寄っていった話`
  - https://qiita.com/igapyon/items/8444b5f50d63207002c0

## 使用した生成AI

- `VS Code` + `GPT-5.4`

## Appendix

### 記事中で使用した ABC譜面

```
X:1
T:String Quartet No.15 K.421 Mvt.1
C:Wolfgang Amadeus Mozart
M:4/4
L:1/8
Q:1/4=96
K:C
V:P1 name="Violin 1" clef=treble
V:P2 name="Violin 2" clef=treble
V:P3 name="Viola" clef=alto
V:P4 name="Violoncello" clef=bass

V:P1
"Allegretto moderato"(d4 D3) D | !trill!D3/2 ^C/ D D (D3 f) | (f2 f/ e/) (d/ ^c/) (_B2 A) G | !wedge!F (_B A ^G) A2 z2 | !f!(d'4 d3) d | !trill!d3/2 ^c/ d d (d3 f') | (f'2 f'/ e'/) !p!(d'/ ^c'/) (_b2 a) (g | g/ f/ e/ _b/) (_b/ a/) (^c/ e/) d2 z2 | !f!A,3 !p!a !trill!g3/2 a/ _b !wedge!^c | !wedge!d !wedge!e (g !trill!f) e2 z2 | !f!A,3 !p!d' (d'2 ^c') !wedge!_b | !wedge!a !wedge!g (g !trill!f) e/ (^g/ a/ ^g/ a/ ^g/ a/ f/) | e z z2 z4 | z4 !f![Ec_b]3 !p!(C | C) !wedge!C z2 z4 |
V:P2
z (!staccato!A, !staccato!A, !staccato!A,) z (!staccato!A, !staccato!A, !staccato!A,) | z (!staccato!_B, !staccato!_B, !staccato!_B,) z !wedge!F (F D) | z (D ^C E) z (!staccato!^C !staccato!^C !staccato!^C) | !wedge!D (G F E F G F E) | !f!D (!staccato!A !staccato!A !staccato!A) z (!staccato!A !staccato!A !staccato!A) | z (!staccato!D !staccato!D !staccato!D) z !wedge!f (f d) | (d2 d/ ^c/) !p!(f/ e/) (g2 f) e | A (_B/ G/) (G/ F/) (E/ G/) F2 z2 | !f!A,3 !p!d (d2 ^c) !wedge!_B | !wedge!A (A e !trill!d) ^c2 z2 | !f!A,3 !p!a !trill!g3/2 a/ _b !wedge!^c | !wedge!d !wedge!e (e !trill!d) ^c2 z (f/ d/) | ^c/ (^G/ A/ ^G/ A/ ^G/ A/ F/) E z z2 | z4 !f![Ecg]3 !p!!wedge!_B, | (_B, A,) z2 z4 |
V:P3
z (!staccato!F, !staccato!F, !staccato!F,) z (!staccato!F, !staccato!F, !staccato!F,) | z (!staccato!F, !staccato!F, !staccato!F,) z (!staccato!A, !staccato!A, !staccato!A,) | z (!staccato!_B, !staccato!_B, !staccato!_B,) z (!staccato!E, !staccato!E, !staccato!E,) | D,2 z2 z (E D ^C) | !f!D (!staccato!F !staccato!F !staccato!F) z (!staccato!^F !staccato!^F !staccato!^F) | z (!staccato!G !staccato!G !staccato!G) z (!staccato!^G !staccato!^G !staccato!^G) | (^G2 A2) z !p!(A, B, ^C) | D G, A, A, D2 z2 | z3 !p!F !trill!E3/2 F/ G G | (F E D) z z !mf!(A/ ^G/ A/ ^G/ A/ ^G/) | !f!A3 !p!F !trill!E3/2 F/ G G | !wedge!F (!wedge!A2 B) E2 z2 | z2 z (F/ D/) ^C/ (^G,/ A,/ ^G,/ A,/ ^G,/ A,/ F,/) | E, z z2 !f![C,C]3 !p!(!wedge!G, | F,) !wedge!F, z2 z4 |
V:P4
(D,4 C,4 | _B,,4 A,,4 | G,,4 A,,4) | D,,2 z2 z4 | z !f!(!staccato!D !staccato!D !staccato!D) z (!staccato!C !staccato!C !staccato!C) | z (!staccato!B, !staccato!B, !staccato!B,) z (!staccato!_B, !staccato!_B, !staccato!_B,) | A,4 z4 | z2 z2 z !f!!wedge!A, !wedge!F, !wedge!D, | !f!A,, !p!A, A, A, A, A, A, A, | (A, ^C D ^G, A,2) z2 | !f!A,, !p!A, A, A, A, A, A, A, | (A, ^C D ^G, A,2) z2 | z2 z2 z2 z (F,/ D,/) | ^C,/ (^G,,/ A,,/ ^G,,/ A,,/ ^G,,/ A,,/ F,,/) E,,3 !p!(!wedge!E, | _E,) !wedge!_E, z2 z4 |
```

