# テトリスゲーム開発 ハンズオン講義マニュアル

完全初心者向け・段階的学習ガイド

---

## 📌 このコースについて

このマニュアルでは、**実際に手を動かしながら** テトリスゲームを1から作成します。

- **ステップ1（180分）**: ゲームの大枠を完成させる
- **ステップ2（150分）**: クイズを解きながら完成度を上げていく

**学習成果**: フルスタックなテトリスゲームが完成し、GitHub Pages で公開できます！

---

# 🎯 ステップ1: テトリスの大枠を実装する（180分）

## 目標
「モノクロで、動いて、遊べるテトリス」を完成させる

---

## Section 1-1: 環境準備（20分）

### 1-1-1: 作業フォルダを作成

ターミナル（コマンドプロンプト/PowerShell）を開いて、以下のコマンドを実行してください：

```bash
# ホームディレクトリに移動
cd ~

# tetris-dev という新しいフォルダを作成
mkdir tetris-dev

# そのフォルダに移動
cd tetris-dev

# 現在地を確認（出力例: /Users/username/tetris-dev）
pwd
```

**🎯 確認**: `pwd` で `tetris-dev` フォルダのパスが表示されればOK

---

### 1-1-2: Node.js と npm がインストール済みか確認

```bash
# Node.js のバージョン確認（v18以上が必要）
node --version

# npm のバージョン確認
npm --version
```

**期待される出力例**:
```
v18.17.0
9.6.7
```

❌ インストールされていない場合は、以下から Node.js をインストール：
- https://nodejs.org/ （LTS版を推奨）

---

## Section 1-2: React プロジェクトの初期化（15分）

### 1-2-1: Vite で React プロジェクトを作成

```bash
# プロジェクトの作成（tetris-game という名前）
npm create vite@latest tetris-game -- --template react

# プロジェクトフォルダに移動
cd tetris-game

# フォルダ構造を確認
ls -la
```

**期待される出力**:
```
src/
public/
index.html
package.json
vite.config.js
```

---

### 1-2-2: パッケージをインストール

```bash
# すべての依存パッケージをインストール
npm install

# インストール完了確認
npm list
```

このコマンドは1-2分かかります。コーヒーを飲んで待ちましょう ☕

**✅ 確認**: `npm list` で各パッケージが表示されればOK

---

### 1-2-3: 開発サーバーを起動

```bash
# 開発サーバーを起動
npm run dev
```

**期待される出力**:
```
Local:   http://localhost:5173/
Press q to quit
```

ブラウザで **http://localhost:5173** にアクセスして、Vite のウェルカムページが表示されたら成功！

**⏸️ サーバーは起動させたままにしてください**（Ctrl+C で停止）

---

## Section 1-3: ゲームの基本構造を作成（60分）

### 1-3-1: ファイル構造を整理

新しいターミナルウィンドウを開いて（開発サーバーは稼働させたまま）、以下を実行：

```bash
# プロジェクトフォルダ内で実行
cd src

# 不要なファイルを削除
rm -f App.css index.css logo.svg

# フォルダを作成
mkdir components hooks utils

# 確認
ls -la
```

**期待される構造**:
```
src/
├── components/
├── hooks/
├── utils/
├── App.jsx
├── main.jsx
└── index.css (残す)
```

---

### 1-3-2: テトロミノの定義を作成

`src/utils/tetrominos.js` を **新規作成** して、以下をコピー：

```javascript
// テトロミノ（テトリスのピース）の形状と色を定義
export const TETROMINOS = {
  I: {
    shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    color: '#888888' // モノクロ
  },
  J: {
    shape: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    color: '#666666'
  },
  L: {
    shape: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
    color: '#555555'
  },
  O: {
    shape: [[1, 1], [1, 1]],
    color: '#777777'
  },
  S: {
    shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    color: '#999999'
  },
  T: {
    shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    color: '#444444'
  },
  Z: {
    shape: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    color: '#aaaaaa'
  }
};

// ランダムなテトロミノを取得
export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOS);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return { ...TETROMINOS[randomKey] };
};

// ピースを90度回転
export const rotate = (tetromino) => {
  const shape = tetromino.shape;
  const n = shape.length;
  const rotated = Array.from({ length: n }, () => Array(n).fill(0));
  
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      rotated[x][n - 1 - y] = shape[y][x];
    }
  }
  
  return { ...tetromino, shape: rotated };
};
```

**🎯 確認**: ファイルが `src/utils/tetrominos.js` に保存されたか確認

---

### 1-3-3: ゲームロジック Hook を作成

`src/hooks/useGameLogic.js` を **新規作成** して、以下をコピー：

