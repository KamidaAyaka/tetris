@echo off
REM GitHub Pages デプロイメントスクリプト (Windows)
REM 使用方法: deploy.bat

setlocal enabledelayedexpansion

echo 🚀 GitHub Pages デプロイメント開始

REM フロントエンドディレクトリに移動
cd frontend

REM 依存関係をインストール
echo 📦 依存関係をインストール中...
call npm install

if errorlevel 1 (
    echo ❌ インストールに失敗しました
    exit /b 1
)

REM ビルド
echo 🔨 フロントエンドをビルド中...
call npm run build

if errorlevel 1 (
    echo ❌ ビルドに失敗しました
    exit /b 1
)

REM gh-pages にデプロイ
echo 📤 GitHub Pages にデプロイ中...
call npm run deploy

if errorlevel 1 (
    echo ❌ デプロイに失敗しました
    exit /b 1
)

echo ✅ デプロイが完了しました！
echo.
echo 📍 アクセスURL: https://あなたのユーザー名.github.io/tetris/
echo.
echo 💡 初回デプロイ後、GitHub Pages が有効化されるまで数分かかります。
echo 💡 Settings 🚀 Pages で公開状態を確認できます。

pause
