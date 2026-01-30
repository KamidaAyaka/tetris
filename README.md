# テトリスゲーム

ReactとNode.jsで作成されたフルスタックのテトリスゲームです。

## 機能

### フロントエンド（React + Vite）
- クラシックなテトリスゲームプレイ
- スムーズなアニメーションと美しいUI
- 次のピースのプレビュー
- スコアとライン数の表示
- ゲームオーバー検出
- 一時停止機能

### バックエンド（Node.js + Express）
- ハイスコアの保存と取得
- トップ10ランキング
- RESTful API

## 操作方法

- **← →**: ピースを左右に移動
- **↑**: ピースを回転
- **↓**: 高速落下
- **Space**: ハードドロップ（一気に落とす）
- **P**: 一時停止/再開

## セットアップと起動

### 前提条件
- Node.js 18以上

### インストール

#### バックエンド
```bash
cd backend
npm install
```

#### フロントエンド
```bash
cd frontend
npm install
```

### 起動

#### バックエンド（ポート5000）
```bash
cd backend
npm run dev
```

#### フロントエンド（ポート3000）
```bash
cd frontend
npm run dev
```

### アクセス
- ゲーム: http://localhost:3000
- API: http://localhost:5000

## API エンドポイント

### `GET /api/scores`
トップ10のハイスコアを取得

### `POST /api/scores`
新しいスコアを保存
```json
{
  "playerName": "プレイヤー名",
  "score": 1000,
  "lines": 10
}
```

### `DELETE /api/scores`
すべてのスコアをリセット（開発用）

## プロジェクト構造

```
tetoris/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reactコンポーネント
│   │   ├── hooks/           # カスタムフック
│   │   ├── utils/           # ユーティリティ関数
│   │   ├── App.jsx          # メインアプリ
│   │   └── index.jsx        # エントリーポイント
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── server.js            # Expressサーバー
    ├── scores.json          # スコアデータ（自動生成）
    └── package.json
```

## スコアリング

- 1ライン消去: 100点
- 2ライン消去: 300点
- 3ライン消去: 500点
- 4ライン消去（テトリス）: 800点

## ゲームルール

- ボードサイズ: 10×20
- 7種類のテトロミノ（I, J, L, O, S, T, Z）
- 10ライン消去毎にスピードアップ
- ピースが上部に到達するとゲームオーバー

## GitHub Pages での公開

このプロジェクトはGitHub Pagesで公開できます。

### セットアップ手順

1. **GitHubで新しいリポジトリを作成**
   - リポジトリ名: `tetris`
   - Public リポジトリとして設定

2. **ローカルリポジトリを GitHub に接続**
   ```bash
   git remote add origin https://github.com/あなたのユーザー名/tetris.git
   git branch -M main
   git push -u origin main
   ```

3. **GitHub Pages をセットアップ**
   - リポジトリの Settings > Pages に移動
   - Source を "Deploy from a branch" に設定
   - Branch を "gh-pages" に設定

4. **デプロイメント**
   ```bash
   cd frontend
   npm install
   npm run deploy
   ```

5. **アクセス**
   - URL: `https://あなたのユーザー名.github.io/tetris/`

### 注意事項

- GitHub Pages は静的コンテンツをホストするため、バックエンドのスコア保存機能は動作しません
- フロントエンドのみが公開されます
- API呼び出しは外部のバックエンドサービスを指すように変更してください
