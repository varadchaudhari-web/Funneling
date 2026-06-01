import { Download, Copy, Share2, DollarSign, Users, TrendingUp, Gift, ArrowRight, Check } from "lucide-react";
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { MOCK_AFFILIATE } from '@/data/mockData';
import { toast } from 'sonner';

const EARNINGS_DATA = [
  { month: 'Jan', earnings: 180 }, { month: 'Feb', earnings: 240 }, { month: 'Mar', earnings: 190 },
  { month: 'Apr', earnings: 320 }, { month: 'May', earnings: 410 }, { month: 'Jun', earnings: 380 },
  { month: 'Jul', earnings: 520 }, { month: 'Aug', earnings: 490 }, { month: 'Sep', earnings: 610 },
  { month: 'Oct', earnings: 580 }, { month: 'Nov', earnings: 720 }, { month: 'Dec', earnings: 810 },
];

const REFERRALS = [
  { name: 'Mike Thompson', email: 'mike@co.com', plan: 'Pro', commission: 197 * 0.3, date: '2024-04-28', status: 'active' },
  { name: 'Clara Chen', email: 'clara@startup.io', plan: 'Enterprise', commission: 497 * 0.3, date: '2024-04-22', status: 'active' },
  { name: 'Bryan Lee', email: 'bryan@biz.net', plan: 'Starter', commission: 97 * 0.3, date: '2024-04-15', status: 'active' },
  { name: 'Nadia Park', email: 'nadia@freelance.io', plan: 'Pro', commission: 197 * 0.3, date: '2024-04-10', status: 'pending' },
  { name: 'Sam Rivera', email: 'sam@agency.co', plan: 'Enterprise', commission: 497 * 0.3, date: '2024-04-05', status: 'active' },
];

