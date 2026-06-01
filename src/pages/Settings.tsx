import { User, Bell, CreditCard, Shield, Globe, Users, Key, Save, Camera, LogOut, Share2, Target, Mail, MessageCircle, Zap, Smartphone } from "lucide-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/lib/rbac';
import { toast } from 'sonner';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User, roles: ['admin', 'business_owner', 'agency', 'sales'] },
  { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['admin', 'business_owner', 'agency', 'sales'] },
  { id: 'billing', label: 'Billing', icon: CreditCard, roles: ['admin', 'business_owner'] },
  { id: 'security', label: 'Security', icon: Shield, roles: ['admin', 'business_owner', 'agency', 'sales'] },
  { id: 'integrations', label: 'Integrations', icon: Globe, roles: ['admin', 'business_owner', 'agency'] },
  { id: 'team', label: 'Team', icon: Users, roles: ['admin', 'business_owner', 'agency'] },
];

const INTEGRATIONS = [
  { name: 'Facebook Ads', icon: Share2, status: 'connected', color: 'bg-blue-100 text-blue-600' },
  { name: 'Google Ads', icon: Target, status: 'connected', color: 'bg-red-100 text-red-600' },
  { name: 'Mailchimp', icon: Mail, status: 'disconnected', color: 'bg-yellow-100 text-yellow-700' },
  { name: 'HubSpot', icon: Users, status: 'disconnected', color: 'bg-orange-100 text-orange-700' },
  { name: 'Slack', icon: MessageCircle, status: 'connected', color: 'bg-purple-100 text-purple-600' },
  { name: 'Zapier', icon: Zap, status: 'disconnected', color: 'bg-orange-100 text-orange-700' },
  { name: 'Stripe', icon: CreditCard, status: 'connected', color: 'bg-indigo-100 text-indigo-600' },
  { name: 'WhatsApp Business', icon: Smartphone, status: 'connected', color: 'bg-green-100 text-green-600' },
];

