import React from 'react';
import { format } from 'date-fns';
import { Trophy, Users } from 'lucide-react';
import { Tournament } from '../types';
import { useStore } from '../store/useStore';
import { joinTournament } from '../services/tournament';

interface TournamentListProps {
  tournaments: Tournament[];
  onJoin: (tournamentId: string) => Promise<void>;
}

function TournamentList({ tournaments, onJoin }: TournamentListProps) {
  const { user } = useStore();

  return (
    <div className="space-y-4">
      {tournaments.map((tournament) => (
        <div
          key={tournament.id}
          className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <h3 className="font-semibold">
                  {tournament.isVirtual ? 'Practice Tournament' : 'Cash Tournament'}
                </h3>
                <p className="text-sm text-gray-600">
                  Starts at {format(tournament.startTime, 'h:mm a')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">
                {tournament.isVirtual ? 'V$' : '$'}{tournament.entryFee}
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-1" />
                {tournament.participants.length} players
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Current Prize Pool: {tournament.isVirtual ? 'V$' : '$'}
              {tournament.participants.length * tournament.entryFee}
              <br />
              1st: {tournament.prizes.first} • 2nd: {tournament.prizes.second} • 3rd: {tournament.prizes.third}
            </div>
            <button
              onClick={() => onJoin(tournament.id)}
              className={`px-4 py-2 rounded-md ${
                user
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!user}
            >
              {user ? 'Join Tournament' : 'Sign in to join'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TournamentList;