```javascript
import { useState, useEffect, useCallback } from 'react';
import { randomTetromino, rotate } from '../utils/tetrominos';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_SPEED = 1000;

const createEmptyBoard = () =>
  Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => ({ filled: false, color: '' }))
  );

export const useGameLogic = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [nextPiece, setNextPiece] = useState(null);

  // 衝突検出関数
  const checkCollision = useCallback((piece, pos, gameBoard) => {
    if (!piece) return false;
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newY = pos.y + y;
          const newX = pos.x + x;
          
          if (
            newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && gameBoard[newY][newX].filled)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  // ピースをボードに固定
  const mergePieceToBoard = useCallback(() => {
    if (!currentPiece) return board;
    
    const newBoard = board.map(row => [...row]);
    
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT) {
            newBoard[boardY][boardX] = {
              filled: true,
              color: currentPiece.color
            };
          }
        }
      }
    }
    
    return newBoard;
  }, [currentPiece, position, board]);

  // ラインを消去
  const clearLines = useCallback((gameBoard) => {
    let linesCleared = 0;
    const newBoard = gameBoard.filter(row => {
      const isFull = row.every(cell => cell.filled);
      if (isFull) linesCleared++;
      return !isFull;
    });
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array.from({ length: BOARD_WIDTH }, () => ({ filled: false, color: '' })));
    }
    
    if (linesCleared > 0) {
      setLines(prev => prev + linesCleared);
      const points = [0, 100, 300, 500, 800][linesCleared] || 0;
      setScore(prev => prev + points);
    }
    
    return newBoard;
  }, []);

  // ゲーム開始
  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPiece(randomTetromino());
    setNextPiece(randomTetromino());
    setPosition({ x: 3, y: 0 });
    setScore(0);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
    setSpeed(INITIAL_SPEED);
  }, []);

  // ピースの移動
  const movePiece = useCallback((dx, dy) => {
    if (gameOver || isPaused || !currentPiece) return;
    
    const newPos = { x: position.x + dx, y: position.y + dy };
    if (!checkCollision(currentPiece, newPos, board)) {
      setPosition(newPos);
      return false;
    }
    return true;
  }, [currentPiece, position, board, gameOver, isPaused, checkCollision]);

  // ピースの回転
  const rotatePiece = useCallback(() => {
    if (gameOver || isPaused || !currentPiece) return;
    
    const rotated = rotate(currentPiece);
    if (!checkCollision(rotated, position, board)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, position, board, gameOver, isPaused, checkCollision]);

  // ハードドロップ
  const hardDrop = useCallback(() => {
    if (gameOver || isPaused || !currentPiece) return;
    
    let newY = position.y;
    while (!checkCollision(currentPiece, { x: position.x, y: newY + 1 }, board)) {
      newY++;
    }
    setPosition({ x: position.x, y: newY });
  }, [currentPiece, position, board, gameOver, isPaused, checkCollision]);

  // 一時停止
  const togglePause = useCallback(() => {
    if (!gameOver) setIsPaused(prev => !prev);
  }, [gameOver]);

  // 落下ループ
  useEffect(() => {
    if (gameOver || isPaused || !currentPiece) return;
    
    const interval = setInterval(() => {
      const hitBottom = movePiece(0, 1);
      
      if (hitBottom) {
        const newBoard = clearLines(mergePieceToBoard());
        setBoard(newBoard);
        
        const newPiece = nextPiece || randomTetromino();
        setCurrentPiece(newPiece);
        setNextPiece(randomTetromino());
        setPosition({ x: 3, y: 0 });
        
        if (checkCollision(newPiece, { x: 3, y: 0 }, newBoard)) {
          setGameOver(true);
        }
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [currentPiece, position, board, gameOver, isPaused, speed, nextPiece, movePiece, clearLines, mergePieceToBoard, checkCollision]);

  return {
    board,
    score,
    lines,
    gameOver,
    isPaused,
    currentPiece,
    position,
    nextPiece,
    startGame,
    movePiece,
    rotatePiece,
    hardDrop,
    togglePause
  };
};
```

**🎯 確認**: ファイルが `src/hooks/useGameLogic.js` に保存されたか確認

---

### 1-3-4: コンポーネントを作成

#### Cell コンポーネント

`src/components/Cell.jsx` を **新規作成**：

```javascript
import React from 'react';

const Cell = ({ filled, color }) => {
  const style = {
    width: '30px',
    height: '30px',
    border: '1px solid #ccc',
    backgroundColor: filled ? color : '#f0f0f0',
    display: 'inline-block'
  };

  return <div style={style}></div>;
};

export default Cell;
```

---

#### Board コンポーネント

`src/components/Board.jsx` を **新規作成**：

```javascript
import React from 'react';
import Cell from './Cell';

const Board = ({ board, currentPiece, position }) => {
  // 現在のピースを描画用ボードに追加
  const displayBoard = board.map(row => [...row]);
  
  if (currentPiece) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0 && boardY < board.length) {
            displayBoard[boardY][boardX] = {
              filled: true,
              color: currentPiece.color
            };
          }
        }
      }
    }
  }

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(10, 30px)`,
    gap: '0px',
    border: '2px solid #333'
  };

  return (
    <div style={boardStyle}>
      {displayBoard.map((row, y) =>
        row.map((cell, x) => (
          <Cell key={`${y}-${x}`} filled={cell.filled} color={cell.color} />
        ))
      )}
    </div>
  );
};

