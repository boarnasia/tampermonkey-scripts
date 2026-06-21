# scripts リストアップツール 実装結果

実施日: 2026-06-21
対象: plans/masatouehara--20260612-01--refactering-repository/step-01--add-script-list-up-script/order.md

## 概要
`src/` 配下の Tampermonkey スクリプトの UserScript ヘッダーを解析し、`@name`・`@version`・`@description` を Markdown テーブル形式で stdout に出力する CLI ツール `scripts/make-script-table.ts` を作成した。`--src-dir` オプションで入力ディレクトリの変更が可能。

## sub-plan 実行結果
| # | slug | モデル | 状態 |
| - | - | - | - |
| 01 | list-scripts-cli | haiku | 完了 |

## 変更ファイル
### 新規
- `scripts/make-script-table.ts` ... `src/` の .js ファイルを解析して Markdown テーブルを stdout 出力する CLI ツール

### 更新
- `plans/.../plan-01-list-scripts-cli.md` ... ファイル名を `make-script-table.ts` に変更反映

## アーキテクチャ上の決定
- ユーザーの指示により `list-scripts.ts` → `make-script-table.ts` にリネーム
- Node.js 互換の `fs`・`path` モジュールを使用（Bun でそのまま動作する）
- Markdown テーブルの `|` 文字をエスケープする処理を含む

## 自動検証
- `bun scripts/make-script-table.ts` → 成功、3スクリプト全ての行が出力された

## 実行出力
```
| Name | Version | Description |
| --- | --- | --- |
| Facebook リール非表示スクリプト | 1.0 | Facebookのフィード上に表示されるリールセクションを自動的に非表示にします。 |
| Facebook おすすめのグループ非表示スクリプト | 1.0 | Facebookのフィード上に表示される「おすすめのグループ」セクションを自動的に非表示にします。 |
| Youtube Shorts 非表示スクリプト | 1.0 | YouTubeの画面からショート動画（Shorts）のセクションや動画を非表示にします。 |
```

## 人間に確認してほしい動作
- README.md へのマージは本タスクのスコープ外。次タスクで対応予定。

## 残課題 / スコープ外
- README.md への自動マージ（order.md の「その他」に記載されていたが本タスクのスコープ外と判断）
