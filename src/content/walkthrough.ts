import type { WalkthroughStep } from "./types";

// The worked example from 06_ARCHITECTURE.md §3 — one request, end to end.
// Scenario: a program manager asks the enterprise assistant:
// "Check whether Project Aurora is at risk of missing its March milestone;
//  if so, recommend an action and update the risk register."

export const walkthroughScenario = {
  ask: "Check whether Project Aurora is at risk of missing its March milestone; if so, recommend an action and update the risk register.",
  note: "Cross-industry by design — swap in a loan application, a compliance review, or a maintenance schedule and the architecture is identical.",
};

export const walkthroughSteps: WalkthroughStep[] = [
  {
    num: 1,
    title: "User → Application",
    layerIds: ["apps"],
    body:
      "The PM types into the company's assistant (an M365 Copilot agent, a Gemini Enterprise agent, or a custom app — archetype 2, 3 or 4). The application authenticates the user (SSO) and starts an auditable session.",
    concepts: [],
    modes: ["request"],
    governanceNote: "User authentication (SSO); the session is auditable from the first keystroke.",
  },
  {
    num: 2,
    title: "Application → Agent",
    layerIds: ["build"],
    body:
      "The request routes to a Project Risk agent — a governed piece of software with its own agent identity (an Entra Agent ID / AgentCore Identity), an owner, and a permission set scoped to project systems. The agent runs in a managed runtime (sandboxed, checkpointed — this is a long-running task, not one chat turn). Because the request ends in a write to a business system, the agent's definition includes a human-in-the-loop gate before that step.",
    concepts: ["agentic-ai", "agent-identity", "runtime-isolation", "long-running-task", "hitl"],
    modes: ["request", "governance"],
    governanceNote:
      "The agent has an identity, an owner and a scoped permission set — it is a governed entity, not an anonymous script.",
  },
  {
    num: 3,
    title: "Agent → Model (planning)",
    layerIds: ["build", "models"],
    body:
      "The agent's first model call — routed to a mid-tier model at moderate reasoning effort — produces a plan: (a) pull milestone status, (b) pull schedule and dependency data, (c) analyse slippage, (d) draft recommendation, (e) propose register update. The plan is logged as part of the trajectory.",
    concepts: ["planning", "reasoning-model", "routing"],
    modes: ["request"],
    governanceNote: "The plan is logged as part of the trajectory — auditable later.",
  },
  {
    num: 4,
    title: "Agent → Context (retrieval)",
    layerIds: ["data"],
    body:
      "The agent needs project knowledge. Context engineering machinery assembles the window: hybrid retrieval (keyword + vector) over the project document corpus pulls candidate status reports; a reranker keeps the genuinely relevant few; the agent also reads its memory of prior sessions on this project. Critically, retrieval is permissions-aware: it can only surface documents this user is entitled to see — the query runs under the user's delegated authority, not a super-user account.",
    concepts: ["rag", "reranking", "context-engineering", "memory", "grounding"],
    modes: ["request", "data", "governance"],
    governanceNote:
      "Permissions-aware retrieval: the query runs under the user's delegated authority, never a super-user account.",
  },
  {
    num: 5,
    title: "Agent → Tools via protocol",
    layerIds: ["build"],
    body:
      "Static documents aren't enough; the agent needs live data. It calls the scheduling system's MCP server: get_milestone_status(\"Aurora\"), get_critical_path(\"Aurora\"). Each tool call first passes the policy engine (Cedar/OPA-style, default-deny): is this agent, acting for this user, allowed to call this tool with these parameters? Allowed calls execute using a short-lived, scoped, user-bound token (the on-behalf-of pattern); results return as structured output.",
    concepts: ["mcp", "tool-calling", "policy-engine", "agent-identity", "structured-output"],
    modes: ["request", "data", "governance"],
    governanceNote:
      "Every tool call passes a default-deny policy engine; credentials are short-lived, scoped and user-bound.",
  },
  {
    num: 6,
    title: "Model (analysis)",
    layerIds: ["models", "serving"],
    body:
      "With curated context — retrieved documents, live tool results, the plan — the agent makes its main model call, now routed to a frontier-tier model at high reasoning effort (this is the step that deserves the expensive model). The model concludes: two critical-path tasks have slipped 9 days; vendor delivery is the driver; milestone at risk. It drafts a recommendation (re-sequence testing; escalate the vendor) grounded with citations to the retrieved sources. The API call benefits from prompt caching (the stable system context is ~90% cheaper on re-use).",
    concepts: ["frontier-model", "routing", "grounding", "tokens-in-out"],
    modes: ["request", "data"],
    governanceNote: "Answers are grounded with citations to retrieved sources — auditable, not asserted.",
  },
  {
    num: 7,
    title: "Agent → External system (the gated write)",
    layerIds: ["build", "apps"],
    body:
      "The agent now wants to update the risk register. This is the consequential action, so the HITL gate fires: the agent proposes a structured change (propose/commit separation — the PM sees the actual payload, not just the agent's summary, defending against trust exploitation). The PM approves. The write executes via the register's MCP tool — again through the policy engine, again logged. Had this involved paying a vendor, an AP2 mandate would prove the human authorised it.",
    concepts: ["hitl", "guardrails", "ap2", "policy-engine"],
    modes: ["request", "governance"],
    governanceNote:
      "Propose/commit separation on the consequential write; the approval UI shows the actual payload, not the agent's summary.",
  },
  {
    num: 8,
    title: "Result → User",
    layerIds: ["apps"],
    body:
      "The PM receives: risk assessment, cited evidence, recommendation, and confirmation of the register update. Elapsed: a couple of minutes; model spend: a few tens of cents across ~6 model calls and 4 tool calls.",
    concepts: [],
    modes: ["request"],
  },
  {
    num: 9,
    title: "Evaluation",
    layerIds: ["control"],
    body:
      "The full trajectory — plan, retrievals, tool calls, approval, outputs — was traced (OpenTelemetry GenAI format) into the observability platform. A sampled online eval (an LLM-as-judge, calibrated against human ratings) scores the trajectory: right tools? faithful to sources? Did it need the approval loop? Failures become new offline eval cases that gate the agent's next version — the eval-driven development loop.",
    concepts: ["observability", "trajectory-evals", "llm-judge", "evals", "drift"],
    modes: ["governance", "data"],
    governanceNote:
      "Production traces become tomorrow's eval cases — evaluation is a loop, not a gate.",
  },
  {
    num: 10,
    title: "Governance & audit",
    layerIds: ["control"],
    body:
      "The session's cost posts to the project's FinOps showback (the agent has a monthly budget cap — economics and runaway-agent safety in one control). The audit trail — which identity did what, under whose authority, seeing what data, approved by whom — satisfies internal audit and, for an Australian enterprise, feeds the records for APRA expectations (if regulated) and ADM transparency duties (from 10 Dec 2026). The agent appears in the enterprise agent registry, with an owner, a review date, and a kill switch.",
    concepts: ["ai-finops", "control-plane", "agent-identity"],
    modes: ["governance"],
    governanceNote:
      "Budget caps, full audit trail, agent registry entry with an owner, a review date and a kill switch.",
  },
];

