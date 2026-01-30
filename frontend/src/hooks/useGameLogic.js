import { useState, useEffect, useCallback } from 'react';
import { randomTetromino, rotate } from '../utils/tetrominos';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_SPEED = 1000;

// 空のボードを作成
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

  // 衝突検出
  const checkCollision = useCallback((piece, pos, gameBoard) => {
    if (!piece) return false;
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newY = pos.y + y;
          const newX = pos.x + x;
          
          // 境界チェック
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
    
    // 消去した分だけ上に空の行を追加
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array.from({ length: BOARD_WIDTH }, () => ({ filled: false, color: '' })));
    }
    
    if (linesCleared > 0) {
      setLines(prev => prev + linesCleared);
      // スコア計算（1ライン:100点、2:300点、3:500点、4:800点）
      const points = [0, 100, 300, 500, 800][linesCleared] || 0;
      setScore(prev => prev + points);
      
      // スピードアップ（10ライン毎）
      const newTotalLines = lines + linesCleared;
      const newSpeed = Math.max(100, INITIAL_SPEED - Math.floor(newTotalLines / 10) * 100);
      setSpeed(newSpeed);
    }
    
    return newBoard;
  }, [lines]);

  // 新しいピースを生成
  const spawnNewPiece = useCallback(() => {
    const piece = nextPiece || randomTetromino();
    const startX = Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2);
    const startY = 0;
    
    setNextPiece(randomTetromino());
    
    if (checkCollision(piece, { x: startX, y: startY }, board)) {
      setGameOver(true);
      return false;
    }
    
    setCurrentPiece(piece);
    setPosition({ x: startX, y: startY });
    return true;
  }, [board, checkCollision, nextPiece]);

  // ピースを移動
  const movePiece = useCallback((dx, dy) => {
    if (!currentPiece || gameOver || isPaused) return false;
    
    const newPos = { x: position.x + dx, y: position.y + dy };
    
    if (!checkCollision(currentPiece, newPos, board)) {
      setPosition(newPos);
      return true;
    }
    
    // 下に移動できない場合、ピースを固定
    if (dy > 0) {
      const newBoard = mergePieceToBoard();
      const clearedBoard = clearLines(newBoard);
      setBoard(clearedBoard);
      spawnNewPiece();
    }
    
    return false;
  }, [currentPiece, position, board, gameOver, isPaused, checkCollision, mergePieceToBoard, clearLines, spawnNewPiece]);

  // ピースを回転
  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    
    const rotated = { ...currentPiece, shape: rotate(currentPiece.shape) };
    
    if (!checkCollision(rotated, position, board)) {
      setCurrentPiece(rotated);
    } else {
      // 壁蹴り処理
      const kicks = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 }
      ];
      
      for (const kick of kicks) {
        const newPos = { x: position.x + kick.x, y: position.y + kick.y };
        if (!checkCollision(rotated, newPos, board)) {
          setCurrentPiece(rotated);
          setPosition(newPos);
          return;
        }
      }
    }
  }, [currentPiece, position, board, gameOver, isPaused, checkCollision]);

  // ハードドロップ
  const hardDrop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    
    let newY = position.y;
    while (!checkCollision(currentPiece, { x: position.x, y: newY + 1 }, board)) {
      newY++;
    }
    
    setPosition({ x: position.x, y: newY });
    
    // 次のフレームでピースを固定
    setTimeout(() => {
      const newBoard = mergePieceToBoard();
      const clearedBoard = clearLines(newBoard);
      setBoard(clearedBoard);
      spawnNewPiece();
    }, 0);
  }, [currentPiece, position, board, gameOver, isPaused, checkCollision, mergePieceToBoard, clearLines, spawnNewPiece]);

  // ゲームを開始
  const startGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
    setSpeed(INITIAL_SPEED);
    setNextPiece(randomTetromino());
    
    const piece = randomTetromino();
    const startX = Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2);
    setCurrentPiece(piece);
    setPosition({ x: startX, y: 0 });
  }, []);

  // ゲームループ
  useEffect(() => {
    if (!currentPiece || gameOver || isPaused) return;
    
    const interval = setInterval(() => {
      movePiece(0, 1);
    }, speed);
    
    return () => clearInterval(interval);
  }, [currentPiece, gameOver, isPaused, speed, movePiece]);

  // 描画用のボードを生成（現在のピースを含む）
  const getDisplayBoard = useCallback(() => {
    const displayBoard = board.map(row => row.map(cell => ({ ...cell })));
    
    if (currentPiece && !gameOver) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = position.y + y;
            const boardX = position.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = {
                filled: true,
                color: currentPiece.color
              };
            }
          }
        }
      }
    }
    
    return displayBoard;
  }, [board, currentPiece, position, gameOver]);

  const togglePause = useCallback(() => {
    if (!gameOver) {
      setIsPaused(prev => !prev);
    }
  }, [gameOver]);

  return {
    board: getDisplayBoard(),
    score,
    lines,
    gameOver,
    isPaused,
    nextPiece,
    startGame,
    movePiece,
    rotatePiece,
    hardDrop,
    togglePause
  };
};
