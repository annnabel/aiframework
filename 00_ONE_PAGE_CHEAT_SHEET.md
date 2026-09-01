# Enterprise AI 2026 — The Night-Before Cheat Sheet

*Current as of 1 September 2026. Everything here is sourced in [13_SOURCE_REGISTER](13_SOURCE_REGISTER.md).*

## The stack (7 layers)

```
7 APPLICATIONS      copilots · enterprise agents · vertical AI · service-as-software
6 CONTROL PLANE     identity · policy · observability · evals · security · FinOps   ← runs ACROSS all layers
5 BUILD/ORCH        prompts · tools · agents · workflows · frameworks · MCP/A2A
4 DATA & CONTEXT    lakehouse · retrieval+rerank · knowledge graphs · context engineering
3 SERVING           APIs · Bedrock / MS Foundry / Gemini Enterprise Agent Platform · self-host
2 MODELS            frontier · open-weight (Chinese-led) · SLMs · all reasoning-native, MoE
1 COMPUTE           GPUs/custom silicon · hyperscalers · neoclouds · sovereign capacity
```
**Rules of thumb:** you're differentiated at 4 & 7, never at 1–3 · vendors collapse layers on purpose — ask which one they're trying to *own* · whoever owns your policy enforcement point owns your choke point.

## The build choices (the dial: control ↑, inherited governance ↓)

**1 Embedded SaaS AI** → **2 Assistant seats** (M365 Copilot $30, Claude Enterprise $20+usage) → **3 Configure on platform** (Copilot Studio, Agentforce — *sticky DSLs, opaque credits*) → **4 Managed agent runtime** (Bedrock AgentCore, Foundry Agent Service, Gemini Enterprise Agent Platform) → **5 Custom on frameworks** (LangGraph, Agent Framework, Agents SDK, ADK, Claude Agent SDK) → **6 Self-hosted open weights** (DeepSeek/Qwen — sovereignty & leverage) → *(new 2026)* **7 Outcome-bought vertical agents** (Fin $0.99/resolution, Sierra, Harvey).
**Portfolio, not choice:** 1+2 for everyone, 3–4 departmental, 5 for the differentiating few, 6 as leverage.

## The key distinction

**Knowledge → retrieval (RAG).** Fresh, citable, permissioned. **Behaviour → context engineering first**, fine-tune (LoRA) last. **Tools → better tool definitions**, then RFT. **Cost/latency → route smaller + cache + batch**, then distil. **Consistency → structured output + workflows** before tuning. Production combines them; **evals decide, not doctrine**.

## The protocol model (verified)

**MCP** = agent↔tools (Linux Foundation, the won standard — build MCP-first) · **A2A** = agent↔agent (same foundation, thinner adoption) · **ACP (OpenAI/Stripe) vs UCP (Google/Shopify) compete** for agentic checkout — merchants do both · **AP2** (FIDO) = payment-intent mandates beneath both · **WebMCP** = draft only. *(IBM's old "ACP" merged into A2A — dead.)*

## The five decision axes

1. **Trust vs lock-in** — dependency is fine if it *earns* its switching cost; get the 18-month exit-cost list in writing. Lock-in lives in workflows/evals/data now, not models.
2. **Data gravity** — the platform choice is mostly made by where your data already lives; then pick the cross-estate control plane (Agent 365 / Agent Fabric class) deliberately.
3. **Governance readiness** — autonomy must not exceed maturity: inventory → identity → policy+audit → evals → managed autonomy. (74% adopting agents; 21% governance-mature.)
4. **Unit economics** — model → inference → **task** → process → value. Route/cache/batch = 5–20× savings; the HITL ratio dominates task cost; scale at value ≥ 3× cost.
5. **Failure modes** — tech/data/process/governance/economics/people/operating-model. Workflow redesign is the #1 EBIT driver; the pre-mortem 7 questions kill bad projects in a meeting.

## The numbers that anchor the conversation

88% adopt AI · 37% see any EBIT impact · ~6% high performers · >40% of agentic projects predicted cancelled by 2027 · capability cost falls ~50×/yr · frontier→small price spread ~50× · EU: transparency live **now**, high-risk **2 Dec 2027** · AU: ADM privacy transparency **10 Dec 2026**, AI bill early 2027.

## The 10 most useful questions

1. "Show it on **our data with our permissions** — not the demo corpus."
2. "**Cost per completed task** at our volume, including credits and the production HITL ratio — and if HITL doubles?"
3. "If we leave in 18 months, **what do we get out**, in what format?"
4. "**Why an agent and not a workflow?**"
5. "Show the agent's **identity, permission set, audit trail** — and your policy engine *blocking* a tool call."
6. "Walk me through the **eval suite** — what gates a release; can we run it?"
7. "What runs **autonomously in production** at named customers, and at what human-in-the-loop ratio?"
8. "Is our data used for **training/improvement** — which clause — and who are the sub-processors?"
9. "**What disappears from the workflow** after this? What's the measured baseline?"
10. "**Who owns this in 18 months** — name and budget line?"

## The mental model in one picture

```
BUSINESS PROBLEM → APPLICATION → AGENT/WORKFLOW → TOOLS (MCP) → CONTEXT/DATA → MODEL (routed) → SERVING → COMPUTE
                     ▲ every arrow watched by the CONTROL PLANE: identity · policy · evals · observability · FinOps
                     ▲ everything shaped by: regulation · change management · operating model
```

**If you hold one sentence:** *models are becoming cheap and swappable; value comes from redesigned workflows on your own data; risk lives at the tool call; and the durable assets are your evals, your governance, and your exit options.*
