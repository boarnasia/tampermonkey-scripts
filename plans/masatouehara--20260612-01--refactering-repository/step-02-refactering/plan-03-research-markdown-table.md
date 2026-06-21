---
name: research-markdown-table
model: sonnet
depends_on: []
---

# 目的
`scripts/make-script-table.ts` の Markdown テーブル生成部分を改善できる外部パッケージを調査し、結果を docs ディレクトリにマークダウンファイルとして出力する。

# 背景・制約
- 現在の実装は `console.log('| Name | Version | Description |')` のような手動文字列結合でテーブルを生成している
- `|` 文字のエスケープ処理も手動で行っている
- Bun 環境で動作すること
- TypeScript 対応であること
- ESM 対応（`"type": "module"` のプロジェクト）
- 出力先: `plans/masatouehara--20260612-01--refactering-repository/docs/`

# 変更ファイル
- `plans/masatouehara--20260612-01--refactering-repository/docs/markdown-table-packages.md` ... 新規作成

# 手順
1. Web 検索で Markdown テーブル生成パッケージを調査する
   - 検索キーワード例: "markdown table generator npm typescript", "markdown-table npm bun esm"
   - 候補: `markdown-table`, `cli-table3`, `tty-table`, `easy-table` など
2. 各パッケージについて以下を確認する:
   - npm ページ / GitHub の URL
   - 週間ダウンロード数・Stars などの人気度
   - Bun / ESM との互換性
   - 型定義の有無
   - Markdown テーブル形式（`| col | col |` 形式）の出力対応
   - 基本的な使い方のコード例
3. 調査結果を以下のフォーマットで `docs/markdown-table-packages.md` に出力する:

```markdown
---
title: Markdownテーブル生成パッケージ調査
url: <主要な情報源URL>
keywords: markdown table generator npm bun typescript esm
---

<各パッケージの説明・比較・推奨>
```

# 完了条件
- `plans/masatouehara--20260612-01--refactering-repository/docs/markdown-table-packages.md` が作成されている
- frontmatter（title, url, keywords）が含まれている
- 少なくとも2〜3パッケージの比較が含まれている
- Bun で使用する際のコード例が含まれている

# 報告
作成したファイルのパスと、推奨パッケージ名を200語以内で報告すること。
