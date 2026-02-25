import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/auth/SignupPage'
import LoginPage from './pages/auth/LoginPage'
import { Toaster } from '@/components/ui/sonner'
import VerifyOtp from './pages/auth/VerifyOtp'
import LandingPage from './pages/LandingPage'
const App = () => {
  return (
    <div className='bg-gray-100'>
      <Routes >
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/verify-otp/:email' element={<VerifyOtp />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
