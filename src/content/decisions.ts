import type { DecisionAxis, SourceId } from "./types";

// ── The five decision axes (05_DECISION_FRAMEWORK.md) ────────────────

export const axes: DecisionAxis[] = [
  {
    id: "trust",
    num: 1,
    name: "Trust vs Lock-in",
    idea:
      "Every AI dependency is a bet on a partner. The question is never “avoid lock-in” (impossible) but “is this dependency earning its switching cost?”",
    detail: [
      "Foundation-model dependency — weakening: gateways, MCP and multi-cloud availability made swapping realistic (37% of enterprises run 5+ models). But access can be revoked supply-side — dependence includes the vendor's willingness to serve you.",
      "Platform dependency — hardening: Copilot Studio flows, Agentforce agents, AgentCore primitives do not port.",
      "Proprietary-data advantage — yours, and the reason platforms court you: whoever indexes your data with permissions wins the workload.",
      "Proprietary-workflow advantage — the redesigned processes and accumulated evals; the most durable moat and, when built in a vendor's DSL, also the deepest lock-in.",
      "Commercial commitments — ~$470B of cloud commit agreements steer AI procurement; AI spend that retires commit is “free” politically and sticky structurally.",
    ],
    question:
      "If we had to leave this vendor in 18 months, what exactly would we rebuild, and what would it cost? (Demand the list: workflows, evals, embeddings, memory, audit history, credits.)",
    sources: ["05"],
  },
  {
    id: "gravity",
    num: 2,
    name: "Data Gravity",
    idea:
      "AI work migrates to where your valuable data already lives, because permissions, connectors and governance come free there. The strongest single predictor of platform choice — stronger than model quality.",
    detail: [
      "Where the data lives → which platform wins the workload: M365/SharePoint → Copilot stack; Salesforce → Agentforce; SAP → Joule; analytical estates → Databricks or Snowflake.",
      "The verified 2026 pattern: primary build platform + cross-estate control plane — pick a primary build surface where your densest data sits, then buy or assemble a cross-estate layer that inventories and governs agents everywhere.",
      "The open question: whether that control plane stays neutral or gets absorbed by your primary platform — every hyperscaler is bundling to prevent a neutral layer forming.",
    ],
    question:
      "Where do the three datasets that make this use case valuable actually live, and what does the permissions model look like there? And which control plane will see ALL our agents — including the ones in other vendors' platforms?",
    sources: ["05"],
  },
  {
    id: "governance",
    num: 3,
    name: "Governance Readiness",
    idea:
      "Governance maturity, not model capability, is the main brake on enterprise AI in 2026: ~74% of organisations plan agent adoption within two years; 21% have a mature agentic governance model.",
    detail: [
      "Assess yourself on the maturity ladder before approving autonomy — autonomy must not exceed maturity.",
      "Non-negotiables at any level: human approval on irreversible/high-blast-radius actions; never combining private data + untrusted input + an exfiltration path in one agent; per-agent budget caps.",
    ],
    question:
      "Show me the agent's identity, its permission set, its audit trail, and who gets paged when it misbehaves. If any answer is missing, the autonomy on offer exceeds the governance available.",
    sources: ["05"],
  },
  {
    id: "economics",
    num: 4,
    name: "Unit Economics",
    idea:
      "AI cost must be traced through five links — model cost → inference cost → task cost → process cost → business value — because optimising any single link in isolation misleads.",
    detail: [
      "Model cost: per-token list prices span ~50× from frontier to small tiers; falling fast per unit of capability — but reasoning models spend more tokens per task.",
      "Inference cost: routing (the biggest lever), caching (~90% off repeated context), batching (50% off non-urgent). A well-engineered workload runs 5–20× below naive flagship list price.",
      "Task cost: one completed unit of work including agent loops, tool calls, retries and the human-in-the-loop ratio — the variable that dominates and that vendor demos hide.",
      "Process cost: rework, exception handling, supervision, change management.",
      "Business value: labour cost displaced, cycle time, revenue, risk avoided. Scale only if value/cost > 3× on measured production traffic.",
    ],
    question:
      "What is the all-in cost per completed task at our volume, at the demo's quality level, including human review — and what's the same number if the HITL ratio doubles?",
    sources: ["05"],
  },
  {
    id: "failures",
    num: 5,
    name: "Failure Modes",
    idea:
      "Most AI initiatives fail for non-technical reasons, so the failure taxonomy is a decision axis: screen every proposal against the seven ways it will most likely die.",
    detail: [
      "Technology: Is this a workflow problem being solved with an autonomous agent?",
      "Data: Is the data ready — quality, permissions, freshness — or is that “phase 2”?",
      "Process: Is the workflow being redesigned, or is AI bolted onto the old one?",
      "Governance: Can this pass security review today? Who owns the agent?",
      "Economics: Does the unit-economics math survive contact with real volumes?",
      "People/change: Is there a change budget ≥ the technology budget?",
      "Operating model: Is there an owner with P&L accountability, or a lab producing demos?",
    ],
    question: "Run the seven-question pre-mortem — it kills most bad projects in a meeting.",
    sources: ["05", "10"],
  },
];

