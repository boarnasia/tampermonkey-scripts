---
title: UserScriptメタデータパーサーパッケージ調査
url: https://www.npmjs.com/package/userscript-meta
keywords: tampermonkey userscript metadata parser npm bun typescript
---

# UserScript メタデータパーサーパッケージ調査

## 調査概要

`// ==UserScript==` ～ `// ==/UserScript==` 形式のメタデータブロックを解析できる npm パッケージを調査した。

---

## 候補パッケージ一覧

### 1. `userscript-meta`

- **npm:** https://www.npmjs.com/package/userscript-meta
- **GitHub:** https://github.com/pd4d10/userscript-meta
- **最新バージョン:** 1.0.1
- **最終公開日:** 2016年10月（約9年前、メンテナンス停止状態）
- **週間ダウンロード数:** 約264件
- **ライセンス:** MIT
- **TypeScript 型定義:** なし（JavaScript のみ）
- **依存パッケージ:** なし

**概要:**
`parse()` と `stringify()` の2関数を提供する最もシンプルなパッケージ。同一キーが複数ある場合（例: `@match`）は配列として返す。

**使用例（CommonJS）:**

```javascript
const userscript = require('userscript-meta')

const meta = userscript.parse(`
  // ==UserScript==
  // @name         Youtube Shorts 非表示スクリプト
  // @version      1.0
  // @description  YouTubeの画面からショート動画を非表示にします。
  // @match        https://www.youtube.com/*
  // ==/UserScript==
`)
// => { name: 'Youtube Shorts 非表示スクリプト', version: '1.0', description: '...', match: 'https://www.youtube.com/*' }
```

**Bun での使用:**
CJS モジュールのため `require()` 形式。Bun は CommonJS を透過的にサポートしているので動作は可能だが、ESM import ではなく `createRequire()` または `import()` が必要になる場合がある。TypeScript 型定義がないため `@types` パッケージも存在せず、型安全性はゼロ。

---

### 2. `userscript-metadata`

- **npm:** https://www.npmjs.com/package/userscript-metadata
- **GitHub:** https://github.com/SimonAlling/userscript-metadata
- **最新バージョン:** 1.1.0
- **最終公開日:** 2021年9月（約5年前）
- **週間ダウンロード数:** 約401件
- **ライセンス:** MIT
- **TypeScript 型定義:** あり（`dist/index.d.ts`）
- **依存パッケージ:** `extract-comments`, `is-ip`, `is-valid-domain`

**概要:**
TypeScript で書かれた強型付きライブラリ。メタデータのバリデーション・解析・文字列化の3機能を提供する。エラーハンドリングが充実しているが、バリデーションルールのカスタマイズが必須で設定が複雑。

**使用例（TypeScript）:**

```typescript
import { readAndValidateWith } from 'userscript-metadata'

// カスタムバリデーター定義が必要（シンプルな parse だけを行う API がない）
const result = readAndValidateWith(myValidator)(scriptContent)
```

**Bun での使用:**
TypeScript 対応だが、`extract-comments` 等の依存が CJS であり Bun での ESM 互換性が不明。また使い始めるための設定コストが高く、単純なヘッダー抽出には過剰な機能を持つ。

---

### 3. `userscript-parser`

- **npm:** https://www.npmjs.com/package/userscript-parser
- **最新バージョン:** 2.2.2
- **最終公開日:** 約7年前（2017〜2018年頃）
- **週間ダウンロード数:** 約50件
- **TypeScript 型定義:** なし

**概要:**
ダウンロード数が極めて少なく、メンテナンスも停止している。採用理由なし。

---

### 4. `userscript-meta-f4w`

- **npm:** https://www.npmjs.com/package/userscript-meta-f4w
- **GitHub:** https://github.com/JenieX/userscript-meta-f4w
- **Stars:** 1
- **TypeScript 型定義:** 不明（情報少）

**概要:**
`userscript-meta` のフォーク。Stars 1 でコミュニティの支持が低い。採用理由なし。

---

## 比較表

| パッケージ | バージョン | 最終更新 | 週次DL | TypeScript | Bun 互換 | 推奨度 |
|---|---|---|---|---|---|---|
| `userscript-meta` | 1.0.1 | 2016年（停止） | 264 | ✗ | △（CJS） | △ |
| `userscript-metadata` | 1.1.0 | 2021年（停止） | 401 | ✓ | △（要確認） | △ |
| `userscript-parser` | 2.2.2 | 2017年（停止） | 50 | ✗ | 不明 | ✗ |
| `userscript-meta-f4w` | - | 不明 | 不明 | 不明 | 不明 | ✗ |

---

## 結論と推奨

### 推奨: 専用パッケージを使わず、現行の正規表現実装を維持する

調査した全パッケージが**メンテナンス停止状態**であり、週間ダウンロード数も数百件程度と極めて低い。TypeScript + Bun 環境で安心して使えるパッケージは存在しない。

専用パッケージ導入のデメリット:

1. **型安全性**: `userscript-meta` に型定義がなく、`userscript-metadata` はバリデーター設定が複雑
2. **Bun 互換性**: いずれも CJS ベースまたは未検証であり、Bun ESM 環境での動作保証がない
3. **メンテナンスリスク**: 全パッケージが5〜9年間更新されておらず、脆弱性対応が期待できない
4. **機能の過不足**: `userscript-meta` はシンプルすぎて型がなく、`userscript-metadata` は過剰に複雑

### 代替案: 現行実装を型付き関数として整理する

現在の `parseScriptHeader()` の正規表現ベース実装を、TypeScript インターフェースを明確にしたユーティリティ関数として整理するのが最善。

```typescript
// 改善例: 型定義を明示したパーサー関数
interface UserScriptMeta {
  name: string;
  version?: string;
  description?: string;
  namespace?: string;
  author?: string;
  match?: string | string[];
  [key: string]: string | string[] | undefined;
}

function parseUserScriptMeta(content: string): UserScriptMeta | null {
  const headerMatch = content.match(
    /\/\/ ==UserScript==\n([\s\S]*?)\n\/\/ ==\/UserScript==/
  );
  if (!headerMatch) return null;

  const result: Record<string, string | string[]> = {};
  const lines = headerMatch[1].split('\n');
  for (const line of lines) {
    const m = line.match(/\/\/ @(\S+)\s+(.*)/);
    if (!m) continue;
    const [, key, value] = m;
    const trimmed = value.trim();
    if (key in result) {
      result[key] = Array.isArray(result[key])
        ? [...(result[key] as string[]), trimmed]
        : [result[key] as string, trimmed];
    } else {
      result[key] = trimmed;
    }
  }
  return result as UserScriptMeta;
}
```

---

## 参考リンク

- [userscript-meta - npm](https://www.npmjs.com/package/userscript-meta)
- [userscript-metadata - npm](https://www.npmjs.com/package/userscript-metadata)
- [userscript-parser - npm](https://www.npmjs.com/package/userscript-parser)
- [pd4d10/userscript-meta - GitHub](https://github.com/pd4d10/userscript-meta)
- [SimonAlling/userscript-metadata - GitHub](https://github.com/SimonAlling/userscript-metadata)
- [npm Downloads API](https://api.npmjs.org/downloads/point/last-week/userscript-meta)
