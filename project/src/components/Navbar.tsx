import React from 'react';
import { Link } from 'react-router-dom';
import { Sword, Trophy, User } from 'lucide-react';
import { useStore } from '../store/useStore';

function Navbar() {
  const { user } = useStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sword className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">ChessArena</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/play" className="text-gray-700 hover:text-blue-600">
              Play
            </Link>
            <Link to="/tournaments" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Trophy className="h-5 w-5" />
              <span>Tournaments</span>
            </Link>
            {user ? (
              <Link to="/profile" className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{user.username}</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  ${user.balance}
                </span>
              </Link>
            ) : (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;