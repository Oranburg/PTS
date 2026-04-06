import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, BookOpen, Scale, Filter, ChevronDown, ChevronRight, ExternalLink, AlertTriangle } from 'lucide-react';

const CHAPTER_NAMES = {
  1: 'Foundations',
  2: 'Inventory & Classification',
  3: 'Risk & Vulnerability',
  4: 'Internal Mitigation',
  5: 'External Controls',
  6: 'Enforcement & Remedies',
  7: 'Governance Capstone',
};

const CATEGORY_LABELS = {
  'damages-royalty': 'Damages & Royalties',
  'injunction': 'Injunctions',
  'employee-mobility': 'Employee Mobility',
  'misappropriation': 'Misappropriation',
  'preemption': 'Preemption',
  'general': 'General',
};

export default function Sources() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [chapterFilter, setChapterFilter] = useState(searchParams.get('ch') ? parseInt(searchParams.get('ch')) : null);
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('cat') || null);
  const [expandedCase, setExpandedCase] = useState(null);
  const [view, setView] = useState('cases'); // 'cases' | 'statutes' | 'by-chapter'

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'data/sources.json')
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({ cases: [], statutes: {}, meta: {} }));
  }, []);

  // Update URL params
  useEffect(() => {
    const params = {};
    if (search) params.q = search;
    if (chapterFilter) params.ch = chapterFilter;
    if (categoryFilter) params.cat = categoryFilter;
    setSearchParams(params, { replace: true });
  }, [search, chapterFilter, categoryFilter]);

  const filtered = useMemo(() => {
    if (!data) return [];
    let cases = data.cases || [];

    if (chapterFilter) {
      cases = cases.filter(c => c.chapters.includes(chapterFilter));
    }
    if (categoryFilter) {
      cases = cases.filter(c => c.category === categoryFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      cases = cases.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.citation.toLowerCase().includes(q) ||
        (c.court || '').toLowerCase().includes(q) ||
        (c.notes || '').toLowerCase().includes(q) ||
        c.statutes.some(s => s.toLowerCase().includes(q)) ||
        c.doctrines.some(d => d.toLowerCase().includes(q))
      );
    }

    return cases.sort((a, b) => (b.year || 0) - (a.year || 0));
  }, [data, search, chapterFilter, categoryFilter]);

  const categories = useMemo(() => {
    if (!data) return {};
    const counts = {};
    for (const c of data.cases || []) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    return counts;
  }, [data]);

  const casesByChapter = useMemo(() => {
    if (!data) return {};
    const grouped = {};
    for (let ch = 1; ch <= 7; ch++) {
      grouped[ch] = (data.cases || []).filter(c => c.chapters.includes(ch));
    }
    return grouped;
  }, [data]);

  if (!data) {
    return (
      <div className="page-main" style={{ padding: '2rem', textAlign: 'center' }}>
        <p className="text-muted">Loading sources...</p>
      </div>
    );
  }

  return (
    <div className="page-main" style={{ padding: '1.5rem 1rem' }}>
      <div className="sources-header">
        <h1><BookOpen size={28} style={{ verticalAlign: 'middle', marginRight: 8 }} /> Sources</h1>
        <p className="text-muted">
          {data.meta.totalCases} cases and {Object.keys(data.statutes || {}).length} statutes for trade secret law.
          Search, filter by chapter, or browse by category.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="sources-controls">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search cases, statutes, doctrines..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>×</button>
          )}
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label><Filter size={14} /> Chapter</label>
            <select
              value={chapterFilter || ''}
              onChange={e => setChapterFilter(e.target.value ? parseInt(e.target.value) : null)}
            >
              <option value="">All chapters</option>
              {Object.entries(CHAPTER_NAMES).map(([n, name]) => (
                <option key={n} value={n}>Ch {n}: {name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label><Scale size={14} /> Category</label>
            <select
              value={categoryFilter || ''}
              onChange={e => setCategoryFilter(e.target.value || null)}
            >
              <option value="">All categories</option>
              {Object.entries(categories).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat] || cat} ({count})
                </option>
              ))}
            </select>
          </div>

          <div className="view-tabs">
            <button
              className={`view-tab ${view === 'cases' ? 'active' : ''}`}
              onClick={() => setView('cases')}
            >Cases</button>
            <button
              className={`view-tab ${view === 'by-chapter' ? 'active' : ''}`}
              onClick={() => setView('by-chapter')}
            >By Chapter</button>
            <button
              className={`view-tab ${view === 'statutes' ? 'active' : ''}`}
              onClick={() => setView('statutes')}
            >Statutes</button>
          </div>
        </div>
      </div>

      {/* Results count */}
      {view === 'cases' && (
        <p className="results-count">
          {filtered.length} case{filtered.length !== 1 ? 's' : ''}
          {search || chapterFilter || categoryFilter ? ' matching filters' : ''}
        </p>
      )}

      {/* Cases List View */}
      {view === 'cases' && (
        <div className="cases-list">
          {filtered.map(c => (
            <CaseCard
              key={c.id}
              caseData={c}
              expanded={expandedCase === c.id}
              onToggle={() => setExpandedCase(expandedCase === c.id ? null : c.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <p>No cases match your search.</p>
              <button className="btn-sm" onClick={() => { setSearch(''); setChapterFilter(null); setCategoryFilter(null); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* By Chapter View */}
      {view === 'by-chapter' && (
        <div className="chapter-groups">
          {Object.entries(casesByChapter).map(([ch, cases]) => (
            <ChapterGroup key={ch} chapter={parseInt(ch)} cases={cases} />
          ))}
        </div>
      )}

      {/* Statutes View */}
      {view === 'statutes' && (
        <div className="statutes-section">
          <StatuteCard
            title="Uniform Trade Secrets Act (1985)"
            citation="UTSA §§ 1–6"
            description="The model act adopted in 48 states. Defines trade secrets, misappropriation, and remedies including reasonable royalties. Section 3 establishes the damages framework central to this course."
            sections={[
              { num: '§ 1', title: 'Definitions', highlight: '"Trade secret" and "misappropriation" defined' },
              { num: '§ 2', title: 'Injunctive Relief', highlight: 'Preliminary and permanent injunctions' },
              { num: '§ 3', title: 'Damages', highlight: 'Actual loss, unjust enrichment, reasonable royalty hierarchy' },
              { num: '§ 4', title: "Attorney's Fees", highlight: 'Willful and malicious misappropriation' },
              { num: '§ 5', title: 'Preservation of Secrecy', highlight: 'Protective orders during litigation' },
              { num: '§ 6', title: 'Statute of Limitations', highlight: 'Three-year period from discovery' },
            ]}
          />
          <StatuteCard
            title="Defend Trade Secrets Act (2016)"
            citation="18 U.S.C. § 1836"
            description="Federal trade secret statute providing a federal cause of action for misappropriation. Mirrors UTSA's damages framework but adds ex parte seizure and whistleblower immunity (§ 1833(b))."
            sections={[
              { num: '§ 1831', title: 'Economic Espionage', highlight: 'Criminal: foreign government benefit' },
              { num: '§ 1832', title: 'Theft of Trade Secrets', highlight: 'Criminal: commercial advantage' },
              { num: '§ 1833', title: 'Exceptions / Immunity', highlight: '§ 1833(b): whistleblower immunity notice' },
              { num: '§ 1836', title: 'Civil Proceedings', highlight: 'Private right of action, remedies, ex parte seizure' },
              { num: '§ 1837', title: 'Applicability', highlight: 'Interstate or foreign commerce requirement' },
              { num: '§ 1839', title: 'Definitions', highlight: 'Broad "trade secret" definition' },
            ]}
          />
        </div>
      )}
    </div>
  );
}

function CaseCard({ caseData, expanded, onToggle }) {
  const c = caseData;
  return (
    <div className={`case-card ${expanded ? 'expanded' : ''} ${c.unpublished ? 'unpublished' : ''}`}>
      <button className="case-header" onClick={onToggle}>
        <div className="case-main">
          <span className="case-name">{c.name}</span>
          <span className="case-year">{c.year}</span>
        </div>
        <div className="case-meta">
          <span className="case-court">{c.court}</span>
          {c.unpublished && (
            <span className="badge badge-warn"><AlertTriangle size={12} /> Unpublished</span>
          )}
        </div>
        {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {expanded && (
        <div className="case-details">
          <div className="detail-row">
            <strong>Citation:</strong> <span className="citation">{c.citation}</span>
          </div>
          {c.statutes.length > 0 && (
            <div className="detail-row">
              <strong>Statutes:</strong> {c.statutes.join('; ')}
            </div>
          )}
          {c.doctrines.length > 0 && (
            <div className="detail-row">
              <strong>Doctrines:</strong> {c.doctrines.join('; ')}
            </div>
          )}
          <div className="detail-row">
            <strong>Chapters:</strong> {c.chapters.map(ch => `Ch ${ch}: ${CHAPTER_NAMES[ch]}`).join(', ')}
          </div>
          {c.notes && (
            <div className="detail-row notes">
              {c.unpublished && <p className="unpub-warning"><AlertTriangle size={14} /> This is an unpublished opinion. Check court rules before citing.</p>}
              <p>{c.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChapterGroup({ chapter, cases }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="chapter-group">
      <button className="chapter-group-header" onClick={() => setOpen(!open)}>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        <span className="ch-num">Chapter {chapter}</span>
        <span className="ch-title">{CHAPTER_NAMES[chapter]}</span>
        <span className="ch-count">{cases.length} cases</span>
      </button>
      {open && (
        <div className="chapter-cases">
          {cases.sort((a, b) => (b.year || 0) - (a.year || 0)).map(c => (
            <div key={c.id} className="compact-case">
              <span className="case-name">{c.name}</span>
              <span className="case-cite">{c.citation}</span>
              <span className="case-year">{c.year}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatuteCard({ title, citation, description, sections }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="statute-card">
      <button className="statute-header" onClick={() => setOpen(!open)}>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        <div>
          <span className="statute-title">{title}</span>
          <span className="statute-cite">{citation}</span>
        </div>
      </button>
      {!open && <p className="statute-desc">{description}</p>}
      {open && (
        <div className="statute-sections">
          <p className="statute-desc">{description}</p>
          {sections.map(s => (
            <div key={s.num} className="statute-section">
              <span className="section-num">{s.num}</span>
              <span className="section-title">{s.title}</span>
              <span className="section-highlight">{s.highlight}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
