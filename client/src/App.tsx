import { Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import { Toaster } from '@/components/ui/sonner';
import VerifyOtp from './pages/auth/VerifyOtp';
import LandingPage from './pages/LandingPage';
import { useAuth } from './hooks/useAuth';
import { Loader2 } from 'lucide-react';

const App = () => {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route
          path='/login'
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path='/signup'
          element={!isLoggedIn ? <SignupPage /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path='/verify-otp/:email'
          element={!isLoggedIn ? <VerifyOtp /> : <Navigate to="/dashboard" replace />}
        />

        <Route
          path='*'
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} replace />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;