# masatouehara--update-readme スキル作成 実装計画

## 目標

`scripts/make-script-table.ts` の出力で `README.md` の Scripts テーブルを自動更新するローカル Claude Code スキルを作成する。
スキルファイルは `.claude/skills/masatouehara--update-readme/SKILL.md`（プロジェクトローカル）に置く。
README.md には差し替え範囲を示す HTML コメントマーカーを追加する。

## sub-plan 一覧

| # | slug | モデル | 依存 | 状態 | 概要 |
| - | - | - | - | - | - |
| 01 | create-skill-file | haiku | - | 未着手 | `.claude/skills/masatouehara--update-readme/SKILL.md` を作成 |
| 02 | add-readme-markers | haiku | - | 未着手 | `README.md` の Scripts テーブルを HTML コメントマーカーで囲む |

## 実行波（並列グルーピング）

- Wave 1: 01, 02 ← 並列（互いに独立）

## 横断的な制約

- ローカルスキル: `./.claude/skills/` 配下（グローバルの `~/.claude/skills/` ではない）
- `bun` を使う（npm/node 禁止）
- dev サーバーは起動しない

## 未確定事項

- なし
