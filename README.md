# マインドマップアプリ (TypeScript + React + Storybook)

React 18とTypeScriptで構築されたマインドマップアプリケーションです。機能別のモジュラーアーキテクチャを採用しています。

## デモプレイ
https://yunbow.github.io/react-app-mindmap/demo/

## 主要機能

### ノード管理
- ノードの追加・編集・削除
- ノードのドラッグ&ドロップ移動
- 階層構造での親子関係管理
- ノードの色・フォントサイズのカスタマイズ
- マインドマップの保存・読込機能（localStorage）

### 操作方法
- **ノード追加**: ツールバーの「ノード追加」ボタンまたは右クリックメニュー
- **ノード編集**: ダブルクリックでインライン編集、または編集パネルで詳細編集
- **ノード削除**: 右クリックメニューまたはツールバーの「ノード削除」ボタン
- **色変更**: 右クリックメニューまたは編集パネル
- **ズーム**: Ctrl+ホイール
- **保存・読込**: ツールバーの「保存」「読込」ボタン

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - プログラミング言語
- **Storybook 7** - コンポーネント開発・ドキュメント
- **CSS Modules** - スタイリング
- **Vite** - ビルドツール

## プロジェクト構造

```
src/
├── features/                   # 機能別モジュール
│   └── mindmap/                # マインドマップ機能
│       ├── MindMapApp/         # 機能ルートコンポーネント
│       ├── components/         # 機能専用コンポーネント
│       │   ├── MindMapCanvas/  # キャンバス領域
│       │   ├── MindMapNode/    # ノードコンポーネント
│       │   ├── NodeEditor/     # ノード編集パネル
│       │   ├── SavedMapsList/  # 保存済みマップリスト
│       │   ├── ColorPicker/    # カラーピッカー
│       │   ├── ContextMenu/    # 右クリックメニュー
│       │   └── Toolbar/        # ツールバー
│       ├── useMindMapStorage.ts # ストレージ管理フック
│       └── types.ts            # 機能固有の型定義
├── components/                 # 共通UIコンポーネント
│   ├── Button/                 # 操作ボタン
│   ├── Input/                  # テキスト・カラー入力
│   ├── Label/                  # ラベル表示
│   ├── Select/                 # セレクトボックス
│   ├── TextArea/               # テキストエリア
│   ├── Modal/                  # モーダルダイアログ
│   └── FormGroup/              # フォームグループ
├── stories/                    # Storybook用ストーリー
├── utils/                      # ユーティリティ関数
├── Config.ts                   # 設定値
├── App.tsx                     # メインアプリ
└── main.tsx                    # エントリーポイント
```

## スクリプト

```bash
# セットアップ
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# Storybook起動
npm run storybook

# Storybook ビルド
npm run build-storybook
```

## ライセンス

MIT License