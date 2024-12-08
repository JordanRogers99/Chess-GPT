import React, { useState, useCallback, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import stockfishService from '../services/stockfish';

interface ChessGameProps {
  onGameEnd?: (result: string) => void;
}

function ChessGame({ onGameEnd }: ChessGameProps) {
  const [game, setGame] = useState(new Chess());
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [isThinking, setIsThinking] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  const makeMove = useCallback((move: { from: string; to: string; promotion?: string }) => {
    try {
      const result = game.move(move);
      if (result) {
        const newGame = new Chess(game.fen());
        setGame(newGame);
        setMoveHistory(prev => [...prev, `${result.from}${result.to}`]);
        return true;
      }
    } catch (e) {
      console.error('Move error:', e);
      return false;
    }
    return false;
  }, [game]);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (isThinking) return false;

    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move) {
      setIsThinking(true);
      stockfishService.makeMove(game.fen(), (bestMove) => {
        if (bestMove) {
          const [from, to] = [bestMove.slice(0, 2), bestMove.slice(2, 4)];
          makeMove({ from, to });
        }
        setIsThinking(false);
      });
    }

    return move;
  };

  useEffect(() => {
    if (game.isGameOver() && onGameEnd) {
      let result = 'Draw';
      if (game.isCheckmate()) {
        result = game.turn() === 'w' ? 'Black wins' : 'White wins';
      }
      onGameEnd(result);
    }
  }, [game, onGameEnd]);

  useEffect(() => {
    return () => {
      stockfishService.destroy();
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setOrientation(orientation === 'white' ? 'black' : 'white')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Flip Board
        </button>
        <div className="text-gray-600">
          {isThinking ? 'AI is thinking...' : 'Your turn'}
        </div>
      </div>
      <div className="aspect-square">
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          boardOrientation={orientation}
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        />
      </div>
      {game.isGameOver() && (
        <div className="mt-4 text-center font-bold text-xl">
          Game Over! {game.isCheckmate() ? 'Checkmate!' : 'Draw!'}
        </div>
      )}
      <div className="mt-4 text-sm text-gray-600">
        Moves: {moveHistory.join(', ')}
      </div>
    </div>
  );
}

export default ChessGame;