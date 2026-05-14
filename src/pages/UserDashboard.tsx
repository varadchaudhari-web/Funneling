import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { Filter, TrendingUp, DollarSign, Users, Zap, ArrowRight, Star, Trophy } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { MOCK_AFFILIATE, AI_RECOMMENDATIONS } from '@/data/mockData';

const TRAFFIC_COLORS = ['#7C3AED', '#4F46E5', '#F97316', '#10B981', '#3B82F6'];

export default function UserDashboard() {
  const { user } = useAuth();
  const { funnels, leads, campaigns } = useApp();

  const userFunnels = funnels.filter(f => f.userId === user?.id || true).slice(0, 3);
  const totalRevenue = userFunnels.reduce((s, f) => s + f.revenue, 0);
  const qualifiedLeads = leads.filter(l => l.status === 'qualified' || l.status === 'proposal').length;

  const trafficData = [
    { name: 'Organic', value: 35 },
    { name: 'Facebook', value: 28 },
    { name: 'Google', value: 22 },
    { name: 'Email', value: 10 },
    { name: 'Referral', value: 5 },
  ];

  const goalsData = [
    { name: 'Revenue', value: 72, fill: '#7C3AED' },
    { name: 'Leads', value: 85, fill: '#4F46E5' },
    { name: 'Conversions', value: 61, fill: '#F97316' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">My Dashboard</p>
              <h1 className="text-2xl font-display font-bold mb-2">{user?.name}</h1>
              <div className="flex items-center gap-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm capitalize">{user?.plan} Plan</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm capitalize">{user?.role?.replace('_', ' ')}</span>
              </div>
            </div>
            <img src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=fff&color=7C3AED`} alt={user?.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="dashboard-card text-center">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-5 h-5 text-primary-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total Revenue</p>
          </div>
          <div className="dashboard-card text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
            <p className="text-xs text-gray-500">Total Leads</p>
          </div>
          <div className="dashboard-card text-center">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Filter className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{funnels.filter(f => f.status === 'active').length}</p>
            <p className="text-xs text-gray-500">Active Funnels</p>
          </div>
          <div className="dashboard-card text-center">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{MOCK_AFFILIATE.earnings.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Affiliate Earnings</p>
          </div>
        </div>

        {/* Charts + Goals */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="dashboard-card">
            <h3 className="font-display font-bold text-gray-900 mb-4">Traffic Sources</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={trafficData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                  {trafficData.map((_, i) => <Cell key={i} fill={TRAFFIC_COLORS[i % TRAFFIC_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {trafficData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: TRAFFIC_COLORS[i] }} />
                  <span className="text-gray-600">{d.name}</span>
                  <span className="font-semibold ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="font-display font-bold text-gray-900 mb-4">Monthly Goals</h3>
            <ResponsiveContainer width="100%" height={160}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={goalsData}>
                <RadialBar dataKey="value" cornerRadius={4} />
                <Tooltip formatter={(v) => [`${v}%`, '']} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {goalsData.map(g => (
                <div key={g.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ background: g.fill }} />
                  <span className="text-gray-600 flex-1">{g.name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${g.value}%`, background: g.fill }} />
                  </div>
                  <span className="font-bold text-gray-900">{g.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="font-display font-bold text-gray-900 mb-4">Achievements</h3>
            <div className="space-y-3">
              {[
                { icon: '🏆', title: 'First Funnel', desc: 'Created your first funnel', done: true },
                { icon: '💰', title: '$10K Revenue', desc: 'Crossed $10,000 in sales', done: true },
                { icon: '👥', title: '100 Leads', desc: 'Captured 100 leads', done: true },
                { icon: '⚡', title: 'Campaign Pro', desc: 'Launched 5 campaigns', done: false },
                { icon: '🌟', title: 'Top Converter', desc: '25%+ conversion rate', done: false },
              ].map(({ icon, title, desc, done }) => (
                <div key={title} className={`flex items-center gap-3 p-2.5 rounded-xl ${done ? 'bg-green-50' : 'bg-gray-50 opacity-60'}`}>
                  <div className="text-xl">{icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                  {done && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-600" />
            </div>
            <h3 className="font-display font-bold text-gray-900">AI Recommendations For You</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {AI_RECOMMENDATIONS.slice(0, 3).map(rec => (
              <div key={rec.id} className={`p-4 rounded-xl border-2 ${rec.priority === 'high' ? 'border-red-200 bg-red-50' : rec.priority === 'medium' ? 'border-amber-200 bg-amber-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rec.priority === 'high' ? 'bg-red-100 text-red-700' : rec.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                    {rec.priority.toUpperCase()}
                  </span>
                  <span className="text-green-600 font-bold text-sm">{rec.impact}</span>
                </div>
                <p className="font-semibold text-sm text-gray-900 mb-1">{rec.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{rec.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/analytics" className="text-sm text-primary-600 font-semibold hover:text-primary-700 flex items-center justify-center gap-1">
              View All Recommendations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* My Funnels Quick View */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-900">My Funnels</h3>
            <Link to="/funnel-builder" className="text-sm text-primary-600 font-semibold flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {userFunnels.map(f => (
              <div key={f.id} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm text-gray-900 truncate flex-1 mr-2">{f.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${f.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{f.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-white rounded-lg p-2">
                    <p className="font-bold text-gray-900 text-sm">{f.visits.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Visits</p>
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <p className="font-bold text-green-600 text-sm">${f.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Revenue</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
