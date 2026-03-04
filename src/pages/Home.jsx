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
    </div>
  );
}
