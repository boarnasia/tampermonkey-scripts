---
name: research-cli-args
model: sonnet
depends_on: []
---

# 目的
`scripts/make-script-table.ts` の CLI引数パース部分を改善できる外部パッケージを調査し、結果を docs ディレクトリにマークダウンファイルとして出力する。

# 背景・制約
- 現在の実装は `process.argv.slice(2)` を手動ループして `--src-dir` オプションを解析している
- Bun 環境（`bun scripts/make-script-table.ts --src-dir ./src`）で動作すること
- TypeScript 対応であること
- 軽量・シンプルであることが望ましい（大規模フレームワーク不要）
- 出力先: `plans/masatouehara--20260612-01--refactering-repository/docs/`

# 変更ファイル
- `plans/masatouehara--20260612-01--refactering-repository/docs/cli-args-packages.md` ... 新規作成

# 手順
1. Web 検索で Bun/TypeScript 向けの CLI引数パースパッケージを調査する
   - 検索キーワード例: "bun typescript cli argument parser lightweight", "minimist commander yargs bun compatible"
   - 候補: `minimist`, `commander`, `yargs`, `cleye`, `meow`, `cac`, `citty` など
2. 各パッケージについて以下を確認する:
   - npm ページ / GitHub の URL
   - 週間ダウンロード数・Stars などの人気度
   - Bun との互換性
   - 型定義の有無
   - 基本的な使い方（`--src-dir ./src` のようなオプション定義のコード例）
3. 調査結果を以下のフォーマットで `docs/cli-args-packages.md` に出力する:

```markdown
---
title: CLI引数パースパッケージ調査
url: <主要な情報源URL>
keywords: bun typescript cli argument parser lightweight options
---

<各パッケージの説明・比較・推奨>
```

# 完了条件
- `plans/masatouehara--20260612-01--refactering-repository/docs/cli-args-packages.md` が作成されている
- frontmatter（title, url, keywords）が含まれている
- 少なくとも2〜3パッケージの比較が含まれている
- Bun で使用する際のコード例が含まれている

# 報告
作成したファイルのパスと、推奨パッケージ名を200語以内で報告すること。