export default Board;
```

---

#### GameInfo コンポーネント

`src/components/GameInfo.jsx` を **新規作成**：

```javascript
import React from 'react';

const GameInfo = ({ score, lines, gameOver, isPaused, onStart, onPause }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    color: '#333',
    minWidth: '200px'
  };

  const cardStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd'
  };

  const titleStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  const valueStyle = {
    fontSize: '28px',
    fontWeight: 'bold'
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '4px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>スコア</div>
        <div style={valueStyle}>{score}</div>
      </div>

      <div style={cardStyle}>
        <div style={titleStyle}>ラインクリア</div>
        <div style={valueStyle}>{lines}</div>
      </div>

      <div style={cardStyle}>
        <div style={titleStyle}>操作方法</div>
        <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
          <div>←→: 移動</div>
          <div>↑: 回転</div>
          <div>↓: 落下加速</div>
          <div>Space: 一気落ち</div>
          <div>P: 一時停止</div>
        </div>
      </div>

      {gameOver && (
        <div style={{ ...cardStyle, backgroundColor: '#ffcccc' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
            ゲームオーバー
          </div>
        </div>
      )}

      <button style={buttonStyle} onClick={gameOver ? onStart : onPause}>
        {gameOver ? 'スタート' : isPaused ? '再開' : '一時停止'}
      </button>
    </div>
  );
};

export default GameInfo;
```

---

### 1-3-5: App.jsx を更新

`src/App.jsx` を開いて、以下で置き換え：

```javascript
import React, { useEffect } from 'react';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import { useGameLogic } from './hooks/useGameLogic';

const App = () => {
  const {
    board,
    score,
    lines,
    gameOver,
    isPaused,
    currentPiece,
    position,
    startGame,
    movePiece,
    rotatePiece,
    hardDrop,
    togglePause
  } = useGameLogic();

  // キーボード入力
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver && e.key !== 'Enter') return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePiece(0, 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotatePiece();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, movePiece, rotatePiece, hardDrop, togglePause]);

  // ゲーム開始
  useEffect(() => {
    startGame();
  }, [startGame]);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#fafafa'
  };

  const gameContainerStyle = {
    display: 'flex',
    gap: '30px',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  };

  const titleStyle = {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333'
  };

  return (
    <>
      <div style={titleStyle}>TETRIS</div>
      <div style={containerStyle}>
        <div style={gameContainerStyle}>
          <Board board={board} currentPiece={currentPiece} position={position} />
          <GameInfo
            score={score}
            lines={lines}
            gameOver={gameOver}
            isPaused={isPaused}
            onStart={startGame}
            onPause={togglePause}
          />
        </div>
      </div>
    </>
  );
};

export default App;
```

---

### 1-3-6: 開発サーバーで動作確認

ブラウザで **http://localhost:5173** を開いて確認！

**期待される動作**:
- ✅ 「TETRIS」というタイトルが表示される
- ✅ グリッド状のボードが表示される
- ✅ ピースが落ちてくる
- ✅ 矢印キーでピースが動く
- ✅ スコア・ラインの表示

**問題が起きた場合**:
- ターミナルのエラーメッセージを確認
- ブラウザの開発ツール（F12）で Console タブを見る

---

## Section 1-4: Git で保存（10分）

```bash
# Git リポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# 最初のコミット
git commit -m "Initial commit: Basic Tetris game"

# 確認
git log --oneline
```

**✅ ステップ1 完了！**

**現在のゲーム状態**:
- ✅ テトリスが遊べる
- ✅ スコアが記録される
- ✅ モノクロ表示
- ✅ 操作可能

**制限事項**（これはステップ2で改善）:
- ボードが狭い
- 見た目が地味
- 次のピース表示がない

---

---

# 🎮 ステップ2: 機能拡張クイズ（150分）

## 目標
クイズを解きながら、ゲームを完璧な状態に完成させる

## 📋 クイズの進め方

### レベル分け
- **Level 1（初心者）**: 問1-10 → 15分で解答可能
- **Level 2（中級者）**: 問11-25 → 60分で解答可能  
- **Level 3（上級者）**: 問26-35 → 150分で全問完成（完全版と同じ状態）

### 挑戦方法
- 各問題は**段階的に難しくなります**
- 各セクションの最後に「動作確認」があります
- わからない場合は「💡ヒント」を見てOK
- 「✅解答」で答え合わせ

### スコアリング
- **Level 1 を3問以上完成**: 初級者 🟢
- **Level 2 を5問以上完成**: 中級者 🟡
- **Level 3 全問完成**: 上級者 🔴

---

## Level 1: UI の改善（初心者向け・15分）

### 問1: ボードを大きくする

**現在**: 300×600px（幅狭い）
**目標**: 400×600px（標準サイズ）

📝 **問題**:
`src/components/Cell.jsx` の Cell サイズを変更してください

```javascript
const style = {
  width: '???',  // 現在は 30px
  height: '30px',
  // ...
};
```

💡 **ヒント**: 
- ボード幅が10マスなので、幅を400にするには1マスあたり何pxにすればいい？
- 計算: 400 ÷ 10 = ?

✅ **解答**:
```javascript
width: '40px',
```

**動作確認**: ボードが一回り大きくなったか確認

---

### 問2: テトロミノに色をつける

**現在**: 全てモノクロ（グレースケール）
**目標**: カラー表示

📝 **問題**:
`src/utils/tetrominos.js` のテトロミノの色を変更してください

```javascript
export const TETROMINOS = {
  I: {
    shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    color: '???' // シアン色にしよう
  },
  J: {
    shape: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    color: '???' // 青色にしよう
  },
  // ... 他のピースも同様
};
```

💡 **ヒント**: 
色コードを使用：
- I（棒）→ シアン: `#00f0f0`
- J（逆L）→ 青: `#0000f0`
- L（L字）→ オレンジ: `#f0a000`
- O（四角）→ 黄: `#f0f000`
- S（S字）→ 緑: `#00f000`
- T（T字）→ 紫: `#a000f0`
- Z（Z字）→ 赤: `#f00000`

