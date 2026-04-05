import ChapterFooter from '../../ChapterFooter.jsx';
import React, { useState } from 'react';
import { 
  FileText, 
  Map, 
  Lightbulb, 
  AlertTriangle, 
  Scale, 
  CheckCircle2, 
  Info,
  Briefcase,
  XCircle,
  Gavel,
  ArrowRight,
  UserCheck,
  Users,
  Download
} from 'lucide-react';

export default function Chapter04() {
  const [activeTab, setActiveTab] = useState('crafter');

  // Lifted State
  const [clauses, setClauses] = useState({
    assignment: 'present',
    nonCompete: 'reasonable',
    remedy: 'injunction',
    dtsa: 'missing',
    nonSolicit: 'tailored'
  });
  
  const [jurisdiction, setJurisdiction] = useState('NY');
  
  const [hasContract, setHasContract] = useState(false);
  const [usedResources, setUsedResources] = useState(false);
  const [employedToInvent, setEmployedToInvent] = useState(false);

  const TABS = [
    { id: 'crafter', label: '1. Covenant Crafter' },
    { id: 'jurisdiction', label: '2. Jurisdiction Trap' },
    { id: 'inventions', label: '3. Inventions Audit' },
    { id: 'output', label: '4. Stage C Output' },
  ];

  return (
    <div>
      <div className="chapter-header">
        <div className="ch-label">Chapter 4
</div>
        <h1>Internal Mitigation</h1>
        <p>Restrictive covenants, jurisdiction choices, and invention assignment controls.</p>
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
        {activeTab === 'crafter' && (
          <CovenantCrafter clauses={clauses} setClauses={setClauses} />
        )}
        {activeTab === 'jurisdiction' && (
          <JurisdictionSimulator jurisdiction={jurisdiction} setJurisdiction={setJurisdiction} />
        )}
        {activeTab === 'inventions' && (
          <InventionsAudit 
            hasContract={hasContract} setHasContract={setHasContract}
            usedResources={usedResources} setUsedResources={setUsedResources}
            employedToInvent={employedToInvent} setEmployedToInvent={setEmployedToInvent}
            onNext={() => setActiveTab('output')}
          />
        )}
        {activeTab === 'output' && (
          <StageC 
            clauses={clauses} 
            jurisdiction={jurisdiction} 
            hasContract={hasContract} 
            usedResources={usedResources} 
            employedToInvent={employedToInvent} 
          />
        )}
</div>
</div>
  );
}


