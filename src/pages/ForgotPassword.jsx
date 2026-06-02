import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api/authApi.js';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetLink, setResetLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setResetLink('');
    setIsLoading(true);

    try {
      const data = await forgotPassword(email);
      setMessage(data.message || 'If this email exists, a reset link has been generated.');
      setResetLink(data.resetLink || '');
    } catch (err) {
      setError(err.message || 'Unable to process password reset.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafe] px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Forgot your password?</h1>
        <p className="text-slate-600 mb-8">
          Enter your email below and we’ll generate a reset link for your account.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-slate-700">{message}</p>}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-3 font-semibold transition-colors disabled:opacity-70"
          >
            {isLoading ? 'Generating link...' : 'Send reset link'}
          </button>
        </form>

        {resetLink && (
          <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-sm text-slate-500 mb-2">Use this link to reset your password locally:</p>
            <a href={resetLink} className="text-blue-600 break-all">{resetLink}</a>
          </div>
        )}

        <div className="mt-8 text-sm text-slate-600">
          Remembered your password? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
