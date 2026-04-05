import ChapterFooter from '../../ChapterFooter.jsx';
import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Globe,
  Server,
  Activity,
  Download,
  Plus,
  Trash2,
  AlertTriangle,
  Info,
  X,
  ArrowRight,
  Target,
  FileText
} from 'lucide-react';

const TABS = [
  { id: 'threats', icon: Target, label: 'Threat Vectors' },
  { id: 'matrix', icon: Activity, label: 'Risk Matrix' },
  { id: 'register', icon: FileText, label: 'Risk Register' },
];

export default function Chapter03() {
  const [activeTab, setActiveTab] = useState('threats');

  return (
    <div>
      <div className="chapter-header">
        <div className="ch-label">Chapter 3
</div>
        <h1>Risk &amp; Vulnerability</h1>
        <p>Threat vectors, risk matrix, and a practical risk register workflow.</p>
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
        {activeTab === 'threats' && <ThreatVectorMap />}
        {activeTab === 'matrix' && <RiskMatrixTool />}
        {activeTab === 'register' && <RiskRegister />}
</div>
</div>
  );
}

// --- TAB 1: THREAT VECTORS ---
function ThreatVectorMap() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center">
        <h2 className="text-3xl font-bold mb-4">Sources of Exposure</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          "Trade secrets do not typically leak because of a single catastrophic failure, but through a combination of vulnerabilities."
        </p>
</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ThreatCard
          icon={Users}
          title="Internal (Insiders)"
          color="rose"
          points={[
            "Departing employees (PepsiCo v. Redmond)",
            "Negligence (Forwarding to personal email)",
            "Lack of awareness / Training",
            "Misincentivized contractors"
          ]}
          caseStudy="PepsiCo v. Redmond: Injunction granted based on the risk of inevitable disclosure by a departing executive."
        />
        <ThreatCard
          icon={Globe}
          title="External (Partners)"
          color="blue"
          points={[
            "Vendors & Suppliers with system access",
            "Joint Venture partners (nClosures v. Block)",
            "Collaborative R&D projects",
            "Consultants & outsourced teams"
          ]}
          caseStudy="nClosures v. Block: Sharing design files without a formal NDA destroyed trade secret status."
        />
        <ThreatCard
          icon={Server}
          title="Infrastructure"
          color="indigo"
          points={[
            "Unsecured remote access (No VPN)",
            "Weak internal security architecture",
            "Phishing & Malware targeting I.P.",
            "Public Wi-Fi use by remote workers"
          ]}
          caseStudy="Rockwell v. DEV: Emphasized that mapping access movement is a critical component of 'reasonable efforts'."
        />
</div>
</div>
  );
}

