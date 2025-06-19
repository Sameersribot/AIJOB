// import { useState } from 'react';
// import { supabase } from '../../lib/supabase';
// import GoogleButton from './GoogleButton';
// import { useNavigate } from 'react-router-dom';

// export default function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [resetEmail, setResetEmail] = useState('');
//   const [resetLoading, setResetLoading] = useState(false);
//   const [resetMessage, setResetMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password
//       });

//       if (error) throw error;
      
//       // Close any open modals and redirect
//       const modals = document.querySelectorAll('[role="dialog"]');
//       modals.forEach(modal => modal.remove());
      
//       window.location.href = '/profile';
//     } catch (error) {
//       console.error('Error logging in:', error);
//       alert('Error logging in. Please check your credentials and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleForgotPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setResetLoading(true);
//     setResetMessage('');

//     try {
//       // First, check if the email exists in the system
//       const { data: users, error: checkError } = await supabase.auth.admin.listUsers();
      
//       if (checkError) {
//         // If we can't check users, try the reset anyway
//         console.log('Cannot check user existence, proceeding with reset attempt');
//       }

//       // Attempt to send reset email
//       const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
//         redirectTo: `${window.location.origin}/auth/callback`
//       });

//       if (error) {
//         console.error('Password reset error:', error);
        
//         // Handle different types of errors
//         if (error.message.includes('Email not confirmed')) {
//           setResetMessage('Your email address is not confirmed. Please check your inbox for the confirmation email first, then try resetting your password.');
//         } else if (error.message.includes('User not found') || error.message.includes('Invalid email')) {
//           setResetMessage('No account found with this email address. Please check the email or create a new account.');
//         } else if (error.message.includes('SMTP') || error.message.includes('email') || error.message.includes('mail')) {
//           setResetMessage('Our email service is temporarily unavailable. Please contact our support team at support@ovalpod.com for immediate assistance with your password reset.');
//         } else if (error.message.includes('rate limit') || error.message.includes('too many')) {
//           setResetMessage('Too many reset attempts. Please wait a few minutes before trying again.');
//         } else {
//           setResetMessage('Unable to send password reset email at this time. Please contact support@ovalpod.com for assistance.');
//         }
//       } else {
//         setResetMessage('Password reset instructions have been sent to your email address. Please check your inbox and spam folder. The link will expire in 1 hour.');
//       }
      
//       setResetEmail('');
//     } catch (error) {
//       console.error('Error sending reset email:', error);
//       setResetMessage('An unexpected error occurred. Please contact support@ovalpod.com for immediate assistance.');
//     } finally {
//       setResetLoading(false);
//     }
//   };

//   if (showForgotPassword) {
//     return (
//       <div className="space-y-6">
//         <div className="text-center">
//           <h3 className="text-xl font-semibold mb-2">Reset Your Password</h3>
//           <p className="text-gray-600 text-sm">
//             Enter your email address and we'll send you instructions to reset your password.
//           </p>
//         </div>

//         <form onSubmit={handleForgotPassword} className="space-y-4">
//           <div>
//             <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="resetEmail"
//               value={resetEmail}
//               onChange={(e) => setResetEmail(e.target.value)}
//               className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:border-gray-300"
//               placeholder="Enter your email address"
//               required
//             />
//           </div>

//           {resetMessage && (
//             <div className={`p-4 rounded-xl border-2 ${
//               resetMessage.includes('sent to your email') || resetMessage.includes('Password reset instructions')
//                 ? 'bg-green-50 border-green-200' 
//                 : resetMessage.includes('contact support') || resetMessage.includes('temporarily unavailable')
//                 ? 'bg-yellow-50 border-yellow-200'
//                 : 'bg-red-50 border-red-200'
//             }`}>
//               <div className="flex items-start space-x-3">
//                 <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
//                   resetMessage.includes('sent to your email') || resetMessage.includes('Password reset instructions')
//                     ? 'bg-green-500' 
//                     : resetMessage.includes('contact support') || resetMessage.includes('temporarily unavailable')
//                     ? 'bg-yellow-500'
//                     : 'bg-red-500'
//                 }`}>
//                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     {resetMessage.includes('sent to your email') || resetMessage.includes('Password reset instructions') ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                     ) : resetMessage.includes('contact support') || resetMessage.includes('temporarily unavailable') ? (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
//                     ) : (
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                     )}
//                   </svg>
//                 </div>
//                 <div className="flex-1">
//                   <p className={`text-sm font-medium ${
//                     resetMessage.includes('sent to your email') || resetMessage.includes('Password reset instructions')
//                       ? 'text-green-800' 
//                       : resetMessage.includes('contact support') || resetMessage.includes('temporarily unavailable')
//                       ? 'text-yellow-800'
//                       : 'text-red-800'
//                   }`}>
//                     {resetMessage}
//                   </p>
//                   {resetMessage.includes('contact support') && (
//                     <div className="mt-2">
//                       <a 
//                         href="mailto:support@ovalpod.com?subject=Password Reset Request&body=Hello, I need help resetting my password for my Ovalpod account. My email address is: " 
//                         className="text-sm underline hover:no-underline font-medium"
//                       >
//                         Contact Support Now →
//                       </a>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={resetLoading}
//             className="w-full bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl font-medium"
//           >
//             {resetLoading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Sending Reset Email...
//               </span>
//             ) : (
//               'Send Reset Instructions'
//             )}
//           </button>