// ── The lock-in 2×2 (Axis 1) ─────────────────────────────────────────

export const lockInQuadrants = [
  {
    id: "partnership",
    name: "Strategic partnership",
    earns: true,
    highCost: true,
    body:
      "Deep platform integration; negotiate hard: price locks, exit clauses, audit rights.",
  },
  {
    id: "arms-length",
    name: "Healthy arm's-length",
    earns: true,
    highCost: false,
    body: "Multi-model via gateway; MCP-first tools; portable evals; commodity per-seat.",
  },
  {
    id: "hostage",
    name: "Hostage situation",
    earns: false,
    highCost: true,
    body:
      "Workflow DSL + credits + proprietary memory, no portability plan — renegotiate or plan exit now.",
  },
  {
    id: "false-economy",
    name: "False economy",
    earns: false,
    highCost: false,
    body:
      "Avoiding integration so hard that nothing compounds; the “pilot forever” quadrant.",
  },
];

// ── The governance maturity ladder (Axis 3) ──────────────────────────

export const maturityLadder = [
  { level: 1, name: "Inventory", have: "A register of every AI system and agent, with owners", canRun: "Assistant seats" },
  {
    level: 2,
    name: "Identity & permissions",
    have: "Each agent as a directory identity with least-privilege, revocable access",
    canRun: "Read-only agents",
  },
  {
    level: 3,
    name: "Policy & audit",
    have: "Deterministic rules on tool calls; full trajectory logging",
    canRun: "Agents that act with approval gates",
  },
  {
    level: 4,
    name: "Evaluation & monitoring",
    have: "Offline eval gates + online monitoring + drift detection",
    canRun: "Agents that act autonomously in bounded domains",
  },
  {
    level: 5,
    name: "Managed autonomy",
    have: "Risk-tiered autonomy, budget caps, kill switches, incident playbooks, board oversight",
    canRun: "A scaled agent workforce",
  },
];

// ── The ten-step executive decision process (doc 05) ─────────────────

export interface TenStep {
  num: number;
  title: string;
  body: string;
}

export const tenSteps: TenStep[] = [
  {
    num: 1,
    title: "What are we actually trying to change?",
    body:
      "A task, a decision, a process, a product, or general productivity? Different answers lead to different archetypes; “productivity” → seats; “process” → agents/workflows; “product” → custom build.",
  },
  {
    num: 2,
    title: "What type of AI capability does that require?",
    body:
      "Embedded feature → assistant → workflow automation → retrieval over our knowledge → agent that acts → custom application. Choose the least agentic thing that solves it.",
  },
  {
    num: 3,
    title: "Where should it be built?",
    body:
      "Map to the archetypes: does a suite we own already do this (1–3)? Does it need our engineering (4–5)? Is there a sovereignty mandate (6)? Can we buy the outcome (7)?",
  },
  {
    num: 4,
    title: "What data and context does it need?",
    body:
      "Name the datasets, their location, their permissions model, their freshness. If the data isn't ready, this is a data project first.",
  },
  {
    num: 5,
    title: "What actions may it take?",
    body:
      "Read-only → drafts for humans → acts with approval → acts autonomously. List the actual systems it will touch.",
  },
  {
    num: 6,
    title: "What autonomy is appropriate?",
    body:
      "Match action risk to the governance maturity ladder. Irreversible or customer-facing actions start gated, always.",
  },
  {
    num: 7,
    title: "What governance is required?",
    body:
      "Identity, permissions, policy, evals, monitoring, audit, kill switch — and who operates each. Inherited (archetypes 1–4) or built (5–6)?",
  },
  {
    num: 8,
    title: "What are the unit economics?",
    body: "Run the Axis-4 math with real volumes and an honest HITL ratio.",
  },
  {
    num: 9,
    title: "What creates lock-in, and is it earning it?",
    body: "Run the Axis-1 quadrant; get the exit-cost list in writing.",
  },
  {
    num: 10,
    title: "What does productionisation require?",
    body:
      "Evals + monitoring + support ownership + change management + the scale-out plan. A pilot without this list budgeted is a demo, not a project.",
  },
];

