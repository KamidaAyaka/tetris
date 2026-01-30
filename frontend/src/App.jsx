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
    nextPiece,
    startGame,
    movePiece,
    rotatePiece,
    hardDrop,
    togglePause
  } = useGameLogic();

  // キーボード入力処理
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

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

  // ゲーム開始時に自動的にスタート
  useEffect(() => {
    startGame();
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px'
  };

  const gameContainerStyle = {
    display: 'flex',
    gap: '30px',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '30px',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
  };

  const titleStyle = {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    letterSpacing: '4px'
  };

  return (
    <>
      <div style={titleStyle}>TETRIS</div>
      <div style={containerStyle}>
        <div style={gameContainerStyle}>
          <Board board={board} />
          <GameInfo
            score={score}
            lines={lines}
            gameOver={gameOver}
            isPaused={isPaused}
            nextPiece={nextPiece}
            onStart={startGame}
            onPause={togglePause}
          />
        </div>
      </div>
    </>
  );
};

export default App;
