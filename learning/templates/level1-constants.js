// Level 1: 基本的な定数と変数（問1-20）

// ============================================
// ボードの設定
// ============================================

// 問1: ボードの幅を定義
const BOARD_WIDTH = /* 問1: ここに答えを書く */;

// 問2: ボードの高さを定義
const BOARD_HEIGHT = /* 問2: ここに答えを書く */;

// 問3: 初期落下速度（ミリ秒）
const INITIAL_SPEED = /* 問3: ここに答えを書く */;

// 問8: テトロミノの種類の数
const TETROMINO_TYPES = /* 問8: ここに答えを書く */;

// ============================================
// テトロミノの定義
// ============================================

export const TETROMINOS = {
  // 問4-5: Iテトロミノ（棒）
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: /* 問4: ここに答えを書く */
  },
  
  // 問19: Jテトロミノ（逆L字）
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: /* 問19: ここに答えを書く */
  },
  
  // 問17: Lテトロミノ（L字）
  L: {
    shape: /* 問17: ここに答えを書く */,
    color: '#f0a000'
  },
  
  // 問5: Oテトロミノ（四角）
  O: {
    shape: /* 問5: ここに答えを書く */,
    color: '#f0f000'
  },
  
  // 問15: Sテトロミノ（S字）
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: /* 問15: ここに答えを書く */
  },
  
  // 問11: Tテトロミノ（T字）
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: /* 問11: ここに答えを書く */
  },
  
  // 問12: Zテトロミノ（Z字）
  Z: {
    shape: /* 問12: ここに答えを書く */,
    color: '#f00000'
  }
};

// ============================================
// スコアリング
// ============================================

// スコア計算関数の例
export const calculateScore = (linesCleared) => {
  // 問6, 18, 13: ライン消去によるスコア
  const points = [
    0,
    /* 問6: 1ライン */,
    /* 問18: 2ライン */,
    500,
    /* 問13: 4ライン（テトリス） */
  ][linesCleared] || 0;
  
  return points;
};

// ============================================
// UI設定
// ============================================

// 問10: セルのサイズ（ピクセル）
export const CELL_SIZE = /* 問10: ここに答えを書く */;

// 問14: グリッドのギャップサイズ
export const GRID_GAP = /* 問14: ここに答えを書く */;

// 問16: ボーダーの角丸サイズ
export const BORDER_RADIUS = /* 問16: ここに答えを書く */;

// ============================================
// ヘルパー関数
// ============================================

// 問9: ランダムなテトロミノを取得
export const randomTetromino = () => {
  const tetrominos = Object.keys(TETROMINOS);
  const randomIndex = Math.floor(Math.random() * /* 問9: ここに答えを書く */);
  const randomKey = tetrominos[randomIndex];
  return {
    ...TETROMINOS[randomKey],
    type: randomKey
  };
};

// 問7: 空のボードを作成
export const createEmptyBoard = () =>
  Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => ({
      filled: /* 問7: ここに答えを書く */,
      color: ''
    }))
  );

// 問20: グリッドスタイルの生成
export const getBoardStyle = (board) => ({
  display: 'grid',
  gridTemplateRows: `repeat(${/* 問20: ここに答えを書く */}, ${CELL_SIZE}px)`,
  gridTemplateColumns: `repeat(${board[0].length}, ${CELL_SIZE}px)`,
  gap: GRID_GAP
});

// ============================================
// テスト用のエクスポート
// ============================================

export {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  INITIAL_SPEED,
  TETROMINO_TYPES
};