✅ **解答**:
```javascript
export const TETROMINOS = {
  I: { shape: [...], color: '#00f0f0' },
  J: { shape: [...], color: '#0000f0' },
  L: { shape: [...], color: '#f0a000' },
  O: { shape: [...], color: '#f0f000' },
  S: { shape: [...], color: '#00f000' },
  T: { shape: [...], color: '#a000f0' },
  Z: { shape: [...], color: '#f00000' }
};
```

**動作確認**: ピースがカラーで表示されるか確認

---

### 問3: 背景色を白に

**現在**: `#f0f0f0`（薄灰色）
**目標**: より洗練された見た目

📝 **問題**:
`src/components/Cell.jsx` の空のセル背景色を変更

```javascript
backgroundColor: filled ? color : '???', // 白にしよう
```

✅ **解答**:
```javascript
backgroundColor: filled ? color : '#ffffff',
```

---

### 問4: ボード枠線を濃くする

**現在**: `#ccc`（薄い灰色）
**目標**: `#333`（濃い灰色）

📝 **問題**:
`src/components/Cell.jsx` の border 色を変更

✅ **解答**:
```javascript
border: '1px solid #333',
```

---

### 問5: スコア表示の色を鮮やかに

**現在**: 単調な文字色
**目標**: スコアを目立たせる

📝 **問題**:
`src/components/GameInfo.jsx` の `valueStyle` を変更

```javascript
const valueStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '???' // 濃い青にしよう
};
```

✅ **解答**:
```javascript
const valueStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#0066ff'
};
```

---

### ✨ Level 1 まとめ

- ✅ ボードサイズを大きく
- ✅ カラー化
- ✅ UI をより洗練させた

**現在のゲーム**:
- より大きく、カラフルなテトリス
- 見た目が改善された

---

## Level 2: 機能拡張（中級者向け・60分）

### 問6: 次のピース表示機能を追加

**現在**: 次のピースが見えない
**目標**: ボード右側に「Next」表示

📝 **問題**:
`src/hooks/useGameLogic.js` に `nextPiece` の状態がすでにあります。
`src/components/GameInfo.jsx` に次のピース表示を追加してください

```javascript
// GameInfo.jsx の中に追加
{nextPiece && (
  <div style={cardStyle}>
    <div style={titleStyle}>NEXT</div>
    <div style={{
      display: 'grid',
      gridTemplateRows: `repeat(${nextPiece.shape.length}, 25px)`,
      gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, 25px)`,
      gap: '2px'
    }}>
      {nextPiece.shape.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`next-${y}-${x}`}
            style={{
              width: '25px',
              height: '25px',
              backgroundColor: cell ? nextPiece.color : '#f0f0f0',
              border: '1px solid #ddd'
            }}
          />
        ))
      )}
    </div>
  </div>
)}
```

✅ **解答**: 
受け取り引数に `nextPiece` を追加し、上記コードを GameInfo に追加

```javascript
const GameInfo = ({ score, lines, gameOver, isPaused, nextPiece, onStart, onPause }) => {
  // ... (上記コードを追加)
};
```

**動作確認**: 右側に次のピースが表示されるか確認

---

### 問7: ゲームスピードアップ機能を実装

**現在**: 常に一定の落下速度
**目標**: ラインをクリアするとスピードアップ

📝 **問題**:
`src/hooks/useGameLogic.js` の `clearLines` 関数内に以下を追加：

```javascript
const clearLines = useCallback((gameBoard) => {
  let linesCleared = 0;
  const newBoard = gameBoard.filter(row => {
    const isFull = row.every(cell => cell.filled);
    if (isFull) linesCleared++;
    return !isFull;
  });
  
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array.from({ length: BOARD_WIDTH }, () => ({ filled: false, color: '' })));
  }
  
  if (linesCleared > 0) {
    setLines(prev => prev + linesCleared);
    const points = [0, 100, 300, 500, 800][linesCleared] || 0;
    setScore(prev => prev + points);
    
    // ここに追加:
    // 10ライン毎にスピードアップ（100ms短縮）
    const newTotalLines = lines + linesCleared;
    const newSpeed = Math.max(100, INITIAL_SPEED - Math.floor(newTotalLines / 10) * 100);
    setSpeed(newSpeed);
  }
  
  return newBoard;
}, []);
```

✅ **解答**:
上記コードをそのまま `clearLines` に追加

**動作確認**: 10ラインクリアするとスピードが上がるか確認

---

### 問8: ゲーム開始時の自動スタート

**現在**: ボタンを押さないとゲームが始まらない
**目標**: ページを開いたら自動でスタート

📝 **問題**:
`src/App.jsx` に以下の useEffect が追加されています。これにより自動スタートします。

```javascript
// ゲーム開始
useEffect(() => {
  startGame();
}, [startGame]);
```

✅ **解答**: 
既に実装済み！確認してください。

---

### 問9: ボード背景をグラデーション

**現在**: 単色背景
**目標**: より視覚的に魅力的に

📝 **問題**:
`src/App.jsx` の `containerStyle` を変更：

```javascript
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '20px',
  background: '???' // グラデーションにしよう
};
```

💡 **ヒント**: 
CSS グラデーション:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

✅ **解答**:
```javascript
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

