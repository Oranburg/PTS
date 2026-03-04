import React, { useState } from 'react';
import { 
  Layers, 
  Users, 
  Globe, 
  ScrollText, 
  XCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Database,
  Shield,
  Gavel,
  RefreshCw,
  PenTool
} from 'lucide-react';


export default function Chapter07() {
  const [activeTab, setActiveTab] = useState('crucible');

  const [crucible, setCrucible] = useState({
    nda: null,
    culture: null,
  });

  const [frontier, setFrontier] = useState({
    ai: null,
    eu: null,
  });

  const TABS = [
    { id: 'crucible', label: '1. Growth Crucible' },
    { id: 'frontier', label: '2. Frontier Stress Test' },
    { id: 'charter', label: '3. TSPP Charter' },
  ];

  return (
    <div>
      <div className="chapter-header">
        <div className="ch-label">Chapter 7</div>
        <h1>Governance Capstone</h1>
        <p>Growth stress tests, charter design, and living governance protocol.</p>
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
        {activeTab === 'crucible' && (
          <GrowthCrucible 
            state={crucible} 
            setState={setCrucible} 
            onNext={() => setActiveTab('frontier')} 
          />
        )}
        {activeTab === 'frontier' && (
          <FrontierStressTest 
            state={frontier} 
            setState={setFrontier} 
            onNext={() => setActiveTab('charter')} 
          />
        )}
        {activeTab === 'charter' && (
          <TSPPCharter />
        )}
      </div>
    </div>
  );
}

