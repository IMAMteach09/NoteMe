import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';
import SettingsModal from './SettingsModal';
import Profile from './Profile';

// Added user and onLogout props so the modals have the data they need
export default function Navbar({ isAuthenticated = false, user, onLogout }) {
  const location = useLocation();
  
  // State to manage modal visibility
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Local state to hold the real-time profile picture update
  const [currentAvatar, setCurrentAvatar] = useState(user?.avatar || localStorage.getItem('noteMe_avatar'));

  // Sync avatar instantly whenever the profile modal opens or closes
  useEffect(() => {
    setCurrentAvatar(user?.avatar || localStorage.getItem('noteMe_avatar'));
  }, [user, isProfileOpen]);

  // Helper function to check if a route is active
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 bg-white/50 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center space-x-10">
          
          {/* Logo matching the screenshot */}
          <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
            NoteMe
          </Link>
          
          {/* Navigation Links with active state styling */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
            <Link 
              to="/features" 
              className={`pb-1 border-b-2 transition-colors ${isActive('/features') ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-slate-900'}`}
            >
              Features
            </Link>
            <Link 
              to="/contact" 
              className={`pb-1 border-b-2 transition-colors ${isActive('/contact') ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-slate-900'}`}
            >
              Contact
            </Link>
            <Link 
              to="/help" 
              className={`pb-1 border-b-2 transition-colors ${isActive('/help') ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-slate-900'}`}
            >
              Help
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Icons */}
          <button className="text-slate-600 hover:text-slate-900 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          {/* SETTINGS BUTTON: Now opens the SettingsModal */}
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          {/* Conditional Rendering for Auth Status */}
          {!isAuthenticated ? (
            <div className="flex items-center space-x-3 pl-2">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors hidden sm:block"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>
          ) : (
            /* PROFILE BUTTON: Now accurately switches to show your custom uploaded image */
            <div 
              onClick={() => setIsProfileOpen(true)}
              className="ml-2 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border border-slate-200 cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all bg-orange-100 text-orange-600"
            >
              {currentAvatar ? (
                <img src={currentAvatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
          )}
        </div>
      </header>

      {/* Render Modals outside the header flow */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        user={user} 
        onLogout={onLogout} 
      />
      
      <Profile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        user={user} 
      />
    </>
  );
}