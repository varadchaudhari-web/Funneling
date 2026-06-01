import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getDefaultDashboardPath, type UserRole } from '@/lib/rbac';
import { toast } from 'sonner';

const DEMO_ROLES = [
  { role: 'business_owner', label: 'Business Owner', email: 'alex@business.com', desc: 'Standard user dashboard' },
  { role: 'agency', label: 'Agency', email: 'sarah@agency.com', desc: 'Multi-client management' },
  { role: 'sales', label: 'Sales Team', email: 'marcus@sales.com', desc: 'Sales pipeline focus' },
  { role: 'admin', label: 'Admin', email: 'admin@funneling.io', desc: 'Full admin panel access' },
] as const;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('business_owner');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const signupNotice = (location.state as { signupNotice?: string } | null)?.signupNotice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    const ok = await login(email, password, selectedRole);
    setLoading(false);
    if (ok) {
      toast.success('Welcome back! Redirecting to dashboard...');
      setTimeout(() => navigate(getDefaultDashboardPath(selectedRole)), 500);
    }
  };

  const handleDemoLogin = async (role: UserRole, demoEmail: string) => {
    setLoading(true);
    setSelectedRole(role);
    await login(demoEmail, 'demo123', role);
    setLoading(false);
    toast.success('Demo login successful!');
    navigate(getDefaultDashboardPath(role));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-secondary-900 to-gray-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-mesh-purple opacity-30" />
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center shadow-brand">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-2xl font-display font-bold text-white">Funneling</span>
          </Link>
          <p className="text-white/60">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-brand-xl p-8">
          {signupNotice && (
            <div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-100 flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800 leading-relaxed">{signupNotice}</p>
            </div>
          )}

          {/* Demo Role Selector */}
          <div className="mb-6 p-4 bg-primary-50 rounded-2xl border border-primary-100">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">Demo Mode — Quick Login</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ROLES.map(({ role, label, email: demoEmail, desc }) => (
                <button
                  key={role}
                  onClick={() => handleDemoLogin(role, demoEmail)}
                  disabled={loading}
                  className={`text-left p-3 rounded-xl border-2 transition-all text-xs ${selectedRole === role ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300 bg-white'}`}
                >
                  <p className="font-semibold text-gray-900">{label}</p>
                  <p className="text-gray-500">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or sign in with email</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="input-field pr-11" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <Link to="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><ArrowRight className="w-4 h-4" /> Sign In</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">Create one free</Link>
          </p>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          By signing in, you agree to our{' '}
          <Link to="/contact" className="underline">Terms</Link> and{' '}
          <Link to="/contact" className="underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
