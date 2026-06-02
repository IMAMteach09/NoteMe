import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Target } from 'lucide-react'; // Example branding icons
import { useAuth } from '../contexts/AuthContext.jsx';
import { register } from '../api/authApi.js';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginSuccess, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const data = await register({ name, email, password });
      loginSuccess(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Outer split-screen container. 
    // row on desktop (flex), col on mobile (though we hide the image pane on mobile)
    <div className="flex flex-row min-h-screen bg-white">
      
      {/* --- LEFT SIDE: THE FORM --- */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className="w-full max-w-md mx-auto">
           {/* Logo/Branding for Mobile (visible only <md) */}
          <div className="text-2xl font-bold text-blue-600 mb-8 flex items-center md:hidden">
              <Target className="mr-2 w-7 h-7"/>
              NoteMe
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-950 mb-3">Get Started for Free</h1>
            <p className="text-slate-600">Create your account and take back control of your day.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm text-sm mt-4 disabled:opacity-70"
            >
              {isLoading ? 'Creating account...' : 'Create Free Account'}
            </button>
          </form>

          {/* Social Sign In Option (Modern Touch) */}
          <div className="mt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-slate-400">OR CONTINUE WITH</span></div>
            </div>
            <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-lg border border-gray-200 transition-colors shadow-sm text-sm">
              <img src="https://authjs.dev/img/providers/google.svg" className="w-4 h-4" alt="Google" />
              Sign Up with Google
            </button>
          </div>

          <div className="mt-12 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Log in instead
            </Link>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE BRAND IMAGE PANE (Hidden on mobile) --- */}
      <div className="hidden md:flex flex-1 bg-slate-950 items-center justify-center p-12">
        <div className="w-full max-w-xl text-center space-y-12 text-white">
            {/* Branding area (Logo + Text) */}
            <div>
                <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-slate-700">
                    <CheckCircle className="w-10 h-10 text-green-400"/>
                </div>
                <h2 className="text-3xl font-bold mb-3 tracking-tight">Simplify Your Workflow, Fast.</h2>
                <p className="text-slate-400 max-w-md mx-auto">You're one step away from a more organized life. Join thousands of users who trust NoteMe.</p>
            </div>
            
            {/* Descriptive placeholder block for the picture inside the design */}
            <div className="w-full h-80 bg-slate-800 border border-slate-700 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-600 shadow-xl">
                 <CheckCircle className="w-16 h-16 opacity-30 mb-4"/>
                <p className="font-semibold text-slate-500">[ Registration Image PlaceHolder ]</p>
            </div>
        </div>
      </div>
    </div>
  );
}