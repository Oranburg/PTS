# Protecting Trade Secrets (PTS) — Learning Site

## Project Overview

Interactive companion site for the *Protecting Trade Secrets* textbook and audiobook by Seth C. Oranburg. Hosted on GitHub Pages via Jekyll. The site includes chapter companions, a Deal Room simulation, a Drafting Lab, and a Patent-or-Trade-Secret exercise.

## Architecture

- **Hosting**: GitHub Pages with Jekyll (`jekyll-theme-slate`)
- **Build**: Vite + Tailwind CSS for asset compilation
- **Structure**: Each section is a standalone HTML page or single-page app
- **State**: Deal Room uses `localStorage` for client-side persistence — no backend

## Key Directories

```
deal-room/          # Single-page app: 7-phase contract drafting simulation
chapters/           # Chapter companion pages (ch 1-7, firm strengths, team charter)
drafting-lab/       # Contract drafting exercise
patent-or-TS/       # Patent vs trade secret hypothetical exercises
assets/             # Static assets (images, etc.)
src/                # Tailwind source CSS
```

## Deal Room (`deal-room/index.html`)

The Deal Room is a ~3,500-line single-page HTML app with inline CSS and JavaScript. It simulates a trade secret protection engagement across 7 phases:

1. **Intake** — Choose company or employee track, read client memo, identify risks
2. **Document Strategy** — Select agreement type
3. **Agreement Architecture** — Match provisions to risks (drag-and-drop)
4. **Precedent Library** — Select precedent clauses from annotated options
5. **Customization** — Edit clause text with guided prompts
6. **Assembly & Review** — Review assembled agreement with section numbering
7. **Senior Partner Review** — AI-generated feedback on the complete work product

### Key Design Decisions

- **DTSA trap**: The DTSA § 1833(b) Immunity Notice is intentionally NOT flagged as missing during Agreement Architecture. Students who fail to identify DTSA compliance as a risk (Phase 1) or miss the provision (Phase 3) discover the consequence at Senior Partner Review (Phase 7). Do not add warnings that telegraph this trap.
- **Dual tracks**: Company (Pico Salsa) and Employee (Jordan) tracks have intentionally asymmetric clauses, risks, and precedents.
- **Distractor provisions**: Some provisions in the bank are intentional wrong answers with targeted feedback.
- **Scenario framework**: Uses `ACTIVE_SCENARIO` constant for pluggable fact patterns (currently only `pico_salsa`).

### State Management

- `var state` — single global state object
- `saveState()` / `loadState()` — localStorage persistence
- `render()` — re-renders current phase based on `state.currentPhase`
- `completePhase()` / `nextPhase()` / `revisePhase()` — phase transitions

## Development

```bash
# Serve locally (used by .claude/launch.json)
python3 -m http.server 8765

# Or with npm
npm run dev
```

## Deployment

Push to `main` triggers GitHub Pages build. The site is at the GitHub Pages URL for the `Oranburg/PTS` repository.

## Code Style

- Single-file HTML apps with inline `<style>` and `<script>` tags
- Tailwind utility classes + custom CSS for branded components
- No framework — vanilla JavaScript with direct DOM manipulation
- Font stack: `font-headline` (Playfair Display), `font-ui` (Inter)
- Brand colors: CUA Blue `#0A3255`, CUA Red `#B21F2C`, CUA Bright Blue `#2459A9`