export const walkthroughLessons = [
  "One user request = many model calls at different tiers. The economics live in routing (steps 3 vs 6), caching, and the HITL ratio — not in any single price-per-token.",
  "Security lives at the tool call, not the conversation. The policy engine and delegated identity (steps 5, 7) are the real controls; the model's good intentions are not a control.",
  "The agent never had super-user access. Every read and write happened under the user's delegated, scoped authority — the pattern that makes permissions-aware AI possible.",
  "Evaluation is a loop, not a gate. Production traces became tomorrow's test cases (step 9); that loop is what lets you swap models and versions with confidence.",
  "Every box was a purchasable product or a buildable component. Archetype choice decides which boxes you inherit and which you own.",
];

// ── Protocol wiring (06 §2, 03) ──────────────────────────────────────

export interface ProtocolInfo {
  id: string;
  name: string;
  full: string;
  role: string;
  governance: string;
  status: string;
  competes?: string;
}

export const protocols: ProtocolInfo[] = [
  {
    id: "mcp",
    name: "MCP",
    full: "Model Context Protocol",
    role: "Agent ↔ tools & data; Tasks for long-running operations. The most-shipped standard (~100M monthly SDK downloads, 10k+ servers).",
    governance: "Linux Foundation / Agentic AI Foundation (since Dec 2025)",
    status: "The won standard — build MCP-first.",
  },
  {
    id: "a2a",
    name: "A2A",
    full: "Agent2Agent",
    role: "Agent discovery & coordination across vendors, with signed Agent Cards.",
    governance: "Linux Foundation / Agentic AI Foundation (v1.0 in 2026)",
    status: "Real but thinner adoption than MCP.",
  },
  {
    id: "acp",
    name: "ACP",
    full: "Agentic Commerce Protocol",
    role: "OpenAI + Stripe checkout protocol for agent purchases; live in ChatGPT.",
    governance: "OpenAI + Stripe",
    status: "Competes with UCP — merchants implement both.",
    competes: "ucp",
  },
  {
    id: "ucp",
    name: "UCP",
    full: "Universal Commerce Protocol",
    role: "Google + Shopify full-journey commerce protocol; Google surfaces + Microsoft Copilot checkout.",
    governance: "Google + Shopify (Jan 2026)",
    status: "Competes with ACP — merchants implement both.",
    competes: "acp",
  },
  {
    id: "ap2",
    name: "AP2",
    full: "Agent Payments Protocol",
    role: "Payments-authorization layer: cryptographically signed mandates proving user intent — beneath both commerce protocols.",
    governance: "FIDO Alliance (donated Apr 2026)",
    status: "The usually-omitted piece; arguably the most durable part of the commerce stack.",
  },
  {
    id: "webmcp",
    name: "WebMCP",
    full: "WebMCP (draft)",
    role: "Websites expose MCP-style tools to in-browser agents.",
    governance: "W3C Community Group draft; Chrome origin trial",
    status: "Not a standard yet — watch, don't build strategy on it.",
  },
];

export const protocolFacts = [
  "“ACP” is ambiguous — IBM's Agent Communication Protocol merged into A2A in Aug 2025; the surviving ACP is OpenAI/Stripe's commerce protocol.",
  "ACP and UCP are not complementary layers — they are the competing pair (merchants implement both).",
  "AP2 is the usually-omitted piece: the FIDO-governed payments-authorization layer beneath both.",
];

export const blurBoundaries = [
  "Models + serving fuse for API buyers — you buy them as one thing unless you self-host.",
  "Tools are both “context” and “action” — MCP sits on the Layer 4/5 boundary deliberately; just-in-time retrieval is a tool call.",
  "Agent platforms straddle layers 4–7 — AgentCore, Foundry, Gemini Enterprise Agent Platform and Agent Bricks each bundle context, orchestration, runtime and chunks of the control plane. The layers remain your decision map even when the invoice is one line.",
  "Applications become tools for other applications — anything exposing an MCP server is simultaneously a Layer-7 product and a Layer-5 component.",
];