export const tenStepsMetaRule =
  "Steps 1–2 kill more bad projects than steps 3–10 combined. Most failed AI initiatives chose a technology before naming the change.";

// ── The knowledge-vs-behaviour decision tree (doc 04) ────────────────

export interface TreeBranch {
  id: string;
  need: string;
  steps: string[];
  note?: string;
}

export const decisionTree: TreeBranch[] = [
  {
    id: "knowledge",
    need: "Need NEW KNOWLEDGE in answers?",
    steps: ["Retrieval (RAG). Fresh, citable, permissioned."],
    note: "Only consider tuning if knowledge is small, stable, and latency-critical.",
  },
  {
    id: "behaviour",
    need: "Need DIFFERENT BEHAVIOUR?",
    steps: [
      "System prompt / context engineering (solves most cases)",
      "Few-shot examples in context",
      "Fine-tune (LoRA) only if evals still fail on format/tone/register",
    ],
  },
  {
    id: "tools",
    need: "Need BETTER TOOL USE / agent skill?",
    steps: [
      "Better tool definitions + context engineering",
      "RFT against verifiable outcomes (needs eval infrastructure)",
    ],
  },
  {
    id: "cost",
    need: "Need LOWER LATENCY / COST?",
    steps: [
      "Route to a smaller model tier + caching + batching",
      "Distil the proven workflow into an SLM",
      "Self-host only at sustained volume or under mandate",
    ],
  },
  {
    id: "consistency",
    need: "Need STRONGER CONSISTENCY?",
    steps: [
      "Structured output (native JSON schema) — free",
      "Workflows instead of agents (remove degrees of freedom)",
      "Fine-tune for schema adherence as last resort",
    ],
  },
];

export const decisionTreeRule =
  "In every branch: exhaust the cheaper lever first, and let evals — not vendor advice — tell you when to escalate.";

// ── Interactive build-approach guide ─────────────────────────────────
// NOTE: The questions and mapping below are navigation logic built to walk
// the reader through the source framework (docs 04 & 05). The archetype
// descriptions and trade-offs shown at the end are source-backed; this
// routing is an interface, not new expertise.

export interface GuideQuestion {
  id: string;
  prompt: string;
  help?: string;
  options: { id: string; label: string }[];
}

export const guideQuestions: GuideQuestion[] = [
  {
    id: "change",
    prompt: "What are you actually trying to change?",
    help: "Step 1 of the ten-step process — it kills more bad projects than everything else combined.",
    options: [
      { id: "productivity", label: "General productivity across many people" },
      { id: "process", label: "A specific process or repeated task" },
      { id: "product", label: "A product or differentiating capability" },
      { id: "outcome", label: "A well-bounded, countable service outcome (e.g. support resolutions)" },
    ],
  },
  {
    id: "location",
    prompt: "Where does the work (and its data) live today?",
    help: "Data gravity is the strongest single predictor of platform choice.",
    options: [
      { id: "suite", label: "Inside one SaaS suite we already run (M365, Salesforce, SAP…)" },
      { id: "cross", label: "Across several systems" },
      { id: "ours", label: "In our own products / proprietary systems" },
    ],
  },
  {
    id: "differentiation",
    prompt: "Is this capability differentiating for you?",
    help: "You are differentiated at layers 4 and 7 (your data, your workflows) — almost never below.",
    options: [
      { id: "commodity", label: "Commodity — our competitors do the same thing" },
      { id: "differentiating", label: "Differentiating — part of the 10–20% that sets us apart" },
    ],
  },
  {
    id: "engineering",
    prompt: "Do you have real AI engineering capacity for this?",
    help: "Archetypes 5–6 mean owning evals, context engineering, and the full Layer-6 governance stack.",
    options: [
      { id: "none", label: "No dedicated engineering" },
      { id: "some", label: "Solid engineering, limited AI-platform depth" },
      { id: "strong", label: "A genuine AI platform/product team" },
    ],
  },
  {
    id: "sovereignty",
    prompt: "Is there a sovereignty, residency or air-gap mandate?",
    help: "A genuine procurement gate for ~10–20% of workloads (government/defence/regulated); mostly marketing beyond that.",
    options: [
      { id: "no", label: "No" },
      { id: "yes", label: "Yes — a hard legal/regulatory requirement" },
    ],
  },
];

