import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' | 'reset'
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');
    if (!email) { setError('Enter your email first.'); return; }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setNotice(`Reset link sent to ${email}. Check your inbox (and spam).`);
    } catch (err) {
      setError(
        err.code === 'auth/user-not-found'
          ? 'No account with that email.'
          : 'Could not send reset email.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* Document metadata bar */}
        <div className="border border-[var(--line)] border-b-0 px-5 py-2.5 flex items-center justify-between">
          <span className="mono-label">{'//'} SRH/ADMIN/AUTH</span>
          <span className="mono-label flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)] inline-block"></span>
            Restricted
          </span>
        </div>

        <div className="border border-[var(--line)] bg-[var(--panel)] p-8 lg:p-10">
          <h1 className="font-display text-4xl text-[var(--ink)] mb-2">
            {mode === 'login' ? 'Authenticate.' : <em>Reset access.</em>}
          </h1>
          <p className="font-mono-ed text-xs leading-relaxed text-[var(--ink-dim)] mb-10">
            {mode === 'login'
              ? 'Sign in to write, edit, and publish logs.'
              : "Enter your email and we'll send a password reset link."}
          </p>

          <form onSubmit={mode === 'login' ? handleLogin : handleReset} className="space-y-6">
            <div>
              <label className="mono-label block mb-2">01 — Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                className="ed-input"
                placeholder="you@example.com"
              />
            </div>

            {mode === 'login' && (
              <div>
                <label className="mono-label block mb-2">02 — Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="ed-input"
                  placeholder="••••••••"
                />
              </div>
            )}

            {error && <p className="mono-label text-[var(--ink)]">✕ {error}</p>}
            {notice && <p className="mono-label text-[var(--ink)] leading-relaxed">✓ {notice}</p>}

            <button type="submit" disabled={loading} className="ed-btn ed-btn--solid w-full justify-center disabled:opacity-50">
              {loading
                ? (mode === 'login' ? 'Authenticating...' : 'Sending...')
                : (mode === 'login' ? 'Sign in' : 'Send reset link')}
              <span>→</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--line)] flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                setMode(m => (m === 'login' ? 'reset' : 'login'));
                setError('');
                setNotice('');
              }}
              className="mono-label hover:text-[var(--ink)] transition-colors underline underline-offset-4 decoration-[var(--line-strong)]"
            >
              {mode === 'login' ? 'Forgot password?' : '← Back to sign in'}
            </button>
            <Link to="/" className="mono-label hover:text-[var(--ink)] transition-colors">
              Exit →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
