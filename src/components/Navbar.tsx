import { Bot, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModal from './auth/AuthModal';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <>
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8" />
              <span className="font-bold text-xl">JobAI</span>
            </Link>
            
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-8">
                <Link to="/" className="hover:text-gray-600">Home</Link>
                <Link to="/pricing" className="hover:text-gray-600">Pricing</Link>
                <Link to="/contact" className="hover:text-gray-600">Contact</Link>
              </div>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-600">
                    <UserIcon className="h-5 w-5" />
                    <span>{user.email}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView="login"
      />
    </>
  );
}