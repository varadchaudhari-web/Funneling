import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Star, ChevronDown, Plus, ShieldCheck } from 'lucide-react';
import AuthAwareLink from '@/components/features/AuthAwareLink';

const PLANS = [
  {
    id: 'starter', name: 'Starter', monthlyPrice: 97, annualPrice: 58, description: 'Perfect for solopreneurs just starting out',
    color: 'border-gray-200', badge: null,
    features: [
      { text: '3 Active Funnels', included: true },
      { text: '1,000 Contacts', included: true },
      { text: 'Email Campaigns', included: true },
      { text: 'Basic Landing Pages', included: true },
      { text: 'SSL & Hosting', included: true },
      { text: 'Analytics Dashboard', included: true },
      { text: 'Email Support', included: true },
      { text: 'A/B Testing', included: false },
      { text: 'CRM Pipeline', included: false },
      { text: 'AI Optimization', included: false },
      { text: 'WhatsApp Campaigns', included: false },
      { text: 'White-label', included: false },
    ],
  },
  {
    id: 'pro', name: 'Pro', monthlyPrice: 197, annualPrice: 118, description: 'For growing businesses that need full power',
    color: 'border-primary-500', badge: 'Most Popular',
    features: [
      { text: 'Unlimited Funnels', included: true },
      { text: '25,000 Contacts', included: true },
      { text: 'Email + SMS + WhatsApp', included: true },
      { text: 'Advanced Landing Pages', included: true },
      { text: 'SSL & CDN Hosting', included: true },
      { text: 'Advanced Analytics + ROI', included: true },
      { text: 'Priority Support', included: true },
      { text: 'A/B Testing', included: true },
      { text: 'Full CRM Pipeline', included: true },
      { text: 'AI Optimization', included: true },
      { text: 'Custom Domains', included: true },
      { text: 'White-label', included: false },
    ],
  },
  {
    id: 'enterprise', name: 'Enterprise', monthlyPrice: 497, annualPrice: 298, description: 'For agencies and high-growth organizations',
    color: 'border-gray-200', badge: null,
    features: [
      { text: 'Unlimited Funnels', included: true },
      { text: 'Unlimited Contacts', included: true },
      { text: 'All Channels + API', included: true },
      { text: 'Custom Website Builder', included: true },
      { text: 'Enterprise SLA (99.99%)', included: true },
      { text: 'Custom Dashboards', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'A/B Testing + Multivariate', included: true },
      { text: 'Full CRM + API Access', included: true },
      { text: 'Advanced AI + Custom Models', included: true },
      { text: 'Multi Custom Domains', included: true },
      { text: 'Full White-label', included: true },
    ],
  },
];

const ADDONS = [
  { name: 'Extra Contacts (10K)', price: 29, period: 'month' },
  { name: 'SMS Credits (10,000)', price: 19, period: 'month' },
  { name: 'Custom Domain (extra)', price: 9, period: 'month' },
  { name: 'Onboarding Call', price: 299, period: 'one-time' },
];

