# masatouehara--update-readme スキル作成 実装結果

実施日: 2026-06-21
対象: plans/masatouehara--20260612-01--refactering-repository/step-04--create-update-readme-skill/order.md

## 概要

`scripts/make-script-table.ts` の出力で `README.md` の Scripts テーブルを自動更新するローカルスキル `masatouehara--update-readme` を作成した。
スキルファイルはプロジェクト内の `.claude/skills/masatouehara--update-readme/SKILL.md` に配置（ローカルスキル）。
README.md には差し替え範囲を示す `<!-- SCRIPTS_TABLE_START -->` / `<!-- SCRIPTS_TABLE_END -->` マーカーを追加した。

## sub-plan 実行結果

| # | slug | モデル | 状態 |
| - | - | - | - |
| 01 | create-skill-file | haiku | 完了 |
| 02 | add-readme-markers | haiku | 完了 |

## 変更ファイル

### 新規
- `.claude/skills/masatouehara--update-readme/SKILL.md` ... ローカルスキルファイル（README Scripts テーブル自動更新）

### 更新
- `README.md` ... `# Scripts` セクションのテーブルを `<!-- SCRIPTS_TABLE_START/END -->` マーカーで囲んだ

## アーキテクチャ上の決定

- **ローカルスキル採用**: order.md の注意事項（スキルファイルの保存先は `./.claude/skills/`）に従いプロジェクトローカルとした
- **マーカー方式**: `# Scripts` ヘッダー以降の正規表現ではなく HTML コメントマーカーで差し替え範囲を明示。README 構造変更に対して堅牢

## 自動検証

- `bun scripts/make-script-table.ts` → 成功（3スクリプトのテーブル出力）

## 人間に確認してほしい動作

- `/masatouehara--update-readme` を呼び出してスキルが正常に動作するか確認（Claude Code が `.claude/skills/` を認識し、README.md のテーブルが更新されること）

## 残課題 / スコープ外

- なし
