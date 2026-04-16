import React from 'react';
import { Link } from 'react-router-dom';
import { isChapterComplete, getCompletedCount } from '../progress';

const CHAPTERS = [
  {
    path: '/ch1',
    num: 1,
    title: 'Foundations',
    desc: 'Three elements of a trade secret, the IP landscape, misappropriation, and remedies.',
  },
  {
    path: '/ch2',
    num: 2,
    title: 'Inventory & Classification',
    desc: 'Audit assets, classify by type, and prioritize by legal and business value.',
  },
  {
    path: '/ch3',
    num: 3,
    title: 'Risk & Vulnerability',
    desc: 'Threat vectors, risk matrix, and a practical risk register workflow.',
  },
  {
    path: '/ch4',
    num: 4,
    title: 'Internal Mitigation',
    desc: 'Covenants, jurisdiction choices, invention assignment, and compliance architecture.',
  },
  {
    path: '/ch5',
    num: 5,
    title: 'External Controls',
    desc: 'Relationship-specific architecture for contracts, system controls, and staged disclosure.',
  },
  {
    path: '/ch6',
    num: 6,
    title: 'Enforcement & Remedies',
    desc: 'Complaint quality, emergency injunctive relief, and damages theories under UTSA and DTSA.',
  },
  {
    path: '/ch7',
    num: 7,
    title: 'Governance Capstone',
    desc: 'Growth stress tests, frontier compliance, and a living Trade Secret Protection Plan.',
  },
];

const REVIEW_VIDEOS = [
  {
    ch: 1,
    title: 'Understanding Trade Secret Law',
    review: 'Sh3Uh3mp4Zs',
    application: '_jVyjyD_CBA',
  },
  {
    ch: 2,
    title: 'Inventorying and Classifying Trade Secrets',
    review: '0bN34vAASic',
    application: 'qaCeT_YaXnw',
  },
  {
    ch: 3,
    title: 'Assessing Risks and Mitigating Vulnerabilities',
    review: 'DTtHiFpz_I4',
    application: 'oXWFZH53T6Y',
  },
  {
    ch: 4,
    title: 'Mitigating Internal Vulnerabilities',
    review: 'PbANGygLD1g',
    application: 'DTfrBj5g7AU',
  },
  {
    ch: 5,
    title: 'Mitigating External Liabilities',
    review: '-Z62eCVKzU0',
    application: '52yS41pdJyQ',
  },
  {
    ch: 6,
    title: 'Enforcing Trade Secret Rights',
    review: 'yE6j9NDEEWE',
    application: '3K75LVc0jBY',
  },
  {
    ch: 7,
    title: 'Sustaining and Adapting Trade Secret Protection',
    review: '1XwMOH3tg0Y',
    application: 'qzcECmOgGdo',
  },
];

const CLASS_ACTIVITIES = [
  {
    href: './chapters/team-charter.html',
    tag: 'Team Exercise',
    title: 'TSPP Team Charter',
    desc: 'Build a trade secret protection plan for your team.',
  },
  {
    href: './chapters/firm-strengths.html',
    tag: 'Self-Assessment',
    title: 'Firm Strengths Finder',
    desc: 'Map your firm\'s strengths to trade secret protection strategies.',
  },
  {
    href: './patent-or-TS/index.html',
    tag: 'IP Strategy Tool',
    title: 'Patent vs. Trade Secret',
    desc: 'Interactive hypotheticals: when to patent and when to keep it secret.',
  },
  {
    href: './drafting-lab/index.html',
    tag: 'Drafting Lab',
    title: 'Internal Mitigation Drafting Lab',
    desc: 'Audit a defective employment agreement clause-by-clause.',
  },
  {
    href: './deal-room/index.html',
    tag: 'Deal Room',
    title: 'Deal Room Simulation',
    desc: 'Step into a simulated law firm deal room. Choose your client, identify risks, and assemble a complete agreement.',
  },
];

export default function Home() {
  const completed = getCompletedCount();
  const pct = Math.round((completed / 7) * 100);

  return (
    <div>
      <div className="home-hero">
        <h1>Protecting Trade Secrets</h1>
        <p>
          An interactive learning companion for <em>Protecting Trade Secrets</em> by Seth C. Oranburg.
          Seven chapters covering the complete trade secret protection lifecycle — from foundations through governance.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
          <a href="https://bizlawbreakdown.podbean.com" target="_blank" rel="noopener noreferrer" className="btn">
            Podcast (23 episodes)
          </a>
          <a href="https://oranburg.law/courses/trade-secrets/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Course Page
          </a>
        </div>
      </div>

      {completed > 0 && (
        <div className="note" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <strong>Your Progress</strong>
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{completed} of 7 chapters ({pct}%)</span>
          </div>
          <div style={{ height: '6px', borderRadius: '999px', background: '#e2e8f0', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'var(--primary-light)', width: pct + '%', transition: 'width 0.3s' }} />
          </div>
        </div>
      )}

      <div className="chapter-grid">
        {CHAPTERS.map(({ path, num, title, desc }) => {
          const done = isChapterComplete(num);
          return (
            <Link key={path} to={path} className="chapter-card" style={done ? { borderColor: 'var(--primary-light)', background: '#f0f9ff' } : {}}>
              <span className="ch-num" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Chapter {num}
                {done && <span style={{ color: '#16a34a', fontSize: '0.9rem' }}>&#10003;</span>}
              </span>
              <h2>{title}</h2>
              <p>{desc}</p>
              <span className="card-arrow">{done ? 'Review' : 'Open'} chapter &rarr;</span>
            </Link>
          );
        })}
      </div>

      <div className="activities-section">
        <h2 className="activities-heading">Interactive Tools</h2>
        <p className="activities-subheading">
          Hands-on exercises, drafting labs, and simulations.
        </p>
        <div className="chapter-grid">
          {CLASS_ACTIVITIES.map(({ href, tag, title, desc }) => (
            <a key={href} href={href} className="activity-card">
              <span className="ch-num">{tag}</span>
              <h2>{title}</h2>
              <p>{desc}</p>
              <span className="card-arrow">Open &rarr;</span>
            </a>
          ))}
        </div>
      </div>

      <div className="activities-section">
        <h2 className="activities-heading">Final Review Videos</h2>
        <p className="activities-subheading">
          Student-created review and application videos for each chapter.
        </p>
        {REVIEW_VIDEOS.map(({ ch, title, review, application }) => (
          <div key={ch} style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--heading)' }}>
              Chapter {ch}: {title}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.5rem', fontWeight: 500 }}>Review</p>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${review}`}
                    title={`Ch ${ch} Review`}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.5rem', fontWeight: 500 }}>Application</p>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${application}`}
                    title={`Ch ${ch} Application`}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
          <a href="https://oranburg.law" style={{ color: 'var(--primary-light)' }}>oranburg.law</a>
          {' \u00b7 '}
          <a href="https://oranburg.law/courses/trade-secrets/" style={{ color: 'var(--primary-light)' }}>Course Page</a>
          {' \u00b7 '}
          <a href="https://www.youtube.com/@BizLaw" style={{ color: 'var(--primary-light)' }}>Video Lectures</a>
        </p>
      </div>
    </div>
  );
}
