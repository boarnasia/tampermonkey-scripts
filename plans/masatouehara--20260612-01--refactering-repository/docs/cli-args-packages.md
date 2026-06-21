---
title: CLI引数パースパッケージ調査
url: https://npmtrends.com/cac-vs-commander-vs-minimist-vs-sade-vs-yargs
keywords: bun typescript cli argument parser lightweight options
---

# CLI引数パースパッケージ調査

`scripts/make-script-table.ts` における `process.argv` の手動ループ実装を置き換えるパッケージの調査結果。

## 調査対象パッケージ

### 1. `util.parseArgs`（Node.js / Bun 組み込み）

- **URL**: https://bun.com/docs/guides/process/argv
- **週間ダウンロード**: ゼロインストール（ランタイム組み込み）
- **Bun 互換性**: ネイティブ対応（`import { parseArgs } from "util"` で利用可）
- **型定義**: `@types/bun` または `bun-types` に含まれる
- **依存パッケージ**: なし

```typescript
import { parseArgs } from "util";

const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    "src-dir": {
      type: "string",
      default: "./src",
    },
  },
  strict: true,
  allowPositionals: true,
});

const srcDir = values["src-dir"] as string;
```

**メリット**: 外部依存ゼロ、Bun/Node.js 両対応、型安全  
**デメリット**: サブコマンド非対応、ヘルプ自動生成なし

---

### 2. `citty`（UnJS製）

- **URL**: https://github.com/unjs/citty / https://www.npmjs.com/package/citty
- **週間ダウンロード**: 約 2,010 万（2026年時点）
- **GitHub Stars**: 約 1.2k
- **Bun 互換性**: 対応（ESM、TypeScript ネイティブ）
- **型定義**: パッケージに同梱
- **バンドルサイズ**: 34.6 kB（gzip 3.0 kB）

```typescript
import { defineCommand, runMain } from "citty";

const main = defineCommand({
  meta: {
    name: "make-script-table",
    description: "Generate script table",
  },
  args: {
    "src-dir": {
      type: "string",
      description: "Source directory",
      default: "./src",
    },
  },
  run({ args }) {
    const srcDir = args["src-dir"];
    console.log("srcDir:", srcDir);
  },
});

runMain(main);
```

**メリット**: サブコマンド対応、ヘルプ自動生成、軽量、UnJS エコシステムとの統合  
**デメリット**: minimist ほど枯れていない（Stars 少なめ）

---

### 3. `minimist`

- **URL**: https://www.npmjs.com/package/minimist
- **週間ダウンロード**: 約 8,160 万（2026年時点）
- **GitHub Stars**: 多数（最も広く使われる軽量パーサの一つ）
- **Bun 互換性**: 対応（純粋な JS ライブラリ、依存なし）
- **型定義**: `@types/minimist` を別途インストール

```typescript
import minimist from "minimist";

const args = minimist(Bun.argv.slice(2), {
  string: ["src-dir"],
  default: { "src-dir": "./src" },
});

const srcDir: string = args["src-dir"];
```

**メリット**: 最軽量クラス、枯れた実績、広大な採用実績  
**デメリット**: 型定義が別パッケージ、ヘルプ自動生成なし、開発がほぼ停滞

---

### 4. `cleye`

- **URL**: https://github.com/privatenumber/cleye / https://www.npmjs.com/package/cleye
- **Bun 互換性**: 対応（ESM + TypeScript、Bun 利用ブログ記事あり）
- **型定義**: パッケージに同梱（強力な TypeScript 型推論）

```typescript
import { cli } from "cleye";

const argv = cli({
  name: "make-script-table",
  flags: {
    srcDir: {
      type: String,
      description: "Source directory",
      default: "./src",
    },
  },
});

const srcDir = argv.flags.srcDir;
```

**メリット**: 型安全性が最も高い（flags の型が自動推論）、ヘルプ自動生成  
**デメリット**: ダウンロード数は citty/minimist より少ない

---

### 5. `commander`

- **URL**: https://www.npmjs.com/package/commander
- **週間ダウンロード**: 約 5,000 万（2026年時点）
- **GitHub Stars**: 最多クラス
- **Bun 互換性**: 対応
- **型定義**: パッケージに同梱

```typescript
import { program } from "commander";

program
  .option("--src-dir <dir>", "Source directory", "./src")
  .parse(Bun.argv);

const { srcDir } = program.opts();
```

**メリット**: 最も広く使われる、ヘルプ自動生成、バリデーション豊富  
**デメリット**: 今回のユースケースには機能過多

---

## 比較表

| パッケージ | 週間DL | 型定義 | Bun対応 | ヘルプ生成 | 依存ゼロ | 備考 |
|---|---|---|---|---|---|---|
| `util.parseArgs` | ランタイム内蔵 | あり | ネイティブ | なし | - | 外部依存ゼロが最大の強み |
| `citty` | 約2,010万 | 同梱 | あり | あり | あり | UnJS、軽量かつ機能十分 |
| `minimist` | 約8,160万 | 別途 `@types/minimist` | あり | なし | あり | 最枯れ、最軽量 |
| `cleye` | 少ない | 同梱（推論強力） | あり | あり | あり | 型安全性最高 |
| `commander` | 約5,000万 | 同梱 | あり | あり | なし | 機能過多気味 |

---

## 推奨

`scripts/make-script-table.ts` のユースケース（`--src-dir` 1オプションのみ）に対して:

### 第1推奨: `util.parseArgs`（組み込み）

外部パッケージを一切追加せずに使える。Bun/Node.js 両対応で型定義も組み込み済み。今回のシンプルな用途に最も適合する。

### 第2推奨: `citty`

将来的にサブコマンドやヘルプ生成が必要になった場合に備えて、UnJS エコシステムとの親和性も高い `citty` が次点。軽量（gzip 3kB）で TypeScript ネイティブ。

---

## 参考URL

- https://bun.com/docs/guides/process/argv
- https://bun.com/reference/node/util/parseArgs
- https://github.com/unjs/citty
- https://www.npmjs.com/package/citty
- https://github.com/privatenumber/cleye
- https://www.npmjs.com/package/minimist
- https://npmtrends.com/cac-vs-commander-vs-minimist-vs-sade-vs-yargs
