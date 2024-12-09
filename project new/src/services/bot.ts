import { Chess } from 'chess.js';

export interface Bot {
  id: string;
  name: string;
  rating: number;
  makeMove: (position: string) => Promise<string>;
}

class ChessBot implements Bot {
  id: string;
  name: string;
  rating: number;
  private difficulty: number;

  constructor(name: string, rating: number, difficulty: number) {
    this.id = `bot_${name.toLowerCase()}`;
    this.name = name;
    this.rating = rating;
    this.difficulty = difficulty;
  }

  async makeMove(position: string): Promise<string> {
    const chess = new Chess(position);
    const moves = chess.moves({ verbose: true });
    
    // Evaluate moves based on difficulty
    const moveScores = moves.map(move => {
      const newPosition = new Chess(position);
      newPosition.move(move);
      return {
        move,
        score: this.evaluatePosition(newPosition)
      };
    });

    // Add some randomness based on difficulty
    const randomFactor = (1 - this.difficulty) * 0.3;
    const bestMove = moveScores.reduce((best, current) => {
      const score = current.score + (Math.random() * randomFactor);
      return score > best.score ? { move: current.move, score } : best;
    }, { move: moves[0], score: -Infinity });

    chess.move(bestMove.move);
    return chess.fen();
  }

  private evaluatePosition(chess: Chess): number {
    // Simple material evaluation
    const pieces = chess.board().flat().filter(piece => piece);
    return pieces.reduce((score, piece) => {
      const values: { [key: string]: number } = {
        p: 1, n: 3, b: 3, r: 5, q: 9, k: 0
      };
      return score + (piece?.color === 'w' ? 1 : -1) * values[piece?.type || 'p'];
    }, 0);
  }
}

export const bots: Bot[] = [
  new ChessBot('BotBeginner', 1000, 0.3),
  new ChessBot('BotIntermediate', 1400, 0.6),
  new ChessBot('BotAdvanced', 1800, 0.9)
];

export const findMatchingBot = (rating: number): Bot => {
  return bots.reduce((closest, bot) => {
    return Math.abs(bot.rating - rating) < Math.abs(closest.rating - rating)
      ? bot
      : closest;
  });
};