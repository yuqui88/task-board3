# CLAUDE.md

このファイルは、Claude Code がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

**タスクボード** — React + Vite で構築するタスク管理アプリ。  
タスクの追加・完了チェック・削除ができ、データは localStorage に永続化される。  
`main` ブランチへの push で GitHub Pages に自動デプロイされる。

## 技術スタック

| 技術 | バージョン | 用途 |
|---|---|---|
| React | 18.x | UI コンポーネント・状態管理（`useState` / `useEffect`）|
| Vite | 5.x | 開発サーバー・本番ビルド |
| CSS Modules | — | コンポーネントスコープのスタイリング |
| localStorage | — | タスクデータの永続化 |
| GitHub Actions | — | CI/CD（自動ビルド・デプロイ）|

## 起動方法

```bash
# 依存関係インストール（初回のみ）
npm install

# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## ファイル構成と役割

```
.
├── index.html              # エントリポイント HTML
├── vite.config.js          # Vite 設定（base: '/task-board3/'）
├── src/
│   ├── main.jsx            # React マウント処理
│   ├── App.jsx             # アプリ本体（状態管理・UI）
│   ├── App.module.css      # コンポーネントスコープのスタイル
│   └── index.css           # グローバルスタイル（リセット等）
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages 自動デプロイ
```

## アーキテクチャ

`App.jsx` がアプリ全体を一つのコンポーネントとして管理するシンプルな構造。

- **状態**: `tasks`（配列）と `input`（入力文字列）のみ
- **永続化**: `useEffect` で `tasks` の変化を `localStorage` に書き込む
- **タスク構造**: `{ id: number, text: string, done: boolean }`
- **ID 採番**: モジュールスコープの `nextId` 変数でインクリメント管理
- **操作**: `addTask` / `toggleTask` / `deleteTask` の 3 関数で完結

## デプロイ

### デプロイ先 URL

**https://yuqui88.github.io/task-board3/**

### 仕組み

`main` ブランチに push すると GitHub Actions が自動で以下を実行する。

1. `npm ci` → `npm run build`
2. `dist/` を GitHub Pages に配置

`vite.config.js` の `base: '/task-board3/'` はこの公開パスに対応している。

## 命名規約

### コンポーネント

| 対象 | 規約 | 例 |
|---|---|---|
| コンポーネントファイル | PascalCase + `.jsx` | `App.jsx`, `TaskItem.jsx` |
| コンポーネント関数 | PascalCase | `export default function App()` |
| CSS Modules ファイル | コンポーネント名 + `.module.css` | `App.module.css` |

### CSS クラス（CSS Modules）

| 対象 | 規約 | 例 |
|---|---|---|
| クラス名 | camelCase | `.inputRow`, `.addButton`, `.deleteButton` |
| 状態クラス | 状態を表す単語 | `.done`, `.active` |

### 変数・関数

| 対象 | 規約 | 例 |
|---|---|---|
| 変数・状態 | camelCase | `tasks`, `input`, `nextId` |
| イベントハンドラ | `handle` + 動詞/イベント名 | `handleKeyDown` |
| 操作関数 | 動詞 + 対象 | `addTask`, `toggleTask`, `deleteTask` |
| 定数（モジュールスコープ） | UPPER_SNAKE_CASE | `STORAGE_KEY` |

## Git 運用ルール

**コードを変更するたびに、以下の手順で GitHub にプッシュすること。**

```bash
git add <変更ファイル>
git commit -m "説明的なコミットメッセージ"
git push origin main
```

### ルール詳細

- コミットメッセージは変更内容が明確にわかるように記述する
  - 例: `feat: タスクの優先度フィルターを追加`
  - 例: `fix: 空文字のタスクが追加できる不具合を修正`
- `git add .` や `git add -A` は避け、変更ファイルを明示的に指定する
- 機密情報（API キー、トークン等）を含むファイルは絶対にコミットしない
- `main` ブランチへの force push は行わない
