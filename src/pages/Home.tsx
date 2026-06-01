import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, Star, Zap, TrendingUp, Users, BarChart3,
  Megaphone, Globe, Shield, ChevronDown, Play, Sparkles, Target,
  Bot, MousePointer, DollarSign, Award, Quote, LayoutDashboard, Filter,
  Mail, MessageCircle, Smartphone
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthAwareLink from '@/components/features/AuthAwareLink';
import { getDefaultDashboardPath } from '@/lib/rbac';
import heroBg from '@/assets/hero-bg.jpg';
import dashboardPreview from '@/assets/dashboard-preview.jpg';

function Funnel({ className }: { className?: string }) {
  return <Filter className={className} />;
}

const FEATURES = [
  { icon: Funnel, title: 'Funnel Builder', desc: 'Drag-and-drop builder with 50+ proven templates. Build funnels that convert 3x better.', color: 'bg-primary-100 text-primary-600' },
  { icon: Users, title: 'CRM & Pipeline', desc: 'Smart lead management with scoring, tagging, and automated follow-up sequences.', color: 'bg-blue-100 text-blue-600' },
  { icon: Megaphone, title: 'Marketing Automation', desc: 'Email, SMS & WhatsApp campaigns with visual workflow builder and drip sequences.', color: 'bg-green-100 text-green-600' },
  { icon: Bot, title: 'AI Optimization', desc: 'Real-time AI recommendations to increase conversions and reduce ad spend.', color: 'bg-purple-100 text-purple-600' },
  { icon: BarChart3, title: 'Advanced Analytics', desc: 'Deep funnel analytics, ROI tracking, A/B testing, and revenue attribution.', color: 'bg-orange-100 text-orange-600' },
  { icon: Globe, title: 'Website Builder', desc: 'Build stunning websites and landing pages with our visual drag-and-drop editor.', color: 'bg-indigo-100 text-indigo-600' },
  { icon: DollarSign, title: 'Payment Integration', desc: 'Accept payments, subscriptions, upsells, and order bumps all in one checkout.', color: 'bg-teal-100 text-teal-600' },
  { icon: Shield, title: 'Multi-role Access', desc: 'Team collaboration with role-based access for agencies, sales teams, and clients.', color: 'bg-pink-100 text-pink-600' },
];

const STEPS = [
  { step: '01', title: 'Build Your Funnel', desc: 'Choose from 50+ templates or build from scratch with our drag-and-drop editor.', color: 'from-primary-500 to-secondary-500' },
  { step: '02', title: 'Drive Traffic', desc: 'Connect your ads, email campaigns, and SEO to send qualified traffic to your funnel.', color: 'from-secondary-500 to-blue-500' },
  { step: '03', title: 'Convert & Sell', desc: 'Watch leads convert with optimized checkout flows, upsells, and follow-up sequences.', color: 'from-blue-500 to-teal-500' },
  { step: '04', title: 'Scale with AI', desc: 'Use AI recommendations to continuously optimize and scale what\'s working.', color: 'from-accent-500 to-primary-500' },
];

