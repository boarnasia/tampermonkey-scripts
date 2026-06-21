---
name: create-skill-file
model: haiku
depends_on: []
---

# 目的

`.claude/skills/masatouehara--update-readme/SKILL.md` を作成する。
このスキルは `scripts/make-script-table.ts` を使って `README.md` の Scripts テーブルを自動更新する。

# 背景・制約

- プロジェクトルート: `/Volumes/外付けSSD1TB/dev/tampermonkey-scripts`
- スキルは **ローカルスキル**: `.claude/skills/masatouehara--update-readme/SKILL.md` に保存する（`~/.claude/` 配下ではない）
- `scripts/make-script-table.ts` は `src/*.js` を読んで Markdown テーブルを stdout に出力する Bun スクリプト
- README.md に `<!-- SCRIPTS_TABLE_START -->` / `<!-- SCRIPTS_TABLE_END -->` マーカーが存在する前提でスキルを書く（sub-plan 02 が追加する）
- スキルファイルのフォーマット（Claude Code 規約）:
  ```markdown
  ---
  name: masatouehara--update-readme
  description: <説明>
  ---

  <AI への指示本文>
  ```
- スキル本文は **AI への指示** として書く（ユーザー向けドキュメントではない）

# 変更ファイル

- `.claude/skills/masatouehara--update-readme/SKILL.md` ... 新規

# 手順

1. `.claude/skills/masatouehara--update-readme/` ディレクトリが存在しない場合は作成する
2. `.claude/skills/masatouehara--update-readme/SKILL.md` を以下の内容で作成する:

```markdown
---
name: masatouehara--update-readme
description: README.md の # Scripts セクションのテーブルを scripts/make-script-table.ts の出力で自動更新する
---

# masatouehara--update-readme

`scripts/make-script-table.ts` を実行して `README.md` の Scripts テーブルを最新の状態に更新する。

## 手順

1. プロジェクトルートを取得する:
   ```bash
   git rev-parse --show-toplevel
   ```

2. プロジェクトルートで `bun scripts/make-script-table.ts` を実行し、出力を変数に保持する

3. `README.md` を読み込む

4. `<!-- SCRIPTS_TABLE_START -->` と `<!-- SCRIPTS_TABLE_END -->` の間の内容を、手順 2 の出力（Markdown テーブル）で差し替える
   - マーカー行自体は残す
   - 差し替え後: `<!-- SCRIPTS_TABLE_START -->\n<テーブル>\n<!-- SCRIPTS_TABLE_END -->`

5. 更新後の `README.md` を書き込む

6. 更新内容を報告する（スクリプト名一覧と行数）
```

# 完了条件

- `.claude/skills/masatouehara--update-readme/SKILL.md` が存在する
- frontmatter に `name` と `description` が含まれている
- 本文にマーカー差し替えの手順が記述されている

# 報告

作成したファイルパスと SKILL.md の内容概要を 100 語以内で報告すること。