export interface GuideAnswerSet {
  change?: string;
  location?: string;
  differentiation?: string;
  engineering?: string;
  sovereignty?: string;
}

export interface GuideResult {
  archetypeIds: string[];
  reasoning: string[];
}

/** Routing logic over the source framework — see note above. */
export function guideRecommend(a: GuideAnswerSet): GuideResult {
  const reasoning: string[] = [];
  let ids: string[] = [];

  if (a.sovereignty === "yes") {
    ids = ["selfhost"];
    reasoning.push(
      "A hard sovereignty/residency mandate points to archetype 6 (self-hosted open weights) — the only archetype where prompts never leave your boundary. Note its cost: highest operational burden, no inherited governance, and the frontier open weights are Chinese-origin (run your own procurement assessment)."
    );
    return { archetypeIds: ids, reasoning };
  }

  if (a.change === "productivity") {
    ids = ["seats", "embedded"];
    reasoning.push(
      "“General productivity” maps to assistant seats (archetype 2) — the broad-population play behind the individual gains 80% of users report — plus embedded AI (archetype 1) you already own. The decision framework warns: seats are poor for process automation or P&L attribution."
    );
    return { archetypeIds: ids, reasoning };
  }

  if (a.change === "outcome") {
    ids = ["outcome"];
    reasoning.push(
      "A well-bounded, countable service outcome is the home ground of archetype 7 (outcome-bought vertical agents, new in 2026): you buy resolutions, not software. Audit how the outcome is defined and gamed, and note the switching-cost risk — your process knowledge accretes in their product."
    );
    return { archetypeIds: ids, reasoning };
  }

  if (a.change === "process") {
    if (a.location === "suite") {
      ids = ["configure"];
      reasoning.push(
        "A process living inside a suite you already run maps to archetype 3 (configure on a platform): data gravity works for you and governance is inherited. The trade: this is the sticky tier — flows are platform-DSL artifacts that don't port — and consumption credits (1–200+ per interaction) are the FinOps trap."
      );
    } else if (a.differentiation === "differentiating" && a.engineering !== "none") {
      ids = a.engineering === "strong" ? ["framework", "runtime"] : ["runtime"];
      reasoning.push(
        "A differentiating cross-system process with engineering capacity points to archetype 4 (managed agent runtime) — high control over agent logic with identity, policy and evals shipped as platform services" +
          (a.engineering === "strong"
            ? " — or archetype 5 (custom on frameworks) for maximum control, if you accept owning the full Layer-6 governance stack yourself."
            : ".")
      );
    } else {
      ids = ["configure", "runtime"];
      reasoning.push(
        "A commodity cross-system process: check whether a platform you own can express it (archetype 3) before building. The evidence favours buying for commodity capability — bought solutions historically reach production ~2× as often (~67% vs ~33%)."
      );
    }
  }

  if (a.change === "product") {
    if (a.engineering === "none") {
      ids = ["outcome", "configure"];
      reasoning.push(
        "A product ambition without engineering capacity is a warning sign from the framework: either buy the outcome (archetype 7) or start on a platform (archetype 3). Archetype 5 without genuine AI engineering skill is the classic fast-to-demo, slow-to-production trap."
      );
    } else {
      ids = a.engineering === "strong" ? ["framework", "runtime"] : ["runtime", "framework"];
      reasoning.push(
        "A differentiating product with engineering capacity is the home ground of archetypes 5 (custom on frameworks — total model flexibility, lowest platform lock-in, but you own everything) and 4 (managed runtime — same control over logic, with governance primitives inherited). The framework's caveat: build only the genuinely differentiating 10–20%."
      );
    }
  }

  if (a.differentiation === "commodity" && (ids.includes("framework") || ids.includes("selfhost"))) {
    reasoning.push(
      "Caution from the source: someone is proposing archetype 5–6 for a commodity problem. The evidence says buy for commodity, build the differentiator."
    );
  }

  reasoning.push(
    "Remember the portfolio rule: the portfolio, not the archetype, is the decision. A typical 2026 estate runs #1+#2 for the broad base, #3–4 for departmental automation, #5 for the differentiating few, and keeps #6 as leverage."
  );

  return { archetypeIds: ids.length ? ids : ["seats"], reasoning };
}

export const guideSources: SourceId[] = ["04", "05"];
