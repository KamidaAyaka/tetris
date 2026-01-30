import React from 'react';

const GameInfo = ({ score, lines, gameOver, isPaused, onStart, onPause, nextPiece }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    color: 'white',
    minWidth: '200px'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '20px',
    borderRadius: '8px',
    backdropFilter: 'blur(10px)'
  };

  const titleStyle = {
    fontSize: '14px',
    opacity: 0.7,
    marginBottom: '5px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  const valueStyle = {
    fontSize: '32px',
    fontWeight: 'bold'
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#667eea',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  const nextPieceContainerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '10px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100px'
  };

  const nextPieceGridStyle = {
    display: 'grid',
    gap: '2px'
  };

  const miniCellStyle = (filled, color) => ({
    width: '20px',
    height: '20px',
    backgroundColor: filled ? color : 'transparent',
    border: filled ? '1px solid rgba(255,255,255,0.3)' : 'none',
    borderRadius: '2px'
  });

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>スコア</div>
        <div style={valueStyle}>{score}</div>
      </div>

      <div style={cardStyle}>
        <div style={titleStyle}>ライン</div>
        <div style={valueStyle}>{lines}</div>
      </div>

      {nextPiece && (
        <div style={cardStyle}>
          <div style={titleStyle}>次のピース</div>
          <div style={nextPieceContainerStyle}>
            <div
              style={{
                ...nextPieceGridStyle,
                gridTemplateRows: `repeat(${nextPiece.shape.length}, 20px)`,
                gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, 20px)`
              }}
            >
              {nextPiece.shape.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${y}-${x}`}
                    style={miniCellStyle(cell, nextPiece.color)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div style={cardStyle}>
        <div style={titleStyle}>操作方法</div>
        <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <div>← → : 移動</div>
          <div>↑ : 回転</div>
          <div>↓ : 高速落下</div>
          <div>Space : ハードドロップ</div>
          <div>P : 一時停止</div>
        </div>
      </div>

      {gameOver && (
        <div style={{ ...cardStyle, backgroundColor: 'rgba(255, 0, 0, 0.3)' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
            ゲームオーバー
          </div>
        </div>
      )}

      {isPaused && !gameOver && (
        <div style={{ ...cardStyle, backgroundColor: 'rgba(255, 255, 0, 0.3)' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
            一時停止中
          </div>
        </div>
      )}

      <button
        style={buttonStyle}
        onClick={gameOver ? onStart : onPause}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'white';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.target.style.transform = 'scale(1)';
        }}
      >
        {gameOver ? '新しいゲーム' : isPaused ? '再開' : '一時停止'}
      </button>
    </div>
  );
};

export default GameInfo;