const TIERS = [
  { name: 'Bronze', min: 0, max: 5, commission: '20%', color: 'bg-amber-100 text-amber-700' },
  { name: 'Silver', min: 6, max: 15, commission: '25%', color: 'bg-gray-100 text-gray-700' },
  { name: 'Gold', min: 16, max: 30, commission: '30%', color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Platinum', min: 31, max: 999, commission: '40%', color: 'bg-purple-100 text-purple-700' },
];

export default function AffiliateDashboard() {
  const [copied, setCopied] = useState(false);
  const referralUrl = `https://funneling.io/ref/${MOCK_AFFILIATE.referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralUrl).catch(() => {});
    setCopied(true);
    toast.success('Referral link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTier = TIERS.find(t => MOCK_AFFILIATE.referrals >= t.min && MOCK_AFFILIATE.referrals <= t.max) || TIERS[2];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">Affiliate Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Earn up to 40% recurring commission on every referral</p>
          </div>
          <span className={`text-sm font-bold px-4 py-2 rounded-full ${currentTier.color}`}>
             {currentTier.name} Tier — {currentTier.commission} commission
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Earnings', value: `$${MOCK_AFFILIATE.earnings.toLocaleString()}`, icon: DollarSign, color: 'bg-green-100 text-green-600', change: '+12%' },
            { label: 'Pending Payout', value: `$${MOCK_AFFILIATE.pendingPayout.toLocaleString()}`, icon: Gift, color: 'bg-yellow-100 text-yellow-600', change: '' },
            { label: 'Total Referrals', value: MOCK_AFFILIATE.referrals, icon: Users, color: 'bg-blue-100 text-blue-600', change: '+3 this month' },
            { label: 'Link Clicks', value: MOCK_AFFILIATE.clicks, icon: TrendingUp, color: 'bg-primary-100 text-primary-600', change: '2.7% CVR' },
          ].map(({ label, value, icon: Icon, color, change }) => (
            <div key={label} className="dashboard-card">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-display font-bold text-gray-900">{typeof value === 'number' ? value.toLocaleString() : value}</p>
              <p className="text-xs text-gray-500">{label}</p>
              {change && <p className="text-xs text-green-600 font-medium mt-0.5">{change}</p>}
            </div>
          ))}
        </div>

        {/* Referral Link */}
        <div className="bg-gradient-to-r from-primary-900 to-secondary-900 rounded-2xl p-6 text-white">
          <h3 className="font-display font-bold text-lg mb-2">Your Referral Link</h3>
          <p className="text-white/70 text-sm mb-4">Share this link and earn {currentTier.commission} recurring commission on every sale</p>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 font-mono text-sm truncate border border-white/20">
              {referralUrl}
            </div>
            <button onClick={copyLink} className="btn-accent py-3 px-5 text-sm">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="flex gap-3 mt-4">
            {['Share on Twitter', 'Share on LinkedIn', 'Share via Email'].map(s => (
              <button key={s} onClick={() => toast.success(`${s} clicked!`)} className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 text-xs font-medium transition-colors">
                <Share2 className="w-3 h-3" /> {s.replace('Share on ', '').replace('Share via ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-gray-900">Earnings History</h3>
            <span className="text-sm text-gray-500">12-month total: <strong className="text-gray-900">$5,450</strong></span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={EARNINGS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} />
              <Tooltip formatter={(v: number) => [`$${v}`, 'Earnings']} />
              <Line type="monotone" dataKey="earnings" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4, fill: '#7C3AED' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Commission Tiers */}
          <div className="dashboard-card">
            <h3 className="font-display font-bold text-gray-900 mb-4">Commission Tiers</h3>
            <div className="space-y-3">
              {TIERS.map(tier => {
                const isCurrent = tier.name === currentTier.name;
                return (
                  <div key={tier.name} className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${isCurrent ? 'border-primary-400 bg-primary-50' : 'border-gray-100 bg-gray-50'}`}>
                    {isCurrent && <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />}
                    <span className={`font-bold text-sm px-2 py-0.5 rounded-full ${tier.color}`}>{tier.name}</span>
                    <span className="text-sm text-gray-600 flex-1">{tier.min}–{tier.max === 999 ? '∞' : tier.max} referrals</span>
                    <span className="font-bold text-primary-600">{tier.commission}</span>
                    {isCurrent && <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">Current</span>}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-3">You have {MOCK_AFFILIATE.referrals} referrals. {TIERS[3].min - MOCK_AFFILIATE.referrals} more for Platinum tier!</p>
            <div className="bg-gray-100 rounded-full h-2 mt-2">
              <div className="bg-gradient-brand h-2 rounded-full" style={{ width: `${Math.min((MOCK_AFFILIATE.referrals / TIERS[3].min) * 100, 100)}%` }} />
            </div>
          </div>

          {/* Recent Referrals */}
          <div className="dashboard-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-gray-900">Recent Referrals</h3>
              <button onClick={() => toast.success('Payout of $860 requested!')} className="btn-primary text-sm py-1.5 px-3">
                Request Payout
              </button>
            </div>
            <div className="space-y-2">
              {REFERRALS.map(r => (
                <div key={r.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center text-white text-xs font-bold">{r.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.plan} · {r.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-sm">+${r.commission.toFixed(0)}/mo</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marketing Assets */}
        <div className="dashboard-card">
          <h3 className="font-display font-bold text-gray-900 mb-4">Marketing Assets</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Banner 728x90', type: 'Banner Ad', size: '728 × 90 px' },
              { name: 'Square Post', type: 'Social Media', size: '1080 × 1080 px' },
              { name: 'Email Template', type: 'Email', size: 'HTML Template' },
              { name: 'Video Ad Script', type: 'Script', size: 'PDF Document' },
              { name: 'Case Study', type: 'PDF', size: '12-page PDF' },
              { name: 'Swipe Copy', type: 'Copywriting', size: '25 email swipes' },
            ].map(({ name, type, size }) => (
              <div key={name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center text-sm"><Download className="w-4 h-4 text-primary-600" /></div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{type} · {size}</p>
                </div>
                <button onClick={() => toast.success(`${name} downloaded!`)} className="text-xs text-primary-600 font-medium hover:text-primary-700">Download</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
