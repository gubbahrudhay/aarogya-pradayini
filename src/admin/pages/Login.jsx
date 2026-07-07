import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, isMock, mockLogin } from '../services/firebase';
import { signInWithPopup } from 'firebase/auth';
import { ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import logoImg from '../../assets/images/logo.jpg';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      if (isMock) {
        // By default mock log in as super-admin in mock mode
        await mockLogin('admin@sai.org');
      } else {
        await signInWithPopup(auth, googleProvider);
      }
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Authorization failed. Make sure your account is whitelisted.');
    } finally {
      setLoading(false);
    }
  };

  // Dedicated mock accounts login trigger helper
  const triggerMockLogin = async (email) => {
    setLoading(true);
    setError('');
    try {
      await mockLogin(email);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Unauthorized mockup credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 font-inter">
      <div className="w-full max-w-md bg-white border border-border rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Top accent badge */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md mx-auto mb-4 border border-border bg-white flex items-center justify-center">
            <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-poppins font-extrabold text-2xl text-text-primary mb-1">
            Sri Satya Sai Aarogya
          </h1>
          <p className="font-inter text-xs text-text-secondary font-semibold uppercase tracking-wider">
            Admin Portal
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-2xl p-4 mb-6">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 leading-relaxed font-inter font-medium">{error}</p>
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-bg text-text-primary font-bold py-3.5 border border-border rounded-2xl transition-all duration-300 shadow-xs active:scale-[0.98] disabled:opacity-60 font-poppins text-sm mb-6"
        >
          {/* Custom SVG Google Logo */}
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {loading ? 'Authorizing...' : 'Sign In with Google'}
        </button>

        {/* Simulated credentials list (ONLY active in mock mode) */}
        {isMock && (
          <div className="bg-bg rounded-2xl p-5 border border-border">
            <h3 className="font-poppins font-bold text-xs text-text-primary mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" />
              Dev Whitelist Bypass
            </h3>
            <p className="text-[11px] text-text-secondary/70 font-inter leading-relaxed mb-4">
              Select a test whitelisted email below to simulate role permissions instantly.
            </p>
            <div className="space-y-2">
              {[
                { email: 'admin@sai.org', role: 'Super Admin' },
                { email: 'editor@sai.org', role: 'Editor' },
                { email: 'volunteer@sai.org', role: 'Volunteer' }
              ].map((testAcc) => (
                <button
                  key={testAcc.email}
                  onClick={() => triggerMockLogin(testAcc.email)}
                  disabled={loading}
                  className="w-full flex items-center justify-between bg-white hover:bg-primary/5 text-xs text-text-primary font-semibold px-3 py-2 border border-border rounded-xl transition-all duration-300 font-inter text-left group"
                >
                  <span>{testAcc.email}</span>
                  <span className="flex items-center gap-1 text-[10px] text-accent font-bold group-hover:text-primary transition-colors">
                    {testAcc.role}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-[10px] text-text-secondary/60 font-inter">
          Authorized personnel only. Whitelist changes are controlled by Super Admins.
        </div>
      </div>
    </div>
  );
}
