---
---

# scripts/make-script-table.ts をリファクタリングする

step-02 の調査結果をもとに `scripts/make-script-table.ts` を更新する。

## 変更内容

### 1. Markdown テーブル生成 → `markdown-table` パッケージを使用

現在の手動文字列結合を `markdown-table` で置き換える。

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
import { markdownTable } from 'markdown-table';

const rows = scripts.map(s => [s.name, s.version, s.description]);
console.log(markdownTable([
  ['Name', 'Version', 'Description'],
  ...rows,
]));
```

`markdown-table` はすでに `bun add` 済み。

### 2. CLI 引数パース → `util.parseArgs` を使用

現在の手動ループを `util.parseArgs` で置き換える。

```typescript
// Before
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--src-dir' && i + 1 < args.length) {
    srcDir = args[i + 1];
  }
}

// After
import { parseArgs } from 'util';

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

### 3. UserScript ヘッダー解析 → そのまま維持

正規表現ベースの実装は変更しない。

## 完了条件

- `bun scripts/make-script-table.ts` を実行して、step-01 と同じ出力が得られること
- `bun scripts/make-script-table.ts --src-dir ./src` でも同様に動作すること
