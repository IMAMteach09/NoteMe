import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { X, Camera, Mail, User as UserIcon, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Profile({ isOpen, onClose, user }) {
  const { updateUser } = useAuth();
  // Editable State: Now checks localStorage first, falling back to empty/default if nothing exists
  const [username, setUsername] = useState(user?.name || localStorage.getItem('noteMe_username') || '');
  const [profilePic, setProfilePic] = useState(user?.avatar || localStorage.getItem('noteMe_avatar') || null);
  
  // Read-only info based on your request
  const email = user?.email || 'user@example.com';
  const personalInfo = user?.bio || 'Active NoteMe User. Member since 2024.';

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    setUsername(user?.name || localStorage.getItem('noteMe_username') || '');
    setProfilePic(user?.avatar || localStorage.getItem('noteMe_avatar') || null);
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (updateUser) {
      await updateUser({ name: username, avatar: profilePic });
    }

    localStorage.setItem('noteMe_username', username);
    if (profilePic) {
      localStorage.setItem('noteMe_avatar', profilePic);
    } else {
      localStorage.removeItem('noteMe_avatar');
    }
    
    alert('Profile updated successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-orange-500" /> My Profile
          </h2>
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          
          {/* Profile Picture Edit Section */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-orange-100 flex items-center justify-center">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-10 h-10 text-orange-400" />
                )}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-slate-400 font-medium">Click to change avatar</p>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>

          <div className="space-y-4">
            {/* Editable Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <UserIcon className="w-3.5 h-3.5 text-slate-400" /> Username
              </label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* Read-Only Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
              </label>
              <div className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-lg p-2.5 text-sm cursor-not-allowed">
                {email}
              </div>
            </div>

            {/* Read-Only Personal Info */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400" /> Personal Info
              </label>
              <div className="w-full bg-slate-50 border border-slate-100 text-slate-500 rounded-lg p-2.5 text-sm cursor-not-allowed h-20">
                {personalInfo}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}