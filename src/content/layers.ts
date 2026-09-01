import type { Layer, CrossCuttingConcern } from "./types";

// The seven-layer mental model. Derived from 02_ENTERPRISE_AI_MENTAL_MODEL.md
// (layer detail) and 00_ONE_PAGE_CHEAT_SHEET.md (the compressed map).

export const layers: Layer[] = [
  {
    id: "apps",
    num: 7,
    name: "Applications",
    short: "copilots · enterprise agents · vertical AI · service-as-software",
    role: "Delivers outcomes — copilots (assist), enterprise agents (delegated work), vertical AI (domain depth), AI-native products, and service-as-software (selling completed work).",
    why: "This is where AI meets a business problem. Everything below exists so that something at this layer can change how work gets done.",
    state:
      "Suite incumbents embed agents (M365 Copilot, Agentforce, ServiceNow, SAP Joule, Gemini Enterprise); vertical AI leaders reached real scale (Harvey ~$200M ARR in legal, Sierra ~$200M in customer service, Abridge in clinical documentation). The biggest competitive fact: the model labs' own surfaces (ChatGPT Enterprise, Claude, Gemini) are simultaneously the most-adopted enterprise AI applications. Thin GPT-wrappers are a dead category. Applications increasingly expose themselves as tools/agents to other applications via MCP/A2A.",
    decisions: [
      "Buy vertical vs build on platform",
      "Suite-native vs best-of-breed",
      "How app-layer agents get governed by your (separately procured) control plane",
      "Pricing-model exposure: seats vs consumption vs outcomes",
    ],
    standardised: "Generic chat-with-your-documents.",
    lockIn:
      "Workflow embedment, accumulated domain evals and guardrails, data feedback loops, change-management investment.",
    misconceptions: [
      "“Copilot” and “agent” are often the same product relabelled — vendor language shifted from assist to act without the autonomy necessarily changing.",
      "Applications are no longer only endpoints: anything exposing an MCP server is simultaneously a Layer-7 product and a Layer-5 component.",
    ],
    concepts: ["vertical-ai", "service-as-software", "ai-native", "agentic-commerce", "per-outcome-pricing"],
    remember:
      "You are differentiated here (your workflows) and at Layer 4 (your data) — almost never at layers 1–3. Spend accordingly.",
    color: "var(--l7)",
    sources: ["02", "00"],
  },
  {
    id: "control",
    num: 6,
    name: "Control Plane",
    short: "identity · policy · observability · evals · security · FinOps",
    role: "Identity, permissions, policy, observability, evaluation, security, cost governance and lifecycle management for everything above — increasingly with agents as first-class governed entities.",
    why: "An agent that acts on real systems is an employee from a risk perspective: it needs an identity, scoped permissions, a budget, supervision, an audit trail, and offboarding. Without this layer, agents don't pass security review and pilots die.",
    state:
      "Real in 2026 — as a category-in-formation, not one product. Microsoft Agent 365 (GA May 2026, ~$15/user/mo), Entra Agent ID GA, Okta agent identity, AWS AgentCore Identity + Policy (Cedar-based, default-deny), Salesforce/MuleSoft Agent Fabric, Databricks Unity AI Gateway, Snowflake Cortex AI Gateway, plus a wave of AI/agent gateways acting as policy enforcement points. Evaluation and observability merged into one loop (production traces become eval datasets). FinOps went mainstream: 98% of FinOps teams now manage AI spend. Enterprises assemble the control plane from parts; consolidation is coming.",
    decisions: [
      "Where the policy enforcement point lives (gateway vs platform-native vs both)",
      "One control plane per cloud vs a neutral overlay",
      "The agent identity provider",
      "Who owns evals; incident response for agent actions",
    ],
    standardised:
      "Basic logging, routing, rate limiting; OpenTelemetry GenAI conventions are the de facto trace format (still officially unstable).",
    lockIn:
      "The enforcement point itself; identity ecosystems extending their human-identity duopoly to agents.",
    misconceptions: [
      "It is a plane, not a stratum: it instruments every layer. Drawing it as a box between orchestration and applications understates it.",
      "No one sells it complete — every “govern all your agents” pitch should be tested against what it can actually inventory, permission and kill today.",
    ],
    concepts: [
      "evals", "llm-judge", "trajectory-evals", "agentops", "drift", "observability",
      "agent-identity", "policy-engine", "control-plane", "ai-finops", "red-teaming", "guardian-agents",
    ],
    remember:
      "Whoever owns your policy enforcement point owns your stack's choke point — treat that choice as seriously as you once treated your identity provider.",
    color: "var(--l6)",
    sources: ["02", "00", "08"],
  },
  {
    id: "build",
    num: 5,
    name: "Build & Orchestration",
    short: "prompts · tools · agents · workflows · frameworks · MCP/A2A",
    role: "Where applications get constructed — prompts, tools, agent loops, workflows, multi-agent coordination, SDKs, and the interop protocols.",
    why: "Raw model APIs don't ship products. This layer packages reasoning + tools + state + control flow into reliable software.",
    state:
      "Two distinct markets: managed agent platforms (Copilot Studio, Bedrock AgentCore, Agentforce, watsonx Orchestrate — governed, procurement-friendly) and open SDKs (LangGraph, Microsoft Agent Framework 1.0, OpenAI Agents SDK, Google ADK, Claude Agent SDK, CrewAI, PydanticAI). The settled engineering consensus: workflows (predefined paths) beat agents (dynamic control flow) wherever the path is predictable. Protocols are the standardisation story: MCP (agent↔tools, ~100M monthly SDK downloads) and A2A (agent↔agent) both under the Linux Foundation's Agentic AI Foundation. Caveat: they standardise plumbing, not policy.",
    decisions: [
      "Platform vs SDK (inherited governance vs flexibility)",
      "MCP-first tool surface",
      "How much determinism to impose (workflow vs agent)",
      "Framework churn risk — betting on protocols is safer than betting on frameworks",
    ],
    standardised: "Agent loops, tool-calling formats (via MCP).",
    lockIn:
      "Platform runtimes (Copilot Studio / Agentforce flows are not portable); evals and behaviour tuned to one model family.",
    misconceptions: [
      "“Agent” is often a workflow wearing a costume — most production “agent” value is workflows on predictable paths.",
      "Frameworks churn; protocols persist. The safest interoperability bet is MCP/A2A, not any SDK.",
    ],
    concepts: [
      "prompt-engineering", "context-engineering", "tool-use", "structured-output",
      "agentic-ai", "workflow-vs-agent", "planning", "memory", "hitl", "guardrails",
      "multi-agent", "orchestrator-subagent", "long-running-task", "sandbox",
      "mcp", "a2a", "intent-engineering",
    ],
    remember:
      "Use workflows wherever the path is predictable; default to a single well-tooled agent; bet on protocols, not frameworks.",
    color: "var(--l5)",
    sources: ["02", "00"],
  },
  {
    id: "data",
    num: 4,
    name: "Data & Context",
    short: "lakehouse · retrieval + rerank · knowledge graphs · context engineering",
    role: "Turns enterprise data into model-usable context — warehouses/lakehouses, retrieval (vector + keyword + reranking), RAG pipelines, knowledge graphs, agent memory, and the discipline now called context engineering.",
    why: "Models are stateless and generic. Differentiated value comes from your data reaching the model accurately, freshly, and with permissions enforced. This layer is where most production failures originate.",
    state:
      "The 2024 mental model (“RAG = vector database + embeddings”) is dead; retrieval is not. Long context windows (1M+ tokens) killed lazy retrieval, but retrieval remains 1–2 orders of magnitude cheaper per query, enforces access control, and handles corpora no window can hold. The 2026 production pattern: hybrid search + reranking narrows candidates → the long context window reasons over them → increasingly, an agent decides what to retrieve just-in-time via tools. Standalone vector databases are losing share to data platforms. Knowledge graphs earn their cost only for relationship-heavy, multi-hop questions. Permission-aware retrieval remains hard and partially unsolved.",
    decisions: [
      "Lakehouse-native retrieval vs separate infrastructure",
      "Freshness architecture",
      "The permissions model — the make-or-break",
      "Buy (Glean-style) vs build; where agent memory lives",
    ],
    standardised: "Embeddings, vanilla vector search (now a database feature).",
    lockIn:
      "Data gravity — the strongest lock-in in the entire stack — plus catalogue/governance metadata and platform-specific agent-to-data bindings.",
    misconceptions: [
      "Long context windows did not kill retrieval: retrieval is cheaper, permission-enforcing, and handles corpora no window holds.",
      "Permissions are not a detail: document ACLs flowing correctly into agent context is a major driver of Layer-6 identity work, and the #1 demo-to-production gap.",
    ],
    concepts: [
      "rag", "reranking", "knowledge-graph", "grounding", "context-window",
      "data-gravity", "context-engineering",
    ],
    remember:
      "Most production failures originate here — data quality, permissions, stale indexes. Data gravity is the strongest lock-in in the stack.",
    color: "var(--l4)",
    sources: ["02", "00"],
  },
  {
    id: "serving",
    num: 3,
    name: "Access & Serving",
    short: "APIs · Bedrock / MS Foundry / Gemini Enterprise Agent Platform · self-host",
    role: "Delivers models to applications — first-party APIs, cloud model platforms, specialist inference providers, or self-hosted serving.",
    why: "It separates model choice from operational concerns — identity, networking, quotas, billing, compliance boundaries, procurement.",
    state:
      "The three cloud platforms converged on the same shape (model catalogue + inference + safety + evals + agent tooling): Amazon Bedrock, Microsoft Foundry, Gemini Enterprise Agent Platform. Claude is the only frontier family on all three clouds; GPT is Azure/OpenAI-first; Gemini is Google-only. Specialist inference providers compete on price and speed — the same open model varies ~6× in price across providers. Discounts are structural: batch = 50% off; cached input ≈ 90% off; stackable.",
    decisions: [
      "Direct API vs cloud platform vs gateway-mediated multi-provider",
      "Whether AI spend draws down existing cloud commitments",
      "The self-host threshold (usually data control or unit cost at very high volume — rarely capability)",
    ],
    standardised: "The inference API shape itself (OpenAI-compatible is the lingua franca).",
    lockIn:
      "Cloud commit contracts, platform-native agent runtimes and safety tooling annexed onto serving.",
    misconceptions: [
      "Layers 2 and 3 fuse for most buyers: if you consume models via API, models and serving arrive as one product. The separation is only real if you self-host.",
    ],
    concepts: ["byom", "sovereign-ai", "air-gapped"],
    remember:
      "Batch and cache discounts are structural (50% and ~90%, stackable) — a well-engineered workload runs 5–20× below naive flagship list price.",
    color: "var(--l3)",
    sources: ["02", "00"],
  },
  {
    id: "models",
    num: 2,
    name: "Models",
    short: "frontier · open-weight (Chinese-led) · SLMs · reasoning-native, MoE",
    role: "Provides the trained intelligence — the thing that reasons, writes and decides.",
    why: "Frontier capability is concentrated in a handful of labs because training requires Layer-1 scale; the open-weight ecosystem trades peak capability for control, cost and sovereignty.",
    state:
      "Verified flagships: OpenAI GPT-5.6 (Sol/Terra/Luna tiers), Anthropic Claude Fable 5 / Opus 5, Google Gemini 3.x, xAI Grok 4.6. The open-weight frontier is now Chinese-led — DeepSeek V4 (MIT licence), Qwen 3.5/3.6 (Apache 2.0), Kimi K3 — ~3–9 months behind the closed frontier. Three structural facts: (a) all flagships are reasoning-native with a tunable effort dial, so cost per query is variable; (b) nearly everything is MoE — the architecture behind capability getting cheaper; (c) small models now handle a large share of enterprise volume at 10–30× lower cost.",
    decisions: [
      "Model portfolio: which 2–3 labs + an open option",
      "Routing policy across price tiers — the biggest cost lever in the stack",
      "Single-lab dependence risk",
      "Whether Chinese-origin open weights pass your procurement bar",
    ],
    standardised: "Mid-tier capability (fast followers replicate in months).",
    lockIn:
      "Low at the API level; real via fine-tunes, model-tuned prompts/evals, and provider-specific features.",
    misconceptions: [
      "Model choice is no longer the strategic decision — portfolio and routing are. Assume any model you standardise on is obsolete in 6–9 months.",
      "“Open-source” and “open-weight” are not the same thing — read the licence, not the label.",
    ],
    concepts: [
      "frontier-model", "open-weight", "open-source", "slm", "moe", "reasoning-model",
      "multimodal", "distillation", "quantisation", "tokens", "tokens-in-out",
      "tokens-per-dollar", "fine-tuning", "sft", "lora", "rft", "continued-pretraining",
    ],
    remember:
      "The model is the least sticky part of your stack. Build for swappability, not for a model.",
    color: "var(--l2)",
    sources: ["02", "00"],
  },
  {
    id: "compute",
    num: 1,
    name: "Compute & Infrastructure",
    short: "GPUs / custom silicon · hyperscalers · neoclouds · sovereign capacity",
    role: "Supplies the raw processing (training and inference), memory, networking, power and data-centre capacity everything else runs on.",
    why: "Model capability and inference economics are physically bounded by silicon and power. Inference is now roughly two-thirds of AI compute — the layer's centre of gravity moved from training clusters to inference fleets.",
    state:
      "A historic capex supercycle — the big four hyperscalers plan ~$600–700B+ capex in 2026, up ~60%+ on 2025. NVIDIA remains the default; AMD is a credible rack-scale second source; hyperscaler custom chips (Google TPU v7, AWS Trainium3, Microsoft Maia 200) are real at scale — mostly for inference, which is what lets clouds keep cutting token prices. Neoclouds (CoreWeave, Nebius, Lambda, Crusoe) are a ~$20B price/availability release valve. Australia's “sovereign” capacity is mostly onshore regions of US clouds.",
    decisions: [
      "Rent vs reserve vs own",
      "Hyperscaler vs neocloud vs sovereign",
      "How long to commit in a falling-price market",
    ],
    standardised: "Raw GPU-hours at the low end.",
    lockIn: "CUDA ecosystem, multi-year capacity contracts, cloud commit agreements.",
    misconceptions: [
      "Most enterprises never touch this layer directly — but its economics flow through every price you pay.",
    ],
    concepts: [],
    remember:
      "You buy this layer's economics through every API price. You should almost never buy the layer itself.",
    color: "var(--l1)",
    sources: ["02", "00"],
  },
];

