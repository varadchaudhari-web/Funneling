import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, Upload, Trash2, Settings, Copy, Smartphone, Monitor, BarChart3, ArrowRight, ArrowLeft, ChevronRight, Zap, Check } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { FUNNEL_TEMPLATES } from '@/data/mockData';
import { toast } from 'sonner';

const STEP_TYPES = [
  { type: 'landing', label: 'Landing Page', icon: '🏠', color: 'bg-blue-100 text-blue-700' },
  { type: 'optin', label: 'Opt-in Page', icon: '📧', color: 'bg-green-100 text-green-700' },
  { type: 'sales', label: 'Sales Page', icon: '💰', color: 'bg-purple-100 text-purple-700' },
  { type: 'upsell', label: 'Upsell', icon: '⬆️', color: 'bg-orange-100 text-orange-700' },
  { type: 'downsell', label: 'Downsell', icon: '⬇️', color: 'bg-red-100 text-red-700' },
  { type: 'thankyou', label: 'Thank You', icon: '🎉', color: 'bg-teal-100 text-teal-700' },
];

const VIEWS = ['builder', 'templates', 'analytics'];

export default function FunnelBuilder() {
  const { funnels, addFunnel, updateFunnel, deleteFunnel } = useApp();
  const [view, setView] = useState<'list' | 'builder' | 'templates'>('list');
  const [selectedFunnel, setSelectedFunnel] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [newFunnelName, setNewFunnelName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const funnel = funnels.find(f => f.id === selectedFunnel);

  const handleCreateFunnel = () => {
    if (!newFunnelName.trim()) { toast.error('Please enter a funnel name'); return; }
    const template = FUNNEL_TEMPLATES.find(t => t.id === selectedTemplate);
    addFunnel({
      name: newFunnelName,
      userId: 'u1',
      status: 'draft',
      visits: 0, conversions: 0, revenue: 0,
      template: template?.name,
      steps: template ? [
        { id: 's1', name: 'Landing Page', type: 'landing', visits: 0, conversions: 0, conversionRate: 0 },
        { id: 's2', name: 'Opt-in Page', type: 'optin', visits: 0, conversions: 0, conversionRate: 0 },
        { id: 's3', name: 'Sales Page', type: 'sales', visits: 0, conversions: 0, conversionRate: 0 },
      ] : [],
    });
    setNewFunnelName('');
    setView('list');
    toast.success('Funnel created! Opening builder...');
  };

  const handlePublish = () => {
    if (selectedFunnel) {
      updateFunnel(selectedFunnel, { status: 'active' });
      setShowPublishModal(false);
      toast.success('Funnel published! It\'s now live.');
    }
  };

  const addStep = (type: string) => {
    if (!funnel) return;
    const step = { id: `s${Date.now()}`, name: STEP_TYPES.find(s => s.type === type)?.label || 'Page', type: type as any, visits: 0, conversions: 0, conversionRate: 0 };
    updateFunnel(funnel.id, { steps: [...funnel.steps, step] });
    toast.success('Step added!');
  };

  const removeStep = (stepId: string) => {
    if (!funnel) return;
    updateFunnel(funnel.id, { steps: funnel.steps.filter(s => s.id !== stepId) });
  };

  if (view === 'builder' && funnel) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          {/* Builder Header */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-100 shadow-card">
            <div className="flex items-center gap-3">
              <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="font-display font-bold text-gray-900">{funnel.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full ${funnel.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{funnel.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button onClick={() => setPreviewMode('desktop')} className={`p-2 rounded-lg transition-colors ${previewMode === 'desktop' ? 'bg-white shadow-sm' : ''}`}>
                  <Monitor className="w-4 h-4" />
                </button>
                <button onClick={() => setPreviewMode('mobile')} className={`p-2 rounded-lg transition-colors ${previewMode === 'mobile' ? 'bg-white shadow-sm' : ''}`}>
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
              <Link to="/analytics" className="btn-ghost text-sm">
                <BarChart3 className="w-4 h-4" /> Analytics
              </Link>
              <button onClick={() => setShowPublishModal(true)} className="btn-primary py-2 px-4 text-sm">
                <Upload className="w-4 h-4" /> Publish
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-4">
            {/* Steps Panel */}
            <div className="lg:col-span-1 space-y-3">
              <div className="dashboard-card">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Funnel Steps</h3>
                <div className="space-y-2">
                  {funnel.steps.map((step, i) => {
                    const stepType = STEP_TYPES.find(s => s.type === step.type);
                    return (
                      <div
                        key={step.id}
                        onClick={() => setActiveStepIdx(i)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all group ${activeStepIdx === i ? 'bg-primary-50 border-2 border-primary-300' : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'}`}
                      >
                        <span className="text-base">{stepType?.icon || '📄'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">{step.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{step.type}</p>
                        </div>
                        <button onClick={e => { e.stopPropagation(); removeStep(step.id); }} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded-lg transition-all">
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </button>
                      </div>
                    );
                  })}
                  {funnel.steps.length === 0 && (
                    <p className="text-center text-sm text-gray-400 py-4">No steps yet. Add steps below.</p>
                  )}
                </div>
              </div>

              <div className="dashboard-card">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Add Step</h3>
                <div className="grid grid-cols-2 gap-2">
                  {STEP_TYPES.map(({ type, label, icon, color }) => (
                    <button key={type} onClick={() => addStep(type)} className={`${color} p-2 rounded-xl text-xs font-semibold hover:opacity-80 transition-opacity flex flex-col items-center gap-1`}>
                      <span className="text-base">{icon}</span>
                      <span>{label.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Canvas / Preview */}
            <div className="lg:col-span-2">
              <div className={`bg-white rounded-2xl border border-gray-200 shadow-card overflow-hidden ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
                <div className="bg-gray-100 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                  <div className="flex-1 bg-white rounded-lg px-3 py-1 text-xs text-gray-500 text-center">
                    https://funnel.funneling.io/{funnel.name.toLowerCase().replace(/\s/g, '-')}
                  </div>
                </div>
                {funnel.steps[activeStepIdx] ? (
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl">{STEP_TYPES.find(s => s.type === funnel.steps[activeStepIdx]?.type)?.icon || '📄'}</span>
                      </div>
                      <h3 className="text-xl font-display font-bold text-gray-900 mb-1">{funnel.steps[activeStepIdx].name}</h3>
                      <p className="text-sm text-gray-500">Click elements to edit — drag to reorder</p>
                    </div>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-primary-300 rounded-xl p-4 text-center cursor-pointer hover:bg-primary-50 transition-colors">
                        <p className="font-display font-bold text-xl text-gray-900 mb-2">🚀 Your Headline Goes Here</p>
                        <p className="text-sm text-gray-500">Click to edit this headline text</p>
                      </div>
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <p className="text-sm text-gray-500">Sub-headline: Describe your offer and value proposition</p>
                      </div>
                      {funnel.steps[activeStepIdx].type === 'optin' || funnel.steps[activeStepIdx].type === 'landing' ? (
                        <div className="border-2 border-dashed border-green-300 rounded-xl p-4 bg-green-50">
                          <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2" placeholder="Enter your email address..." readOnly />
                          <button className="w-full bg-accent-500 text-white py-2.5 rounded-xl font-bold text-sm">Get Instant Access →</button>
                        </div>
                      ) : funnel.steps[activeStepIdx].type === 'sales' ? (
                        <div className="border-2 border-dashed border-purple-300 rounded-xl p-4 bg-purple-50 text-center">
                          <p className="text-3xl font-black text-gray-900 mb-1">$997</p>
                          <p className="text-xs text-gray-500 mb-3">One-time payment · Instant access</p>
                          <button className="w-full bg-primary-500 text-white py-2.5 rounded-xl font-bold text-sm">Buy Now →</button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="text-5xl mb-3">🏗️</div>
                    <p className="text-gray-500 text-sm">Select a step on the left or add a new one to start building</p>
                  </div>
                )}
              </div>
            </div>

            {/* Properties Panel */}
            <div className="lg:col-span-1 space-y-3">
              <div className="dashboard-card">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Page Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">Page Title</label>
                    <input className="input-field text-sm py-2" defaultValue={funnel.steps[activeStepIdx]?.name || 'Landing Page'} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">URL Slug</label>
                    <input className="input-field text-sm py-2" defaultValue="landing-page" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">Background Color</label>
                    <div className="flex gap-2">
                      {['#FFFFFF', '#7C3AED', '#1E1B4B', '#F9FAFB', '#F97316'].map(c => (
                        <button key={c} className="w-7 h-7 rounded-lg border-2 border-gray-200 hover:scale-110 transition-transform" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">SEO Description</label>
                    <textarea className="input-field text-sm py-2 resize-none h-20" placeholder="Meta description..." />
                  </div>
                </div>
              </div>

              {funnel.steps[activeStepIdx] && (
                <div className="dashboard-card">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Step Analytics</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Visits', value: funnel.steps[activeStepIdx].visits.toLocaleString() },
                      { label: 'Conversions', value: funnel.steps[activeStepIdx].conversions.toLocaleString() },
                      { label: 'Conv. Rate', value: `${funnel.steps[activeStepIdx].conversionRate}%` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-semibold text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showPublishModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-scale-in">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Publish Funnel</h3>
                <p className="text-gray-500 text-sm">Your funnel will go live at:</p>
                <p className="text-primary-600 font-mono text-sm mt-1">funnel.funneling.io/{funnel.name.toLowerCase().replace(/\s/g, '-')}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowPublishModal(false)} className="flex-1 btn-outline justify-center">Cancel</button>
                <button onClick={handlePublish} className="flex-1 btn-primary justify-center">
                  <Check className="w-4 h-4" /> Publish Live
                </button>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">Funnel Builder</h1>
            <p className="text-gray-500 text-sm mt-1">Build and manage your sales funnels</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView('templates')} className="btn-outline py-2 px-4 text-sm">
              Browse Templates
            </button>
            <button onClick={() => setView('templates')} className="btn-primary py-2 px-4 text-sm">
              <Plus className="w-4 h-4" /> New Funnel
            </button>
          </div>
        </div>

        {view === 'templates' ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setView('list')} className="btn-ghost">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <h2 className="font-display font-bold text-gray-900">Choose a Template</h2>
            </div>
            <div className="dashboard-card">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Funnel Name</label>
                <input value={newFunnelName} onChange={e => setNewFunnelName(e.target.value)} className="input-field" placeholder="e.g. My Product Launch Funnel" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {FUNNEL_TEMPLATES.map(t => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id === selectedTemplate ? null : t.id)}
                  className={`card-premium overflow-hidden cursor-pointer transition-all ${selectedTemplate === t.id ? 'ring-2 ring-primary-500 shadow-brand' : ''}`}
                >
                  <img src={t.thumbnail} alt={t.name} className="w-full h-36 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm text-gray-900">{t.name}</h3>
                      {selectedTemplate === t.id && <Check className="w-4 h-4 text-primary-600" />}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{t.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{t.steps} steps</span>
                      <span className="text-green-600 font-semibold text-xs">{t.conversion} CVR</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => { setSelectedTemplate(null); setView('list'); }} className="btn-outline">Cancel</button>
              <button onClick={handleCreateFunnel} className="btn-primary">
                <Zap className="w-4 h-4" /> Create Funnel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: 'Total Funnels', value: funnels.length, icon: '⚡' },
                { label: 'Active Funnels', value: funnels.filter(f => f.status === 'active').length, icon: '🟢' },
                { label: 'Total Revenue', value: `$${funnels.reduce((s, f) => s + f.revenue, 0).toLocaleString()}`, icon: '💰' },
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {funnels.map(f => (
                <div key={f.id} className="card-premium overflow-hidden">
                  <div className={`h-2 ${f.status === 'active' ? 'bg-gradient-brand' : f.status === 'draft' ? 'bg-gray-300' : 'bg-amber-400'}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display font-bold text-gray-900 mb-1">{f.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.status === 'active' ? 'bg-green-100 text-green-700' : f.status === 'draft' ? 'bg-gray-100 text-gray-500' : 'bg-amber-100 text-amber-700'}`}>
                          {f.status}
                        </span>
                      </div>
                      <button onClick={() => deleteFunnel(f.id)} className="p-1.5 hover:bg-red-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { label: 'Visits', value: f.visits.toLocaleString() },
                        { label: 'Conversions', value: f.conversions.toLocaleString() },
                        { label: 'Revenue', value: `$${(f.revenue/1000).toFixed(1)}k` },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-center bg-gray-50 rounded-xl p-2">
                          <p className="font-bold text-gray-900 text-sm">{value}</p>
                          <p className="text-xs text-gray-500">{label}</p>
                        </div>
                      ))}
                    </div>
                    {f.steps.length > 0 && (
                      <div className="flex items-center gap-1 mb-4 overflow-hidden">
                        {f.steps.slice(0, 4).map((step, i) => (
                          <div key={step.id} className="flex items-center gap-1">
                            <div className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                              {STEP_TYPES.find(s => s.type === step.type)?.icon} {step.type}
                            </div>
                            {i < f.steps.slice(0, 4).length - 1 && <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />}
                          </div>
                        ))}
                        {f.steps.length > 4 && <span className="text-xs text-gray-400">+{f.steps.length - 4}</span>}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedFunnel(f.id); setView('builder'); }} className="flex-1 btn-primary py-2 text-xs justify-center">
                        <Settings className="w-3 h-3" /> Edit
                      </button>
                      <button className="p-2 btn-outline text-xs" onClick={() => toast.success('Preview opened!')}>
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 btn-outline text-xs" onClick={() => toast.success('Funnel duplicated!')}>
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
