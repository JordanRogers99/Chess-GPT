import React from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useStore } from '../store/useStore';

interface TournamentGameProps {
  gameId: string;
  whiteId: string;
  blackId: string;
  onMove: (move: string) => void;
  position: string;
}

function TournamentGame({ gameId, whiteId, blackId, onMove, position }: TournamentGameProps) {
  const { user } = useStore();
  const game = new Chess(position);
  
  const isPlayerTurn = () => {
    if (!user) return false;
    return (game.turn() === 'w' && user.id === whiteId) ||
           (game.turn() === 'b' && user.id === blackId);
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (!isPlayerTurn()) return false;

    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move) {
        onMove(game.fen());
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="aspect-square">
        <Chessboard
          position={position}
          onPieceDrop={onDrop}
          boardOrientation={user?.id === blackId ? 'black' : 'white'}
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        />
      </div>
      <div className="mt-4 text-center">
        {isPlayerTurn() ? (
          <div className="text-green-600 font-semibold">Your turn</div>
        ) : (
          <div className="text-gray-600">Waiting for opponent...</div>
        )}
      </div>
    </div>
  );
}

export default TournamentGame;