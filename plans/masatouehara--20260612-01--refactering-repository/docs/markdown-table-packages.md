---
title: Markdownテーブル生成パッケージ調査
url: https://www.npmjs.com/package/markdown-table
keywords: markdown table generator npm bun typescript esm
---

# Markdownテーブル生成パッケージ調査

## 調査対象

`scripts/make-script-table.ts` の手動文字列結合によるテーブル生成を外部パッケージで置き換えることを目的として、以下のパッケージを調査した。

---

## 1. markdown-table（推奨）

| 項目 | 内容 |
| --- | --- |
| npm URL | https://www.npmjs.com/package/markdown-table |
| GitHub | https://github.com/wooorm/markdown-table |
| 最新バージョン | 3.0.4 |
| 週間ダウンロード数 | 約 700〜1,200万（最大規模） |
| GitHub Stars | ~300 |
| ESM 対応 | **ESM only**（`"type": "module"` プロジェクトと完全一致） |
| Bun 互換性 | ESM only のため Bun と完全互換 |
| TypeScript 対応 | 型定義バンドル済み（`Options` 型もエクスポート） |
| Markdown pipe 形式出力 | **対応**（GFM テーブルをネイティブ生成） |
| 依存関係 | ゼロ依存 |
| メンテナ | wooorm（unified エコシステム作者、信頼性高い） |

### コード例（Bun + TypeScript）

```typescript
import { markdownTable } from 'markdown-table';

const table = markdownTable([
  ['Name', 'Version', 'Description'],
  ['my-script', '1.0.0', 'A userscript for X'],
  ['another-script', '2.1.0', 'Does Y'],
]);

console.log(table);
```

出力:

```
| Name           | Version | Description        |
| -------------- | ------- | ------------------ |
| my-script      | 1.0.0   | A userscript for X |
| another-script | 2.1.0   | Does Y             |
```

### オプション

```typescript
markdownTable(data, {
  align: ['l', 'c', 'l'],      // 列の配置（left / center / right）
  padding: true,                // セル両端のスペース（デフォルト: true）
  stringLength: (s) => s.length // 全角文字・絵文字の幅計算関数
});
```

### インストール

```sh
bun add markdown-table
```

---

## 2. tablemark

| 項目 | 内容 |
| --- | --- |
| npm URL | https://www.npmjs.com/package/tablemark |
| GitHub | https://github.com/haltcase/tablemark |
| 最新バージョン | 4.1.0 |
| 週間ダウンロード数 | 約 6.9万 |
| GitHub Stars | ~97 |
| ESM 対応 | 対応（ESM + CJS デュアル） |
| Bun 互換性 | 互換あり（公式 README に `bun add tablemark` 記載） |
| TypeScript 対応 | TypeScript で書かれており型定義バンドル済み |
| Markdown pipe 形式出力 | **対応** |
| 依存関係 | あり（ANSI / Unicode 対応のため） |
| 特徴 | JSON オブジェクト配列を直接受け取れる |

### コード例（Bun + TypeScript）

```typescript
import { tablemark } from 'tablemark';

const table = tablemark([
  { name: 'my-script', version: '1.0.0', description: 'A userscript for X' },
  { name: 'another-script', version: '2.1.0', description: 'Does Y' },
]);

console.log(table);
```

出力:

```
| Name           | Version | Description        |
| -------------- | ------- | ------------------ |
| my-script      | 1.0.0   | A userscript for X |
| another-script | 2.1.0   | Does Y             |
```

### 特徴

- オブジェクトのキーが自動でヘッダーになる
- `columns` オプションでヘッダー名・アライン・変換関数を指定可能
- ANSI エスケープコード・CJK 文字・絵文字への対応機能あり

### インストール

```sh
bun add tablemark
```

---

## 3. cli-table3（不適）

| 項目 | 内容 |
| --- | --- |
| npm URL | https://www.npmjs.com/package/cli-table3 |
| GitHub | https://github.com/cli-table/cli-table3 |
| 最新バージョン | 0.6.5 |
| 週間ダウンロード数 | 約 1,400万（非常に人気） |
| TypeScript 対応 | 型定義バンドル済み（`index.d.ts`） |
| ESM 対応 | CommonJS ベース（ESM のデュアルサポートは未確認） |
| Markdown pipe 形式出力 | **非対応**（Unicode ボーダー文字を使ったターミナル表示専用） |
| 用途 | ターミナル上のリッチ表示（`─`, `│` などの罫線文字を使用） |

### 不採用理由

cli-table3 の出力は GFM Markdown テーブル形式（`| col |`）ではなく、ターミナル向けの Unicode ボーダー文字で構成される。stdout へ Markdown テーブルを出力する本プロジェクトの用途には不適合。

---

## 比較サマリー

| パッケージ | 週間DL | ESM | Bun | TypeScript | Markdown出力 | 推奨度 |
| --- | --- | --- | --- | --- | --- | --- |
| markdown-table | ~700万〜1200万 | ESM only | ◎ | ◎ | ◎ GFM ネイティブ | **★★★** |
| tablemark | ~6.9万 | ESM+CJS | ◎ | ◎ | ◎ | **★★☆** |
| cli-table3 | ~1400万 | △ (CJS) | △ | ◎ | ✗ (ターミナル専用) | **NG** |

---

## 推奨パッケージ：`markdown-table`

**選定理由:**

1. **ESM only** でプロジェクトの `"type": "module"` と完全一致
2. **週間 700万〜1200万 DL** という圧倒的な人気と信頼性
3. **ゼロ依存**（バンドルサイズへの影響なし）
4. **GFM テーブルネイティブ出力**（`| Name | Version |` 形式）
5. TypeScript 型定義バンドル済みで追加インストール不要
6. Bun と完全互換

`tablemark` は JSON オブジェクト配列を直接扱える点で便利だが、依存関係が存在し、ダウンロード数も `markdown-table` の 1/100 程度にとどまる。シンプルなテーブル生成には `markdown-table` で十分。

### 現在の実装との対応

```typescript
// 現在の手動実装
console.log('| Name | Version | Description |');
console.log('| --- | --- | --- |');
for (const script of scripts) {
  const name = script.name.replace(/\|/g, '\\|');
  const version = script.version.replace(/\|/g, '\\|');
  const description = script.description.replace(/\|/g, '\\|');
  console.log(`| ${name} | ${version} | ${description} |`);
}

// markdown-table を使った改善後
import { markdownTable } from 'markdown-table';

const rows = scripts.map(s => [s.name, s.version, s.description]);
console.log(markdownTable([
  ['Name', 'Version', 'Description'],
  ...rows,
]));
```

`|` のエスケープ処理も `markdownTable` が内部で自動処理するため、手動エスケープも不要になる。
