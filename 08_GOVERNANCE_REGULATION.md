# Governance & Regulation — Evidence-First, as at 1 September 2026

> **Why this document exists:** regulation is where secondhand claims are most dangerous. Everything below was verified against primary sources (EUR-Lex, European Commission, pm.gov.au, industry.gov.au, OAIC, APRA, DTA) on 1 September 2026, with status labels: **IN FORCE / ADOPTED-NOT-YET-APPLICABLE / PROPOSED / UNCERTAIN**. Lens: an Australian enterprise with EU exposure.

---

## 1. The EU AI Act — including the Digital Omnibus (verified)

**The headline, verified against EUR-Lex (CELEX:32026R1744):** the claim supplied in the original brief is **TRUE**. *Regulation (EU) 2026/1744* — the "Digital Omnibus on AI," amending the AI Act — was adopted 8 July 2026, published in the Official Journal 24 July 2026, and **entered into force 27 July 2026**, six days before the original high-risk deadline. It defers standalone **Annex III high-risk obligations from 2 August 2026 to 2 December 2027**, and product-embedded **Annex I high-risk to 2 August 2028** (nuance: Annex I's original date was 2 Aug *2027*, not 2026). A key driver of the deferral: **zero harmonised standards** have been published by CEN-CENELEC JTC21 — the technical rulebook firms need to demonstrate conformity doesn't exist yet (prioritised deliverables targeted Q4 2026).

**Equally important — what the Omnibus did *not* move.** 2 August 2026 still activated real obligations. The full timeline:

| Obligation | Status at 1 Sep 2026 | Detail |
|---|---|---|
| **Prohibited practices** (Art 5: social scoring, manipulative techniques, most real-time biometric ID…) | **IN FORCE** since 2 Feb 2025 | Penalties to **€35m or 7%** of global turnover |
| **AI literacy** (Art 4) | **IN FORCE — softened** | Omnibus reduced "ensure" to "take measures to support" |
| **GPAI model obligations** (transparency, copyright policy, systemic-risk duties ≥10²⁵ FLOP) | **IN FORCE** since 2 Aug 2025 (pre-Aug-2025 models: until 2 Aug 2027) | GPAI Code of Practice operational (voluntary; adherence mitigates) |
| **Commission GPAI enforcement powers** | **ACTIVE** since 2 Aug 2026 | Fines to €15m/3% |
| **Art 50 transparency** — disclose chatbots, mark synthetic content, label deepfakes | **IN FORCE** since 2 Aug 2026 | Grace to 2 Dec 2026 for machine-readable marking on generative systems already on the market pre-Aug 2026 |
| **Two new prohibitions** (AI generating NCII / CSAM — added by Omnibus) | **ADOPTED — applicable 2 Dec 2026** | |
| **Annex III standalone high-risk** (hiring, credit, education, essential services, critical infrastructure…) | **DEFERRED to 2 Dec 2027** | Changed by Omnibus; risk mgmt, data governance, logging, human oversight, conformity assessment |
| **Annex I product-embedded high-risk** | **DEFERRED to 2 Aug 2028** | Machinery moved to sectoral treatment |
| **Harmonised standards** (JTC21) | **NOT PUBLISHED — UNCERTAIN timing** | Anchor on ISO 42001 + NIST AI RMF meanwhile |

The Omnibus also narrowed Article 6 ("safety component" scope), extended SME documentation relief, added a bias-detection data-processing basis, and clarified AI Office competence.

**Extraterritorial scope (unchanged):** the Act reaches providers placing systems on the EU market wherever established, and providers/deployers outside the EU **where the system's output is used in the EU**. An Australian enterprise serving EU users or selling AI-enabled products into the EU is in scope; non-EU providers of Annex III high-risk systems will need an EU authorised representative from Dec 2027.

**What this means in practice:** label your chatbots and mark synthetic content *now* if outputs reach the EU; if you provide AI for hiring, credit or similar (Annex III), you received a 16-month reprieve — a runway to build conformity, not a cancellation; if you build on GPAI models, your *providers* carry live obligations already.

---

## 2. Australia — the actual state of play

The arc since 2024 is three pivots, and it matters because much circulating commentary is a pivot behind:

1. **Sept 2024:** Voluntary AI Safety Standard (10 guardrails) + a proposals paper for **mandatory guardrails** on high-risk AI.
2. **Dec 2025 — pivot one:** the **National AI Plan abandoned the mandatory-guardrails approach** — existing technology-neutral laws + voluntary guidance + a funded **Australian AI Safety Institute** (A$29.9m). The 10 guardrails were superseded (Oct 2025) by the National AI Centre's **"Guidance for AI Adoption"** — six essential practices.
3. **15 July 2026 — pivot two:** the PM announced an **Office of AI** in PM&C (operational immediately) and plans to **legislate "Australian Standards for AI"** — covering AI data centres (energy/water), AI training, and copyright protections for creators — **bill expected early 2027** (scope beyond those areas UNCERTAIN; government frames it as the "first legislated national AI framework worldwide").

**What an Australian enterprise must actually comply with today (all IN FORCE):**

| Obligation | Source | Notes |
|---|---|---|
| Privacy Act / APPs applied to AI | OAIC (guidance Oct 2024, maintained) | OAIC actively applies existing APPs to AI training and use |
| **Statutory tort for serious invasions of privacy** | In force since 10 June 2025 | Litigation risk for AI misuse of personal information |
| Australian Consumer Law | ACCC | Misleading AI claims and AI-generated misrepresentations |
| Anti-discrimination law, directors' duties, WHS | Various | Technology-neutral, fully applicable to AI-driven decisions |
| **APRA expectations** (regulated entities) | Letter to industry, **30 Apr 2026** | Board AI literacy, AI supply-chain visibility (3rd/4th party), controls for agentic workflows, fallbacks where AI supports critical operations; sits on CPS 230/234 |
| **ASIC expectations** (licensees) | Letter, **8 May 2026** | Cyber resilience vs AI-enabled threats; directors' duties already cover AI |
| **Copyright — no TDM exception** | A-G decision, 26 Oct 2025 | Training on Australian works without licence = unresolved legal risk; licensing under CAIRG consultation |
| DTA AI policy (if supplying government) | Updated, effective 15 Dec 2025 | Mandatory impact assessments, use-case registers, accountable officers — flows into procurement |

**The near-term hard deadline — privacy, not AI law:** **APPs 1.7–1.9 commence 10 December 2026** — privacy policies must disclose the kinds of personal information used in, and decisions made by, **automated decision-making** that significantly affects rights or interests. Action now: inventory every ADM use (including AI-assisted decisions) and update privacy policies. OAIC guidance is due before commencement.

**Watch for 2027:** the Australian Standards for AI bill (early 2027); CAIRG copyright-licensing outcomes; AISI-driven targeted reforms.

---

## 3. US and global (brief)

- **Colorado AI Act:** rewritten and re-delayed — now **1 Jan 2027** and stripped from a duty-of-care regime to a disclosure law. **California SB 53** (frontier-developer transparency) **in force since 1 Jan 2026**. A Dec 2025 federal executive order pushes preemption of state AI laws — **no enacted federal preemption exists**; US compliance remains a state patchwork under federal challenge.
- **The bridge across all jurisdictions:** **ISO/IEC 42001** (certifiable AI management systems — increasingly a procurement requirement) + **NIST AI RMF** (+ Generative AI Profile). Both map cleanly onto Australia's six practices and the EU Act's risk-management expectations. If you build your governance on these two, every regime becomes a delta, not a rebuild.

---

## 4. Operating governance — what "being able to run it safely" means in 2026

Regulation sets the floor; these are the practices that actually keep agentic AI safe (all verified as 2026 state of practice):

**The maturity gap is the headline:** ~74% of organisations plan agent adoption within two years; **21% report mature agentic governance** (Deloitte, n=3,235). Adoption is outrunning control.

**The threat model is settled, the solution isn't:** OWASP now maintains two Top-10s — LLM Applications 2026 (**prompt injection still #1**; excessive agency jumped to #3) and Agentic Applications (ASI01–10: goal hijack, tool misuse, identity abuse, supply chain, memory poisoning…). **Prompt injection remains architecturally unsolved.** The working defence is *containment*, not filtering: least-privilege tools, sandboxing, human gates on consequential actions, and never combining the **lethal trifecta** (private data + untrusted input + an exfiltration path) in one agent. Real incidents anchor this: EchoLeak (zero-click Copilot exfiltration, CVE-2025-32711), the Salesloft Drift OAuth breach (700+ orgs), the first confirmed malicious MCP server on npm (~300 orgs), a coding agent deleting a production database, and the first largely AI-orchestrated espionage campaign (GTG-1002, MITRE C0062).

**The seven-control stack that leading enterprises converge on:**

1. **Agent inventory + identity** — every agent a first-class directory identity with an owner (Entra Agent ID GA Apr 2026; Okta/Auth0 agent products; AgentCore Identity). No identity → no permissioning, audit or revocation.
2. **Least-privilege delegation** — short-lived, task-scoped, *user-bound* credentials (on-behalf-of token exchange); no standing secrets.
3. **Policy-as-code at the tool call** — deterministic, default-deny engines (Cedar/OPA) evaluating every tool invocation.
4. **Trajectory-level evals + observability** — score the agent's *path*, not just outputs (final-answer-only evals materially overstate quality); traces in OpenTelemetry GenAI format (de facto standard, formally still unstable — pin versions).
5. **Human-in-the-loop by risk tier** — propose/commit separation; approval UIs show ground-truth payloads (agents can manipulate summaries — OWASP ASI09).
6. **Budget caps per agent** — FinOps control and runaway-agent safety in one (98% of FinOps teams now manage AI spend).
7. **Management-system wrapper** — ISO 42001 + NIST AI RMF, with red-teaming (PyRIT/Garak-class tooling) as release practice for high-risk uses.

**The reframe for the board:** governance is the *production-enablement* layer. The 21% with mature governance are disproportionately the ~6% capturing serious EBIT value — controls are what let agents ship, scale and survive incidents.

---

## 5. The one-slide summary for an Australian executive

- **Today:** existing law fully applies (privacy, consumer, discrimination, directors' duties). If regulated: APRA/ASIC AI expectations are live. If your AI outputs reach the EU: transparency labelling applies **now**; prohibitions apply now.
- **10 Dec 2026:** ADM transparency in privacy policies (start the inventory immediately).
- **2 Dec 2027:** EU Annex III high-risk conformity, if you provide such systems into the EU.
- **Early 2027:** Australian AI bill lands; copyright licensing framework develops. No TDM exception — licence your training data.
- **Always:** build once on ISO 42001 + NIST AI RMF; treat each jurisdiction as a delta.
