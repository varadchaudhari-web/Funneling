import { useState } from 'react';
import { Globe, Plus, Settings, Eye, ArrowLeft, Smartphone, Monitor, Upload, Search, Check, Palette } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { WEBSITE_TEMPLATES } from '@/data/mockData';
import { toast } from 'sonner';

const SECTIONS = [
  { id: 'nav', label: 'Navigation', icon: '🧭' },
  { id: 'hero', label: 'Hero Section', icon: '🦸' },
  { id: 'features', label: 'Features', icon: '✨' },
  { id: 'about', label: 'About', icon: '👤' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬' },
  { id: 'pricing', label: 'Pricing', icon: '💰' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
  { id: 'cta', label: 'CTA Banner', icon: '🎯' },
  { id: 'footer', label: 'Footer', icon: '📋' },
  { id: 'blog', label: 'Blog Grid', icon: '📝' },
  { id: 'gallery', label: 'Image Gallery', icon: '🖼️' },
  { id: 'contact', label: 'Contact Form', icon: '📧' },
];

const MY_WEBSITES = [
  { id: 'w1', name: 'My SaaS Website', template: 'SaaS Landing', status: 'published', domain: 'mycompany.funneling.io', visitors: 8420, pages: 5, thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=240&fit=crop' },
  { id: 'w2', name: 'Agency Portfolio', template: 'Agency', status: 'draft', domain: 'agency.funneling.io', visitors: 0, pages: 3, thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=240&fit=crop' },
];

type View = 'list' | 'templates' | 'editor';

export default function WebsiteBuilder() {
  const [view, setView] = useState<View>('list');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activePage, setActivePage] = useState('Home');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [pageContent, setPageContent] = useState({ headline: 'Build, Convert & Scale', subheadline: 'The all-in-one platform for your business growth', ctaText: 'Get Started Free', color: '#7C3AED' });
  const [filterCat, setFilterCat] = useState('All');
  const [seoSettings, setSeoSettings] = useState({ title: 'My Website', desc: '', domain: '' });

  const categories = ['All', ...Array.from(new Set(WEBSITE_TEMPLATES.map(t => t.category)))];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {view === 'list' && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900">Website Builder</h1>
                <p className="text-gray-500 text-sm mt-1">Build professional websites with drag-and-drop ease</p>
              </div>
              <button onClick={() => setView('templates')} className="btn-primary">
                <Plus className="w-4 h-4" /> Create Website
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: 'Total Websites', value: MY_WEBSITES.length, icon: '🌐' },
                { label: 'Monthly Visitors', value: MY_WEBSITES.reduce((s, w) => s + w.visitors, 0).toLocaleString(), icon: '👥' },
                { label: 'Published Sites', value: MY_WEBSITES.filter(w => w.status === 'published').length, icon: '🚀' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="dashboard-card flex items-center gap-4">
                  <span className="text-3xl">{icon}</span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {MY_WEBSITES.map(site => (
                <div key={site.id} className="card-premium overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img src={site.thumbnail} alt={site.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${site.status === 'published' ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'}`}>{site.status}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display font-bold text-gray-900">{site.name}</h3>
                        <div className="flex items-center gap-1 text-primary-600 text-xs mt-1">
                          <Globe className="w-3 h-3" />
                          <span>{site.domain}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { label: 'Visitors', value: site.visitors.toLocaleString() },
                        { label: 'Pages', value: site.pages },
                        { label: 'Template', value: site.template.split(' ')[0] },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-center bg-gray-50 rounded-xl p-2">
                          <p className="font-bold text-sm text-gray-900">{value}</p>
                          <p className="text-xs text-gray-400">{label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setView('editor')} className="flex-1 btn-primary text-sm py-2 justify-center">
                        <Settings className="w-4 h-4" /> Edit Website
                      </button>
                      <button onClick={() => toast.success('Opened in preview!')} className="p-2 btn-outline"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => toast.success('Domain settings opened!')} className="p-2 btn-outline"><Globe className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => setView('templates')} className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary-400 hover:bg-primary-50 transition-all group">
                <Plus className="w-10 h-10 text-gray-400 group-hover:text-primary-500 mx-auto mb-3 transition-colors" />
                <p className="font-semibold text-gray-600 group-hover:text-primary-600">Create New Website</p>
                <p className="text-sm text-gray-400 mt-1">Choose from 20+ templates</p>
              </button>
            </div>
          </>
        )}

        {view === 'templates' && (
          <>
            <div className="flex items-center gap-3">
              <button onClick={() => setView('list')} className="btn-ghost"><ArrowLeft className="w-4 h-4" /> Back</button>
              <h2 className="font-display font-bold text-gray-900">Choose Template</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilterCat(cat)} className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${filterCat === cat ? 'bg-primary-500 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{cat}</button>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {WEBSITE_TEMPLATES.filter(t => filterCat === 'All' || t.category === filterCat).map(t => (
                <div key={t.id} onClick={() => setSelectedTemplate(t.id === selectedTemplate ? null : t.id)} className={`card-premium overflow-hidden cursor-pointer transition-all ${selectedTemplate === t.id ? 'ring-2 ring-primary-500 shadow-brand' : ''}`}>
                  <div className="relative">
                    <img src={t.thumbnail} alt={t.name} className="w-full h-36 object-cover" />
                    {t.popular && <div className="absolute top-2 left-2 bg-accent-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Popular</div>}
                    {selectedTemplate === t.id && <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.category}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setView('list')} className="btn-outline">Cancel</button>
              <button onClick={() => { if (!selectedTemplate) { toast.error('Please select a template'); return; } setView('editor'); }} className="btn-primary">
                Use Template <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </>
        )}

        {view === 'editor' && (
          <>
            {/* Editor Header */}
            <div className="flex items-center justify-between bg-white rounded-2xl p-3 border border-gray-100 shadow-card">
              <div className="flex items-center gap-3">
                <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-xl"><ArrowLeft className="w-4 h-4" /></button>
                <span className="font-bold text-gray-900 text-sm">Website Editor</span>
                <div className="flex gap-1">
                  {['Home', 'About', 'Features', 'Pricing', 'Contact'].map(p => (
                    <button key={p} onClick={() => setActivePage(p)} className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${activePage === p ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100'}`}>{p}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button onClick={() => setPreviewMode('desktop')} className={`p-1.5 rounded-lg ${previewMode === 'desktop' ? 'bg-white shadow-sm' : ''}`}><Monitor className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setPreviewMode('mobile')} className={`p-1.5 rounded-lg ${previewMode === 'mobile' ? 'bg-white shadow-sm' : ''}`}><Smartphone className="w-3.5 h-3.5" /></button>
                </div>
                <button onClick={() => toast.success('Website published! Live at mysite.funneling.io')} className="btn-primary text-xs py-2 px-4">
                  <Upload className="w-3.5 h-3.5" /> Publish
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-4">
              {/* Sections Panel */}
              <div className="dashboard-card">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Sections</h3>
                <div className="space-y-1">
                  {SECTIONS.map(({ id, label, icon }) => (
                    <button key={id} onClick={() => setActiveSection(id === activeSection ? null : id)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-sm transition-all ${activeSection === id ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <span>{icon}</span>{label}
                    </button>
                  ))}
                </div>
                <button onClick={() => toast.success('New section added!')} className="w-full mt-3 py-2 border-2 border-dashed border-gray-200 rounded-xl text-xs text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-colors flex items-center justify-center gap-1">
                  <Plus className="w-3 h-3" /> Add Section
                </button>
              </div>

              {/* Canvas */}
              <div className={`lg:col-span-2 ${previewMode === 'mobile' ? 'max-w-xs mx-auto' : ''}`}>
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-card">
                  <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 text-xs">
                    <div className="flex gap-1"><div className="w-2.5 h-2.5 bg-red-400 rounded-full" /><div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" /><div className="w-2.5 h-2.5 bg-green-400 rounded-full" /></div>
                    <span className="text-gray-500 flex-1 text-center">mysite.funneling.io/{activePage.toLowerCase()}</span>
                  </div>
                  {/* Mini website preview */}
                  <div className="overflow-y-auto max-h-[500px]">
                    {/* Nav */}
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 bg-primary-500 rounded"></div>
                        <span className="font-bold text-xs text-gray-900">Brand</span>
                      </div>
                      <div className="flex gap-2">
                        {['Home', 'Features', 'Pricing'].map(n => <span key={n} className="text-xs text-gray-500">{n}</span>)}
                      </div>
                      <div className="w-14 h-5 bg-primary-500 rounded-full" />
                    </div>
                    {/* Hero */}
                    <div className="bg-gradient-to-br from-primary-900 to-secondary-900 p-8 text-center">
                      <h2 className="text-lg font-black text-white mb-2 cursor-text border-b border-transparent hover:border-white/30 inline-block" contentEditable suppressContentEditableWarning>{pageContent.headline}</h2>
                      <p className="text-white/70 text-xs mb-4 max-w-xs mx-auto">{pageContent.subheadline}</p>
                      <button className="bg-accent-500 text-white text-xs font-bold px-5 py-2 rounded-xl">{pageContent.ctaText}</button>
                    </div>
                    {/* Features preview */}
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-3 gap-2">
                        {['⚡ Fast', '🎨 Beautiful', '📊 Analytics'].map(f => (
                          <div key={f} className="bg-gray-50 rounded-lg p-2 text-center text-xs text-gray-700">{f}</div>
                        ))}
                      </div>
                    </div>
                    {/* CTA */}
                    <div className="bg-primary-50 p-4 text-center">
                      <p className="text-xs font-bold text-gray-900 mb-2">Ready to get started?</p>
                      <button className="bg-primary-500 text-white text-xs px-4 py-1.5 rounded-lg">Start Free Trial</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Properties */}
              <div className="space-y-3">
                <div className="dashboard-card">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Page Content</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">Main Headline</label>
                      <input value={pageContent.headline} onChange={e => setPageContent({ ...pageContent, headline: e.target.value })} className="input-field text-sm py-2" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">Subheadline</label>
                      <textarea value={pageContent.subheadline} onChange={e => setPageContent({ ...pageContent, subheadline: e.target.value })} className="input-field text-sm py-2 resize-none h-16" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">CTA Button Text</label>
                      <input value={pageContent.ctaText} onChange={e => setPageContent({ ...pageContent, ctaText: e.target.value })} className="input-field text-sm py-2" />
                    </div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2"><Globe className="w-4 h-4" /> SEO & Domain</h3>
                  <div className="space-y-2">
                    <input value={seoSettings.title} onChange={e => setSeoSettings({ ...seoSettings, title: e.target.value })} className="input-field text-sm py-2" placeholder="Page Title" />
                    <input value={seoSettings.domain} onChange={e => setSeoSettings({ ...seoSettings, domain: e.target.value })} className="input-field text-sm py-2" placeholder="Custom domain (optional)" />
                    <button onClick={() => toast.success('SEO settings saved!')} className="btn-primary w-full justify-center text-xs py-2">Save SEO Settings</button>
                  </div>
                </div>
                <div className="dashboard-card">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2"><Palette className="w-4 h-4" /> Theme Color</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['#7C3AED', '#4F46E5', '#F97316', '#10B981', '#EF4444', '#1E1B4B'].map(c => (
                      <button key={c} className="h-8 rounded-lg border-2 border-white shadow-sm hover:scale-105 transition-transform" style={{ background: c }} onClick={() => { setPageContent({ ...pageContent, color: c }); toast.success('Theme color updated!'); }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
