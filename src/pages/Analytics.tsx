import { TrendingUp, DollarSign, Users, MousePointer, Eye, Bot, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, LabelList
} from 'recharts';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { MOCK_ANALYTICS, MOCK_FUNNELS, AI_RECOMMENDATIONS } from '@/data/mockData';

const TABS = ['Overview', 'Funnel Analytics', 'Revenue', 'Traffic', 'AI Insights', 'A/B Testing'];
const COLORS = ['#7C3AED', '#4F46E5', '#F97316', '#10B981', '#3B82F6'];

const AB_TESTS = [
  { name: 'Hero Headline Test', variantA: 'Get Started Free', variantB: 'Start Your Free Trial', visitorsA: 2450, visitorsB: 2380, cvrA: 12.4, cvrB: 15.8, status: 'running', winner: 'B' },
  { name: 'CTA Button Color', variantA: 'Purple Button', variantB: 'Orange Button', visitorsA: 1890, visitorsB: 1920, cvrA: 8.2, cvrB: 11.4, status: 'completed', winner: 'B' },
  { name: 'Opt-in Form Length', variantA: '7 Fields', variantB: '3 Fields', visitorsA: 3200, visitorsB: 3180, cvrA: 6.8, cvrB: 18.2, status: 'completed', winner: 'B' },
];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('30d');

  const funnelSteps = MOCK_FUNNELS[0].steps.map(s => ({ name: s.name, value: s.visits }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-500 text-sm mt-1">Deep insights into your funnel performance</p>
          </div>
          <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="input-field w-auto py-2 text-sm">
            {['7d', '30d', '90d', '1y'].map(d => <option key={d} value={d}>Last {d}</option>)}
          </select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: '$284,340', change: 18.2, icon: DollarSign, color: 'text-green-600 bg-green-100' },
            { label: 'Total Visitors', value: '124,580', change: 12.4, icon: Eye, color: 'text-blue-600 bg-blue-100' },
            { label: 'Total Leads', value: '18,920', change: 22.1, icon: Users, color: 'text-primary-600 bg-primary-100' },
            { label: 'Avg. CVR', value: '15.2%', change: 3.8, icon: MousePointer, color: 'text-accent-600 bg-accent-100' },
          ].map(({ label, value, change, icon: Icon, color }) => (
            <div key={label} className="dashboard-card">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {change >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}{Math.abs(change)}%
                </span>
              </div>
              <p className="text-2xl font-display font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar bg-gray-100 p-1 rounded-xl w-fit">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="dashboard-card lg:col-span-2">
              <h3 className="font-display font-bold text-gray-900 mb-4">Revenue & Conversions</h3>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={MOCK_ANALYTICS.revenue}>
                  <defs>
                    <linearGradient id="r1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="r2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number, n: string) => [`$${v.toLocaleString()}`, n === 'value' ? 'Revenue' : 'Previous']} />
                  <Area type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={2} fill="url(#r1)" name="value" />
                  <Area type="monotone" dataKey="value2" stroke="#F97316" strokeWidth={1.5} fill="url(#r2)" strokeDasharray="4 2" name="value2" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="dashboard-card">
              <h3 className="font-display font-bold text-gray-900 mb-4">Traffic Sources</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={MOCK_ANALYTICS.traffic} cx="50%" cy="50%" outerRadius={70} dataKey="value">
                    {MOCK_ANALYTICS.traffic.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {MOCK_ANALYTICS.traffic.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-gray-600 flex-1">{d.name}</span>
                    <span className="font-semibold text-gray-900">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Funnel Analytics' && (
          <div className="space-y-6">
            <div className="dashboard-card">
              <h3 className="font-display font-bold text-gray-900 mb-2">Funnel Conversion Flow</h3>
              <p className="text-sm text-gray-500 mb-4">Product Launch Funnel — Step by step breakdown</p>
              <div className="space-y-3">
                {MOCK_FUNNELS[0].steps.map((step, i) => {
                  const prev = i > 0 ? MOCK_FUNNELS[0].steps[i - 1].visits : step.visits;
                  const dropoff = i > 0 ? (((prev - step.visits) / prev) * 100).toFixed(1) : '0';
                  return (
                    <div key={step.id}>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
                        <span className="font-semibold text-sm text-gray-900">{step.name}</span>
                        <span className="ml-auto text-sm font-bold text-gray-900">{step.visits.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">({step.conversionRate}%)</span>
                        {i > 0 && <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">-{dropoff}% drop</span>}
                      </div>
                      <div className="ml-9 bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div className="h-3 rounded-full bg-gradient-brand transition-all" style={{ width: `${(step.visits / MOCK_FUNNELS[0].visits) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="dashboard-card">
                <h3 className="font-semibold text-gray-900 mb-3">Daily Conversions</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={MOCK_ANALYTICS.conversions}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="dashboard-card">
                <h3 className="font-semibold text-gray-900 mb-4">Funnel Performance</h3>
                {MOCK_FUNNELS.filter(f => f.status === 'active').map(f => (
                  <div key={f.id} className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{f.name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">{f.visits.toLocaleString()} visits</span>
                        <span className="text-xs text-green-600">{((f.conversions / Math.max(f.visits, 1)) * 100).toFixed(1)}% CVR</span>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">${f.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Revenue' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: 'MRR', value: '$23,695', trend: '+12%' },
                { label: 'ARR', value: '$284,340', trend: '+18%' },
                { label: 'Avg. Order', value: '$152', trend: '+5%' },
                { label: 'LTV', value: '$1,840', trend: '+22%' },
              ].map(({ label, value, trend }) => (
                <div key={label} className="dashboard-card text-center">
                  <p className="text-2xl font-display font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                  <span className="text-xs text-green-600 font-semibold">{trend} MoM</span>
                </div>
              ))}
            </div>
            <div className="dashboard-card">
              <h3 className="font-display font-bold text-gray-900 mb-4">Monthly Revenue Breakdown</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={MOCK_ANALYTICS.revenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number, n: string) => [`$${v.toLocaleString()}`, n === 'value' ? 'Revenue' : 'Costs']} />
                  <Bar dataKey="value" name="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="value2" name="value2" fill="#E0E0FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'Traffic' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h3 className="font-display font-bold text-gray-900 mb-4">Traffic by Source</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={MOCK_ANALYTICS.traffic} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                    {MOCK_ANALYTICS.traffic.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="dashboard-card">
              <h3 className="font-display font-bold text-gray-900 mb-4">Campaign ROI</h3>
              <div className="space-y-4">
                {[
                  { name: 'Facebook Ads', spend: 4500, revenue: 22500, roas: 5.0 },
                  { name: 'Google Ads', spend: 3200, revenue: 14400, roas: 4.5 },
                  { name: 'Email', spend: 800, revenue: 8900, roas: 11.1 },
                  { name: 'WhatsApp', spend: 200, revenue: 4200, roas: 21.0 },
                ].map(({ name, spend, revenue, roas }) => (
                  <div key={name} className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex justify-between mb-1.5">
                      <span className="font-semibold text-sm text-gray-900">{name}</span>
                      <span className="font-bold text-primary-600">{roas}x ROAS</span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>Spend: ${spend.toLocaleString()}</span>
                      <span>Revenue: ${revenue.toLocaleString()}</span>
                      <span className="text-green-600 font-semibold">+${(revenue - spend).toLocaleString()} profit</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'AI Insights' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary-900 to-secondary-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <Bot className="w-6 h-6 text-accent-300" />
                <h3 className="font-display font-bold text-lg">AI-Powered Recommendations</h3>
              </div>
              <p className="text-white/70 text-sm">Based on your last 30 days of funnel data, our AI identified {AI_RECOMMENDATIONS.length} optimization opportunities with estimated combined impact of +$48,000/mo.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {AI_RECOMMENDATIONS.map(rec => (
                <div key={rec.id} className={`dashboard-card border-l-4 ${rec.priority === 'high' ? 'border-l-red-500' : rec.priority === 'medium' ? 'border-l-amber-500' : 'border-l-blue-500'}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full mr-2 ${rec.priority === 'high' ? 'bg-red-100 text-red-700' : rec.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        {rec.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">{rec.category}</span>
                    </div>
                    <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-0.5 rounded-full">{rec.impact}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{rec.description}</p>
                  <button className="mt-3 text-xs text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1">Apply Recommendation →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'A/B Testing' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{AB_TESTS.length} tests — {AB_TESTS.filter(t => t.status === 'running').length} running</p>
              <button className="btn-primary py-2 px-4 text-sm">+ New A/B Test</button>
            </div>
            {AB_TESTS.map(test => (
              <div key={test.name} className="dashboard-card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display font-bold text-gray-900">{test.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${test.status === 'running' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{test.status}</span>
                  </div>
                  {test.winner && <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">Winner: Variant {test.winner}</span>}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {(['A', 'B'] as const).map(v => {
                    const visitors = v === 'A' ? test.visitorsA : test.visitorsB;
                    const cvr = v === 'A' ? test.cvrA : test.cvrB;
                    const isWinner = test.winner === v;
                    return (
                      <div key={v} className={`p-4 rounded-xl border-2 ${isWinner ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-gray-900">Variant {v}</span>
                          {isWinner && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">WINNER</span>}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{v === 'A' ? test.variantA : test.variantB}</p>
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div>
                            <p className="text-xl font-bold text-gray-900">{visitors.toLocaleString()}</p>
                            <p className="text-xs text-gray-400">Visitors</p>
                          </div>
                          <div>
                            <p className={`text-xl font-bold ${isWinner ? 'text-green-600' : 'text-gray-900'}`}>{cvr}%</p>
                            <p className="text-xs text-gray-400">CVR</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
