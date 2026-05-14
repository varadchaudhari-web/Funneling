import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Play, Pause, Trash2, Mail, MessageSquare, Phone, TrendingUp, Send } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import type { Campaign } from '@/types';
import { toast } from 'sonner';

const TYPE_ICONS: Record<string, React.ReactNode> = {
  email: <Mail className="w-4 h-4" />,
  sms: <Phone className="w-4 h-4" />,
  whatsapp: <MessageSquare className="w-4 h-4" />,
  ads: <TrendingUp className="w-4 h-4" />,
};
const TYPE_COLORS: Record<string, string> = {
  email: 'bg-blue-100 text-blue-700',
  sms: 'bg-green-100 text-green-700',
  whatsapp: 'bg-teal-100 text-teal-700',
  ads: 'bg-orange-100 text-orange-700',
};

const DRIP_STEPS = [
  { day: 0, subject: 'Welcome! Your Free Guide Is Here', type: 'email', opens: '62%' },
  { day: 1, subject: 'Quick question for you...', type: 'email', opens: '48%' },
  { day: 3, subject: '🎁 Special bonus just for you', type: 'whatsapp', opens: '71%' },
  { day: 5, subject: 'Your free trial expires in 2 days', type: 'sms', opens: '89%' },
  { day: 7, subject: 'Last chance to upgrade at 40% off', type: 'email', opens: '55%' },
];

