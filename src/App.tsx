import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import { UserProvider } from './context/UserContext';
import { useUser } from './context/UserContext';
import { useEffect } from 'react';
import { supabase } from './lib/supabase';
import PrivacyPolicy from './pages/privacy';
import TermsConditions from './pages/terms';

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

// Auth callback handler component
function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
        
        // Close any open modals
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => modal.remove());
        
        // Redirect to profile page
        navigate('/profile', { replace: true });
      } catch (error) {
        console.error('Error handling auth callback:', error);
        navigate('/', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Completing login...</h2>
        <p className="text-gray-600">Please wait while we redirect you.</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path='/privacy' element={<PrivacyPolicy />}/>
      <Route path='/terms' element={<TermsConditions />}/>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>
            <AppRoutes />
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;