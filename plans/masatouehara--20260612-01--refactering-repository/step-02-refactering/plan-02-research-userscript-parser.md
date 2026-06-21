---
name: research-userscript-parser
model: sonnet
depends_on: []
---

# 目的
`scripts/make-script-table.ts` の UserScript メタデータ解析部分を改善できる外部パッケージを調査し、結果を docs ディレクトリにマークダウンファイルとして出力する。

# 背景・制約
- 現在の実装は正規表現で `// ==UserScript==` ～ `// ==/UserScript==` のブロックを抽出し、`@name` / `@version` / `@description` を手動 regex でパースしている
- Bun 環境で動作すること
- TypeScript 対応であること
- 対象フォーマット例:
  ```
  // ==UserScript==
  // @name         Youtube Shorts 非表示スクリプト
  // @version      1.0
  // @description  YouTubeの画面からショート動画（Shorts）のセクションや動画を非表示にします。
  // ==/UserScript==
  ```
- 出力先: `plans/masatouehara--20260612-01--refactering-repository/docs/`

# 変更ファイル
- `plans/masatouehara--20260612-01--refactering-repository/docs/userscript-parser-packages.md` ... 新規作成

# 手順
1. Web 検索で UserScript メタデータパーサーパッケージを調査する
   - 検索キーワード例: "tampermonkey userscript metadata parser npm", "parse userscript header javascript"
   - 候補: `userscript-meta`, `parse-userscript-meta`, `@types/greasemonkey` など
2. 各パッケージについて以下を確認する:
   - npm ページ / GitHub の URL
   - 週間ダウンロード数・Stars などの人気度
   - Bun との互換性
   - 型定義の有無
   - 基本的な使い方のコード例
   - 取得できるフィールド一覧
3. 調査結果を以下のフォーマットで `docs/userscript-parser-packages.md` に出力する:

```markdown
---
title: UserScriptメタデータパーサーパッケージ調査
url: <主要な情報源URL>
keywords: tampermonkey userscript metadata parser npm bun typescript
---

<各パッケージの説明・比較・推奨>
```

# 完了条件
- `plans/masatouehara--20260612-01--refactering-repository/docs/userscript-parser-packages.md` が作成されている
- frontmatter（title, url, keywords）が含まれている
- 少なくとも1〜2パッケージの情報が含まれている（見つからない場合はその旨を記載）
- Bun で使用する際のコード例が含まれている

# 報告
作成したファイルのパスと、推奨パッケージ名（または「専用パッケージは存在しない」という結論）を200語以内で報告すること。
