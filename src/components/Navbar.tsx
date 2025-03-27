import { LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthModal from './auth/AuthModal';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';
import Logo from './Logo';

export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-xl fixed w-full z-50 top-0 left-0 border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Logo />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              <div className="flex space-x-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative py-2 text-sm font-medium transition-all duration-300
                      ${location.pathname === link.path 
                        ? 'text-gray-900' 
                        : 'text-gray-600 hover:text-gray-900'}
                      after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full 
                      after:origin-left after:scale-x-0 after:bg-gradient-to-r 
                      after:from-black after:to-black after:transition-transform 
                      hover:after:scale-x-100
                      ${location.pathname === link.path ? 'after:scale-x-100' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {user ? (
                <div className="flex items-center space-x-8">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-3 group px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="relative w-8 h-8 bg-gradient-to-r from-black to-black rounded-full flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.email}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
                  >
                    <LogOut className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-black to-black text-white 
                    hover:from-gray-900 hover:to-black transition-all duration-300 text-sm font-medium 
                    flex items-center space-x-2 group shadow-lg shadow-gray-500/20 hover:shadow-gray-500/30"
                >
                  <span>Log In</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/80">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 text-base font-medium transition-colors duration-300
                    ${location.pathname === link.path 
                      ? 'text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <div className="pt-4 border-t border-gray-200/80">
                  <Link 
                    to="/profile"
                    className="flex items-center space-x-3 py-2 text-gray-700 group"
                  >
                    <div className="relative w-8 h-8 bg-gradient-to-r from-black to-black rounded-full flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-base font-medium group-hover:text-gray-900">{user.email}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 py-2 text-gray-600 w-full group"
                  >
                    <LogOut className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-base font-medium group-hover:text-gray-900">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-black to-black text-white 
                    hover:from-gray-900 hover:to-black transition-all duration-300 text-base font-medium 
                    shadow-lg shadow-gray-500/20 hover:shadow-gray-500/30"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Add padding to account for fixed header */}
      <div className="h-20"></div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView="login"
      />
    </>
  );
}