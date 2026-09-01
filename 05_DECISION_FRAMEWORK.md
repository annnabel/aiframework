# The Decision Framework — Five Axes and a Ten-Step Process

> **Why this document exists:** vendor feature comparison is how enterprises get sold; these five axes are how they should *decide*. Each axis ends in a question you can put to any proposal. The ten-step process at the end turns an executive's "we should do something with AI" into a structured analysis.

---

## Axis 1 — Trust vs Lock-in

**The idea:** every AI dependency is a bet on a partner. The question is never "avoid lock-in" (impossible) but "is this dependency *earning* its switching cost?"

Five distinct dependencies, often conflated:

1. **Foundation-model dependency** — one lab's models. *Weakening:* gateways, MCP, and multi-cloud model availability made swapping realistic; enterprises running 5+ models in production rose to 37%. But access can be revoked supply-side (OpenAI cut model access to a competitor-owned Cursor in 2026) — dependence includes the vendor's willingness to serve you.
2. **Platform dependency** — the runtime and DSL your agents live in. *Hardening:* Copilot Studio flows, Agentforce agents, AgentCore primitives do not port.
3. **Proprietary-data advantage** — yours, and the reason platforms court you: whoever indexes your data with permissions wins the workload (data gravity).
4. **Proprietary-workflow advantage** — the redesigned processes and accumulated evals; the most durable moat and, when built in a vendor's DSL, also the deepest lock-in.
5. **Commercial commitments** — ~$470B of cloud commit agreements steer AI procurement through hyperscaler marketplaces; AI spend that retires commit is "free" politically and sticky structurally.

**The 2×2:**

```
                         Dependency EARNS its cost
                                   ▲
        STRATEGIC PARTNERSHIP      │      HEALTHY ARM'S-LENGTH
   (deep platform integration;     │   (multi-model via gateway;
    negotiate hard: price locks,   │    MCP-first tools; portable
    exit clauses, audit rights)    │    evals; commodity per-seat)
 ──────────────────────────────────┼────────────────────────────────▶
   High switching cost             │              Low switching cost
        HOSTAGE SITUATION          │      FALSE ECONOMY
   (workflow DSL + credits +       │   (avoiding integration so hard
    proprietary memory, no         │    that nothing compounds; the
    portability plan — renegotiate │    "pilot forever" quadrant)
    or plan exit now)              │
                                   ▼
                         Dependency does NOT earn its cost
```

**The question to ask:** *"If we had to leave this vendor in 18 months, what exactly would we rebuild, and what would it cost?"* (Demand the list: workflows, evals, embeddings, memory, audit history, credits.)

---

## Axis 2 — Data Gravity

**The idea:** AI work migrates to where your valuable data already lives, because permissions, connectors and governance come free there. This is the strongest single predictor of platform choice — stronger than model quality.

**Where the data lives → which platform wins the workload:** M365/SharePoint → Copilot stack; Salesforce → Agentforce; SAP → Joule; analytical estates → Databricks (~$5.4B run-rate, AI-build leader) or Snowflake (~$5B, governed warehousing).

**The verified 2026 pattern — "primary build platform + cross-estate control plane":** enterprises pick a primary build surface where their densest data sits, then buy or assemble a *cross-estate* layer that inventories and governs agents everywhere — **Microsoft Agent 365** (GA May 2026), **Salesforce/MuleSoft Agent Fabric** (note: Salesforce's product, not Microsoft's), AWS AgentCore Policy, Databricks Unity AI Gateway, IBM watsonx Orchestrate's "agentic control plane". The open question is whether that control plane stays neutral or gets absorbed by your primary platform — every hyperscaler is bundling to prevent a neutral layer forming.

**The questions to ask:** *"Where do the three datasets that make this use case valuable actually live, and what does the permissions model look like there?"* and *"Which control plane will see ALL our agents — including the ones in other vendors' platforms?"*

---

## Axis 3 — Governance Readiness

**The idea:** governance maturity, not model capability, is the main brake on enterprise AI in 2026 — and the verified numbers are stark: **~74% of organisations plan agent adoption within two years; 21% have a mature agentic governance model** (Deloitte, n=3,235). Gartner attributes its predicted >40% agentic-project cancellations partly to inadequate risk controls.

**The maturity ladder** (assess yourself before approving autonomy):

| Level | You have... | You can safely run... |
|---|---|---|
| 1. Inventory | A register of every AI system and agent, with owners | Assistant seats |
| 2. Identity & permissions | Each agent as a directory identity with least-privilege, revocable access | Read-only agents |
| 3. Policy & audit | Deterministic rules on tool calls; full trajectory logging | Agents that act with approval gates |
| 4. Evaluation & monitoring | Offline eval gates + online monitoring + drift detection | Agents that act autonomously in bounded domains |
| 5. Managed autonomy | Risk-tiered autonomy, budget caps, kill switches, incident playbooks, board oversight | A scaled agent workforce |

