import { useState } from 'react';
import { Search, Plus, Filter, Tag, Mail, Phone, Star, Trash2, Edit, ChevronDown } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import type { Lead } from '@/types';
import { toast } from 'sonner';

const STAGES = ['new', 'contacted', 'qualified', 'proposal', 'closed_won', 'closed_lost'];
const STAGE_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-purple-100 text-purple-700',
  proposal: 'bg-orange-100 text-orange-700',
  closed_won: 'bg-green-100 text-green-700',
  closed_lost: 'bg-red-100 text-red-700',
};

const VIEWS = ['list', 'pipeline', 'add'] as const;
const INITIAL_LEAD_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  source: 'Organic',
  status: 'new' as Lead['status'],
  score: 50,
  value: 0,
};
type LeadFormFieldKey = 'name' | 'email' | 'phone' | 'company' | 'value' | 'score';
const LEAD_FORM_FIELDS = [
  { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'John Smith' },
  { label: 'Email *', key: 'email', type: 'email', placeholder: 'john@company.com' },
  { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+1 555-0100' },
  { label: 'Company', key: 'company', type: 'text', placeholder: 'Acme Corp' },
  { label: 'Deal Value ($)', key: 'value', type: 'number', placeholder: '5000' },
  { label: 'Lead Score (0-100)', key: 'score', type: 'number', placeholder: '50' },
] satisfies Array<{ label: string; key: LeadFormFieldKey; type: string; placeholder: string }>;

export default function CRMDashboard() {
  const { leads, addLead, updateLead, deleteLead } = useApp();
  const [view, setView] = useState<typeof VIEWS[number]>('list');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [form, setForm] = useState(INITIAL_LEAD_FORM);

  const filtered = leads.filter(l =>
    (filterStatus === 'all' || l.status === filterStatus) &&
    (l.name.toLowerCase().includes(search.toLowerCase()) || l.email.includes(search) || (l.company || '').toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddLead = () => {
    if (!form.name || !form.email) { toast.error('Name and email are required'); return; }
    addLead({ ...form, tags: [form.source.toLowerCase()] });
    setForm(INITIAL_LEAD_FORM);
    setView('list');
    toast.success(`Lead "${form.name}" added!`);
  };

  const scoreColor = (score: number) => score >= 80 ? 'text-green-600 bg-green-100' : score >= 60 ? 'text-yellow-600 bg-yellow-100' : 'text-red-500 bg-red-100';

  const stageLeads = (stage: string) => leads.filter(l => l.status === stage);
  const stageValue = (stage: string) => leads.filter(l => l.status === stage).reduce((s, l) => s + (l.value || 0), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900">CRM Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">{leads.length} total contacts · {leads.filter(l => l.status === 'new').length} new today</p>
          </div>
          <div className="flex gap-2">
            {(['list', 'pipeline'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${view === v ? 'bg-primary-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'}`}>
                {v}
              </button>
            ))}
            <button onClick={() => setView('add')} className="btn-primary py-2 px-4 text-sm">
              <Plus className="w-4 h-4" /> Add Lead
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {STAGES.map(stage => (
            <div key={stage} className="dashboard-card text-center py-3">
              <p className="text-xl font-bold text-gray-900">{stageLeads(stage).length}</p>
              <p className="text-xs text-gray-500 capitalize">{stage.replace('_', ' ')}</p>
              <p className="text-xs text-primary-600 font-medium">${stageValue(stage).toLocaleString()}</p>
            </div>
          ))}
        </div>

        {view === 'add' && (
          <div className="dashboard-card max-w-2xl">
            <h2 className="font-display font-bold text-gray-900 mb-4">Add New Lead</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {LEAD_FORM_FIELDS.map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value) : e.target.value })} className="input-field" placeholder={placeholder} />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Source</label>
                <select value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} className="input-field">
                  {['Organic', 'Facebook Ads', 'Google Ads', 'Email', 'Referral', 'LinkedIn', 'Webinar'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Lead['status'] })} className="input-field">
                  {STAGES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setView('list')} className="btn-outline">Cancel</button>
              <button onClick={handleAddLead} className="btn-primary">Add Lead</button>
            </div>
          </div>
        )}

        {view === 'pipeline' && (
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {STAGES.map(stage => (
                <div key={stage} className="w-64 flex-shrink-0">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${STAGE_COLORS[stage]}`}>{stage.replace('_', ' ')}</span>
                    </div>
                    <span className="text-xs text-gray-500">{stageLeads(stage).length}</span>
                  </div>
                  <div className="space-y-2">
                    {stageLeads(stage).map(lead => (
                      <div key={lead.id} className="bg-white rounded-xl border border-gray-100 shadow-card p-3 cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-all" onClick={() => setSelectedLead(lead)}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 bg-gradient-brand rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{lead.name.charAt(0)}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 truncate">{lead.name}</p>
                            <p className="text-xs text-gray-400 truncate">{lead.company || lead.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${scoreColor(lead.score)}`}>Score: {lead.score}</span>
                          {lead.value && <span className="text-xs font-semibold text-green-600">${lead.value.toLocaleString()}</span>}
                        </div>
                      </div>
                    ))}
                    <button onClick={() => setView('add')} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-xs text-gray-400 hover:border-primary-300 hover:text-primary-500 transition-colors flex items-center justify-center gap-1">
                      <Plus className="w-3 h-3" /> Add Lead
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'list' && (
          <>
            <div className="flex gap-3 flex-wrap">
              <div className="relative flex-1 min-w-48">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9 py-2 text-sm" placeholder="Search leads..." />
              </div>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input-field w-auto py-2 text-sm">
                <option value="all">All Status</option>
                {STAGES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
              </select>
            </div>

            <div className="dashboard-card overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Lead', 'Score', 'Source', 'Status', 'Value', 'Tags', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map(lead => (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center text-white text-xs font-bold">{lead.name.charAt(0)}</div>
                            <div>
                              <p className="font-semibold text-sm text-gray-900">{lead.name}</p>
                              <p className="text-xs text-gray-400">{lead.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${scoreColor(lead.score)}`}>{lead.score}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{lead.source}</td>
                        <td className="px-4 py-3">
                          <select
                            value={lead.status}
                            onChange={e => { updateLead(lead.id, { status: e.target.value as Lead['status'] }); toast.success('Status updated!'); }}
                            className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STAGE_COLORS[lead.status]}`}
                          >
                            {STAGES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-green-600">{lead.value ? `$${lead.value.toLocaleString()}` : '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 flex-wrap">
                            {lead.tags.slice(0, 2).map(tag => <span key={tag} className="tag">{tag}</span>)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button onClick={() => setSelectedLead(lead)} className="p-1.5 hover:bg-primary-100 rounded-lg transition-colors" title="View"><Edit className="w-3.5 h-3.5 text-primary-600" /></button>
                            <button onClick={() => toast.success('Email composed!')} className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors" title="Email"><Mail className="w-3.5 h-3.5 text-blue-600" /></button>
                            <button onClick={() => deleteLead(lead.id)} className="p-1.5 hover:bg-red-100 rounded-lg transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <Search className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                    <p>No leads found matching your search</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedLead(null)}>
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full animate-scale-in" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-brand rounded-2xl flex items-center justify-center text-white text-2xl font-bold">{selectedLead.name.charAt(0)}</div>
                <div>
                  <h3 className="text-xl font-display font-bold text-gray-900">{selectedLead.name}</h3>
                  <p className="text-gray-500">{selectedLead.email}</p>
                  {selectedLead.company && <p className="text-sm text-gray-400">{selectedLead.company}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Lead Score', value: selectedLead.score, extra: scoreColor(selectedLead.score) },
                  { label: 'Deal Value', value: selectedLead.value ? `$${selectedLead.value.toLocaleString()}` : 'N/A' },
                  { label: 'Source', value: selectedLead.source },
                  { label: 'Created', value: selectedLead.createdAt },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="font-semibold text-sm text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">STATUS</p>
                <span className={`text-sm font-semibold px-3 py-1.5 rounded-full capitalize ${STAGE_COLORS[selectedLead.status]}`}>{selectedLead.status.replace('_', ' ')}</span>
              </div>
              {selectedLead.notes && (
                <div className="mb-4 bg-amber-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">NOTES</p>
                  <p className="text-sm text-gray-700">{selectedLead.notes}</p>
                </div>
              )}
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => { updateLead(selectedLead.id, { status: 'qualified' }); toast.success('Moved to Qualified!'); setSelectedLead(null); }} className="btn-primary text-sm py-2 px-4">
                  Move to Qualified
                </button>
                <button onClick={() => toast.success('Email sent!')} className="btn-outline text-sm py-2 px-4">
                  <Mail className="w-4 h-4" /> Send Email
                </button>
                <button onClick={() => setSelectedLead(null)} className="btn-ghost text-sm">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
