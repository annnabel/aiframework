# The Decision-Oriented Glossary

> **The rule:** every term gets one line on *what it is* and one line on *what decision it affects*. If a term affects no decision, it is flagged **⚑ jargon — low strategic importance**. Terms are current as of September 2026; renamed or dead terms are marked.

---

## Models

| Term | What it is | What decision it affects |
|---|---|---|
| **Frontier model** | One of the handful of most capable models from the major labs (GPT-5.6 Sol, Claude Fable 5/Opus 5, Gemini 3.1 Pro). | Whether a task justifies frontier pricing (5–50× the cheap tier) or routes to a smaller model. |
| **Open-weight model** | A model whose trained weights you can download and run (DeepSeek V4, Qwen 3.x) — licence terms vary. | Whether you keep a self-hosting escape hatch for sovereignty, cost or negotiating leverage. |
| **Open-source model** | Weights *plus* permissive licence (and rarely, training data/code); often conflated with open-weight. | Legal exposure of "open" models — read the licence, not the label (Llama and Kimi restrict; MIT/Apache don't). |
| **SLM (small language model)** | A 1–15B-parameter model, 10–30× cheaper and faster, good for narrow tasks (classification, extraction, routing). | The routing decision that dominates AI unit economics: which work *doesn't* need a frontier model. |
| **MoE (mixture of experts)** | Architecture where only a small fraction of a model's parameters activate per token (e.g. 49B of 1.6T). | None directly — but it explains *why* capability keeps getting cheaper, so you can plan on prices falling. |
| **Reasoning model** | A model that spends variable "thinking" tokens before answering; in 2026 all flagships do this with a tunable effort dial. | Cost/latency budgeting: quality now scales with spend *per query*, so you set effort policy per use case. |
| **Context window** | How much text the model can consider at once (1M+ tokens on 2026 flagships ≈ several thousand pages). | Whether you need retrieval to narrow inputs (usually yes — for cost, permissions and accuracy) vs stuffing everything in. |
| **Multimodal** | Accepts images/audio/documents as input, not just text; table stakes on 2026 flagships. | Which use cases are in scope (document processing, visual inspection) without extra tooling. |
| **Distillation** | Training a small model to imitate a big one's outputs on your task. | The highest-ROI cost play: prove the workflow on a frontier model, then distil for 10–30× cheaper scale-out. |
| **Quantisation** | Compressing model weights to lower numeric precision to run cheaper/faster. | ⚑ jargon — engineering detail; delegate. Only surfaces in self-hosting cost estimates. |
| **Tokens** | The unit models read and write (~¾ of an English word); the billing unit of AI. | Everything in AI FinOps — you cannot read an AI invoice or contract without this. |
| **Tokens in / tokens out** | Input (your prompt + context) vs output (the model's answer); output costs ~5–6× more per token. | Prompt/context design economics: verbose context is cheap-ish, verbose generation is not. |
| **Tokens-per-dollar** | Colloquial capability-cost metric; the rigorous version is *cost per task at target quality*. | Vendor comparison — insist on cost-per-task, since reasoning models inflate tokens per task. |

## Build patterns

| Term | What it is | What decision it affects |
|---|---|---|
| **Prompt engineering** | Crafting the instructions given to a model; in 2026, a *subset* of context engineering. | Cheapest first lever — always exhaust prompting before paying for tuning or infrastructure. |
| **RAG (retrieval-augmented generation)** | Fetching relevant enterprise content at query time and giving it to the model as context. | How your proprietary knowledge reaches AI — fresh, citable, permission-controlled — vs retraining anything. |
| **Reranking** | A second-pass model that reorders retrieved candidates so only the truly relevant enter context; production table stakes. | A cheap accuracy lever in any retrieval buy/build — ask vendors if and how they rerank. |
| **Knowledge graph / GraphRAG** | Retrieval over explicit entity-relationship structures rather than just text similarity. | Worth its (high) build cost only for multi-hop, relationship-heavy questions and explainability mandates. |
| **Fine-tuning** | Adjusting a model's weights with your examples to change its behaviour. | A last resort after prompting/RAG fail — justified for format reliability, tone, or cost compression, not knowledge. |
| **SFT (supervised fine-tuning)** | Fine-tuning on input→ideal-output example pairs. | ⚑ mostly engineering detail — the decision is "fine-tune or not", not which flavour. |
| **LoRA** | The dominant cheap fine-tuning method (small adapter layers, ~0.1–1% of weights). | Makes fine-tuning affordable and reversible — lowers the bar for the fine-tune decision on open models. |
| **RFT / reinforcement fine-tuning** | Tuning by rewarding verifiably correct outcomes (code passes tests) rather than imitating examples. | The 2026 growth area for agent reliability — only viable if you already have strong evals. |
| **Continued pre-training** | Further large-scale training on domain corpora; expensive, rare outside big regulated players. | Almost never the answer — flag any vendor proposing it before cheaper levers are exhausted. |
| **Grounding** | Tying generation to authoritative sources (retrieval, search, citations) to control hallucination. | Whether outputs are auditable — regulated deployments should require citation-grounded answers. |
| **Tool use / function calling** | The model invoking software functions (search, database, API) instead of just emitting text. | The gateway decision to agents: what systems AI may *act on*, under what permissions. |
| **Structured output** | Forcing model output into a strict schema (JSON); natively reliable on 2026 APIs. | Removes a whole class of integration fragility — expect it, don't pay extra for it. |
| **Context engineering** | The 2026 discipline: curating everything in the model's window — instructions, retrieval, memory, tool results, compaction. | Where most "behaviour" work happens now — staffing and skill decisions formerly labelled prompt engineering. |
| **Intent/specification engineering** | Emerging term for writing precise task specs that agents execute against (specs-as-source). | Early; affects how you brief agents on long tasks — watch, don't reorganise around it yet. |

## Agents

| Term | What it is | What decision it affects |
|---|---|---|
| **Agentic AI** | AI that runs in a loop — plans, calls tools, observes results, iterates toward a goal — rather than answering once. | The autonomy decision: what the system may *do* (not just say), and the governance that requires. |
| **Workflow vs agent** | Workflow = model steps orchestrated on predefined paths; agent = model directs its own control flow. | The single best reliability decision: use workflows wherever the path is predictable — most production "agent" value is workflows. |
| **Tool calling** | The mechanism by which agents act (see tool use); each call is now the unit of policy enforcement. | Where your security team should put controls — per-tool-call policy, not per-conversation. |
| **Planning** | The agent producing an explicit plan before executing; beats improvisation on long tasks. | ⚑ mostly engineering detail — ask for it in evaluation criteria, don't design it. |
| **Memory** | What persists across agent sessions: user preferences, notes-to-self, organisational history. | Data governance: memory is a new store of business data that needs retention/access policy. |
| **Human-in-the-loop (HITL)** | Human approval gates on consequential agent actions; propose/commit separation. | The risk-tiering decision: which actions auto-execute vs require sign-off — your main autonomy dial. |
| **Guardrails** | Input/output filters, allowlists, budgets and classifiers wrapped around models/agents. | One defence layer, never the defence — a vendor selling guardrails as the security answer is underselling the problem. |
| **Multi-agent system** | Multiple agents dividing work; 2026 consensus: orchestrator + ephemeral subagents for parallel read-heavy work; peer-to-peer designs lost. | Whether extra cost (~15× tokens) and complexity buys anything — usually only for decomposable research-style tasks. |
| **Orchestrator / sub-agent** | The coordinating agent holding full context; subagents work in isolation and return summaries. | Team-design analogy for agent architecture reviews — who holds context is who owns quality. |
| **Agent card** | A signed, machine-readable identity/capability description an agent publishes (A2A concept). | Cross-vendor agent trust — ask platform vendors how third-party agents prove what they are. |
| **Long-running task** | Agent work spanning minutes–days, requiring checkpointing and resumption (now in MCP spec as "Tasks"). | Runtime choice: long-running agents need durable execution infrastructure, not a chat session. |
| **Sandbox** | An isolated environment where agent-generated code/actions execute without reaching real systems. | Blast-radius control for any agent that writes code or browses — non-negotiable in security review. |
| **Runtime isolation** | The strength of that sandbox boundary (gVisor/Kata/Firecracker tiers). | ⚑ engineering detail — ask security to assess it; don't adjudicate it yourself. |

## Protocols (verified, September 2026)

| Term | What it is | What decision it affects |
|---|---|---|
| **MCP (Model Context Protocol)** | *The* standard for connecting agents to tools and data; Linux Foundation-governed (Agentic AI Foundation) since Dec 2025; ~100M monthly SDK downloads. | Integration strategy: build your tool surface MCP-first and any agent platform can use it — your main hedge against framework lock-in. |
| **A2A (Agent2Agent)** | The standard for agent↔agent discovery and coordination across vendors; v1.0 in 2026, same foundation as MCP; adoption real but thinner. | Multi-vendor agent estates: whether your platforms can interoperate rather than silo. |
| **WebMCP** | Draft W3C Community Group spec letting websites expose MCP-style tools to browser agents; Chrome origin trial — **not a standard yet**. | Timing only — watch for your web channel; too early to build strategy on. |
| **ACP (Agentic Commerce Protocol)** | OpenAI + Stripe's checkout protocol for agent purchases (live in ChatGPT). ⚠ *An older, unrelated "ACP" (IBM's Agent Communication Protocol) merged into A2A in Aug 2025 and no longer exists.* | If you sell: whether you can transact inside ChatGPT's surfaces. |
| **UCP (Universal Commerce Protocol)** | Google + Shopify's full-journey commerce protocol (Jan 2026; Google surfaces + Microsoft Copilot checkout). **ACP and UCP compete**; merchants implement both. | If you sell: coverage of Google/Copilot agentic-commerce surfaces — a two-protocol reality for now. |
| **AP2 (Agent Payments Protocol)** | The payments-*authorization* layer (cryptographically signed mandates proving user intent), donated to the FIDO Alliance; sits beneath both commerce protocols. | Payment risk and dispute liability when agents buy — ask "who holds the mandate?" |

## Operations & governance

| Term | What it is | What decision it affects |
|---|---|---|
| **Evals** | Systematic scored tests of AI quality — offline (golden datasets gating releases) and online (scoring live traffic); "the new unit tests". | Your quality gate for *everything*: model swaps, vendor claims, go-live. No evals = no evidence. |
| **LLM-as-judge** | Using a model (calibrated against human ratings) to score outputs at scale. | Makes evals affordable — but ask how the judge was calibrated before trusting a vendor's scores. |
| **Trajectory evals** | Scoring an agent's *path* (tool choices, steps, recoveries), not just its final answer; production default in 2026. | Agent QA: final-answer-only evals materially overstate agent quality. |
| **LLMOps → AgentOps** | The operations discipline; extended in 2026 from single calls to sessions, tool-call graphs and budgets. | Team/tooling investment for running AI in production — a real budget line, not a slogan. |
| **Drift** | Behaviour change over time — from your data shifting or the vendor silently updating the model. | Why monitoring is permanent: a passing eval in March proves nothing in June. |
| **Observability** | Tracing what AI systems actually did (OpenTelemetry GenAI conventions are the de facto — not yet stable — format). | Incident response and audit: can you reconstruct why the agent did that? |
| **Agent identity** | Agents as first-class directory identities with credentials, owners and lifecycle (Entra Agent ID, Okta, AgentCore Identity). | The binding constraint on scaling agents — no identity means no permissioning, audit or revocation. |
| **Policy engine** | Deterministic rules evaluated on every agent tool call (Cedar/OPA-style; default-deny). | Where "the agent may never do X" becomes enforceable code instead of a hope. |
| **Control plane** | The assembled layer governing agents across your estate: registry, identity, policy, observability, evals, cost. | The choke-point procurement decision of 2026 — see Layer 6. |
| **AI FinOps** | Cost governance for AI: token/GPU allocation, showback, budgets, unit economics (98% of FinOps teams now do it). | Whether AI spend is managed or discovered — and per-agent budget caps double as safety controls. |
| **Red teaming** | Adversarial testing of AI systems (prompt injection, jailbreaks, data exfiltration) before and after deployment. | Release criteria for anything high-risk — increasingly expected by regulators and insurers. |
| **Guardian agents** | Gartner's term for AI that supervises other AI at runtime. | ⚑ analyst framing — useful shorthand, but buy capabilities (policy, monitoring), not the buzzword. |

## Commercial

| Term | What it is | What decision it affects |
|---|---|---|
| **Per-seat pricing** | Paying per licensed user (M365 Copilot $30/user/mo); shrinking as the sole model. | Budget predictability vs paying for shelf-ware — demand usage data before renewals. |
| **Consumption pricing** | Paying per use (tokens, credits, actions); now the enterprise default, often opaque (credit packs). | FinOps exposure: variable bills, credit-conversion opacity — model worst-case, not demo-case. |
| **Per-task / per-resolution pricing** | Paying per completed outcome (Fin $0.99/resolution); established in customer support, niche elsewhere. | Risk transfer to the vendor — but audit how "resolution" is defined and gamed. |
| **Data gravity** | Work migrates to where data already lives, because permissions and connectors come free there. | The strongest predictor of your platform choice — and of your lock-in. |
| **Lock-in** | Switching costs; in 2026 concentrated in workflows, evals, embeddings, governance certifications and cloud commits — *not* the model. | Negotiation and architecture: keep the model swappable; price the workflow migration honestly. |
| **Sovereign AI** | Legally/jurisdictionally controlled AI capability (in-country, cloud-act-immune, or air-gapped). | A genuine procurement gate for government/regulated workloads (~10–20%); mostly marketing beyond that. |
| **Air-gapped** | Fully disconnected deployment; the extreme end of sovereignty. | Only for classified/defence-grade requirements — it forfeits the API ecosystem entirely. |
| **BYOM (bring your own model)** | Running your chosen model inside a vendor's platform. | Real at the API level, but check what's *not* portable (orchestration, memory, evals) — and note model access can be revoked supply-side. |

## Business

| Term | What it is | What decision it affects |
|---|---|---|
| **Service-as-software** | Selling completed work (priced against labour budgets, ~$4.6T of services spend) rather than software seats. | Which budget line AI competes for — and why vendors price per outcome. |
| **Vertical AI** | Deep domain-specific AI products (Harvey in legal, Abridge in clinical) vs horizontal platforms. | Buy-vs-build in your domain: verticals win on workflow depth, platforms on distribution. |
| **Agentic commerce** | Agents discovering, negotiating and buying on users' behalf (the ACP/UCP/AP2 stack). | Channel strategy if you sell anything — your storefront's next "mobile moment". |
| **AI-native** | A company whose core product loop *is* the model (remove the AI and no product remains). | Competitive assessment: AI-natives set the growth benchmarks; incumbents answer with distribution and M&A. |
| **Human-in-the-loop ratio** | The share of AI-produced work requiring human review/intervention. | The real unit-economics variable — automation claims mean nothing without it. |
