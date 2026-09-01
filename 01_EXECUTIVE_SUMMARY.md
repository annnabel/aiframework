# Executive Summary — Enterprise AI, 1 September 2026

> **The question this answers:** "What do I need to know about enterprise AI in 2026?"

---

## The Executive Thesis: seven conclusions

### 1. The technology stack has stabilised into seven layers — but vendors compete by collapsing them

Enterprise AI is best understood as a stack: **Compute → Models → Serving → Data/Context → Build/Orchestration → Control Plane → Applications**, with regulation, security, evaluation, cost and change management cutting across everything. The layers are real as a *decision map* — each layer has distinct decisions, vendors and lock-in mechanics. But they are deliberately blurred as a *market map*: hyperscalers span layers 1–6, Microsoft spans 2–7, and the model labs now sell applications (Claude Code, ChatGPT Enterprise) as well as models. **The central strategic tension of 2026 is integrated platform vs best-of-breed** — and knowing which layer a vendor is actually trying to own is the single most useful analytical skill this material teaches.

### 2. Models are becoming cheap and interchangeable; the layers around them are where lock-in now lives

The cost of a fixed level of AI capability is collapsing — Epoch AI measures the price of reaching a given benchmark falling roughly 9×–900× per year (median ~50×). All 2026 flagships are "reasoning-native" with tunable effort, and open-weight models (now led by Chinese labs) sit ~3–9 months behind the frontier. Consequence: **model choice is no longer the strategic decision — portfolio and routing are.** Well-run enterprises hold 2–3 labs plus an open-weight option, route most tokens to cheap tiers, and design for model swapping on a 6–9 month cycle. Meanwhile the sticky assets moved up the stack: your data and its permissions graph, your agent workflows, your evaluation suites, and your governance certifications. Model-layer switching is getting easier; workflow-layer switching is getting harder.

### 3. 2026 is the year of the agent — and of the agent control plane

Every major platform re-organised around agents: AWS Bedrock AgentCore (GA Oct 2025), Microsoft Foundry + **Agent 365** (the agent governance product, GA May 2026), Google's Gemini Enterprise Agent Platform (April 2026, replacing the Vertex AI brand), Salesforce Agentforce, Databricks Agent Bricks. The protocol wars largely resolved: **MCP** (agent↔tools) and **A2A** (agent↔agent) both now sit under the Linux Foundation's Agentic AI Foundation, making them the safest interoperability bets in the stack. The new battleground is the **control plane** — agent identity (Entra Agent ID, Okta), policy enforcement on tool calls, observability, evaluation and cost governance. No one sells it complete; enterprises assemble it. Whoever owns your enforcement point owns your stack's choke point — treat that choice as seriously as you once treated your identity provider.

### 4. Adoption is near-universal; value is not — and the difference is workflow redesign, not technology

McKinsey (Aug 2026, n=1,719): 88% of organisations use AI in at least one function and 80% of users report personal productivity gains — yet only 37% attribute *any* EBIT impact and only ~6% are high performers (≥5% of EBIT). The famous "95% of pilots fail" (MIT NANDA) is methodologically weak but directionally echoed by stronger sources. The evidence on what separates winners is consistent: **workflow redesign is the single biggest driver of financial impact** (only ~21% do it), CEO-level governance ownership is the strongest correlate, and buying beats building for commodity capability (~67% vs ~33% deployment success) — though agentic coding tools are eroding that last finding. Proven value concentrates in customer service (+14% productivity in the best RCT), software engineering (positive for typical tasks; contested for experts on complex codebases), and document-heavy back office. Autonomous agents at enterprise scale remain more promise than evidence; Gartner still expects >40% of agentic projects cancelled by end-2027.

### 5. The regulatory centre of gravity shifted — the EU deferred, Australia pivoted, and the near-term deadline is privacy law

Verified against EUR-Lex: **Regulation (EU) 2026/1744 (the "Digital Omnibus on AI") is real** — in force 27 July 2026, deferring the EU AI Act's standalone high-risk (Annex III) obligations to **2 December 2027** and product-embedded (Annex I) to 2 August 2028. But 2 August 2026 still mattered: **Article 50 transparency duties (label chatbots, mark synthetic content) and GPAI enforcement are live now**, prohibitions have applied since Feb 2025, and penalties reach €35m/7% of turnover. Australia abandoned its proposed mandatory guardrails (National AI Plan, Dec 2025) in favour of existing law + voluntary guidance, then pivoted again: an Office of AI (July 2026) and a promised "Australian Standards for AI" bill in early 2027. **For an Australian enterprise the binding near-term deadline is not AI law at all: automated-decision-making transparency under the Privacy Act (APPs 1.7–1.9) commences 10 December 2026**, APRA and ASIC issued AI supervisory expectations in April–May 2026, and there is no text-and-data-mining copyright exception — training on Australian content is unhedged legal risk.