// --- TAB 1: COVENANT CRAFTER ---
function CovenantCrafter({ clauses, setClauses }) {
  const getInsights = () => {
    const insights = [];
    
    // Assignment Logic
    if (clauses.assignment === 'future') {
      insights.push({ 
        type: 'danger', 
        title: "Promise ≠ Transfer — Stanford v. Roche (2011)", 
        text: "Writing 'Employee agrees to assign future IP' is a contractual promise, not a transfer. Under Stanford v. Roche (2011), title stays with Evan until he physically countersigns the assignment. If he leaves before signing, Pico Salsa owns nothing — not even the FermentCurves modification he developed on company time. The fix is two words: change 'agrees to assign' to 'hereby assigns.'",
        caseRef: "Stanford v. Roche Molecular Systems, 563 U.S. 776 (2011)"
      });
    } else {
      insights.push({ 
        type: 'success', 
        title: "Immediate Vesting — The Abraxis Rule", 
        text: "By using 'hereby assigns' (present tense), transfer occurs by operation of law the moment the invention exists — no further signatures needed. When Evan developed the 15% fermentation timing improvement in the pilot kitchen, Pico Salsa owned it instantly. Stanford v. Roche (2011) confirms this is the gold standard.",
        caseRef: "Abraxis BioScience v. Navinta, 672 F.3d 1239 (Fed. Cir. 2011)"
      });
    }

    // Non-Compete Logic
    if (clauses.nonCompete === 'broad') {
      insights.push({ 
        type: 'danger', 
        title: "Overbroad Geographic Scope", 
        text: "A nationwide ban for a mid-level employee will likely be struck down entirely. Many states will refuse to 'blue pencil' (rewrite) the contract, leaving you with zero protection.",
        caseRef: "See e.g. Reliable Fire Equipment Co. v. Arredondo, 965 N.E.2d 393 (Ill. 2011) — courts refuse to blue-pencil nationwide bans for non-key employees"
      });
    } else if (clauses.nonCompete === 'none') {
      insights.push({ 
        type: 'warning', 
        title: "Relying on Trade Secret Law Alone", 
        text: "Without a non-compete, you must prove actual misappropriation or rely on the difficult 'Inevitable Disclosure' doctrine if they join a rival.",
        caseRef: "PepsiCo, Inc. v. Redmond, 54 F.3d 1262 (7th Cir. 1995) — established Inevitable Disclosure in the 7th Circuit; the doctrine is separately rejected in California, New York, Texas, and most other states"
      });
    } else {
      insights.push({ 
        type: 'success', 
        title: "Tailored Restrictive Covenant", 
        text: "Tying the non-compete directly to the employee's specific territory and duration of access significantly increases the odds of judicial enforcement.",
        caseRef: "Outsource Int'l v. Barton, 192 F.3d 662 (7th Cir. 1999) — tailored covenants upheld"
      });
    }

    // Non-Solicit Logic
    if (clauses.nonSolicit === 'broad') {
      insights.push({
        type: 'danger',
        title: "Overbroad Non-Solicit",
        text: "Banning solicitation of ALL customers, even those the employee never met, is often struck down as an unreasonable restraint of trade.",
        caseRef: "See e.g., BDO Seidman v. Hirshberg, 93 N.Y.2d 382 (1999) — non-solicit limited to clients employee acquired through company resources"
      });
    } else if (clauses.nonSolicit === 'none') {
      insights.push({
        type: 'warning',
        title: "Missing Protection",
        text: "Without a non-solicit, Evan can legally poach your entire team and client base the day he leaves, provided he doesn't use trade secrets to do it."
      });
    } else {
      insights.push({
        type: 'success',
        title: "Targeted Non-Solicit",
        text: "Restricting solicitation to customers the employee actually served is highly enforceable and preferred by courts over non-competes.",
        caseRef: "Ikon Office Solutions v. Dale, 294 F. Supp. 2d 481 (S.D.N.Y. 2003) — non-solicitation limited to clients employee personally managed held enforceable; BDO Seidman v. Hirshberg, 93 N.Y.2d 382 (1999) is the governing standard"
      });
    }

    // Remedy Logic
    if (clauses.remedy === 'liquidated') {
      insights.push({ 
        type: 'danger', 
        title: "The Injunctive Relief Trap", 
        text: "If you specify Liquidated Damages ($1M for breach), a court is UNLIKELY to grant an injunction. By setting a price, you legally admitted the harm is NOT 'irreparable'.",
        caseRef: "See Reach Media v. Bloomberg, 2004 WL 1559568 — liquidated damages clause used to defeat injunction request"
      });
    } else {
      insights.push({ 
        type: 'success', 
        title: "Irreparable Harm Preserved", 
        text: "By relying on an 'Acknowledgment of Irreparable Harm' clause instead of a fixed dollar amount, you preserve your right to seek an immediate injunction to stop the bleeding.",
        caseRef: "See Henry Schein, Inc. v. Cook, 191 F. Supp. 3d 1072 (N.D. Cal. 2016) — contractual acknowledgment of irreparable harm weighed favorably in granting TRO; cf. eBay Inc. v. MercExchange, 547 U.S. 388 (2006) (irreparable harm must still be demonstrated, not merely stipulated)"
      });
    }

    // DTSA Logic
    if (clauses.dtsa === 'missing') {
      insights.push({
        type: 'danger',
        title: "Forfeited: Exemplary Damages & Attorney's Fees",
        text: "18 U.S.C. §1833(b) requires this notice in every NDA and employment agreement signed after May 11, 2016. Without it, a court CANNOT award you double damages or attorney's fees — even if SalsaTech's entire business model is built on Evan's stolen FermentCurves data. Courts have denied enhanced remedies where employers simply forgot to include one paragraph.",
        caseRef: "18 U.S.C. §1833(b)(3)(C) — statutory forfeiture of exemplary damages and attorney's fees is explicit and automatic; no court has excused an employer's failure to include the notice"
      });
    } else {
      insights.push({
        type: 'success',
        title: "Enhanced Remedies Preserved",
        text: "Including the DTSA immunity notice unlocks your right to seek double damages and attorney's fees if Evan's misappropriation was willful. In a case where a competitor hired your key employee specifically to access your formulations, exemplary damages can exceed the actual harm.",
        caseRef: "Defend Trade Secrets Act, 18 U.S.C. §§1836-1839 (2016)"
      });
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-emerald-50 rounded-2xl">
            <FileText className="text-emerald-600" size={32} />
</div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Employment Agreement Lab</h2>
            <p className="text-slate-500">Evan Lopez, Pico Salsa's R&D technician, just submitted his two-week notice. He's joining SalsaTech — your primary competitor. Configure the employment agreement you should have had in place. Every clause you get wrong is a weapon Evan's new employer can use against you.</p>
</div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Drafting Panel */}
          <div className="space-y-8">
            <ClauseBlock 
              title="1. Invention Assignment Clause" 
              desc="How does the employee transfer IP to the company?"
              options={[
                { id: 'future', label: 'Agree to Assign Future IP', sub: '"Employee agrees they will assign patents..."' },
                { id: 'present', label: 'Present Assignment', sub: '"Employee hereby assigns all rights..."' }
              ]}
              current={clauses.assignment} onSelect={(val) => setClauses({...clauses, assignment: val})}
            />
            <ClauseBlock 
              title="2. Non-Competition Scope" 
              desc="What are they restricted from doing post-employment?"
              options={[
                { id: 'broad', label: 'Global Industry Ban', sub: 'Cannot work in this industry anywhere.' },
                { id: 'reasonable', label: 'Tailored Territory', sub: 'Limited to their sales territory for 1 year.' },
                { id: 'none', label: 'No Non-Compete', sub: 'Only bound by non-disclosure.' }
              ]}
              current={clauses.nonCompete} onSelect={(val) => setClauses({...clauses, nonCompete: val})}
            />
            <ClauseBlock 
              title="3. Non-Solicitation Scope" 
              desc="Who is the employee restricted from poaching?"
              options={[
                { id: 'broad', label: 'All Contacts', sub: 'Cannot contact any company clients, vendors, or employees.' },
                { id: 'tailored', label: 'Key Relationships', sub: 'Limited to customers they personally managed and direct reports.' },
                { id: 'none', label: 'No Non-Solicit', sub: 'Free to poach anyone.' }
              ]}
              current={clauses.nonSolicit} onSelect={(val) => setClauses({...clauses, nonSolicit: val})}
            />
            <ClauseBlock 
              title="4. Remedies for Breach" 
              desc="What happens if they steal the secret?"
              options={[
                { id: 'liquidated', label: 'Liquidated Damages', sub: 'Set a fixed penalty: $500,000 per breach.' },
                { id: 'injunction', label: 'Equitable Relief', sub: 'Acknowledge harm is irreparable; seek injunction.' }
              ]}
              current={clauses.remedy} onSelect={(val) => setClauses({...clauses, remedy: val})}
            />
            <ClauseBlock 
              title="5. DTSA Whistleblower Notice" 
              desc="Federal law (18 U.S.C. §1833(b)) requires this notice in every NDA and employment agreement. If missing, you forfeit enhanced remedies — even if you win."
              options={[
                { id: 'missing', label: 'Standard Template (No Notice)', sub: '"Employee agrees not to disclose confidential information..."' },
                { id: 'included', label: 'DTSA Notice Included', sub: '"Notwithstanding... immunity for disclosure to federal/state officials..."' }
              ]}
              current={clauses.dtsa} onSelect={(val) => setClauses({...clauses, dtsa: val})}
            />
</div>

          {/* Feedback Panel */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl h-fit sticky top-32">
            <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <Gavel size={16} /> Judicial Review
            </h3>
            <div className="space-y-4">
              {insights.map((insight, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border-l-4 bg-white/5 border-white/10 ${
                  insight.type === 'danger' ? 'border-l-rose-500' : 
                  insight.type === 'warning' ? 'border-l-amber-500' : 'border-l-emerald-500'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    {insight.type === 'danger' && <XCircle className="text-rose-500" size={20} />}
                    {insight.type === 'warning' && <AlertTriangle className="text-amber-500" size={20} />}
                    {insight.type === 'success' && <CheckCircle2 className="text-emerald-500" size={20} />}
                    <h4 className="font-bold text-lg">{insight.title}</h4>
</div>
                  <p className="text-sm text-slate-300 leading-relaxed pl-8">{insight.text}</p>
                  {insight.caseRef && (
                    <p className="text-xs italic mt-2 text-slate-400 pl-8 border-t border-white/10 pt-2">{insight.caseRef}</p>
                  )}
</div>
              ))}
</div>
</div>
</div>
</div>
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
            <div className="font-bold text-sm mb-1 text-slate-800">{opt.label}
</div>
            <div className="text-[11px] text-slate-500 leading-tight">{opt.sub}
</div>
          </button>
        ))}
</div>
</div>
  );
}