const TESTIMONIALS = [
  { name: 'Sarah Johnson', role: 'CEO, TechLaunch', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b515?w=60&h=60&fit=crop&crop=face', quote: 'Funneling tripled our conversion rate in just 6 weeks. The AI recommendations alone paid for the entire year.', stars: 5, revenue: '+$127K revenue' },
  { name: 'Marcus Williams', role: 'Digital Marketing Agency', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face', quote: 'We manage 40+ client funnels with Funneling. The agency tools and white-label options are game-changing.', stars: 5, revenue: '40+ clients managed' },
  { name: 'Priya Patel', role: 'E-commerce Founder', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face', quote: 'Switched from ClickFunnels and immediately saw a 45% improvement in page load speed and 28% more conversions.', stars: 5, revenue: '+28% conversions' },
  { name: 'James Chen', role: 'SaaS Founder', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', quote: 'The CRM integration is seamless. My sales team closes 2x more deals because they always know what each lead needs.', stars: 5, revenue: '2x close rate' },
  { name: 'Amanda Foster', role: 'Online Coach', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', quote: 'Built my entire coaching business on Funneling. The webinar funnel template alone generated $84K in one launch.', stars: 5, revenue: '$84K from one launch' },
  { name: 'David Park', role: 'Digital Marketing', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face', quote: 'The WhatsApp automation feature is revolutionary. We\'re seeing 68% reply rates compared to 22% with email.', stars: 5, revenue: '68% reply rate' },
];

const PRICING = [
  {
    name: 'Starter', price: 97, period: 'month', description: 'Perfect for solopreneurs and small businesses',
    features: ['3 Funnels', '1,000 Contacts', 'Email Campaigns', 'Basic Analytics', 'Landing Page Builder', 'SSL Included', 'Email Support'],
    cta: 'Start Free Trial', popular: false, color: 'border-gray-200',
  },
  {
    name: 'Pro', price: 197, period: 'month', description: 'For growing businesses that need more power',
    features: ['Unlimited Funnels', '25,000 Contacts', 'Email + SMS + WhatsApp', 'Advanced Analytics', 'A/B Testing', 'CRM Pipeline', 'AI Recommendations', 'Priority Support', 'Custom Domains'],
    cta: 'Start Free Trial', popular: true, color: 'border-primary-500',
  },
  {
    name: 'Enterprise', price: 497, period: 'month', description: 'For agencies and large teams',
    features: ['Everything in Pro', 'Unlimited Contacts', 'White-label Dashboard', 'Agency Client Management', 'Custom Integrations', 'Dedicated Account Manager', 'SLA Guarantee', 'Onboarding Call'],
    cta: 'Contact Sales', popular: false, color: 'border-gray-200',
  },
];

const FAQS = [
  { q: 'How is Funneling different from ClickFunnels?', a: 'Funneling combines funnel building with a full CRM, marketing automation, AI optimization, and website builder — all in one platform at a fraction of the cost. We also offer significantly faster page loads.' },
  { q: 'Do I need technical skills to use Funneling?', a: 'No! Our drag-and-drop builder is designed for non-technical users. With 50+ templates and guided setup wizards, you can launch your first funnel in under 30 minutes.' },
  { q: 'Can I migrate from my current funnel platform?', a: 'Yes! We offer free migration assistance for all Pro and Enterprise plans. Our team will help you migrate your funnels, contacts, and automations from any platform.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for annual plans. All payments are secured with 256-bit SSL encryption.' },
  { q: 'Is there a free trial?', a: 'Yes! All plans include a 14-day free trial with no credit card required. You get full access to all features during your trial period.' },
  { q: 'How does the AI optimization work?', a: 'Our AI analyzes your funnel data, visitor behavior, and industry benchmarks to provide actionable recommendations — from headline changes to audience targeting — all ranked by estimated impact.' },
];

const METRICS = [
  { value: '50,000+', label: 'Active Users', icon: Users },
  { value: '$2.4B+', label: 'Revenue Generated', icon: DollarSign },
  { value: '1.2M+', label: 'Funnels Created', icon: Funnel },
  { value: '94%', label: 'Customer Satisfaction', icon: Award },
];

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [videoPlay, setVideoPlay] = useState(false);
  const [billingAnnual, setBillingAnnual] = useState(false);

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-gradient-dark overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-secondary-900/70 to-gray-950/90" />
        </div>
        <div className="absolute inset-0 bg-mesh-purple opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent-400" />
            <span className="text-white/90 text-sm font-medium">New: AI-powered funnel optimization is live</span>
            <ArrowRight className="w-4 h-4 text-accent-400" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Build Funnels That{' '}
            <span className="bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text text-transparent">
              Actually Convert
            </span>
          </h1>

          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
            The all-in-one platform to build high-converting funnels, manage your CRM, automate email/SMS/WhatsApp campaigns, and scale with AI-powered recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
            {isLoggedIn ? (
              <Link to={getDefaultDashboardPath(user?.role)} className="btn-accent text-lg py-4 px-8 shadow-brand-xl">
                <LayoutDashboard className="w-5 h-5" /> Go to Dashboard <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <AuthAwareLink intent="trial" guestTo="/register" className="btn-accent text-lg py-4 px-8 shadow-brand-xl hover:shadow-2xl">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </AuthAwareLink>
                <Link to="/features" className="btn-outline border-white/40 text-white hover:bg-white/10 text-lg py-4 px-8">
                  See All Features
                </Link>
              </>
            )}
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
            {['14-day free trial', 'No credit card required', 'Cancel anytime', 'Free migration'].map(text => (
              <div key={text} className="flex items-center gap-2 text-white/60 text-sm">
                <Check className="w-4 h-4 text-green-400" /> {text}
              </div>
            ))}
          </div>

          {/* Dashboard Preview */}
          <div className="relative mx-auto max-w-5xl animate-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-2 shadow-brand-xl">
              <img src={dashboardPreview} alt="Funneling Dashboard" className="rounded-2xl w-full shadow-2xl" />
              {!videoPlay && (
                <button
                  onClick={() => setVideoPlay(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-brand-lg">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </button>
              )}
            </div>
            {/* Floating stat cards */}
            <div className="absolute -left-8 top-1/4 bg-white rounded-2xl shadow-glass-lg p-4 hidden lg:flex items-center gap-3 animate-float">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Conversion Rate</p>
                <p className="text-lg font-bold text-gray-900">+34.8%</p>
              </div>
            </div>
            <div className="absolute -right-8 bottom-1/4 bg-white rounded-2xl shadow-glass-lg p-4 hidden lg:flex items-center gap-3 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Revenue This Month</p>
                <p className="text-lg font-bold text-gray-900">$84,230</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center p-6 rounded-2xl hover:bg-primary-50 transition-colors group">
                <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-3xl font-display font-black gradient-text-brand mb-1">{value}</p>
                <p className="text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section-padding bg-gray-50" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge-purple mb-4 inline-block text-sm px-4 py-1.5">Everything You Need</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-4">
              One Platform,{' '}
              <span className="gradient-text">Infinite Possibilities</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Replace 8+ tools with one seamlessly integrated platform designed for high-growth businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card-premium p-6 group cursor-pointer">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge-purple mb-4 inline-block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-4">
              From Zero to{' '}
              <span className="gradient-text">Revenue in 4 Steps</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ step, title, desc, color }) => (
              <div key={step} className="relative">
                <div className="card-premium p-6 h-full">
                  <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mb-4 shadow-brand`}>
                    <span className="text-white font-bold font-display">{step}</span>
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
                {step !== '04' && <div className="hidden lg:block absolute top-8 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary-300 to-transparent" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNNEL BUILDER SHOWCASE */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-purple opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-6">
                <Funnel className="w-4 h-4 text-accent-400" /> Funnel Builder
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
                Build Funnels That Convert 3x Better
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Our intelligent funnel builder comes loaded with 50+ battle-tested templates. Customize every element, run A/B tests, and publish in minutes.
              </p>
              <ul className="space-y-3 mb-8">
                {['Drag-and-drop visual editor', '50+ proven funnel templates', 'One-click publish & custom domains', 'Real-time mobile preview', 'Built-in A/B split testing', 'Conversion analytics on every step'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-white/80">
                    <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/funnel-builder" className="btn-accent">
                Try Funnel Builder <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-4 shadow-brand-xl">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" alt="Funnel Builder" className="rounded-2xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* CRM SHOWCASE */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 bg-gray-50 rounded-3xl p-4">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" alt="CRM Dashboard" className="rounded-2xl w-full shadow-card" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="badge-purple mb-4 inline-block">CRM & Pipeline</span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-6">
                Your Leads, <span className="gradient-text">Perfectly Managed</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Never lose a lead again. Our smart CRM automatically scores, tags, and segments your contacts — so your sales team always knows who to call next.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Lead Scoring', icon: Target },
                  { label: 'Smart Tagging', icon: Sparkles },
                  { label: 'Pipeline View', icon: TrendingUp },
                  { label: 'Auto Follow-up', icon: Zap },
                ].map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="font-medium text-sm text-gray-800">{label}</span>
                  </div>
                ))}
              </div>
              <Link to="/crm" className="btn-primary">
                Explore CRM <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETING AUTOMATION SHOWCASE */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-purple mb-4 inline-block">Marketing Automation</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-4">
              Automate Everything,{' '}
              <span className="gradient-text">Scale Effortlessly</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: 'Email Campaigns', desc: 'Beautiful email sequences with 60%+ open rates using smart segmentation and personalization.' },
              { icon: MessageCircle, title: 'WhatsApp Marketing', desc: 'Reach customers on WhatsApp with automated messages and 68% reply rates vs 22% email.' },
              { icon: Smartphone, title: 'SMS Automation', desc: 'High-impact SMS campaigns with 98% open rates for time-sensitive offers and reminders.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-premium p-8 text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/campaigns" className="btn-primary">
              Explore Automation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI OPTIMIZATION SHOWCASE */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                <Bot className="w-4 h-4" /> AI-Powered
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-6">
                Your AI Co-Pilot for <span className="gradient-text">Maximum Conversions</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Stop guessing what to optimize. Our AI analyzes millions of data points and tells you exactly what to change for the biggest impact.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'CTA Optimization', impact: '+23% CTR', color: 'bg-green-100 text-green-700' },
                  { title: 'Drop-off Analysis', impact: '+18% Conversion', color: 'bg-blue-100 text-blue-700' },
                  { title: 'Audience Targeting', impact: '+67% ROAS', color: 'bg-purple-100 text-purple-700' },
                ].map(({ title, impact, color }) => (
                  <div key={title} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <Bot className="w-5 h-5 text-primary-600" />
                      <span className="font-medium text-gray-800">{title}</span>
                    </div>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${color}`}>{impact}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-900 to-secondary-900 rounded-3xl p-6 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">AI Recommendation</p>
                  <p className="text-white/60 text-sm">Priority: High Impact</p>
                </div>
                <div className="ml-auto bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-full">+34%</div>
              </div>
              {[
                { title: 'Optimize Hero CTA', desc: 'Change "Get Started" → "Start My Free Trial" to boost CTR by 23%', tag: 'Conversion' },
                { title: 'Remove Form Fields', desc: 'Your 7-field form loses 42% of leads. Reduce to 3 fields.', tag: 'Lead Gen' },
                { title: 'Add Video Testimonial', desc: 'Adding a 90-second video above the fold increases conversions 34%.', tag: 'Social Proof' },
              ].map(({ title, desc, tag }) => (
                <div key={title} className="bg-white/10 rounded-xl p-4 mb-3 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm">{title}</p>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{tag}</span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICS SHOWCASE */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="badge-purple mb-4 inline-block">Analytics & Insights</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-4">
            Data That <span className="gradient-text">Drives Decisions</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
            Real-time dashboards, funnel analytics, revenue tracking, and ROI measurement — all in one place.
          </p>
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              { value: '34.8%', label: 'Avg. Conversion Rate', up: true },
              { value: '4.2x', label: 'Average ROAS', up: true },
              { value: '$127K', label: 'Monthly Revenue', up: true },
              { value: '98%', label: 'Uptime SLA', up: false },
            ].map(({ value, label, up }) => (
              <div key={label} className="card-premium p-6 text-center">
                <p className="text-3xl font-display font-black gradient-text-brand mb-1">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
          <Link to="/analytics" className="btn-primary">
            View Analytics Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="section-padding bg-white" id="pricing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-purple mb-4 inline-block">Simple Pricing</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-4">
              Pricing That <span className="gradient-text">Scales With You</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-xl mx-auto mb-8">
              Start free, scale as you grow. Cancel anytime — no long-term contracts required.
            </p>
            <div className="inline-flex items-center gap-3 bg-gray-100 p-1 rounded-xl">
              <button onClick={() => setBillingAnnual(false)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${!billingAnnual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </button>
              <button onClick={() => setBillingAnnual(true)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${billingAnnual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>
                Annual <span className="text-green-600 ml-1">Save 40%</span>
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING.map(plan => (
              <div key={plan.name} className={`relative rounded-3xl border-2 p-8 ${plan.popular ? 'border-primary-500 bg-gradient-to-b from-primary-50 to-white shadow-brand-lg' : 'border-gray-200 bg-white shadow-card'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-brand text-white text-sm font-bold px-6 py-1.5 rounded-full shadow-brand">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-display font-black text-gray-900">
                      ${billingAnnual ? Math.round(plan.price * 0.6) : plan.price}
                    </span>
                    <span className="text-gray-500 pb-1">/{plan.period}</span>
                  </div>
                  {billingAnnual && <p className="text-green-600 text-sm font-medium mt-1">Billed annually — save ${plan.price * 12 - Math.round(plan.price * 0.6) * 12}/yr</p>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-primary-500' : 'bg-gray-200'}`}>
                        <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.cta === 'Contact Sales' ? (
                  <Link to="/contact" className="block text-center font-semibold py-3.5 px-6 rounded-xl transition-all btn-outline w-full justify-center">
                    {plan.cta}
                  </Link>
                ) : (
                  <AuthAwareLink intent="trial" guestTo="/register" className={`block text-center font-semibold py-3.5 px-6 rounded-xl transition-all ${plan.popular ? 'btn-primary w-full justify-center' : 'btn-outline w-full justify-center'}`}>
                  {plan.cta}
                  </AuthAwareLink>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-gray-50" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-purple mb-4 inline-block">Social Proof</span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-4">
              Loved by <span className="gradient-text">50,000+ Businesses</span>
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              <span className="ml-2 font-semibold text-gray-700">4.9/5 from 3,200+ reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, avatar, quote, stars, revenue }) => (
              <div key={name} className="card-premium p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(stars)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                  <span className="ml-auto bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">{revenue}</span>
                </div>
                <Quote className="w-6 h-6 text-primary-200 mb-2" />
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-purple mb-4 inline-block">FAQ</span>
            <h2 className="text-4xl font-display font-black text-gray-900 mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="card-premium overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-semibold text-gray-900 pr-4">{q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed animate-fade-in border-t border-gray-100 pt-4">{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-purple opacity-40" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-accent-400" />
            <span className="text-white/90 text-sm">Start your 14-day free trial today</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6">
            Ready to Scale Your Business?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Join 50,000+ businesses using Funneling to build, convert, and scale. No contracts, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AuthAwareLink intent="trial" guestTo="/register" className="btn-accent text-lg py-4 px-10 shadow-brand-xl">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </AuthAwareLink>
            <Link to="/contact" className="btn-outline border-white/40 text-white hover:bg-white/10 text-lg py-4 px-10">
              Talk to Sales
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-6">No credit card required · 14-day free trial · Cancel anytime</p>
        </div>
      </section>
    </div>
  );
}
