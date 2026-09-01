# The Vendor Landscape — Positioning, Not Feature Lists

> **Why this document exists:** vendor comparisons age in weeks; vendor *strategies* persist for years. For each major player: where they sit on the stack, what they're trying to own, what they deliberately commoditise, what locks you in, and what they leave to others. Ends with the marketing translator.

**One market fact to anchor everything** (Menlo Ventures survey, Nov 2025, n≈500 — survey-based, disputed by OpenAI): enterprise LLM **API spend** share flipped in two years to **Anthropic 40% / OpenAI 27% / Google 21%** (from 12/50/7 in 2023), with Anthropic at 54% of coding. OpenAI counters on *seats* (7M+ workplace seats) and price cuts. Reported run-rates (press, Aug 2026): Anthropic ~$65B annualised, OpenAI ~$40B. Treat the precision loosely; the direction — a genuinely multi-vendor model market — is the strategic fact.

---

## Layer-by-layer positioning grid

| Vendor | Compute | Models | Serving | Data/Context | Build/Orch | Control plane | Apps |
|---|---|---|---|---|---|---|---|
| **NVIDIA** | ●●● | ○ (open models) | ● (via partners) | — | ● (NeMo) | ● (guardrails) | — |
| **Microsoft** | ●● (Maia, Azure) | ● (MAI + OpenAI tie) | ●●● (Foundry) | ●● (Fabric/OneLake) | ●●● (Copilot Studio, Agent Framework) | ●●● (Agent 365, Entra, Purview) | ●●● (M365 Copilot) |
| **AWS** | ●●● (Trainium) | ● (Nova) | ●●● (Bedrock) | ●● | ●●● (AgentCore) | ●● (AgentCore Identity/Policy) | ● (Kiro, Quick) |
| **Google** | ●●● (TPU) | ●●● (Gemini) | ●●● (GEAP) | ●● (BigQuery) | ●● (ADK, A2A) | ●● (Agent Gateway/Registry) | ●● (Gemini Enterprise, Workspace) |
| **OpenAI** | ● (Stargate deals) | ●●● (GPT-5.6) | ●● (API) | ● | ●● (Agents SDK, AgentKit) | ● (Frontier) | ●●● (ChatGPT Enterprise) |
| **Anthropic** | ● (compute deals) | ●●● (Claude) | ●● (API + all 3 clouds) | ● | ●● (Agent SDK, MCP) | ● (admin/compliance APIs) | ●● (Claude, Claude Code) |
| **Databricks** | — | ● | ●● (Mosaic) | ●●● (lakehouse, Unity) | ●● (Agent Bricks) | ●● (Unity AI Gateway, MLflow) | ● |
| **Salesforce** | — | — | — | ●● (CRM, Data Cloud) | ●● (Agentforce) | ●● (Agent Fabric) | ●●● (CRM + Fin) |

●●● = trying to own · ●● = strong play · ● = present · — = leaves to others

---

## Infrastructure

### NVIDIA
**Where they play:** the compute layer, plus software tentacles up-stack (CUDA, NeMo, inference microservices). **Trying to own:** the *system* — rack-scale platforms (NVL72), networking, CUDA — not just chips; consolidated inference silicon by absorbing Groq (~$20B, Dec 2025). **Commoditises:** nothing willingly. **Locks you into:** CUDA ecosystem; multi-year supply relationships. **Leaves to others:** models, applications, your data. **Watch:** custom hyperscaler silicon (TPU v7, Trainium3, Maia 200) eroding the inference share — that erosion is what funds the token price cuts you enjoy.

### Neoclouds (CoreWeave, Nebius, Lambda, Crusoe)
**Role for an enterprise:** price/availability release valve for GPU capacity; you'll meet them mostly *through* your vendors. Financially levered (debt-financed GPUs, circular NVIDIA financing) — a systemic-risk watch item, not a procurement one.

## Models

### OpenAI
**Trying to own:** the employee-facing AI seat and the "agent workforce" (Frontier platform, Feb 2026), *without* owning a cloud. **Commoditises:** mid-tier intelligence (aggressive GPT-5.6 price cuts). **Locks you into:** its API surface and consumer-habit gravity; no data estate to hold you. **Leaves to others:** infrastructure (Azure/Oracle/Stargate), your data platform. **Position:** consumer king; enterprise API share slipping; countering with seats, price, and enterprise packaging.

### Anthropic
**Trying to own:** the model + agent harness layer (Claude, Claude Code, Agent SDK, MCP authorship) — monetised through *everyone's* platform (the only frontier family on all three clouds). **Commoditises:** tool integration itself (donating MCP to the Linux Foundation). **Locks you into:** the least of the majors structurally — the pull is capability and the coding/agent ecosystem. **Leaves to others:** clouds, data platforms, most vertical apps. **Position:** enterprise API leader; the "safe/enterprise-grade" brand.

### Open-weight ecosystem (DeepSeek, Qwen, Kimi, Mistral, Gemma)
**Strategic function for you:** the credible exit option that disciplines every other vendor's pricing — worth maintaining even if never exercised. The frontier open weights are now **Chinese-led** (DeepSeek V4 is MIT-licensed), which puts a procurement/security judgement inside what used to be a purely technical choice; Mistral is the European alternative; Meta's open-weights leadership has faded.

## Platforms

### Microsoft
**Trying to own:** the **employment layer for agents** — every agent in your estate (including third-party) getting an Entra identity, a Purview policy, a Defender signal and a ~$15/seat Agent 365 registration; plus the productivity surface (M365 Copilot) and dev platform (Foundry). **Commoditises:** models (now genuinely multi-model — OpenAI *and* Claude in Foundry). **Locks you into:** the deepest interlock in the industry: identity + data + productivity + governance. **Leaves to others:** frontier model R&D (mostly), vertical depth. **The question to ask them:** what does Agent 365 actually see and control for agents *not* built on Microsoft?