**The non-negotiables at any level:** human approval on irreversible/high-blast-radius actions; never combining private data + untrusted input + an exfiltration path in one agent (prompt injection is unsolved); per-agent budget caps (cost control and safety control in one).

**The question to ask:** *"Show me the agent's identity, its permission set, its audit trail, and who gets paged when it misbehaves."* If any answer is missing, the autonomy on offer exceeds the governance available.

---

## Axis 4 — Unit Economics

**The idea:** AI cost must be traced through five links — **model cost → inference cost → task cost → process cost → business value** — because optimising any single link in isolation misleads.

- **Model cost:** per-token list prices span ~50× from frontier to small tiers (e.g. $10/$50 per MTok down to $0.20/$1.20). Falling fast per unit of capability (median ~50×/year) — but *reasoning models spend more tokens per task*, so bills can rise while prices fall.
- **Inference cost:** the engineering levers — **routing** (send each task to the cheapest adequate tier: the biggest lever), **caching** (~90% off repeated context), **batching** (50% off non-urgent work), provider choice (same open model varies ~6× across providers). A well-engineered workload runs 5–20× below naive flagship list price.
- **Task cost:** what one completed unit of work costs, including agent loops (multiple model calls), tool calls, retries, and the **human-in-the-loop ratio** — the variable that dominates and that vendor demos hide.
- **Process cost:** the task in context — rework, exception handling, supervision overhead, the change management to actually shift the process.
- **Business value:** what the completed work is worth — labour cost displaced, cycle time, revenue, risk avoided.

**The pocket framework:**

```
COST per AI task  = (model calls × avg tokens × routed price)
                  + tool/infrastructure cost
                  + (HITL ratio × loaded human review cost)
                  + amortised build & governance cost

VALUE per AI task = (labour cost of the human-performed task × quality-adjusted substitution rate)
                  + cycle-time/throughput value
                  + error/risk-reduction value

Decision rule: pilot → measure both on REAL traffic → scale only if value/cost > 3×
(margin for the HITL ratio and model bills to move against you).
```

**The question to ask:** *"What is the all-in cost per completed task at our volume, at the demo's quality level, including human review — and what's the same number if the HITL ratio doubles?"*

---

## Axis 5 — Failure Modes

**The idea:** most AI initiatives fail for non-technical reasons, so the failure taxonomy *is* a decision axis: screen every proposal against the seven ways it will most likely die. (Full evidence and mitigations in [10_ENTERPRISE_FAILURE_MODES](10_ENTERPRISE_FAILURE_MODES.md).)

| Failure class | The one-line screen |
|---|---|
| Technology | Is this a workflow problem being solved with an autonomous agent? |
| Data | Is the data ready — quality, permissions, freshness — or is that "phase 2"? |
| Process | Is the workflow being redesigned, or is AI bolted onto the old one? (Redesign is the single biggest EBIT driver; only ~21% do it) |
| Governance | Can this pass security review *today*? Who owns the agent? |
| Economics | Does the unit-economics math above survive contact with real volumes? |
| People/change | Is there a change budget ≥ the technology budget? (Leaders spend ~70% on people/process) |
| Operating model | Is there an owner with P&L accountability, or a lab producing demos? |

---

## The Ten-Step Executive Decision Process

When someone brings you an AI problem, walk it in order — each step gates the next:

1. **What are we actually trying to change?** A *task*, a *decision*, a *process*, a *product*, or *general productivity*? (Different answers lead to different archetypes; "productivity" → seats; "process" → agents/workflows; "product" → custom build.)
2. **What type of AI capability does that require?** Embedded feature → assistant → workflow automation → retrieval over our knowledge → agent that acts → custom application. Choose the *least* agentic thing that solves it.
3. **Where should it be built?** Map to the [archetypes](04_BUILD_ARCHETYPES.md): does a suite we own already do this (1–3)? Does it need our engineering (4–5)? Is there a sovereignty mandate (6)? Can we buy the outcome (7)?
4. **What data and context does it need?** Name the datasets, their location, their permissions model, their freshness. If the data isn't ready, this is a data project first.
5. **What actions may it take?** Read-only → drafts for humans → acts with approval → acts autonomously. List the actual systems it will touch.
6. **What autonomy is appropriate?** Match action risk to the governance ladder (Axis 3). Irreversible or customer-facing actions start gated, always.
7. **What governance is required?** Identity, permissions, policy, evals, monitoring, audit, kill switch — and who operates each. Inherited (archetypes 1–4) or built (5–6)?
8. **What are the unit economics?** Run the Axis-4 math with real volumes and an honest HITL ratio.
9. **What creates lock-in, and is it earning it?** Run the Axis-1 quadrant; get the exit-cost list in writing.
10. **What does productionisation require?** Evals + monitoring + support ownership + change management + the scale-out plan. A pilot without this list budgeted is a demo, not a project.

**The meta-rule:** steps 1–2 kill more bad projects than steps 3–10 combined. Most failed AI initiatives chose a technology before naming the change.
