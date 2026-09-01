# Fact Check — Audit of the Original Brief

> **Purpose:** the brief that commissioned this research contained embedded claims and framings. Per instruction, none were accepted on trust. Each was audited against live sources on 1 September 2026. Format: **CLAIM → VERDICT → EVIDENCE → CORRECTION**. Verdicts: TRUE / MOSTLY TRUE / MISLEADING / OUTDATED / FALSE / UNVERIFIED.

## Verdict summary

| # | Claim from the brief | Verdict |
|---|---|---|
| 1 | Reg (EU) 2026/1744 "Digital Omnibus on AI" in force 27 Jul 2026; Annex III → 2 Dec 2027; Annex I → 2 Aug 2028 | **TRUE** |
| 2 | "MCP = tool access, A2A = agent coordination, ACP/UCP = commerce" | **MOSTLY TRUE** (three corrections) |
| 3 | The six build archetypes and their named products | **MOSTLY TRUE** (names outdated; one archetype missing) |
| 4 | "Microsoft Agent 365" and "Agent Fabric" as control-plane examples | **MISLEADING** (wrong vendor for Agent Fabric) |
| 5 | "RAG = knowledge, fine-tuning = behaviour" | **MOSTLY TRUE** (incomplete) |
| 6 | The seven-layer stack framing | **MOSTLY TRUE** (four refinements) |
| 7 | Product-name currency (watsonx Orchestrate, AgentCore, Vertex, Copilot Studio) | **MOSTLY TRUE** (3 of 4 current) |
| 8 | Per-task/"service-as-software" pricing is established in 2026 | **MOSTLY TRUE** (only in specific verticals) |
| 9 | Sovereign AI is an enterprise decision factor | **MOSTLY TRUE** (real for a minority; marketing at the edges) |
| 10 | Implied terminology (prompt engineering, LLMOps, etc.) | **PARTLY OUTDATED** (drift table below) |

---

### 1. The Digital Omnibus claim → **TRUE**

**EVIDENCE:** Verified directly on EUR-Lex (CELEX:32026R1744): Regulation (EU) 2026/1744, adopted 8 July 2026, published OJ 24 July, **entered into force 27 July 2026**. Annex III standalone high-risk deferred 2 Aug 2026 → **2 Dec 2027**; Annex I product-embedded → **2 Aug 2028**. Legislative path confirmed (COM(2025) 836, 19 Nov 2025 → trilogue agreement May 2026 → EP 16 Jun → Council 29 Jun). Corroborated by the Commission's own "AI Omnibus enters into force" notice and multiple law-firm alerts.
**CORRECTION:** None required — with two enrichments worth knowing: (a) Annex I's *original* date was 2 Aug 2027, so its deferral is one year, not two; (b) the Omnibus did **not** move 2 Aug 2026's real obligations — Article 50 transparency and Commission GPAI enforcement went live on schedule, and the Omnibus *added* two prohibitions (NCII/CSAM, from 2 Dec 2026) while softening the AI-literacy duty.

### 2. The protocol one-liner → **MOSTLY TRUE**

**EVIDENCE:** MCP-as-tool-layer and A2A-as-coordination-layer: correct, and both now sit under the Linux Foundation's Agentic AI Foundation (MCP donated Dec 2025; A2A joined Aug 2026). But: (a) IBM/BeeAI's Agent *Communication* Protocol — an "ACP" — **merged into A2A on 29 Aug 2025** and no longer exists; the surviving ACP is OpenAI/Stripe's Agentic *Commerce* Protocol. (b) ACP and UCP (Google+Shopify, launched NRF 11 Jan 2026) are **not one commerce layer — they are the competing pair** (checkout-in-ChatGPT vs full-journey on Google/Copilot surfaces; merchants implement both). (c) The list **omits AP2** — the payments-mandate layer, donated to the FIDO Alliance (Apr 2026), beneath both. WebMCP exists but is only a W3C Community Group draft in Chrome origin trial.
**CORRECTION:** "MCP is the tool/context layer and A2A the agent-coordination layer, both AAIF/Linux-Foundation-governed. In commerce, OpenAI/Stripe's ACP and Google/Shopify's UCP *compete*, with FIDO-governed AP2 as the payments-authorization layer beneath both; WebMCP (pre-standard) extends tools to the browser."

### 3. The six archetypes → **MOSTLY TRUE**

**EVIDENCE:** Taxonomy sound; nearly all products real and correctly categorised. But: "Vertex Agent Builder / Agent Engine" was retired ~22 Apr 2026 into the **Gemini Enterprise Agent Platform** (Agent Engine → Agent Runtime); "Microsoft Foundry Agent Service" is right (platform renamed from Azure AI Foundry); archetype 5 now needs **Microsoft Agent Framework 1.0** (SK+AutoGen merged, GA Apr 2026) and the **Claude Agent SDK**; and "Gemini Enterprise" (not Agentspace) is the current assistant name.
**CORRECTION:** Names updated throughout this package; a **seventh archetype** added — outcome-bought vertical agents (Fin, Sierra, Harvey) — distinct in pricing, contract shape and accountability, and validated at scale by Salesforce's $3.6B Fin acquisition (Jun 2026).

### 4. "Microsoft Agent 365 and Agent Fabric" → **MISLEADING**