---

### 問10: ゲームオーバー画面のデザイン改善

**現在**: シンプルな表示
**目標**: より目立つように

📝 **問題**:
`src/components/GameInfo.jsx` のゲームオーバー表示を修正：

```javascript
{gameOver && (
  <div style={{ 
    ...cardStyle, 
    backgroundColor: '???',  // 濃い赤に
    color: '???',  // 白文字に
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
      ゲームオーバー
    </div>
  </div>
)}
```

✅ **解答**:
```javascript
backgroundColor: '#ff3333',
color: '#ffffff',
```

---

### ✨ Level 2 まとめ

- ✅ 次のピース表示
- ✅ スピードアップ機能
- ✅ UI を視覚的に改善

**現在のゲーム**:
- 次のピースが見える
- プレイが難しくなっていく
- より美しい見た目

---

## Level 3: 完全版へ（上級者向け・150分全問）

### 問11: タイトルのスタイル改善

**現在**: シンプルなタイトル
**目標**: グラデーション付きの目立つタイトル

📝 **問題**:
`src/App.jsx` の `titleStyle` を修正：

```javascript
const titleStyle = {
  position: 'absolute',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '48px',
  fontWeight: 'bold',
  color: '???', // グラデーション色に
  textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  letterSpacing: '4px'
};
```

✅ **解答**:
```javascript
color: '#667eea'
// または background でグラデーション:
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
backgroundClip: 'text',
WebkitBackgroundClip: 'text',
WebkitTextFillColor: 'transparent'
```

---

### 問12: ゲームコンテナの影を強くする

**現在**: 薄い影
**目標**: より立体的に

📝 **問題**:
`src/App.jsx` の `gameContainerStyle` のシャドウを強化：

```javascript
boxShadow: '???' // より強い影に
```

✅ **解答**:
```javascript
boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
```

---

### 問13: セルの角を丸くする

**現在**: 四角いセル
**目標**: 丸めた角で優しい印象

📝 **問題**:
`src/components/Cell.jsx` に `borderRadius` を追加：

```javascript
const style = {
  width: '40px',
  height: '30px',
  border: '1px solid #333',
  backgroundColor: filled ? color : '#ffffff',
  display: 'inline-block',
  borderRadius: '???' // 角を丸くしよう
};
```

✅ **解答**:
```javascript
borderRadius: '4px'
```

---

### 問14: ボード枠線をより目立たせる

**現在**: 2px の枠線
**目標**: ボックスシャドウで立体感を追加

📝 **問題**:
`src/components/Board.jsx` のボード `boardStyle` を修正：

```javascript
const boardStyle = {
  display: 'grid',
  gridTemplateColumns: `repeat(10, 40px)`,
  gap: '0px',
  border: '3px solid #333',
  boxShadow: '???' // 影を追加
};
```

✅ **解答**:
```javascript
boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.5)'
```

---

### 問15: ボタンのホバー効果を追加

**現在**: ボタンに変化がない
**目標**: マウスを乗せると色が変わる

📝 **問題**:
`src/components/GameInfo.jsx` のボタンに onMouseEnter/onMouseLeave を追加：

```javascript
<button
  style={buttonStyle}
  onClick={gameOver ? onStart : onPause}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = '???'; // 明るい色に
    e.target.style.transform = '???'; // 少し大きく
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = '???'; // 元の色に
    e.target.style.transform = '???'; // 元のサイズに
  }}
>
  {gameOver ? 'スタート' : isPaused ? '再開' : '一時停止'}
</button>
```

✅ **解答**:
```javascript
onMouseEnter={(e) => {
  e.target.style.backgroundColor = '#667eea';
  e.target.style.transform = 'scale(1.05)';
}}
onMouseLeave={(e) => {
  e.target.style.backgroundColor = '#333';
  e.target.style.transform = 'scale(1)';
}}
```

