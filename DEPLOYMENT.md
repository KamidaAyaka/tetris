# GitHub Pages デプロイメントガイド

このドキュメントでは、テトリスゲームをGitHub Pagesで公開するための手順を説明します。

## 前提条件

- GitHubアカウント
- Node.js 18 以上
- Git がインストール済み

## ステップ1: GitHub リポジトリを作成

1. [GitHub](https://github.com/new) にログインして新しいリポジトリを作成
2. リポジトリ名: `tetris`
3. **Public** として設定
4. "Create repository" をクリック

## ステップ2: ローカルリポジトリを GitHub に接続

```bash
git remote add origin https://github.com/あなたのユーザー名/tetris.git
git branch -M main
git push -u origin main
```

## ステップ3: GitHub Pages を有効化

1. GitHub リポジトリの **Settings** タブを開く
2. 左側メニューから **Pages** を選択
3. **Build and deployment** セクションで:
   - **Source**: "Deploy from a branch" を選択
   - **Branch**: `gh-pages` を選択
4. **Save** をクリック

## ステップ4: パッケージをインストール

```bash
cd frontend
npm install
```

## ステップ5: フロントエンドをビルドしてデプロイ

```bash
npm run deploy
```

このコマンドが実行されると:
1. フロントエンドをビルド
2. `dist/` フォルダを `gh-pages` ブランチにデプロイ
3. GitHub Pages が自動的にビルド・公開

## ステップ6: 公開確認

数分待ってから、以下のURLでゲームにアクセスできます:

```
https://あなたのユーザー名.github.io/tetris/
```

## 今後の更新

ゲームを更新したい場合:

```bash
# 変更をコミット
git add .
git commit -m "Update message"

# GitHub に主ブランチをプッシュ
git push origin main

# フロントエンドを再度デプロイ
cd frontend
npm run deploy
```

## トラブルシューティング

### デプロイできない場合

1. `gh-pages` パッケージがインストール済みか確認:
   ```bash
   npm list gh-pages
   ```

2. リポジトリ設定で Pages が有効か確認

3. `NODE_ENV=production` で手動ビルドをテスト:
   ```bash
   NODE_ENV=production npm run build
   ```

### GitHub Pages が更新されない

- キャッシュをクリアしてみる（Ctrl+Shift+Delete または Cmd+Shift+Delete）
- GitHub リポジトリの **Actions** タブでデプロイメント状態を確認

### バージョン確認

```bash
node --version
npm --version
git --version
```

## API について

GitHub Pages では静的コンテンツのみをホストできるため、バックエンドサーバーは動作しません。

スコア保存機能が必要な場合は、以下の選択肢があります:

1. **外部バックエンドサービスを使用**
   - Heroku, Railway, Render など
   - `frontend/src/` の API エンドポイントを変更

2. **ブラウザのローカルストレージを使用**
   - スコアはローカルマシンのみに保存
   - ユーザーのブラウザを変えると失われる

3. **Firebase Realtime Database を使用**
   - クラウドベースのスコア管理

## 参考資料

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
