# Enterprise AI Framework

An interactive learning platform built from the **Enterprise AI 2026** executive research package.
It answers one question: *“How do all the pieces of Enterprise AI fit together, and how do I use
that understanding to make better decisions?”*

The site is not the documents rendered in a browser. It transforms the research into a learnable
product: an interactive map, a seven-level learning journey, an architecture explorer, decision
tools, scenario practice and knowledge checks — with every screen traceable back to the canonical
Markdown documents at the repository root.

## What the application does

| Area | What it gives you |
|---|---|
| **Home** | The big picture: what Enterprise AI is, the seven-layer map at a glance, and three entry paths (5-minute / 30-minute / deep) |
| **The Map** (`/map`) | The interactive seven-layer stack + cross-cutting concerns: click any layer for its role, concepts, dependencies, decisions, lock-in, misconceptions and the failure modes that start there |
| **Learn** (`/learn`) | Seven levels from mental model → failure modes, each with interactions and a scenario-first knowledge check |
| **Architecture** (`/architecture`) | The worked example (one request, end to end) as an interactive walkthrough with three views: request flow, data flow, governance — plus the protocol wiring |
| **Decisions** (`/decisions`) | The Decision Explorer: build-approach guide, “where does this fit?”, questions playbook, ten-step process, lock-in 2×2, maturity ladder, decision tree, cost-per-task calculator, vendor positioning |
| **Scenarios** (`/scenarios`) | Realistic practice (vendor pitch, board briefing, architecture review, build-or-buy) with source-based debriefs, plus the interactive pre-mortem checklist |
| **Glossary** (`/glossary`) | ~70 concepts organised by layer with filters and relationships (prerequisites / unlocks / confused-with); each has a consistent learning page |
| **Progress** (`/progress`) | Local (device-only) progress across checks, scenarios and concepts — no accounts |
| **Sources** (`/sources`) | The original research documents, rendered, linked from every module via “Based on …” |

Global search is available everywhere with **⌘K / Ctrl-K**.

## How to run it

```bash
npm install
npm run dev        # local development at http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

Stack: Vite + React 18 + TypeScript, `react-router` (hash routing, so the build runs on any static
host), plain CSS design tokens (no UI framework), `marked` for rendering the source documents.
No backend, no authentication; progress lives in `localStorage`.

## How the knowledge content is structured

The **Markdown documents at the repository root (`00_…` – `14_…`) are the single source of truth.**
The app never invents facts; it restructures them.

- `src/content/*.ts` — the structured content model derived from the documents: layers, concepts
  (with relationships), archetypes, decision axes, the walkthrough, failure modes, economics,
  governance, questions, vendors, quizzes and scenarios. Every record carries `sources`: the IDs of
  the documents it came from, which power the “Based on …” links.
- `src/content/sources.ts` — imports the raw Markdown (`?raw`) so the originals are always readable
  in-app, unmodified.
- `src/components/`, `src/pages/` — presentation only; no knowledge is hardcoded in UI components
  beyond connective copy.

See [`CONTENT_ARCHITECTURE.md`](CONTENT_ARCHITECTURE.md) for the learning model and how documents
map into the site, and [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md) for the build plan.

## The research package

The underlying research is a structured learning system for understanding enterprise AI as of
**1 September 2026**, built for a strategy professional who needs to brief executives, challenge
vendors, and make build-vs-buy calls — without becoming an engineer. Lens: Australian enterprise
(EU AI Act as extraterritorial exposure; US as market context); examples are cross-industry.

Method: nine specialist research workstreams (architecture, models & infrastructure, build patterns
& protocols, cloud platforms, governance & operations, commercial strategy, regulation, adoption
evidence, and an adversarial fact-check), verified against primary sources on 1 September 2026.
Every load-bearing claim is dated and sourced; unverified claims are flagged. The core teaching
principle: everything follows **WHY → WHAT → HOW → DECISION → IMPLICATION** — no technology is
explained as an isolated definition; every concept ends with the decision it enables and what can
go wrong. The full reading order lives in-app under `/sources`.

## How to add or update source material

1. Edit or add the Markdown document at the repository root — it remains canonical.
2. If facts changed (prices, dates, product names — the source register flags perishables), update
   the corresponding records in `src/content/`, keeping wording faithful to the document.
3. If you added a document: register it in `src/content/levels.ts` (`sourceDocs`) and import it in
   `src/content/sources.ts`; it will appear under `/sources` and in search automatically.
4. `npm run build` — TypeScript will catch broken concept/relationship IDs.

The design principle to preserve: **facts expire faster than structure.** The seven layers, five
axes, archetype dial and failure taxonomy are stable; keep the structured model aligned with the
documents rather than editing knowledge into components.