---

### 問16: 一時停止中の表示を追加

**現在**: 一時停止したかどうか分からない
**目標**: 画面に「一時停止中」と表示

📝 **問題**:
`src/components/GameInfo.jsx` に追加（gameOver と同じ形式で）：

```javascript
{isPaused && !gameOver && (
  <div style={{ ...cardStyle, backgroundColor: '???' }}>
    <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
      一時停止中
    </div>
  </div>
)}
```

✅ **解答**:
```javascript
backgroundColor: '#ffff99'
```

**動作確認**: P キーで一時停止して「一時停止中」が表示されるか確認

---

### 問17: ラインクリア時の視覚効果

**現在**: ラインがクリアされても変化がない
**目標**: ラインクリア時に加点を表示

📝 **問題**:
`src/components/GameInfo.jsx` の値を少し大きく表示する CSS を追加：

```javascript
const valueStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#0066ff',
  transition: '???' // アニメーション効果を追加
};
```

✅ **解答**:
```javascript
transition: 'all 0.2s ease'
```

---

### 問18: テーマの統一性を改善

**現在**: 各色がバラバラ
**目標**: 統一されたカラースキーム

📝 **問題**:
`src/App.jsx` の上部に色定数を定義：

```javascript
const THEME = {
  primary: '???',      // メインカラー
  secondary: '???',    // サブカラー
  background: '???',   // 背景色
  text: '???'          // テキスト色
};
```

✅ **解答**:
```javascript
const THEME = {
  primary: '#667eea',
  secondary: '#764ba2',
  background: '#fafafa',
  text: '#333333'
};
```

---

### 問19: キーボード操作ガイドを詳しく

**現在**: 簡潔な説明
**目標**: より分かりやすく

📝 **問題**:
`src/components/GameInfo.jsx` の操作説明を拡張：

```javascript
<div style={cardStyle}>
  <div style={titleStyle}>操作方法</div>
  <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
    <div>←→: 左右に移動</div>
    <div>↑: ピースを回転</div>
    <div>↓: 落下を加速</div>
    <div>Space: 一気に落とす</div>
    <div>P: 一時停止/再開</div>
    <div style={{ marginTop: '10px', fontSize: '10px', color: '#999' }}>
      💡 Tip: スペースキーはハードドロップ！
    </div>
  </div>
</div>
```

✅ **解答**: 上記をそのままコピペ

---

### 問20: スコア計算の詳細表示

**現在**: スコアだけが表示される
**目標**: スコア計算の詳細を表示

📝 **問題**:
`src/components/GameInfo.jsx` のスコア表示エリアを拡張：

```javascript
<div style={cardStyle}>
  <div style={titleStyle}>スコア</div>
  <div style={valueStyle}>{score}</div>
  <div style={{ fontSize: '10px', color: '#999', marginTop: '10px' }}>
    1ライン: 100点 | 2: 300点 | 3: 500点 | 4: 800点
  </div>
</div>
```

✅ **解答**: 上記をそのままコピペ

**動作確認**: ラインをクリアして加点ルールが表示されるか確認

---

### 問21: フォントの改善

**現在**: デフォルトフォント
**目標**: ゲーム向けの見やすいフォント

📝 **問題**:
`src/index.css` に Google Fonts を追加：

```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

body {
  font-family: 'Orbitron', 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}
```

✅ **解答**: 上記をそのままコピペ

**動作確認**: フォントが変わったか確認

---

### 問22: ダークモード対応（システム設定に合わせる）

**現在**: ライトモードのみ
**目標**: OSのダークモード設定に自動対応

📝 **問題**:
`src/App.jsx` で `prefers-color-scheme` をチェック：

```javascript
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '20px',
  backgroundColor: isDarkMode ? '???' : '#fafafa'
};
```

✅ **解答**:
```javascript
backgroundColor: isDarkMode ? '#1a1a1a' : '#fafafa'
```

---

### 問23: ゲーム情報パネルの背景色をテーマ対応

**現在**: 常に明るい背景
**目標**: ダークモードで暗くなる

📝 **問題**:
`src/components/GameInfo.jsx` の `cardStyle` を修正

```javascript
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const cardStyle = {
  backgroundColor: isDarkMode ? '???' : '#f0f0f0',
  color: isDarkMode ? '???' : '#333',
  padding: '20px',
  borderRadius: '8px',
  border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`
};
```

✅ **解答**:
```javascript
backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0',
color: isDarkMode ? '#ffffff' : '#333',
```

---

### 問24: スピード段階を表示する

**現在**: スピードの変化が見えない
**目標**: 現在のレベルを表示

📝 **問題**:
`src/components/GameInfo.jsx` に追加：

```javascript
const GameInfo = ({ score, lines, gameOver, isPaused, nextPiece, speed, onStart, onPause }) => {
  // ... 既存のコード ...
  
  // スピードレベルを計算
  const speedLevel = Math.floor((1000 - speed) / 100) + 1;
  
  return (
    <div style={containerStyle}>
      {/* ... 他のカード ... */}
      
      <div style={cardStyle}>
        <div style={titleStyle}>スピード</div>
        <div style={valueStyle}>Lv.{speedLevel}</div>
      </div>
    </div>
  );
};
```

✅ **解答**: 上記をそのままコピペ

**注**: `src/App.jsx` の GameInfo に `speed={...}` を渡すのを忘れずに

---

### 問25: キーボード入力の視覚的フィードバック

**現在**: キーを押しても反応が見えない
**目標**: ボタンが押された感覚を表現

📝 **問題**:
`src/App.jsx` に現在のキー入力状態を保持：

```javascript
const [pressedKey, setPressedKey] = useState(null);

