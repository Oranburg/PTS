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

const NAV_CHAPTERS = [
  { path: '/ch1', label: 'Ch 1' },
  { path: '/ch2', label: 'Ch 2' },
  { path: '/ch3', label: 'Ch 3' },
  { path: '/ch4', label: 'Ch 4' },
  { path: '/ch5', label: 'Ch 5' },
  { path: '/ch6', label: 'Ch 6' },
  { path: '/ch7', label: 'Ch 7' },
];

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