// --- TAB 1: THE GROWTH CRUCIBLE ---
function GrowthCrucible({ state, setState, onNext }) {
  
  const getFeedback = () => {
    if (!state.nda || !state.culture) return null;
    
    if (state.nda === 'fragile' && state.culture === 'fragile') {
      return {
        theme: 'rose',
        wrapClass: 'bg-rose-50 border-rose-200',
        headingClass: 'text-rose-800',
        bodyClass: 'text-rose-900',
        statusClass: 'bg-white/60 text-rose-900',
        iconClass: 'text-rose-600',
        heading: "Structural Fragility Detected",
        body: "Overbroad confidentiality agreements that sweep in information beyond what is necessary to protect a legitimate business interest risk being treated like de facto non-competes — and courts increasingly apply default unenforceability rules to them. (Hrdy & Seaman, 'Beyond Trade Secrecy,' Yale L.J. 2024.) Static onboarding produces a culture where employees cannot distinguish what actually requires protection, making secrecy norms impossible to enforce.",
        risk: "HIGH",
        statusText: "TSPP Phase 2 (Containment Architecture) is structurally compromised.",
        canAdvance: false
      };
    } else if (state.nda === 'resilient' && state.culture === 'resilient') {
      return {
        theme: 'emerald',
        wrapClass: 'bg-emerald-50 border-emerald-200',
        headingClass: 'text-emerald-800',
        bodyClass: 'text-emerald-900',
        statusClass: 'bg-white/60 text-emerald-900',
        iconClass: 'text-emerald-600',
        heading: "Dynamic Capability Achieved",
        body: "Tiered agreements calibrated to actual exposure are more enforceable and create sharper employee awareness of protected material. Research suggests that organizations that treat secrecy protection as an operational practice — not merely a legal compliance layer — achieve stronger internal information integration: employees share more freely within protected channels precisely because boundaries are clear. (See Andreicovici et al., SSRN 2023, on trade secret protection and internal transparency.)",
        risk: "LOW",
        statusText: "Advance to Phase 4 Governance.",
        canAdvance: true
      };
    } else {
      return {
        theme: 'amber',
        wrapClass: 'bg-amber-50 border-amber-200',
        headingClass: 'text-amber-800',
        bodyClass: 'text-amber-900',
        statusClass: 'bg-white/60 text-amber-900',
        iconClass: 'text-amber-600',
        heading: "Partial Protection — Residual Exposure",
        body: "One dimension of your Contract-Culture Interface is sound; the other creates systemic vulnerability. A strong agreement paired with a static culture produces paper protections that collapse in practice. A strong culture without calibrated agreements creates enforcement gaps in litigation.",
        risk: "MODERATE",
        statusText: "Revision required before Charter generation.",
        canAdvance: false
      };
    }
  };

  const feedback = getFeedback();

  return (
    <div className="space-y-8">
      {/* Setup Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-amber-900 mb-2">The Scaling Inflection Point</h2>
        <p className="text-amber-800 text-lg leading-relaxed">
          The company is growing from 50 to 500 employees. Static policies will fracture. You must configure the Contract-Culture Interface before the next funding round closes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Configurations */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-lg">Confidentiality Agreement Design</h3>
            <div className="grid grid-cols-1 gap-4">
              <SelectionCard 
                title="Universal NDA — One Size Fits All"
                desc="Every employee signs identical broad-scope confidentiality terms regardless of role or access level."
                icon={XCircle} iconColor="text-rose-500"
                active={state.nda === 'fragile'}
                onClick={() => setState({...state, nda: 'fragile'})}
              />
              <SelectionCard 
                title="Tiered Confidentiality Annexes"
                desc="Role-specific annexes calibrate scope to actual access. Engineers sign technical schedules; sales staff sign customer-data annexes. No employee is bound beyond their legitimate exposure."
                icon={CheckCircle2} iconColor="text-emerald-500"
                active={state.nda === 'resilient'}
                onClick={() => setState({...state, nda: 'resilient'})}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-lg">Secrecy Implementation Model</h3>
            <div className="grid grid-cols-1 gap-4">
              <SelectionCard 
                title="Static Onboarding Protocol"
                desc="Confidentiality policies are presented at hire and never revisited. Culture treats secrecy as HR compliance, not operational practice."
                icon={XCircle} iconColor="text-rose-500"
                active={state.culture === 'fragile'}
                onClick={() => setState({...state, culture: 'fragile'})}
              />
              <SelectionCard 
                title="Continuous Incident Debrief System"
                desc="Regular cross-functional reviews surface near-misses and policy gaps in real time. Secrecy norms are reinforced at role transitions, product launches, and partnership events."
                icon={CheckCircle2} iconColor="text-emerald-500"
                active={state.culture === 'resilient'}
                onClick={() => setState({...state, culture: 'resilient'})}
              />
            </div>
          </div>

        </div>

        {/* Right Column: Feedback */}
        <div className="lg:col-span-5">
          <div className="sticky top-32">
            {!feedback ? (
              <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200 text-center flex flex-col items-center justify-center h-full text-slate-500">
                <Shield size={48} className="mb-4 opacity-50" />
                <p className="font-medium">Select options to view structural analysis.</p>
              </div>
            ) : (
              <div className={`rounded-3xl p-8 border-2 transition-all duration-300 flex flex-col h-full ${feedback.wrapClass}`}>
                <h3 className={`text-2xl font-bold mb-4 ${feedback.headingClass}`}>{feedback.heading}</h3>
                <p className={`text-sm leading-relaxed mb-8 flex-1 ${feedback.bodyClass}`}>
                  {feedback.body}
                </p>
                
                <div className={`p-4 rounded-xl font-bold text-sm flex items-center gap-3 ${feedback.statusClass}`}>
                  <AlertTriangle size={18} className={`shrink-0 ${feedback.iconClass}`} />
                  <span>Risk Level: {feedback.risk} — {feedback.statusText}</span>
                </div>

                <button 
                  onClick={onNext}
                  disabled={!feedback.canAdvance}
                  className={`mt-6 w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                    feedback.canAdvance 
                      ? 'bg-slate-900 text-white hover:bg-black shadow-md' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Next: Frontier Test <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- TAB 2: THE FRONTIER STRESS TEST ---
function FrontierStressTest({ state, setState, onNext }) {

  const THEME_CLASSES = {
    rose:    { wrap: 'bg-rose-50 border-rose-200 text-rose-900' },
    amber:   { wrap: 'bg-amber-50 border-amber-200 text-amber-900' },
    emerald: { wrap: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
  };

  const getAIFeedback = () => {
    if (state.ai === 'open') return { theme: 'rose', text: "Open-source AI tools transmit prompts to third-party servers. Any trade secret embedded in a prompt or output is potentially disclosed to the model provider and exposed in training data. This is the 'Information Paradox' at scale: the tool that accelerates innovation simultaneously destroys the secrecy on which legal protection depends." };
    if (state.ai === 'banned') return { theme: 'amber', text: "Total prohibition fails in practice. Employees facing productivity pressure will use shadow AI tools, creating unlogged, uncontrolled disclosure pathways that are worse than a governed deployment. Prohibition is not a TSPP strategy — it is a TSPP abdication." };
    if (state.ai === 'closed') return { theme: 'emerald', text: "Enterprise AI deployment with audit logging and data classification enforcement extends the TSPP's access control architecture into the AI layer. The company gains the productivity benefit while preserving the documented control posture required to prove 'reasonable efforts' under DTSA/UTSA if litigation arises." };
    return null;
  };

  const getEUFeedback = () => {
    if (state.eu === 'us') return { theme: 'rose', text: "US-style aggressive injunctions, ex parte seizure provisions, and broad misappropriation definitions do not translate to EU courts. The EU Trade Secrets Directive (2016/943) imposes proportionality requirements on remedies and provides stronger whistleblower and press-freedom carve-outs than US law. A US TSPP applied verbatim in the EU will be partially unenforceable and may antagonize the very courts you need." };
    if (state.eu === 'localized') return { theme: 'emerald', text: "Parallel jurisdiction architecture is the standard for multinational TSPP design. EU operations maintain their own trade secret inventory, confidentiality tier structure, and remedies posture aligned to Directive 2016/943 — while the US operations maintain DTSA/UTSA coverage. The two plans are coordinated at the governance level through the annual audit cadence." };
    return null;
  };

  const aiFeedback = getAIFeedback();
  const euFeedback = getEUFeedback();
  const canAdvance = state.ai === 'closed' && state.eu === 'localized';

  return (
    <div className="space-y-8">
      {/* Setup Banner */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">The CEO's Growth Agenda</h2>
        <p className="text-indigo-800 text-lg leading-relaxed">
          The CEO wants to deploy Generative AI in the R&D pipeline and is opening operations in the EU. The TSPP must adapt to both simultaneously — or it will fail in both theaters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Scenarios */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-lg">Generative AI Deployment Model</h3>
            <div className="grid grid-cols-1 gap-4">
              <SelectionCard 
                title="Unrestricted Open-Source AI Access"
                desc="Employees may use any external AI tools for work tasks. No policy, no logging, no containment."
                active={state.ai === 'open'}
                onClick={() => setState({...state, ai: 'open'})}
              />
              <SelectionCard 
                title="Total AI Prohibition"
                desc="All generative AI use is banned. Policy enforced by IT blocking."
                active={state.ai === 'banned'}
                onClick={() => setState({...state, ai: 'banned'})}
              />
              <SelectionCard 
                title="Closed-Source, Rate-Limited Internal Deployment"
                desc="Company-hosted or enterprise-licensed AI with audit logging, data classification enforcement, and prompt-level access controls tied to the existing trade secret inventory."
                active={state.ai === 'closed'}
                onClick={() => setState({...state, ai: 'closed'})}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-lg">Cross-Border Legal Alignment</h3>
            <div className="grid grid-cols-1 gap-4">
              <SelectionCard 
                title="Apply US Standards Globally"
                desc="The TSPP's enforcement posture, NDA templates, and remedies framework are replicated verbatim in EU operations."
                active={state.eu === 'us'}
                onClick={() => setState({...state, eu: 'us'})}
              />
              <SelectionCard 
                title="Localized EU Trade Secrets Directive Alignment"
                desc="EU operations run parallel confidentiality infrastructure calibrated to Directive 2016/943 — including the EU's 'trade secret holder' standing requirements, proportionality limits on injunctive relief, and whistleblower carve-outs that differ materially from DTSA."
                active={state.eu === 'localized'}
                onClick={() => setState({...state, eu: 'localized'})}
              />
            </div>
          </div>

        </div>

        {/* Right Column: Feedback */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 space-y-6">
            
            {/* AI Feedback */}
            {aiFeedback ? (
              <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${THEME_CLASSES[aiFeedback.theme].wrap}`}>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-2 opacity-80">AI Integration Analysis</h4>
                <p className="text-sm leading-relaxed">{aiFeedback.text}</p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-sm text-center">
                Select an AI deployment model to view analysis.
              </div>
            )}

            {/* EU Feedback */}
            {euFeedback ? (
              <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${THEME_CLASSES[euFeedback.theme].wrap}`}>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-2 opacity-80">EU Alignment Analysis</h4>
                <p className="text-sm leading-relaxed">{euFeedback.text}</p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 text-sm text-center">
                Select a cross-border legal alignment to view analysis.
              </div>
            )}

            <button 
              onClick={onNext}
              disabled={!canAdvance}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                canAdvance 
                  ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-md shadow-amber-900/20' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Generate Final Charter <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENT FOR SELECTIONS ---
function SelectionCard({ title, desc, icon: Icon, iconColor, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-start gap-4 ${
        active 
          ? 'border-indigo-500 bg-indigo-50 shadow-md ring-2 ring-indigo-200 ring-offset-2' 
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {Icon && <Icon size={24} className={`shrink-0 ${iconColor} mt-0.5`} />}
      <div>
        <div className="font-bold text-slate-800 mb-1">{title}</div>
        <div className="text-sm text-slate-500 leading-relaxed">{desc}</div>
      </div>
    </button>
  );
}


// --- TAB 3: THE TSPP EXECUTIVE CHARTER ---
function TSPPCharter() {
  return (
    <div className="bg-white shadow-xl max-w-4xl mx-auto rounded-lg overflow-hidden border border-slate-200">
      
      {/* Document Header */}
      <div className="p-12 pb-8 border-b-2 border-amber-500 bg-slate-50">
        <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">
          Trade Secret Protection Plan — Executive Charter
        </h2>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-500 uppercase tracking-widest">
          <span>Prepared by: Outside Counsel</span>
          <span>|</span>
          <span>Version 1.0</span>
          <span>|</span>
          <span>{new Date().getFullYear()}</span>
          <span>|</span>
          <span className="text-rose-600 font-bold">CONFIDENTIAL</span>
        </div>
      </div>

      <div className="p-12 space-y-10">
        
        {/* Phase 1 */}
        <CharterSection 
          number="1" 
          title="Asset Foundation (Ch. 2–3)" 
          icon={Database}
        >
          <div className="space-y-2 text-slate-700">
            <p><span className="font-bold text-slate-900">Trade Secret Inventory Status:</span> ESTABLISHED</p>
            <p><span className="font-bold text-slate-900">Risk Assessment Matrix:</span> COMPLETED</p>
            <p><span className="font-bold text-slate-900">Crown Jewel Classification:</span> HIGH / MEDIUM / LOW tiers defined</p>
            <p><span className="font-bold text-slate-900">Baseline Reasonable Efforts Documentation:</span> ON FILE</p>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900 font-medium">
              <ArrowRight size={14} className="inline mr-2" />
              Next Review Trigger: Any new product line, acquisition target, or key employee departure.
            </div>
          </div>
        </CharterSection>

        {/* Phase 2 */}
        <CharterSection 
          number="2" 
          title="Containment Architecture (Ch. 4–5)" 
          icon={Shield}
        >
          <div className="space-y-2 text-slate-700">
            <p><span className="font-bold text-slate-900">Internal Controls:</span> Tiered Confidentiality Annexes deployed (role-calibrated)</p>
            <p><span className="font-bold text-slate-900">JML Protocol:</span> Joiner / Mover / Leaver procedures active</p>
            <p><span className="font-bold text-slate-900">External Controls:</span> Staged Disclosure Framework governing investor and partner access</p>
            <p><span className="font-bold text-slate-900">Vendor/Third-Party NDAs:</span> Differentiated by relationship type</p>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900 font-medium">
              <ArrowRight size={14} className="inline mr-2" />
              Residual Exposure: Tacit knowledge, irretrievable disclosures, and reverse-engineerable product elements carry forward to Phase 3.
            </div>
          </div>
        </CharterSection>

        {/* Phase 3 */}
        <CharterSection 
          number="3" 
          title="Enforcement Posture (Ch. 6)" 
          icon={Gavel}
        >
          <div className="space-y-4 text-slate-700">
            <p><span className="font-bold text-slate-900">Enforcement Strategy Table:</span> COMPLETED (Attachment E)</p>
            <p><span className="font-bold text-slate-900">Preferred Forum:</span> Federal (DTSA) for crown-jewel assets; state (UTSA) for cost-sensitive matters</p>
            
            <div className="pl-4 border-l-2 border-slate-300 space-y-1 py-1">
              <p className="font-bold text-slate-900 mb-2">Graduated Response Protocol:</p>
              <p className="text-sm"><ArrowRight size={12} className="inline mr-2 text-amber-600"/>Tier 1: Investigation + Evidence Preservation</p>
              <p className="text-sm"><ArrowRight size={12} className="inline mr-2 text-amber-600"/>Tier 2: Cease-and-Desist</p>
              <p className="text-sm"><ArrowRight size={12} className="inline mr-2 text-amber-600"/>Tier 3: Preliminary Injunction</p>
              <p className="text-sm"><ArrowRight size={12} className="inline mr-2 text-amber-600"/>Tier 4: Full Litigation (Last Resort)</p>
            </div>

            <p><span className="font-bold text-slate-900">Budget Constraint Acknowledgment:</span> Enforcement cost projections reviewed against annual revenue baseline.</p>
            
            <div className="p-3 bg-slate-100 rounded-lg text-sm text-slate-600 italic">
              Note: This Enforcement Plan constitutes documented evidence of 'reasonable efforts' under DTSA § 1839(3) and UTSA § 1(4)(ii).
            </div>
          </div>
        </CharterSection>

        {/* Phase 4 */}
        <CharterSection 
          number="4" 
          title="Governance & Living Document Protocol (Ch. 7)" 
          icon={RefreshCw}
        >
          <div className="space-y-4 text-slate-700">
            <p><span className="font-bold text-slate-900">Annual Audit Cadence:</span> Q1 each fiscal year</p>
            <p><span className="font-bold text-slate-900">TSPP Owner:</span> [Designated Counsel / Chief Legal Officer]</p>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-900 mb-3">Mandatory Update Triggers:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><div className="w-3 h-3 border border-slate-400 rounded-sm"></div> Key employee hire or departure</li>
                <li className="flex items-center gap-2"><div className="w-3 h-3 border border-slate-400 rounded-sm"></div> New vendor, co-packer, or partner relationship</li>
                <li className="flex items-center gap-2"><div className="w-3 h-3 border border-slate-400 rounded-sm"></div> Investor due diligence event</li>
                <li className="flex items-center gap-2"><div className="w-3 h-3 border border-slate-400 rounded-sm"></div> New product launch or technology deployment</li>
                <li className="flex items-center gap-2"><div className="w-3 h-3 border border-slate-400 rounded-sm"></div> Regulatory or legislative change (state NDA law, FTC rulemaking, EU Directive amendment)</li>
                <li className="flex items-center gap-2"><div className="w-3 h-3 border border-slate-400 rounded-sm"></div> Cybersecurity incident or near-miss</li>
              </ul>
            </div>

            <p><span className="font-bold text-slate-900">AI Deployment Policy:</span> Closed-source enterprise deployment with audit logging — classified per Phase 1 inventory tiers.</p>
            <p><span className="font-bold text-slate-900">International Alignment:</span> Localized EU Directive 2016/943 compliance parallel to US DTSA standards.</p>
          </div>
        </CharterSection>

        {/* Phase 5 */}
        <CharterSection 
          number="5" 
          title="Executive Ratification" 
          icon={PenTool}
        >
          <div className="space-y-8 text-slate-700">
            <p className="leading-relaxed">
              The Trade Secret Protection Plan is formally adopted. Legal, HR, and IT leadership are authorized to execute the above containment and governance architectures.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-between gap-8 pt-8">
              <div className="flex-1">
                <div className="border-b border-slate-400 w-full mb-2"></div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Chief Executive Officer</p>
              </div>
              <div className="w-48">
                <div className="border-b border-slate-400 w-full mb-2"></div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Date</p>
              </div>
            </div>
          </div>
        </CharterSection>

      </div>
    </div>
  );
}

function CharterSection({ number, title, icon: Icon, children }) {
  return (
    <div className="relative pl-10 md:pl-16">
      <div className="absolute left-0 top-0 w-8 h-8 md:w-10 md:h-10 bg-amber-500 text-white font-bold rounded-full flex items-center justify-center text-lg shadow-sm">
        {number}
      </div>
      <div className="mb-4 flex items-center gap-3">
        <Icon className="text-amber-500" size={24} />
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}
