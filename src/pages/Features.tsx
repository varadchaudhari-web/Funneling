import { Link } from 'react-router-dom';
import { Filter, Users, BarChart3, Megaphone, Globe, Shield, CreditCard, Bot, Zap, Check, ArrowRight } from 'lucide-react';

const FEATURE_CATEGORIES = [
  {
    id: 'funnel', icon: Filter, title: 'Funnel Builder', color: 'bg-primary-100 text-primary-600',
    features: ['50+ battle-tested templates', 'Drag-and-drop visual editor', 'Multi-step funnel flows', 'A/B split testing', 'One-click publishing', 'Custom domain support', 'Mobile-first design', 'Funnel analytics dashboard', 'Step-level conversion tracking'],
  },
  {
    id: 'crm', icon: Users, title: 'CRM & Pipeline', color: 'bg-blue-100 text-blue-600',
    features: ['Contact management', 'Lead scoring (0-100)', 'Kanban pipeline view', 'Smart segmentation', 'Custom lead tags', 'Contact activity timeline', 'Deal value tracking', 'Auto lead assignment', 'Import/Export CSV'],
  },
  {
    id: 'automation', icon: Megaphone, title: 'Marketing Automation', color: 'bg-green-100 text-green-600',
    features: ['Email campaigns', 'SMS broadcasts', 'WhatsApp automation', 'Visual drip builder', 'Trigger-based workflows', 'Behavior-based sending', 'Personalization tokens', 'Campaign A/B testing', 'Automation analytics'],
  },
  {
    id: 'ai', icon: Bot, title: 'AI Optimization', color: 'bg-purple-100 text-purple-600',
    features: ['AI conversion recommendations', 'CTA optimization suggestions', 'Funnel drop-off analysis', 'Smart audience targeting', 'Headline optimization', 'Send-time optimization', 'AI-generated copy', 'Predictive lead scoring', 'Revenue forecasting'],
  },
  {
    id: 'analytics', icon: BarChart3, title: 'Analytics & Reporting', color: 'bg-orange-100 text-orange-600',
    features: ['Real-time dashboards', 'Revenue attribution', 'ROI tracking', 'Traffic source analysis', 'Funnel conversion rates', 'Campaign performance', 'Custom report builder', 'Data export (CSV/PDF)', 'Google Analytics integration'],
  },
  {
    id: 'website', icon: Globe, title: 'Website & Landing Pages', color: 'bg-teal-100 text-teal-600',
    features: ['Drag-and-drop page builder', '20+ website templates', 'SEO optimization tools', 'Custom domain support', 'SSL certificates included', 'Fast CDN hosting', 'Mobile responsive', 'Blog/CMS module', 'Popup & exit-intent builder'],
  },
  {
    id: 'payments', icon: CreditCard, title: 'Payments & Revenue', color: 'bg-indigo-100 text-indigo-600',
    features: ['One-page checkout', 'Subscription billing', 'Coupon/discount codes', 'Order bumps', 'Upsell & downsell flows', 'Payment failure recovery', 'Invoice generation', 'Multi-currency support', 'Revenue analytics'],
  },
  {
    id: 'security', icon: Shield, title: 'Security & Compliance', color: 'bg-red-100 text-red-600',
    features: ['99.99% uptime SLA', 'GDPR compliance tools', 'Two-factor authentication', 'Role-based access control', 'Activity audit logs', 'Data encryption at rest', 'SOC 2 Type II certified', 'CCPA compliance', 'Automated backups'],
  },
];

