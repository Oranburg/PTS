import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Settings, 
  Download, 
  Users, 
  Briefcase, 
  Database, 
  Gavel, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Info, 
  ArrowRight, 
  ChevronRight,
  Monitor,
  Key,
  Globe,
  Lock
} from 'lucide-react';


export default function Chapter05() {
  const [activeTab, setActiveTab] = useState('selector');

  const [external, setExternal] = useState({
    relationshipType: null,
    auditRights: 'none',
    backgroundIP: 'silent',
    flowDown: 'none',
    reverseEngineer: 'silent',
    breachNotice: 'none',
    dataRoom: 'open',
    credentials: 'manual',
    apiControl: 'none',
    nda: 'missing',
  });

  const TABS = [
    { id: 'selector', label: '1. Relationship' },
    { id: 'contract', label: '2. Contract Lab' },
    { id: 'systems', label: '3. System Controls' },
    { id: 'output', label: '4. Stage C Output' },
  ];

  return (
    <div>
      <div className="chapter-header">
        <div className="ch-label">Chapter 5</div>
        <h1>External Controls</h1>
        <p>Relationship-specific architecture for contracts and system controls.</p>
      </div>

      <div className="tab-bar" role="tablist" aria-label="Chapter sections">
        {TABS.map((t, idx) => (
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
              if (next !== null) { e.preventDefault(); setActiveTab(TABS[next].id); }
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'selector' && <RelationshipSelector external={external} setExternal={setExternal} onNext={() => setActiveTab('contract')} />}
        
        {activeTab === 'contract' && (
          external.relationshipType 
            ? <ContractArchitectureLab external={external} setExternal={setExternal} onNext={() => setActiveTab('systems')} />
            : <SelectRelationshipPrompt onGoBack={() => setActiveTab('selector')} />
        )}

        {activeTab === 'systems' && (
          external.relationshipType 
            ? <ArchitecturalSafeguards external={external} setExternal={setExternal} onNext={() => setActiveTab('output')} />
            : <SelectRelationshipPrompt onGoBack={() => setActiveTab('selector')} />
        )}

        {activeTab === 'output' && (
          external.relationshipType 
            ? <StageCOutput external={external} />
            : <SelectRelationshipPrompt onGoBack={() => setActiveTab('selector')} />
        )}
      </div>
    </div>
  );
}

// --- SHARED COMPONENTS ---
function SelectRelationshipPrompt({ onGoBack }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-20 animate-in fade-in zoom-in duration-500">
      <Users className="mx-auto text-slate-300 mb-6" size={64} />
      <h2 className="text-2xl font-bold mb-4">Relationship Not Selected</h2>
      <p className="text-slate-500 mb-8">You must define the type of external partner (Vendor, Collaborator, etc.) before configuring contracts or safeguards.</p>
      <button onClick={onGoBack} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all">
        Go to Step 1
      </button>
    </div>
  );
}

function InsightCard({ type, title, text, caseRef }) {
  const colors = {
    danger: 'border-l-rose-500 text-rose-500',
    warning: 'border-l-amber-500 text-amber-500',
    success: 'border-l-emerald-500 text-emerald-500'
  };

  return (
    <div className={`p-5 rounded-2xl border-l-4 bg-white/5 border-white/10 ${colors[type].split(' ')[0]}`}>
      <div className="flex items-center gap-3 mb-2">
        {type === 'danger' && <XCircle className="text-rose-500" size={20} />}
        {type === 'warning' && <AlertTriangle className="text-amber-500" size={20} />}
        {type === 'success' && <CheckCircle2 className="text-emerald-500" size={20} />}
        <h4 className="font-bold text-lg text-white">{title}</h4>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed pl-8">{text}</p>
      {caseRef && (
        <p className="text-xs italic mt-2 text-slate-400 pl-8 border-t border-white/10 pt-2">{caseRef}</p>
      )}
    </div>
  );
}

function ClauseBlock({ title, desc, options, current, onSelect }) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`flex-1 text-left p-4 rounded-2xl border-2 transition-all ${
              current === opt.id 
                ? 'border-emerald-500 bg-emerald-50 shadow-sm ring-1 ring-emerald-200' 
                : 'border-slate-100 bg-white hover:border-slate-300'
            }`}
          >
            <div className="font-bold text-sm mb-1 text-slate-800">{opt.label}</div>
            <div className="text-[11px] text-slate-500 leading-tight">{opt.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- TAB 1: RELATIONSHIP SELECTOR ---

function RelationshipSelector({ external, setExternal, onNext }) {
  const narratives = {
    vendor: "You are engaging a third-party vendor with access to proprietary specifications, processes, or system environments. The vendor may also serve your direct competitors. Any disclosure made during the engagement is a potential leak vector.",
    collaborator: "You are entering a joint development agreement with a research institution or corporate partner. Pre-existing Background IP must be ring-fenced contractually — silence in the JDA converts your prior inventions into jointly-exploitable assets.",
    customer: "A strategic customer is receiving access to a proprietary product or process as part of a pilot or licensing relationship. Without a contractual reverse-engineering prohibition, any lawful acquisition of the product gives them the legal right to decode your process from the artifact itself.",
    distributor: "A regional broker or agent will handle distribution, using a network of sub-agents to reach end markets. Without flow-down clauses, your confidential information will reach third parties who owe no duty of secrecy to you — creating an untraceable downstream exposure chain."
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
            <Users size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Step 1: Choose the Perimeter</h2>
            <p className="text-slate-500 italic">Your organization is sharing confidential information beyond its walls. Identify the type of external relationship to begin configuring protections.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <RelationshipCard 
            id="vendor" title="Vendor / Supplier" 
            desc="Third-party with system or process access" 
            active={external.relationshipType === 'vendor'}
            onSelect={() => setExternal({...external, relationshipType: 'vendor'})}
          />
          <RelationshipCard 
            id="collaborator" title="R&D Collaborator" 
            desc="Joint development or research partnership" 
            active={external.relationshipType === 'collaborator'}
            onSelect={() => setExternal({...external, relationshipType: 'collaborator'})}
          />
          <RelationshipCard 
            id="customer" title="Strategic Customer" 
            desc="Pilot evaluation or licensed access" 
            active={external.relationshipType === 'customer'}
            onSelect={() => setExternal({...external, relationshipType: 'customer'})}
          />
          <RelationshipCard 
            id="distributor" title="Distributor / Agent" 
            desc="Agent network with downstream sub-parties" 
            active={external.relationshipType === 'distributor'}
            onSelect={() => setExternal({...external, relationshipType: 'distributor'})}
          />
        </div>

        {external.relationshipType && (
          <div className="bg-slate-900 rounded-2xl p-8 text-white animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-3 mb-4 text-emerald-400 uppercase tracking-widest text-xs font-bold">
              <AlertTriangle size={16} /> Threat Narrative
            </div>
            <p className="text-lg leading-relaxed text-slate-200 italic">"{narratives[external.relationshipType]}"</p>
            <div className="mt-8 flex justify-end">
              <button onClick={onNext} className="bg-emerald-600 hover:bg-emerald-500 px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                Configure Contract Architecture <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RelationshipCard({ id, title, desc, active, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 flex justify-between items-center group ${
        active 
          ? 'border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-200' 
          : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div>
        <div className={`font-bold text-lg mb-1 ${active ? 'text-emerald-900' : 'text-slate-800'}`}>{title}</div>
        <div className="text-sm text-slate-500">{desc}</div>
      </div>
      <ChevronRight className={`transition-transform ${active ? 'text-emerald-500 translate-x-2' : 'text-slate-200 group-hover:translate-x-1'}`} />
    </button>
  );
}

// --- TAB 2: CONTRACT ARCHITECTURE LAB ---

function ContractArchitectureLab({ external, setExternal, onNext }) {
  const getVisibleClauses = () => {
    const list = [];
    const type = external.relationshipType;

    if (type === 'vendor' || type === 'distributor') {
      list.push('audit');
      list.push('flowdown');
    }
    if (type === 'collaborator') {
      list.push('backgroundip');
    }
    if (type === 'customer') {
      list.push('reverseengineer');
    }
    list.push('breach');
    return list;
  };

  const getInsights = () => {
    const insights = [];
    const type = external.relationshipType;

    // Audit Rights
    if (getVisibleClauses().includes('audit')) {
      if (external.auditRights === 'none') {
        insights.push({ 
          type: 'danger', title: "Blind Enforcement Gap", 
          text: "Without an audit right, you will not discover vendor misuse until a competing product appears in the market. Omission indicates 'unreasonable efforts.'",
          caseRef: "GlobeRanger Corp. v. Software AG (5th Cir. 2016)"
        });
      } else if (external.auditRights === 'annual') {
        insights.push({
          type: 'warning', title: "Predictable Oversight",
          text: "Scheduled audits are better than nothing but give the partner advance notice to clean up evidence. A triggered right is harder to avoid."
        });
      } else {
        insights.push({ 
          type: 'success', title: "Enforcement Muscle", 
          text: "A 'Triggered Audit' is the industry gold standard. It allows you to inspect facilities upon reasonable suspicion of breach.",
          caseRef: "See Turret Labs USA, Inc. v. CargoSprint, LLC (E.D.N.Y. 2022) and DTSA §1839(3)(A) — reasonable measures require documented access controls; the Fourth Circuit's 2025 DTSA ruling held that the reasonable-efforts standard is objective and fact-specific, not merely aspirational"
        });
      }
    }

    // Background IP
    if (type === 'collaborator') {
      if (external.backgroundIP === 'silent') {
        insights.push({ 
          type: 'danger', title: "Joint Ownership Trap", 
          text: "Under U.S. Patent Law, joint owners can exploit the IP without your consent and without paying you a dime. You have effectively converted your core proprietary assets into jointly-exploitable property.",
          caseRef: "35 U.S.C. §262 (joint patent owners may each exploit without consent or accounting); see also Ethicon, Inc. v. United States Surgical Corp., 135 F.3d 1456 (Fed. Cir. 1998) — co-inventor could license competing manufacturer without plaintiff's consent, destroying exclusivity"
        });
      } else if (external.backgroundIP === 'defined') {
        insights.push({ 
          type: 'warning', title: "Ownership vs. Use", 
          text: "Defining IP is good, but it doesn't stop them from using your disclosures to file their own 'improvement' patents. You need use-restrictions.",
          caseRef: "Altavion, Inc. v. Konica Minolta Systems Laboratory, Inc., 226 Cal. App. 4th 26 (Cal. Ct. App. 2014) — trade secrets disclosed under MOU during failed collaboration; partner secretly filed patents on disclosed architecture; $1.36M verdict"
        });
      } else {
        insights.push({ 
          type: 'success', title: "Ring-Fenced Protection", 
          text: "Best Practice: IP is licensed only for the project and license expires immediately upon termination."
        });
      }
    }

    // Flow-Down
    if (getVisibleClauses().includes('flowdown')) {
      if (external.flowDown === 'none') {
        insights.push({ 
          type: 'danger', title: "Sub-Agent Exposure", 
          text: "If a distributor's sub-agent steals your secret, you have NO misappropriation claim against them because they never owed YOU a duty of secrecy.",
          caseRef: "AcryliCon USA v. Silikal (11th Cir. 2021)"
        });
      } else {
        insights.push({ 
          type: 'success', title: "Direct Privity Established", 
          text: "By requiring sub-agents to name you as a third-party beneficiary, you extend your legal reach down the entire distribution chain."
        });
      }
    }

    // Reverse Engineering
    if (type === 'customer') {
      if (external.reverseEngineer === 'silent') {
        insights.push({ 
          type: 'danger', title: "Legal Decoding Allowed", 
          text: "UTSA §1(1) Comment explicitly states that Reverse Engineering of a lawfully acquired product is 'Proper Means.' You have zero claim.",
          caseRef: "UTSA Official Comment on Proper Means"
        });
      } else {
        insights.push({ 
          type: 'success', title: "Contractual Lock", 
          text: "While RE is legally allowed, a contractual ban overrides the default rule between the parties.",
          caseRef: "Bowers v. Baystate Technologies (Fed. Cir. 2003)"
        });
      }
    }

    // Breach Notification
    if (external.breachNotice === 'none') {
      insights.push({ 
        type: 'danger', title: "The Injunction Window", 
        text: "Delay in filing kills a TRO. If you find out 6 weeks later, a court will rule the harm was not 'irreparable' because you didn't act like it.",
        caseRef: "eBay v. MercExchange, 547 U.S. 388 (2006)"
      });
    } else if (external.breachNotice === '72hr') {
      insights.push({
        type: 'success',
        title: "TRO Window Preserved",
        text: "A 72-hour notification requirement gives you the information needed to file for emergency injunctive relief before the counterparty can destroy evidence or complete a competing product launch.",
        caseRef: "eBay Inc. v. MercExchange, 547 U.S. 388 (2006) — irreparable harm must be demonstrated; prompt action is strong evidence of urgency"
      });
    }

    return insights;
  };

  const visible = getVisibleClauses();
  const insights = getInsights();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-8">
        <div className="flex items-center gap-4 mb-2">
          <FileText className="text-emerald-600" />
          <h2 className="text-2xl font-bold uppercase tracking-tight">Contractual Clauses</h2>
        </div>

        {visible.includes('audit') && (
          <ClauseBlock title="Audit & Inspection Rights" desc="How will you verify third-party compliance?"
            options={[
              { id: 'none', label: 'No Audit Rights', sub: 'No visibility into third-party handling of your information.' },
              { id: 'annual', label: 'Annual Scheduled Audit', sub: 'Periodic right to review; demonstrates reasonable measures.' },
              { id: 'triggered', label: 'Triggered Audit', sub: 'Right to inspect upon reasonable suspicion of breach or anomaly.' }
            ]}
            current={external.auditRights} onSelect={val => setExternal({...external, auditRights: val})}
          />
        )}

        {visible.includes('backgroundip') && (
          <ClauseBlock title="Background IP Definition" desc="Define what you owned BEFORE the collaboration began."
            options={[
              { id: 'silent', label: 'Silent / Broad', sub: 'Joint ownership of all project insights.' },
              { id: 'ringfenced', label: 'Ring-Fenced', sub: 'Defined Background IP stays yours; licensed only for the project.' }
            ]}
            current={external.backgroundIP} onSelect={val => setExternal({...external, backgroundIP: val})}
          />
        )}

        {visible.includes('flowdown') && (
          <ClauseBlock title="Flow-Down Obligations" desc="Does the duty follow the secret to sub-agents?"
            options={[
              { id: 'none', label: 'No Flow-Down', sub: 'Distributor is bound, but sub-agents are not.' },
              { id: 'full', label: 'Full Flow-Down', sub: 'Sub-agents are bound directly to your organization as third-party beneficiaries.' }
            ]}
            current={external.flowDown} onSelect={val => setExternal({...external, flowDown: val})}
          />
        )}

        {visible.includes('reverseengineer') && (
          <ClauseBlock title="Reverse Engineering Ban" desc="Prevent the recipient from decoding the process in-house."
            options={[
              { id: 'silent', label: 'Silent', sub: 'Proper means rule applies (RE allowed).' },
              { id: 'prohibited', label: 'Express Prohibition', sub: 'Contractually bans analysis or disassembly.' }
            ]}
            current={external.reverseEngineer} onSelect={val => setExternal({...external, reverseEngineer: val})}
          />
        )}

        <ClauseBlock title="Breach Notification Window" desc="How quickly must they alert you to a leak?"
          options={[
            { id: 'none', label: 'No Specific Window', sub: 'Depends on state common law.' },
            { id: '72hr', label: '72-Hour Notice', sub: 'Standard window to preserve TRO filing rights.' }
          ]}
          current={external.breachNotice} onSelect={val => setExternal({...external, breachNotice: val})}
        />

        <div className="pt-8 border-t flex justify-end">
          <button onClick={onNext} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all">
            Architect System Controls <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl sticky top-32 space-y-6">
          <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
            <Gavel size={16} /> Judicial Review
          </h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {insights.map((insight, idx) => (
              <InsightCard key={idx} {...insight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- TAB 3: ARCHITECTURAL SAFEGUARDS ---

function ArchitecturalSafeguards({ external, setExternal, onNext }) {
  const getRiskScore = () => {
    let score = 0;
    if (external.nda === 'missing') score += 25;
    if (external.dataRoom === 'open') score += 25;
    if (external.credentials === 'manual') score += 25;
    if (external.apiControl === 'none') score += 25;
    return score;
  };

  const score = getRiskScore();
  const getStatus = () => {
    if (score >= 75) return { label: 'CRITICAL EXPOSURE', color: 'bg-rose-500' };
    if (score >= 50) return { label: 'ELEVATED RISK', color: 'bg-amber-500' };
    return { label: 'LOW EXPOSURE / DEFENDABLE', color: 'bg-emerald-500' };
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
              <Monitor size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Step 3: Containment Architecture</h2>
              <p className="text-slate-500">Reasonable efforts require technical locks, not just legal promises.</p>
            </div>
          </div>
          
          <div className="w-full md:w-64 space-y-2">
            <div className="flex justify-between text-xs font-black uppercase tracking-tighter">
              <span>Risk Status</span>
              <span>{getStatus().label}</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className={`h-full transition-all duration-1000 ${getStatus().color}`} 
                style={{ width: `${score}%` }} 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <SafeguardToggle 
            label="1. Disclosure Environment" 
            sublabel="How will the external party view the secret?"
            value={external.dataRoom}
            options={[
              { id: 'open', label: 'Email / Cloud Drive', desc: 'No viewing logs or auto-expiry.' },
              { id: 'vdr', label: 'Virtual Data Room', desc: 'Watermarking + Read-only + Access logs.' }
            ]}
            onChange={val => setExternal({...external, dataRoom: val})}
            caseNarrative="Altavion (2014): Sharing via insecure channels during talks weakens the 'reasonable efforts' argument."
          />

          <SafeguardToggle 
            label="2. Credential Management" 
            sublabel="What happens when the relationship ends?"
            value={external.credentials}
            options={[
              { id: 'manual', label: 'Manual Deactivation', desc: 'Account remains active until IT acts.' },
              { id: 'auto-revoke', label: 'System Auto-Revocation', desc: 'Access hard-coded to expire on contract end.' }
            ]}
            onChange={val => setExternal({...external, credentials: val})}
            caseNarrative="GlobeRanger (2016): Stale credentials allowed a subcontractor to silently replicate field architecture."
          />

          <SafeguardToggle 
            label="3. API / Data Flow Control" 
            sublabel="Is there a way to detect bulk extraction?"
            value={external.apiControl}
            options={[
              { id: 'none', label: 'Open Pipeline', desc: 'No limits on response frequency.' },
              { id: 'sunset', label: 'Hard Sunset Keys', desc: 'Keys Hard-expire; usage rate-limited.' }
            ]}
            onChange={val => setExternal({...external, apiControl: val})}
            caseNarrative="DTSA 'Reasonable Measures' requires limiting access to only what is needed for the specific task."
          />

          <SafeguardToggle 
            label="4. NDA Implementation" 
            sublabel="Foundation for all legal claims."
            value={external.nda}
            options={[
              { id: 'missing', label: 'Missing / Informal', desc: 'Relying on commercial morality.' },
              { id: 'present', label: 'Executed w/ DTSA Notice', desc: 'Unlocks exemplary damages and fees.' }
            ]}
            onChange={val => setExternal({...external, nda: val})}
            caseNarrative="18 U.S.C. §1833(b) requires the whistleblower notice for ALL external contractors to get enhanced remedies."
          />
        </div>

        <div className="flex justify-end">
          <button onClick={onNext} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all">
            Generate Stage C Output <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SafeguardToggle({ label, sublabel, value, options, onChange, caseNarrative }) {
  return (
    <div className="p-6 rounded-3xl border-2 border-slate-100 bg-white shadow-sm space-y-4">
      <div>
        <h3 className="font-bold text-lg">{label}</h3>
        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{sublabel}</p>
      </div>
      
      <div className="flex flex-col gap-2">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`text-left p-3 rounded-xl border-2 transition-all ${
              value === opt.id ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'
            }`}
          >
            <div className={`text-xs font-bold ${value === opt.id ? 'text-white' : 'text-slate-700'}`}>{opt.label}</div>
            {opt.desc && <div className={`text-[10px] mt-0.5 ${value === opt.id ? 'text-emerald-50' : 'text-slate-500'}`}>{opt.desc}</div>}
          </button>
        ))}
      </div>

      <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 border border-slate-100">
        <span className="font-bold text-slate-800">Legal Context:</span> {caseNarrative}
      </div>
    </div>
  );
}

// --- TAB 4: STAGE C OUTPUT ---

function StageCOutput({ external }) {
  const [copied, setCopied] = useState(false);

  const typeLabels = {
    vendor: 'Vendor / Supplier Relationship',
    collaborator: 'R&D Collaboration / JDA',
    customer: 'Strategic Customer Disclosure',
    distributor: 'Distribution / Agent Network'
  };

  const buildRows = () => {
    const rows = [];

    // Row 1: IP Disclosure Risk (ALL)
    rows.push({
      risk: "IP Disclosure & Confidentiality Threshold",
      clause: "NDA Presence + DTSA Notice",
      standard: "UTSA §1(4)(ii); DTSA §1839(3); 18 U.S.C. §1833(b)",
      config: `${external.nda === 'present' ? 'Executed with Notice' : 'Missing/Informal'} via ${external.dataRoom === 'vdr' ? 'VDR' : 'Open Channel'}`,
      status: (external.nda === 'present' && external.dataRoom === 'vdr') ? "✓ Compliant" : "✗ Critical Gap",
      statusColor: (external.nda === 'present' && external.dataRoom === 'vdr') ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800",
      recommendation: external.nda === 'missing' ? "Immediate execution of external NDA required. Absence of NDA destroys trade secret status upon disclosure." : "Ensure VDR watermarking identifies the recipient to facilitate traceability."
    });

    // Row 2: Ownership Ambiguity (COLLABORATOR ONLY)
    if (external.relationshipType === 'collaborator') {
      rows.push({
        risk: "Ownership Ambiguity / Joint Exploitation",
        clause: "Background IP Ring-Fencing",
        standard: "35 U.S.C. §262; Ethicon, Inc. v. U.S. Surgical (1998)",
        config: external.backgroundIP === 'ringfenced' ? "Defined & Ring-Fenced" : "Silent / Broad Joint Ownership",
        status: external.backgroundIP === 'ringfenced' ? "✓ Protected" : "✗ Ownership Leak",
        statusColor: external.backgroundIP === 'ringfenced' ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800",
        recommendation: external.backgroundIP === 'silent' ? "Redraft to prevent 'joint work' default. Silence allows partner to license your tech to rivals without accounting." : "No action needed. Pre-existing rights are preserved."
      });
    }

    // Row 3: Downstream Leakage (VENDOR or DISTRIBUTOR)
    if (external.relationshipType === 'vendor' || external.relationshipType === 'distributor') {
      rows.push({
        risk: "Indirect Misappropriation (Sub-agents)",
        clause: "3rd Party Flow-Down Clause",
        standard: "AcryliCon USA v. Silikal (11th Cir. 2021)",
        config: external.flowDown === 'full' ? "Full Flow-down to Sub-agents" : "Uncontrolled Chain",
        status: external.flowDown === 'full' ? "✓ Controlled" : "⚠ Exposure Risk",
        statusColor: external.flowDown === 'full' ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800",
        recommendation: external.flowDown === 'none' ? "You cannot sue sub-agents you didn't bind. Require the primary partner to bind all sub-agents directly to your organization as a named third-party beneficiary in every downstream sub-contract." : "Audit partner's sub-contracts quarterly for compliance."
      });
    }

    // Row 4: Reverse Engineering Risk (CUSTOMER ONLY)
    if (external.relationshipType === 'customer') {
      rows.push({
        risk: "Lawful Discovery (Reverse Engineering)",
        clause: "Contractual RE Prohibition",
        standard: "UTSA §1(1) Comment; Bowers v. Baystate (2003)",
        config: external.reverseEngineer === 'prohibited' ? "RE Contractually Banned" : "RE Allowed (Proper Means)",
        status: external.reverseEngineer === 'prohibited' ? "✓ Mitigated" : "✗ Threshold Failure",
        statusColor: external.reverseEngineer === 'prohibited' ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800",
        recommendation: external.reverseEngineer === 'silent' ? "RE is a complete defense to misappropriation. Add express prohibition to pilot/license agreement immediately." : "Combine with obfuscation for software deliverables."
      });
    }

    // Row 5: Breach Response Latency (ALL)
    rows.push({
      risk: "Irreparable Harm / TRO Delay",
      clause: "Expedited Breach Notice",
      standard: "eBay v. MercExchange (2006); TRO Standards",
      config: external.breachNotice === '72hr' ? "72-Hour Window" : "Undefined Latency",
      status: external.breachNotice === '72hr' ? "✓ Responsive" : "⚠ TRO Vulnerability",
      statusColor: external.breachNotice === '72hr' ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800",
      recommendation: external.breachNotice === 'none' ? "Delayed filing destroys 'irreparable harm' presumption. Mandate immediate or 72-hour notice of suspected breach." : "No action needed."
    });

    // Row 6: Audit & Enforcement Posture (VENDOR or DISTRIBUTOR)
    if (external.relationshipType === 'vendor' || external.relationshipType === 'distributor') {
      rows.push({
        risk: "Systemic Oversight / Stale Access",
        clause: "Audit Rights + Auto-Revocation",
        standard: "GlobeRanger (5th Cir. 2016); Reasonable-Measures",
        config: `${external.auditRights === 'triggered' ? 'Triggered Audit' : external.auditRights === 'annual' ? 'Annual Audit' : 'No Oversight'} + ${external.credentials === 'auto-revoke' ? 'Auto-Revocation' : 'Manual IT'}`,
        status: (external.auditRights === 'triggered' && external.credentials === 'auto-revoke') ? "✓ Active Oversight" : "⚠ Static Security",
        statusColor: (external.auditRights === 'triggered' && external.credentials === 'auto-revoke') ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800",
        recommendation: external.credentials === 'manual' ? "Revoke access automatically upon contract end. GlobeRanger proves stale credentials are the #1 leak vector." : "Conduct mock audit annually."
      });
    }

    return rows;
  };

  const rows = buildRows();

  const handleCopy = () => {
    const headerRow = ["Risk", "Clause", "Legal Standard", "Your Config", "Status", "Recommendation"].join('\t');
    const dataRows = rows.map(r => [r.risk, r.clause, r.standard, r.config, r.status, r.recommendation].join('\t')).join('\n');
    const tsv = `${headerRow}\n${dataRows}`;

    const textArea = document.createElement("textarea");
    textArea.value = tsv;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Chapter 5 Stage C — External Risk Mitigation</h2>
          <p className="text-lg text-emerald-700 font-semibold mb-1">
            Configuration: {typeLabels[external.relationshipType]}
          </p>
          <p className="text-slate-500">Generated from your lab selections. Copy or screenshot this for your Stage C submission.</p>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6 shadow-inner">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
                <th className="px-4 py-4 w-48">Risk Category</th>
                <th className="px-4 py-4 w-48">Clause / Countermeasure</th>
                <th className="px-4 py-4 w-48">Legal Standard</th>
                <th className="px-4 py-4 w-48">Your Configuration</th>
                <th className="px-4 py-4 w-40">Status</th>
                <th className="px-4 py-4">Strategic Recommendation</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-4 py-4 font-bold text-slate-800 border-b border-slate-100">{row.risk}</td>
                  <td className="px-4 py-4 text-slate-600 border-b border-slate-100 font-medium">{row.clause}</td>
                  <td className="px-4 py-4 text-slate-400 italic border-b border-slate-100 text-xs">{row.standard}</td>
                  <td className="px-4 py-4 font-medium text-slate-700 border-b border-slate-100">{row.config}</td>
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-black uppercase ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-slate-600 leading-relaxed border-b border-slate-100 italic">{row.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleCopy}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-md"
          >
            <Download size={18} /> Copy to Clipboard
          </button>
          {copied && <span className="text-emerald-600 font-bold animate-in fade-in flex items-center gap-1"><CheckCircle2 size={18}/> Copied!</span>}
        </div>
      </div>
    </div>
  );
}
