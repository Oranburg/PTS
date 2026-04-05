import ChapterFooter from '../../ChapterFooter.jsx';
import React, { useState } from 'react';
import { 
  Gavel, 
  FileText, 
  Scale, 
  Siren, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight,
  ShieldAlert,
  Building2,
  Lock,
  Briefcase
} from 'lucide-react';


export default function Chapter06() {
  const [activeTab, setActiveTab] = useState('complaint');

  const [complaint, setComplaint] = useState({
    secret: 'vague',
    efforts: 'none',
    conduct: 'compete',
  });

  const [injunctionType, setInjunctionType] = useState('preliminary');
  const [seizureFactors, setSeizureFactors] = useState({
    harm: false,
    success: true,
    spoliation: false,
    necessary: true,
    efforts: true,
    specificity: true,
    balance: true,
    possession: false,
  });

  const [damages, setDamages] = useState({
    theory: 'actual',
    willful: false,
    scienter: false,
  });

  const TABS = [
    { id: 'complaint', label: '1. The Complaint' },
    { id: 'injunction', label: '2. Emergency Relief' },
    { id: 'damages', label: '3. Damages Award' },
  ];

  return (
    <div>
      <div className="chapter-header">
        <div className="ch-label">Chapter 6
</div>
        <h1>Enforcement &amp; Remedies</h1>
        <p>Complaint quality, emergency injunctive relief, and damages theories.</p>
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
        {activeTab === 'complaint' && <ComplaintSimulator complaint={complaint} setComplaint={setComplaint} onNext={() => setActiveTab('injunction')} />}
        {activeTab === 'injunction' && <InjunctionBoard type={injunctionType} setType={setInjunctionType} factors={seizureFactors} setFactors={setSeizureFactors} onNext={() => setActiveTab('damages')} />}
        {activeTab === 'damages' && <DamagesCalculator damages={damages} setDamages={setDamages} />}
</div>
</div>
  );
}

// --- TAB 1: THE COMPLAINT (SURVIVING DISMISSAL) ---
function ComplaintSimulator({ complaint, setComplaint, onNext }) {
  
  const getMotionStatus = () => {
    if (complaint.secret === 'vague') return { 
      status: 'dismissed', 
      reason: 'Failure to Allege Cognizable Secret', 
      caseRef: 'Aday v. Westfield Insurance Co.',
      tsppFailure: 'Your Chapter 2 Trade Secret Inventory was too vague to survive pleading. A court cannot protect what you cannot describe.'
    };
    if (complaint.efforts === 'none') return { 
      status: 'dismissed', 
      reason: 'Failure to Show Reasonable Efforts', 
      caseRef: 'Airfacts, Inc. v. Amezaga',
      tsppFailure: 'Your Chapters 4 & 5 safeguards either did not exist or were not documented. Courts require evidence of a plan that was actually followed.'
    };
    if (complaint.conduct === 'compete') return { 
      status: 'dismissed', 
      reason: 'Failure to Allege Improper Conduct', 
      caseRef: 'American Registry, LLC v. Hanaw',
      tsppFailure: 'Trade secret law punishes breach, not competition. Your Stage E Enforcement Plan must identify a specific legal duty that was violated.'
    };
    return { 
      status: 'survives', 
      reason: 'All Elements Satisfied', 
      caseRef: 'Proceed to Discovery' 
    };
  };

  const result = getMotionStatus();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
            <FileText size={32} />
</div>
          <div>
            <h2 className="text-3xl font-bold">Rule 12(b)(6) Simulator</h2>
            <p className="text-slate-500">Draft the initial federal complaint. If you fail to plead the statutory elements with specificity, the judge will dismiss your case before discovery begins.</p>
</div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <DraftingToggle 
              label="1. The Trade Secret" 
              options={[
                { id: 'vague', label: 'General Process', desc: '"Defendant stole our claims handling process."' },
                { id: 'specific', label: 'Specific Artifact', desc: '"Defendant took the v8.2 pricing algorithm."' }
              ]}
              current={complaint.secret} onSelect={val => setComplaint({...complaint, secret: val})}
            />
            <DraftingToggle 
              label="2. Secrecy Measures" 
              options={[
                { id: 'none', label: 'Implied Trust', desc: '"The data was obviously important to our business."' },
                { id: 'documented', label: 'Documented Controls', desc: '"Protected by NDA, VDR access logs, and policies."' }
              ]}
              current={complaint.efforts} onSelect={val => setComplaint({...complaint, efforts: val})}
            />
            <DraftingToggle 
              label="3. Defendant's Conduct" 
              options={[
                { id: 'compete', label: 'Market Competition', desc: '"Defendant built a competing product faster than us."' },
                { id: 'breach', label: 'Improper Means', desc: '"Defendant bypassed the API limit to scrape data."' }
              ]}
              current={complaint.conduct} onSelect={val => setComplaint({...complaint, conduct: val})}
            />
</div>

          <div className="lg:col-span-5">
            <div className={`p-8 rounded-3xl border-2 h-full flex flex-col justify-center transition-all duration-500 ${
              result.status === 'survives' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
            }`}>
              <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-70">Judicial Ruling</p>
              <h3 className={`text-2xl font-black mb-4 ${result.status === 'survives' ? 'text-emerald-700' : 'text-rose-700'}`}>
                {result.status === 'survives' ? 'Motion to Dismiss: DENIED' : 'Motion to Dismiss: GRANTED'}
              </h3>
              
              <div className="bg-white/60 p-4 rounded-xl text-sm font-medium leading-relaxed mb-4">
                <strong>Finding:</strong> {result.reason}
</div>
              
              <div className="text-xs font-bold text-slate-500 italic flex items-center gap-2">
                <Scale size={14} /> Authority: {result.caseRef}
</div>

              {result.tsppFailure && (
                <div className="mt-4 bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs font-semibold text-amber-800 flex items-start gap-2">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <span><strong>TSPP Diagnosis:</strong> {result.tsppFailure}</span>
</div>
              )}

              {result.status === 'survives' && (
                <button onClick={onNext} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-md">
                  Seek Emergency Relief <ArrowRight size={18} />
                </button>
              )}
</div>
</div>
</div>
</div>
</div>
  );
}

