import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const ROLES = [
  { value: 'business_owner', label: 'Business Owner', desc: 'Growing my own business' },
  { value: 'agency', label: 'Agency / Freelancer', desc: 'Managing client accounts' },
  { value: 'sales', label: 'Sales Professional', desc: 'Managing sales pipelines' },
] as const;

const PERKS = ['14-day free trial', 'No credit card required', 'Free migration help', '24/7 support'];
type SignupRole = (typeof ROLES)[number]['value'];

interface SubmittedAccount {
  name: string;
  email: string;
  company: string;
  roleLabel: string;
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', company: '', password: '' });
  const [selectedRole, setSelectedRole] = useState<SignupRole>('business_owner');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [submittedAccount, setSubmittedAccount] = useState<SubmittedAccount | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (!form.name || !form.email) { toast.error('Please fill in all required fields'); return; }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.password) { toast.error('Please set a password'); return; }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const roleLabel = ROLES.find(role => role.value === selectedRole)?.label || 'Business Owner';
    logout();
    setSubmittedAccount({
      name: form.name,
      email: form.email,
      company: form.company || 'Not provided',
      roleLabel,
    });
    setLoading(false);
    toast.success('Your account was generated successfully. Database is not connected; this is mock data.');
    setTimeout(() => {
      navigate('/login', {
        state: {
          signupNotice: 'Your account was generated successfully. Database is not connected; this is mock data. Please use demo login to continue.',
        },
      });
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-secondary-900 to-gray-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-mesh-purple opacity-30" />
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left: Perks */}
        <div className="hidden lg:block text-white">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center shadow-brand">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-2xl font-display font-bold">Funneling</span>
          </Link>
          <h2 className="text-4xl font-display font-black mb-4">Start Building High-Converting Funnels Today</h2>
          <p className="text-white/70 text-lg mb-8">Join 50,000+ businesses using Funneling to grow their revenue.</p>
          <ul className="space-y-4">
            {PERKS.map(p => (
              <li key={p} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Form */}
        <div>
          <div className="text-center mb-8 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-brand rounded-xl flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="text-xl font-display font-bold text-white">Funneling</span>
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-brand-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-primary-500' : 'bg-gray-200'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            </div>

            {submittedAccount ? (
              <div>
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
                  <Check className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Account Generated Successfully</h2>
                <p className="text-gray-500 text-sm mb-5">
                  Database is not connected in this demo, so this information was generated as mock data. You will be redirected to the login page.
                </p>
                <div className="space-y-3 bg-gray-50 rounded-2xl p-4 mb-6">
                  {[
                    { label: 'Name', value: submittedAccount.name },
                    { label: 'Email', value: submittedAccount.email },
                    { label: 'Company', value: submittedAccount.company },
                    { label: 'Role', value: submittedAccount.roleLabel },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-semibold text-gray-900 text-right">{value}</span>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => navigate('/login')} className="btn-primary w-full justify-center py-3.5">
                  Go to Login <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : step === 1 ? (
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-1">Create Your Account</h2>
                <p className="text-gray-500 text-sm mb-6">Start your 14-day free trial today</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Work Email <span className="text-red-500">*</span></label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                    <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="input-field" placeholder="Your Company" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
                    <div className="space-y-2">
                      {ROLES.map(({ value, label, desc }) => (
                        <button key={value} type="button" onClick={() => setSelectedRole(value)} className={`w-full text-left p-3 rounded-xl border-2 transition-all ${selectedRole === value ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <p className="font-semibold text-sm text-gray-900">{label}</p>
                          <p className="text-xs text-gray-500">{desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <button type="button" onClick={handleNext} className="btn-primary w-full justify-center py-3.5">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-1">Set Your Password</h2>
                <p className="text-gray-500 text-sm mb-6">Almost there! Create a secure password.</p>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600"><strong>{form.name}</strong> · {form.email}</p>
                    <button type="button" onClick={() => setStep(1)} className="text-xs text-primary-600 mt-1">Change</button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="input-field pr-11" placeholder="Min. 8 characters" />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="rounded mt-0.5 flex-shrink-0" required />
                    <span>I agree to Funneling's <Link to="/contact" className="text-primary-600">Terms of Service</Link> and <Link to="/contact" className="text-primary-600">Privacy Policy</Link></span>
                  </label>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                    {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Check className="w-4 h-4" /> Create Free Account</>}
                  </button>
                </div>
              </form>
            )}

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account? <Link to="/login" className="text-primary-600 font-semibold">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
