import React from 'react';
import { Link } from 'react-router-dom';
import { Sword, Trophy, DollarSign, Brain } from 'lucide-react';

function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to ChessArena
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Play chess, compete in tournaments, and win real prizes in the ultimate online chess platform.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/play"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Play Now
          </Link>
          <Link
            to="/tournaments"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Join Tournament
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Sword className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Play Against AI</h3>
          <p className="text-gray-600">
            Challenge our advanced chess engine and improve your skills at your own pace.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Trophy className="h-12 w-12 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Regular Tournaments</h3>
          <p className="text-gray-600">
            Compete in tournaments every 3 hours and win real prizes.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Brain className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Practice Mode</h3>
          <p className="text-gray-600">
            Try the platform with virtual currency before playing for real money.
          </p>
        </div>
      </section>

      <section className="bg-blue-50 -mx-4 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account and deposit funds</p>
            </div>
            <div>
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Join Tournaments</h3>
              <p className="text-gray-600">Enter tournaments for just $3</p>
            </div>
            <div>
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Win Prizes</h3>
              <p className="text-gray-600">Top 3 players share the prize pool</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;