export default function CampaignManager() {
  const { campaigns, addCampaign, updateCampaign } = useApp();
  const [view, setView] = useState<'list' | 'create' | 'drip'>('list');
  const [activeType, setActiveType] = useState('all');
  const [form, setForm] = useState({ name: '', type: 'email' as Campaign['type'], subject: '', content: '' });

  const filtered = campaigns.filter(c => activeType === 'all' || c.type === activeType);

  const handleCreate = () => {
    if (!form.name) { toast.error('Campaign name required'); return; }
    addCampaign({ name: form.name, type: form.type, status: 'draft', sent: 0, opened: 0, clicked: 0, converted: 0, revenue: 0 });
    setForm({ name: '', type: 'email', subject: '', content: '' });
    setView('list');
    toast.success(`Campaign "${form.name}" created!`);
  };

  const handleToggle = (id: string, status: Campaign['status']) => {
    const newStatus = status === 'active' ? 'paused' : 'active';
    updateCampaign(id, { status: newStatus });
    toast.success(`Campaign ${newStatus === 'active' ? 'activated' : 'paused'}!`);
  };

  const perfData = campaigns.slice(0, 5).map(c => ({
    name: c.name.substring(0, 12) + (c.name.length > 12 ? '...' : ''),
    openRate: c.sent > 0 ? Math.round((c.opened / c.sent) * 100) : 0,
    clickRate: c.sent > 0 ? Math.round((c.clicked / c.sent) * 100) : 0,
    revenue: c.revenue,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">Campaign Manager</h1>
            <p className="text-gray-500 text-sm mt-1">{campaigns.filter(c => c.status === 'active').length} active campaigns running</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView('drip')} className="btn-outline py-2 px-4 text-sm">Drip Builder</button>
            <button onClick={() => setView('create')} className="btn-primary py-2 px-4 text-sm">
              <Plus className="w-4 h-4" /> New Campaign
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Emails Sent', value: campaigns.reduce((s, c) => s + c.sent, 0).toLocaleString(), icon: '📧' },
            { label: 'Total Opens', value: campaigns.reduce((s, c) => s + c.opened, 0).toLocaleString(), icon: '👀' },
            { label: 'Total Clicks', value: campaigns.reduce((s, c) => s + c.clicked, 0).toLocaleString(), icon: '🖱️' },
            { label: 'Campaign Revenue', value: `$${campaigns.reduce((s, c) => s + c.revenue, 0).toLocaleString()}`, icon: '💰' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="dashboard-card flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {view === 'create' && (
          <div className="dashboard-card max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-gray-900">Create Campaign</h2>
              <button onClick={() => setView('list')} className="btn-ghost text-sm">Cancel</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Spring Email Blast" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['email', 'sms', 'whatsapp', 'ads'] as Campaign['type'][]).map(t => (
                    <button key={t} onClick={() => setForm({ ...form, type: t })} className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-semibold capitalize ${form.type === t ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                      <span className="text-xl">{t === 'email' ? '📧' : t === 'sms' ? '📱' : t === 'whatsapp' ? '💬' : '📊'}</span>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject Line</label>
                <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-field" placeholder="🚀 Your exclusive offer expires tonight..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message / Content</label>
                <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={4} className="input-field resize-none" placeholder="Hi {first_name}, I have something special for you..." />
              </div>
              <div className="flex gap-3">
                <button onClick={handleCreate} className="btn-primary">
                  <Send className="w-4 h-4" /> Save Campaign
                </button>
                <button onClick={() => { handleCreate(); toast.success('Campaign scheduled!'); }} className="btn-outline">
                  Schedule Send
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'drip' && (
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-bold text-gray-900">Drip Campaign Builder</h2>
                <p className="text-sm text-gray-500">Automated sequence — triggered on lead opt-in</p>
              </div>
              <button onClick={() => setView('list')} className="btn-ghost text-sm">Back to List</button>
            </div>
            <div className="relative">
              {DRIP_STEPS.map((step, i) => (
                <div key={i} className="flex gap-4 mb-4 relative">
                  {i < DRIP_STEPS.length - 1 && <div className="absolute left-5 top-10 w-0.5 h-8 bg-gray-200 z-0" />}
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0 z-10">
                    {i + 1}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">Day {step.day}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_COLORS[step.type]}`}>{step.type}</span>
                      </div>
                      <p className="font-semibold text-sm text-gray-900">{step.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{step.opens}</p>
                      <p className="text-xs text-gray-400">avg open rate</p>
                    </div>
                    <button className="p-1.5 hover:bg-primary-100 rounded-lg transition-colors">
                      <TrendingUp className="w-4 h-4 text-primary-600" />
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => toast.success('Step added to drip sequence!')} className="flex items-center gap-2 py-2.5 px-4 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-primary-400 hover:text-primary-600 transition-colors mt-2 w-full justify-center">
                <Plus className="w-4 h-4" /> Add Sequence Step
              </button>
            </div>
            <div className="flex justify-end mt-4 gap-3">
              <button className="btn-outline">Save Draft</button>
              <button onClick={() => toast.success('Drip sequence activated!')} className="btn-primary">
                <Play className="w-4 h-4" /> Activate Sequence
              </button>
            </div>
          </div>
        )}

        {view === 'list' && (
          <>
            {/* Filter */}
            <div className="flex gap-2 flex-wrap">
              {['all', 'email', 'sms', 'whatsapp', 'ads'].map(t => (
                <button key={t} onClick={() => setActiveType(t)} className={`px-3 py-1.5 rounded-xl text-sm font-semibold capitalize transition-all ${activeType === t ? 'bg-primary-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'}`}>
                  {t === 'all' ? 'All Campaigns' : t}
                </button>
              ))}
            </div>

            {/* Performance Chart */}
            <div className="dashboard-card">
              <h3 className="font-display font-bold text-gray-900 mb-4">Campaign Performance</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={perfData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="openRate" name="Open Rate %" fill="#7C3AED" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="clickRate" name="Click Rate %" fill="#F97316" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Campaign List */}
            <div className="space-y-3">
              {filtered.map(c => (
                <div key={c.id} className="dashboard-card hover:shadow-card-hover transition-all">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${TYPE_COLORS[c.type]}`}>
                      {TYPE_ICONS[c.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-gray-900 truncate">{c.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.status === 'active' ? 'bg-green-100 text-green-700' : c.status === 'completed' ? 'bg-blue-100 text-blue-700' : c.status === 'draft' ? 'bg-gray-100 text-gray-500' : 'bg-amber-100 text-amber-700'}`}>
                          {c.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 capitalize">{c.type} campaign · {c.createdAt}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      {[
                        { label: 'Sent', value: c.sent.toLocaleString() },
                        { label: 'Open Rate', value: c.sent > 0 ? `${Math.round((c.opened / c.sent) * 100)}%` : '—' },
                        { label: 'Click Rate', value: c.sent > 0 ? `${Math.round((c.clicked / c.sent) * 100)}%` : '—' },
                        { label: 'Revenue', value: `$${c.revenue.toLocaleString()}` },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-sm font-bold text-gray-900">{value}</p>
                          <p className="text-xs text-gray-400">{label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleToggle(c.id, c.status)} className={`p-2 rounded-xl transition-colors ${c.status === 'active' ? 'hover:bg-amber-100 text-amber-600' : 'hover:bg-green-100 text-green-600'}`}>
                        {c.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
