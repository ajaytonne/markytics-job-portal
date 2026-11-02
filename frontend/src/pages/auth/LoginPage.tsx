import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, UserCheck, ShieldCheck, Briefcase } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    try {
      const user = await login(email);
      if (user.role === 'CANDIDATE') navigate('/candidate/dashboard');
      else if (user.role === 'RECRUITER') navigate('/recruiter/dashboard');
      else if (user.role === 'ADMIN') navigate('/admin/dashboard');
      else navigate('/');
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (role: 'CANDIDATE' | 'RECRUITER' | 'ADMIN') => {
    setLoading(true);
    try {
      const user = await login(undefined, role);
      if (user.role === 'CANDIDATE') navigate('/candidate/dashboard');
      else if (user.role === 'RECRUITER') navigate('/recruiter/dashboard');
      else if (user.role === 'ADMIN') navigate('/admin/dashboard');
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-2xl mx-auto shadow-md">
            M
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Sign In to Markytics
          </h2>
          <p className="text-xs text-slate-500">
            Session-authenticated access with secure HttpOnly cookies & CSRF protection.
          </p>
        </div>

        {/* Quick Demo Fill Selector */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
          <div className="font-semibold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider">
            One-Click Demo Account Autofill:
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('CANDIDATE')}
              className="py-1.5 px-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold rounded text-[11px] hover:bg-indigo-100 transition-colors"
            >
              Candidate
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('RECRUITER')}
              className="py-1.5 px-2 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-semibold rounded text-[11px] hover:bg-purple-100 transition-colors"
            >
              Recruiter
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('ADMIN')}
              className="py-1.5 px-2 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-semibold rounded text-[11px] hover:bg-amber-100 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        {(formError || error) && (
          <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 dark:text-red-300 text-xs rounded-lg">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
            Register as Candidate or Recruiter
          </Link>
        </div>
      </div>
    </div>
  );
};
