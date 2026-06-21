---
name: list-scripts-cli
model: haiku
depends_on: []
---

# 目的
`src/` 配下の Tampermonkey スクリプトのヘッダーを解析し、`@name`・`@version`・`@description` を Markdown テーブル形式で stdout に出力する TypeScript CLI ツールを `scripts/make-script-table.ts` として作成する。

# 背景・制約
- Bun を使用（`bun scripts/make-script-table.ts` で実行）
- `node` / `ts-node` / `npm` は使わない
- 出力先は stdout のみ（ファイル書き込みなし）
- `--src-dir` オプションで入力ディレクトリを指定可能（default: `./src`）
- TypeScript で記述

# 変更ファイル
- `scripts/make-script-table.ts` ... 新規作成

# 手順
1. `scripts/make-script-table.ts` を作成する
2. コマンドライン引数 `--src-dir <path>` を解析し、デフォルトを `./src` とする
3. 指定ディレクトリ内の `.js` ファイルを列挙する（`Bun.file` / `fs.readdirSync`）
4. 各ファイルを読み込み、`// ==UserScript==` ～ `// ==/UserScript==` 間の行から以下を抽出する:
   - `@name`
   - `@version`
   - `@description`
5. 抽出結果を以下の Markdown テーブル形式で stdout に出力する:

```
| Name | Version | Description |
| --- | --- | --- |
| Youtube Shorts 非表示スクリプト | 1.0 | YouTubeの画面から... |
...
```

# 完了条件
- `bun scripts/make-script-table.ts` を実行すると Markdown テーブルが stdout に出力される
- `bun scripts/make-script-table.ts --src-dir ./src` でも同様に動作する
- `src/` の3ファイル全てが行に表示される

# 報告
変更・作成したファイル一覧と、`bun scripts/make-script-table.ts` の出力結果を200語以内で報告すること。
