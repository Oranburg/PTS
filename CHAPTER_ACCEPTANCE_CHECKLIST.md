# Chapter Acceptance Checklist

Use this checklist to verify each chapter is working correctly in the deployed React application.

---

## Global Shell

- [ ] Home page loads with chapter cards
- [ ] Global header/nav visible on all pages
- [ ] Chapter nav links are responsive (wrap on mobile ≤390px)
- [ ] Footer displays on all pages
- [ ] Hash routing (no 404 on page refresh for any route)
- [ ] `npm run dev` starts successfully
- [ ] `npm run build` completes without errors

---

## Chapter 1 — Foundations

**Learning Objective:** Understand the three elements of a trade secret, how it fits in the IP landscape, what constitutes misappropriation, and available remedies.

- [ ] Loads from `/ch1` nav link
- [ ] Tab 1 (Three Elements) renders the three-panel grid
- [ ] Tab 2 (IP Landscape) renders all four IP comparison panels
- [ ] Tab 3 (Misappropriation) renders proper means vs. improper means panels
- [ ] Tab 4 (Remedies) renders injunctive and monetary remedies panels
- [ ] Keyboard navigation: Arrow keys cycle tabs, Home/End jump to first/last
- [ ] ARIA roles: `role="tablist"`, `role="tab"`, `role="tabpanel"` applied
- [ ] Mobile layout (≤390px): tabs wrap, panels stack
- [ ] No console errors
- [ ] Learning objective visible in chapter header
- [ ] Shared shell (header/footer) consistent with other chapters

---

## Chapter 2 — Inventory & Classification

**Learning Objective:** Learn to audit trade secret assets, classify them by type, prioritize by legal and business value, and maintain a living inventory ledger.

- [ ] Loads from `/ch2` nav link
- [ ] Tab 1 (Audit): Five identification-audit steps render and are clickable
- [ ] Tab 2 (Classify): Category cards and priority tiers render
- [ ] Tab 3 (Legal): Case explorer renders with filter buttons; filtering works
- [ ] Tab 4 (Ledger): Default asset rows display in table
- [ ] Ledger: "New Entry" form opens and closes correctly
- [ ] Ledger: New entry can be saved with required fields
- [ ] Ledger: Alert fires when required fields are missing
- [ ] Ledger: Entry can be deleted
- [ ] Ledger: "Export CSV" downloads a valid CSV file
- [ ] Keyboard navigation: Arrow keys cycle tabs
- [ ] Mobile layout: table scrolls horizontally on small screens
- [ ] No console errors
- [ ] Learning objective visible in chapter header
- [ ] Shared shell consistent

---

## Chapter 3 — Risk & Vulnerability

**Learning Objective:** Map threat vectors from insider, partner, and infrastructure sources; use the interactive risk matrix; and populate a risk register with concrete mitigation strategies.

- [ ] Loads from `/ch3` nav link
- [ ] Tab 1 (Threat Vectors): Three threat-category cards with legal precedent notes render
- [ ] Tab 2 (Risk Matrix): Likelihood and Impact sliders work; risk label updates dynamically
- [ ] Tab 2: Matrix visualization highlights correct cell
- [ ] Tab 3 (Risk Register): Default risks display in table
- [ ] Risk Register: "Log Risk" form opens and closes
- [ ] Risk Register: New risk can be submitted with required fields
- [ ] Risk Register: Risk level auto-calculates from likelihood × impact
- [ ] Risk Register: Entry can be deleted
- [ ] Risk Register: "Export" downloads a valid CSV file
- [ ] Keyboard navigation: Arrow keys cycle tabs
- [ ] Mobile layout: sliders and table render properly on ≤390px
- [ ] No console errors
- [ ] Learning objective visible in chapter header
- [ ] Shared shell consistent

---

## Chapter 4 — Internal Mitigation

**Learning Objective:** Draft enforceable employment agreements using the Covenant Crafter lab, understand jurisdiction-specific non-compete rules, determine IP ownership via the Inventions Audit, and generate a Stage C output table.

