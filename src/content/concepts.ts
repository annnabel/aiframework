import type { Concept } from "./types";

// The decision-oriented glossary, transcribed from 03_GLOSSARY.md and
// enriched with relationships drawn from documents 02, 04, 05, 06 and 08.
// Rule preserved from the source: every term gets what it is + the decision
// it affects. ⚑ jargon flags are preserved.

export const concepts: Concept[] = [
  // ── Models ─────────────────────────────────────────────────────────
  {
    id: "frontier-model",
    term: "Frontier model",
    category: "models",
    layer: "models",
    difficulty: "beginner",
    whatItIs:
      "One of the handful of most capable models from the major labs (GPT-5.6 Sol, Claude Fable 5/Opus 5, Gemini 3.1 Pro).",
    decision:
      "Whether a task justifies frontier pricing (5–50× the cheap tier) or routes to a smaller model.",
    takeaway: "Reserve the frontier tier for the steps that genuinely need hard reasoning; route everything else down.",
    related: ["slm", "reasoning-model", "routing"],
    unlocks: ["routing", "distillation"],
    confusedWith: ["open-weight"],
    sources: ["03", "02"],
  },
  {
    id: "open-weight",
    term: "Open-weight model",
    category: "models",
    layer: "models",
    difficulty: "beginner",
    whatItIs:
      "A model whose trained weights you can download and run (DeepSeek V4, Qwen 3.x) — licence terms vary.",
    decision:
      "Whether you keep a self-hosting escape hatch for sovereignty, cost or negotiating leverage.",
    takeaway: "The credible exit option that disciplines every other vendor's pricing — worth maintaining even if never exercised.",
    confusedWith: ["open-source"],
    related: ["sovereign-ai", "frontier-model"],
    unlocks: ["sovereign-ai"],
    sources: ["03", "07"],
  },
  {
    id: "open-source",
    term: "Open-source model",
    category: "models",
    layer: "models",
    difficulty: "beginner",
    whatItIs:
      "Weights plus permissive licence (and rarely, training data/code); often conflated with open-weight.",
    decision:
      "Legal exposure of “open” models — read the licence, not the label (Llama and Kimi restrict; MIT/Apache don't).",
    confusedWith: ["open-weight"],
    sources: ["03"],
  },
  {
    id: "slm",
    term: "SLM (small language model)",
    category: "models",
    layer: "models",
    difficulty: "beginner",
    whatItIs:
      "A 1–15B-parameter model, 10–30× cheaper and faster, good for narrow tasks (classification, extraction, routing).",
    decision:
      "The routing decision that dominates AI unit economics: which work doesn't need a frontier model.",
    related: ["routing", "distillation", "frontier-model"],
    prerequisites: ["frontier-model"],
    sources: ["03", "02"],
  },
  {
    id: "moe",
    term: "MoE (mixture of experts)",
    category: "models",
    layer: "models",
    difficulty: "intermediate",
    whatItIs:
      "Architecture where only a small fraction of a model's parameters activate per token (e.g. 49B of 1.6T).",
    decision:
      "None directly — but it explains why capability keeps getting cheaper, so you can plan on prices falling.",
    sources: ["03", "02"],
  },
  {
    id: "reasoning-model",
    term: "Reasoning model",
    category: "models",
    layer: "models",
    difficulty: "beginner",
    whatItIs:
      "A model that spends variable “thinking” tokens before answering; in 2026 all flagships do this with a tunable effort dial.",
    decision:
      "Cost/latency budgeting: quality now scales with spend per query, so you set effort policy per use case.",
    takeaway: "Bills can rise while unit prices fall — reasoning models spend more tokens per task. Budget per task, never per token.",
    related: ["tokens", "tokens-per-dollar"],
    unlocks: ["ai-finops"],
    sources: ["03", "09"],
  },
  {
    id: "context-window",
    term: "Context window",
    category: "models",
    layer: "data",
    difficulty: "beginner",
    whatItIs:
      "How much text the model can consider at once (1M+ tokens on 2026 flagships ≈ several thousand pages).",
    decision:
      "Whether you need retrieval to narrow inputs (usually yes — for cost, permissions and accuracy) vs stuffing everything in.",
    related: ["rag", "context-engineering"],
    unlocks: ["rag"],
    sources: ["03", "02"],
  },
  {
    id: "multimodal",
    term: "Multimodal",
    category: "models",
    layer: "models",
    difficulty: "beginner",
    whatItIs:
      "Accepts images/audio/documents as input, not just text; table stakes on 2026 flagships.",
    decision:
      "Which use cases are in scope (document processing, visual inspection) without extra tooling.",
    sources: ["03"],
  },
  {
    id: "distillation",
    term: "Distillation",
    category: "models",
    layer: "models",
    difficulty: "intermediate",
    whatItIs: "Training a small model to imitate a big one's outputs on your task.",
    decision:
      "The highest-ROI cost play: prove the workflow on a frontier model, then distil for 10–30× cheaper scale-out.",
    prerequisites: ["frontier-model", "slm", "evals"],
    related: ["fine-tuning", "routing"],
    sources: ["03", "04"],
  },
  {
    id: "quantisation",
    term: "Quantisation",
    category: "models",
    layer: "models",
    difficulty: "advanced",
    whatItIs: "Compressing model weights to lower numeric precision to run cheaper/faster.",
    decision: "Only surfaces in self-hosting cost estimates — delegate.",
    jargon: true,
    sources: ["03"],
  },
  {
    id: "tokens",
    term: "Tokens",
    category: "models",
    layer: "models",
    difficulty: "beginner",
    whatItIs: "The unit models read and write (~¾ of an English word); the billing unit of AI.",
    decision: "Everything in AI FinOps — you cannot read an AI invoice or contract without this.",
    unlocks: ["tokens-in-out", "tokens-per-dollar", "ai-finops"],
    sources: ["03"],
  },
  {
    id: "tokens-in-out",
    term: "Tokens in / tokens out",
    category: "models",
    layer: "models",
    difficulty: "beginner",
    whatItIs:
      "Input (your prompt + context) vs output (the model's answer); output costs ~5–6× more per token.",
    decision: "Prompt/context design economics: verbose context is cheap-ish, verbose generation is not.",
    prerequisites: ["tokens"],
    sources: ["03", "09"],
  },
  {
    id: "tokens-per-dollar",
    term: "Tokens-per-dollar",
    category: "models",
    layer: "models",
    difficulty: "intermediate",
    whatItIs:
      "Colloquial capability-cost metric; the rigorous version is cost per task at target quality.",
    decision:
      "Vendor comparison — insist on cost-per-task, since reasoning models inflate tokens per task.",
    prerequisites: ["tokens", "reasoning-model"],
    confusedWith: ["tokens"],
    sources: ["03", "09"],
  },
  {
    id: "routing",
    term: "Routing",
    category: "operations",
    layer: "serving",
    difficulty: "intermediate",
    whatItIs:
      "Sending each task to the cheapest adequate model tier — most tokens to cheap tiers, frontier reserved for hard reasoning.",
    decision:
      "The biggest cost lever in the stack: routing plus caching plus batching = 5–20× savings vs naive flagship pricing.",
    prerequisites: ["frontier-model", "slm"],
    related: ["distillation", "ai-finops"],
    sources: ["02", "09"],
  },

  // ── Build patterns ─────────────────────────────────────────────────
  {
    id: "prompt-engineering",
    term: "Prompt engineering",
    category: "build-patterns",
    layer: "build",
    difficulty: "beginner",
    whatItIs:
      "Crafting the instructions given to a model; in 2026, a subset of context engineering.",
    decision: "Cheapest first lever — always exhaust prompting before paying for tuning or infrastructure.",
    statusNote: "Subsumed into context engineering; survives as a sub-skill.",
    related: ["context-engineering"],
    unlocks: ["context-engineering"],
    sources: ["03", "14"],
  },
  {
    id: "rag",
    term: "RAG (retrieval-augmented generation)",
    category: "build-patterns",
    layer: "data",
    difficulty: "beginner",
    whatItIs:
      "Fetching relevant enterprise content at query time and giving it to the model as context.",
    decision:
      "How your proprietary knowledge reaches AI — fresh, citable, permission-controlled — vs retraining anything.",
    example:
      "An assistant answering questions over internal documents that change frequently: retrieval keeps answers fresh, citable and permissioned — no retraining.",
    takeaway: "Knowledge → retrieval. Fine-tuning is a poor way to inject facts: limited capacity, no citations, instant staleness.",
    prerequisites: ["context-window", "tokens"],
    unlocks: ["reranking", "knowledge-graph", "grounding", "context-engineering"],
    related: ["fine-tuning", "context-engineering", "grounding"],
    confusedWith: ["fine-tuning"],
    sources: ["03", "04", "02"],
  },
  {
    id: "reranking",
    term: "Reranking",
    category: "build-patterns",
    layer: "data",
    difficulty: "intermediate",
    whatItIs:
      "A second-pass model that reorders retrieved candidates so only the truly relevant enter context; production table stakes.",
    decision: "A cheap accuracy lever in any retrieval buy/build — ask vendors if and how they rerank.",
    prerequisites: ["rag"],
    sources: ["03", "02"],
  },
  {
    id: "knowledge-graph",
    term: "Knowledge graph / GraphRAG",
    category: "build-patterns",
    layer: "data",
    difficulty: "advanced",
    whatItIs:
      "Retrieval over explicit entity-relationship structures rather than just text similarity.",
    decision:
      "Worth its (high) build cost only for multi-hop, relationship-heavy questions and explainability mandates.",
    prerequisites: ["rag"],
    sources: ["03", "02"],
  },
  {
    id: "fine-tuning",
    term: "Fine-tuning",
    category: "build-patterns",
    layer: "models",
    difficulty: "intermediate",
    whatItIs: "Adjusting a model's weights with your examples to change its behaviour.",
    decision:
      "A last resort after prompting/RAG fail — justified for format reliability, tone, or cost compression, not knowledge.",
    takeaway:
      "Behaviour → context engineering first, fine-tune (LoRA) last. Its biggest enterprise use is cost compression via distillation.",
    prerequisites: ["context-engineering", "evals"],
    related: ["lora", "sft", "rft", "distillation"],
    confusedWith: ["rag"],
    sources: ["03", "04"],
  },
  {
    id: "sft",
    term: "SFT (supervised fine-tuning)",
    category: "build-patterns",
    layer: "models",
    difficulty: "advanced",
    whatItIs: "Fine-tuning on input→ideal-output example pairs.",
    decision: "Mostly engineering detail — the decision is “fine-tune or not”, not which flavour.",
    jargon: true,
    prerequisites: ["fine-tuning"],
    sources: ["03"],
  },
  {
    id: "lora",
    term: "LoRA",
    category: "build-patterns",
    layer: "models",
    difficulty: "advanced",
    whatItIs: "The dominant cheap fine-tuning method (small adapter layers, ~0.1–1% of weights).",
    decision:
      "Makes fine-tuning affordable and reversible — lowers the bar for the fine-tune decision on open models.",
    prerequisites: ["fine-tuning"],
    sources: ["03"],
  },
  {
    id: "rft",
    term: "RFT / reinforcement fine-tuning",
    category: "build-patterns",
    layer: "models",
    difficulty: "advanced",
    whatItIs:
      "Tuning by rewarding verifiably correct outcomes (code passes tests) rather than imitating examples.",
    decision: "The 2026 growth area for agent reliability — only viable if you already have strong evals.",
    prerequisites: ["fine-tuning", "evals"],
    sources: ["03", "04"],
  },
  {
    id: "continued-pretraining",
    term: "Continued pre-training",
    category: "build-patterns",
    layer: "models",
    difficulty: "advanced",
    whatItIs: "Further large-scale training on domain corpora; expensive, rare outside big regulated players.",
    decision: "Almost never the answer — flag any vendor proposing it before cheaper levers are exhausted.",
    prerequisites: ["fine-tuning"],
    sources: ["03"],
  },
  {
    id: "grounding",
    term: "Grounding",
    category: "build-patterns",
    layer: "data",
    difficulty: "intermediate",
    whatItIs:
      "Tying generation to authoritative sources (retrieval, search, citations) to control hallucination.",
    decision: "Whether outputs are auditable — regulated deployments should require citation-grounded answers.",
    prerequisites: ["rag"],
    sources: ["03"],
  },
  {
    id: "tool-use",
    term: "Tool use / function calling",
    category: "build-patterns",
    layer: "build",
    difficulty: "beginner",
    whatItIs:
      "The model invoking software functions (search, database, API) instead of just emitting text.",
    decision: "The gateway decision to agents: what systems AI may act on, under what permissions.",
    unlocks: ["agentic-ai", "mcp", "policy-engine"],
    sources: ["03"],
  },
  {
    id: "structured-output",
    term: "Structured output",
    category: "build-patterns",
    layer: "build",
    difficulty: "beginner",
    whatItIs: "Forcing model output into a strict schema (JSON); natively reliable on 2026 APIs.",
    decision: "Removes a whole class of integration fragility — expect it, don't pay extra for it.",
    sources: ["03"],
  },
  {
    id: "context-engineering",
    term: "Context engineering",
    category: "build-patterns",
    layer: "data",
    difficulty: "intermediate",
    whatItIs:
      "The 2026 discipline: curating everything in the model's window — instructions, retrieval, memory, tool results, compaction.",
    decision:
      "Where most “behaviour” work happens now — staffing and skill decisions formerly labelled prompt engineering.",
    takeaway: "In 2026, context engineering carries most of the behaviour load — fine-tuning is the last resort even for behaviour.",
    prerequisites: ["prompt-engineering", "context-window"],
    unlocks: ["fine-tuning", "agentic-ai"],
    related: ["rag", "memory"],
    sources: ["03", "04"],
  },
  {
    id: "intent-engineering",
    term: "Intent / specification engineering",
    category: "build-patterns",
    layer: "build",
    difficulty: "advanced",
    whatItIs:
      "Emerging term for writing precise task specs that agents execute against (specs-as-source).",
    decision: "Early; affects how you brief agents on long tasks — watch, don't reorganise around it yet.",
    prerequisites: ["context-engineering"],
    sources: ["03"],
  },

  // ── Agents ─────────────────────────────────────────────────────────
  {
    id: "agentic-ai",
    term: "Agentic AI",
    category: "agents",
    layer: "build",
    difficulty: "beginner",
    whatItIs:
      "AI that runs in a loop — plans, calls tools, observes results, iterates toward a goal — rather than answering once.",
    decision:
      "The autonomy decision: what the system may do (not just say), and the governance that requires.",
    prerequisites: ["tool-use"],
    unlocks: ["workflow-vs-agent", "hitl", "agent-identity", "trajectory-evals"],
    related: ["workflow-vs-agent", "multi-agent"],
    sources: ["03"],
  },
  {
    id: "workflow-vs-agent",
    term: "Workflow vs agent",
    category: "agents",
    layer: "build",
    difficulty: "beginner",
    whatItIs:
      "Workflow = model steps orchestrated on predefined paths; agent = model directs its own control flow.",
    decision:
      "The single best reliability decision: use workflows wherever the path is predictable — most production “agent” value is workflows.",
    example:
      "“Why does this need to be an agent?” If the answer describes a predictable path, it's a workflow wearing a costume — build the workflow: cheaper, testable, reliable.",
    prerequisites: ["agentic-ai"],
    confusedWith: ["agentic-ai"],
    sources: ["03", "10"],
  },
  {
    id: "tool-calling",
    term: "Tool calling (as control point)",
    category: "agents",
    layer: "build",
    difficulty: "intermediate",
    whatItIs:
      "The mechanism by which agents act; each call is now the unit of policy enforcement.",
    decision:
      "Where your security team should put controls — per-tool-call policy, not per-conversation.",
    prerequisites: ["tool-use"],
    related: ["policy-engine", "mcp"],
    sources: ["03", "06"],
  },
  {
    id: "planning",
    term: "Planning",
    category: "agents",
    layer: "build",
    difficulty: "intermediate",
    whatItIs: "The agent producing an explicit plan before executing; beats improvisation on long tasks.",
    decision: "Mostly engineering detail — ask for it in evaluation criteria, don't design it.",
    jargon: true,
    prerequisites: ["agentic-ai"],
    sources: ["03"],
  },
  {
    id: "memory",
    term: "Memory",
    category: "agents",
    layer: "data",
    difficulty: "intermediate",
    whatItIs:
      "What persists across agent sessions: user preferences, notes-to-self, organisational history.",
    decision:
      "Data governance: memory is a new store of business data that needs retention/access policy.",
    prerequisites: ["agentic-ai"],
    sources: ["03"],
  },
  {
    id: "hitl",
    term: "Human-in-the-loop (HITL)",
    category: "agents",
    layer: "build",
    difficulty: "beginner",
    whatItIs:
      "Human approval gates on consequential agent actions; propose/commit separation.",
    decision:
      "The risk-tiering decision: which actions auto-execute vs require sign-off — your main autonomy dial.",
    takeaway:
      "The HITL ratio dominates task cost, and approval UIs must show the actual payload — agents can manipulate summaries.",
    prerequisites: ["agentic-ai"],
    related: ["hitl-ratio", "guardrails"],
    sources: ["03", "08", "09"],
  },
  {
    id: "guardrails",
    term: "Guardrails",
    category: "agents",
    layer: "control",
    difficulty: "intermediate",
    whatItIs:
      "Input/output filters, allowlists, budgets and classifiers wrapped around models/agents.",
    decision:
      "One defence layer, never the defence — a vendor selling guardrails as the security answer is underselling the problem.",
    related: ["policy-engine", "red-teaming"],
    sources: ["03"],
  },
  {
    id: "multi-agent",
    term: "Multi-agent system",
    category: "agents",
    layer: "build",
    difficulty: "advanced",
    whatItIs:
      "Multiple agents dividing work; 2026 consensus: orchestrator + ephemeral subagents for parallel read-heavy work; peer-to-peer designs lost.",
    decision:
      "Whether extra cost (~15× tokens) and complexity buys anything — usually only for decomposable research-style tasks.",
    prerequisites: ["agentic-ai"],
    related: ["orchestrator-subagent", "a2a"],
    sources: ["03"],
  },
  {
    id: "orchestrator-subagent",
    term: "Orchestrator / sub-agent",
    category: "agents",
    layer: "build",
    difficulty: "advanced",
    whatItIs:
      "The coordinating agent holding full context; subagents work in isolation and return summaries.",
    decision:
      "Team-design analogy for agent architecture reviews — who holds context is who owns quality.",
    prerequisites: ["multi-agent"],
    sources: ["03"],
  },
  {
    id: "agent-card",
    term: "Agent card",
    category: "agents",
    layer: "build",
    difficulty: "advanced",
    whatItIs:
      "A signed, machine-readable identity/capability description an agent publishes (A2A concept).",
    decision: "Cross-vendor agent trust — ask platform vendors how third-party agents prove what they are.",
    prerequisites: ["a2a"],
    sources: ["03"],
  },
  {
    id: "long-running-task",
    term: "Long-running task",
    category: "agents",
    layer: "build",
    difficulty: "intermediate",
    whatItIs:
      "Agent work spanning minutes–days, requiring checkpointing and resumption (now in the MCP spec as “Tasks”).",
    decision:
      "Runtime choice: long-running agents need durable execution infrastructure, not a chat session.",
    prerequisites: ["agentic-ai"],
    sources: ["03"],
  },
  {
    id: "sandbox",
    term: "Sandbox",
    category: "agents",
    layer: "control",
    difficulty: "intermediate",
    whatItIs:
      "An isolated environment where agent-generated code/actions execute without reaching real systems.",
    decision:
      "Blast-radius control for any agent that writes code or browses — non-negotiable in security review.",
    prerequisites: ["agentic-ai"],
    sources: ["03"],
  },
  {
    id: "runtime-isolation",
    term: "Runtime isolation",
    category: "agents",
    layer: "control",
    difficulty: "advanced",
    whatItIs: "The strength of the sandbox boundary (gVisor/Kata/Firecracker tiers).",
    decision: "Engineering detail — ask security to assess it; don't adjudicate it yourself.",
    jargon: true,
    prerequisites: ["sandbox"],
    sources: ["03"],
  },
  {
    id: "lethal-trifecta",
    term: "The lethal trifecta",
    category: "agents",
    layer: "control",
    difficulty: "intermediate",
    whatItIs:
      "Private data + untrusted input + an exfiltration path combined in one agent — the condition that makes prompt injection catastrophic.",
    decision:
      "The non-negotiable design review: never combine all three in one agent; prompt injection is architecturally unsolved, so containment is the defence.",
    prerequisites: ["agentic-ai"],
    related: ["sandbox", "policy-engine", "guardrails"],
    sources: ["08", "05", "10"],
  },

  // ── Protocols ──────────────────────────────────────────────────────
  {
    id: "mcp",
    term: "MCP (Model Context Protocol)",
    category: "protocols",
    layer: "build",
    difficulty: "beginner",
    whatItIs:
      "The standard for connecting agents to tools and data; Linux Foundation-governed (Agentic AI Foundation) since Dec 2025; ~100M monthly SDK downloads.",
    decision:
      "Integration strategy: build your tool surface MCP-first and any agent platform can use it — your main hedge against framework lock-in.",
    prerequisites: ["tool-use"],
    unlocks: ["a2a", "agent-card"],
    related: ["a2a", "webmcp"],
    sources: ["03", "06"],
  },
  {
    id: "a2a",
    term: "A2A (Agent2Agent)",
    category: "protocols",
    layer: "build",
    difficulty: "intermediate",
    whatItIs:
      "The standard for agent↔agent discovery and coordination across vendors; v1.0 in 2026, same foundation as MCP; adoption real but thinner.",
    decision: "Multi-vendor agent estates: whether your platforms can interoperate rather than silo.",
    prerequisites: ["mcp", "agentic-ai"],
    confusedWith: ["acp"],
    sources: ["03", "06"],
  },
  {
    id: "webmcp",
    term: "WebMCP",
    category: "protocols",
    layer: "build",
    difficulty: "advanced",
    whatItIs:
      "Draft W3C Community Group spec letting websites expose MCP-style tools to browser agents; Chrome origin trial — not a standard yet.",
    decision: "Timing only — watch for your web channel; too early to build strategy on.",
    prerequisites: ["mcp"],
    sources: ["03", "06"],
  },
  {
    id: "acp",
    term: "ACP (Agentic Commerce Protocol)",
    category: "protocols",
    layer: "apps",
    difficulty: "intermediate",
    whatItIs:
      "OpenAI + Stripe's checkout protocol for agent purchases (live in ChatGPT). ⚠ An older, unrelated “ACP” (IBM's Agent Communication Protocol) merged into A2A in Aug 2025 and no longer exists.",
    decision: "If you sell: whether you can transact inside ChatGPT's surfaces.",
    confusedWith: ["ucp", "a2a"],
    related: ["ap2", "agentic-commerce"],
    sources: ["03", "06", "14"],
  },
  {
    id: "ucp",
    term: "UCP (Universal Commerce Protocol)",
    category: "protocols",
    layer: "apps",
    difficulty: "intermediate",
    whatItIs:
      "Google + Shopify's full-journey commerce protocol (Jan 2026; Google surfaces + Microsoft Copilot checkout). ACP and UCP compete; merchants implement both.",
    decision:
      "If you sell: coverage of Google/Copilot agentic-commerce surfaces — a two-protocol reality for now.",
    confusedWith: ["acp"],
    related: ["ap2", "agentic-commerce"],
    sources: ["03", "06"],
  },
  {
    id: "ap2",
    term: "AP2 (Agent Payments Protocol)",
    category: "protocols",
    layer: "apps",
    difficulty: "advanced",
    whatItIs:
      "The payments-authorization layer (cryptographically signed mandates proving user intent), donated to the FIDO Alliance; sits beneath both commerce protocols.",
    decision: "Payment risk and dispute liability when agents buy — ask “who holds the mandate?”",
    prerequisites: ["acp", "ucp"],
    sources: ["03", "06"],
  },

  // ── Operations & governance ────────────────────────────────────────
  {
    id: "evals",
    term: "Evals",
    category: "operations",
    layer: "control",
    difficulty: "beginner",
    whatItIs:
      "Systematic scored tests of AI quality — offline (golden datasets gating releases) and online (scoring live traffic); “the new unit tests”.",
    decision:
      "Your quality gate for everything: model swaps, vendor claims, go-live. No evals = no evidence.",
    takeaway: "Build the eval harness before choosing the technique. Evals decide, not doctrine.",
    unlocks: ["llm-judge", "trajectory-evals", "fine-tuning", "distillation"],
    sources: ["03", "04"],
  },
  {
    id: "llm-judge",
    term: "LLM-as-judge",
    category: "operations",
    layer: "control",
    difficulty: "intermediate",
    whatItIs: "Using a model (calibrated against human ratings) to score outputs at scale.",
    decision: "Makes evals affordable — but ask how the judge was calibrated before trusting a vendor's scores.",
    prerequisites: ["evals"],
    sources: ["03"],
  },
  {
    id: "trajectory-evals",
    term: "Trajectory evals",
    category: "operations",
    layer: "control",
    difficulty: "intermediate",
    whatItIs:
      "Scoring an agent's path (tool choices, steps, recoveries), not just its final answer; production default in 2026.",
    decision: "Agent QA: final-answer-only evals materially overstate agent quality.",
    prerequisites: ["evals", "agentic-ai"],
    sources: ["03", "08"],
  },
  {
    id: "agentops",
    term: "LLMOps → AgentOps",
    category: "operations",
    layer: "control",
    difficulty: "intermediate",
    whatItIs:
      "The operations discipline; extended in 2026 from single calls to sessions, tool-call graphs and budgets.",
    decision: "Team/tooling investment for running AI in production — a real budget line, not a slogan.",
    statusNote: "“LLMOps” extended to AgentOps in 2026.",
    prerequisites: ["agentic-ai"],
    sources: ["03", "14"],
  },
  {
    id: "drift",
    term: "Drift",
    category: "operations",
    layer: "control",
    difficulty: "intermediate",
    whatItIs:
      "Behaviour change over time — from your data shifting or the vendor silently updating the model.",
    decision: "Why monitoring is permanent: a passing eval in March proves nothing in June.",
    prerequisites: ["evals"],
    sources: ["03"],
  },
  {
    id: "observability",
    term: "Observability",
    category: "operations",
    layer: "control",
    difficulty: "intermediate",
    whatItIs:
      "Tracing what AI systems actually did (OpenTelemetry GenAI conventions are the de facto — not yet stable — format).",
    decision: "Incident response and audit: can you reconstruct why the agent did that?",
    related: ["trajectory-evals", "agentops"],
    sources: ["03"],
  },
  {
    id: "agent-identity",
    term: "Agent identity",
    category: "operations",
    layer: "control",
    difficulty: "beginner",
    whatItIs:
      "Agents as first-class directory identities with credentials, owners and lifecycle (Entra Agent ID, Okta, AgentCore Identity).",
    decision:
      "The binding constraint on scaling agents — no identity means no permissioning, audit or revocation.",
    takeaway: "Agents are employees from a risk perspective: identity, permissions, budgets, supervision, offboarding.",
    prerequisites: ["agentic-ai"],
    unlocks: ["policy-engine", "control-plane"],
    sources: ["03", "08"],
  },
  {
    id: "policy-engine",
    term: "Policy engine",
    category: "operations",
    layer: "control",
    difficulty: "intermediate",
    whatItIs:
      "Deterministic rules evaluated on every agent tool call (Cedar/OPA-style; default-deny).",
    decision: "Where “the agent may never do X” becomes enforceable code instead of a hope.",
    prerequisites: ["tool-calling", "agent-identity"],
    sources: ["03", "06"],
  },
  {
    id: "control-plane",
    term: "Control plane",
    category: "operations",
    layer: "control",
    difficulty: "intermediate",
    whatItIs:
      "The assembled layer governing agents across your estate: registry, identity, policy, observability, evals, cost.",
    decision: "The choke-point procurement decision of 2026 — see Layer 6.",
    prerequisites: ["agent-identity", "policy-engine"],
    sources: ["03", "02"],
  },
  {
    id: "ai-finops",
    term: "AI FinOps",
    category: "operations",
    layer: "control",
    difficulty: "beginner",
    whatItIs:
      "Cost governance for AI: token/GPU allocation, showback, budgets, unit economics (98% of FinOps teams now do it).",
    decision:
      "Whether AI spend is managed or discovered — and per-agent budget caps double as safety controls.",
    prerequisites: ["tokens"],
    sources: ["03", "09"],
  },
  {
    id: "red-teaming",
    term: "Red teaming",
    category: "operations",
    layer: "control",
    difficulty: "intermediate",
    whatItIs:
      "Adversarial testing of AI systems (prompt injection, jailbreaks, data exfiltration) before and after deployment.",
    decision:
      "Release criteria for anything high-risk — increasingly expected by regulators and insurers.",
    sources: ["03", "08"],
  },
  {
    id: "guardian-agents",
    term: "Guardian agents",
    category: "operations",
    layer: "control",
    difficulty: "advanced",
    whatItIs: "Gartner's term for AI that supervises other AI at runtime.",
    decision: "Analyst framing — useful shorthand, but buy capabilities (policy, monitoring), not the buzzword.",
    jargon: true,
    sources: ["03"],
  },

  // ── Commercial ─────────────────────────────────────────────────────
  {
    id: "per-seat-pricing",
    term: "Per-seat pricing",
    category: "commercial",
    layer: "apps",
    difficulty: "beginner",
    whatItIs: "Paying per licensed user (M365 Copilot $30/user/mo); shrinking as the sole model.",
    decision: "Budget predictability vs paying for shelf-ware — demand usage data before renewals.",
    confusedWith: ["consumption-pricing", "per-outcome-pricing"],
    sources: ["03", "09"],
  },
  {
    id: "consumption-pricing",
    term: "Consumption pricing",
    category: "commercial",
    layer: "apps",
    difficulty: "beginner",
    whatItIs:
      "Paying per use (tokens, credits, actions); now the enterprise default, often opaque (credit packs).",
    decision:
      "FinOps exposure: variable bills, credit-conversion opacity — model worst-case, not demo-case.",
    confusedWith: ["per-seat-pricing", "per-outcome-pricing"],
    sources: ["03", "09"],
  },
  {
    id: "per-outcome-pricing",
    term: "Per-task / per-outcome pricing",
    category: "commercial",
    layer: "apps",
    difficulty: "intermediate",
    whatItIs:
      "Paying per completed outcome (Fin $0.99/resolution); established in customer support, niche elsewhere.",
    decision: "Risk transfer to the vendor — but audit how “resolution” is defined and gamed.",
    confusedWith: ["consumption-pricing"],
    related: ["service-as-software", "hitl-ratio"],
    sources: ["03", "09"],
  },
  {
    id: "data-gravity",
    term: "Data gravity",
    category: "commercial",
    layer: "data",
    difficulty: "beginner",
    whatItIs:
      "Work migrates to where data already lives, because permissions and connectors come free there.",
    decision: "The strongest predictor of your platform choice — and of your lock-in.",
    takeaway: "Stronger than model quality as a predictor of which platform wins the workload.",
    unlocks: ["lock-in"],
    sources: ["03", "05"],
  },
  {
    id: "lock-in",
    term: "Lock-in",
    category: "commercial",
    layer: "apps",
    difficulty: "beginner",
    whatItIs:
      "Switching costs; in 2026 concentrated in workflows, evals, embeddings, governance certifications and cloud commits — not the model.",
    decision:
      "Negotiation and architecture: keep the model swappable; price the workflow migration honestly.",
    takeaway: "Model-layer switching is getting easier; workflow-layer switching is getting harder.",
    related: ["data-gravity"],
    sources: ["03", "05", "01"],
  },
  {
    id: "sovereign-ai",
    term: "Sovereign AI",
    category: "commercial",
    layer: "serving",
    difficulty: "intermediate",
    whatItIs:
      "Legally/jurisdictionally controlled AI capability (in-country, cloud-act-immune, or air-gapped).",
    decision:
      "A genuine procurement gate for government/regulated workloads (~10–20%); mostly marketing beyond that.",
    related: ["air-gapped", "open-weight"],
    sources: ["03", "14"],
  },
  {
    id: "air-gapped",
    term: "Air-gapped",
    category: "commercial",
    layer: "serving",
    difficulty: "advanced",
    whatItIs: "Fully disconnected deployment; the extreme end of sovereignty.",
    decision: "Only for classified/defence-grade requirements — it forfeits the API ecosystem entirely.",
    prerequisites: ["sovereign-ai"],
    sources: ["03"],
  },
  {
    id: "byom",
    term: "BYOM (bring your own model)",
    category: "commercial",
    layer: "serving",
    difficulty: "intermediate",
    whatItIs: "Running your chosen model inside a vendor's platform.",
    decision:
      "Real at the API level, but check what's not portable (orchestration, memory, evals) — and note model access can be revoked supply-side.",
    sources: ["03", "05"],
  },

  // ── Business ───────────────────────────────────────────────────────
  {
    id: "service-as-software",
    term: "Service-as-software",
    category: "business",
    layer: "apps",
    difficulty: "intermediate",
    whatItIs:
      "Selling completed work (priced against labour budgets, ~$4.6T of services spend) rather than software seats.",
    decision: "Which budget line AI competes for — and why vendors price per outcome.",
    related: ["per-outcome-pricing", "vertical-ai"],
    sources: ["03", "09"],
  },
  {
    id: "vertical-ai",
    term: "Vertical AI",
    category: "business",
    layer: "apps",
    difficulty: "beginner",
    whatItIs:
      "Deep domain-specific AI products (Harvey in legal, Abridge in clinical) vs horizontal platforms.",
    decision: "Buy-vs-build in your domain: verticals win on workflow depth, platforms on distribution.",
    sources: ["03", "07"],
  },
  {
    id: "agentic-commerce",
    term: "Agentic commerce",
    category: "business",
    layer: "apps",
    difficulty: "intermediate",
    whatItIs:
      "Agents discovering, negotiating and buying on users' behalf (the ACP/UCP/AP2 stack).",
    decision: "Channel strategy if you sell anything — your storefront's next “mobile moment”.",
    related: ["acp", "ucp", "ap2"],
    sources: ["03"],
  },
  {
    id: "ai-native",
    term: "AI-native",
    category: "business",
    layer: "apps",
    difficulty: "beginner",
    whatItIs:
      "A company whose core product loop is the model (remove the AI and no product remains).",
    decision:
      "Competitive assessment: AI-natives set the growth benchmarks; incumbents answer with distribution and M&A.",
    sources: ["03"],
  },
  {
    id: "hitl-ratio",
    term: "Human-in-the-loop ratio",
    category: "business",
    layer: "apps",
    difficulty: "beginner",
    whatItIs: "The share of AI-produced work requiring human review/intervention.",
    decision: "The real unit-economics variable — automation claims mean nothing without it.",
    takeaway:
      "A $0.40-of-tokens task with 30% human review at $50/hr loaded cost is not a $0.40 task. Demand this number from every vendor.",
    prerequisites: ["hitl"],
    sources: ["03", "09"],
  },
];

export const conceptById = new Map(concepts.map((c) => [c.id, c]));

/** Reverse relationships: which concepts list `id` as a prerequisite. */
export function unlockedBy(id: string): Concept[] {
  return concepts.filter((c) => c.prerequisites?.includes(id));
}

export function prerequisitesOf(id: string): Concept[] {
  const c = conceptById.get(id);
  if (!c?.prerequisites) return [];
  return c.prerequisites.map((p) => conceptById.get(p)).filter(Boolean) as Concept[];
}

export const categoryLabels: Record<string, string> = {
  models: "Models",
  "build-patterns": "Build patterns",
  agents: "Agents",
  protocols: "Protocols",
  operations: "Operations & governance",
  commercial: "Commercial",
  business: "Business",
};