const FAQS = [
  { q: 'Can I change plans later?', a: 'Yes! You can upgrade or downgrade at any time. Changes are prorated automatically.' },
  { q: 'What happens after my free trial?', a: 'After 14 days, you choose a plan. If you don\'t, your account is paused (your data is kept for 30 days).' },
  { q: 'Do you offer refunds?', a: 'Yes — we offer a 30-day money-back guarantee on all plans, no questions asked.' },
  { q: 'Can I cancel anytime?', a: 'Absolutely. No long-term contracts. Cancel anytime directly from your settings.' },
  { q: 'Is there a limit on funnel visitors?', a: 'No! We never charge per visitor or pageview — unlimited traffic on all plans.' },
  { q: 'Do you offer annual discounts?', a: 'Yes — annual billing saves you 40% compared to monthly pricing.' },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-dark section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-purple opacity-30" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="badge-purple mb-4 inline-block">Simple Pricing</span>
          <h1 className="text-5xl md:text-6xl font-display font-black text-white mb-4">
            Pricing That <span className="bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text text-transparent">Grows With You</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">14-day free trial · No credit card · Cancel anytime</p>
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-1.5">
            <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? 'bg-white text-gray-900 shadow-sm' : 'text-white/70'}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${annual ? 'bg-white text-gray-900 shadow-sm' : 'text-white/70'}`}>
              Annual <span className="bg-green-400 text-green-900 text-xs font-bold px-2 py-0.5 rounded-full">-40%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map(plan => (
              <div key={plan.id} className={`relative bg-white rounded-3xl border-2 ${plan.color} shadow-card hover:shadow-card-hover transition-all overflow-hidden ${plan.badge ? 'scale-105 shadow-brand' : ''}`}>
                {plan.badge && (
                  <div className="bg-gradient-brand py-2 text-center">
                    <span className="text-white text-sm font-bold flex items-center justify-center gap-2">
                      <Star className="w-4 h-4 fill-white" /> {plan.badge}
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-5xl font-display font-black text-gray-900">${annual ? plan.annualPrice : plan.monthlyPrice}</span>
                    <span className="text-gray-500 pb-2">/month</span>
                  </div>
                  {annual && <p className="text-sm text-green-600 font-medium mb-6">Billed ${plan.annualPrice * 12}/year · Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/yr</p>}
                  {plan.id === 'enterprise' ? (
                    <Link to="/contact" className="block text-center py-3.5 rounded-xl font-semibold transition-all mb-8 btn-outline w-full justify-center">
                      Contact Sales
                    </Link>
                  ) : (
                    <AuthAwareLink intent="trial" guestTo="/register" className={`block text-center py-3.5 rounded-xl font-semibold transition-all mb-8 ${plan.badge ? 'btn-primary w-full justify-center' : 'btn-outline w-full justify-center'}`}>
                      Start Free Trial
                    </AuthAwareLink>
                  )}
                  <div className="space-y-3">
                    {plan.features.map(({ text, included }) => (
                      <div key={text} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${included ? plan.badge ? 'bg-primary-500' : 'bg-green-500' : 'bg-gray-200'}`}>
                          {included ? <Check className="w-3 h-3 text-white" /> : <X className="w-3 h-3 text-gray-400" />}
                        </div>
                        <span className={`text-sm ${included ? 'text-gray-700' : 'text-gray-400 line-through'}`}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise Banner */}
          <div className="mt-8 bg-gradient-dark rounded-3xl p-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh-purple opacity-30" />
            <div className="relative z-10">
              <h3 className="text-2xl font-display font-bold mb-2">Need Custom Pricing for Your Agency?</h3>
              <p className="text-white/70 mb-4">Special rates available for agencies managing 10+ client accounts</p>
              <Link to="/contact" className="btn-accent">Talk to Sales <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-black text-gray-900 mb-3">Optional Add-ons</h2>
            <p className="text-gray-500">Extend your plan with these optional extras</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {ADDONS.map(({ name, price, period }) => (
              <div key={name} className="card-premium p-5 text-center">
                <p className="font-display font-bold text-2xl text-gray-900 mb-1">${price}</p>
                <p className="text-xs text-gray-500 mb-3">/{period}</p>
                <p className="font-medium text-sm text-gray-700">{name}</p>
                <button className="mt-3 text-xs text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center justify-center gap-1">
                  <Plus className="w-3 h-3" />
                  Add to Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-black text-gray-900 mb-3">Pricing FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="card-premium overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-semibold text-gray-900">{q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-display font-black text-gray-900 mb-4">30-Day Money-Back Guarantee</h2>
          <p className="text-gray-500 text-lg mb-8">If you're not 100% satisfied with Funneling within 30 days of your purchase, we'll refund you in full. No questions asked, no hoops to jump through.</p>
          <AuthAwareLink intent="trial" guestTo="/login" className="btn-primary text-lg py-4 px-8">
            Start Your Free Trial <ArrowRight className="w-5 h-5" />
          </AuthAwareLink>
        </div>
      </section>
    </div>
  );
}