### 6. AI economics are moving from seats to work — but hybrids, not pure outcomes, are winning

Pricing is converging on **base fee + consumption**, with genuine per-outcome pricing established only where outcomes are countable (customer support: Fin at $0.99/resolution, legitimised by Salesforce's $3.6B acquisition). The unit-economics chain every executive should internalise: **token cost → task cost → process cost → business value** — with routing, caching (~90% discounts) and batching (50%) as the levers that separate a well-run AI P&L from a runaway one. The "service-as-software" thesis (AI priced against labour budgets, not software budgets) now has scaled proof points — Harvey ~$200M ARR, Sierra ~$200M ARR, Cursor $2B ARR — but AI-native gross margins (~50–60%) remain structurally below SaaS, and whether inference deflation fixes that is genuinely unresolved.

### 7. Governance maturity badly lags adoption — and that gap, not model capability, is the main brake

Only 21% of organisations report mature agentic-AI governance while ~74% plan agent adoption within two years (Deloitte, n=3,235). Prompt injection remains architecturally unsolved — the working defence is containment (least privilege, sandboxing, human approval on consequential actions, never combining private data + untrusted input + an exfiltration path in one agent). Confirmed incidents (EchoLeak, the Salesloft Drift breach, a malicious MCP server, the first largely AI-orchestrated espionage campaign) have moved risk from hypothetical to actuarial. The governance stack that leaders converge on: agent inventory + identity, least-privilege delegation, policy-as-code at the tool-call level, trajectory-level evals, human gates on irreversible actions, budget caps, wrapped in ISO/IEC 42001 + NIST AI RMF. **The strategic reframe: governance is not a compliance tax — it is the production-enablement layer.** The enterprises that ship agents at scale are the ones that built evals and controls first.

---

## If you only remember 10 things, remember these

1. **Think in seven layers, and always ask which layer a vendor is trying to own.** Most vendor confusion dissolves when you place the product on the stack.
2. **The model is the least sticky part of your stack.** Design for swapping (evals + gateway + portfolio); the real lock-in is data gravity, agent workflows, evals and governance.
3. **Capability per dollar falls ~10–50× per year, but reasoning agents consume more tokens per task.** Budget per *task completed*, not per token — and make routing policy a management decision.
4. **RAG gives models knowledge; fine-tuning shapes behaviour; context engineering now carries most of the load; almost nobody should fine-tune first.** Sequence: prompt → retrieval → fine-tune → distil, driven by evals.
5. **MCP and A2A won the protocol war** (both Linux Foundation-governed); in agentic commerce, OpenAI/Stripe's ACP and Google/Shopify's UCP *compete*, with FIDO-governed AP2 as the payments-trust layer beneath both. Bet on protocols, not frameworks.
6. **The six build archetypes — embedded SaaS AI → assistant seats → platform configuration → managed runtime → custom framework build → self-hosted open weights** — are really one dial: control and differentiation rise as you move right; inherited governance and speed fall. (A seventh emerged in 2026: buying outcome-priced vertical agents.)
7. **Value comes from workflow redesign, not tool deployment.** 88% adoption, 37% any EBIT impact, ~6% high performers. Fewer, bigger bets; redesign the process; put the CEO on governance.
8. **Agents are employees from a risk perspective:** they need identity, permissions, budgets, supervision and offboarding. If a vendor can't show you the agent's identity and audit trail, it isn't enterprise-ready.
9. **For Australia: comply with existing law now** (Privacy Act ADM transparency by 10 Dec 2026, APRA/ASIC expectations if regulated, no TDM copyright exception), **treat the EU AI Act's live provisions as your export condition** (transparency now; high-risk by Dec 2027), and watch the early-2027 Australian AI bill.
10. **Anchor on ISO/IEC 42001 + NIST AI RMF.** They bridge every jurisdiction, are becoming procurement requirements, and turn "responsible AI" from a slogan into an auditable management system.

---

## How to use this package

- **Tonight-before-a-meeting:** read [00_ONE_PAGE_CHEAT_SHEET](00_ONE_PAGE_CHEAT_SHEET.md).
- **Building the mental model:** 02 (stack) → 03 (vocabulary) → 04 (archetypes) → 05 (decisions) → 06 (architecture walkthrough).
- **Preparing to challenge a vendor or architect:** 07 (vendor landscape) + 11 (questions playbook).
- **Board/risk conversations:** 08 (governance & regulation) + 10 (failure modes) + 09 (economics).
- **Checking any claim:** 13 (source register) and 14 (fact check — including where the original brief was right, wrong, or outdated).

Every statistic in this package is dated and attributed; where credible sources disagree (adoption levels, coding productivity, margin trajectories), the disagreement is preserved rather than smoothed over.
