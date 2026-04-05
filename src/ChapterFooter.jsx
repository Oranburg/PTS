import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isChapterComplete, markChapterComplete, getStudentName, setStudentName } from './progress';

const CHAPTERS = [
  { num: 1, path: '/ch1', title: 'Foundations' },
  { num: 2, path: '/ch2', title: 'Inventory & Classification' },
  { num: 3, path: '/ch3', title: 'Risk & Vulnerability' },
  { num: 4, path: '/ch4', title: 'Internal Mitigation' },
  { num: 5, path: '/ch5', title: 'External Controls' },
  { num: 6, path: '/ch6', title: 'Enforcement & Remedies' },
  { num: 7, path: '/ch7', title: 'Governance Capstone' },
];

const PODCAST_MAP = {
  1: ['PTS 1A: Foundations', 'PTS 1B: Patents vs Trade Secrets', 'PTS 1C: UTSA, DTSA, Global Framework'],
  2: ['PTS 2A: What Makes a Secret', 'PTS 2B: Reasonable Efforts'],
  3: ['PTS 3A: Risk & Uncertainty', 'PTS 3B: Mapping Risk', 'PTS 3C: Valuing Trade Secrets'],
  4: ['PTS 4A: Enforceable Agreements', 'PTS 4B: Joiner-Mover-Leaver', 'PTS 4C: Culture of Secrecy'],
  5: ['PTS 5A: Third-Party NDAs', 'PTS 5B: Supply Chains & Cybersecurity', 'PTS 5C: Staged Disclosure'],
  6: ['PTS 6A: Misappropriation', 'PTS 6B: Injunctive Relief', 'PTS 6C: Damages & Strategy'],
  7: ['PTS 7A: Six Pillars', 'PTS 7B: Protection Plan', 'PTS 7C: Governance that Lasts', 'PTS 7D: Network Theory'],
};

export default function ChapterFooter({ chapterNum }) {
  const [completed, setCompleted] = useState(isChapterComplete(chapterNum));
  const [showCert, setShowCert] = useState(false);
  const [nameInput, setNameInput] = useState(getStudentName());

  const idx = CHAPTERS.findIndex(c => c.num === chapterNum);
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;
  const podcasts = PODCAST_MAP[chapterNum] || [];

  function handleComplete() {
    markChapterComplete(chapterNum);
    setCompleted(true);
  }

  async function handleCertificate() {
    const name = nameInput.trim();
    if (!name) return;
    setStudentName(name);
    setShowCert(false);

    // Load jsPDF
    if (!window.jspdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js';
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const W = 297, H = 210;
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const ch = CHAPTERS[idx];

    // Background
    doc.setFillColor(10, 50, 85);
    doc.rect(0, 0, W, H, 'F');

    // Border
    doc.setDrawColor(109, 172, 222);
    doc.setLineWidth(1.5);
    doc.roundedRect(10, 10, W - 20, H - 20, 3, 3, 'S');
    doc.setLineWidth(0.5);
    doc.roundedRect(14, 14, W - 28, H - 28, 2, 2, 'S');

    // Header
    doc.setTextColor(109, 172, 222);
    doc.setFontSize(11);
    doc.text('PROTECTING TRADE SECRETS', W / 2, 32, { align: 'center' });
    doc.setFontSize(9);
    doc.setTextColor(160, 160, 180);
    doc.text('Seth C. Oranburg', W / 2, 39, { align: 'center' });

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('Certificate of Completion', W / 2, 58, { align: 'center' });

    doc.setDrawColor(109, 172, 222);
    doc.setLineWidth(0.6);
    doc.line(W / 2 - 50, 63, W / 2 + 50, 63);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 180, 200);
    doc.text('This certifies that', W / 2, 75, { align: 'center' });

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(name, W / 2, 88, { align: 'center' });

    const nw = doc.getTextWidth(name);
    doc.setDrawColor(109, 172, 222);
    doc.setLineWidth(0.3);
    doc.line(W / 2 - nw / 2 - 5, 91, W / 2 + nw / 2 + 5, 91);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 180, 200);
    doc.text('has successfully completed', W / 2, 102, { align: 'center' });

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(109, 172, 222);
    doc.text(`Chapter ${ch.num}: ${ch.title}`, W / 2, 114, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 180, 200);
    doc.text('Protecting Trade Secrets', W / 2, 122, { align: 'center' });

    doc.setFontSize(10);
    doc.text('Completed: ' + dateStr, W / 2, 160, { align: 'center' });

    doc.setFontSize(8);
    doc.setTextColor(120, 120, 140);
    doc.text('Protecting Trade Secrets \u00b7 oranburg.law', W / 2, 186, { align: 'center' });

    doc.save(`PTS-ch${ch.num}-certificate.pdf`);
  }

  return (
    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '2px solid var(--border)' }}>
      {/* Completion */}
      {!completed ? (
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <button className="btn" onClick={handleComplete}>
            Mark Chapter {chapterNum} Complete
          </button>
        </div>
      ) : (
        <div className="note note-success" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <strong>Chapter {chapterNum} complete.</strong>
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-sm btn-ghost" onClick={() => setShowCert(true)}>
              Download Certificate (PDF)
            </button>
          </div>
        </div>
      )}

      {/* Certificate modal */}
      {showCert && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 200 }}>
          <div className="card" style={{ maxWidth: '380px', width: '90%' }}>
            <h3 style={{ marginTop: 0 }}>Export Certificate</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Enter your name:</p>
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCertificate()}
              placeholder="Your full name"
              autoFocus
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setShowCert(false)}>Cancel</button>
              <button className="btn" onClick={handleCertificate}>Generate PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* Podcast */}
      {podcasts.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            <strong>Review this chapter:</strong>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {podcasts.map(ep => (
              <a key={ep} href="https://bizlawbreakdown.podbean.com" target="_blank" rel="noopener noreferrer"
                className="badge badge-blue" style={{ textDecoration: 'none', fontSize: '0.78rem' }}>
                {ep}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        {prev ? (
          <Link to={prev.path} className="btn btn-ghost">&larr; Ch {prev.num}: {prev.title}</Link>
        ) : <span />}
        <Link to="/" className="btn btn-ghost">Home</Link>
        {next ? (
          <Link to={next.path} className="btn">Ch {next.num}: {next.title} &rarr;</Link>
        ) : (
          <Link to="/" className="btn">Course Complete &rarr;</Link>
        )}
      </div>
    </div>
  );
}
