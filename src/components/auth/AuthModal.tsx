import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
};

export default function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'signup'>(initialView);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">
            {view === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
        </div>

        {view === 'login' ? <LoginForm /> : <SignupForm />}

        <div className="text-center mt-6">
          <button
            onClick={() => setView(view === 'login' ? 'signup' : 'login')}
            className="text-gray-600 hover:text-gray-800"
          >
            {view === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}