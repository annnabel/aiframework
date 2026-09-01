# Implementation Plan — Enterprise AI Framework

Interactive learning platform built from the 16-document Enterprise AI 2026 research package. The source Markdown documents remain the canonical knowledge base; the app is a structured, interactive transformation of them.

## 1. Information architecture

| Route | Area | Purpose |
|---|---|---|
| `/` | Home — The Big Picture | What Enterprise AI is; the seven-layer map at a glance; three entry paths (5-min / 30-min / deep) |
| `/map` | Enterprise AI Map | Interactive seven-layer stack + cross-cutting concerns; click any layer for what it does, concepts, dependencies, decisions, lock-in, misconceptions, failure modes |
| `/learn` | Learning Journey | Seven levels from mental model → strategy, each with modules, interactions, and a knowledge check |
| `/learn/:level` | Level page | Transformed content, interactive elements, end-of-level quiz |
| `/architecture` | Architecture Explorer | The end-to-end worked example as an interactive walkthrough; request/data/governance view modes; protocol wiring |
| `/decisions` | Decision Explorer | "How should I build this?" (archetype guide), knowledge-vs-behaviour tree, lock-in 2×2, ten-step process, cost-per-task calculator, "What questions should I ask?" |
| `/scenarios` | Scenario Challenges | Realistic scenarios: identify layers, risks, approaches, questions; pre-mortem checklist tool |
| `/glossary` | Concept Explorer | ~70 concepts organised by layer/category with filters, relationships (prerequisites / unlocks / confused-with), search |
| `/concept/:id` | Concept detail | Consistent learning format per concept + relationship navigation |
| `/progress` | Progress | Local (localStorage) tracking of levels, quizzes, scenarios; resumable |
| `/sources` | Source material | The original Markdown documents, rendered, linked from every module ("Based on…") |

Global search (⌘K) across concepts, layers, modules, failure modes, questions.

## 2. Content model

All knowledge is structured data in `src/content/` (TypeScript modules), separated from presentation. Each record carries `source` document IDs for traceability.

- `layers.ts` — 7 layers + cross-cutting concerns: role, why it exists, state of play, decisions, standardised vs lock-in, misconceptions, concept links (from 02, 00)
- `concepts.ts` — glossary terms: what it is, decision it affects, layer, category, difficulty, relationships (`related`, `confusedWith`, `prerequisites`), jargon flags (from 03, cross-linked from all docs)
- `archetypes.ts` — 7 build archetypes with the full dimension table + the control dial (from 04)
- `decisionTree.ts` — knowledge-vs-behaviour decision tree (from 04)
- `axes.ts` — 5 decision axes incl. lock-in 2×2 and governance maturity ladder (from 05)
- `tenSteps.ts` — the 10-step executive decision process (from 05)
- `walkthrough.ts` — the 10-step worked example with per-step layers, concepts, and view-mode tags (from 06)
- `protocols.ts` — MCP/A2A/ACP/UCP/AP2/WebMCP wiring (from 06, 03)
- `failures.ts` — 7 failure categories: looks-like, evidence, smell test, mitigation, affected layers (from 10)
- `economics.ts` — five-link chain, price tiers, pricing models, value evidence, cost/value-per-task formulas (from 09)
- `governance.ts` — EU/AU regulation timeline, seven-control stack, maturity ladder (from 08)
- `questions.ts` — executive questions by audience with what each screens for (from 11)
- `vendors.ts` — positioning grid + marketing translator (from 07)
- `quizzes.ts` — per-level knowledge checks (scenario-first, relationship-focused)
- `scenarios.ts` — scenario challenges with source-based debriefs
- `sources.ts` — registry of the 16 documents; raw Markdown imported via Vite `?raw`

## 3. Major components

- `StackMap` — the reusable seven-layer visual (full interactive on `/map`, mini variant used as orientation everywhere: level pages, failure modes, walkthrough steps)
- `LayerPanel` — layer drill-down (role, concepts, depends on/depended on, decisions, misconceptions)
- `ConceptCard` / `ConceptPage` — consistent 7-part learning format; relationship chips
- `Walkthrough` — stepper with view-mode toggle (Request / Data / Governance) + mini-map highlighting
- `ArchetypeDial` — interactive control dial across the 7 archetypes; dimension comparison
- `DecisionTreeExplorer` — question-led navigation of the build decision tree
- `LockInQuadrant` — interactive 2×2
- `TaskCostCalculator` — source formula only (cost vs value per task, 3× rule, HITL doubling stress test)
- `Quiz` — MCQ, scenario-select, ordering, matching; explanations cite source docs
- `ScenarioChallenge` — multi-step scenario with debrief
- `SearchPalette` — ⌘K global search
- `SourceLink` — the subtle "Based on →" traceability affordance
- `ProgressStore` — localStorage-backed progress (levels, quizzes, scenarios, visited concepts)

## 4. Learning interactions

- End-of-level knowledge checks (5–10 questions, scenario-first, no trivia)
- Compare panes for commonly-confused pairs (workflow vs agent, open-weight vs open-source, RAG vs fine-tuning, ACP vs UCP, consumption vs outcome pricing)
- Self-tests from the learning path (e.g. "place these five products on the stack") as interactive drag/select exercises
- Scenario challenges with layered debriefs quoting the source reasoning
- Pre-mortem checklist as an interactive screening tool

## 5. Concept relationships (knowledge graph)

Lightweight, learning-first: every concept declares `prerequisites` (understand these first), `unlocks` (easier once you know this), `related`, and `confusedWith`. Rendered as navigable chips + a per-concept relationship view, not an overwhelming force graph. Layer membership gives the spatial anchor on the map.

## 6. Technical approach

- **Stack:** Vite + React 18 + TypeScript, `react-router` (hash routing for any static host), no UI framework — hand-rolled design system in plain CSS with OKLCH tokens
- **No backend, no auth** — progress in localStorage; fully static build
- **Search:** client-side index over structured content
- **Markdown sources:** imported at build time via `?raw`, rendered with a small in-app renderer
- **Accessibility:** WCAG AA, keyboard-first interactions, reduced-motion support
- **Performance:** route-level code splitting, zero heavy dependencies

## 7. Build phases

1. Foundation: scaffold, tokens, shell/nav, Home, StackMap, content schema
2. Content: all `src/content/` data authored from the source docs
3. Core areas: Map, Learn levels, Glossary/Concepts
4. Interactive: Architecture walkthrough, Decision Explorer, Scenarios, Quizzes
5. Cross-cutting: search, progress, sources viewer, traceability links
6. Polish + validation: responsive, a11y, empty states, broken-link check, production build
