import type { Quiz } from "./types";

// Knowledge checks per learning level. Questions test relationships and
// judgement, not trivia; explanations restate the source reasoning.

export const quizzes: Quiz[] = [
  {
    id: "mental-model",
    title: "Knowledge check — The Mental Model",
    questions: [
      {
        kind: "choice",
        id: "mm1",
        prompt:
          "A vendor pitches an “AI platform” that bundles model serving, retrieval over your data, agent building and governance dashboards. Using the seven-layer map, what is the most useful first question?",
        options: [
          "Which model does it use, and how does it benchmark?",
          "Which layers am I buying, which am I marrying — and which layer is the vendor actually trying to own?",
          "What is the price per seat?",
          "Does it support fine-tuning?",
        ],
        correct: 1,
        explanation:
          "The layers are a decision map. Vendors deliberately collapse layers — an “AI platform” bundling layers 3–6 is selling convenience and lock-in; price both. Knowing which layer a vendor is trying to own is the single most useful analytical skill in this material.",
        sources: ["02", "01"],
      },
      {
        kind: "choice",
        id: "mm2",
        prompt: "At which layers is your enterprise most likely to be genuinely differentiated?",
        options: [
          "Compute (Layer 1) and Models (Layer 2) — the deepest technology",
          "Serving (Layer 3) — the integration point",
          "Data & Context (Layer 4) and Applications (Layer 7) — your data and your workflows",
          "The Control Plane (Layer 6) — governance is a moat",
        ],
        correct: 2,
        explanation:
          "You are differentiated almost always at Layer 4 (your data) and Layer 7 (your workflows) — almost never at layers 1–3. Spend accordingly.",
        sources: ["02"],
      },
      {
        kind: "choice",
        id: "mm3",
        prompt:
          "Why does the mental model draw the Control Plane as a plane cutting across the stack rather than a box between two layers?",
        options: [
          "Because it is the most expensive layer",
          "Because identity, policy, observability, evals and cost governance instrument every layer — drawing it as one stratum understates it",
          "Because it only applies to applications",
          "Because vendors sell it as a single product",
        ],
        correct: 1,
        explanation:
          "The control plane instruments every layer; no one sells it complete — enterprises assemble it. That's exactly why the enforcement point is the stack's choke point.",
        sources: ["02"],
      },
      {
        kind: "match",
        id: "mm4",
        prompt: "Place each product on the layer it primarily lives in (the Level-1 self-test).",
        pairs: [
          { left: "M365 Copilot", right: "Layer 7 — Applications" },
          { left: "Bedrock AgentCore", right: "Layer 5 — Build & Orchestration" },
          { left: "DeepSeek V4", right: "Layer 2 — Models" },
          { left: "Agent 365", right: "Layer 6 — Control Plane" },
        ],
        explanation:
          "The self-test from the learning path: M365 Copilot is an application; AgentCore is a managed agent runtime at the build/orchestration layer; DeepSeek V4 is an open-weight model; Agent 365 is Microsoft's agent governance product — control plane.",
        sources: ["12", "02"],
      },
      {
        kind: "choice",
        id: "mm5",
        prompt:
          "You consume all models via API and never self-host. Which two layers effectively arrive as one product for you?",
        options: [
          "Layers 1 and 2 (Compute and Models)",
          "Layers 2 and 3 (Models and Serving)",
          "Layers 4 and 5 (Data and Build)",
          "Layers 6 and 7 (Control Plane and Applications)",
        ],
        correct: 1,
        explanation:
          "Layers 2 and 3 fuse for most buyers: if you consume models via API, models and serving arrive as one product. The separation is only real if you self-host (archetype 6).",
        sources: ["02"],
      },
      {
        kind: "choice",
        id: "mm6",
        prompt:
          "Prompt injection is described as entering at one layer, exploiting another, and exfiltrating via a third. Which sequence is right?",
        options: [
          "Enters at Layer 2, exploits Layer 3, exfiltrates via Layer 6",
          "Enters at Layer 7, exploits Layer 5, exfiltrates via Layer 4",
          "Enters at Layer 4, exploits Layer 6, exfiltrates via Layer 7",
          "Enters at Layer 1, exploits Layer 2, exfiltrates via Layer 3",
        ],
        correct: 1,
        explanation:
          "Security is a cross-cutting concern precisely because the attack path spans layers: untrusted input enters through the application (7), exploits the agent loop (5), and exfiltrates through data access (4). Containment — least privilege, sandboxing, human gates — is the defence.",
        sources: ["02"],
      },
    ],
  },
  {
    id: "building-blocks",
    title: "Knowledge check — Core Building Blocks",
    questions: [
      {
        kind: "choice",
        id: "bb1",
        prompt:
          "You need an AI system to answer questions using internal company documents that change frequently and carry access controls. Which capability becomes important, and why?",
        options: [
          "Fine-tuning — bake the documents into the model's weights",
          "Retrieval (RAG) — fresh, citable, and permission-controlled at query time",
          "A bigger context window — paste everything in",
          "Continued pre-training on the document corpus",
        ],
        correct: 1,
        explanation:
          "Volatile, permissioned, citable facts belong in retrieval: instantly updatable, access-controlled, attributable. Fine-tuning is a poor way to inject facts (limited capacity, no citations, instant staleness), and context-stuffing cannot enforce permissions.",
        sources: ["03", "04"],
      },
      {
        kind: "choice",
        id: "bb2",
        prompt:
          "A colleague says they're evaluating an “open-source” model. Its weights are downloadable but the licence restricts commercial use. What's the correct read?",
        options: [
          "It's open-source — the weights are available",
          "It's open-weight, not open-source — read the licence, not the label",
          "The distinction doesn't matter in practice",
          "It's proprietary — downloadable weights don't count",
        ],
        correct: 1,
        explanation:
          "Open-weight = downloadable weights; open-source adds a permissive licence (and rarely, data/code). Llama and Kimi restrict; MIT/Apache don't. The legal exposure of “open” models turns on the licence.",
        sources: ["03"],
      },
      {
        kind: "choice",
        id: "bb3",
        prompt:
          "An automation follows the same five steps every time: fetch a form, extract fields, validate, draft a response, file it. A vendor proposes an autonomous agent. What does the material say?",
        options: [
          "Agents are more capable, so use the agent",
          "The path is predictable — build a workflow: cheaper, testable, reliable. Most production “agent” value is workflows",
          "Use a multi-agent system for resilience",
          "Fine-tune a model on the five steps",
        ],
        correct: 1,
        explanation:
          "Workflow vs agent is the single best reliability decision: workflows (predefined paths) beat agents (dynamic control flow) wherever the path is predictable. “Why does this need to be an agent?” is also failure-mode screen #1.",
        sources: ["03", "10"],
      },
      {
        kind: "choice",
        id: "bb4",
        prompt:
          "A CFO asks why the AI bill rose 40% while the vendor cut per-token prices twice. Which concept explains it?",
        options: [
          "Quantisation — the models got compressed",
          "Reasoning models spend variable “thinking” tokens per task, so bills can rise while unit prices fall — budget per task, not per token",
          "The context window grew",
          "Multimodality — images cost more",
        ],
        correct: 1,
        explanation:
          "All 2026 flagships are reasoning-native with a tunable effort dial. Cost per query is variable, and reasoning agents consume more tokens per task — the countervailing force against price deflation. Hence: cost per task at target quality, never tokens-per-dollar.",
        sources: ["03", "09"],
      },
      {
        kind: "match",
        id: "bb5",
        prompt: "Match each protocol to what it standardises.",
        pairs: [
          { left: "MCP", right: "Agent ↔ tools and data" },
          { left: "A2A", right: "Agent ↔ agent discovery and coordination" },
          { left: "ACP vs UCP", right: "Competing agentic-checkout protocols" },
          { left: "AP2", right: "Signed payment mandates proving user intent" },
        ],
        explanation:
          "MCP and A2A both sit under the Linux Foundation's Agentic AI Foundation — the safest interoperability bets. In commerce, ACP (OpenAI/Stripe) and UCP (Google/Shopify) compete — merchants implement both — with FIDO-governed AP2 as the payments-trust layer beneath.",
        sources: ["03", "06"],
      },
      {
        kind: "choice",
        id: "bb6",
        prompt:
          "Your team wants output in a strict JSON schema and proposes fine-tuning for it. What's the cheaper first move in 2026?",
        options: [
          "Fine-tune — schema adherence needs weight updates",
          "Native structured output — reliable on 2026 APIs, essentially free",
          "A bigger model",
          "A knowledge graph",
        ],
        correct: 1,
        explanation:
          "Structured output is natively reliable on 2026 APIs — expect it, don't pay extra for it. The consistency branch of the decision tree: structured output → workflows → fine-tune only as last resort.",
        sources: ["03", "04"],
      },
      {
        kind: "choice",
        id: "bb7",
        prompt:
          "Which statement about evals best reflects the source material?",
        options: [
          "Evals are a QA phase you run before launch",
          "Evals are the quality gate for everything — model swaps, vendor claims, go-live. No evals = no evidence",
          "Evals are only needed for fine-tuned models",
          "LLM-as-judge makes human calibration unnecessary",
        ],
        correct: 1,
        explanation:
          "Evals are “the new unit tests”: offline golden datasets gate releases, online evals score live traffic, and eval discipline is what lets enterprises swap models and ship agents. LLM-as-judge makes them affordable but must be calibrated against human ratings.",
        sources: ["03"],
      },
    ],
  },
  {
    id: "how-built",
    title: "Knowledge check — How Systems Are Built",
    questions: [
      {
        kind: "choice",
        id: "hb1",
        prompt:
          "A team wants to automate case handling that lives entirely inside Salesforce, with modest engineering capacity. Which archetype fits first — and what's the trap to price in?",
        options: [
          "Archetype 5 (custom frameworks) — maximum control",
          "Archetype 3 (configure on the platform) — data gravity works for you; the trap is DSL lock-in and opaque consumption credits",
          "Archetype 6 (self-hosted) — data sovereignty",
          "Archetype 1 (embedded) — it will appear in a release",
        ],
        correct: 1,
        explanation:
          "Processes living inside a suite map to archetype 3: inherited trust layer, tenant identity, data gravity. The trade: this is the sticky tier — flows are platform-DSL artifacts that don't port — and credit conversion (1–200+ credits/interaction) is the FinOps trap.",
        sources: ["04"],
      },
      {
        kind: "choice",
        id: "hb2",
        prompt:
          "What is the one underlying dial the six archetypes turn?",
        options: [
          "Cost per seat",
          "How much of the system you own — control and differentiation rise, inherited governance and speed fall",
          "Model quality",
          "Cloud vs on-premises",
        ],
        correct: 1,
        explanation:
          "Moving 1 → 6 turns one dial: ownership. Everything else follows — and governance effort is conserved: every step right converts inherited governance into required governance. Budget for it explicitly or watch the pilot die in security review.",
        sources: ["04"],
      },
      {
        kind: "order",
        id: "hb3",
        prompt:
          "Order these steps as they occur in the worked example's request flow (user's ask → final answer).",
        items: [
          "User authenticates into the application (SSO)",
          "Request routes to a governed agent with its own identity",
          "Mid-tier model call produces a plan",
          "Permissions-aware retrieval assembles context",
          "Tool calls via MCP pass the policy engine",
          "Frontier-tier model analyses and drafts a grounded recommendation",
          "HITL gate: human approves the proposed write",
          "Result returns with cited evidence",
        ],
        explanation:
          "The end-to-end walkthrough: authentication → agent identity → plan (cheap tier) → retrieval → policy-checked tool calls → frontier analysis → gated write → cited result. One request = many model calls at different tiers, with security at the tool call.",
        sources: ["06"],
      },
      {
        kind: "choice",
        id: "hb4",
        prompt:
          "In the worked example, why does the agent's retrieval query run under the user's delegated authority rather than a service account?",
        options: [
          "It's faster",
          "So the agent can only surface documents this user is entitled to see — the pattern that makes permissions-aware AI possible",
          "Service accounts are deprecated",
          "To reduce token costs",
        ],
        correct: 1,
        explanation:
          "The agent never had super-user access: every read and write happened under the user's delegated, scoped authority. An over-permissioned agent is a breach generator — this is the make-or-break of Layer 4.",
        sources: ["06", "10"],
      },
      {
        kind: "choice",
        id: "hb5",
        prompt:
          "A regulated enterprise must guarantee prompts never leave its boundary. Which archetype is the only one that delivers that — and at what cost?",
        options: [
          "Archetype 4 (managed runtime) — your VPC is enough",
          "Archetype 6 (self-hosted open weights) — absolute data control, but highest operational burden, no inherited governance, and ~3–9 months behind the closed frontier",
          "Archetype 2 (assistant seats) — enterprise terms cover it",
          "Archetype 7 (outcome-bought) — the vendor takes the risk",
        ],
        correct: 1,
        explanation:
          "Self-hosting is the only archetype where prompts never leave your boundary. The price: the scarcest skill profile, everything in archetype 5's governance burden plus model lifecycle, and a capability lag behind the closed frontier.",
        sources: ["04"],
      },
      {
        kind: "choice",
        id: "hb6",
        prompt:
          "Why does the material advise betting on protocols (MCP/A2A) rather than frameworks?",
        options: [
          "Protocols are faster at runtime",
          "Framework churn is the real risk of custom builds; an MCP-first tool surface ports across agent platforms",
          "Frameworks are more expensive to license",
          "Protocols include governance policy",
        ],
        correct: 1,
        explanation:
          "Frameworks churn; MCP and A2A sit under a neutral foundation and are the most-shipped standards. Caveat preserved from the source: protocols standardise plumbing, not policy — delegation semantics and liability remain unexpressed.",
        sources: ["02", "04", "06"],
      },
    ],
  },
  {
    id: "decision-making",
    title: "Knowledge check — Decision Making",
    questions: [
      {
        kind: "choice",
        id: "dm1",
        prompt:
          "A business unit proposes: “We should deploy an agent platform — competitors are.” Per the ten-step process, what's the first question?",
        options: [
          "Which vendor has the best platform?",
          "What are we actually trying to change — a task, a decision, a process, a product, or general productivity?",
          "What's the budget?",
          "Which model should it use?",
        ],
        correct: 1,
        explanation:
          "Steps 1–2 (what are we changing; what's the least capability that does it) kill more bad projects than steps 3–10 combined. Most failed initiatives chose a technology before naming the change.",
        sources: ["05"],
      },
      {
        kind: "choice",
        id: "dm2",
        prompt:
          "Your agents are built in a platform DSL, spend is via opaque credits, memory is proprietary, and there's no export path — but the integration is genuinely productive. Which quadrant of the lock-in 2×2, and what's the move?",
        options: [
          "Strategic partnership — deepen the integration",
          "Hostage situation — the dependency doesn't earn its switching cost; renegotiate or plan exit now",
          "Healthy arm's-length — nothing to do",
          "False economy — integrate harder",
        ],
        correct: 1,
        explanation:
          "High switching cost + dependency not earning it = hostage situation. The exit question: “If we had to leave in 18 months, what exactly would we rebuild?” — demand the list (workflows, evals, embeddings, memory, audit history, credits). Note: high switching cost with earned value is a strategic partnership — the difference is whether it earns the cost.",
        sources: ["05"],
      },
      {
        kind: "choice",
        id: "dm3",
        prompt:
          "An organisation at maturity level 2 (agents have identities and least-privilege access, but no policy-on-tool-calls or trajectory logging) wants to launch agents that write to production systems with approval gates. Safe?",
        options: [
          "Yes — approval gates cover it",
          "Not yet — that requires level 3 (policy & audit). Autonomy must not exceed governance maturity",
          "Yes — if the vendor is reputable",
          "No agents are safe at any level",
        ],
        correct: 1,
        explanation:
          "The maturity ladder: level 2 supports read-only agents; agents that act with approval gates need level 3 (deterministic rules on tool calls + full trajectory logging). 74% plan agent adoption; 21% have mature governance — that gap is the main brake.",
        sources: ["05"],
      },
      {
        kind: "choice",
        id: "dm4",
        prompt:
          "A vendor says their product is “model-agnostic — bring your own model.” Per the marketing translator, what's the sharp follow-up?",
        options: [
          "Which models do you support?",
          "If I swap models tomorrow, what re-tuning do my prompts and evals need — and can model access be revoked from your side?",
          "Is the model fine-tuned?",
          "How many parameters does it have?",
        ],
        correct: 1,
        explanation:
          "“Model-agnostic” usually means the model slot is swappable while orchestration, memory, evals and governance aren't. And supply-side revocation is real — access can be cut from the vendor's side (the Cursor lesson).",
        sources: ["07", "05"],
      },
      {
        kind: "choice",
        id: "dm5",
        prompt:
          "What is the strongest single predictor of which platform wins an AI workload, per Axis 2?",
        options: [
          "Model benchmark scores",
          "Where your valuable data already lives — permissions, connectors and governance come free there",
          "Price per token",
          "The vendor's partner ecosystem",
        ],
        correct: 1,
        explanation:
          "Data gravity — stronger than model quality. The 2026 pattern: pick a primary build platform where your densest data sits, then deliberately choose a cross-estate control plane that sees all your agents, including those in other vendors' platforms.",
        sources: ["05"],
      },
      {
        kind: "match",
        id: "dm6",
        prompt: "Match the vendor to what it's trying to own (per the positioning grid).",
        pairs: [
          { left: "Microsoft", right: "The employment layer for agents (identity + governance + productivity)" },
          { left: "AWS", right: "Agent infrastructure, staying neutral on models" },
          { left: "Anthropic", right: "The model + agent harness layer, sold through everyone's platform" },
          { left: "Salesforce", right: "The customer-workflow agent layer + outcome pricing" },
        ],
        explanation:
          "Nobody is neutral: every vendor commoditises the layers it doesn't own to funnel value to the layer it does. Map the pitch to the grid before evaluating features.",
        sources: ["07"],
      },
    ],
  },
  {
    id: "governance",
    title: "Knowledge check — Governance, Risk & Regulation",
    questions: [
      {
        kind: "choice",
        id: "gv1",
        prompt:
          "An Australian enterprise with a customer chatbot whose outputs reach EU users asks what applies right now (September 2026). What's the answer?",
        options: [
          "Nothing until December 2027",
          "EU Article 50 transparency is live now: disclose the chatbot and mark synthetic content; prohibitions have applied since Feb 2025",
          "Only Australian law applies to an Australian company",
          "The full high-risk conformity regime applies today",
        ],
        correct: 1,
        explanation:
          "The Digital Omnibus deferred Annex III high-risk to 2 Dec 2027 — but did not move Article 50: chatbot disclosure and synthetic-content marking went live 2 Aug 2026, and the Act reaches non-EU providers where output is used in the EU.",
        sources: ["08"],
      },
      {
        kind: "choice",
        id: "gv2",
        prompt:
          "What is the binding near-term compliance deadline for a typical Australian enterprise — and it isn't AI law?",
        options: [
          "The Australian Standards for AI bill",
          "Automated-decision-making transparency under the Privacy Act (APPs 1.7–1.9), commencing 10 December 2026",
          "EU Annex III conformity",
          "ISO 42001 certification",
        ],
        correct: 1,
        explanation:
          "From 10 Dec 2026, privacy policies must disclose the kinds of personal information used in, and decisions made by, ADM that significantly affects rights or interests. Action now: inventory every ADM use (including AI-assisted decisions).",
        sources: ["08"],
      },
      {
        kind: "choice",
        id: "gv3",
        prompt:
          "An architect proposes one agent that reads confidential contracts, browses arbitrary web pages for market context, and can send email. What's the problem?",
        options: [
          "Nothing, if the model is aligned",
          "It combines the lethal trifecta — private data + untrusted input + an exfiltration path — in one agent, and prompt injection is architecturally unsolved",
          "Email is too slow for agents",
          "Browsing needs a bigger context window",
        ],
        correct: 1,
        explanation:
          "The working defence against prompt injection is containment, not filtering: least-privilege tools, sandboxing, human gates — and never combining private data, untrusted input and an exfiltration path in one agent. Real incidents (EchoLeak, Salesloft Drift) moved this from hypothetical to actuarial.",
        sources: ["08"],
      },
      {
        kind: "multi",
        id: "gv4",
        prompt:
          "Which of these belong to the seven-control stack that leading enterprises converge on? (Select all that apply.)",
        options: [
          "Agent inventory + identity",
          "Policy-as-code at the tool call",
          "Unlimited agent budgets to avoid blocking work",
          "Trajectory-level evals + observability",
          "Human-in-the-loop by risk tier",
          "A ban on all third-party models",
        ],
        correct: [0, 1, 3, 4],
        explanation:
          "The stack: inventory+identity, least-privilege delegation, policy-as-code on tool calls, trajectory evals + observability, HITL by risk tier, per-agent budget caps (the opposite of unlimited), and an ISO 42001 + NIST AI RMF wrapper. No control bans third-party models.",
        sources: ["08"],
      },
      {
        kind: "choice",
        id: "gv5",
        prompt: "How does the material reframe governance for the board?",
        options: [
          "A compliance tax to minimise",
          "The production-enablement layer: the 21% with mature governance are disproportionately the ~6% capturing serious EBIT value",
          "A legal formality until 2027",
          "Something to outsource entirely to vendors",
        ],
        correct: 1,
        explanation:
          "Controls are what let agents ship, scale and survive incidents. The enterprises shipping agents at scale built evals and controls first.",
        sources: ["08", "01"],
      },
      {
        kind: "choice",
        id: "gv6",
        prompt:
          "Why does the material recommend anchoring on ISO/IEC 42001 + NIST AI RMF?",
        options: [
          "They are legally mandatory everywhere",
          "They bridge every jurisdiction and are becoming procurement requirements — build once, and each regime becomes a delta, not a rebuild",
          "They replace the EU AI Act",
          "They are free to implement",
        ],
        correct: 1,
        explanation:
          "Both map onto Australia's six practices and the EU Act's risk-management expectations. They turn “responsible AI” from a slogan into an auditable management system.",
        sources: ["08", "01"],
      },
    ],
  },
  {
    id: "economics",
    title: "Knowledge check — Economics & Value",
    questions: [
      {
        kind: "order",
        id: "ec1",
        prompt: "Order the five links of the unit-economics chain, from the token up.",
        items: ["Model cost", "Inference cost", "Task cost", "Process cost", "Business value"],
        explanation:
          "Model → inference → task → process → value. Optimising any single link in isolation misleads — a cheap token price means nothing if the HITL ratio never falls or the process never changes.",
        sources: ["09", "05"],
      },
      {
        kind: "choice",
        id: "ec2",
        prompt:
          "A vendor demos a task at “$0.40 of tokens per task.” Production needs 30% human review at $50/hr loaded (about 5 minutes per reviewed task). What does the framework say?",
        options: [
          "It's a $0.40 task — tokens are the cost",
          "The HITL share adds ~$1.25 on average — the human-in-the-loop ratio dominates task cost, and demos hide it",
          "Human review is free — it's existing headcount",
          "Reduce the token count further",
        ],
        correct: 1,
        explanation:
          "Task cost = model calls + tools + retries + (HITL ratio × loaded review cost). 30% × (5/60)hr × $50 ≈ $1.25 — triple the token cost. Demand this number from every vendor and every internal business case, and re-run it with the HITL ratio doubled.",
        sources: ["09"],
      },
      {
        kind: "choice",
        id: "ec3",
        prompt:
          "88% of organisations use AI and 80% of users report productivity gains, yet only 37% see any EBIT impact. What bridges that gap, per the evidence?",
        options: [
          "Better models",
          "Workflow redesign — the single biggest EBIT driver, done by only ~21%",
          "More spend",
          "More pilots",
        ],
        correct: 1,
        explanation:
          "The individual-gains-vs-enterprise-P&L gap is the central economic paradox of 2026. The bridge is workflow redesign, CEO-level governance ownership, and fewer bigger bets — not model capability.",
        sources: ["09", "01"],
      },
      {
        kind: "choice",
        id: "ec4",
        prompt: "What is the scale decision rule from the pocket framework?",
        options: [
          "Scale when the pilot demos well",
          "Scale only if value per task ≥ 3× cost per task, measured on real production traffic",
          "Scale when the vendor offers a discount",
          "Scale when competitors do",
        ],
        correct: 1,
        explanation:
          "Pilot → measure both cost and value on real traffic → scale only if value/cost > 3× — margin for the HITL ratio and token bills to move against you.",
        sources: ["05", "09"],
      },
      {
        kind: "choice",
        id: "ec5",
        prompt:
          "What does the Klarna arc (2024 automation claim → 2025 walk-back → late-2025 sustained savings) actually teach?",
        options: [
          "AI customer service failed",
          "The automation ceiling was ~⅔ of volume: hybrid won, not reversal — institutionalise human-in-the-loop by design",
          "The original claims were fabricated",
          "Customer service should never be automated",
        ],
        correct: 1,
        explanation:
          "Told whole: ~700-agent workload and ~$40M claimed savings; a public quality walk-back and rehiring with a human floor restored; still ~$60M annual savings at an ~850-agent workload. The lesson is the ceiling and the hybrid, not the headline.",
        sources: ["09"],
      },
      {
        kind: "choice",
        id: "ec6",
        prompt:
          "Per-outcome pricing (e.g. $0.99/resolution) is established… where, and with what caveat?",
        options: [
          "Everywhere — it's the 2026 default",
          "Only where outcomes are countable (customer support above all) — and audit how “resolution” is defined and gamed",
          "Nowhere — it's pure marketing",
          "Only in legal services",
        ],
        correct: 1,
        explanation:
          "Outcome pricing is a wedge pattern with proof points (Fin, legitimised by Salesforce's $3.6B acquisition), not the market default; hybrid base + usage is the standard (~41%). Outcome-definition gaming (“resolution” = customer gave up) is a known failure mode.",
        sources: ["09", "14"],
      },
    ],
  },
  {
    id: "failure-modes",
    title: "Knowledge check — What Goes Wrong",
    questions: [
      {
        kind: "choice",
        id: "fm1",
        prompt:
          "A pilot works in the lab but the retrieval corpus is stale, nobody owns data quality, and document permissions don't flow into answers. Which failure mode, and where does it originate on the map?",
        options: [
          "Technology failure, originating at Layer 2 (Models)",
          "Data failure, originating at Layer 4 (Data & Context) — where most production failures originate",
          "People failure, originating at Layer 7",
          "Economics failure, originating at Layer 3",
        ],
        correct: 1,
        explanation:
          "Data failures are the pilot's silent killer: stale, unpermissioned or wrong corpora. Stanford's AI Index identifies data infrastructure — not models — as the primary barrier. The failure originates in Layer 4 but becomes visible in the application layer.",
        sources: ["10"],
      },
      {
        kind: "choice",
        id: "fm2",
        prompt:
          "AI drafts the document, then the same five approvals happen anyway, and savings appear in nobody's budget. Which failure mode?",
        options: [
          "Technology — the model isn't good enough",
          "Process — AI bolted onto an unredesigned workflow; if the after-picture is the before-picture plus AI, value will be invisible",
          "Governance — missing audit trail",
          "Data — stale corpus",
        ],
        correct: 1,
        explanation:
          "The smell test: “What does the process look like AFTER, and which steps disappear?” Workflow redesign is the single biggest EBIT driver, yet only ~21% do it.",
        sources: ["10"],
      },
      {
        kind: "match",
        id: "fm3",
        prompt: "Match the pre-mortem question to the failure mode it kills.",
        pairs: [
          { left: "Why an agent and not a workflow?", right: "Technology" },
          { left: "Cost per task at volume, with the HITL ratio doubled?", right: "Economics" },
          { left: "Change budget vs technology budget?", right: "People" },
          { left: "Who operates this in 18 months — name and budget line?", right: "Operating model" },
        ],
        explanation:
          "Seven questions, ten minutes, most bad projects dead before they consume a year — the highest-ROI governance artifact in the package.",
        sources: ["10"],
      },
      {
        kind: "choice",
        id: "fm4",
        prompt:
          "“We'll add governance in phase 2” — what does the material call this?",
        options: [
          "Sensible sequencing",
          "A cancellation notice with a delay — the pilot will die in security review, or worse, won't",
          "Agile methodology",
          "A cost optimisation",
        ],
        correct: 1,
        explanation:
          "The governance smell test: can this pass security review today — identity, least privilege, policy on tool calls, audit trail, kill switch? Build governance capability before the agent portfolio scales.",
        sources: ["10"],
      },
      {
        kind: "choice",
        id: "fm5",
        prompt: "How do failure modes typically appear in real post-mortems?",
        options: [
          "One clean category at a time",
          "Chained: an ungoverned pilot on unready data automating an unredesigned process with unexamined economics, owned by nobody — and the write-up blames “the technology”",
          "Only in custom builds",
          "Only in bought solutions",
        ],
        correct: 1,
        explanation:
          "The compound failure. Screening questions exist to break the chain at proposal time, when it costs a meeting instead of a year.",
        sources: ["10"],
      },
      {
        kind: "choice",
        id: "fm6",
        prompt:
          "Gartner predicts >40% of agentic AI projects cancelled by end-2027. How does the material say a portfolio should treat that number?",
        options: [
          "Avoid agentic AI entirely",
          "Cancellation is fine if it happens early and cheaply — run a portfolio governance board that kills fast",
          "Ignore it — predictions are usually wrong",
          "Double the budget to beat the odds",
        ],
        correct: 1,
        explanation:
          "The operating-model mitigation: every initiative has a business owner with P&L accountability from day one, and a governance board that kills fast. >40% cancellation is acceptable if it costs meetings, not years.",
        sources: ["10"],
      },
    ],
  },
];

export const quizById = new Map(quizzes.map((q) => [q.id, q]));
