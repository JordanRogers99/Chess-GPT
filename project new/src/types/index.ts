export interface User {
  id: string;
  username: string;
  email: string;
  rating: number;
  balance: number;
  virtualBalance: number;
}

export interface Tournament {
  id: string;
  startTime: Date;
  entryFee: number;
  isVirtual: boolean;
  participants: string[];
  status: 'upcoming' | 'in-progress' | 'completed';
  prizes: {
    first: number;
    second: number;
    third: number;
  };
  matches: Array<{
    white: string;
    black: string;
    result: null | 'white' | 'black' | 'draw';
  }>;
  standings: Array<{
    userId: string;
    points: number;
    position?: number;
  }>;
}

export interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  pgn: string;
  result: string;
  tournamentId?: string;
  timestamp: Date;
}