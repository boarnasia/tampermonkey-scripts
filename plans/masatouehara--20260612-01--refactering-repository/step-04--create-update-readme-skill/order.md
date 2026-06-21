---
---

# `masatouehara--update-readme` スキルを作成する

`scripts/make-script-table.ts` を使って `README.md` の Scripts セクションを自動更新する Claude Code スキルを作成する。

## スキルの動作

`/masatouehara--update-readme` を呼び出すと:

1. `bun scripts/make-script-table.ts` を実行して Markdown テーブルを生成する
2. `README.md` の `# Scripts` セクション配下のテーブルを、生成したテーブルで差し替える
3. 変更内容を報告する

## 成果物

### 1. スキルファイル

**場所:** `./.claude/skills/masatouehara--update-readme/SKILL.md`

フォーマット（Claude Code スキルの規約に従う）:

```markdown
---
name: masatouehara--update-readme
description: <スキルの説明>
---

<AIへの指示（本文）>
```

### 2. README.md のマーカー追加

スキルがテーブルの差し替え範囲を確実に特定できるよう、`README.md` の Scripts セクションに HTML コメントのマーカーを追加する。

```markdown
# Scripts

<!-- SCRIPTS_TABLE_START -->
| Name | Version | Description |
| --- | --- | --- |
...
<!-- SCRIPTS_TABLE_END -->
```

スキルは `<!-- SCRIPTS_TABLE_START -->` と `<!-- SCRIPTS_TABLE_END -->` の間を差し替える。

## 注意事項

- スキルファイルの保存先は `./.claude/skills/` 配下（このプロジェクト専用すきる）
- スキルはプロジェクトルートで `bun` コマンドを実行する前提
  - プロジェクトルートの特定方法: `git rev-parse --show-toplevel` で取得する
- `bun scripts/make-script-table.ts` は `src/` ディレクトリを前提としているため、スキル呼び出し時のカレントディレクトリがプロジェクトルートであること

## 完了条件

- `./.claude/skills/masatouehara--update-readme/SKILL.md` が作成されている
- `README.md` に `<!-- SCRIPTS_TABLE_START -->` / `<!-- SCRIPTS_TABLE_END -->` マーカーが追加されている
- `/masatouehara--update-readme` を呼び出すとスキルが実行できる（Claude Code が認識する）
