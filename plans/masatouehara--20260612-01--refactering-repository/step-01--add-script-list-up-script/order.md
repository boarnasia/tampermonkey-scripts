---
---

# scritps をリストアップする　スクリプト追加する

src/ 配下に tampermonkey 向けのスクリプトが入っている

tampermonkey スクリプトのヘッダから以下の項目を抜き出してリストを作成する

```
// ==UserScript==
// @name         Youtube Shorts 非表示スクリプト
// @version      1.0
// @description  YouTubeの画面からショート動画（Shorts）のセクションや動画を非表示にします。
// ==/UserScript==
```

## 仕様

言語: typescript

### 入力

- src-dir: 入力ディレクトリ, tampermonkey スクリプトが入っているディレクトリ, default=./src

### 出力

type: sring
distination: stdio
format: markdown

markdown のテーブル形式で出せればいいと思う


## その他

この出力をReadme.md にマージする形で使用したい