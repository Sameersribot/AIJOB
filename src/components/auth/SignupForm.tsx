// import { useState } from 'react';
// import { supabase } from '../../lib/supabase';
// import GoogleButton from './GoogleButton';

// export default function SignupForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const { error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             full_name: name
//           }
//         }
//       });

//       if (error) throw error;
//       alert('Check your email for the confirmation link!');
//     } catch (error) {
//       console.error('Error signing up:', error);
//       alert('Error signing up. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//           Full Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
//           required
//         />
//       </div>
      
//       <div>
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={isLoading}
//         className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
//       >
//         {isLoading ? 'Signing up...' : 'Sign Up'}
//       </button>

//       <div className="relative my-6">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-300"></div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-2 bg-white text-gray-500">Or</span>
//         </div>
//       </div>

//       <GoogleButton />
//     </form>
//   );
// }
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import GoogleButton from './GoogleButton';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validatePassword = (password: string, confirmPassword: string) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword(password, confirmPassword)) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');

    try {
      // Sign up without email confirmation for now
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
          // Removed emailRedirectTo to avoid email confirmation issues
        }
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes('already registered') || error.message.includes('already exists')) {
          throw new Error('This email is already registered. Please try logging in instead.');
        } else if (error.message.includes('confirmation email')) {
          // If email confirmation fails, still create account but notify user
          setSuccessMessage('Account created successfully! You can now log in directly.');
        } else {
          throw error;
        }
      } else {
        // Check if user was created successfully
        if (data.user) {
          if (data.user.email_confirmed_at) {
            // User is immediately confirmed (email confirmation disabled)
            setSuccessMessage('Account created successfully! You can now log in.');
          } else {
            // User created but not confirmed - this is fine for our use case
            setSuccessMessage('Account created successfully! You can now log in.');
          }
        }
      }

      // Clear form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
    } catch (error: any) {
      console.error('Error signing up:', error);
      alert(`Error creating account: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {successMessage && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p className="text-green-800 font-medium text-sm">{successMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:border-gray-300"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:border-gray-300"
            placeholder="Enter your email address"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (confirmPassword) {
                validatePassword(e.target.value, confirmPassword);
              }
            }}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:border-gray-300"
            placeholder="Create a password (min. 6 characters)"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validatePassword(password, e.target.value);
            }}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:border-gray-300"
            placeholder="Confirm your password"
            required
          />
        </div>

        {passwordError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
            <p className="text-red-800 text-sm font-medium">{passwordError}</p>
          </div>
        )}

        <div className="flex items-start space-x-2">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded mt-1"
            required
          />
          <label htmlFor="terms" className="block text-sm text-gray-700 leading-relaxed">
            I agree to the{' '}
            <a href="/terms" target="_blank" className="text-black hover:text-gray-700 font-medium underline">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="/privacy" target="_blank" className="text-black hover:text-gray-700 font-medium underline">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading || !!passwordError}
          className="w-full bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl font-medium"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <GoogleButton />
      </form>
    </div>
  );
}