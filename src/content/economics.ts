// Economics & value content, from 09_ECONOMICS_VALUE.md.

export const valueVerdict = {
  headline:
    "Adoption is near-universal; financial impact is rare and concentrated.",
  stats: [
    { value: "88%", label: "of organisations use AI in at least one function", source: "McKinsey, Aug 2026, n=1,719" },
    { value: "80%", label: "of users report individual productivity gains", source: "McKinsey" },
    { value: "37%", label: "attribute any EBIT impact (flat year on year)", source: "McKinsey" },
    { value: "~6%", label: "are high performers (≥5% of EBIT attributable)", source: "McKinsey" },
  ],
  bridge:
    "The individual-gains-vs-enterprise-P&L gap is the central economic paradox of 2026, and the evidence says the bridge is workflow redesign (the single biggest EBIT driver; only ~21% do it), not better models.",
};

// The five-link chain.
export const fiveLinks = [
  {
    id: "model",
    name: "Model cost",
    body:
      "Per-token list prices span ~50× from frontier to small tiers. Price per fixed capability falls 9×–900×/year (median ~50× — Epoch AI); deflation shows up as last year's frontier arriving in this year's cheap tier. The countervailing force: reasoning models spend more tokens per task, so bills can rise while unit prices fall.",
  },
  {
    id: "inference",
    name: "Inference cost",
    body:
      "Three levers: routing (the biggest — most tokens to cheap tiers, frontier reserved for hard reasoning), caching (repeated context at ~10% of price), batching (50% off non-urgent; discounts stack to ~95% on repeated prefixes). A well-engineered workload runs 5–20× below naive flagship list price.",
  },
  {
    id: "task",
    name: "Task cost",
    body:
      "One completed unit of work = multiple model calls at routed tiers + tool calls + retries + the human-in-the-loop share. The HITL ratio dominates: a $0.40-of-tokens task with 30% human review at $50/hr loaded cost is not a $0.40 task.",
  },
  {
    id: "process",
    name: "Process cost",
    body:
      "The task in context — rework, exception handling, supervision overhead, and the change management to actually shift the process.",
  },
  {
    id: "value",
    name: "Business value",
    body:
      "What the completed work is worth — labour cost displaced, cycle time, revenue, risk avoided. Scale only if value/cost > 3× on measured production traffic.",
  },
];

// Verified list prices, per 1M tokens, Aug–Sep 2026 (perishable — see source register).
export const priceTiers = [
  { tier: "Frontier-max", examples: "Claude Fable 5", input: 10, output: 50 },
  { tier: "Flagship", examples: "Claude Opus 5 · GPT-5.6 Sol · Gemini 3.1 Pro", input: 5, output: 25 },
  { tier: "Mid", examples: "Claude Sonnet 5 · GPT-5.6 Terra", input: 2, output: 10 },
  { tier: "Small", examples: "Claude Haiku 4.5 · GPT-5.6 Luna", input: 0.2, output: 1.2 },
  { tier: "Open-weight (via providers)", examples: "DeepSeek V4-class", input: 0.3, output: 1.0 },
];

export const priceFacts = [
  "Output costs ~5–6× input per token.",
  "~50× spread from flagship to small tier.",
  "The same open model varies ~6× in price across inference providers.",
  "Batch = 50% off; cached input ≈ 90% off; stackable.",
];

// Pricing models table.
export const pricingModels = [
  {
    model: "Per-seat",
    examples: "M365 Copilot $30 · Agent 365 $15 · Claude Enterprise $20 + usage · ChatGPT Enterprise (unpublished; ~$45–75 reported)",
    theCatch: "Shelf-ware risk; demand usage analytics before renewal",
  },
  {
    model: "Consumption / credits",
    examples: "Copilot Studio ($200/25k credits; 1–200+ credits per interaction) · Agentforce Flex Credits ($0.10/action) · all API platforms",
    theCatch: "Credit-conversion opacity recreates the cloud-FinOps problem for agents",
  },
  {
    model: "Per-outcome",
    examples: "Fin $0.99/resolution · Sierra custom outcome deals · HubSpot/Zendesk $0.50–2.00",
    theCatch: "Outcome-definition gaming (“resolution” = customer gave up); unbudgetable variance",
  },
];

export const pricingDirection =
  "Pure per-seat fell to ~15% of SaaS companies; hybrid base + usage is the standard at ~41% (Bessemer, Feb 2026). Outcome pricing is established only where outcomes are countable — customer support above all — legitimised by Salesforce's $3.6B agreement to acquire Fin. Vendors increasingly sell all three simultaneously — model your own mix before they model it for you.";

