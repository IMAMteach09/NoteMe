import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { resetPassword } from '../api/authApi.js';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Reset token is missing from the link.');
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!token) {
      setError('Reset token is required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const data = await resetPassword(token, password);
      setMessage(data.message || 'Your password has been reset successfully.');
      setTimeout(() => {
        navigate('/login');
      }, 1800);
    } catch (err) {
      setError(err.message || 'Unable to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafe] px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Reset your password</h1>
        <p className="text-slate-600 mb-8">Enter a new password for your account.</p>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        {message && <p className="text-sm text-slate-700 mb-4">{message}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">New password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-3 font-semibold transition-colors disabled:opacity-70"
          >
            {isLoading ? 'Resetting password...' : 'Reset password'}
          </button>
        </form>

        <div className="mt-8 text-sm text-slate-600">
          Back to <Link to="/login" className="text-blue-600 hover:underline">sign in</Link>
        </div>
      </div>
    </div>
  );
}
