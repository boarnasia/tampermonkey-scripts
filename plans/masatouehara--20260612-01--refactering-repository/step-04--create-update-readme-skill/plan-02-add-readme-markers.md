---
name: add-readme-markers
model: haiku
depends_on: []
---

# 目的

`README.md` の `# Scripts` セクション内の既存テーブルを HTML コメントマーカーで囲む。
スキルがテーブルの差し替え範囲を確実に特定できるようにするため。

# 背景・制約

- プロジェクトルート: `/Volumes/外付けSSD1TB/dev/tampermonkey-scripts`
- 現在の `README.md` の `# Scripts` セクション（マーカーなし）:
  ```markdown
  # Scripts

  | Name | Version | Description |
  | --- | --- | --- |
  | Facebook リール非表示スクリプト | 1.0 | ... |
  | Facebook おすすめのグループ非表示スクリプト | 1.0 | ... |
  | Youtube Shorts 非表示スクリプト | 1.0 | ... |
  ```
- 追加後の形式:
  ```markdown
  # Scripts

  <!-- SCRIPTS_TABLE_START -->
  | Name | Version | Description |
  | --- | --- | --- |
  | Facebook リール非表示スクリプト | 1.0 | ... |
  | Facebook おすすめのグループ非表示スクリプト | 1.0 | ... |
  | Youtube Shorts 非表示スクリプト | 1.0 | ... |
  <!-- SCRIPTS_TABLE_END -->
  ```
- マーカーはテーブルの直前・直後に挿入する（空行の扱いに注意）
- `# Scripts` 行と `<!-- SCRIPTS_TABLE_START -->` の間には空行を1つ置く

# 変更ファイル

- `README.md` ... 更新

# 手順

1. `/Volumes/外付けSSD1TB/dev/tampermonkey-scripts/README.md` を読む
2. `# Scripts` セクションのテーブル（`| Name | ...` から最後のテーブル行まで）を特定する
3. テーブルの直前に `<!-- SCRIPTS_TABLE_START -->` を挿入し、テーブルの直後に `<!-- SCRIPTS_TABLE_END -->` を挿入する
4. ファイルを保存する

期待する最終形（README.md 全体）:
```markdown
# tampermonkey-scripts

Tampermokey scripts repository

# Scripts

<!-- SCRIPTS_TABLE_START -->
| Name | Version | Description |
| --- | --- | --- |
| Facebook リール非表示スクリプト | 1.0 | Facebookのフィード上に表示されるリールセクションを自動的に非表示にします。 |
| Facebook おすすめのグループ非表示スクリプト | 1.0 | Facebookのフィード上に表示される「おすすめのグループ」セクションを自動的に非表示にします。 |
| Youtube Shorts 非表示スクリプト | 1.0 | YouTubeの画面からショート動画（Shorts）のセクションや動画を非表示にします。 |
<!-- SCRIPTS_TABLE_END -->
```

# 完了条件

- `README.md` に `<!-- SCRIPTS_TABLE_START -->` が含まれている
- `README.md` に `<!-- SCRIPTS_TABLE_END -->` が含まれている
- マーカーが既存テーブルを正確に囲んでいる
- `# tampermonkey-scripts` や `# Scripts` の見出しが変わっていない

# 報告

変更前後の diff（該当行のみ）を 100 語以内で報告すること。
