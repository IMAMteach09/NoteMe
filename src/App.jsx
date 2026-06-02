import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Features from './pages/Features';
import Help from './pages/Help';
import Contact from './pages/Contact';
import RichNotes from './pages/Features/RichNotes';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import { useAuth } from './contexts/AuthContext.jsx';

export default function App() {
  const location = useLocation();
  const { isAuthenticated, loading, user, logout } = useAuth();

  const authPages = ['/login', '/signup', '/forgot-password', '/reset-password'];
  const isAuthPage = authPages.some((page) => location.pathname.startsWith(page));
  const isAppDashboard = location.pathname === '/dashboard';
  const shouldHideLayout = isAuthPage || isAppDashboard;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8fafe] text-slate-800">
      
      {!shouldHideLayout && <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={logout} />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<Features />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Protected Dashboard Route: Redirects to /signup if not authenticated */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/signup" />} 
          />
          
          {/* Detailed Feature Routes passing authentication state */}
          <Route path="/features/rich-notes" element={<RichNotes isAuthenticated={isAuthenticated} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Other placeholders */}
          <Route path="/features/secure-vault" element={<div className="p-20 text-center">Secure Vault Coming Soon</div>} />
          <Route path="/features/smart-calendar" element={<div className="p-20 text-center">Smart Calendar Coming Soon</div>} />
          <Route path="/features/weekly-scheduler" element={<div className="p-20 text-center">Weekly Scheduler Coming Soon</div>} />
          <Route path="/features/expense-tracker" element={<div className="p-20 text-center">Expense Tracker Coming Soon</div>} />
        </Routes>
      </main>

      {!shouldHideLayout && <Footer />}
    </div>
  );
}