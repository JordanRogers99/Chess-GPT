import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sword, Trophy, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import AuthModal from './AuthModal';
import { signIn, signUp } from '../services/firebase';

function Navbar() {
  const { user, setUser } = useStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuth = async (email: string, password: string, isLogin: boolean) => {
    try {
      const authFunction = isLogin ? signIn : signUp;
      const userCredential = await authFunction(email, password);
      
      if (userCredential) {
        setUser({
          id: userCredential.uid,
          email: userCredential.email || '',
          username: email.split('@')[0], // Default username from email
          rating: 1200, // Default rating
          balance: 0,
          virtualBalance: 1000 // Starting virtual balance for practice
        });
        setIsAuthModalOpen(false);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      alert(error.message);
    }
  };

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
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSubmit={handleAuth}
      />
    </nav>
  );
}

export default Navbar;