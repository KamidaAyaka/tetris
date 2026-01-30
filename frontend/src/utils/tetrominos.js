// テトロミノの形状定義
export const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '#00f0f0'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#0000f0'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#f0a000'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#f0f000'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: '#00f000'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#a000f0'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: '#f00000'
  }
};

// ランダムなテトロミノを取得
export const randomTetromino = () => {
  const tetrominos = Object.keys(TETROMINOS);
  const randomKey = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return {
    ...TETROMINOS[randomKey],
    type: randomKey
  };
};

// テトロミノを回転
export const rotate = (matrix) => {
  const N = matrix.length;
  const rotated = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - 1 - j][i])
  );
  return rotated;
};
