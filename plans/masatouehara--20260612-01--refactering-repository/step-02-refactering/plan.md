# make-script-table.ts リファクタリング調査 実装計画

## 目標
`scripts/make-script-table.ts` の各機能（CLI引数パース / UserScriptヘッダー解析 / Markdownテーブル生成）を外部パッケージで改善できるか調査し、情報を `docs/` 配下にマークダウンドキュメントとして集積する。

## sub-plan 一覧
| # | slug | モデル | 依存 | 状態 | 概要 |
| - | - | - | - | - | - |
| 01 | research-cli-args | sonnet | - | 未着手 | CLI引数パースパッケージの調査 |
| 02 | research-userscript-parser | sonnet | - | 未着手 | UserScriptメタデータパーサーの調査 |
| 03 | research-markdown-table | sonnet | - | 未着手 | Markdownテーブル生成パッケージの調査 |

## 実行波（並列グルーピング）
- Wave 1: 01, 02, 03 ← すべて独立、並列実行

## 横断的な制約
- 出力先は `plans/masatouehara--20260612-01--refactering-repository/docs/` 固定
- 出力フォーマットは frontmatter（title / url / keywords）+ 本文 の Markdown
- 対象プロジェクトは Bun + TypeScript + ESM
- コードを変更しない（調査・ドキュメント作成のみ）
- order.md を変更しない

## 未確定事項
- なし
