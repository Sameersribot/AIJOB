import { useCallback } from 'react';
import { supabase } from '../../lib/supabase';

export default function GoogleButton() {
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Error signing in with Google. Please try again.');
    }
  }, []);

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Continue with Google</span>
    </button>
  );
}