import ChapterFooter from '../../ChapterFooter.jsx';
import React, { useState } from 'react';
import {
  ClipboardList,
  Layers,
  Gavel,
  Database,
  ShieldCheck,
  AlertCircle,
  Search,
  BarChart3,
  Lock,
  EyeOff,
  DollarSign,
  Info,
  Trash2,
  Download,
  Plus,
  X
} from 'lucide-react';

const TABS = [
  { id: 'audit', icon: ShieldCheck, label: 'Audit' },
  { id: 'classify', icon: Layers, label: 'Classify' },
  { id: 'cases', icon: Gavel, label: 'Legal' },
  { id: 'ledger', icon: Database, label: 'Ledger' },
];

export default function Chapter02() {
  const [activeTab, setActiveTab] = useState('audit');

  return (
    <div>
      <div className="chapter-header">
        <div className="ch-label">Chapter 2
</div>
        <h1>Inventory &amp; Classification</h1>
        <p>Audit assets, classify by type, and prioritize by legal and business value.</p>
</div>

      <div className="tab-bar" role="tablist" aria-label="Chapter sections">
        {TABS.map((t, idx) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              className="tab-btn"
              tabIndex={activeTab === t.id ? 0 : -1}
              onClick={() => setActiveTab(t.id)}
              onKeyDown={(e) => {
                const len = TABS.length;
                let next = null;
                if (e.key === 'ArrowRight') next = (idx + 1) % len;
                else if (e.key === 'ArrowLeft') next = (idx - 1 + len) % len;
                else if (e.key === 'Home') next = 0;
                else if (e.key === 'End') next = len - 1;
                if (next !== null) {
                  e.preventDefault();
                  setActiveTab(TABS[next].id);
                }
              }}
            >
              <Icon size={15} />
              {t.label}
            </button>
          );
        })}
</div>

      <div>
        {activeTab === 'audit' && <IdentificationAudit />}
        {activeTab === 'classify' && <ClassificationHub />}
        {activeTab === 'cases' && <CaseExplorer />}
        {activeTab === 'ledger' && <InventoryLedger />}
</div>
</div>
  );
}

// --- TAB 1: IDENTIFICATION AUDIT ---
function IdentificationAudit() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Is it 'Information'?",
      icon: Info,
      description: "Must be a formula, pattern, compilation, program, device, method, technique, or process.",
      examples: ["Source code", "Customer preferences", "Manufacturing temperatures"],
      nonExamples: ["General employee skill", "Publicly filed patents", "Sensory impressions"]
    },
    {
      title: "Is there Independent Economic Value?",
      icon: DollarSign,
      description: "The information must make a difference to profitability, efficiency, or market standing.",
      examples: ["Cost-saving techniques", "Unique vendor terms", "Targeting algorithms"],
      nonExamples: ["Holiday party plans", "Employee vacation calendars"]
    },
    {
      title: "Is it Not Generally Known?",
      icon: EyeOff,
      description: "It must not be widely recognized or accessible to competitors in the field.",
      legalNote: "Relative secrecy is enough (e.g., shared under NDA)."
    },
    {
      title: "Is it Not Readily Ascertainable?",
      icon: Search,
      description: "Could a skilled person reconstruct this using honest effort (Reverse Engineering)?",
      legalNote: "If discovery is routine or trivial, it is not protectable."
    },
    {
      title: "Subject to Reasonable Efforts?",
      icon: Lock,
      description: "Have you treated it like a secret? (Contracts, labels, access controls).",
      legalNote: "The law protects the diligent, not the indifferent."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
        <h2 className="text-2xl font-bold mb-4">The Identification Audit</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          "You cannot protect a trade secret of which you are unaware." Use this step-by-step diagnostic to determine if an asset qualifies for protection.
        </p>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
              step === idx ? 'border-indigo-500 bg-white shadow-md' : 'border-slate-200 bg-slate-100/50 opacity-60'
            }`}
            onClick={() => setStep(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setStep(idx)}
            aria-pressed={step === idx}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${
              step === idx ? 'bg-indigo-600 text-white' : 'bg-slate-300 text-slate-500'
            }`}>
              <s.icon size={20} />
