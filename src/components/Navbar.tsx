import { Bot, LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModal from './auth/AuthModal';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <>
      <nav className="border-b relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
            <img src="/favicon.svg" alt="OvalPod Logo" className="h-8 w-8" />
            <span className="font-bold text-xl">Ovalpod</span>
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-8">
                <Link to="/" className="hover:text-gray-600">Home</Link>
                <Link to="/pricing" className="hover:text-gray-600">Pricing</Link>
                <Link to="/contact" className="hover:text-gray-600">Contact</Link>
              </div>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-600">
                    <UserIcon className="h-5 w-5" />
                    <span className="truncate max-w-[150px]">{user.email}</span>
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

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b shadow-lg z-50">
            <div className="px-4 py-2 space-y-2">
              <Link 
                to="/" 
                className="block py-2 hover:text-gray-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/pricing" 
                className="block py-2 hover:text-gray-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/contact" 
                className="block py-2 hover:text-gray-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 py-2 hover:text-gray-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserIcon className="h-5 w-5" />
                    <span className="truncate">{user.email}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 py-2 w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView="login"
      />
    </>
  );
}