const handleKeyPress = (e) => {
  setPressedKey(e.key);
  setTimeout(() => setPressedKey(null), 100);
  
  // ... 既存の switch 文 ...
};
```

✅ **解答**: 上記をそのままコピペ

---

### 問26: ハイスコア保存機能

**現在**: ゲームを閉じるとスコアが消える
**目標**: ブラウザの LocalStorage に保存

📝 **問題**:
`src/hooks/useGameLogic.js` に追加（`setScore` の後に）：

```javascript
// スコア更新時にローカルストレージに保存
useEffect(() => {
  localStorage.setItem('tetris_highscore', JSON.stringify(score));
}, [score]);

// ゲーム開始時にハイスコアを読み込む
useEffect(() => {
  const saved = localStorage.getItem('tetris_highscore');
  // ... (表示用に活用)
}, []);
```

✅ **解答**: 上記をそのままコピペ

---

### 問27: ハイスコア表示

**現在**: 現在のスコアのみ表示
**目標**: 高スコアと現在のスコアを表示

📝 **問題**:
`src/components/GameInfo.jsx` に追加：

```javascript
const highScore = parseInt(localStorage.getItem('tetris_highscore') || '0', 10);

return (
  <div style={containerStyle}>
    <div style={cardStyle}>
      <div style={titleStyle}>ハイスコア</div>
      <div style={valueStyle}>{highScore}</div>
    </div>
    
    <div style={cardStyle}>
      <div style={titleStyle}>スコア</div>
      <div style={valueStyle}>{score}</div>
    </div>
    
    {/* ... 他のカード ... */}
  </div>
);
```

✅ **解答**: 上記をそのままコピペ

**動作確認**: ゲームを閉じて再度開いても高スコアが保持されるか確認

---

### 問28: ゲームオーバー時にハイスコア更新判定

**現在**: ハイスコアが自動更新されない
**目標**: ゲームオーバー時に新記録をお祝い

📝 **問題**:
`src/hooks/useGameLogic.js` のゲームオーバー処理に追加：

```javascript
useEffect(() => {
  if (gameOver) {
    const saved = parseInt(localStorage.getItem('tetris_highscore') || '0', 10);
    if (score > saved) {
      localStorage.setItem('tetris_highscore', JSON.stringify(score));
      // 新記録達成！
    }
  }
}, [gameOver, score]);
```

✅ **解答**: 上記をそのままコピペ

---

### 問29: 統計情報の表示

**現在**: スコアとラインだけ
**目標**: プレイ時間なども表示

📝 **問題**:
`src/hooks/useGameLogic.js` にプレイ時間を計算：

```javascript
const [playTime, setPlayTime] = useState(0);

useEffect(() => {
  if (gameOver || isPaused) return;
  
  const interval = setInterval(() => {
    setPlayTime(prev => prev + 1);
  }, 1000);
  
  return () => clearInterval(interval);
}, [gameOver, isPaused]);

// 戻り値に playTime を追加
return {
  // ... 既存 ...
  playTime
};
```

✅ **解答**: 上記をそのままコピペ

---

### 問30: プレイ時間を表示

**現在**: 計測されていない
**目標**: 「プレイ時間」として表示

📝 **問題**:
`src/components/GameInfo.jsx` に追加：

```javascript
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// GameInfo コンポーネント内に:
<div style={cardStyle}>
  <div style={titleStyle}>プレイ時間</div>
  <div style={valueStyle}>{formatTime(playTime)}</div>
</div>
```

✅ **解答**: 上記をそのままコピペ

**動作確認**: ゲーム中に時間が進むか確認

---

### 問31: レスポンシブデザイン対応

**現在**: PC 固定で、スマホだと崩れる
**目標**: どのデバイスでも遊べる

📝 **問題**:
`src/App.jsx` の gameContainerStyle を修正：

```javascript
const gameContainerStyle = {
  display: 'flex',
  flexDirection: window.innerWidth < 800 ? 'column' : 'row',
  gap: '30px',
  alignItems: 'flex-start',
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '1000px'
};
```

✅ **解答**: 上記をそのままコピペ

---

### 問32: タッチ操作対応

**現在**: キーボード操作のみ
**目標**: スマホでタップして操作可能

📝 **問題**:
`src/App.jsx` に追加：

```javascript
const handleTouchStart = (e) => {
  const touch = e.touches[0];
  const boardRect = e.currentTarget.getBoundingClientRect();
  const x = touch.clientX - boardRect.left;
  
  if (x < boardRect.width / 3) movePiece(-1, 0);
  if (x > (boardRect.width * 2) / 3) movePiece(1, 0);
};