// --- TAB 2: JURISDICTION SIMULATOR ---
function JurisdictionSimulator({ jurisdiction, setJurisdiction }) {
  const jurisdictions = {
    'CA': {
      name: 'California',
      noncompete: 'VOID. California Business and Professions Code expressly voids non-competes. You cannot restrict mobility.',
      nonsolicit: 'VOID for employees. Customer non-solicits are also generally unenforceable unless tied to the sale of a business.',
      strategy: 'Must rely strictly on Trade Secret Law (CTSA) and the execution of hyper-specific NDAs. You cannot stop them from joining a rival, only from using your IP.'
    },
    'NY': {
      name: 'New York',
      noncompete: 'ENFORCEABLE, but heavily scrutinized. Must be strictly necessary to protect trade secrets or truly "unique/extraordinary" services.',
      nonsolicit: 'ENFORCEABLE. Often preferred by courts over non-competes as they are less restrictive to the employee earning a living.',
      strategy: 'Ensure consideration is adequate. If you fire an employee without cause, NY courts may refuse to enforce the non-compete.'
    },
    'TX': {
      name: 'Texas',
      noncompete: 'ENFORCEABLE, if ancillary to an otherwise enforceable agreement (like an NDA where you actually provide them trade secrets).',
      nonsolicit: 'ENFORCEABLE. Texas is generally employer-friendly if the covenant is reasonable in time, scope, and geography.',
      strategy: 'Texas allows "blue-penciling", meaning the judge might rewrite an overbroad clause to make it reasonable rather than throwing it out entirely.'
    },
    'MA': {
      name: 'Massachusetts',
      noncompete: 'ENFORCEABLE, but highly regulated. The MA Noncompetition Agreement Act requires "Garden Leave" (paying them 50% of salary while restricted).',
      nonsolicit: 'ENFORCEABLE. Explicitly exempted from the strict requirements of the Noncompetition Agreement Act.',
      strategy: 'If you want a non-compete here, you must pay for it. Consider relying on robust Non-Solicits to save money.'
    },
    'MN': {
      name: 'Minnesota',
      noncompete: 'VOID. Minnesota banned non-compete agreements effective July 1, 2023 (Minn. Stat. §181.988). Any non-compete signed after that date is unenforceable as a matter of law, with no blue-pencil option.',
      nonsolicit: 'ENFORCEABLE. Customer and employee non-solicits survive the 2023 ban and remain a critical backstop for Minnesota employers.',
      strategy: 'If Evan worked in Minnesota, your non-compete is worthless. Shift immediately to a robust Non-Solicitation agreement for customers and key employees, pair it with a strong NDA, and rely on the DTSA for federal trade secret protection. You cannot restrict his mobility to SalsaTech — only his use of your IP.'
    }
  };

  const current = jurisdictions[jurisdiction];

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <Map className="text-emerald-600 mx-auto mb-4" size={40} />
          <h2 className="text-3xl font-bold mb-2">The Jurisdiction Trap</h2>
          <p className="text-slate-600">Evan Lopez worked in your Austin, TX facility but the SalsaTech job is in California. Where does your non-compete get enforced? Pick a state to find out why the answer could ruin your case before it starts.</p>
</div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {Object.keys(jurisdictions).map(k => (
            <button
              key={k}
              onClick={() => setJurisdiction(k)}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${
                jurisdiction === k ? 'bg-slate-900 text-white shadow-lg transform scale-105' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {jurisdictions[k].name}
            </button>
          ))}
</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <UserCheck size={20} className="text-emerald-600"/>
              <h3 className="font-bold text-lg">Non-Competes</h3>
</div>
            <p className="text-sm text-slate-600 leading-relaxed">{current.noncompete}</p>
</div>
          
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <Users size={20} className="text-emerald-600"/>
              <h3 className="font-bold text-lg">Non-Solicits</h3>
</div>
            <p className="text-sm text-slate-600 leading-relaxed">{current.nonsolicit}</p>
</div>

          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2 mb-4 text-emerald-900">
              <Briefcase size={20} className="text-emerald-700"/>
              <h3 className="font-bold text-lg">In-House Strategy</h3>
</div>
            <p className="text-sm text-emerald-800 leading-relaxed font-medium">{current.strategy}</p>
            <p className="mt-4 p-3 bg-amber-50 text-amber-800 text-xs font-bold rounded-xl border border-amber-200">
              ⚠️ Federal Note: The FTC issued a near-total non-compete ban in April 2024. A Texas federal court permanently blocked it in August 2024, and the FTC dropped its appeal on September 5, 2025, abandoning the rule entirely. Non-competes remain exclusively a matter of state law. No federal ban is on the horizon.
            </p>
</div>
</div>
</div>
</div>
  );
}

