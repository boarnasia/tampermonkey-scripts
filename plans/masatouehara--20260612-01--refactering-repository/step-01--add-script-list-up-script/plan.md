# scripts リストアップツール 実装計画

## 目標
`src/` 配下の Tampermonkey スクリプトの UserScript ヘッダーを解析し、`@name`・`@version`・`@description` を Markdown テーブルとして stdout に出力する TypeScript CLI ツールを作成する。将来的に README.md へのマージに使用する想定。

## sub-plan 一覧
| # | slug | モデル | 依存 | 状態 | 概要 |
| - | - | - | - | - | - |
| 01 | list-scripts-cli | haiku | - | 未着手 | `scripts/list-scripts.ts` の新規作成 |

## 実行波（並列グルーピング）
- Wave 1: 01（依存なし、単独実行）

## 横断的な制約
- Bun を使用（`bun` / `bunx`）。`npm` / `node` / `ts-node` は使わない
- TypeScript で記述
- dev サーバーを起動しない
- order.md は変更しない

## 未確定事項
- なし（シンプルな単一スクリプト実装）
