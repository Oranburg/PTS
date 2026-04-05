import ChapterFooter from '../../ChapterFooter.jsx';
import React, { useState, useCallback } from 'react';

const TABS = [
  { id: 'elements', label: '1. Three Elements' },
  { id: 'landscape', label: '2. IP Landscape' },
  { id: 'misappropriation', label: '3. Misappropriation' },
  { id: 'remedies', label: '4. Remedies' },
];

export default function Chapter01() {
  const [activeTab, setActiveTab] = useState('elements');

  const handleKeyDown = useCallback((e, idx) => {
    const len = TABS.length;
    let next = null;
    if (e.key === 'ArrowRight') next = (idx + 1) % len;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + len) % len;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = len - 1;
    if (next !== null) {
      e.preventDefault();
      setActiveTab(TABS[next].id);
      document.getElementById(`tab-${TABS[next].id}`)?.focus();
    }
  }, []);

  return (
    <div>
      <div className="chapter-header">
        <div className="ch-label">Chapter 1
</div>
        <h1>Foundations of Trade Secret Law</h1>
        <p>Companion diagrams and visualizations for Chapter 1.</p>
</div>

      <div className="tab-bar" role="tablist" aria-label="Chapter sections">
        {TABS.map((t, idx) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={activeTab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={activeTab === t.id ? 0 : -1}
            className="tab-btn"
            onClick={() => setActiveTab(t.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          >
            {t.label}
          </button>
        ))}
</div>

      <div className="card">
        {activeTab === 'elements' && (
          <section id="panel-elements" role="tabpanel" aria-labelledby="tab-elements" tabIndex={0}>
            <h2>The Three Essential Elements</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
              Under the UTSA, information must meet all three criteria simultaneously to qualify for trade secret protection.
            </p>
            <div className="grid-3">
              <article className="panel">
                <h3>1. Information</h3>
                <ul>
                  <li>Concrete, definable content</li>
                  <li>Formulas &amp; recipes</li>
                  <li>Algorithms &amp; programs</li>
                  <li>Methods &amp; techniques</li>
                </ul>
              </article>
              <article className="panel">
                <h3>2. Economic Value</h3>
                <ul>
                  <li>Value derives from secrecy</li>
                  <li>Not generally known</li>
                  <li>Not readily ascertainable</li>
                  <li>Competitive edge</li>
                </ul>
              </article>
              <article className="panel">
                <h3>3. Reasonable Efforts</h3>
                <ul>
                  <li>NDA and contract controls</li>
                  <li>Password protections</li>
                  <li>Need-to-know access</li>
                  <li>Confidential markings</li>
                </ul>
              </article>
</div>
            <div className="note">
              <strong>Result:</strong> Protection can last indefinitely while secrecy is maintained.
</div>
          </section>
        )}

        {activeTab === 'landscape' && (
          <section id="panel-landscape" role="tabpanel" aria-labelledby="tab-landscape" tabIndex={0}>
            <h2>The Intellectual Property Framework</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.92rem' }}>
              Comparing the four primary forms of intellectual property.
            </p>
            <div className="grid-2">
              <article className="panel">
                <h3>Trade Secret</h3>
                <ul>
                  <li>Hidden methods, formulas, data</li>
                  <li>Requires secrecy + value</li>
                  <li>Indefinite until leaked</li>
                  <li>No registration required</li>
                </ul>
              </article>
              <article className="panel">
                <h3>Patent</h3>
                <ul>
                  <li>Novel inventions &amp; processes</li>
                  <li>Requires public disclosure</li>
                  <li>Typically 20 years</li>
                  <li>Government registration</li>
                </ul>
              </article>
              <article className="panel">
                <h3>Copyright</h3>
                <ul>
                  <li>Original creative expression</li>
                  <li>Fixed in tangible medium</li>
                  <li>Life + 70 years</li>
                  <li>Protects expression, not idea</li>
                </ul>
              </article>
              <article className="panel">
                <h3>Trademark</h3>
                <ul>
                  <li>Brand names and logos</li>
                  <li>Public use in commerce</li>
                  <li>Can be indefinite</li>
                  <li>Prevents consumer confusion</li>
                </ul>
              </article>
</div>
          </section>
        )}

        {activeTab === 'misappropriation' && (
          <section id="panel-misappropriation" role="tabpanel" aria-labelledby="tab-misappropriation" tabIndex={0}>
            <h2>Misappropriation vs. Proper Means</h2>
            <div className="grid-3">
              <article className="panel">
                <h3>Proper Means (Lawful)</h3>
                <ul>
                  <li>Independent discovery</li>
                  <li>Reverse engineering public product</li>
                  <li>Public-source information</li>
                </ul>
                <p><strong>No Liability</strong></p>
              </article>
              <article className="panel">
                <h3>Improper Acquisition (Unlawful)</h3>
                <ul>
                  <li>Theft or trespass</li>
                  <li>Hacking / cyber espionage</li>
                  <li>Bribery / inducing NDA breach</li>
                </ul>
                <p><strong>Misappropriation</strong></p>
              </article>
              <article className="panel">
                <h3>Improper Use / Disclosure (Unlawful)</h3>
                <ul>
                  <li>Exceeding NDA scope</li>
                  <li>Unauthorized external sharing</li>
                  <li>Using entrusted data to compete</li>
                </ul>
                <p><strong>Misappropriation</strong></p>
              </article>
</div>
          </section>
        )}

        {activeTab === 'remedies' && (
          <section id="panel-remedies" role="tabpanel" aria-labelledby="tab-remedies" tabIndex={0}>
            <h2>Remedies for Misappropriation</h2>
            <div className="grid-2">
              <article className="panel">
                <h3>1. Injunctive Relief</h3>
                <ul>
                  <li>Preliminary injunction during litigation</li>
                  <li>Permanent injunction post-trial</li>
                  <li>Possible head-start injunction</li>
                </ul>
              </article>
              <article className="panel">
                <h3>2. Monetary Damages</h3>
                <ul>
                  <li>Actual loss</li>
                  <li>Unjust enrichment</li>
                  <li>Reasonable royalty</li>
                </ul>
              </article>
</div>
            <div className="note">
              <strong>3. Enhanced Damages &amp; Fees:</strong> For willful and malicious conduct, courts may award
              exemplary damages and attorney fees.
</div>
          </section>
        )}
</div>
      <ChapterFooter chapterNum={1} />
</div>
  );
}
