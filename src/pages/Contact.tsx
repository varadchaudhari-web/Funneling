import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all required fields'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    toast.success('Message sent! We\'ll reply within 24 hours.');
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-dark section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-purple opacity-30" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="badge-purple mb-4 inline-block">Get In Touch</span>
          <h1 className="text-5xl font-display font-black text-white mb-4">
            We'd Love to <span className="bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text text-transparent">Hear From You</span>
          </h1>
          <p className="text-xl text-white/70">Questions about pricing, features, or a custom plan? We're here to help.</p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: 'Email Support', desc: 'Get a reply within 24 hours', contact: 'hello@funneling.io', color: 'bg-blue-100 text-blue-600' },
              { icon: MessageSquare, title: 'Live Chat', desc: 'Mon–Fri, 9AM–6PM PST', contact: 'Start Live Chat', color: 'bg-green-100 text-green-600' },
              { icon: Phone, title: 'Sales Phone', desc: 'Talk to our team now', contact: '+1 (800) 123-4567', color: 'bg-purple-100 text-purple-600' },
            ].map(({ icon: Icon, title, desc, contact, color }) => (
              <div key={title} className="card-premium p-6 text-center group hover:-translate-y-1">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-2">{desc}</p>
                <p className="text-primary-600 font-semibold text-sm">{contact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="dashboard-card">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', subject: '', message: '' }); }} className="btn-outline">Send Another Message</button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Send Us a Message</h2>
                  <p className="text-gray-500 text-sm mb-6">We respond to all inquiries within 24 business hours.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="John Smith" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                        <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="john@company.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                      <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="input-field" placeholder="Your Company Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                      <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-field">
                        <option value="">Select a topic...</option>
                        <option>General Question</option>
                        <option>Sales & Pricing</option>
                        <option>Technical Support</option>
                        <option>Partnership</option>
                        <option>Agency Inquiry</option>
                        <option>Bug Report</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                      <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} className="input-field resize-none" placeholder="How can we help you today?" />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                      {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><ArrowRight className="w-4 h-4" /> Send Message</>}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {[
                    { q: 'How quickly do you respond?', a: 'We aim to respond to all inquiries within 24 business hours. Enterprise customers get 4-hour response SLA.' },
                    { q: 'Do you offer onboarding help?', a: 'Yes! All Pro and Enterprise plans include a free 60-minute onboarding call with a product specialist.' },
                    { q: 'Can I request a demo?', a: 'Absolutely! Click "Request a Demo" in our header or mention it in your message to schedule a personalized walkthrough.' },
                  ].map(({ q, a }) => (
                    <div key={q} className="card-premium p-5">
                      <p className="font-semibold text-gray-900 mb-2">{q}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-premium p-6">
                <h4 className="font-display font-bold text-gray-900 mb-4">Office Information</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">548 Market St, Suite 12000<br />San Francisco, CA 94104, USA</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-600" />
                    <p className="text-sm text-gray-600">hello@funneling.io</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <p className="text-sm text-gray-600">+1 (800) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                <h4 className="font-display font-bold text-primary-900 mb-2">🚀 Ready to Start?</h4>
                <p className="text-sm text-primary-700 mb-4">Skip the form — start your free trial and explore everything yourself in minutes.</p>
                <a href="/register" className="btn-primary text-sm py-2.5">Start 14-Day Free Trial</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
