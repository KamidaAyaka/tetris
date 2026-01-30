#!/bin/bash

# GitHub Pages デプロイメントスクリプト
# 使用方法: ./deploy.sh

set -e

echo "🚀 GitHub Pages デプロイメント開始"

# フロントエンドディレクトリに移動
cd frontend

# 依存関係をインストール
echo "📦 依存関係をインストール中..."
npm install

# ビルド
echo "🔨 フロントエンドをビルド中..."
npm run build

# gh-pages にデプロイ
echo "📤 GitHub Pages にデプロイ中..."
npm run deploy

echo "✅ デプロイが完了しました！"
echo ""
echo "📍 アクセスURL: https://あなたのユーザー名.github.io/tetris/"
echo ""
echo "💡 初回デプロイ後、GitHub Pages が有効化されるまで数分かかります。"
echo "💡 Settings > Pages で公開状態を確認できます。"
