import type { Archetype } from "./types";

// The seven build archetypes, from 04_BUILD_ARCHETYPES.md.
// One underlying dial: how much of the system you own.

export const archetypes: Archetype[] = [
  {
    id: "embedded",
    num: 1,
    name: "Embedded AI",
    tagline: "AI inside SaaS you already own",
    examples:
      "Salesforce Einstein features, SAP Joule, Workday AI, Canva AI, your HRIS's screening assistant",
    control: 5,
    rows: [
      { label: "What is it?", value: "Vendor-built AI features inside SaaS you already run" },
      { label: "Who builds it?", value: "The SaaS vendor; you configure toggles at most" },
      { label: "Time to production", value: "Days — it arrives in a release" },
      { label: "Technical control", value: "Minimal: on/off, some settings" },
      { label: "Governance inherited", value: "High — vendor's security, hosting, model choices" },
      {
        label: "Governance required",
        value:
          "Inventory + review: know what turned itself on, what data it touches (many “AI risk surprises” are here)",
      },
      { label: "Model flexibility", value: "None — vendor's model, vendor's roadmap" },
      { label: "Vendor lock-in", value: "Adds AI stickiness to existing SaaS lock-in" },
      {
        label: "Data control",
        value: "Your data stays in that SaaS; check AI-specific data terms (training use, sub-processors)",
      },
      { label: "Cost model", value: "Bundled, or per-seat uplift" },
      { label: "Operational burden", value: "Near zero" },
    ],
    bestFor: "Commodity productivity in commodity processes; fast wins with no team",
    poorFor: "Anything differentiating or cross-system",
    buyer: "Application owners; often nobody — it just appears (which is itself the risk)",
    sources: ["04"],
  },
  {
    id: "seats",
    num: 2,
    name: "Assistant seats",
    tagline: "A licensed AI workspace per person",
    examples:
      "Microsoft 365 Copilot ($30/user/mo), ChatGPT Enterprise (~$45–75/seat reported), Claude Enterprise ($20/seat + usage), Gemini Enterprise",
    control: 18,
    rows: [
      { label: "What is it?", value: "A licensed AI workspace per person, increasingly with light agent features" },
      { label: "Who builds it?", value: "The lab/suite vendor; you deploy, connect data sources, and drive adoption" },
      { label: "Time to production", value: "Weeks (procurement + SSO + data connectors + enablement)" },
      { label: "Technical control", value: "Low: connectors, admin policies, custom instructions/light agents" },
      {
        label: "Governance inherited",
        value: "High — enterprise tiers bring SSO, no-training-on-your-data terms, audit logs, DLP hooks",
      },
      {
        label: "Governance required",
        value: "Acceptable-use policy, data-connector scoping, shadow-AI displacement, usage analytics",
      },
      { label: "Model flexibility", value: "Vendor's models only (Copilot now mixes OpenAI + Anthropic under the hood)" },
      {
        label: "Vendor lock-in",
        value: "Moderate: habits and connectors, not architecture — the most reversible archetype after #1",
      },
      {
        label: "Data control",
        value: "Data flows to vendor cloud under contract; retrieval respects your permissions if configured properly",
      },
      { label: "Cost model", value: "Per-seat (with premium/usage tiers appearing)" },
      { label: "Operational burden", value: "Low; the real work is change management" },
    ],
    bestFor: "Broad-population productivity; the individual gains that 80% of users report",
    poorFor: "Process automation, anything needing custom workflow or P&L attribution",
    buyer: "CIO/CHRO; the “default yes” purchase of 2025–26",
    sources: ["04"],
  },
  {
    id: "configure",
    num: 3,
    name: "Configure on a platform",
    tagline: "Low-code agents on a suite's trust layer",
    examples:
      "Microsoft Copilot Studio (consumption credits), Salesforce Agentforce ($2/conversation, Flex Credits, or per-user), IBM watsonx Orchestrate, ServiceNow AI Agents",
    control: 34,
    rows: [
      { label: "What is it?", value: "Declarative/low-code agent building on a suite's data, tools and trust layer" },
      { label: "Who builds it?", value: "Business technologists + IT; consultancies love this tier" },
      { label: "Time to production", value: "Weeks–months" },
      { label: "Technical control", value: "Medium: flows, topics, tool wiring — within the platform's DSL" },
      { label: "Governance inherited", value: "High — platform trust layer, tenant identity, audit" },
      {
        label: "Governance required",
        value: "Agent lifecycle (who owns which agent), tool permission review, sprawl control — configuration ≠ safe",
      },
      {
        label: "Model flexibility",
        value: "Limited; platform-selected models with some choice (Agentforce partners with Anthropic for regulated industries)",
      },
      {
        label: "Vendor lock-in",
        value: "High — this is the sticky tier: flows and agents are platform-DSL artifacts that don't port",
      },
      {
        label: "Data control",
        value: "Strongest where your data already lives in that platform (data gravity working for you)",
      },
      {
        label: "Cost model",
        value: "Consumption credits — opaque conversion rates (1–200+ credits/interaction) are the FinOps trap",
      },
      { label: "Operational burden", value: "Medium: monitoring, versioning, credit budgets" },
    ],
    bestFor: "Automating processes that live inside that suite (service cases, employee requests)",
    poorFor: "Cross-estate processes; anything the platform's DSL can't express; high-volume economics",
    buyer: "Line-of-business + platform owner",
    sources: ["04"],
  },
  {
    id: "runtime",
    num: 4,
    name: "Managed agent runtime",
    tagline: "You write the agent; the cloud runs it",
    examples:
      "Amazon Bedrock AgentCore, Microsoft Foundry Agent Service, Google Gemini Enterprise Agent Platform / Agent Runtime, Databricks Agent Bricks",
    control: 55,
    rows: [
      {
        label: "What is it?",
        value:
          "You write the agent (any framework); the cloud runs it — isolation, state, identity, observability as managed services",
      },
      { label: "Who builds it?", value: "Your engineers (or partner), on cloud primitives" },
      { label: "Time to production", value: "Months" },
      { label: "Technical control", value: "High over agent logic; medium over runtime (managed)" },
      {
        label: "Governance inherited",
        value: "Substantial and growing — identity, policy engines, guardrails, evals ship as platform services",
      },
      {
        label: "Governance required",
        value: "You still own evals content, tool permissions, HITL design, incident response",
      },
      {
        label: "Model flexibility",
        value: "High — model- and framework-agnostic is the sales pitch (AgentCore runs non-Bedrock models)",
      },
      {
        label: "Vendor lock-in",
        value: "Moderate: agent code ports; the runtime primitives (memory, identity, policy wiring) don't",
      },
      { label: "Data control", value: "Your cloud tenancy, your VPC — strongest managed-tier data position" },
      { label: "Cost model", value: "Consumption (runtime-seconds, tokens, per-service)" },
      { label: "Operational burden", value: "Medium-high: real engineering ops, minus the infrastructure toil" },
    ],
    bestFor: "Differentiating agents on proprietary data/workflows that must pass enterprise security review",
    poorFor: "Commodity use cases a platform already solves; teams without engineering depth",
    buyer: "CTO/platform engineering",
    sources: ["04"],
  },
  {
    id: "framework",
    num: 5,
    name: "Custom build on frameworks",
    tagline: "Full custom software: you own the loop",
    examples:
      "LangGraph, Microsoft Agent Framework 1.0, OpenAI Agents SDK, Google ADK, Claude Agent SDK, CrewAI, PydanticAI — on infrastructure you choose",
    control: 76,
    rows: [
      { label: "What is it?", value: "Full custom software: you own the loop, state, tools, deployment" },
      {
        label: "Who builds it?",
        value: "Your engineers; requires genuine AI engineering skill (evals, context engineering)",
      },
      {
        label: "Time to production",
        value: "Months+ (fast to demo, slow to production-harden — the classic trap)",
      },
      { label: "Technical control", value: "Maximum short of owning weights" },
      {
        label: "Governance inherited",
        value: "Almost none — you assemble identity, policy, observability, evals yourself",
      },
      { label: "Governance required", value: "Everything: the full Layer-6 stack is your problem" },
      {
        label: "Model flexibility",
        value: "Total — any model behind a gateway; the natural home of multi-model routing",
      },
      {
        label: "Vendor lock-in",
        value:
          "Lowest platform lock-in; framework churn is the real risk — bet on protocols (MCP/A2A), not frameworks",
      },
      { label: "Data control", value: "Total" },
      { label: "Cost model", value: "Raw tokens + your infrastructure + your payroll" },
      { label: "Operational burden", value: "High — you are running an AI product team" },
    ],
    bestFor: "The genuinely differentiating 10–20%: your competitive workflows, products, IP",
    poorFor:
      "Anything commodity — internal builds historically reach production half as often as bought solutions (~33% vs ~67%), though agentic coding tools are closing that gap",
    buyer: "Product engineering / AI platform team",
    sources: ["04"],
  },
  {
    id: "selfhost",
    num: 6,
    name: "Self-hosted open weights",
    tagline: "You own the model artifact and the serving stack",
    examples:
      "DeepSeek V4, Qwen 3.x, Gemma, Llama on infrastructure you control — on-prem, sovereign cloud, or rented GPUs via vLLM/SGLang",
    control: 95,
    rows: [
      { label: "What is it?", value: "You own the model artifact and the serving stack — the full-control endpoint" },
      { label: "Who builds it?", value: "ML platform engineers; the scarcest skill profile on this list" },
      { label: "Time to production", value: "Months–quarters" },
      { label: "Technical control", value: "Total, including weights (fine-tune freely, freeze versions, air-gap)" },
      {
        label: "Governance inherited",
        value: "None — plus new duties (model provenance, licence compliance, patching)",
      },
      {
        label: "Governance required",
        value:
          "Everything in #5 plus model lifecycle; note the frontier open weights are Chinese-origin — run your own procurement/security assessment",
      },
      { label: "Model flexibility", value: "Any open weights; you're ~3–9 months behind the closed frontier" },
      {
        label: "Vendor lock-in",
        value: "None at the model layer; GPU supply and serving stack become the dependencies",
      },
      { label: "Data control", value: "Absolute — the only archetype where prompts never leave your boundary" },
      {
        label: "Cost model",
        value: "Capex/GPU-rental + engineering; beats APIs only at sustained high utilisation or under sovereignty mandates",
      },
      { label: "Operational burden", value: "Highest" },
    ],
    bestFor:
      "Sovereignty/residency mandates, air-gapped environments, huge steady volumes, fine-tuned SLMs at scale — and as negotiating leverage even if never exercised",
    poorFor: "Spiky workloads, frontier-capability needs, thin teams",
    buyer: "Government/defence, regulated industries, AI-mature engineering organisations",
    sources: ["04"],
  },
  {
    id: "outcome",
    num: 7,
    name: "Outcome-bought vertical agents",
    tagline: "Buying finished work, priced per outcome (new in 2026)",
    examples: "Fin ($0.99/resolution; being acquired by Salesforce for $3.6B), Sierra, Decagon, Harvey, Devin",
    control: 10,
    rows: [
      {
        label: "What is it?",
        value:
          "Buying finished work from an agent vendor, priced per outcome — you buy resolutions/drafts/outcomes, not software",
      },
      { label: "Contract shape", value: "Distinct from #1–3: bought against a labour budget, not an IT budget" },
      {
        label: "Risk",
        value:
          "Outcome-definition gaming, deep workflow integration = high switching cost, and your process knowledge accretes in their product",
      },
    ],
    bestFor: "Well-bounded, countable service work (support, collections, documentation)",
    poorFor: "Uncountable outcomes; processes you can't cleanly delimit",
    buyer: "COO/line-of-business, against a labour budget rather than an IT budget",
    sources: ["04"],
  },
];

// What fundamentally changes from 1 → 6: five underlying dimensions (doc 04).
export const archetypeDimensions = [
  {
    dimension: "Responsibility boundary",
    at1: "Vendor owns outcomes, security, uptime",
    at6: "You own everything, including failures",
  },
  {
    dimension: "Governance inheritance",
    at1: "Arrives built-in",
    at6: "Assembled from parts, by you",
  },
  {
    dimension: "Differentiation ceiling",
    at1: "Same AI as your competitors",
    at6: "Limited only by your data and talent",
  },
  {
    dimension: "Cost shape",
    at1: "Predictable per-seat opex",
    at6: "Variable consumption + fixed engineering payroll",
  },
  {
    dimension: "Time-to-value vs durability",
    at1: "Instant but commodity",
    at6: "Slow but compounding and defensible",
  },
];

export const portfolioNote =
  "The portfolio, not the archetype, is the decision — a typical 2026 estate runs #1+#2 for the broad base, #3 or #4 for departmental automation, #5 for the differentiating few, and keeps #6 as an option. And governance effort is conserved: every step right converts inherited governance into required governance. Budget for it explicitly or watch the pilot die in security review.";

export const archetypeById = new Map(archetypes.map((a) => [a.id, a]));
