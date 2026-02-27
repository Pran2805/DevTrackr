import { Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import { Toaster } from '@/components/ui/sonner';
import VerifyOtp from './pages/auth/VerifyOtp';
import LandingPage from './pages/LandingPage';
import { useAuth } from './hooks/useAuth';
import { Loader2 } from 'lucide-react';
import DashboardPage from './pages/DashboardPage';
import WorkspacePage from './pages/WorkspacePage';
import HomeLayout from './components/layout/HomeLayout';
import SettingPage from './pages/SettingPage';
import AchievedPage from './pages/AchievedPage';
import MemberPage from './pages/MemberPage';
import TaskPage from './pages/TaskPage';

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

        <Route element={<HomeLayout />}>
          <Route
            path='/dashboard'
            element={isLoggedIn ? <DashboardPage /> : <Navigate to="/" replace />}
          />

          <Route
            path='/workspace'
            element={isLoggedIn ? <WorkspacePage /> : <Navigate to="/" replace />}
          />
          <Route
            path='/tasks'
            element={isLoggedIn ? <TaskPage /> : <Navigate to="/" replace />}
          />
          <Route
            path='/members'
            element={isLoggedIn ? <MemberPage /> : <Navigate to="/" replace />}
          />
          <Route
            path='/achieve'
            element={isLoggedIn ? <AchievedPage /> : <Navigate to="/" replace />}
          />
          <Route
            path='/settings'
            element={isLoggedIn ? <SettingPage /> : <Navigate to="/" replace />}
          />
        </Route>
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