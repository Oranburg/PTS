import React from 'react';
import { Link } from 'react-router-dom';

const CHAPTERS = [
  {
    path: '/ch1',
    num: 'Chapter 1',
    title: 'Foundations',
    desc: 'Three elements of a trade secret, the IP landscape, misappropriation, and remedies.',
  },
  {
    path: '/ch2',
    num: 'Chapter 2',
    title: 'Inventory & Classification',
    desc: 'Audit assets, classify by type, and prioritize by legal and business value.',
  },
  {
    path: '/ch3',
    num: 'Chapter 3',
    title: 'Risk & Vulnerability',
    desc: 'Threat vectors, risk matrix, and a practical risk register workflow.',
  },
  {
    path: '/ch4',
    num: 'Chapter 4',
    title: 'Internal Mitigation',
    desc: 'Covenants, jurisdiction choices, invention assignment, and stage output logic.',
  },
  {
    path: '/ch5',
    num: 'Chapter 5',
    title: 'External Controls',
    desc: 'Relationship-specific architecture for contracts and system controls.',
  },
  {
    path: '/ch6',
    num: 'Chapter 6',
    title: 'Enforcement & Remedies',
    desc: 'Complaint quality, emergency injunctive relief, and damages theories.',
  },
  {
    path: '/ch7',
    num: 'Chapter 7',
    title: 'Governance Capstone',
    desc: 'Growth stress tests, charter design, and living governance protocol.',
  },
];

const CLASS_ACTIVITIES = [
  {
    href: './chapters/team-charter.html',
    tag: 'Team Exercise',
    title: 'TSPP Team Charter',
    desc: 'Build a trade secret protection plan for your team — roles, responsibilities, and governance commitments.',
    arrow: 'Open activity →',
  },
  {
    href: './chapters/firm-strengths.html',
    tag: 'Self-Assessment',
    title: 'Firm Strengths Finder',
    desc: 'Identify and map your firm\'s unique strengths to trade secret protection strategies.',
    arrow: 'Open activity →',
  },
  {
    href: './patent-or-TS/index.html',
    tag: 'IP Strategy Tool',
    title: 'Patent vs. Trade Secret',
    desc: 'Interactive hypotheticals to sharpen your judgment on when to patent and when to keep it secret.',
    arrow: 'Open tool →',
  },
  {
    href: './patent-or-TS/class-activities.html',
    tag: 'Structured Exercises',
    title: 'Patent/TS Class Activities',
    desc: 'Guided classroom exercises with rubrics, discussion prompts, and group activities.',
    arrow: 'Open exercises →',
  },
  {
    href: './drafting-lab/index.html',
    tag: 'Drafting Lab',
    title: 'Internal Mitigation Drafting Lab',
    desc: 'Audit a defective employment agreement clause-by-clause, find every legal flaw, and redraft toward a compliant agreement.',
    arrow: 'Open lab →',
  },
  {
    href: './deal-room/index.html',
    tag: 'Deal Room',
    title: 'Deal Room — Pico Salsa Engagement',
    desc: 'Step into a simulated law firm deal room. Choose your client, identify risks, select precedents from a closed library, and assemble a complete employment agreement.',
    arrow: 'Enter deal room →',
  },
];

export default function Home() {
  return (
    <div>
      <div className="home-hero">
        <h1>Protecting Trade Secrets</h1>
        <p>
          An interactive learning companion for students, practitioners, and audiobook listeners.
          Each chapter provides visualizations, tools, and exercises rooted in real legal frameworks.
        </p>
      </div>
      <div className="chapter-grid">
        {CHAPTERS.map(({ path, num, title, desc }) => (
          <Link key={path} to={path} className="chapter-card">
            <span className="ch-num">{num}</span>
            <h2>{title}</h2>
            <p>{desc}</p>
            <span className="card-arrow">Open chapter →</span>
          </Link>
        ))}
      </div>

      <div className="activities-section">
        <h2 className="activities-heading">Class Activities</h2>
        <p className="activities-subheading">
          Hands-on exercises, interactive tools, and drafting labs to reinforce each chapter's concepts.
        </p>
        <div className="chapter-grid">
          {CLASS_ACTIVITIES.map(({ href, tag, title, desc, arrow }) => (
            <a key={href} href={href} className="activity-card">
              <span className="ch-num">{tag}</span>
              <h2>{title}</h2>
              <p>{desc}</p>
              <span className="card-arrow">{arrow}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
