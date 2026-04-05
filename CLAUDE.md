# Protecting Trade Secrets (PTS) — Learning Companion

## Project Overview

Interactive companion site for *Protecting Trade Secrets* by Seth C. Oranburg. Covers the complete trade secret protection lifecycle across 7 chapters plus interactive tools. Part of the Oranburg teaching ecosystem (K for Contracts, BA for Business Associations, PTS for Trade Secrets).

## Architecture

- **Stack**: React 18 + Vite + Tailwind CSS
- **Hosting**: GitHub Pages (base path `/PTS/`)
- **Routing**: HashRouter (React Router 6)
- **State**: Per-chapter `useState` + localStorage for progress tracking
- **Build**: `npm run build` → dist/ (~327KB JS, ~42KB CSS gzipped)

## Key Directories

```
src/
  App.jsx                    # Router, global header/footer
  main.jsx                   # Entry point
  index.css                  # Tailwind + custom CSS (444 lines)
  progress.js                # localStorage completion tracking
  ChapterFooter.jsx          # Shared: prev/next nav, completion, PDF export, podcast links
  pages/
    Home.jsx                 # Chapter grid with progress dashboard
    NotFound.jsx             # 404
  chapters/
    ch01-ch07/               # One JSX component per chapter (200-770 lines each)

chapters/                    # Static HTML exercises (legacy, also accessible)
deal-room/                   # 2,875-line standalone simulation
drafting-lab/                # Contract drafting exercise
patent-or-TS/                # Patent vs trade secret hypotheticals
data/
  media-map.json             # Maps 7 chapters to 23 podcast episodes
```

## Chapter Content

| Ch | Title | Lines | Key Exercise |
|----|-------|-------|-------------|
| 1 | Foundations | 207 | Tabbed panels: elements, IP landscape, misappropriation, remedies |
| 2 | Inventory & Classification | 572 | Asset audit, category classifier, case explorer, ledger with CRUD |
| 3 | Risk & Vulnerability | 451 | Threat vectors, risk matrix (likelihood x impact sliders), risk register |
| 4 | Internal Mitigation | 700 | Covenant crafter, jurisdiction trap (5 states), inventions audit |
| 5 | External Controls | 763 | Relationship selector, contract lab, system controls, stage output |
| 6 | Enforcement & Remedies | 463 | Complaint config, 8-factor seizure checklist, damages calculator |
| 7 | Governance Capstone | 549 | Growth crucible, frontier stress test, TSPP charter template |

## Features (as of 2026-04-04)

- **Dark mode**: Theme toggle in header, persists to localStorage, full CSS variable system
- **Progress tracking**: localStorage per chapter, progress bar on home page, completion checkmarks
- **PDF certificate export**: jsPDF CDN, branded landscape certificates per chapter
- **Chapter navigation**: prev/next links + home link at bottom of every chapter (ChapterFooter component)
- **Podcast integration**: 23 episodes mapped to 7 chapters via data/media-map.json, shown in ChapterFooter
- **Completion flow**: "Mark Complete" → success message → certificate download option
- **Cross-site links**: oranburg.law, course page, podcast, YouTube in header/footer

## ChapterFooter Component (src/ChapterFooter.jsx)

Shared component added to every chapter. Provides:
- "Mark Chapter Complete" button → saves to localStorage
- PDF certificate download (jsPDF CDN, prompted name)
- Podcast episode links for the current chapter
- Prev/Next chapter navigation

**IMPORTANT**: ChapterFooter must appear exactly ONCE per chapter, inside the main component's outermost return div, NOT inside tab panels or cards. The previous automated insertion was catastrophically wrong — it injected 335 copies across all chapters.

## Deal Room (deal-room/index.html)

A ~2,875-line standalone HTML simulation across 7 phases:
1. Intake → 2. Document Strategy → 3. Agreement Architecture → 4. Precedent Library → 5. Customization → 6. Assembly & Review → 7. Senior Partner Review

**DTSA trap**: The DTSA § 1833(b) Immunity Notice is intentionally NOT flagged as missing during Agreement Architecture. Students discover the consequence at Senior Partner Review. Do not add warnings that telegraph this trap.

## Development

```bash
npm run dev      # Vite dev server
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## Cross-Repo Context

This repo is part of the Oranburg teaching ecosystem. See `.claude/projects/` memory for:
- **ecosystem.md** — Full cross-repo map (K, BA, PTS, Quaere, oranburg.law)
- **media-map.json** references podcast data from oranburg.github.io/_data/podcasts.yml
- Quaere has 157 MCQs for this course (LAW-502)

## What Remains

1. ~~Dark mode for React app~~ — DONE (theme toggle + CSS variables)
2. Extract shared tab/card/table components from chapter files (code quality, not user-facing)
3. Add learning-objectives.json (like K has) for Quaere LO integration
4. Wire media-map into Quaere when Resource model is built
5. Add images to chapter headers (currently text-only)
