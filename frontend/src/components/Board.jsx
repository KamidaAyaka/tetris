import React from 'react';
import Cell from './Cell';

const Board = ({ board }) => {
  const boardStyle = {
    display: 'grid',
    gridTemplateRows: `repeat(${board.length}, 30px)`,
    gridTemplateColumns: `repeat(${board[0].length}, 30px)`,
    gap: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
  };

  return (
    <div style={boardStyle}>
      {board.map((row, y) =>
        row.map((cell, x) => (
          <Cell key={`${y}-${x}`} filled={cell.filled} color={cell.color} />
        ))
      )}
    </div>
  );
};

export default Board;
