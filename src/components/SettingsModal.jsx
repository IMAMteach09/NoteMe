import { useState, useEffect } from 'react';
import { 
  X, Settings, User, Globe, Palette, Lock, LogOut, Cloud 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Imported Auth Context

export default function SettingsModal({ isOpen, onClose, user, onLogout }) {
  // 1. Component State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('English (US)');
  const [activeTheme, setActiveTheme] = useState('blue');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Access updateUser if your AuthContext provides it
  const { updateUser } = useAuth(); 

  // 2. Sync fields when the modal opens or user profile values change
  useEffect(() => {
    if (isOpen && user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setLanguage(user.preferences?.language || localStorage.getItem('noteMe_lang') || 'English (US)');
      setActiveTheme(user.preferences?.theme || localStorage.getItem('noteMe_theme') || 'blue');
      
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  // 3. Handle Form Submission
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      // Save theme and language options locally
      localStorage.setItem('noteMe_theme', activeTheme);
      localStorage.setItem('noteMe_lang', language);
      document.documentElement.dataset.theme = activeTheme;

      if (updateUser) {
        await updateUser({
          name,
          email,
          preferences: { language, theme: activeTheme }
        });
      } else {
        throw new Error('Profile update handler is not available.');
      }

      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update settings parameters.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" /> Account & App Settings
          </h2>
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Settings Form/Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-medium">
              {error}
            </div>
          )}

          {/* Parameter 1: Profile Editing */}
          <div className="flex gap-4 items-start pb-6 border-b border-slate-100">
            <User className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
            <div className="flex-1 space-y-3">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Profile Editing</h4>
                <p className="text-xs text-slate-400">Update your account display details.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  required
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="border border-slate-200 rounded-lg p-2 text-xs w-full focus:outline-none focus:border-blue-500" 
                  placeholder="Full Name" 
                />
                <input 
                  type="email" 
                  required
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-slate-200 rounded-lg p-2 text-xs w-full focus:outline-none focus:border-blue-500" 
                  placeholder="Email Address" 
                />
              </div>
            </div>
          </div>

          {/* Parameter 2: Language */}
          <div className="flex gap-4 items-start pb-6 border-b border-slate-100">
            <Globe className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
            <div className="flex-1 space-y-2">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Language Choice</h4>
                <p className="text-xs text-slate-400">Select your preferred display localization.</p>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-slate-200 text-xs rounded-lg p-2 bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="English (US)">English (US)</option>
                <option value="Français (FR)">Français (FR)</option>
                <option value="Español (ES)">Español (ES)</option>
                <option value="Deutsch (DE)">Deutsch (DE)</option>
              </select>
            </div>
          </div>

          {/* Parameter 3: Customize Theme */}
          <div className="flex gap-4 items-start pb-6 border-b border-slate-100">
            <Palette className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
            <div className="flex-1 space-y-2">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Website Theme</h4>
                <p className="text-xs text-slate-400">Pick an accent color flavor for your workspace.</p>
              </div>
              <div className="flex gap-3">
                {[
                  { id: 'blue', color: 'bg-blue-600' },
                  { id: 'purple', color: 'bg-purple-600' },
                  { id: 'emerald', color: 'bg-emerald-600' },
                  { id: 'dark', color: 'bg-slate-800' }
                ].map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setActiveTheme(theme.id)}
                    className={`w-7 h-7 rounded-full ${theme.color} transition-transform ${activeTheme === theme.id ? 'scale-110 ring-2 ring-offset-2 ring-blue-500' : 'hover:scale-105'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Parameter 4: Privacy Policy */}
          <div className="flex gap-4 items-start pb-6 border-b border-slate-100">
            <Lock className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
            <div className="flex-1 space-y-1">
              <h4 className="font-bold text-slate-800 text-sm">Privacy & Security</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your notes are encrypted in transit and at rest. We do not share database structures or private data tokens with third-party tracking services.
              </p>
              <Link to="/privacy" className="text-xs text-blue-600 hover:underline font-semibold inline-block pt-1">
                Read Full Privacy Policy →
              </Link>
            </div>
          </div>

          {/* Parameter 5: Logout Row */}
          <div className="flex gap-4 items-start pt-2">
            <LogOut className="w-5 h-5 text-red-500 mt-1 shrink-0" />
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-red-600 text-sm">Session Action</h4>
                <p className="text-xs text-slate-400">Securely sign out of your NoteMe profile workspace.</p>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs px-4 py-2 rounded-lg transition-colors shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout from Device
              </button>
            </div>
          </div>

        </form>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Cloud className="w-4 h-4" />
            <span className="text-[10px] font-bold tracking-wide uppercase">
              {isSaving ? 'Syncing...' : 'Cloud Configuration'}
            </span>
          </div>
          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={isSaving}
              className="text-xs font-bold text-slate-600 hover:text-slate-800 px-4 py-2 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving Parameters...' : 'Save Parameters'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}