//           <div className="text-center">
//             <button
//               type="button"
//               onClick={() => {
//                 setShowForgotPassword(false);
//                 setResetMessage('');
//                 setResetEmail('');
//               }}
//               className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium py-2"
//             >
//               ← Back to Login
//             </button>
//           </div>
//         </form>

//         {/* Alternative Contact Method */}
//         <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//           <h4 className="font-medium text-gray-900 mb-2">Need Immediate Help?</h4>
//           <p className="text-sm text-gray-600 mb-3">
//             If you're having trouble with password reset, our support team is here to help.
//           </p>
//           <div className="space-y-2">
//             <a 
//               href="mailto:support@ovalpod.com?subject=Password Reset Help&body=Hello, I need assistance with resetting my password for my Ovalpod account."
//               className="block w-full text-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
//             >
//               📧 Email Support
//             </a>
//             <p className="text-xs text-gray-500 text-center">
//               We typically respond within 2-4 hours
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:border-gray-300"
//           placeholder="Enter your email"
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
//           className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:border-gray-300"
//           placeholder="Enter your password"
//           required
//         />
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <input
//             id="remember-me"
//             name="remember-me"
//             type="checkbox"
//             className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
//           />
//           <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
//             Remember me
//           </label>
//         </div>

//         <button
//           type="button"
//           onClick={() => setShowForgotPassword(true)}
//           className="text-sm text-black hover:text-gray-700 font-medium transition-colors duration-300 hover:underline"
//         >
//           Forgot password?
//         </button>
//       </div>

//       <button
//         type="submit"
//         disabled={isLoading}
//         className="w-full bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl font-medium"
//       >
//         {isLoading ? (
//           <span className="flex items-center justify-center">
//             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Logging in...
//           </span>
//         ) : (
//           'Log In'
//         )}
//       </button>

//       <div className="relative my-6">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-300"></div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-2 bg-white text-gray-500">Or continue with</span>
//         </div>
//       </div>

//       <GoogleButton />
//     </form>
//   );
// }
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import GoogleButton from './GoogleButton';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      // Close any open modals and redirect
      const modals = document.querySelectorAll('[role="dialog"]');
      modals.forEach(modal => modal.remove());
      
      window.location.href = '/profile';
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });

      if (error) throw error;
      
      setResetMessage('Password reset email sent! Check your inbox and follow the instructions to reset your password.');
      setResetEmail('');
    } catch (error) {
      console.error('Error sending reset email:', error);
      setResetMessage('Error sending reset email. Please try again or contact support if the problem persists.');
    } finally {
      setResetLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Reset Your Password</h3>
          <p className="text-gray-600 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label htmlFor="resetEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="resetEmail"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:border-gray-300"
              placeholder="Enter your email address"
              required
            />
          </div>

          {resetMessage && (
            <div className={`p-4 rounded-xl border-2 ${
              resetMessage.includes('Error') || resetMessage.includes('contact support')
                ? 'bg-red-50 border-red-200' 
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  resetMessage.includes('Error') || resetMessage.includes('contact support')
                    ? 'bg-red-500' 
                    : 'bg-green-500'
                }`}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {resetMessage.includes('Error') || resetMessage.includes('contact support') ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    )}
                  </svg>
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    resetMessage.includes('Error') || resetMessage.includes('contact support')
                      ? 'text-red-800' 
                      : 'text-green-800'
                  }`}>
                    {resetMessage}
                  </p>
                  {resetMessage.includes('Check your inbox') && (
                    <p className="text-green-700 text-xs mt-1">
                      The reset link will expire in 1 hour. Don't forget to check your spam folder!
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={resetLoading}
            className="w-full bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl font-medium"
          >
            {resetLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Reset Email...
              </span>
            ) : (
              'Send Reset Email'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                setResetMessage('');
                setResetEmail('');
              }}
              className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium py-2"
            >
              ← Back to Login
            </button>
          </div>
        </form>

        {/* Support Contact */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
          <p className="text-sm text-gray-600 mb-3">
            If you're having trouble with password reset, contact our support team.
          </p>
          <a 
            href="https://ovalpod.com/contact"
            className="block w-full text-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            📧 Contact Support
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:border-gray-300"
          placeholder="Enter your email"
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
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 hover:border-gray-300"
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>

        <button
          type="button"
          onClick={() => setShowForgotPassword(true)}
          className="text-sm text-black hover:text-gray-700 font-medium transition-colors duration-300 hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl font-medium"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging in...
          </span>
        ) : (
          'Log In'
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
  );
}