// --- TAB 3: INVENTIONS AUDIT ---
function InventionsAudit({ hasContract, setHasContract, usedResources, setUsedResources, employedToInvent, setEmployedToInvent, onNext }) {
  const determineOwnership = () => {
    if (hasContract) {
      return {
        owner: "Pico Salsa",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        rationale: "The express written Invention Assignment Agreement transfers FermentCurves_v8 to Pico Salsa by operation of law — no further steps needed. Under Abraxis (Fed. Cir. 2011), if the agreement says 'hereby assigns,' the transfer was instantaneous the moment Evan had the insight."
      };
    }
    
    if (employedToInvent) {
      return {
        owner: "Pico Salsa",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        rationale: "Under the 'Employed to Invent' doctrine, an implied contract exists because Evan was specifically hired to solve this fermentation problem. Even without a written assignment, Pico Salsa owns FermentCurves_v8. But this is a fact-intensive inquiry — SalsaTech's lawyers will argue Evan was a 'technician,' not an 'inventor.'"
      };
    }

    if (usedResources) {
      return {
        owner: "Evan Lopez (with Pico Salsa Shop Right)",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        rationale: "Evan owns the patent. But because he used the pilot kitchen and company time, Pico Salsa gets a free, non-exclusive 'Shop Right' to use the process in its own production — it just cannot exclude Evan or SalsaTech from using it too. This is the worst of both worlds."
      };
    }

    return {
      owner: "Evan Lopez — Free and Clear",
      color: "bg-rose-100 text-rose-800 border-rose-200",
      rationale: "No contract, no company resources, and not hired specifically to invent fermentation processes. FermentCurves_v8 belongs to Evan. He can hand it to SalsaTech today. Pico Salsa has no claim to its own flagship production process."
    };
  };

  const outcome = determineOwnership();

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-amber-50 rounded-2xl">
            <Lightbulb className="text-amber-500" size={32} />
</div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Who Owns the Invention?</h2>
            <p className="text-slate-500">During his time at Pico Salsa, Evan Lopez noticed that shortening the anaerobic fermentation window by 18 minutes at 34°C produced a consistently brighter capsaicin profile. He mentioned it to Miguel, who adopted it immediately — it's now encoded as FermentCurves_v8. Evan developed it during work hours. Toggle the facts to determine who owns it.</p>
</div>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <ToggleRow 
              label="Signed an Invention Assignment?" 
              value={hasContract} 
              onChange={setHasContract} 
            />
            <ToggleRow 
              label="Was Evan specifically hired to optimize fermentation?" 
              value={employedToInvent} 
              onChange={setEmployedToInvent} 
              disabled={hasContract}
            />
            <ToggleRow 
              label="Did Evan use Pico Salsa's pilot kitchen and company time?" 
              value={usedResources} 
              onChange={setUsedResources}
              disabled={hasContract || employedToInvent}
            />
</div>

          <div className={`p-8 rounded-3xl border-2 flex flex-col justify-center transition-colors duration-500 ${outcome.color}`}>
            <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-70">Legal Owner</p>
            <h3 className="text-3xl font-black mb-4">{outcome.owner}</h3>
            <div className="bg-white/50 p-4 rounded-xl text-sm font-medium leading-relaxed">
              {outcome.rationale}
</div>
            
            {!hasContract && (
              <div className="mt-4 flex items-center gap-2 text-xs font-bold opacity-80">
                <AlertTriangle size={14} /> Without a contract, default property laws apply.
</div>
            )}
</div>
</div>

        <div className="mt-12 flex justify-end">
          <button onClick={onNext} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
            Generate Stage C Output <ArrowRight size={18} />
          </button>
</div>
</div>
</div>
  );
}

