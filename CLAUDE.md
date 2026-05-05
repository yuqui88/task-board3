# CLAUDE.md

このファイルは、Claude Code がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

**タスクボード** — React + Vite で構築するタスク管理アプリ。  
タスクの追加・完了チェック・削除ができ、データは localStorage に永続化される。  
`main` ブランチへの push で GitHub Pages に自動デプロイされる。

## 技術スタック

| 技術 | バージョン |
|---|---|
| React | 18.x |
| Vite | 5.x |
| CSS Modules | — |

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
├── vite.config.js          # Vite 設定（base: '/task-board/'）
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

`main` ブランチに push すると GitHub Actions が自動で以下を実行する。

1. `npm ci` → `npm run build`
2. `dist/` を GitHub Pages に配置

`vite.config.js` の `base: '/task-board/'` はこの公開パスに対応している。

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
