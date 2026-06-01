import { User, DollarSign, Mail, Settings, Bell, Users, Megaphone, Check, CheckCheck, Filter } from "lucide-react";
import { useState } from 'react';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useApp } from '@/contexts/AppContext';

const TYPE_ICONS: Record<string, React.ReactNode> = {
  lead: <Users className="w-4 h-4 text-blue-600" />,
  sale: <DollarSign className="w-4 h-4 text-green-600" />,
  campaign: <Megaphone className="w-4 h-4 text-orange-600" />,
  system: <Settings className="w-4 h-4 text-gray-600" />,
  affiliate: <DollarSign className="w-4 h-4 text-purple-600" />,
};
const TYPE_BG: Record<string, string> = {
  lead: 'bg-blue-100',
  sale: 'bg-green-100',
  campaign: 'bg-orange-100',
  system: 'bg-gray-100',
  affiliate: 'bg-purple-100',
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function NotificationCenter() {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp();
  const [filter, setFilter] = useState('all');

  const filtered = notifications.filter(n => filter === 'all' || n.type === filter || (filter === 'unread' && !n.read));

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">Notification Center</h1>
            <p className="text-gray-500 text-sm mt-1">{unreadCount} unread notifications</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="btn-outline py-2 px-4 text-sm">
              <CheckCheck className="w-4 h-4" /> Mark All Read
            </button>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Lead Alerts', count: notifications.filter(n => n.type === 'lead').length, icon: User, color: 'bg-blue-50' },
            { label: 'Sales Alerts', count: notifications.filter(n => n.type === 'sale').length, icon: DollarSign, color: 'bg-green-50' },
            { label: 'Campaign', count: notifications.filter(n => n.type === 'campaign').length, icon: Mail, color: 'bg-orange-50' },
            { label: 'System', count: notifications.filter(n => n.type === 'system').length, icon: Settings, color: 'bg-gray-50' },
          ].map(({ label, count, icon: Icon, color }) => (
            <div key={label} className={`${color} rounded-xl p-4 text-center`}>
              <Icon className="w-6 h-6 mx-auto mb-2 text-primary-600" />
              <p className="text-xl font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'unread', 'lead', 'sale', 'campaign', 'system', 'affiliate'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-primary-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No notifications found</p>
            </div>
          )}
          {filtered.map(n => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${n.read ? 'bg-white border-gray-100 opacity-75' : 'bg-primary-50/50 border-primary-100 hover:bg-primary-50'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${TYPE_BG[n.type]}`}>
                {TYPE_ICONS[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-semibold ${n.read ? 'text-gray-700' : 'text-gray-900'}`}>{n.title}</p>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{timeAgo(n.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{n.message}</p>
              </div>
              {!n.read && <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />}
            </div>
          ))}
        </div>

        {/* Notification Settings */}
        <div className="dashboard-card">
          <h3 className="font-display font-bold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            {[
              { label: 'New Lead Alerts', sub: 'Get notified when a new lead opts in', enabled: true },
              { label: 'Sales Notifications', sub: 'Alert when a purchase is completed', enabled: true },
              { label: 'Campaign Reports', sub: 'Weekly campaign performance digest', enabled: true },
              { label: 'System Updates', sub: 'Platform maintenance and updates', enabled: false },
              { label: 'Affiliate Earnings', sub: 'Commission and payout notifications', enabled: true },
              { label: 'Email Notifications', sub: 'Receive alerts via email', enabled: true },
              { label: 'SMS Notifications', sub: 'Receive alerts via SMS', enabled: false },
            ].map(({ label, sub, enabled }) => (
              <div key={label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-sm text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
                <button className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-primary-500' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${enabled ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
