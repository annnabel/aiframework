# The Build Archetypes — How Enterprises Actually Acquire AI

> **Why this document exists:** "Should we build or buy AI?" is the wrong question — there are (at least) six distinct ways to acquire AI capability, and each trades speed and inherited governance against control and differentiation. Most enterprises run several at once. The framework below was validated against the September 2026 market; product names are corrected to current, and a seventh archetype that emerged in 2026 is added at the end.

**2026 validation verdict:** the six-archetype framework holds up. Corrections applied: Google's offerings are now the **Gemini Enterprise Agent Platform** (the Vertex AI brand was retired in April 2026; Agent Engine became Agent Runtime); "Azure AI Foundry" is now **Microsoft Foundry**; archetype 5 gains **Microsoft Agent Framework** (Semantic Kernel + AutoGen, merged) and the **Claude Agent SDK**; and outcome-priced vertical agents have grown large enough to be their own archetype.

---

## The dial, before the detail

Moving from archetype 1 → 6 turns **one underlying dial**: how much of the system you own. Everything else follows from it.

```
  1 Embedded → 2 Seats → 3 Configure → 4 Managed runtime → 5 Framework build → 6 Self-host
  ─────────────────────────────────────────────────────────────────────────────────────────→
  Speed, inherited governance, vendor accountability     DECREASE →
  Control, differentiation, required skill, owned risk   INCREASE →
```

---

## Archetype 1 — Embedded AI (AI inside SaaS you already own)

*AI features switched on inside existing software: Salesforce Einstein features, SAP Joule, Workday AI, Canva AI, your HRIS's screening assistant.*

| Dimension | Answer |
|---|---|
| What is it? | Vendor-built AI features inside SaaS you already run |
| Who builds it? | The SaaS vendor; you configure toggles at most |
| Time to production | Days — it arrives in a release |
| Technical control | Minimal: on/off, some settings |
| Governance inherited | High — vendor's security, hosting, model choices |
| Governance required | Inventory + review: know what turned itself on, what data it touches (many "AI risk surprises" are here) |
| Model flexibility | None — vendor's model, vendor's roadmap |
| Vendor lock-in | Adds AI stickiness to existing SaaS lock-in |
| Data control | Your data stays in that SaaS; check AI-specific data terms (training use, sub-processors) |
| Cost model | Bundled, or per-seat uplift |
| Operational burden | Near zero |
| Best use cases | Commodity productivity in commodity processes; fast wins with no team |
| Poor use cases | Anything differentiating or cross-system |
| Typical buyer | Application owners; often nobody — it just appears (which is itself the risk) |

## Archetype 2 — Assistant seats

*General-purpose AI assistants per employee: **Microsoft 365 Copilot** ($30/user/mo), **ChatGPT Enterprise** (unpublished; ~$45–75/seat reported), **Claude Enterprise** ($20/seat + usage), **Gemini Enterprise**.*

| Dimension | Answer |
|---|---|
| What is it? | A licensed AI workspace per person, increasingly with light agent features |
| Who builds it? | The lab/suite vendor; you deploy, connect data sources, and drive adoption |
| Time to production | Weeks (procurement + SSO + data connectors + enablement) |
| Technical control | Low: connectors, admin policies, custom instructions/light agents |
| Governance inherited | High — enterprise tiers bring SSO, no-training-on-your-data terms, audit logs, DLP hooks |
| Governance required | Acceptable-use policy, data-connector scoping, shadow-AI displacement, usage analytics |
| Model flexibility | Vendor's models only (Copilot now mixes OpenAI + Anthropic under the hood) |
| Vendor lock-in | Moderate: habits and connectors, not architecture — the most reversible archetype after #1 |
| Data control | Data flows to vendor cloud under contract; retrieval respects your permissions if configured properly |
| Cost model | Per-seat (with premium/usage tiers appearing) |
| Operational burden | Low; the real work is change management |
| Best use cases | Broad-population productivity; the individual gains that 80% of users report |
| Poor use cases | Process automation, anything needing custom workflow or P&L attribution |
| Typical buyer | CIO/CHRO; the "default yes" purchase of 2025–26 |

## Archetype 3 — Configure on a platform (low-code agents)

*Building agents by configuration inside a business platform: **Microsoft Copilot Studio** (consumption credits), **Salesforce Agentforce** ($2/conversation, Flex Credits, or per-user), **IBM watsonx Orchestrate**, ServiceNow AI Agents.*