</div>
            <h3 className="font-bold text-sm mb-2">{s.title}</h3>
            {step === idx && (
              <div>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">{s.description}</p>
                {s.examples && (
                  <div className="space-y-1 mb-4">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase">Examples</p>
                    {s.examples.map(ex => <div key={ex} className="text-xs flex items-center gap-1">✓ {ex}</div>)}
</div>
                )}
                {s.legalNote && (
                  <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                    <p className="text-[10px] font-bold text-amber-700 uppercase">Legal Insight</p>
                    <p className="text-[10px] text-amber-800">{s.legalNote}</p>
</div>
                )}
</div>
            )}
</div>
        ))}
</div>
</div>
  );
}

// --- TAB 2: CLASSIFICATION HUB ---
function ClassificationHub() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <Layers className="text-indigo-600" size={28} />
          <h2 className="text-2xl font-bold">Secret Categories</h2>
</div>
        <div className="space-y-6">
          <CategoryItem
            title="Technical"
            desc="Product formulas, manufacturing processes, code, and engineering."
            color="bg-blue-50 border-blue-200 text-blue-800"
            badge="Engineering / R&D"
          />
          <CategoryItem
            title="Business"
            desc="Customer lists, pricing models, supplier terms, and tactics."
            color="bg-emerald-50 border-emerald-200 text-emerald-800"
            badge="Sales / Ops"
          />
          <CategoryItem
            title="Hybrid"
            desc="Systems that integrate data with specific algorithms (e.g., targeting software)."
            color="bg-purple-50 border-purple-200 text-purple-800"
            badge="Marketing Tech"
          />
</div>
</div>

      <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-sm overflow-hidden relative">
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <BarChart3 className="text-indigo-400" size={28} />
          <h2 className="text-2xl font-bold">Priority Tiers</h2>
</div>
        <div className="space-y-4 relative z-10">
          <PriorityTier
            level="High"
            title="Crown Jewels"
            desc="Catastrophic harm if lost. Decisive market edge. (The Coke Formula)."
            color="border-red-500 bg-red-500/10"
          />
          <PriorityTier
            level="Medium"
            title="Operational Experience"
            desc="Saves time or improves margins. Replaceable but costly. (Pricing methods)."
            color="border-amber-500 bg-amber-500/10"
          />
          <PriorityTier
            level="Low"
            title="Administrative/Legacy"
            desc="Routine tweaks or old data. Still secret, but lawsuit is unlikely."
            color="border-slate-500 bg-slate-500/10"
          />
</div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" aria-hidden="true">
</div>
</div>
</div>
  );
}

