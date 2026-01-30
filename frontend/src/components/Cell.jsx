import React from 'react';

const Cell = ({ filled, color }) => {
  const cellStyle = {
    width: '30px',
    height: '30px',
    border: filled ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
    backgroundColor: filled ? color : 'rgba(0, 0, 0, 0.3)',
    borderRadius: '2px',
    boxShadow: filled ? 'inset 0 0 10px rgba(255,255,255,0.2)' : 'none',
    transition: 'all 0.1s ease'
  };

  return <div style={cellStyle} />;
};

export default Cell;
