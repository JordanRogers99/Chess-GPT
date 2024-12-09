import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Trophy, Clock, DollarSign } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Tournament } from '../types';
import TournamentList from '../components/TournamentList';
import Leaderboard from '../components/Leaderboard';
import { joinTournament, getLeaderboard } from '../services/tournament';

function Tournaments() {
  const { user } = useStore();
  const [virtualTournaments, setVirtualTournaments] = useState<Tournament[]>([]);
  const [realTournaments, setRealTournaments] = useState<Tournament[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'virtual' | 'real'>('virtual');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaderboard(data);
    };

    fetchLeaderboard();
  }, []);

  const handleJoinTournament = async (tournamentId: string) => {
    if (!user) return;
    try {
      await joinTournament(tournamentId, user.id);
      // Refresh tournaments after joining
      // You'll need to implement the refresh logic
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Chess Tournaments</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('virtual')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'virtual'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Practice (V$)
                </button>
                <button
                  onClick={() => setActiveTab('real')}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === 'real'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Real Money ($)
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <Clock className="h-5 w-5" />
                <span>Next tournament starts in: {format(new Date(Math.ceil(new Date().getTime() / 3600000) * 3600000), 'h:mm a')}</span>
              </div>

              {activeTab === 'virtual' ? (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-2">Practice Tournaments</h3>
                    <p className="text-sm text-gray-600">
                      Join with V$1 virtual dollars. New tournaments every hour!
                      Get V$1000 when you sign up.
                    </p>
                  </div>
                  <TournamentList
                    tournaments={virtualTournaments}
                    onJoin={handleJoinTournament}
                  />
                </>
              ) : (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-2">Cash Tournaments</h3>
                    <p className="text-sm text-gray-600">
                      $3 entry fee. 50% to 1st place, 30% to 2nd, 20% to 3rd.
                      New tournaments every hour!
                    </p>
                  </div>
                  <TournamentList
                    tournaments={realTournaments}
                    onJoin={handleJoinTournament}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <Leaderboard data={leaderboard} />
        </div>
      </div>
    </div>
  );
}

export default Tournaments;