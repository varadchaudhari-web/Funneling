import { Type, FileText, Square, Image, Video, Clipboard, MessageSquare, Minus, CheckSquare, DollarSign, Palette, Eye, Target, Plus, Trash2, Upload, Smartphone, Monitor, Settings, ArrowLeft, Globe, Search, Check, Clock, MoveVertical } from "lucide-react";
import { useState } from 'react';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { FUNNEL_TEMPLATES } from '@/data/mockData';
import { toast } from 'sonner';

const ELEMENTS = [
  { type: 'headline', label: 'Headline', icon: Type },
  { type: 'subheadline', label: 'Subheadline', icon: FileText },
  { type: 'button', label: 'CTA Button', icon: Square },
  { type: 'image', label: 'Image', icon: Image as ImageIcon },
  { type: 'video', label: 'Video', icon: Video },
  { type: 'form', label: 'Opt-in Form', icon: Clipboard },
  { type: 'countdown', label: 'Countdown', icon: Clock },
  { type: 'testimonial', label: 'Testimonial', icon: MessageSquare },
  { type: 'divider', label: 'Divider', icon: Minus },
  { type: 'spacer', label: 'Spacer', icon: MoveVertical },
  { type: 'features', label: 'Features List', icon: CheckSquare },
  { type: 'pricing', label: 'Pricing Box', icon: DollarSign },
];

type PageView = 'list' | 'editor';

const SAMPLE_PAGES = [
  { id: 'lp1', name: 'Lead Magnet Page', template: 'Lead Gen', status: 'published', visits: 3420, conversions: 890, updatedAt: '2024-04-28' },
  { id: 'lp2', name: 'Webinar Registration', template: 'Webinar', status: 'published', visits: 1850, conversions: 620, updatedAt: '2024-04-25' },
  { id: 'lp3', name: 'Product Promo Page', template: 'Sales', status: 'draft', visits: 0, conversions: 0, updatedAt: '2024-04-30' },
];

