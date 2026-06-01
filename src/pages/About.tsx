import { Link } from 'react-router-dom';
import { Target, Users, Zap, BarChart3, Globe, ArrowRight, Award, Heart, Linkedin, Twitter, Building2, DollarSign, Star } from 'lucide-react';
import AuthAwareLink from '@/components/features/AuthAwareLink';

const TEAM = [
  { name: 'Marcus Reid', role: 'CEO & Co-founder', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face', bio: 'Former Head of Growth at HubSpot. Built 3 SaaS products.' },
  { name: 'Alicia Chen', role: 'CTO & Co-founder', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face', bio: '10+ years building scalable platforms. Ex-Google engineer.' },
  { name: 'James Kim', role: 'Head of Product', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face', bio: 'UX designer turned product lead. Obsessed with conversion optimization.' },
  { name: 'Sofia Martinez', role: 'Head of Marketing', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face', bio: 'Growth marketing expert. Scaled multiple SaaS brands to $10M+ ARR.' },
];

const VALUES = [
  { icon: Target, title: 'Results-Driven', desc: 'We measure success by the revenue and conversions our customers generate, not just feature launches.' },
  { icon: Users, title: 'Customer-First', desc: 'Every decision starts with understanding what our users actually need to grow their businesses.' },
  { icon: Zap, title: 'Move Fast', desc: 'We ship new features every week based on customer feedback and market demands.' },
  { icon: Heart, title: 'Radical Transparency', desc: 'We share our roadmap, pricing, and even our mistakes openly with our community.' },
];

const MILESTONES = [
  { year: '2020', event: 'Funneling founded in San Francisco with $2M seed funding' },
  { year: '2021', event: 'Launched v1.0 with 500 beta users and achieved $100K ARR' },
  { year: '2022', event: 'Raised $12M Series A. Launched CRM and email automation features' },
  { year: '2023', event: 'Hit 20,000 users and $8M ARR. Added AI optimization engine' },
  { year: '2024', event: '50,000+ users, $28M ARR, and #1 funnel builder on G2 and Capterra' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-dark section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-purple opacity-40" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-6">
            <Award className="w-4 h-4 text-accent-400" /> #1 Rated Funnel Builder 2024
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6">
            We're on a Mission to Make Every Business <span className="bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text text-transparent">Unstoppable</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Funneling was founded to level the playing field — giving every entrepreneur access to the same high-converting sales infrastructure that Fortune 500 companies use.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50,000+', label: 'Active Businesses', icon: Building2 },
              { value: '$2.4B+', label: 'Revenue Generated', icon: DollarSign },
              { value: '148', label: 'Countries', icon: Globe },
              { value: '4.9/5', label: 'Customer Rating', icon: Star },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-3xl font-display font-black gradient-text-brand">{value}</p>
                <p className="text-gray-500 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-purple mb-4 inline-block">Our Story</span>
            <h2 className="text-4xl font-display font-black text-gray-900 mb-4">From Frustration to <span className="gradient-text">Revolution</span></h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              In 2020, our founders Marcus and Alicia were running a digital agency. They were frustrated by having to juggle 8+ different tools — a funnel builder here, a CRM there, email marketing somewhere else, analytics elsewhere. The costs were astronomical, the integrations were buggy, and the data was always out of sync.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              So they built Funneling — a unified platform where everything works together seamlessly. One login, one dashboard, one source of truth for your entire marketing and sales stack.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, 50,000+ businesses trust Funneling to run their entire growth operations — from first click to closed deal to repeat purchase. And we're just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-purple mb-4 inline-block">Our Values</span>
            <h2 className="text-4xl font-display font-black text-gray-900">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-premium p-6 text-center group">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-purple mb-4 inline-block">Journey</span>
            <h2 className="text-4xl font-display font-black text-gray-900">Our Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
            {MILESTONES.map(({ year, event }, i) => (
              <div key={year} className="flex gap-6 mb-8 relative">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 z-10 shadow-brand">{year}</div>
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-card border border-gray-100 mt-2">
                  <p className="text-gray-700 leading-relaxed">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-purple mb-4 inline-block">The Team</span>
            <h2 className="text-4xl font-display font-black text-gray-900">Meet the Builders</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(({ name, role, avatar, bio }) => (
              <div key={name} className="card-premium p-6 text-center group">
                <img src={avatar} alt={name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 group-hover:scale-105 transition-transform" />
                <h3 className="font-display font-bold text-gray-900 mb-0.5">{name}</h3>
                <p className="text-primary-600 text-sm font-medium mb-3">{role}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{bio}</p>
                <div className="flex gap-2 justify-center">
                  <button className="p-2 bg-gray-100 hover:bg-primary-100 rounded-lg transition-colors"><Linkedin className="w-4 h-4 text-gray-500 hover:text-primary-600" /></button>
                  <button className="p-2 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors"><Twitter className="w-4 h-4 text-gray-500 hover:text-blue-500" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-purple opacity-30" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-display font-black text-white mb-4">Join 50,000+ Growing Businesses</h2>
          <p className="text-white/70 text-lg mb-8">Start your 14-day free trial and see why businesses choose Funneling.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AuthAwareLink intent="trial" guestTo="/register" className="btn-accent text-lg py-4 px-8">Start Free Trial <ArrowRight className="w-5 h-5" /></AuthAwareLink>
            <Link to="/contact" className="btn-outline border-white/40 text-white hover:bg-white/10 text-lg py-4 px-8">Contact Sales</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