function ToggleRow({ label, value, onChange, disabled }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl border ${disabled ? 'opacity-40 bg-slate-50' : 'bg-white border-slate-200'}`}>
      <span className="font-bold text-slate-700 leading-snug pr-4">{label}</span>
      <button 
        disabled={disabled}
        onClick={() => onChange(!value)}
        className={`w-14 h-8 shrink-0 rounded-full transition-colors relative flex items-center ${value ? 'bg-emerald-500' : 'bg-slate-300'}`}
      >
        <div className={`w-6 h-6 rounded-full bg-white absolute transition-transform shadow-sm ${value ? 'translate-x-7' : 'translate-x-1'}`} />
      </button>
</div>
  );
}

// --- TAB 4: STAGE C OUTPUT ---
function StageC({ clauses, jurisdiction, hasContract, usedResources, employedToInvent }) {
  const [copied, setCopied] = useState(false);

  const jurisdictions = {
    'CA': { name: 'California', status: 'VOID' },
    'NY': { name: 'New York', status: 'ENFORCEABLE' },
    'TX': { name: 'Texas', status: 'ENFORCEABLE' },
    'MA': { name: 'Massachusetts', status: 'ENFORCEABLE' },
    'MN': { name: 'Minnesota', status: 'VOID' }
  };

  const getJurisdictionRecommendation = () => {
    if (jurisdiction === 'CA' || jurisdiction === 'MN') return "Abandon non-compete strategy. Deploy robust non-solicitation agreement for customers and co-workers. Anchor all protection in DTSA and state trade secret statute.";
    if (jurisdiction === 'MA') return "Pay Garden Leave (50% salary) during restriction period or waive the non-compete. Switching to a strong non-solicit may be more cost-effective.";
    if (jurisdiction === 'NY') return "Verify adequate consideration. Non-compete cannot be enforced if Pico Salsa terminated Evan without cause.";
    return "Ensure the covenant is ancillary to an otherwise enforceable NDA where trade secrets were actually disclosed. Blue-pencil available if scope is overbroad.";
  };

  const getIPStatus = () => {
    if (hasContract) return { config: "Written Invention Assignment in place", status: "✓ Company Owns", color: "bg-emerald-100 text-emerald-800", rec: "No action needed. Ensure agreement uses present-tense 'hereby assigns.'" };
    if (employedToInvent) return { config: "Hired specifically to optimize fermentation", status: "✓ Company Owns (Implied)", color: "bg-emerald-100 text-emerald-800", rec: "Supplement with written agreement immediately. Implied doctrine is litigation-intensive and fact-specific." };
    if (usedResources) return { config: "Used company pilot kitchen and time (Shop Right only)", status: "⚠ Company Shop Right Only — Evan Owns Patent", color: "bg-amber-100 text-amber-800", rec: "Negotiate a written assignment from Evan in exchange for a bonus or raise before his last day." };
    return { config: "No contract, no company resources, not hired to invent", status: "✗ Evan Owns — No Company Rights", color: "bg-rose-100 text-rose-800", rec: "No legal path to ownership without Evan's consent. Pivot to trade secret protection and begin re-engineering FermentCurves independently." };
  };

  const ipData = getIPStatus();
  const jurStatus = {
    badge: (jurisdiction === 'CA' || jurisdiction === 'MN') ? '✗ Non-Compete Void by Statute' : (jurisdiction === 'NY' || jurisdiction === 'MA') ? '⚠ Enforceable — Conditions Apply' : '✓ Generally Enforceable (Blue-Pencil Available)',
    color: (jurisdiction === 'CA' || jurisdiction === 'MN') ? 'bg-rose-100 text-rose-800' : (jurisdiction === 'NY' || jurisdiction === 'MA') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
  };

  const rows = [
    {
      risk: "Ownership of employee-developed IP (FermentCurves_v8)",
      clause: "Invention Assignment Clause",
      standard: "Stanford v. Roche (2011); Abraxis (Fed. Cir. 2011)",
      config: clauses.assignment === 'present' ? '"Hereby Assigns" (Present Assignment)' : '"Agrees to Assign" (Future Promise Only)',
      status: clauses.assignment === 'present' ? "✓ Compliant" : "✗ Critical Gap",
      statusColor: clauses.assignment === 'present' ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800",
      recommendation: clauses.assignment === 'present' ? "No action needed. Title transfers immediately." : "Redraft to use present-tense 'hereby assigns.' Schedule re-execution with all current R&D staff within 30 days."
    },
    {
      risk: "Evan Lopez joining SalsaTech and competing directly",
      clause: "Non-Competition Agreement",
      standard: `Jurisdiction-specific (${jurisdictions[jurisdiction].name})`,
      config: clauses.nonCompete === 'broad' ? "Global Industry Ban" : clauses.nonCompete === 'reasonable' ? "Tailored Territory (1 yr, specific region)" : "No Non-Compete",
      status: (clauses.nonCompete === 'reasonable' && jurisdiction !== 'CA' && jurisdiction !== 'MN') ? "✓ Likely Enforceable" : (jurisdiction === 'CA' || jurisdiction === 'MN') ? "✗ Void by Statute Regardless of Scope" : clauses.nonCompete === 'broad' ? "✗ Likely Void (Overbroad)" : "⚠ Unprotected — Trade Secret Law Only",
      statusColor: (jurisdiction === 'CA' || jurisdiction === 'MN') ? "bg-rose-100 text-rose-800" : clauses.nonCompete === 'reasonable' ? "bg-emerald-100 text-emerald-800" : clauses.nonCompete === 'broad' ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800",
      recommendation: clauses.nonCompete === 'reasonable' ? "Ensure adequate consideration. If jurisdiction is CA or MN, migrate to non-solicit + NDA strategy immediately." : clauses.nonCompete === 'broad' ? "Narrow to Evan's specific sales territory and 12-month duration. Renegotiate with a pay raise as fresh consideration." : "Deploy non-solicit for all R&D contacts and customers. File DTSA complaint if SalsaTech's product mirrors FermentCurves."
    },
    {
      risk: "Evan Lopez poaching Pico Salsa's customers or team",
      clause: "Non-Solicitation Agreement",
      standard: "Enforceable in most states if narrowly tailored",
      config: clauses.nonSolicit === 'broad' ? "All Contacts (Broad)" : clauses.nonSolicit === 'tailored' ? "Key Relationships (Tailored)" : "No Non-Solicit",
      status: clauses.nonSolicit === 'tailored' ? "✓ Likely Enforceable" : clauses.nonSolicit === 'broad' ? "✗ Likely Void (Overbroad)" : "⚠ Unprotected",
      statusColor: clauses.nonSolicit === 'tailored' ? "bg-emerald-100 text-emerald-800" : clauses.nonSolicit === 'broad' ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800",
      recommendation: clauses.nonSolicit === 'tailored' ? "Excellent fallback, especially critical if operating in CA or MN." : clauses.nonSolicit === 'broad' ? "Narrow to customers Evan personally managed or acquired. Broad bans are struck down." : "Add a targeted non-solicit. Trade secret law alone won't stop him from hiring away your entire R&D team."
    },
    {
      risk: "Forfeiture of enhanced remedies in federal trade secret litigation",
      clause: "DTSA §1833(b) Notice",
      standard: "18 U.S.C. §1833(b) (2016); Defend Trade Secrets Act",
      config: clauses.dtsa === 'included' ? "Notice included in employment agreement" : "Standard NDA template — no federal immunity language",
      status: clauses.dtsa === 'included' ? "✓ Compliant" : "✗ Remedies Forfeited",
      statusColor: clauses.dtsa === 'included' ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800",
      recommendation: clauses.dtsa === 'included' ? "No action needed. Enhanced damages available upon proof of willful misappropriation." : "Insert DTSA notice into all NDAs and employment agreements executed after May 11, 2016. No cost. Failure to do so forfeits double damages and attorney's fees."
    },
    {
      risk: "Disputed ownership of FermentCurves_v8 modification",
      clause: "Ownership / Shop Right determination",
      standard: hasContract ? "Abraxis (Fed. Cir. 2011)" : employedToInvent ? "Employed to Invent doctrine" : usedResources ? "Shop Right doctrine" : "Default property rules — employee owns",
      config: ipData.config,
      status: ipData.status,
      statusColor: ipData.color,
      recommendation: ipData.rec
    },
    {
      risk: "Non-compete unenforceable in the wrong state",
      clause: "Choice of Law / Forum Selection",
      standard: `${jurisdictions[jurisdiction].name} (${jurisdictions[jurisdiction].status})`,
      config: `Operating in ${jurisdictions[jurisdiction].name}`,
      status: jurStatus.badge,
      statusColor: jurStatus.color,
      recommendation: getJurisdictionRecommendation()
    }
  ];

  const handleCopy = () => {
    const headerRow = ["Risk", "Clause / Countermeasure", "Legal Standard", "Your Configuration", "Status", "Recommendation"].join('\t');
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
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Chapter 4 Stage C — Internal Risk Mitigation Table</h2>
          <p className="text-lg text-emerald-700 font-semibold mb-1">Pico Salsa, LLC — Employment Agreement Compliance Audit</p>
          <p className="text-slate-500">Generated from your lab selections. Copy or screenshot this for your Stage C submission.</p>
</div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
                <th className="px-4 py-4 w-48">Risk</th>
                <th className="px-4 py-4 w-48">Clause / Countermeasure</th>
                <th className="px-4 py-4 w-48">Legal Standard</th>
                <th className="px-4 py-4 w-48">Your Configuration</th>
                <th className="px-4 py-4 w-40">Status</th>
                <th className="px-4 py-4">Recommendation</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-4 py-4 font-medium text-slate-800 border-b border-slate-100">{row.risk}</td>
                  <td className="px-4 py-4 text-slate-600 border-b border-slate-100">{row.clause}</td>
                  <td className="px-4 py-4 text-slate-500 italic border-b border-slate-100">{row.standard}</td>
                  <td className="px-4 py-4 font-medium text-slate-700 border-b border-slate-100">{row.config}</td>
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className={`inline-block px-2 py-1 rounded-md text-[11px] font-bold ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-slate-600 leading-relaxed border-b border-slate-100">{row.recommendation}</td>
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
      <ChapterFooter chapterNum={4} />
</div>
  );
}