export default function LandingPageBuilder() {
  const [view, setView] = useState<PageView>('list');
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [pages, setPages] = useState(SAMPLE_PAGES);
  const [draggedEl, setDraggedEl] = useState<string | null>(null);
  const [pageElements, setPageElements] = useState([
    { id: 'el1', type: 'headline', content: 'Get Your FREE Guide Today', editable: true },
    { id: 'el2', type: 'subheadline', content: 'Discover the proven system used by 50,000+ businesses to generate leads on autopilot', editable: true },
    { id: 'el3', type: 'form', content: 'Email Opt-in Form', editable: false },
    { id: 'el4', type: 'button', content: 'YES! Send Me the Free Guide →', editable: true },
  ]);
  const [seoSettings, setSeoSettings] = useState({ title: 'Get Your Free Guide', desc: '', domain: 'mypage.funneling.io' });

  const addElement = (type: string) => {
    const el = ELEMENTS.find(e => e.type === type);
    setPageElements(prev => [...prev, { id: `el${Date.now()}`, type, content: el?.label || 'New Element', editable: true }]);
    toast.success(`${el?.label} added!`);
  };

  const removeElement = (id: string) => setPageElements(prev => prev.filter(e => e.id !== id));

  const page = selectedPage ? pages.find(p => p.id === selectedPage) : null;

  if (view === 'editor') {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          {/* Editor Header */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-3 border border-gray-100 shadow-card">
            <div className="flex items-center gap-3">
              <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="font-display font-bold text-gray-900 text-sm">{page?.name || 'New Landing Page'}</span>
              <span className="badge-purple text-xs">Draft</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button onClick={() => setPreviewMode('desktop')} className={`p-1.5 rounded-lg transition-colors ${previewMode === 'desktop' ? 'bg-white shadow-sm' : ''}`}><Monitor className="w-4 h-4" /></button>
                <button onClick={() => setPreviewMode('mobile')} className={`p-1.5 rounded-lg transition-colors ${previewMode === 'mobile' ? 'bg-white shadow-sm' : ''}`}><Smartphone className="w-4 h-4" /></button>
              </div>
              <button onClick={() => toast.success('Preview opened in new tab!')} className="btn-ghost text-xs py-2 px-3"><Eye className="w-3.5 h-3.5" />Preview</button>
              <button onClick={() => { toast.success('Page published! Live at: ' + seoSettings.domain); setView('list'); }} className="btn-primary text-xs py-2 px-4">
                <Upload className="w-3.5 h-3.5" /> Publish
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-4">
            {/* Elements Panel */}
            <div className="dashboard-card">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Elements</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {ELEMENTS.map(({ type, label, icon: Icon }) => (
                  <button key={type} onClick={() => addElement(type)} draggable onDragStart={() => setDraggedEl(type)} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 hover:bg-primary-50 hover:text-primary-700 transition-all text-xs font-medium text-gray-600 cursor-grab active:cursor-grabbing">
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas */}
            <div className={`lg:col-span-2 ${previewMode === 'mobile' ? 'max-w-xs mx-auto' : ''}`}>
              <div
                className="bg-white border-2 border-dashed border-gray-200 rounded-2xl min-h-96 overflow-hidden"
                onDragOver={e => e.preventDefault()}
                onDrop={() => draggedEl && addElement(draggedEl)}
              >
                <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 text-xs">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                  </div>
                  <span className="text-gray-500 flex-1 text-center">{seoSettings.domain}</span>
                </div>
                <div className="p-6 bg-gradient-to-b from-primary-900 to-secondary-900 space-y-4">
                  {pageElements.map((el) => (
                    <div key={el.id} className="relative group">
                      <div className="absolute -top-2 right-2 opacity-0 group-hover:opacity-100 flex gap-1 z-10">
                        <button onClick={() => removeElement(el.id)} className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                          <Trash2 className="w-2.5 h-2.5 text-white" />
                        </button>
                        <button className="w-5 h-5 bg-primary-500 rounded flex items-center justify-center">
                          <Settings className="w-2.5 h-2.5 text-white" />
                        </button>
                      </div>
                      {el.type === 'headline' && <h2 className="text-xl md:text-2xl font-display font-black text-white text-center border-2 border-dashed border-white/20 rounded-lg p-2 hover:border-accent-400 cursor-text">{el.content}</h2>}
                      {el.type === 'subheadline' && <p className="text-white/70 text-sm text-center border-2 border-dashed border-white/10 rounded-lg p-2 hover:border-accent-400 cursor-text">{el.content}</p>}
                      {el.type === 'button' && <button className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg">{el.content}</button>}
                      {el.type === 'form' && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <input className="w-full bg-white rounded-lg px-3 py-2.5 text-sm mb-2" placeholder="Enter your email..." readOnly />
                          <button className="w-full bg-green-500 text-white py-2.5 rounded-lg font-bold text-sm">Get Instant Access →</button>
                        </div>
                      )}
                      {el.type === 'countdown' && (
                        <div className="flex gap-3 justify-center">
                          {['00', '23', '59', '47'].map((v, i) => (
                            <div key={i} className="bg-white/20 rounded-xl p-3 text-center min-w-[52px]">
                              <p className="text-2xl font-black text-white font-mono">{v}</p>
                              <p className="text-white/60 text-xs">{['Days', 'Hrs', 'Min', 'Sec'][i]}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {el.type === 'testimonial' && (
                        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                          <p className="text-white/80 text-sm italic mb-2">"This changed everything for my business!"</p>
                          <p className="text-white/60 text-xs">— John Smith, CEO</p>
                        </div>
                      )}
                      {!['headline', 'subheadline', 'button', 'form', 'countdown', 'testimonial'].includes(el.type) && (
                        <div className="bg-white/10 rounded-xl p-3 text-center text-white/60 text-sm border-2 border-dashed border-white/20">{el.content}</div>
                      )}
                    </div>
                  ))}
                  {pageElements.length === 0 && (
                    <div className="text-center py-12 text-white/40">
                      <div className="flex justify-center mb-2"><Palette className="w-10 h-10 text-gray-400" /></div>
                      <p className="text-sm">Drag & drop elements here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            <div className="space-y-3">
              <div className="dashboard-card">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">SEO Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">Page Title</label>
                    <input value={seoSettings.title} onChange={e => setSeoSettings({ ...seoSettings, title: e.target.value })} className="input-field text-sm py-2" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">Meta Description</label>
                    <textarea value={seoSettings.desc} onChange={e => setSeoSettings({ ...seoSettings, desc: e.target.value })} className="input-field text-sm py-2 resize-none h-16" placeholder="Page description for search engines..." />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">Custom Domain</label>
                    <div className="flex gap-2">
                      <input value={seoSettings.domain} onChange={e => setSeoSettings({ ...seoSettings, domain: e.target.value })} className="input-field text-sm py-2 flex-1" />
                      <button onClick={() => toast.success('Domain connected!')} className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors">
                        <Globe className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-card">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Page Style</h3>
                <div className="grid grid-cols-3 gap-1.5">
                  {['#7C3AED', '#1E1B4B', '#FFFFFF', '#000000', '#F97316', '#10B981'].map(color => (
                    <button key={color} className="h-8 rounded-lg border-2 border-gray-200 hover:scale-105 transition-transform" style={{ background: color }} onClick={() => toast.success('Color applied!')} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">Landing Page Builder</h1>
            <p className="text-gray-500 text-sm mt-1">Create high-converting landing pages in minutes</p>
          </div>
          <button onClick={() => { setSelectedPage(null); setView('editor'); }} className="btn-primary">
            <Plus className="w-4 h-4" /> Create Landing Page
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Pages', value: pages.length, icon: FileText },
            { label: 'Total Visits', value: pages.reduce((s, p) => s + p.visits, 0).toLocaleString(), icon: Eye },
            { label: 'Conversions', value: pages.reduce((s, p) => s + p.conversions, 0).toLocaleString(), icon: Target },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="dashboard-card flex items-center gap-3">
              <div className="w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Template Gallery */}
        <div>
          <h2 className="font-display font-bold text-gray-900 mb-4">Start From a Template</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {FUNNEL_TEMPLATES.slice(0, 4).map(t => (
              <div key={t.id} onClick={() => { setSelectedPage(null); setView('editor'); }} className="card-premium overflow-hidden cursor-pointer group">
                <div className="relative overflow-hidden">
                  <img src={t.thumbnail} alt={t.name} className="w-full h-32 object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-primary-700 font-semibold text-sm px-4 py-2 rounded-xl">Use Template</button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-green-600 font-medium">{t.conversion} avg CVR</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Pages */}
        <div>
          <h2 className="font-display font-bold text-gray-900 mb-4">My Landing Pages</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {pages.map(p => (
              <div key={p.id} className="card-premium overflow-hidden">
                <div className={`h-2 ${p.status === 'published' ? 'bg-gradient-brand' : 'bg-gray-300'}`} />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{p.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{p.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="text-center bg-gray-50 rounded-xl p-2">
                      <p className="font-bold text-sm">{p.visits.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Visits</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-xl p-2">
                      <p className="font-bold text-sm text-green-600">{p.conversions.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Converts</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedPage(p.id); setView('editor'); }} className="flex-1 btn-primary text-xs py-2 justify-center">
                      <Settings className="w-3 h-3" /> Edit
                    </button>
                    <button onClick={() => toast.success('Preview opened!')} className="p-2 btn-outline"><Eye className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
