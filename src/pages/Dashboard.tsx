import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import {
  Bell,
  CheckSquare,
  ClipboardList,
  DollarSign,
  FileCode,
  Filter,
  Megaphone,
  MousePointer,
  Plus,
  TrendingUp,
  UserPlus,
  Users,
  Eye,
  Zap,
  ArrowRight
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/features/StatsCard';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { MOCK_ANALYTICS } from '@/data/mockData';

export default function Dashboard() {
  const { user } = useAuth();
  const { funnels, leads, campaigns } = useApp();

  const totalRevenue = funnels.reduce((s, f) => s + f.revenue, 0);
  const totalVisits = funnels.reduce((s, f) => s + f.visits, 0);
  const totalConversions = funnels.reduce((s, f) => s + f.conversions, 0);
  const avgConversionRate = totalVisits > 0 ? ((totalConversions / totalVisits) * 100).toFixed(1) : '0';
  const newLeads = leads.filter(l => l.status === 'new').length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const isSales = user?.role === 'sales';

  const quickActions = isSales
    ? [
      { label: 'Add Lead', href: '/crm', icon: UserPlus, color: 'bg-blue-50 hover:bg-blue-100 text-blue-600' },
      { label: 'Pipeline', href: '/crm', icon: ClipboardList, color: 'bg-primary-50 hover:bg-primary-100 text-primary-600' },
      { label: 'Follow Up', href: '/crm', icon: Bell, color: 'bg-green-50 hover:bg-green-100 text-green-600' },
      { label: 'Tasks', href: '/notifications', icon: CheckSquare, color: 'bg-orange-50 hover:bg-orange-100 text-orange-600' },
    ]
    : [
      { label: 'New Funnel', href: '/funnel-builder', icon: Zap, color: 'bg-primary-50 hover:bg-primary-100 text-primary-600' },
      { label: 'Add Lead', href: '/crm', icon: UserPlus, color: 'bg-blue-50 hover:bg-blue-100 text-blue-600' },
      { label: 'Campaign', href: '/campaigns', icon: Megaphone, color: 'bg-green-50 hover:bg-green-100 text-green-600' },
      { label: 'Analytics', href: '/analytics', icon: TrendingUp, color: 'bg-purple-50 hover:bg-purple-100 text-purple-600' },
      { label: 'Landing Page', href: '/landing-builder', icon: FileCode, color: 'bg-orange-50 hover:bg-orange-100 text-orange-600' },
      { label: 'Affiliate', href: '/affiliate', icon: DollarSign, color: 'bg-teal-50 hover:bg-teal-100 text-teal-600' },
    ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">
              Welcome back, {user?.name?.split(' ')[0]}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {isSales ? 'Here are your assigned leads, pipeline, and follow-up priorities.' : "Here's what's happening with your business today"}
            </p>
          </div>
          {isSales ? (
            <Link to="/crm" className="btn-primary">
              <Plus className="w-4 h-4" /> Add Lead
            </Link>
          ) : (
            <Link to="/funnel-builder" className="btn-primary">
              <Plus className="w-4 h-4" /> New Funnel
            </Link>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isSales ? (
            <>
              <StatsCard title="Assigned Leads" value={leads.length} change={8.2} icon={Users} iconColor="text-blue-600" iconBg="bg-blue-100" />
              <StatsCard title="New Leads" value={newLeads} change={12.4} icon={UserPlus} iconColor="text-primary-600" iconBg="bg-primary-100" />
              <StatsCard title="Qualified Pipeline" value={leads.filter(l => l.status === 'qualified' || l.status === 'proposal').length} change={6.1} icon={ClipboardList} iconColor="text-green-600" iconBg="bg-green-100" />
              <StatsCard title="Follow-ups Due" value={leads.filter(l => l.status === 'contacted').length} change={3.5} icon={Bell} iconColor="text-accent-600" iconBg="bg-accent-100" />
            </>
          ) : (
            <>
              <StatsCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} change={18.2} icon={DollarSign} iconColor="text-green-600" iconBg="bg-green-100" />
              <StatsCard title="Total Visits" value={totalVisits} change={12.4} icon={Eye} iconColor="text-blue-600" iconBg="bg-blue-100" />
              <StatsCard title="Conversions" value={totalConversions} change={9.1} icon={MousePointer} iconColor="text-primary-600" iconBg="bg-primary-100" />
              <StatsCard title="Conversion Rate" value={`${avgConversionRate}%`} change={3.5} icon={TrendingUp} iconColor="text-accent-600" iconBg="bg-accent-100" />
            </>
          )}
        </div>

        {isSales ? (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-gray-900">Pipeline Focus</h3>
                <Link to="/crm" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                  Open CRM <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {leads.filter(lead => ['new', 'contacted', 'qualified', 'proposal'].includes(lead.status)).slice(0, 6).map(lead => (
                  <div key={lead.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {lead.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.company || lead.email}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 capitalize">
                      {lead.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="font-display font-bold text-gray-900 mb-4">Follow-up Queue</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Contacted', value: leads.filter(l => l.status === 'contacted').length, icon: Bell },
                  { label: 'Qualified', value: leads.filter(l => l.status === 'qualified').length, icon: CheckSquare },
                  { label: 'Proposals', value: leads.filter(l => l.status === 'proposal').length, icon: ClipboardList },
                  { label: 'Closed Won', value: leads.filter(l => l.status === 'closed_won').length, icon: TrendingUp },
                ].map(({ label, value, icon: Icon }) => (
                  <Link key={label} to="/crm" className="bg-gray-50 rounded-xl p-4 hover:bg-primary-50 transition-colors">
                    <Icon className="w-5 h-5 text-primary-600 mb-3" />
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
        {/* Secondary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="dashboard-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Filter className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{funnels.filter(f => f.status === 'active').length}</p>
                <p className="text-xs text-gray-500">Active Funnels</p>
              </div>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{newLeads}</p>
                <p className="text-xs text-gray-500">New Leads Today</p>
              </div>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeCampaigns}</p>
                <p className="text-xs text-gray-500">Active Campaigns</p>
              </div>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${(totalRevenue / Math.max(totalConversions, 1)).toFixed(0)}</p>
                <p className="text-xs text-gray-500">Avg. Order Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="dashboard-card lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-gray-900">Revenue Overview</h3>
              <select className="text-xs border border-gray-200 rounded-lg px-2 py-1">
                <option>Last 12 months</option>
                <option>Last 6 months</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={MOCK_ANALYTICS.revenue} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="dashboard-card">
            <h3 className="font-display font-bold text-gray-900 mb-4">Weekly Conversions</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MOCK_ANALYTICS.conversions} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip />
                <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Funnels + Recent Leads */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-gray-900">Active Funnels</h3>
              <Link to="/funnel-builder" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {funnels.filter(f => f.status === 'active').slice(0, 4).map(funnel => (
                <div key={funnel.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors">
                  <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Filter className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{funnel.name}</p>
                    <p className="text-xs text-gray-500">{funnel.visits.toLocaleString()} visits</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">${funnel.revenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">{((funnel.conversions / Math.max(funnel.visits, 1)) * 100).toFixed(1)}% CVR</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-gray-900">Recent Leads</h3>
              <Link to="/crm" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View CRM <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {leads.slice(0, 5).map(lead => (
                <div key={lead.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {lead.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.source}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        lead.status === 'qualified' ? 'bg-green-100 text-green-700' :
                          lead.status === 'proposal' ? 'bg-purple-100 text-purple-700' :
                            lead.status === 'closed_won' ? 'bg-teal-100 text-teal-700' :
                              'bg-gray-100 text-gray-700'
                      }`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-semibold text-primary-600">Score: {lead.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="dashboard-card">
          <h3 className="font-display font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {quickActions.map(({ label, href, icon: Icon, color }) => (
              <Link key={label} to={href} className={`${color} rounded-xl p-4 text-center transition-colors cursor-pointer`}>
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-700">{label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