// Where value is proven.
export const valueEvidence = [
  {
    id: "service",
    domain: "Customer service",
    verdict: "The strongest causal evidence",
    body:
      "The QJE randomised trial (5,179 agents): +14% issues resolved/hour, +34% for novices, ~zero for the most experienced — AI compresses the experience curve. The Klarna arc told whole: 2024 — assistant does the work of ~700 agents, ~$40M claimed savings; May 2025 — public walk-back and rehiring (“lower quality”), a human floor restored; late 2025 — still reporting ~$60M annual savings at an ~850-agent workload. Lesson: the automation ceiling was ~⅔ of volume; hybrid won, not reversal.",
  },
  {
    id: "engineering",
    domain: "Software engineering",
    verdict: "Genuinely two-sided",
    body:
      "Positive RCTs on typical/greenfield tasks (+55.8% GitHub task RCT; +8.7% PRs in enterprise). The independent METR RCT found experienced open-source developers 19% slower with AI on their own complex repos (while believing they were 20% faster) — softened by METR's own Feb 2026 update to ~–4% with better tooling and acknowledged selection bias. Honest synthesis: strong gains for typical tasks and juniors; neutral-to-improving for experts on complex legacy code; self-reported speedup always overstates measured speedup.",
  },
  {
    id: "backoffice",
    domain: "Back office / documents",
    verdict: "Consistent surveyed value",
    body:
      "Consistent surveyed value in document-heavy workflows; API usage data shows work shifting from augmentation to automation. Less RCT-grade evidence than the two above.",
  },
  {
    id: "agents",
    domain: "Agentic AI specifically",
    verdict: "Hype vs evidence",
    body:
      "Gartner's verified prediction stands: >40% of agentic AI projects cancelled by end-2027; only 17% of enterprises have deployed agents at all — while 40% of $1B+ orgs are now scaling agents (up from 27%). Verdict: real, growing, function-specific value under human oversight — customer support, coding, documents — and no credible evidence yet of broad autonomous-agent value.",
  },
];

// What separates the ~6% who capture real value.
export const winnersTraits = [
  "Workflow redesign — the single biggest EBIT driver",
  "CEO-level governance ownership — the strongest correlate of bottom-line impact (only 28% have it)",
  "Fewer, bigger bets — BCG's 10/20/70 rule: 10% algorithms, 20% data/tech, 70% people and process",
  "Buy for commodity, build the differentiator — bought solutions historically reach production ~2× as often (67% vs 33%)",
  "Evals discipline — the capability that makes model swaps and scaling safe",
  "Human-in-the-loop by design — the Klarna lesson, institutionalised",
];

export const economicsSoWhat =
  "The binding constraint on AI value in 2026 is not model capability and not spend. It is the organisation's willingness to redesign work, govern from the top, and measure honestly. Fund those three before funding more technology.";

// ── Cost-per-task calculator ─────────────────────────────────────────
// Formulas are exactly the pocket framework from 05/09:
//   COST  = (model calls × avg tokens × routed price) + tools/infra
//         + (HITL ratio × loaded human review cost) + amortised build & governance
//   VALUE = (labour cost × quality-adjusted substitution rate)
//         + cycle-time value + risk-reduction value
//   Decision rule: scale only if value/cost > 3×.

export interface CalcInputs {
  modelCalls: number;
  avgTokensK: number; // thousands of tokens per call (blended in+out)
  pricePerMTok: number; // routed blended $/MTok
  toolCost: number; // $ per task
  hitlRatio: number; // 0–1
  reviewMinutes: number; // minutes of human review when it happens
  humanRate: number; // $/hr loaded
  amortised: number; // $ per task, build & governance amortised
  labourCost: number; // $ human cost of the task done manually
  substitution: number; // 0–1 quality-adjusted substitution rate
  cycleValue: number; // $ per task
  riskValue: number; // $ per task
}

export const calcDefaults: CalcInputs = {
  modelCalls: 6,
  avgTokensK: 8,
  pricePerMTok: 6,
  toolCost: 0.05,
  hitlRatio: 0.3,
  reviewMinutes: 5,
  humanRate: 50,
  amortised: 0.1,
  labourCost: 12,
  substitution: 0.8,
  cycleValue: 1,
  riskValue: 0.5,
};

export function calcCost(i: CalcInputs): { tokens: number; hitl: number; total: number } {
  const tokens = (i.modelCalls * i.avgTokensK * 1000 * i.pricePerMTok) / 1_000_000;
  const hitl = i.hitlRatio * (i.reviewMinutes / 60) * i.humanRate;
  return { tokens, hitl, total: tokens + i.toolCost + hitl + i.amortised };
}

export function calcValue(i: CalcInputs): number {
  return i.labourCost * i.substitution + i.cycleValue + i.riskValue;
}
