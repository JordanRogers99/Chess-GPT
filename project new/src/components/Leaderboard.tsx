import React from 'react';
import { Trophy } from 'lucide-react';
import { User } from '../types';

interface LeaderboardProps {
  data: User[];
}

function Leaderboard({ data }: LeaderboardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Top Players</h2>
      <div className="space-y-4">
        {data.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === 0 ? 'bg-yellow-100 text-yellow-600' :
                index === 1 ? 'bg-gray-100 text-gray-600' :
                index === 2 ? 'bg-orange-100 text-orange-600' :
                'bg-blue-50 text-blue-600'
              }`}>
                {index + 1}
              </div>
              <div>
                <div className="font-semibold">{user.username}</div>
                <div className="text-sm text-gray-500">Rating: {user.rating}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${user.balance}</div>
              <div className="text-sm text-gray-500">V${user.virtualBalance}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;