| Dimension | Answer |
|---|---|
| What is it? | Declarative/low-code agent building on a suite's data, tools and trust layer |
| Who builds it? | Business technologists + IT; consultancies love this tier |
| Time to production | Weeks–months |
| Technical control | Medium: flows, topics, tool wiring — within the platform's DSL |
| Governance inherited | High — platform trust layer, tenant identity, audit |
| Governance required | Agent lifecycle (who owns which agent), tool permission review, sprawl control — configuration ≠ safe |
| Model flexibility | Limited; platform-selected models with some choice (Agentforce partners with Anthropic for regulated industries) |
| Vendor lock-in | **High — this is the sticky tier:** flows and agents are platform-DSL artifacts that don't port |
| Data control | Strongest where your data already lives in that platform (data gravity working *for* you) |
| Cost model | Consumption credits — opaque conversion rates (1–200+ credits/interaction) are the FinOps trap |
| Operational burden | Medium: monitoring, versioning, credit budgets |
| Best use cases | Automating processes that live inside that suite (service cases, employee requests) |
| Poor use cases | Cross-estate processes; anything the platform's DSL can't express; high-volume economics |
| Typical buyer | Line-of-business + platform owner |

## Archetype 4 — Managed agent runtime

*Cloud infrastructure purpose-built to run your custom agents: **Amazon Bedrock AgentCore** (Runtime, Gateway, Identity, Memory, Policy, Evaluations…), **Microsoft Foundry Agent Service**, **Google Gemini Enterprise Agent Platform / Agent Runtime** (ex-Vertex Agent Builder/Engine), Databricks Agent Bricks.*

| Dimension | Answer |
|---|---|
| What is it? | You write the agent (any framework); the cloud runs it — isolation, state, identity, observability as managed services |
| Who builds it? | Your engineers (or partner), on cloud primitives |
| Time to production | Months |
| Technical control | High over agent logic; medium over runtime (managed) |
| Governance inherited | Substantial and growing — identity, policy engines, guardrails, evals ship as platform services |
| Governance required | You still own evals content, tool permissions, HITL design, incident response |
| Model flexibility | High — model- and framework-agnostic is the sales pitch (AgentCore runs non-Bedrock models) |
| Vendor lock-in | Moderate: agent code ports; the runtime primitives (memory, identity, policy wiring) don't |
| Data control | Your cloud tenancy, your VPC — strongest managed-tier data position |
| Cost model | Consumption (runtime-seconds, tokens, per-service) |
| Operational burden | Medium-high: real engineering ops, minus the infrastructure toil |
| Best use cases | Differentiating agents on proprietary data/workflows that must pass enterprise security review |
| Poor use cases | Commodity use cases a platform already solves; teams without engineering depth |
| Typical buyer | CTO/platform engineering |

## Archetype 5 — Custom build on frameworks

*Open SDKs + raw APIs: **LangGraph**, **Microsoft Agent Framework 1.0**, **OpenAI Agents SDK**, **Google ADK**, **Claude Agent SDK**, **CrewAI**, **PydanticAI** — deployed on infrastructure you choose.*

| Dimension | Answer |
|---|---|
| What is it? | Full custom software: you own the loop, state, tools, deployment |
| Who builds it? | Your engineers; requires genuine AI engineering skill (evals, context engineering) |
| Time to production | Months+ (fast to demo, slow to production-harden — the classic trap) |
| Technical control | Maximum short of owning weights |
| Governance inherited | Almost none — you assemble identity, policy, observability, evals yourself |
| Governance required | Everything: the full Layer-6 stack is your problem |
| Model flexibility | Total — any model behind a gateway; the natural home of multi-model routing |
| Vendor lock-in | Lowest platform lock-in; **framework churn is the real risk** — bet on protocols (MCP/A2A), not frameworks |
| Data control | Total |
| Cost model | Raw tokens + your infrastructure + your payroll |
| Operational burden | High — you are running an AI product team |
| Best use cases | The genuinely differentiating 10–20%: your competitive workflows, products, IP |
| Poor use cases | Anything commodity — internal builds historically reach production half as often as bought solutions (~33% vs ~67%), though agentic coding tools are closing that gap |
| Typical buyer | Product engineering / AI platform team |

## Archetype 6 — Self-hosted open weights

*Running open-weight models (DeepSeek V4, Qwen 3.x, Gemma, Llama) on infrastructure you control — on-prem, sovereign cloud, or rented GPUs via vLLM/SGLang or managed open-model providers.*

