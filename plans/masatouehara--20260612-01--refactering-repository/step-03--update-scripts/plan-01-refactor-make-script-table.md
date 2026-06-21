---
name: refactor-make-script-table
model: haiku
depends_on: []
---

# 目的
`scripts/make-script-table.ts` の CLI引数パースと Markdownテーブル生成を外部パッケージに置き換える。

# 背景・制約
- `markdown-table@^3.0.4` はすでに `bun add` 済み（package.json に記載済み）
- `util.parseArgs` は Bun / Node.js 組み込みで追加インストール不要
- UserScript ヘッダー解析（`parseScriptHeader` 関数）は変更しない
- `bun scripts/make-script-table.ts` の出力結果が変更前と同じであること
- ESM（`"type": "module"`）プロジェクト

# 変更ファイル
- `scripts/make-script-table.ts` ... 更新

# 手順
1. `scripts/make-script-table.ts` を読む
2. import 文の先頭に以下を追加する:
   ```typescript
   import { markdownTable } from 'markdown-table';
   import { parseArgs } from 'util';
   ```
3. `import * as fs from 'fs'` と `import * as path from 'path'` はそのまま残す
4. CLI引数パースを `util.parseArgs` に置き換える:
   ```typescript
   // Before
   let srcDir = './src';
   const args = process.argv.slice(2);
   for (let i = 0; i < args.length; i++) {
     if (args[i] === '--src-dir' && i + 1 < args.length) {
       srcDir = args[i + 1];
     }
   }

   // After
   const { values } = parseArgs({
     args: Bun.argv.slice(2),
     options: {
       'src-dir': {
         type: 'string',
         default: './src',
       },
     },
   });
   const srcDir = values['src-dir'] as string;
   ```
5. Markdownテーブル出力部分を `markdownTable` に置き換える:
   ```typescript
   // Before
   console.log('| Name | Version | Description |');
   console.log('| --- | --- | --- |');
   for (const script of scripts) {
     const name = script.name.replace(/\|/g, '\\|');
     const version = script.version.replace(/\|/g, '\\|');
     const description = script.description.replace(/\|/g, '\\|');
     console.log(`| ${name} | ${version} | ${description} |`);
   }

   // After
   const rows = scripts.map(s => [s.name, s.version, s.description]);
   console.log(markdownTable([
     ['Name', 'Version', 'Description'],
     ...rows,
   ]));
   ```
6. `ScriptMetadata` インターフェースと `parseScriptHeader` 関数はそのまま維持する

# 完了条件
- `bun scripts/make-script-table.ts` を実行して3スクリプト全ての Markdown テーブルが出力される
- `bun scripts/make-script-table.ts --src-dir ./src` でも同様に動作する
- TypeScript のコンパイルエラーがない（`bun --check scripts/make-script-table.ts` または実行して確認）

# 報告
変更した内容の概要と、`bun scripts/make-script-table.ts` の実行結果を200語以内で報告すること。
