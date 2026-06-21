# make-script-table.ts リファクタリング調査 実装結果

実施日: 2026-06-21
対象: plans/masatouehara--20260612-01--refactering-repository/step-02-refactering/order.md

## 概要
`scripts/make-script-table.ts` の3つの改善領域（CLI引数パース / UserScriptヘッダー解析 / Markdownテーブル生成）について外部パッケージを調査し、それぞれ `docs/` 配下にマークダウンドキュメントとして出力した。

## sub-plan 実行結果
| # | slug | モデル | 状態 |
| - | - | - | - |
| 01 | research-cli-args | sonnet | 完了 |
| 02 | research-userscript-parser | sonnet | 完了 |
| 03 | research-markdown-table | sonnet | 完了 |

## 変更ファイル
### 新規
- `plans/.../docs/cli-args-packages.md` ... CLI引数パースパッケージ調査（5パッケージ比較）
- `plans/.../docs/userscript-parser-packages.md` ... UserScriptパーサー調査（4パッケージ + 現行維持推奨）
- `plans/.../docs/markdown-table-packages.md` ... Markdownテーブル生成パッケージ調査（3パッケージ比較）

## 調査結果サマリー

### CLI引数パース → `util.parseArgs`（組み込み）推奨
- Bun/Node.js 組み込みの `util.parseArgs` で外部依存ゼロで解決可能
- 将来サブコマンドが必要なら `citty`（週2010万DL、gzip 3kB）が次点

### UserScriptヘッダー解析 → 現行の正規表現実装を維持
- 全専用パッケージが5〜9年間メンテナンス停止・週数百DL以下
- TypeScript + Bun ESM 環境で安心して使えるものがない
- インターフェース定義を明示した形に整理するのが最善

### Markdownテーブル生成 → `markdown-table` 推奨
- ESM only、週700〜1200万DL、ゼロ依存、型定義バンドル済み
- `|` のエスケープ処理も自動化され、手動コードを削減可能
- `bun add markdown-table` のみで導入可能

## 自動検証
- コード変更なし（調査・ドキュメント作成のみ）のため検証なし

## 人間に確認してほしい動作
- なし（調査結果の内容確認はドキュメントを参照）

## 残課題 / スコープ外
- 実際のリファクタリング実装は本タスクのスコープ外（次タスクで対応）
- `make-script-table.ts` に `util.parseArgs` + `markdown-table` を適用するコードは doc に例示済み