const TEAM = [
  { name: 'Alex Johnson', email: 'alex@business.com', role: 'Owner', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
  { name: 'Sarah Mitchell', email: 'sarah@agency.com', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b515?w=40&h=40&fit=crop&crop=face' },
  { name: 'Marcus Williams', email: 'marcus@sales.com', role: 'Editor', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' },
];

const PROFILE_FIELDS = [
  { label: 'Full Name', key: 'name', type: 'text' },
  { label: 'Email Address', key: 'email', type: 'email' },
  { label: 'Company', key: 'company', type: 'text' },
  { label: 'Website', key: 'website', type: 'url' },
  { label: 'Timezone', key: 'timezone', type: 'text' },
] satisfies Array<{ label: string; key: 'name' | 'email' | 'company' | 'website' | 'timezone'; type: string }>;

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', company: user?.company || '', timezone: 'UTC-8 (PST)', website: 'https://mycompany.com', bio: '' });
  const [inviteEmail, setInviteEmail] = useState('');
  const [connections, setConnections] = useState<Record<string, boolean>>({ facebook: true, google: true, mailchimp: false, hubspot: false, slack: true, zapier: false, stripe: true, whatsapp: true });
  const visibleTabs = TABS.filter(tab => tab.roles.includes(user?.role as UserRole));

  const handleSave = () => toast.success('Settings saved successfully!');
  const handleInvite = () => { if (inviteEmail) { toast.success(`Invitation sent to ${inviteEmail}`); setInviteEmail(''); } };
  const toggleIntegration = (name: string) => {
    const key = name.toLowerCase().split(' ')[0];
    setConnections(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success(`${name} ${connections[key] ? 'disconnected' : 'connected'}!`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your account and workspace preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="dashboard-card h-fit lg:col-span-1">
            <nav className="space-y-1">
              {visibleTabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${activeTab === tab.id ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
              <button onClick={() => { logout(); navigate('/login'); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-4 border-t border-gray-100 pt-3">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-4">
            {activeTab === 'profile' && (
              <div className="dashboard-card">
                <h2 className="font-display font-bold text-gray-900 mb-6">Profile Settings</h2>
                <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                  <div className="relative">
                    <img src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=7C3AED&color=fff`} alt={user?.name} className="w-16 h-16 rounded-2xl object-cover" />
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow-sm">
                      <Camera className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{user?.role?.replace('_', ' ')} · {user?.plan} plan</p>
                    <p className="text-xs text-gray-400 mt-1">Member since {user?.joinedAt}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {PROFILE_FIELDS.map(({ label, key, type }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                      <input type={type} value={profile[key]} onChange={e => setProfile({ ...profile, [key]: e.target.value })} className="input-field" />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                    <textarea value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} className="input-field resize-none h-20" placeholder="Tell us about yourself..." />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={handleSave} className="btn-primary"><Save className="w-4 h-4" /> Save Changes</button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="dashboard-card">
                <h2 className="font-display font-bold text-gray-900 mb-6">Notification Settings</h2>
                <div className="space-y-4">
                  {[
                    { section: 'Email Notifications', items: ['New lead captures', 'Payment received', 'Funnel performance reports', 'Weekly analytics digest', 'Campaign results'] },
                    { section: 'Push Notifications', items: ['Real-time lead alerts', 'Sales notifications', 'System alerts', 'Team activity'] },
                    { section: 'SMS Notifications', items: ['High-value lead alerts (score 80+)', 'Large payment received', 'Critical system alerts'] },
                  ].map(({ section, items }) => (
                    <div key={section}>
                      <h3 className="font-semibold text-gray-900 mb-3">{section}</h3>
                      <div className="space-y-2">
                        {items.map(item => (
                          <label key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                            <span className="text-sm text-gray-700">{item}</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button onClick={handleSave} className="btn-primary"><Save className="w-4 h-4" /> Save Preferences</button>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="dashboard-card">
                <h2 className="font-display font-bold text-gray-900 mb-6">Billing & Subscription</h2>
                <div className="bg-gradient-brand rounded-2xl p-5 text-white mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/70 text-sm">Current Plan</p>
                      <p className="text-2xl font-display font-bold capitalize">{user?.plan} Plan</p>
                      <p className="text-white/70 text-sm mt-1">Next billing: June 1, 2025</p>
                    </div>
                    <button className="bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">Upgrade</button>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Payment Method</h3>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <CreditCard className="w-6 h-6 text-primary-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Visa •••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/26</p>
                    </div>
                    <button onClick={() => toast.success('Update card form opened!')} className="text-sm text-primary-600 font-medium">Update</button>
                  </div>
                  <h3 className="font-semibold text-gray-900 mt-4">Usage This Month</h3>
                  {[
                    { label: 'Funnels', used: 3, limit: 10 },
                    { label: 'Contacts', used: 8420, limit: 25000 },
                    { label: 'Emails Sent', used: 12500, limit: 50000 },
                  ].map(({ label, used, limit }) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{label}</span>
                        <span className="font-medium text-gray-900">{used.toLocaleString()} / {limit.toLocaleString()}</span>
                      </div>
                      <div className="bg-gray-100 rounded-full h-2"><div className="bg-primary-500 h-2 rounded-full" style={{ width: `${(used / limit) * 100}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="dashboard-card">
                <h2 className="font-display font-bold text-gray-900 mb-6">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Change Password</h3>
                    <div className="space-y-3">
                      {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                        <div key={label}>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                          <input type="password" className="input-field" placeholder="••••••••" />
                        </div>
                      ))}
                      <button onClick={() => toast.success('Password updated!')} className="btn-primary py-2 px-4 text-sm"><Key className="w-4 h-4" /> Update Password</button>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <button onClick={() => toast.success('2FA setup started!')} className="btn-primary text-sm py-2 px-4">Enable 2FA</button>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Active Sessions</h3>
                    {['Chrome on Mac — San Francisco, US · Active now', 'Safari on iPhone — San Francisco, US · 2h ago'].map(s => (
                      <div key={s} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-2">
                        <p className="text-sm text-gray-700">{s}</p>
                        <button onClick={() => toast.success('Session revoked')} className="text-xs text-red-500 hover:text-red-700">Revoke</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="dashboard-card">
                <h2 className="font-display font-bold text-gray-900 mb-6">Integrations</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {INTEGRATIONS.map(({ name, icon: Icon, color }) => {
                    const key = name.toLowerCase().split(' ')[0];
                    const connected = connections[key];
                    return (
                      <div key={name} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-900">{name}</p>
                          <span className={`text-xs font-medium ${connected ? 'text-green-600' : 'text-gray-400'}`}>{connected ? 'Connected' : 'Not connected'}</span>
                        </div>
                        <button onClick={() => toggleIntegration(name)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${connected ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}`}>
                          {connected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="dashboard-card">
                <h2 className="font-display font-bold text-gray-900 mb-6">Team Management</h2>
                <div className="flex gap-3 mb-6">
                  <input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} className="input-field flex-1" placeholder="colleague@company.com" />
                  <select className="input-field w-auto"><option>Editor</option><option>Admin</option><option>Viewer</option></select>
                  <button onClick={handleInvite} className="btn-primary text-sm py-2 px-4 whitespace-nowrap">Send Invite</button>
                </div>
                <div className="space-y-3">
                  {TEAM.map(m => (
                    <div key={m.email} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-500">{m.email}</p>
                      </div>
                      <select defaultValue={m.role} className="text-xs border border-gray-200 rounded-lg px-2 py-1">
                        {['Owner', 'Admin', 'Editor', 'Viewer'].map(r => <option key={r}>{r}</option>)}
                      </select>
                      {m.role !== 'Owner' && <button onClick={() => toast.success('User removed!')} className="text-xs text-red-500 hover:text-red-700">Remove</button>}
                    </div>
                  ))}
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
