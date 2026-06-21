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