| Dimension | Answer |
|---|---|
| What is it? | You own the model artifact and the serving stack — the full-control endpoint |
| Who builds it? | ML platform engineers; the scarcest skill profile on this list |
| Time to production | Months–quarters |
| Technical control | Total, including weights (fine-tune freely, freeze versions, air-gap) |
| Governance inherited | None — plus new duties (model provenance, licence compliance, patching) |
| Governance required | Everything in #5 plus model lifecycle; note the frontier open weights are Chinese-origin — run your own procurement/security assessment |
| Model flexibility | Any open weights; you're ~3–9 months behind the closed frontier |
| Vendor lock-in | None at the model layer; GPU supply and serving stack become the dependencies |
| Data control | Absolute — the only archetype where prompts never leave your boundary |
| Cost model | Capex/GPU-rental + engineering; beats APIs only at sustained high utilisation or under sovereignty mandates |
| Operational burden | Highest |
| Best use cases | Sovereignty/residency mandates, air-gapped environments, huge steady volumes, fine-tuned SLMs at scale — and as *negotiating leverage* even if never exercised |
| Poor use cases | Spiky workloads, frontier-capability needs, thin teams |
| Typical buyer | Government/defence, regulated industries, AI-mature engineering organisations |

## Archetype 7 (2026 addition) — Outcome-bought vertical agents

*Buying finished work from an agent vendor, priced per outcome: Fin ($0.99/resolution; being acquired by Salesforce for $3.6B), Sierra, Decagon, Harvey, Devin.*

Distinct from #1–3 in contract shape: you buy *resolutions/drafts/outcomes*, not software. **Best:** well-bounded, countable service work (support, collections, documentation). **Risk:** outcome-definition gaming, deep workflow integration = high switching cost, and your process knowledge accretes in their product. **Buyer:** COO/line-of-business, against a labour budget rather than an IT budget.

---

## What fundamentally changes from 1 → 6

The six categories reduce to **five underlying dimensions** — score any proposal on these rather than debating labels:

| Dimension | At archetype 1 | At archetype 6 |
|---|---|---|
| **Responsibility boundary** | Vendor owns outcomes, security, uptime | You own everything, including failures |
| **Governance inheritance** | Arrives built-in | Assembled from parts, by you |
| **Differentiation ceiling** | Same AI as your competitors | Limited only by your data and talent |
| **Cost shape** | Predictable per-seat opex | Variable consumption + fixed engineering payroll |
| **Time-to-value vs durability of value** | Instant but commodity | Slow but compounding and defensible |

Two practical corollaries: **(a)** the portfolio, not the archetype, is the decision — a typical 2026 estate runs #1+#2 for the broad base, #3 or #4 for departmental automation, #5 for the differentiating few, and keeps #6 as an option; **(b)** governance effort is conserved — every step right converts *inherited* governance into *required* governance. Budget for it explicitly or watch the pilot die in security review.

---

## The knowledge vs behaviour question

The heuristic under audit: **"RAG = knowledge, fine-tuning = behaviour."**

**Verdict: MOSTLY TRUE as first-order guidance; incomplete in three ways.**

- **Where it's accurate:** volatile, permissioned, citable facts belong in retrieval (instantly updatable, access-controlled, attributable). Durable behaviours — output format, tone, domain register, tool-calling style — are what weight updates encode well. Fine-tuning is a *poor* way to inject facts: limited capacity, no citations, instant staleness.
- **Where it misleads:** (1) In 2026, **context engineering carries most of the behaviour load** — strong instruction-following and native structured output mean fine-tuning is the *last* resort even for behaviour. (2) The dichotomy omits fine-tuning's biggest enterprise use: **cost compression** — distilling a proven frontier-model workflow into a small model. (3) Production systems **combine** the approaches (base model + retrieval for facts + optional LoRA for schema/tone/cost), rather than choosing.
- **What decides it:** evals. Separate retrieval metrics (did the right facts arrive?) from generation metrics (was the answer faithful and well-formed?). Missing-information failures → fix retrieval. Wrong-format/wrong-register despite correct context → consider tuning. Reasoning failures with verifiable outcomes → RFT candidate. **Build the eval harness before choosing the technique.**

### The decision tree

```
Need NEW KNOWLEDGE in answers?         → Retrieval (RAG). Fresh, citable, permissioned.
                                          Only consider tuning if knowledge is small, stable, and latency-critical.

Need DIFFERENT BEHAVIOUR?              → 1. System prompt / context engineering (solves most cases)
                                          2. Few-shot examples in context
                                          3. Fine-tune (LoRA) only if evals still fail on format/tone/register

Need BETTER TOOL USE / agent skill?    → 1. Better tool definitions + context engineering
                                          2. RFT against verifiable outcomes (needs eval infrastructure)

Need LOWER LATENCY / COST?             → 1. Route to a smaller model tier + caching + batching
                                          2. Distil the proven workflow into an SLM
                                          3. Self-host only at sustained volume or under mandate

Need STRONGER CONSISTENCY?             → 1. Structured output (native JSON schema) — free
                                          2. Workflows instead of agents (remove degrees of freedom)
                                          3. Fine-tune for schema adherence as last resort

In every branch: exhaust the cheaper lever first, and let evals — not vendor advice — tell you when to escalate.
```
