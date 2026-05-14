import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, DollarSign, Filter, Shield, TrendingUp, AlertTriangle, Check, X, Search, MoreVertical } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/features/StatsCard';
import { useApp } from '@/contexts/AppContext';
import { MOCK_USERS, MOCK_PAYMENTS, MOCK_ANALYTICS } from '@/data/mockData';
import { toast } from 'sonner';

const USER_GROWTH = [
  { name: 'Jan', users: 8200 }, { name: 'Feb', users: 9800 }, { name: 'Mar', users: 11400 },
  { name: 'Apr', users: 14200 }, { name: 'May', users: 18600 }, { name: 'Jun', users: 22400 },
  { name: 'Jul', users: 28900 }, { name: 'Aug', users: 34500 }, { name: 'Sep', users: 39200 },
  { name: 'Oct', users: 44800 }, { name: 'Nov', users: 48300 }, { name: 'Dec', users: 52100 },
];

const WORKSPACE_TABS = ['Overview', 'Users', 'Subscriptions', 'Funnels', 'Revenue'];

export default function AdminDashboard() {
  const { funnels, leads, campaigns } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchUser, setSearchUser] = useState('');
  const [userList, setUserList] = useState(MOCK_USERS);

  const totalRevenue = MOCK_PAYMENTS.filter(p => p.status === 'success').reduce((s, p) => s + p.amount, 0);
  const activeUsers = userList.filter(u => u.role !== 'admin').length;

  const handleSuspendUser = (id: string) => {
    toast.success('User suspended (demo)');
    console.log('Suspend user', id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-primary-600" />
              <h1 className="text-2xl font-display font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <p className="text-gray-500 text-sm">Full platform oversight and management</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge-success">System Healthy</span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Users" value={52100} change={14.2} icon={Users} iconColor="text-primary-600" iconBg="bg-primary-100" />
          <StatsCard title="Platform Revenue" value={`$${totalRevenue.toLocaleString()}`} change={22.8} icon={DollarSign} iconColor="text-green-600" iconBg="bg-green-100" />
          <StatsCard title="Active Funnels" value={funnels.filter(f => f.status === 'active').length} change={8.4} icon={Filter} iconColor="text-blue-600" iconBg="bg-blue-100" />
          <StatsCard title="Active Campaigns" value={campaigns.filter(c => c.status === 'active').length} change={5.6} icon={TrendingUp} iconColor="text-accent-600" iconBg="bg-accent-100" />
        </div>

        {/* Platform Health */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'API Response Time', value: '124ms', status: 'good', icon: '⚡' },
            { label: 'Server Uptime', value: '99.98%', status: 'good', icon: '🟢' },
            { label: 'Failed Payments', value: '1.2%', status: 'warn', icon: '⚠️' },
          ].map(({ label, value, status, icon }) => (
            <div key={label} className={`dashboard-card flex items-center gap-4 ${status === 'warn' ? 'border-amber-200' : ''}`}>
              <div className="text-2xl">{icon}</div>
              <div>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="dashboard-card">
          <div className="flex gap-1 mb-6 overflow-x-auto no-scrollbar">
            {WORKSPACE_TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-primary-500 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Overview' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">User Growth</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={USER_GROWTH}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => [v.toLocaleString(), 'Users']} />
                    <Line type="monotone" dataKey="users" stroke="#7C3AED" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Revenue by Month</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={MOCK_ANALYTICS.revenue.slice(-6)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
                    <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'Users' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1 max-w-xs">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={searchUser} onChange={e => setSearchUser(e.target.value)} className="input-field pl-9 py-2 text-sm" placeholder="Search users..." />
                </div>
              </div>
              <div className="space-y-2">
                {userList.filter(u => u.name.toLowerCase().includes(searchUser.toLowerCase()) || u.email.includes(searchUser)).map(u => (
                  <div key={u.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                    <span className="badge-purple capitalize">{u.role.replace('_', ' ')}</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${u.plan === 'enterprise' ? 'bg-yellow-100 text-yellow-700' : u.plan === 'pro' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'}`}>{u.plan}</span>
                    <button onClick={() => handleSuspendUser(u.id)} className="p-1.5 hover:bg-red-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Subscriptions' && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { plan: 'Starter', count: 18200, color: 'bg-gray-100' },
                  { plan: 'Pro', count: 28400, color: 'bg-primary-100' },
                  { plan: 'Enterprise', count: 5500, color: 'bg-yellow-100' },
                ].map(({ plan, count, color }) => (
                  <div key={plan} className={`${color} rounded-xl p-4 text-center`}>
                    <p className="text-2xl font-bold text-gray-900">{count.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{plan} Users</p>
                  </div>
                ))}
              </div>
              {MOCK_PAYMENTS.map(p => (
                <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${p.status === 'success' ? 'bg-green-100' : p.status === 'failed' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                    {p.status === 'success' ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{p.plan}</p>
                    <p className="text-xs text-gray-500">{p.createdAt}</p>
                  </div>
                  <span className={`font-bold ${p.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>${p.amount}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.status === 'success' ? 'bg-green-100 text-green-700' : p.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Funnels' && (
            <div className="space-y-2">
              {funnels.map(f => (
                <div key={f.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Filter className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{f.name}</p>
                    <p className="text-xs text-gray-500">{f.visits.toLocaleString()} visits · User ID: {f.userId}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${f.status === 'active' ? 'bg-green-100 text-green-700' : f.status === 'draft' ? 'bg-gray-100 text-gray-600' : 'bg-amber-100 text-amber-700'}`}>{f.status}</span>
                  <span className="font-bold text-sm text-gray-900">${f.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Revenue' && (
            <div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'MRR', value: '$2.4M' },
                  { label: 'ARR', value: '$28.8M' },
                  { label: 'Churn Rate', value: '2.1%' },
                  { label: 'LTV', value: '$4,280' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-xl font-bold text-gray-900">{value}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={MOCK_ANALYTICS.revenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`]} />
                  <Bar dataKey="value" name="Revenue" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="value2" name="Expenses" fill="#E0E0FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card">
          <h3 className="font-display font-bold text-gray-900 mb-4">Recent Platform Activity</h3>
          <div className="space-y-3">
            {[
              { icon: '👤', text: 'New user registered: amanda@marketing.co', time: '2 min ago', type: 'user' },
              { icon: '⚡', text: 'Funnel published: "Product Launch" by Alex Johnson', time: '5 min ago', type: 'funnel' },
              { icon: '💰', text: 'Payment received: $997 — Pro Annual from u1', time: '12 min ago', type: 'payment' },
              { icon: '⚠️', text: 'High traffic alert: Funnel "Lead Gen" — 1,200 visits/hr', time: '18 min ago', type: 'alert' },
              { icon: '📧', text: 'Campaign launched: "Spring Email" — 12,500 recipients', time: '25 min ago', type: 'campaign' },
            ].map(({ icon, text, time, type }) => (
              <div key={text} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="text-xl">{icon}</div>
                <p className="flex-1 text-sm text-gray-700">{text}</p>
                <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
