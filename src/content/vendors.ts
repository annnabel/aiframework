import type { LayerId } from "./types";

// Vendor landscape, from 07_VENDOR_LANDSCAPE.md.
// Positioning, not feature lists: vendor comparisons age in weeks;
// vendor strategies persist for years.

export type Presence = 0 | 1 | 2 | 3; // — · ● · ●● · ●●●

export interface Vendor {
  id: string;
  name: string;
  group: "Infrastructure" | "Models" | "Platforms" | "Applications";
  /** presence per layer, keyed by layer id */
  grid: Partial<Record<LayerId, { level: Presence; note?: string }>>;
  tryingToOwn: string;
  commoditises: string;
  locksYouInto: string;
  leavesToOthers: string;
  watchOrAsk: string;
}

export const vendors: Vendor[] = [
  {
    id: "nvidia",
    name: "NVIDIA",
    group: "Infrastructure",
    grid: {
      compute: { level: 3 },
      models: { level: 1, note: "open models" },
      serving: { level: 1, note: "via partners" },
      build: { level: 1, note: "NeMo" },
      control: { level: 1, note: "guardrails" },
    },
    tryingToOwn:
      "The system — rack-scale platforms (NVL72), networking, CUDA — not just chips; consolidated inference silicon by absorbing Groq (~$20B).",
    commoditises: "Nothing willingly.",
    locksYouInto: "CUDA ecosystem; multi-year supply relationships.",
    leavesToOthers: "Models, applications, your data.",
    watchOrAsk:
      "Watch: custom hyperscaler silicon (TPU v7, Trainium3, Maia 200) eroding the inference share — that erosion is what funds the token price cuts you enjoy.",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    group: "Platforms",
    grid: {
      compute: { level: 2, note: "Maia, Azure" },
      models: { level: 1, note: "MAI + OpenAI tie" },
      serving: { level: 3, note: "Foundry" },
      data: { level: 2, note: "Fabric/OneLake" },
      build: { level: 3, note: "Copilot Studio, Agent Framework" },
      control: { level: 3, note: "Agent 365, Entra, Purview" },
      apps: { level: 3, note: "M365 Copilot" },
    },
    tryingToOwn:
      "The employment layer for agents — every agent in your estate (including third-party) getting an Entra identity, a Purview policy, a Defender signal and a ~$15/seat Agent 365 registration; plus the productivity surface and dev platform.",
    commoditises: "Models (now genuinely multi-model — OpenAI and Claude in Foundry).",
    locksYouInto: "The deepest interlock in the industry: identity + data + productivity + governance.",
    leavesToOthers: "Frontier model R&D (mostly), vertical depth.",
    watchOrAsk:
      "Ask: what does Agent 365 actually see and control for agents not built on Microsoft?",
  },
  {
    id: "aws",
    name: "AWS",
    group: "Platforms",
    grid: {
      compute: { level: 3, note: "Trainium" },
      models: { level: 1, note: "Nova" },
      serving: { level: 3, note: "Bedrock" },
      data: { level: 2 },
      build: { level: 3, note: "AgentCore" },
      control: { level: 2, note: "AgentCore Identity/Policy" },
      apps: { level: 1, note: "Kiro, Quick" },
    },
    tryingToOwn:
      "The agent infrastructure layer (AgentCore: runtime, gateway, identity, memory, policy, evals) while staying studiedly neutral on models (~100 in Bedrock; Anthropic as flagship partner).",
    commoditises: "Models and frameworks (“bring any”).",
    locksYouInto: "AgentCore primitives, IAM integration, and your EDP commit.",
    leavesToOthers: "The productivity suite, business applications.",
    watchOrAsk: "Ask: which AgentCore primitives (memory, policy wiring) would we rebuild if we left?",
  },
  {
    id: "google",
    name: "Google",
    group: "Platforms",
    grid: {
      compute: { level: 3, note: "TPU" },
      models: { level: 3, note: "Gemini" },
      serving: { level: 3, note: "GEAP" },
      data: { level: 2, note: "BigQuery" },
      build: { level: 2, note: "ADK, A2A" },
      control: { level: 2, note: "Agent Gateway/Registry" },
      apps: { level: 2, note: "Gemini Enterprise, Workspace" },
    },
    tryingToOwn:
      "The full stack TPU→Workspace, with the price/performance frontier (Gemini) as the wedge; strong open-protocol posture (A2A, ADK).",
    commoditises: "Inference pricing.",
    locksYouInto: "BigQuery/Workspace data gravity; moderate otherwise.",
    leavesToOthers: "—",
    watchOrAsk:
      "Watch: three renames in two years (Agentspace → Gemini Enterprise; Vertex AI → Gemini Enterprise Agent Platform) — capability is real, brand stability isn't. Ask: which of today's names survives to our renewal date?",
  },
  {
    id: "openai",
    name: "OpenAI",
    group: "Models",
    grid: {
      compute: { level: 1, note: "Stargate deals" },
      models: { level: 3, note: "GPT-5.6" },
      serving: { level: 2, note: "API" },
      data: { level: 1 },
      build: { level: 2, note: "Agents SDK, AgentKit" },
      control: { level: 1, note: "Frontier" },
      apps: { level: 3, note: "ChatGPT Enterprise" },
    },
    tryingToOwn:
      "The employee-facing AI seat and the “agent workforce” (Frontier platform), without owning a cloud.",
    commoditises: "Mid-tier intelligence (aggressive GPT-5.6 price cuts).",
    locksYouInto: "Its API surface and consumer-habit gravity; no data estate to hold you.",
    leavesToOthers: "Infrastructure (Azure/Oracle/Stargate), your data platform.",
    watchOrAsk:
      "Position: consumer king; enterprise API share slipping; countering with seats, price, and enterprise packaging.",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    group: "Models",
    grid: {
      compute: { level: 1, note: "compute deals" },
      models: { level: 3, note: "Claude" },
      serving: { level: 2, note: "API + all 3 clouds" },
      data: { level: 1 },
      build: { level: 2, note: "Agent SDK, MCP" },
      control: { level: 1, note: "admin/compliance APIs" },
      apps: { level: 2, note: "Claude, Claude Code" },
    },
    tryingToOwn:
      "The model + agent harness layer (Claude, Claude Code, Agent SDK, MCP authorship) — monetised through everyone's platform (the only frontier family on all three clouds).",
    commoditises: "Tool integration itself (donating MCP to the Linux Foundation).",
    locksYouInto: "The least of the majors structurally — the pull is capability and the coding/agent ecosystem.",
    leavesToOthers: "Clouds, data platforms, most vertical apps.",
    watchOrAsk: "Position: enterprise API leader; the “safe/enterprise-grade” brand.",
  },
  {
    id: "databricks",
    name: "Databricks",
    group: "Platforms",
    grid: {
      models: { level: 1 },
      serving: { level: 2, note: "Mosaic" },
      data: { level: 3, note: "lakehouse, Unity" },
      build: { level: 2, note: "Agent Bricks" },
      control: { level: 2, note: "Unity AI Gateway, MLflow" },
      apps: { level: 1 },
    },
    tryingToOwn:
      "Governed data + the evaluation/quality loop — “AI is good because your data is” (Agent Bricks, Unity AI Gateway, MLflow). Snowflake mirrors the strategy from the warehousing side.",
    commoditises: "Models (all majors + open weights served).",
    locksYouInto: "Unity Catalog metadata and lakehouse gravity (mitigated by open formats).",
    leavesToOthers: "Productivity surfaces, frontier models.",
    watchOrAsk: "Ask: if the agents live where the data lives, who governs the agents that don't?",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    group: "Applications",
    grid: {
      data: { level: 2, note: "CRM, Data Cloud" },
      build: { level: 2, note: "Agentforce" },
      control: { level: 2, note: "Agent Fabric" },
      apps: { level: 3, note: "CRM + Fin" },
    },
    tryingToOwn:
      "The customer-workflow agent layer: Agentforce (~$800M ARR, +169%), the Agent Fabric cross-vendor control plane (via MuleSoft — Salesforce's product, a common misattribution), and outcome pricing via the $3.6B Fin acquisition.",
    commoditises: "Models (Anthropic partnership for regulated industries).",
    locksYouInto: "CRM data gravity + platform-DSL agents + now three simultaneous pricing models.",
    leavesToOthers: "Infrastructure, general-purpose platforms.",
    watchOrAsk: "Ask: show the resolution-rate math on our case mix, not the marketing benchmark.",
  },
];

export const vendorReads = [
  "Nobody is neutral. Every vendor commoditises the layers it doesn't own to funnel value to the layer it does. Map the pitch to the grid before evaluating features.",
  "The control plane is the land grab of 2026–27. Microsoft, AWS, Google, Salesforce, Databricks, Snowflake and IBM are all selling “govern all your agents, even theirs.” Choose deliberately — it's your future choke point.",
  "Multi-vendor is the equilibrium, not a transition. The winning enterprise posture: a primary platform chosen by data gravity, a second model lab always live, MCP-first tooling, and portable evals.",
];

export const marketAnchor =
  "One market fact to anchor everything (Menlo Ventures survey, Nov 2025, n≈500 — survey-based, disputed by OpenAI): enterprise LLM API spend share flipped in two years to Anthropic 40% / OpenAI 27% / Google 21%, with Anthropic at 54% of coding. OpenAI counters on seats (7M+ workplace seats) and price cuts. Treat the precision loosely; the direction — a genuinely multi-vendor model market — is the strategic fact.";
