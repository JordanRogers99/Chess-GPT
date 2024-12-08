import React, { useEffect, useState } from 'react';
import { format, addHours } from 'date-fns';
import { Trophy, Clock, Users } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Tournament } from '../types';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Tournaments() {
  const { user } = useStore();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const tournamentsRef = collection(db, 'tournaments');
        const q = query(
          tournamentsRef,
          where('startTime', '>=', new Date())
        );
        const querySnapshot = await getDocs(q);
        const tournamentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Tournament[];
        setTournaments(tournamentsData);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const nextTournamentTime = addHours(new Date(), 3);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upcoming Tournaments</h2>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>Next tournament starts: {format(nextTournamentTime, 'h:mm a')}</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading tournaments...</div>
        ) : (
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
                    Prizes: 1st ${tournament.prizes.first} • 2nd ${tournament.prizes.second} • 3rd ${tournament.prizes.third}
                  </div>
                  <button
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
        )}
      </div>
    </div>
  );
}

export default Tournaments;