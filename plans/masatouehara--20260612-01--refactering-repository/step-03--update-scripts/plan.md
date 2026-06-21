# make-script-table.ts リファクタリング実装計画

## 目標
`scripts/make-script-table.ts` の CLI引数パースを `util.parseArgs`（組み込み）に、Markdownテーブル生成を `markdown-table` パッケージに置き換える。UserScript ヘッダー解析は変更しない。

## sub-plan 一覧
| # | slug | モデル | 依存 | 状態 | 概要 |
| - | - | - | - | - | - |
| 01 | refactor-make-script-table | haiku | - | 未着手 | `scripts/make-script-table.ts` の2箇所を置き換え |

## 実行波（並列グルーピング）
- Wave 1: 01（単独）

## 横断的な制約
- `markdown-table` はインストール済み（`bun add` 不要）
- `util.parseArgs` は組み込みなので追加インストール不要
- UserScript ヘッダー解析（`parseScriptHeader` 関数）は変更しない
- dev サーバーを起動しない
- `npm` を使わない（Bun を使う）

## 未確定事項
- なし
