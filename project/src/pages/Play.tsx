import React from 'react';
import ChessGame from '../components/ChessGame';

function Play() {
  const handleGameEnd = (result: string) => {
    console.log('Game ended:', result);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Play Against AI</h2>
        <ChessGame onGameEnd={handleGameEnd} />
      </div>
    </div>
  );
}

export default Play;