- [ ] Loads from `/ch4` nav link
- [ ] Tab 1 (Covenant Crafter): All five clause blocks render with selection options
- [ ] Clause selection updates the "Judicial Review" panel in real time
- [ ] Tab 2 (Jurisdiction Trap): State buttons render and switch jurisdiction data
- [ ] All five jurisdictions (CA, NY, TX, MA, MN) display correct information
- [ ] Tab 3 (Inventions Audit): Three toggles render; ownership outcome updates dynamically
- [ ] "Generate Stage C Output" button navigates to Tab 4
- [ ] Tab 4 (Stage C Output): Table rows reflect user selections from Tabs 1–3
- [ ] "Copy to Clipboard" button functions
- [ ] Keyboard navigation: Arrow keys cycle tabs
- [ ] Mobile layout: clause blocks stack; table scrolls horizontally
- [ ] No console errors
- [ ] Learning objective visible in chapter header
- [ ] Shared shell consistent

---

## Chapter 5 — External Controls

**Learning Objective:** Design relationship-specific containment architecture for vendors, collaborators, customers, and distributors using contract clauses and technical safeguards.

- [ ] Loads from `/ch5` nav link
- [ ] Tab 1 (Relationship): Four relationship-type cards render; selecting one unlocks subsequent tabs
- [ ] Unselected-relationship guard prompt appears when accessing Tabs 2–4 without selecting a type
- [ ] Tab 2 (Contract Lab): Clause options render; selections update insight panel
- [ ] Tab 3 (System Controls): Architectural safeguard options render and update
- [ ] Tab 4 (Stage C Output): Output table reflects all selections; export/copy works
- [ ] Keyboard navigation: Arrow keys cycle tabs
- [ ] Mobile layout: option cards stack on small screens
- [ ] No console errors
- [ ] Learning objective visible in chapter header
- [ ] Shared shell consistent

---

## Chapter 6 — Enforcement & Remedies

**Learning Objective:** Evaluate complaint quality against a motion-to-dismiss standard, configure an emergency injunction or seizure application, and calculate damages under actual loss, unjust enrichment, or royalty theories.

- [ ] Loads from `/ch6` nav link
- [ ] Tab 1 (The Complaint): Three configuration options render; insight panel updates dynamically
- [ ] "Next" / progression buttons navigate to next tab
- [ ] Tab 2 (Emergency Relief): Injunction type selector and factor checklist render
- [ ] Factor checklist items toggle correctly; eligibility score updates
- [ ] Tab 3 (Damages Award): Theory selector and willfulness toggles render; damage output updates
- [ ] Keyboard navigation: Arrow keys cycle tabs
- [ ] Mobile layout: cards and toggles stack on small screens
- [ ] No console errors
- [ ] Learning objective visible in chapter header
- [ ] Shared shell consistent

---

## Chapter 7 — Governance Capstone

**Learning Objective:** Stress-test a trade secret program against growth events and frontier risks, then generate a complete Trade Secret Protection Policy (TSPP) Charter.

- [ ] Loads from `/ch7` nav link
- [ ] Tab 1 (Growth Crucible): NDA fragility and culture options render; feedback panel updates
- [ ] Tab 2 (Frontier Stress Test): AI and EU expansion scenario options render; risk analysis updates
- [ ] Tab 3 (TSPP Charter): Full charter template renders with all policy sections
- [ ] Charter section checkboxes are interactive (if applicable)
- [ ] Any export or copy functionality works
- [ ] Keyboard navigation: Arrow keys cycle tabs
- [ ] Mobile layout: charter sections stack properly on small screens
- [ ] No console errors
- [ ] Learning objective visible in chapter header
- [ ] Shared shell consistent

---

## Cross-Cutting Concerns

- [ ] No chapter leaks state to another (navigating away and back resets state)
- [ ] All CSV exports open/download correctly in major browsers
- [ ] All citations and legal references are intact (no truncated text)
- [ ] No obvious typos in chapter titles or primary UI text
- [ ] Focus management: keyboard users can Tab through all interactive elements
- [ ] Color contrast meets reasonable accessibility standards (≥4.5:1 for body text)
