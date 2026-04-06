import React from 'react';
import { HashRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Chapter01 from './chapters/ch01/Chapter01.jsx';
import Chapter02 from './chapters/ch02/Chapter02.jsx';
import Chapter03 from './chapters/ch03/Chapter03.jsx';
import Chapter04 from './chapters/ch04/Chapter04.jsx';
import Chapter05 from './chapters/ch05/Chapter05.jsx';
import Chapter06 from './chapters/ch06/Chapter06.jsx';
import Chapter07 from './chapters/ch07/Chapter07.jsx';
import NotFound from './pages/NotFound.jsx';
import Sources from './pages/Sources.jsx';

const NAV_CHAPTERS = [
  { path: '/ch1', label: 'Ch 1' },
  { path: '/ch2', label: 'Ch 2' },
  { path: '/ch3', label: 'Ch 3' },
  { path: '/ch4', label: 'Ch 4' },
  { path: '/ch5', label: 'Ch 5' },
  { path: '/ch6', label: 'Ch 6' },
  { path: '/ch7', label: 'Ch 7' },
  { path: '/sources', label: 'Sources' },
];

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme');
  var next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('pts-theme', next);
}

function Header() {
  return (
    <header className="global-header">
      <Link to="/" className="brand">Protecting Trade Secrets</Link>
      <nav aria-label="Chapter navigation">
        <ul className="global-nav">
          {NAV_CHAPTERS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle dark/light mode" title="Toggle theme">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="global-footer">
      <div>© 2026 Seth C. Oranburg · <em>Protecting Trade Secrets</em> Learning Companion</div>
      <div style={{ marginTop: '0.4rem', fontSize: '0.78rem' }}>
        <a href="https://oranburg.law" style={{ color: 'rgba(255,255,255,0.6)' }}>oranburg.law</a>
        {' · '}
        <a href="https://oranburg.law/courses/trade-secrets/" style={{ color: 'rgba(255,255,255,0.6)' }}>Course Page</a>
        {' · '}
        <a href="https://bizlawbreakdown.podbean.com" style={{ color: 'rgba(255,255,255,0.6)' }}>Podcast</a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <Header />
        <main className="page-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ch1" element={<Chapter01 />} />
            <Route path="/ch2" element={<Chapter02 />} />
            <Route path="/ch3" element={<Chapter03 />} />
            <Route path="/ch4" element={<Chapter04 />} />
            <Route path="/ch5" element={<Chapter05 />} />
            <Route path="/ch6" element={<Chapter06 />} />
            <Route path="/ch7" element={<Chapter07 />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