const COMPARISON = [
  { feature: 'Funnel Builder', funneling: true, clickfunnels: true, hubspot: false, gohighlevel: true },
  { feature: 'Built-in CRM', funneling: true, clickfunnels: false, hubspot: true, gohighlevel: true },
  { feature: 'Email Automation', funneling: true, clickfunnels: false, hubspot: true, gohighlevel: true },
  { feature: 'WhatsApp Campaigns', funneling: true, clickfunnels: false, hubspot: false, gohighlevel: true },
  { feature: 'AI Optimization', funneling: true, clickfunnels: false, hubspot: false, gohighlevel: false },
  { feature: 'Website Builder', funneling: true, clickfunnels: true, hubspot: true, gohighlevel: true },
  { feature: 'Affiliate System', funneling: true, clickfunnels: true, hubspot: false, gohighlevel: true },
  { feature: 'Starting Price/mo', funneling: '$97', clickfunnels: '$147', hubspot: '$800', gohighlevel: '$97' },
];

export default function Features() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-dark section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-purple opacity-30" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="badge-purple mb-6 inline-block text-sm px-4 py-1.5">Complete Feature Set</span>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6">
            Every Tool You Need to <span className="bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text text-transparent">Dominate</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Replace 8+ tools with one seamlessly integrated platform. Funnel builder, CRM, email automation, AI optimization, and more — all working together.
          </p>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-black text-gray-900 mb-4">Everything Included in Every Plan</h2>
            <p className="text-xl text-gray-500">No hidden fees. No add-ons required.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURE_CATEGORIES.map(({ icon: Icon, title, color, features, id }) => (
              <div key={id} className="card-premium p-6">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-4">{title}</h3>
                <ul className="space-y-2">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-purple mb-4 inline-block">Comparison</span>
            <h2 className="text-4xl font-display font-black text-gray-900 mb-4">How We Compare</h2>
            <p className="text-xl text-gray-500">See why 50,000+ businesses switched to Funneling</p>
          </div>
          <div className="dashboard-card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Feature</th>
                    <th className="px-4 py-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <div className="w-5 h-5 bg-gradient-brand rounded-md flex items-center justify-center"><Zap className="w-3 h-3 text-white" /></div>
                        <span className="text-sm font-bold text-primary-700">Funneling</span>
                      </div>
                    </th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-gray-500">ClickFunnels</th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-gray-500">HubSpot</th>
                    <th className="px-4 py-4 text-center text-sm font-semibold text-gray-500">GoHighLevel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {COMPARISON.map(row => (
                    <tr key={row.feature} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                      {(['funneling', 'clickfunnels', 'hubspot', 'gohighlevel'] as const).map(platform => (
                        <td key={platform} className={`px-4 py-4 text-center ${platform === 'funneling' ? 'bg-primary-50/50' : ''}`}>
                          {typeof row[platform] === 'boolean' ? (
                            row[platform] ? (
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto ${platform === 'funneling' ? 'bg-primary-500' : 'bg-green-500'}`}>
                                <Check className="w-3.5 h-3.5 text-white" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-gray-400 text-xs">—</span>
                              </div>
                            )
                          ) : (
                            <span className={`text-sm font-bold ${platform === 'funneling' ? 'text-primary-600' : 'text-gray-700'}`}>{row[platform]}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Logos */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <span className="badge-purple mb-4 inline-block">Integrations</span>
          <h2 className="text-4xl font-display font-black text-gray-900 mb-4">Connects With 200+ Tools</h2>
          <p className="text-gray-500 mb-10">Zapier, Facebook, Google, Stripe, Mailchimp, Slack, HubSpot, and many more</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['📘 Facebook', '🎯 Google Ads', '💳 Stripe', '📧 Mailchimp', '💬 Slack', '⚡ Zapier', '🔶 HubSpot', '💚 WhatsApp', '📱 Twilio', '🛒 Shopify', '📹 Zoom', '📊 Google Analytics'].map(t => (
              <div key={t} className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5">
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-purple opacity-30" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-display font-black text-white mb-4">See All Features in Action</h2>
          <p className="text-white/70 text-lg mb-8">Start your 14-day free trial — no credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-accent text-lg py-4 px-8">Start Free Trial <ArrowRight className="w-5 h-5" /></Link>
            <Link to="/pricing" className="btn-outline border-white/40 text-white hover:bg-white/10 text-lg py-4 px-8">View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
