// Level 2: テトロミノと配列操作（問21-40）

import { TETROMINOS, BOARD_WIDTH, BOARD_HEIGHT } from './level1-constants.js';

// ============================================
// 配列の基本操作
// ============================================

// 問21: ボードのディープコピー
export const copyBoard = (board) => {
  return board.map(row => /* 問21: ここに答えを書く */);
};

// 問22: テトロミノのキーを取得
export const getTetominoKeys = () => {
  return /* 問22: ここに答えを書く */(TETROMINOS);
};

// 問25: 空の配列を生成
export const createEmptyRow = () => {
  return Array./* 問25: ここに答えを書く */({ length: BOARD_WIDTH }, () => ({
    filled: false,
    color: ''
  }));
};

// ============================================
// テトロミノの回転
// ============================================

// 問23-24: マトリックスを90度回転
export const rotate = (matrix) => {
  const N = matrix./* 問23: ここに答えを書く */;
  const rotated = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - 1 - /* 問24: ここに答えを書く */][i])
  );
  return rotated;
};

// ============================================
// ライン消去
// ============================================

// 問26-27: 完成したラインを消去
export const clearLines = (gameBoard) => {
  let linesCleared = 0;
  
  // 問27: 完成していないラインだけを残す
  const newBoard = gameBoard./* 問27: ここに答えを書く */(row => {
    // 問26: 全てのセルが埋まっているかチェック
    const isFull = row./* 問26: ここに答えを書く */(cell => cell.filled);
    if (isFull) linesCleared++;
    return !isFull;
  });
  
  // 問28: 消去した分だけ上に空の行を追加
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard./* 問28: ここに答えを書く */(createEmptyRow());
  }
  
  return { newBoard, linesCleared };
};

// ============================================
// 座標計算
// ============================================

// 問29: ピースの開始X座標を計算
export const getStartPosition = (pieceWidth) => {
  const startX = Math./* 問29: ここに答えを書く */((BOARD_WIDTH - pieceWidth) / 2);
  return { x: startX, y: 0 };
};

// 問30: スピード計算（最小値の制限）
export const calculateSpeed = (lines, initialSpeed) => {
  const speedDecrease = Math.floor(lines / 10) * 100;
  return Math./* 問30: ここに答えを書く */(100, initialSpeed - speedDecrease);
};

// ============================================
// テトロミノの操作
// ============================================

// 問31: ピースを回転
export const rotatePiece = (currentPiece) => {
  return {
    ...currentPiece,
    shape: /* 問31: ここに答えを書く */(currentPiece.shape)
  };
};

// 問32-34: ピースの各ブロックをループ
export const forEachBlock = (piece, callback) => {
  // 問32: 行をループ
  for (let y = 0; y < piece.shape./* 問32: ここに答えを書く */; y++) {
    // 問33: 列をループ
    for (let x = 0; x < piece.shape[y]./* 問33: ここに答えを書く */; x++) {
      // 問34: ブロックが存在するかチェック
      if (piece.shape[/* 問34: ここに答えを書く */][x]) {
        callback(x, y);
      }
    }
  }
};

// ============================================
// ボード操作
// ============================================

// 問35: ボードのディープコピー（各セルもコピー）
export const deepCopyBoard = (board) => {
  return board.map(row => row.map(cell => ({ .../* 問35: ここに答えを書く */ })));
};

// ============================================
// スコア管理
// ============================================

// 問36-39: スコアのソートと管理
export class ScoreManager {
  constructor() {
    this.scores = [];
  }
  
  // 問39: スコアを追加
  addScore(newScore) {
    this.scores./* 問39: ここに答えを書く */(newScore);
  }
  
  // 問37: スコアを降順にソート
  sortScores() {
    return this.scores./* 問37: ここに答えを書く */((a, b) => b.score - a.score);
  }
  
  // 問38: トップ10を取得
  getTopScores() {
    return this.sortScores()./* 問38: ここに答えを書く */(0, 10);
  }
  
  // 問36: スコアのランクを取得
  getRank(scoreId) {
    const sorted = this.sortScores();
    return sorted./* 問36: ここに答えを書く */(s => s.id === scoreId) + 1;
  }
}

// ============================================
// ランダム生成
// ============================================

// 問40: ランダムなテトロミノを生成
export const getNextPiece = (nextPiece) => {
  if (nextPiece) {
    return nextPiece;
  }
  return /* 問40: ここに答えを書く */();
};

// ============================================
// テスト用の例
// ============================================

// 使用例
export const example = () => {
  const board = createEmptyBoard();
  console.log('ボードのコピー:', copyBoard(board));
  
  const piece = { shape: [[1, 1], [1, 1]], color: '#f0f000' };
  console.log('回転:', rotatePiece(piece));
  
  const manager = new ScoreManager();
  manager.addScore({ id: 1, score: 1000 });
  console.log('トップスコア:', manager.getTopScores());
};