function DraftingToggle({ label, options, current, onSelect }) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-slate-800">{label}</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`flex-1 text-left p-4 rounded-xl border-2 transition-all ${
              current === opt.id 
                ? 'border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-200' 
                : 'border-slate-100 bg-white hover:border-slate-300'
            }`}
          >
            <div className="font-bold text-sm mb-1">{opt.label}
</div>
            <div className="text-xs text-slate-500 leading-tight">{opt.desc}
</div>
          </button>
        ))}
</div>
</div>
  );
}

// --- TAB 2: EMERGENCY INJUNCTION (THE SEIZURE TEST) ---
function InjunctionBoard({ type, setType, factors, setFactors, onNext }) {
  
  const toggleFactor = (key) => {
    setFactors({...factors, [key]: !factors[key]});
  };

  // CORRECTED BUG: Seizure is only valid if ALL 8 factors are true.
  const isSeizureValid = Object.values(factors).every(Boolean);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
            <Siren size={32} />
</div>
          <div>
            <h2 className="text-3xl font-bold">Emergency Relief Board</h2>
            <p className="text-slate-500">The defendant has the files. Select your intervention level.</p>
</div>
</div>

        <div className="flex flex-wrap gap-4 mb-8 border-b pb-8">
          <button onClick={() => setType('tro')} className={`px-6 py-3 rounded-xl font-bold border-2 transition-all ${type === 'tro' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>Temporary Restraining Order</button>
          <button onClick={() => setType('preliminary')} className={`px-6 py-3 rounded-xl font-bold border-2 transition-all ${type === 'preliminary' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>Preliminary Injunction</button>
          <button onClick={() => setType('seizure')} className={`px-6 py-3 rounded-xl font-bold border-2 transition-all ${type === 'seizure' ? 'border-rose-600 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>Ex Parte Seizure (DTSA)</button>
</div>

        {type !== 'seizure' ? (
          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 transition-opacity duration-300">
            <h3 className="text-xl font-bold mb-2">Standard Injunctive Relief</h3>
            <p className="text-slate-600 mb-6">Requires showing of likelihood of success on the merits, irreparable harm, and favorable balance of equities. The court orders the defendant to stop using the secret.</p>
            <button onClick={onNext} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all">Proceed to Trial <ArrowRight size={16}/></button>
</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-300">
            <div className="space-y-4">
              <h3 className="font-bold text-rose-700 flex items-center gap-2"><ShieldAlert size={20}/> DTSA 8-Factor Seizure Test</h3>
              <p className="text-sm text-slate-600 mb-4">You are asking US Marshals to seize property without notice. You must satisfy every statutory factor. Check the boxes your evidence supports:</p>
              
              <div className="space-y-2">
                <Checkbox label="1. Immediate and irreparable harm" checked={factors.harm} onChange={() => toggleFactor('harm')} />
                <Checkbox label="2. Likelihood of success on merits" checked={factors.success} disabled />
                <Checkbox label="3. Immediate risk of spoliation/destruction" checked={factors.spoliation} onChange={() => toggleFactor('spoliation')} />
                <Checkbox label="4. Necessary to prevent further misuse" checked={factors.necessary} disabled />
                <Checkbox label="5. Plaintiff took reasonable efforts" checked={factors.efforts} disabled />
                <Checkbox label="6. Secret and misappropriation specified" checked={factors.specificity} disabled />
                <Checkbox label="7. Balance of harms favors plaintiff" checked={factors.balance} disabled />
                <Checkbox label="8. Defendant is in ACTUAL POSSESSION at specific location" checked={factors.possession} onChange={() => toggleFactor('possession')} />
</div>
              <p className="text-xs text-slate-400 italic mt-2">*Some factors auto-checked based on earlier pleading success.</p>
</div>

            <div className={`p-6 rounded-2xl border-2 flex flex-col justify-center transition-colors duration-500 ${isSeizureValid ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
              {!isSeizureValid ? (
                <div>
                  <XCircle className="text-rose-500 mb-3" size={32}/>
                  <h4 className="text-lg font-bold text-rose-800 mb-2">Seizure Order Denied</h4>
                  <p className="text-sm text-rose-700 mb-4">You failed to establish all eight elements (such as actual possession at the target location, spoliation risk, or immediate irreparable harm). The court denies the extreme remedy.</p>
                  <div className="bg-white/60 p-3 rounded-lg text-xs font-medium text-slate-700">
                    <strong>Authority:</strong> Janssen Products LP v. Evenus Pharmaceuticals (3d Cir. 2023) — Ex parte seizure denied for failing 5 of 8 factors; Third Circuit dismissed appeal holding seizure orders are not appealable injunctions.
</div>
</div>
              ) : (
                <div>
                  <CheckCircle2 className="text-emerald-500 mb-3" size={32}/>
                  <h4 className="text-lg font-bold text-emerald-800 mb-2">Warrant Issued</h4>
                  <p className="text-sm text-emerald-700 mb-4">You successfully met the extraordinary burden across all eight factors. Federal marshals are dispatched to seize the property.</p>
                  <button onClick={onNext} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-emerald-700 w-full transition-all shadow-md">
                    Proceed to Damages Phase <ArrowRight size={16}/>
                  </button>
</div>
              )}
</div>
            
            <div className="col-span-1 md:col-span-2 mt-4 hidden">
               {/* Visual Diagram Tag for LLM/Document processing */}
              <span></span>
</div>
</div>
        )}
</div>
</div>
  );
}

function Checkbox({ label, checked, onChange, disabled }) {
  return (
    <label className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${disabled ? 'opacity-60 bg-slate-50' : 'cursor-pointer hover:bg-slate-50 bg-white shadow-sm'}`}>
      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
        {checked && <CheckCircle2 className="text-white" size={14} />}
</div>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
    </label>
  );
}

// --- TAB 3: DAMAGES CALCULATOR ---
function DamagesCalculator({ damages, setDamages }) {

  const getDamagesOutput = () => {
    let base = "";
    let baseCase = "";
    
    if (damages.theory === 'actual') {
      base = "Actual Loss (Lost Licensing Value)";
      baseCase = "Bianco v. Globus Medical — Awarded damages based on potential licensing benefit lost due to misappropriation.";
    } else if (damages.theory === 'unjust') {
      base = "Unjust Enrichment (Avoided Development Costs)";
      baseCase = "3M v. Pribyl (7th Cir. 2001) — Awarded defendant's 'head start' costs and profits gained from illicit use of resin formulas.";
    } else {
      base = "Reasonable Royalty";
      baseCase = "Airfacts, Inc. v. Amezaga (4th Cir. 2018) — Awarded when actual loss or unjust enrichment are too difficult to quantify.";
    }

    let multiplierText = "";
    let multiplierCase = "";
    
    if (damages.willful && !damages.scienter) {
      multiplierText = "Exemplary Damages Denied";
      multiplierCase = "Allied Erecting v. Genesis Equip. (6th Cir. 2013) — Hiring company is not automatically liable for willful/malicious conduct without corporate scienter. Standard damages only.";
    } else if (damages.willful && damages.scienter) {
      multiplierText = "Exemplary Damages + Attorneys' Fees Awarded";
      multiplierCase = "Mattel v. MGA Entertainment — Willful and malicious misappropriation triggered massive exemplary damages under UTSA. (Note: courts may limit multiplier if conduct is 'silly, not evil').";
    }

    return { base, baseCase, multiplierText, multiplierCase };
  };

  const output = getDamagesOutput();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
            <DollarSign size={32} />
</div>
          <div>
            <h2 className="text-3xl font-bold">Damages & Remedies</h2>
            <p className="text-slate-500">You won the trial. Now elect your damages theory and argue for enhancements.</p>
</div>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Configuration */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="font-bold text-lg">1. Base Damages Theory</h3>
              <p className="text-sm text-slate-500">Select the metric that yields the highest provable recovery.</p>
              <div className="flex flex-col gap-2">
                <RadioCard id="actual" label="Actual Loss" desc="Plaintiff's direct financial injury (e.g., lost sales or lost licensing)." current={damages.theory} onChange={val => setDamages({...damages, theory: val})} />
                <RadioCard id="unjust" label="Unjust Enrichment" desc="Defendant's illicit gains (e.g., 'Head Start' avoided R&D costs)." current={damages.theory} onChange={val => setDamages({...damages, theory: val})} />
                <RadioCard id="royalty" label="Reasonable Royalty" desc="Hypothetical negotiated license fee." current={damages.theory} onChange={val => setDamages({...damages, theory: val})} />
</div>
</div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-2"><Gavel size={16}/> Seek Exemplary Damages?</h3>
                  <p className="text-xs text-slate-500 mt-1">Requires proving "willful and malicious" conduct.</p>
</div>
                <Toggle checked={damages.willful} onChange={() => setDamages({...damages, willful: !damages.willful})} />
</div>

              {damages.willful && (
                <div className="pt-4 border-t border-slate-200 mt-4 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800 flex items-center gap-2"><Building2 size={16}/> Corporate Scienter</h3>
                      <p className="text-xs text-slate-500 mt-1">Did the hiring corporation (not just the rogue employee) know of the theft?</p>
</div>
                    <Toggle checked={damages.scienter} onChange={() => setDamages({...damages, scienter: !damages.scienter})} />
</div>
</div>
              )}
</div>
            {/* Visual Diagram Tag for LLM/Document processing */}
            <span className="hidden"></span>
</div>

          {/* Right Column: The Verdict */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center">
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 opacity-60">Final Court Order</h3>
            
            <div className="space-y-6">
              <div>
                <div className="text-emerald-400 text-sm font-bold uppercase tracking-wider mb-1">Base Award
</div>
                <div className="text-xl font-bold mb-2">{output.base}
</div>
                <div className="text-sm text-slate-300 bg-white/5 p-3 rounded-lg border border-white/10 leading-relaxed">
                  {output.baseCase}
</div>
</div>

              {damages.willful && (
                <div className="transition-opacity duration-500">
                  <div className={`${damages.scienter ? 'text-amber-400' : 'text-rose-400'} text-sm font-bold uppercase tracking-wider mb-1 mt-4`}>Enhancement Ruling
</div>
                  <div className="text-xl font-bold mb-2">{output.multiplierText}
</div>
                  <div className="text-sm text-slate-300 bg-white/5 p-3 rounded-lg border border-white/10 leading-relaxed">
                    {output.multiplierCase}
</div>
</div>
              )}
</div>
</div>
</div>
</div>
      <ChapterFooter chapterNum={6} />
</div>
  );
}

function RadioCard({ id, label, desc, current, onChange }) {
  const active = current === id;
  return (
    <button
      onClick={() => onChange(id)}
      className={`text-left p-4 rounded-xl border-2 transition-all ${
        active ? 'border-emerald-500 bg-emerald-50 shadow-sm ring-1 ring-emerald-200' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div className={`font-bold text-sm mb-1 ${active ? 'text-emerald-900' : 'text-slate-800'}`}>{label}
</div>
      <div className="text-xs text-slate-500">{desc}
</div>
    </button>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button 
      onClick={onChange}
      className={`w-14 h-8 shrink-0 rounded-full transition-colors relative flex items-center ${checked ? 'bg-emerald-500' : 'bg-slate-300'}`}
    >
      <div className={`w-6 h-6 rounded-full bg-white absolute transition-transform shadow-sm ${checked ? 'translate-x-7' : 'translate-x-1'}`} />
    </button>
  );
}