### AWS
**Trying to own:** the **agent infrastructure layer** (AgentCore: runtime, gateway, identity, memory, policy, evals) while staying studiedly neutral on models (~100 in Bedrock; Anthropic as flagship partner). **Commoditises:** models and frameworks ("bring any"). **Locks you into:** AgentCore primitives, IAM integration, and your EDP commit. **Leaves to others:** the productivity suite, business applications. **The question:** which AgentCore primitives (memory, policy wiring) would we rebuild if we left?

### Google
**Trying to own:** the full stack TPU→Workspace, with the price/performance frontier (Gemini) as the wedge; strong open-protocol posture (A2A, ADK). **Commoditises:** inference pricing. **Locks you into:** BigQuery/Workspace data gravity; moderate otherwise. **Watch:** three renames in two years (Agentspace → Gemini Enterprise; Vertex AI → Gemini Enterprise Agent Platform) — capability is real, brand stability isn't. **The question:** which of today's names survives to our renewal date?

### Databricks (and Snowflake)
**Trying to own:** governed data + the evaluation/quality loop — "AI is good because your data is" (Agent Bricks, Unity AI Gateway, MLflow). **Commoditises:** models (all majors + open weights served). **Locks you into:** Unity Catalog metadata and lakehouse gravity (mitigated by open formats). **Leaves to others:** productivity surfaces, frontier models. Snowflake mirrors the strategy (Cortex, AI Gateway, Palantir partnership) from the warehousing side. **The question:** if the agents live where the data lives, who governs the agents that *don't*?

## Applications

### Salesforce
**Trying to own:** the customer-workflow agent layer: Agentforce (~$800M ARR, +169%), the **Agent Fabric** cross-vendor control plane (via MuleSoft — note: *Salesforce's* product, a common misattribution), and outcome pricing via the $3.6B Fin acquisition. **Commoditises:** models (Anthropic partnership for regulated industries). **Locks you into:** CRM data gravity + platform-DSL agents + now three simultaneous pricing models. **The question:** show the resolution-rate math on *our* case mix, not the marketing benchmark.

### Vertical AI leaders (Harvey, Sierra, Abridge, Decagon…)
**Trying to own:** one profession's workflow so deeply that they price against its labour budget (service-as-software). Real scale now (Harvey ~$200M ARR; Sierra ~$200M). **Locks you into:** workflow embedment — your process knowledge accretes in their product. **Watch:** the endgame is consolidation — incumbents are *buying* the winners (Salesforce–Fin; SpaceX–Cursor), not out-building them.

### SAP, ServiceNow, IBM
SAP Joule: ERP-embedded agents, notably **closed** architecture (external agents must route through Joule) — against the market's open-protocol direction. ServiceNow: the ops-side agent estate. IBM watsonx Orchestrate: relaunched (May 2026) as an "agentic control plane" — competing for the same cross-estate governance layer as Agent 365/Agent Fabric, with consulting attach.

---

## The Vendor Marketing Translator

| Vendor says | Usually means | The strategic question to ask |
|---|---|---|
| **"Agentic AI"** | Anything from a chatbot with one tool to genuine autonomous loops; Gartner found only ~130 of thousands of "agentic" vendors were real ("agent washing") | "Show me the agent deciding its own control flow on our data — or is this a workflow? (A workflow is fine; label it honestly.)" |
| **"AI platform"** | We bundle layers 3–6 so you buy them together | "Which layers am I buying, which am I *marrying*, and what's the exit cost per layer?" |
| **"Agent fabric" / "control plane"** | Registry + identity + policy for agents — including, allegedly, other vendors' | "Which third-party agents can you *actually* inventory, permission and kill today — demo it" |
| **"Copilot"** | Assistive AI, human does the work; increasingly rebranded "agent" without the autonomy changing | "What can it do *without* a human — precisely — and what governs that?" |
| **"Autonomous agent"** | Runs multiple steps unattended in a sandbox; near-zero evidence of unsupervised consequential action at enterprise scale | "What's the human-in-the-loop ratio in your reference customers' *production* deployments?" |
| **"AI operating system"** | We want to be the layer everything else must integrate through | "Who else has shipped on this 'OS', and what happens to my apps if I leave it?" |
| **"Enterprise context" / "grounded in your data"** | Retrieval over the data we can index — permissions handling varies wildly | "Walk me through how document permissions flow into agent answers, and what a mis-permissioned query returns" |
| **"Responsible AI"** | We have principles and content filters | "Which controls are *enforced at runtime* vs written in a PDF? Map them to NIST AI RMF / ISO 42001" |
| **"AI governance"** | Dashboards; sometimes real policy enforcement | "Where is the enforcement point — can your policy engine *block* a non-compliant tool call, or just log it?" |
| **"Model-agnostic" / "BYOM"** | The model slot is swappable; orchestration, memory, evals and governance usually aren't | "If I swap models tomorrow, what re-tuning do my prompts/evals need — and can model access be revoked from your side?" |

---

## So what? — the three durable reads

1. **Nobody is neutral.** Every vendor commoditises the layers it doesn't own to funnel value to the layer it does. Map the pitch to the grid above before evaluating features.
2. **The control plane is the land grab of 2026–27.** Microsoft, AWS, Google, Salesforce, Databricks, Snowflake and IBM are all selling "govern all your agents, even theirs." Choose deliberately — it's your future choke point.
3. **Multi-vendor is the equilibrium, not a transition.** Model-market share flipped once in two years and can flip again; the winning enterprise posture is a primary platform chosen by data gravity, a second model lab always live, MCP-first tooling, and portable evals.