// Cross-cutting concerns — outside the stack, shaping all of it (doc 02).
export const crossCutting: CrossCuttingConcern[] = [
  {
    id: "evaluation",
    name: "Evaluation",
    why: "Spans build-time (regression gates) and runtime (monitoring); connects layers 2, 5, 6, 7.",
    remember: "Enterprises with eval discipline are the ones that can swap models and ship agents.",
    sources: ["02"],
  },
  {
    id: "security",
    name: "Security",
    why: "Prompt injection enters at layer 7, exploits layer 5, exfiltrates via layer 4.",
    remember: "Unsolved in general; containment (least privilege, sandboxing, human gates) is the defence.",
    sources: ["02", "08"],
  },
  {
    id: "identity",
    name: "Identity",
    why: "Users at layer 7, agents at layer 5, services everywhere.",
    remember: "An agent without governed identity cannot be permissioned, audited or revoked.",
    sources: ["02"],
  },
  {
    id: "finops",
    name: "FinOps",
    why: "Costs accrue at layer 3, are caused at layers 5–7.",
    remember: "Manage cost per task, not per token; budget caps double as safety controls.",
    sources: ["02", "09"],
  },
  {
    id: "regulation",
    name: "Regulation",
    why: "Regulates uses (layer 7), models (layer 2), and transparency (everywhere).",
    remember: "Sector regulators bite sooner than horizontal AI law for most enterprises.",
    sources: ["02", "08"],
  },
  {
    id: "change",
    name: "Change management",
    why: "Decides whether any of the above creates value.",
    remember: "The evidence says this, not model capability, is the gating factor.",
    sources: ["02", "09", "10"],
  },
];

export const layerById = new Map(layers.map((l) => [l.id, l]));
export const stackOrder = [...layers].sort((a, b) => b.num - a.num);