function ThreatCard({ icon: Icon, title, points, color, caseStudy }) {
  const colors = {
    rose: "text-rose-600 bg-rose-50 border-rose-200",
    blue: "text-blue-600 bg-blue-50 border-blue-200",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-200"
  };

  return (
    <div className="p-6 rounded-2xl border-2 border-slate-200 bg-white shadow-sm flex flex-col">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${colors[color]}`}>
        <Icon size={24} />
</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-3 mb-6 flex-1">
        {points.map((p, i) => (
          <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
            <ArrowRight size={14} className="mt-1 shrink-0 text-slate-400" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 italic text-xs text-slate-500">
        <span className="font-bold text-slate-700 block mb-1">Legal Precedent:</span>
        {caseStudy}
</div>
</div>
  );
}

// --- TAB 2: RISK MATRIX TOOL ---
function RiskMatrixTool() {
  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(3);

  const getRiskLevel = (l, i) => {
    const score = l * i;
    if (score >= 16) return { label: 'HIGH RISK', color: 'bg-rose-600', border: 'border-rose-200', bg: 'bg-rose-50', text: 'text-rose-600', desc: 'Immediate, aggressive intervention required.' };
    if (score >= 8) return { label: 'MEDIUM RISK', color: 'bg-amber-500', border: 'border-amber-200', bg: 'bg-amber-50', text: 'text-amber-600', desc: 'Sustained monitoring and robust defense needed.' };
    return { label: 'LOW RISK', color: 'bg-emerald-500', border: 'border-emerald-200', bg: 'bg-emerald-50', text: 'text-emerald-600', desc: 'Acceptable risk; manage via baseline policies.' };
  };

  const risk = getRiskLevel(likelihood, impact);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Activity className="text-rose-600" aria-hidden="true" /> Plot Your Risk
        </h2>

        <div className="space-y-10">
          <div>
            <div className="flex justify-between mb-4">
              <label htmlFor="likelihood-slider" className="font-bold text-sm uppercase tracking-wider text-slate-500">Likelihood</label>
              <span className="text-sm font-bold text-rose-600">Level {likelihood}</span>
</div>
            <input
              id="likelihood-slider"
              type="range" min="1" max="5" step="1"
              value={likelihood}
              onChange={(e) => setLikelihood(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[10px] mt-2 font-bold text-slate-400 uppercase" aria-hidden="true">
              <span>Highly Unlikely</span>
              <span>Highly Probable</span>
</div>
</div>

          <div>
            <div className="flex justify-between mb-4">
              <label htmlFor="impact-slider" className="font-bold text-sm uppercase tracking-wider text-slate-500">Impact (Catastrophe)</label>
              <span className="text-sm font-bold text-rose-600">Level {impact}</span>
</div>
            <input
              id="impact-slider"
              type="range" min="1" max="5" step="1"
              value={impact}
              onChange={(e) => setImpact(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[10px] mt-2 font-bold text-slate-400 uppercase" aria-hidden="true">
              <span>Minor Friction</span>
              <span>Catastrophic</span>
</div>
</div>
</div>

        <div className={`mt-12 p-6 rounded-2xl border-2 border-dashed transition-all duration-300 ${risk.border} ${risk.bg}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-black px-2 py-1 rounded text-white ${risk.color}`}>
              {risk.label}
            </span>
            <AlertTriangle className={risk.text} size={24} aria-hidden="true" />
</div>
          <p className="text-slate-800 font-bold mb-1">Decision Metric</p>
          <p className="text-sm text-slate-600">{risk.desc}</p>
</div>
</div>

      <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden">
        <h2 className="text-xl font-bold mb-8 relative z-10">Matrix Visualization</h2>
        <div className="grid grid-cols-5 gap-1 relative z-10" style={{ gridTemplateRows: 'repeat(5, 1fr)', height: '16rem' }} aria-hidden="true">
          {[...Array(25)].map((_, idx) => {
            const row = 5 - Math.floor(idx / 5);
            const col = (idx % 5) + 1;
            const isSelected = row === impact && col === likelihood;
            const cellRisk = getRiskLevel(col, row);
            return (
              <div
                key={idx}
                className={`rounded-sm transition-all duration-300 flex items-center justify-center
                  ${isSelected ? 'ring-4 ring-white scale-110 z-20 shadow-2xl' : 'opacity-40'}
                  ${cellRisk.color}
                `}
              >
                {isSelected && <Target size={16} />}
</div>
            );
          })}
</div>
        <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest relative z-10">
          <span>Likelihood →</span>
          <span>Impact ↑</span>
</div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" aria-hidden="true">
</div>
</div>
</div>
  );
}

// --- TAB 3: RISK REGISTER ---
function RiskRegister() {
  const [risks, setRisks] = useState([
    { id: 'R-001', asset: 'Routing Algorithm', vulnerability: 'Unsecured Remote Access', likelihood: 4, impact: 5, level: 'HIGH', mitigation: 'Mandate VPN + MFA' },
    { id: 'R-002', asset: 'Vendor Specs', vulnerability: 'Un-audited 3rd Party Cyber', likelihood: 3, impact: 4, level: 'MEDIUM', mitigation: 'Initiate Security Audit' },
    { id: 'R-003', asset: 'Sales Database', vulnerability: 'Broad Internal Access', likelihood: 3, impact: 3, level: 'MEDIUM', mitigation: 'Role-Based Access Controls' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newRisk, setNewRisk] = useState({
    asset: '',
    vulnerability: '',
    likelihood: 3,
    impact: 3,
    mitigation: ''
  });

  const calculateLevel = (l, i) => {
    const score = l * i;
    if (score >= 16) return 'HIGH';
    if (score >= 8) return 'MEDIUM';
    return 'LOW';
  };

  const handleAddRisk = () => {
    if (!newRisk.asset || !newRisk.vulnerability) {
      alert("Asset and Vulnerability are required.");
      return;
    }
    const id = `R-${String(risks.length + 1).padStart(3, '0')}`;
    const level = calculateLevel(newRisk.likelihood, newRisk.impact);
    setRisks([...risks, { ...newRisk, id, level }]);
    setIsAdding(false);
    setNewRisk({ asset: '', vulnerability: '', likelihood: 3, impact: 3, mitigation: '' });
  };

  const deleteRisk = (id) => {
    setRisks(risks.filter(r => r.id !== id));
  };

  const exportCSV = () => {
    const headers = ['ID', 'Asset', 'Vulnerability', 'Likelihood', 'Impact', 'Risk Level', 'Mitigation Strategy'];
    const rows = risks.map(r => [
      r.id,
      `"${r.asset.replace(/"/g, '""')}"`,
      `"${r.vulnerability.replace(/"/g, '""')}"`,
      r.likelihood,
      r.impact,
      r.level,
      `"${r.mitigation.replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Risk_Assessment.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Interactive Risk Register</h2>
            <p className="text-sm text-slate-500">Translate assessment into concrete mitigation action.</p>
</div>
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={exportCSV} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 hover:bg-slate-200 transition-all">
              <Download size={16} /> Export
            </button>
            <button onClick={() => setIsAdding(!isAdding)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-rose-700 transition-all">
              {isAdding ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Log Risk</>}
            </button>
</div>
</div>

        {isAdding && (
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-black uppercase text-rose-700 mb-1">Target Asset</label>
                <input
                  type="text" placeholder="e.g. Algorithm V3"
                  value={newRisk.asset} onChange={e => setNewRisk({ ...newRisk, asset: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 outline-none text-sm"
                />
</div>
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase text-rose-700 mb-1">Specific Vulnerability</label>
                <input
                  type="text" placeholder="e.g. Departing employee has credentials"
                  value={newRisk.vulnerability} onChange={e => setNewRisk({ ...newRisk, vulnerability: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 outline-none text-sm"
                />
</div>
              <div>
                <label className="block text-xs font-black uppercase text-rose-700 mb-1">Likelihood (1-5)</label>
                <select
                  value={newRisk.likelihood} onChange={e => setNewRisk({ ...newRisk, likelihood: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-rose-200 outline-none text-sm bg-white"
                >
                  {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
</div>
              <div>
                <label className="block text-xs font-black uppercase text-rose-700 mb-1">Impact (1-5)</label>
                <select
                  value={newRisk.impact} onChange={e => setNewRisk({ ...newRisk, impact: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-rose-200 outline-none text-sm bg-white"
                >
                  {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
</div>
              <div className="lg:col-span-3">
                <label className="block text-xs font-black uppercase text-rose-700 mb-1">Mitigation Plan</label>
                <textarea
                  placeholder="Steps to reduce this risk..."
                  value={newRisk.mitigation} onChange={e => setNewRisk({ ...newRisk, mitigation: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 outline-none text-sm h-20"
                />
</div>
</div>
            <button onClick={handleAddRisk} className="mt-4 w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-all">
              Submit to Register
            </button>
</div>
        )}

        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400">ID</th>
                <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400">Asset &amp; Vulnerability</th>
                <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400 text-center">Score</th>
                <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400">Level</th>
                <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400">Mitigation Strategy</th>
                <th className="px-4 py-4 text-[10px] font-black uppercase text-slate-400 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((r) => (
                <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-6 font-mono text-xs text-slate-400">{r.id}</td>
                  <td className="px-4 py-6">
                    <div className="font-bold text-slate-900">{r.asset}
</div>
                    <div className="text-xs text-slate-500 mt-1">{r.vulnerability}
</div>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                      {r.likelihood} × {r.impact}
                    </span>
                  </td>
                  <td className="px-4 py-6">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
                      r.level === 'HIGH' ? 'bg-rose-100 text-rose-700' :
                      r.level === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {r.level}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-sm text-slate-600 italic">{r.mitigation}</td>
                  <td className="px-4 py-6 text-center">
                    <button
                      onClick={() => deleteRisk(r.id)}
                      className="text-slate-300 hover:text-rose-600 transition-colors p-2"
                      aria-label={`Delete risk ${r.id}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>

        <div className="mt-8 bg-rose-50 p-6 rounded-2xl border border-rose-100 flex items-start gap-4">
          <Info className="text-rose-600 shrink-0 mt-1" size={20} aria-hidden="true" />
          <div className="text-sm text-rose-900 leading-relaxed">
            <strong>The OmniRoute Principle:</strong> Risk assessment is not a theoretical exercise. By mapping assets and evaluating likelihood vs. impact, you move from general anxiety to targeted, defensible action—the key to proving <strong>"Reasonable Efforts"</strong> in court.
</div>
</div>
</div>
      <ChapterFooter chapterNum={3} />
</div>
  );
}
