import React from 'react';
import { useStore } from '../store/useStore';
import { Trophy, DollarSign, Clock } from 'lucide-react';

function Profile() {
  const { user } = useStore();

  if (!user) {
    return (
      <div className="text-center py-12">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <Trophy className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-gray-600">Rating: {user.rating}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">Balance</h3>
            </div>
            <p className="text-2xl font-bold">${user.balance}</p>
            <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Deposit Funds
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold">Practice Balance</h3>
            </div>
            <p className="text-2xl font-bold">V${user.virtualBalance}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Recent Games</h3>
        <div className="text-center text-gray-600 py-4">
          No recent games found.
        </div>
      </div>
    </div>
  );
}

export default Profile;