// Board に onTouchStart={handleTouchStart} を追加
```

✅ **解答**: 上記をそのままコピペ

---

### 問33: 完全版カラー化

**現在**: 異なるグレースケール
**目標**: 完全なカラフル仕様に

📝 **問題**:
`src/utils/tetrominos.js` を以下に変更：

```javascript
export const TETROMINOS = {
  I: { shape: [...], color: '#00f0f0' }, // シアン
  J: { shape: [...], color: '#0000f0' }, // 青
  L: { shape: [...], color: '#f0a000' }, // オレンジ
  O: { shape: [...], color: '#f0f000' }, // 黄
  S: { shape: [...], color: '#00f000' }, // 緑
  T: { shape: [...], color: '#a000f0' }, // 紫
  Z: { shape: [...], color: '#f00000' }  // 赤
};
```

✅ **解答**: 上記をそのままコピペ

**動作確認**: ピースがカラーで表示されるか確認

---

### 問34: ゲームボード背景にパターン追加

**現在**: 無地の背景
**目標**: グリッドパターンを追加

📝 **問題**:
`src/components/Board.jsx` のボード背景に pattern を追加：

```javascript
const boardStyle = {
  display: 'grid',
  gridTemplateColumns: `repeat(10, 40px)`,
  gap: '0px',
  border: '3px solid #333',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  backgroundColor: '???', // 薄いグレー
  backgroundImage: 'linear-gradient(...)', // グリッド背景
};
```

✅ **解答**:
```javascript
backgroundColor: '#f5f5f5',
backgroundImage: `
  repeating-linear-gradient(0deg, transparent, transparent 39px, #e0e0e0 39px, #e0e0e0 40px),
  repeating-linear-gradient(90deg, transparent, transparent 39px, #e0e0e0 39px, #e0e0e0 40px)
`
```

---

### 問35: GitHub Pages 公開設定

**現在**: ローカルのみで動作
**目標**: URL で世界に公開

📝 **問題**:
`vite.config.js` に base を追加：

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/tetris-game/' : '/',
  plugins: [react()],
})
```

✅ **解答**: 上記をそのままコピペ

**公開手順**:
```bash
# package.json に追加
npm install gh-pages --save-dev

# package.json の "deploy" スクリプトを確認
# "deploy": "npm run build && gh-pages -d dist"

# デプロイ実行
npm run deploy

# GitHub に接続
git remote add origin https://github.com/あなた/tetris-game.git
git push origin main

# GitHub Pages の設定で gh-pages ブランチを選択
```

**完成URL**:
```
https://あなたのユーザー名.github.io/tetris-game/
```

---

✨ **Level 3 全35問 完成！** 🎉

これであなたのテトリスはプロレベル！

---

## 🏆 完成！

### Level 1 を完成 🟢
基本的なテトリスが完成！友達に見せられるレベル。

### Level 2 を完成 🟡
実用的な機能が全て実装。本格的なゲーム。

### Level 3 を完成 🔴
完全版と同じ状態。プロレベルのゲーム。GitHub Pages で公開可能！

---

## 📚 学習成果

このハンズオンで習得できる内容：

✅ React の基本（コンポーネント、Props、State）
✅ Hooks（useState, useEffect, useCallback）
✅ JavaScript の配列操作
✅ ゲームロジックの実装
✅ キーボード入力の処理
✅ Git の基本的な操作
✅ Web アプリケーションの開発フロー

---

## 🚀 次のステップ

Level 3 を完成させたら：

1. **GitHub に公開**:
```bash
git remote add origin https://github.com/あなたのユーザー名/tetris-game.git
git branch -M main
git push -u origin main
```

2. **GitHub Pages でデプロイ**:
```bash
npm install gh-pages --save-dev
# package.json に追加
npm run deploy
```

3. **URL を共有**: `https://あなたのユーザー名.github.io/tetris-game/`

---

## ❓ Q&A

**Q: 途中で詰まったら？**
A: ターミナルのエラーメッセージを読む → Google で検索 → メンターに聞く

**Q: コードの意味がわからない**
A: ChatGPT に「このコードは何をしているか説明して」と聞くのがおすすめ

**Q: 時間が足りない**
A: Level 1 だけでも十分なレベルです。焦らず進めましょう。

**Q: 自分のアイデアを追加したい**
A: 大歓迎！色を変えたり、新機能を追加したり、自由にカスタマイズしてください。

---

## 📖 参考資料

- [React 公式ドキュメント](https://ja.react.dev/)
- [JavaScript 配列メソッド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [CSS Flexbox](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [Git 基本コマンド](https://git-scm.com/book/ja)

---

**頑張ってください！あなたはできます！🚀**
