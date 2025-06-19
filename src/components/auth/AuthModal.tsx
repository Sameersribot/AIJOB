// import { useState } from 'react';
// import LoginForm from './LoginForm';
// import SignupForm from './SignupForm';

// type AuthModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   initialView?: 'login' | 'signup';
// };

// export default function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
//   const [view, setView] = useState<'login' | 'signup'>(initialView);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           ✕
//         </button>
        
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold">
//             {view === 'login' ? 'Welcome Back' : 'Create Account'}
//           </h2>
//         </div>

//         {view === 'login' ? <LoginForm /> : <SignupForm />}

//         <div className="text-center mt-6">
//           <button
//             onClick={() => setView(view === 'login' ? 'signup' : 'login')}
//             className="text-gray-600 hover:text-gray-800"
//           >
//             {view === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';
import { X } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-100 transform transition-all duration-300 scale-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300 p-2 hover:bg-gray-100 rounded-full z-10"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-black to-gray-800 text-white px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium">
              {view === 'login' ? '🔐 Login' : '🚀 Sign Up'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {view === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            {view === 'login' 
              ? 'Sign in to continue your job search journey' 
              : 'Join thousands of successful job seekers'
            }
          </p>
        </div>

        <div className="mb-6">
          {view === 'login' ? <LoginForm /> : <SignupForm />}
        </div>

        <div className="text-center pt-4 border-t border-gray-100">
          <button
            onClick={() => setView(view === 'login' ? 'signup' : 'login')}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300 font-medium text-sm sm:text-base"
          >
            {view === 'login' 
              ? "Don't have an account? Create one" 
              : 'Already have an account? Sign in'
            }
          </button>
        </div>
      </div>
    </div>
  );
}