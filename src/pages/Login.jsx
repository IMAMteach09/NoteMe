import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/image.jpg'; // Path to your logo
import { useAuth } from '../contexts/AuthContext.jsx';
import { login } from '../api/authApi.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    setIsLoading(true);

    try {
      const data = await login({ email, password });
      loginSuccess(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-white">
      {/* LEFT SIDE: FORM */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 md:hidden">
            <img src={logo} className="w-10 h-10 rounded-full border" alt="Logo" />
            <span className="text-2xl font-bold text-blue-600">NoteMe</span>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-950 mb-3">Welcome Back</h1>
            <p className="text-slate-600">Please enter your details to sign in.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 outline-none"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-sm disabled:opacity-70"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-sm text-slate-600 flex flex-col gap-3">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
            <div>
              Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create one</Link>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: BRANDING IMAGE */}
      <div className="hidden md:flex flex-1 bg-slate-50 items-center justify-center p-12 border-l">
        <div className="w-full max-w-xl text-center space-y-12">
            <div>
                {/* Rounded Logo as requested */}
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white shadow-xl">
                    <img src={logo} alt="NoteMe Brand" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Organize with Precision</h2>
                <p className="text-slate-500 max-w-md mx-auto italic">"Capture your ideas instantly."</p>
            </div>
            
            {/* Main Visual Placeholder */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur opacity-20"></div>
              <div className="relative w-full h-80 bg-white border rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
                  <img src={logo} className="w-40 opacity-10 grayscale" alt="watermark" />
                  <p className="absolute bottom-6 text-xs font-bold tracking-widest text-slate-300 uppercase">Dashboard Preview</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}