**EVIDENCE:** Agent 365 is Microsoft's, real, GA 1 May 2026 (~$15/user/mo; Entra/Purview/Defender for agents including third-party). **Agent Fabric is Salesforce's, delivered via MuleSoft** (launched Sept 2025) — not Microsoft's; ServiceNow separately markets an "AI Agent Fabric," and Microsoft Fabric is an unrelated data platform.
**CORRECTION:** "Cross-estate agent control planes are emerging from multiple vendors: Microsoft Agent 365 and Salesforce/MuleSoft Agent Fabric are the flagship examples; AWS AgentCore Policy/Identity, Google's Agent Gateway/Registry, Databricks Unity AI Gateway and IBM watsonx Orchestrate compete in the same space." The *framing* (control planes as a real category) was right.

### 5. "RAG = knowledge, fine-tuning = behaviour" → **MOSTLY TRUE**

**EVIDENCE:** Still the accepted first-order heuristic across 2026 practitioner sources; fine-tuning genuinely poor at injecting facts. But behaviour is now mostly handled *without* fine-tuning (instruction-following + context engineering + native structured output); the heuristic omits fine-tuning's main enterprise use (cost compression via distillation); and production systems combine the techniques (retrieval + LoRA + RAFT-style training) rather than choosing.
**CORRECTION:** "Retrieval supplies fresh, citable, permissioned knowledge; fine-tuning encodes stable behaviour and buys cost compression; context engineering now carries most behaviour work; production systems combine all three, and evals — not doctrine — decide." (Full decision tree in [04](04_BUILD_ARCHETYPES.md).)

### 6. The seven-layer stack → **MOSTLY TRUE**

**EVIDENCE:** Defensible and matching how platforms describe themselves. Four refinements supported by evidence: evals/observability deserve explicit cross-cutting status; models+serving fuse for API buyers; the big agent platforms deliberately straddle layers 4–7; protocols (MCP/A2A) and agent identity/security deserve explicit placement.
**CORRECTION:** Layers retained; control plane drawn as an orthogonal plane; protocols drawn as connective tissue; fusion caveats stated ([02](02_ENTERPRISE_AI_MENTAL_MODEL.md)).

### 7. Product-name currency → **MOSTLY TRUE**

**EVIDENCE:** IBM watsonx Orchestrate ✔ current (relaunched May 2026 as an "agentic control plane"); Amazon Bedrock AgentCore ✔ current (Policy, Evaluations GA'd 2026); Microsoft Copilot Studio ✔ current. Google Vertex names ✖ **OUTDATED** since Apr 2026.
**CORRECTION:** As per claim 3.

### 8. Service-as-software pricing established → **MOSTLY TRUE**

**EVIDENCE:** Genuinely established **in customer support** (published per-resolution prices: Fin $0.99, HubSpot $0.50, Zendesk $1.50–2.00; Salesforce's $3.6B Fin acquisition as validation) and spreading in verticals with countable outcomes. But seats and consumption credits still dominate enterprise-wide (Bessemer: hybrid base+usage ~41%; pure outcome small), and outcome-definition gaming is a known failure mode.
**CORRECTION:** "Outcome pricing is an established pattern with proof points in support/CX — not the default enterprise model. Expect hybrid pricing everywhere."

### 9. Sovereign AI as decision factor → **MOSTLY TRUE**

**EVIDENCE:** Real and shipping: AWS European Sovereign Cloud GA (Jan 2026); Gartner puts 2026 sovereign-cloud IaaS spend at ~$80B; 61% of Western European CIOs prioritising local providers; Australia's National AI Plan mandates IRAP-assessed sovereign capability for protected government workloads. But genuine *need* concentrates in government/defence/regulated/EU-exposed workloads (~10–20% of a typical estate); US-hyperscaler "sovereign" offerings remain legally contested (CLOUD Act vs EUCS); and Australian "sovereign AI" today mostly means onshore regions of US clouds.
**CORRECTION:** "A genuine procurement gate for the regulated minority of workloads; a secondary or marketing-level factor elsewhere. Buy sovereignty per-workload, not per-estate."

### 10. Terminology drift → **PARTLY OUTDATED**

| Term in the brief | September 2026 status |
|---|---|
| Prompt engineering | Subsumed into **context engineering** (prompting survives as a sub-skill) |
| LLMOps | Extended to **AgentOps** (trajectories, sessions, budgets) |
| Azure AI Foundry | **Microsoft Foundry** (from Jan 2026) |
| Vertex AI / Agent Builder / Agent Engine | **Gemini Enterprise Agent Platform / Agent Runtime** (from Apr 2026) |
| Google Agentspace | **Gemini Enterprise** (absorbed Oct 2025) |
| OpenAI Assistants API | **Retired 26 Aug 2026** → Responses API / Agents SDK |
| Semantic Kernel + AutoGen | **Microsoft Agent Framework 1.0** |
| ACP (IBM) | **Merged into A2A**; "ACP" now means the OpenAI/Stripe commerce protocol |
| Intercom | **Fin** (renamed; Salesforce acquisition pending close) |
| "Copilot" as the generic category | Vendor language shifted to **"agent"** (assist → act) |

---

## What the audit says about the brief overall

The original framework was **structurally sound and factually careful by 2025 standards** — the stack, the archetypes, the decision axes and even the contested EU claim all survived scrutiny. What eight months of market motion broke was **names and completeness**: Google's renames, the ACP collision, the missing AP2, the missing seventh archetype, and the vendor misattribution on Agent Fabric. The meta-lesson for maintaining this material: *frameworks age in years; product facts age in months* — which is exactly how the [source register](13_SOURCE_REGISTER.md) flags perishable claims.