function CategoryItem({ title, desc, color, badge }) {
  return (
    <div className={`p-4 rounded-xl border ${color}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold">{title}</h3>
        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/50">{badge}</span>
</div>
      <p className="text-sm opacity-90">{desc}</p>
</div>
  );
}

function PriorityTier({ level, title, desc, color }) {
  return (
    <div className={`p-5 rounded-xl border-l-4 ${color}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-black uppercase tracking-tighter text-white/50">{level}</span>
        <h3 className="font-bold text-lg">{title}</h3>
</div>
      <p className="text-sm text-slate-300 leading-relaxed">{desc}</p>
</div>
  );
}

// --- TAB 3: CASE EXPLORER ---
function CaseExplorer() {
  const [filter, setFilter] = useState('all');

  const cases = [
    {
      name: "IDX Systems v. Epic Systems",
      theme: "Particularity",
      lesson: "Failure to isolate specific secrets from general industry knowledge makes protection impossible.",
      outcome: "Dismissed (Too broad description)."
    },
    {
      name: "Electro-Craft v. Controlled Motion",
      theme: "Reasonable Efforts",
      lesson: "Treating everything as a secret makes your efforts 'unreasonable' in the eyes of the court.",
      outcome: "Protection Denied (Over-classification)."
    },
    {
      name: "Altavion v. Konica Minolta",
      theme: "Information",
      lesson: "Early-stage technical concepts can be trade secrets if clearly described and detailed.",
      outcome: "Protectable (Specific Concepts)."
    },
    {
      name: "nClosures v. Block and Co.",
      theme: "Secrecy Efforts",
      lesson: "An NDA is not enough if your actual conduct (sharing files without labels) is lax.",
      outcome: "Dismissed (Lax practice)."
    },
    {
      name: "Chicago Lock Co. v. Fanberg",
      theme: "Reverse Engineering",
      lesson: "Information readily ascertainable by anyone who purchases the product is not a secret.",
      outcome: "No Misappropriation (Lawful discovery)."
    },
    {
      name: "Boeing v. Sierracin",
      theme: "Economic Value",
      lesson: "High commercial importance and proven efforts bolster legal status.",
      outcome: "Upheld (Valuable techniques)."
    },
    {
      name: "Fail-Safe v. A.O. Smith",
      theme: "Culture",
      lesson: "Lax maintenance and lack of internal training dooms a trade secret claim.",
      outcome: "Denied (Lack of culture)."
    }
  ];

  const filteredCases = filter === 'all' ? cases : cases.filter(c => c.theme.toLowerCase().includes(filter));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-2">Legal Precedents</h2>
          <p className="text-sm text-slate-600 italic">"The law only helps those who help themselves."</p>
</div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'particularity', 'efforts', 'value'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                filter === f ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'
              }`}
            >
              {f}
            </button>
          ))}
</div>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((c, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{c.theme}</span>
</div>
            <h3 className="font-bold text-lg mb-3">{c.name}</h3>
            <p className="text-xs text-slate-700 leading-relaxed mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="font-bold text-slate-900 italic">Lesson: </span>{c.lesson}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <AlertCircle size={12} /> Outcome: {c.outcome}
</div>
</div>
        ))}
</div>
</div>
  );
}

// --- TAB 4: INVENTORY LEDGER ---
function InventoryLedger() {
  const [entries, setEntries] = useState([
    { id: 'TS-001', name: 'Electrolyte Formula B', category: 'Technical', priority: 'High', location: 'Secure Server #4', protection: 'Multi-factor + 2 Person access' },
    { id: 'TS-002', name: 'Tiered Pricing Model', category: 'Business', priority: 'Medium', location: 'Internal CRM', protection: 'Departmental Access Controls' },
    { id: 'TS-003', name: 'Rare Earth Supplier List', category: 'Business', priority: 'Medium', location: 'Secure Cloud Drive', protection: 'NDA required for all users' },
    { id: 'TS-004', name: 'Legacy Batch Process', category: 'Technical', priority: 'Low', location: 'Archive Server', protection: 'Standard Credentialing' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState({
    name: '',
    category: 'Technical',
    priority: 'Medium',
    location: '',
    protection: ''
  });

  const handleDelete = (idToDelete) => {
    setEntries(entries.filter(entry => entry.id !== idToDelete));
  };

  const handleSaveNewEntry = () => {
    if (!newEntry.name || !newEntry.location || !newEntry.protection) {
      alert("Please fill out Name, Location, and Protection fields.");
      return;
    }
    const nextNum = entries.length > 0
      ? Math.max(...entries.map(e => parseInt(e.id.split('-')[1], 10))) + 1
      : 1;
    const newId = `TS-${String(nextNum).padStart(3, '0')}`;
    setEntries([...entries, { ...newEntry, id: newId }]);
    setIsAdding(false);
    setNewEntry({ name: '', category: 'Technical', priority: 'Medium', location: '', protection: '' });
  };

  const exportCSV = () => {
    const headers = ['ID', 'Asset Name', 'Category', 'Priority', 'Location', 'Primary Protection'];
    const rows = entries.map(e => [
      e.id,
      `"${e.name.replace(/"/g, '""')}"`,
      e.category,
      e.priority,
      `"${e.location.replace(/"/g, '""')}"`,
      `"${e.protection.replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Trade_Secret_Inventory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <Database className="text-indigo-600" size={28} />
            <h2 className="text-2xl font-bold">Interactive Asset Ledger</h2>
</div>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={exportCSV}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 text-slate-700 border border-slate-300 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-200 transition-colors"
            >
              <Download size={16} /> Export CSV
            </button>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors"
            >
              {isAdding ? <><X size={16} /> Cancel</> : <><Plus size={16} /> New Entry</>}
            </button>
</div>
</div>

        {isAdding && (
          <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl mb-6">
            <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <Plus size={18} /> Add New Trade Secret
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-xs font-bold text-indigo-700 uppercase mb-1">Asset Name</label>
                <input
                  type="text"
                  value={newEntry.name}
                  onChange={e => setNewEntry({ ...newEntry, name: e.target.value })}
                  placeholder="e.g. Algorithm V2"
                  className="w-full border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
</div>
              <div>
                <label className="block text-xs font-bold text-indigo-700 uppercase mb-1">Category</label>
                <select
                  value={newEntry.category}
                  onChange={e => setNewEntry({ ...newEntry, category: e.target.value })}
                  className="w-full border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Technical">Technical</option>
                  <option value="Business">Business</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
</div>
              <div>
                <label className="block text-xs font-bold text-indigo-700 uppercase mb-1">Priority</label>
                <select
                  value={newEntry.priority}
                  onChange={e => setNewEntry({ ...newEntry, priority: e.target.value })}
                  className="w-full border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="High">High (Crown Jewel)</option>
                  <option value="Medium">Medium (Operational)</option>
                  <option value="Low">Low (Administrative)</option>
                </select>
</div>
              <div className="lg:col-span-2">
                <label className="block text-xs font-bold text-indigo-700 uppercase mb-1">Location</label>
                <input
                  type="text"
                  value={newEntry.location}
                  onChange={e => setNewEntry({ ...newEntry, location: e.target.value })}
                  placeholder="Where does this live?"
                  className="w-full border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
</div>
              <div className="lg:col-span-2">
                <label className="block text-xs font-bold text-indigo-700 uppercase mb-1">Primary Protection</label>
                <input
                  type="text"
                  value={newEntry.protection}
                  onChange={e => setNewEntry({ ...newEntry, protection: e.target.value })}
                  placeholder="e.g. Restricted Access + NDA"
                  className="w-full border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
</div>
              <div className="flex items-end">
                <button
                  onClick={handleSaveNewEntry}
                  className="w-full bg-emerald-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                >
                  Save Entry
                </button>
</div>
</div>
</div>
        )}

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b border-slate-200">
                <th className="px-4 py-4 w-20">ID</th>
                <th className="px-4 py-4 min-w-[150px]">Asset Name</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Priority</th>
                <th className="px-4 py-4 min-w-[150px]">Location</th>
                <th className="px-4 py-4 min-w-[200px]">Primary Protection</th>
                <th className="px-4 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-slate-400 italic">
                    The ledger is currently empty. Click "New Entry" to begin tracking assets.
                  </td>
                </tr>
              ) : (
                entries.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-4 font-mono text-xs text-slate-400">{row.id}</td>
                    <td className="px-4 py-4 font-bold text-slate-800">{row.name}</td>
                    <td className="px-4 py-4">{row.category}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                        row.priority.includes('High') ? 'bg-red-100 text-red-700' :
                        row.priority.includes('Medium') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {row.priority.split(' ')[0]}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{row.location}</td>
                    <td className="px-4 py-4 text-slate-500">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="shrink-0" />
                        <span className="truncate">{row.protection}</span>
</div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title={`Delete ${row.name}`}
                        aria-label={`Delete ${row.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
</div>

        <div className="mt-8 bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <AlertCircle size={18} /> Maintenance Principle
          </h3>
          <p className="text-sm text-indigo-800 leading-relaxed">
            "A stale inventory is dangerous because it creates a false sense of security." Best practices require an <strong>annual audit</strong> to ensure assets still qualify as secrets and priority levels match the current business roadmap.
          </p>
</div>
</div>
      <ChapterFooter chapterNum={2} />
</div>
  );
}
