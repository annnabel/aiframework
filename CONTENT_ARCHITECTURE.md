# Content Architecture

How the Enterprise AI 2026 research package becomes a learning product — the learning model, the
map, the concept relationships, and the document-to-site mapping.

## 1. The learning model

The experience is designed to move a learner through six states:

> I recognise the terminology → I understand the concepts → I understand how they connect →
> I can navigate the architecture → I can evaluate trade-offs → I can make informed decisions.

Four design commitments implement that:

1. **The map is the interface.** The seven-layer stack is the home visual, the navigation anchor,
   and the spatial memory aid. Layer detail, glossary grouping, failure-mode origins, walkthrough
   steps and concept pages all orient against the same map (full `StackMap` or `MiniMap` variants).
2. **Every concept ends in a decision.** The source glossary's rule — one line on *what it is*, one
   on *the decision it affects* — is preserved as the schema for every concept, and ⚑ jargon flags
   are kept so learners know what to delegate.
3. **Active learning over reading.** Each level embeds interaction (clickable stack, comparisons,
   dial, 2×2, ladder, tree, calculator, timeline) and ends with a scenario-first knowledge check.
   Scenarios put the learner in a seat (procurement, board, design review, investment committee)
   and debrief with the source reasoning.
4. **Progressive disclosure.** Three entry depths from the homepage (5-minute / 30-minute / deep);
   accordions and reveal-on-demand throughout; regulation is navigated by deadline and jurisdiction
   rather than read as policy text.

## 2. The Enterprise AI Map

The core mental model from `02_ENTERPRISE_AI_MENTAL_MODEL.md`:

- **Six strata** (Compute → Models → Serving → Data & Context → Build & Orchestration →
  Applications) drawn as horizontal bands, value flowing top-down.
- **The Control Plane (Layer 6)** drawn as an *orthogonal vertical plane* beside layers 3–7 —
  deliberately not a band, because the source insists it instruments every layer.
- **Cross-cutting concerns** (evaluation, security, identity, FinOps, regulation, change
  management) as a row beneath the stack — outside it, shaping all of it.
- **Colour system:** the strata run a restrained ramp from near-neutral (Compute) to full crimson
  (Applications) — value concentrates as you rise; the Control Plane is the single cool hue,
  different in kind as well as position.

Each layer's drill-down carries: role, why it exists, state of play, dependencies (up/down +
control-plane instrumentation), resident concepts, decisions, standardised-vs-lock-in,
misconceptions, failure modes that originate there, and the one thing to remember.

## 3. Major concept relationships

Concepts (`src/content/concepts.ts`) form a lightweight knowledge graph with four edge types:

- `prerequisites` — "understand these first" (rendered as *Understand these first*)
- `unlocks` + reverse-prerequisite lookup — "what becomes easier once you know this"
- `related` — lateral association
- `confusedWith` — the confusion pairs, which also drive the side-by-side comparison cards
  (workflow vs agent, RAG vs fine-tuning, open-weight vs open-source, ACP vs UCP, consumption vs
  outcome pricing, copilot vs autonomous agent)

Example spine: `tokens → reasoning-model → tokens-per-dollar → ai-finops` (economics);
`tool-use → agentic-ai → {workflow-vs-agent, hitl, agent-identity} → policy-engine → control-plane`
(governance); `context-window → rag → {reranking, grounding, knowledge-graph} → context-engineering
→ fine-tuning` (build patterns). Layer membership gives every concept its place on the map, so the
graph is explored spatially rather than as a hairball.

## 4. How source documents map into the website

| Document | Where it lives in the product |
|---|---|
| `00_ONE_PAGE_CHEAT_SHEET` | Homepage framing, the closing one-sentence model, quick-path entry |
| `01_EXECUTIVE_SUMMARY` | Home stats, Level 1 framing, board-briefing scenario |
| `02_ENTERPRISE_AI_MENTAL_MODEL` | The Map (layers, caveats, misconceptions, cross-cutting), Level 1 |
| `03_GLOSSARY` | The concept model: Glossary, concept pages, Level 2, search |
| `04_BUILD_ARCHETYPES` | Archetype dial + dimension table (Level 3, Decisions), knowledge-vs-behaviour tree |
| `05_DECISION_FRAMEWORK` | Five axes, lock-in 2×2, maturity ladder, ten steps, calculator decision rule (Level 4, Decisions) |
| `06_ARCHITECTURE` | Architecture Explorer: the 10-step walkthrough, view modes, protocol wiring, blur boundaries |
| `07_VENDOR_LANDSCAPE` | Vendor positioning grid + marketing translator (Decisions) |
| `08_GOVERNANCE_REGULATION` | Level 5: threat model, seven controls, regulation timeline, one-slide summary |
| `09_ECONOMICS_VALUE` | Level 6: verdict stats, five-link chain, price tiers, pricing models, evidence, calculator formulas |
| `10_ENTERPRISE_FAILURE_MODES` | Level 7 failure cards (origin→visible layer mapping), pre-mortem tool, compound failure |
| `11_EXECUTIVE_QUESTIONS` | Questions playbook by audience with screens-for reveals; scenario questions |
| `12_LEARNING_PATH` | The level structure, self-tests (turned into quiz items), maintenance-mode guidance |
| `13_SOURCE_REGISTER` | Perishability notes on prices/claims; linked wherever precision matters |
| `14_FACT_CHECK` | Preserved corrections (ACP collision, Agent Fabric attribution, RAG-vs-fine-tuning verdict) folded into comparisons and status notes |

Two honesty rules are enforced in the transformation:

- **Source-backed vs navigation logic.** Interactive tools state explicitly (e.g. the build guide
  and calculator) that the routing/inputs are interface while the guidance and formulas are from
  the documents.
- **Uncertainty is preserved.** Contested numbers stay contested (MIT NANDA's 95%, METR's both
  results, the Klarna arc told whole), status labels (IN FORCE / DEFERRED / UNCERTAIN) are carried
  through, and perishable claims point at the source register.
