# The Learning Path — Eight Levels from Map to Mastery

> **How to use this:** each level has four outcomes — **Learn** (absorb), **Understand** (connect), **Be able to explain** (teach it to a smart non-technical person; the real test), **Be able to decide** (the decision the level unlocks). Don't skip levels: the decisions at level 5 are unsafe without the vocabulary of level 2. A motivated professional can do this in 2–3 weeks at ~an hour a day; each level ends with a self-test.

---

## Level 1 — The Mental Model *(read: [02](02_ENTERPRISE_AI_MENTAL_MODEL.md))*

- **Learn:** the seven layers — Compute, Models, Serving, Data/Context, Build/Orchestration, Control Plane, Applications — and the cross-cutting concerns.
- **Understand:** why the control plane is a *plane* not a layer; why vendors deliberately collapse layers; why models+serving fuse for API buyers.
- **Be able to explain:** "Enterprise AI is a stack: silicon at the bottom, business outcomes at the top, and a governance plane across everything. Every product you'll be pitched lives somewhere on it — and most confusion is someone selling three layers as one word."
- **Be able to decide:** where any vendor pitch or budget line actually sits — and whether it's annexing layers you didn't mean to buy.
- **Self-test:** place M365 Copilot, Bedrock AgentCore, DeepSeek V4, LangGraph and Agent 365 on the stack, from memory.

## Level 2 — The Vocabulary *(read: [03](03_GLOSSARY.md))*

- **Learn:** the ~70 terms, each with the decision it affects.
- **Understand:** the load-bearing distinctions — open-weight vs open-source; workflow vs agent; consumption vs outcome pricing; evals vs testing; ACP vs UCP vs AP2.
- **Be able to explain:** any term in one sentence *plus* the decision it affects — if you can't name the decision, you've memorised jargon, not knowledge.
- **Be able to decide:** when a term in a pitch is doing real work vs decoration (the ⚑ flags).
- **Self-test:** explain to a CFO why "tokens-per-dollar" is the wrong metric and "cost per task at target quality" is the right one.

## Level 3 — The Architecture *(read: [06](06_ARCHITECTURE.md))*

- **Learn:** the master map; the protocol wiring (MCP, A2A, ACP/UCP/AP2); the ten-step worked example.
- **Understand:** why security lives at the tool call; why one user request means many model calls at different tiers; why the agent never gets super-user access; why evaluation is a loop.
- **Be able to explain:** walk the project-risk example end to end on a whiteboard, naming what governs each step.
- **Be able to decide:** whether a proposed architecture has the control points where they belong — and what's missing when a diagram has no policy engine, no evals, no identity.
- **Self-test:** an architect shows you an agent design; you find where untrusted input, private data and an exfiltration path could meet.

## Level 4 — The Build Choices *(read: [04](04_BUILD_ARCHETYPES.md))*

- **Learn:** the six (plus one) archetypes and the five underlying dimensions; the knowledge-vs-behaviour decision tree.
- **Understand:** governance effort is conserved — every step toward control converts inherited governance into required governance; the portfolio, not the archetype, is the decision.
- **Be able to explain:** "There are six ways to acquire AI, and they're one dial: control up, inherited safety down. We run several at once, on purpose."
- **Be able to decide:** which archetype a given use case belongs in — and push back when someone proposes archetype 5 for a commodity problem or archetype 2 for a differentiator.
- **Self-test:** given three real use cases from your organisation, assign archetypes and justify with the five dimensions.

## Level 5 — Decision-Making *(read: [05](05_DECISION_FRAMEWORK.md))*

- **Learn:** the five axes (trust/lock-in, data gravity, governance readiness, unit economics, failure modes) and the ten-step process.
- **Understand:** why steps 1–2 (what are we changing? what's the least capability that does it?) kill more bad projects than everything else combined.
- **Be able to explain:** the lock-in 2×2 and the exit-cost question; the governance maturity ladder and why autonomy must not exceed it.
- **Be able to decide:** run a live AI proposal through all ten steps and produce a defensible recommendation.
- **Self-test:** take a vendor proposal you've actually received and write the one-page ten-step analysis.

## Level 6 — Economics *(read: [09](09_ECONOMICS_VALUE.md))*

- **Learn:** the five-link chain (model → inference → task → process → value); the three pricing families and their traps; the verified value evidence including both sides (Klarna whole-arc; METR both results).
- **Understand:** why bills can rise while unit prices collapse (reasoning tokens); why the HITL ratio dominates task cost; why the individual-productivity/enterprise-EBIT gap exists.
- **Be able to explain:** "88% adopt, 37% see any EBIT impact, 6% see real money — and the difference is workflow redesign, not model choice."
- **Be able to decide:** whether a business case's unit economics survive doubling the HITL ratio; whether an outcome-pricing offer's outcome definition is auditable.
- **Self-test:** compute cost-per-task and value-per-task for one real workflow in your organisation, with sourced assumptions.

## Level 7 — Governance *(read: [08](08_GOVERNANCE_REGULATION.md), [10](10_ENTERPRISE_FAILURE_MODES.md))*

- **Learn:** the EU AI Act timeline as amended (what's live now vs Dec 2027); Australia's actual obligations and the 10 Dec 2026 ADM deadline; the seven-control stack; the seven failure modes.
- **Understand:** prompt injection is unsolved and containment is the defence; agents are employees from a risk perspective; governance is production-enablement, not tax.
- **Be able to explain:** to a board, in five minutes, what applies to your organisation today, what's dated, and what one decision they must own (CEO-level governance oversight — the strongest correlate of value).
- **Be able to decide:** what autonomy level your governance maturity actually supports; run the seven-question pre-mortem on any proposal.
- **Self-test:** draft the one-slide regulatory summary for your own organisation's actual footprint.

## Level 8 — Strategy *(read: [07](07_VENDOR_LANDSCAPE.md), [01](01_EXECUTIVE_SUMMARY.md); armed with [11](11_EXECUTIVE_QUESTIONS.md))*

- **Learn:** each major vendor's true position — what they own, commoditise, lock, and leave; the marketing translator.
- **Understand:** the control plane as the 2026–27 land grab; multi-vendor as equilibrium; why the model is the least sticky asset and your workflows/evals/data are the stickiest.
- **Be able to explain:** where *your* enterprise should place its bets: primary platform by data gravity, second lab always live, MCP-first tooling, portable evals, build only the differentiating last mile.
- **Be able to decide:** the actual portfolio — and hold your own in the room with any vendor, architect or consultant, using the questions playbook.
- **Self-test:** write the one-page AI strategy memo for your enterprise: three bets, two things you'll deliberately not do, one dependency you'll actively manage.

---

## Maintenance mode (after level 8)

This field turns over in months, but **the framework is designed so that facts expire faster than structure**: the seven layers, five axes, archetype dial, and failure taxonomy have been stable through two years of product churn — refresh the *facts* quarterly (model names, prices, regulatory dates: [13](13_SOURCE_REGISTER.md) tells you which claims are perishable), and re-examine the *framework* only when something structural shifts (a real federal US law; a control-plane winner; agents at genuine unsupervised scale). The night before any big meeting: [00](00_ONE_PAGE_CHEAT_SHEET.md).
