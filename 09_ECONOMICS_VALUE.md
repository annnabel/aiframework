# Economics & Value — Does Enterprise AI Actually Pay?

> **Why this document exists:** AI economics are argued with vendor numbers and vibes. This assembles the verified evidence — unit economics from the token up, pricing models as they actually are, and the honest answer to "is anyone making money from this?" Disagreements between credible sources are preserved, not smoothed.

---

## 1. The value verdict in one paragraph

Adoption is near-universal; financial impact is rare and concentrated. McKinsey (Aug 2026, n=1,719): **88%** of organisations use AI in at least one function, **80%** of users report individual productivity gains — but only **37%** attribute *any* EBIT impact (flat year on year) and **~6%** are "high performers" (≥5% of EBIT attributable). The US Census (the only representative sample) shows just **17–20%** of *all* US businesses use AI at all — enterprise surveys measure large-firm leaders. The individual-gains-vs-enterprise-P&L gap is the central economic paradox of 2026, and the evidence says the bridge is **workflow redesign** (the single biggest EBIT driver; only ~21% do it), not better models.

---

## 2. Unit economics — the five-link chain

**Model cost → inference cost → task cost → process cost → business value.** Optimising one link in isolation misleads; walk all five.

### Link 1: Model cost (verified list prices, per 1M tokens, Aug–Sep 2026)

| Tier | Examples | Input / Output |
|---|---|---|
| Frontier-max | Claude Fable 5 | $10 / $50 |
| Flagship | Claude Opus 5 · GPT-5.6 Sol · Gemini 3.1 Pro | $5/$25 · $4/$20 · $2/$12 |
| Mid | Claude Sonnet 5 · GPT-5.6 Terra | $2/$10 · $2/$12 |
| Small | Claude Haiku 4.5 · GPT-5.6 Luna | $1/$5 · $0.20/$1.20 |
| Open-weight (via providers) | DeepSeek V4-class | typically <$0.30 / <$1 |

Structural facts: output costs ~5–6× input; a **~50× spread** from flagship to small tier; the same open model varies **~6×** across inference providers. The trend: price per fixed capability falls **9×–900×/year (median ~50×** — Epoch AI); flagship *list* prices have stabilised in a band, with deflation showing up as last year's frontier arriving in this year's cheap tier. **The countervailing force:** reasoning models spend more tokens per task, so enterprise bills can rise while unit prices fall. Budget per task, never per token.

### Link 2: Inference cost — the three levers
**Routing** (the biggest lever: most tokens to cheap tiers, frontier reserved for hard reasoning), **caching** (repeated context at ~10% of price), **batching** (50% off non-urgent work; discounts stack to ~95% on repeated prefixes). A well-engineered workload runs **5–20× below** naive flagship list price. Self-hosting beats APIs only at sustained high utilisation or under sovereignty mandates — the hidden costs are talent and utilisation risk, not hardware.

### Link 3: Task cost
One completed unit of work = (multiple model calls at routed tiers) + tool calls + retries + **the human-in-the-loop share**. The HITL ratio dominates: a $0.40-of-tokens task with 30% human review at $50/hr loaded cost is not a $0.40 task. Demand this number from every vendor and every internal business case.

### Link 4–5: Process cost → business value

```
COST per AI task  = tokens (routed) + tools/infra + (HITL ratio × human review cost) + amortised build & governance
VALUE per AI task = (displaced labour cost × quality-adjusted substitution rate) + cycle-time value + risk-reduction value
Scale only if value/cost > 3× on measured production traffic — margin for HITL and token bills to move against you.
```

---

## 3. Pricing models — what vendors actually charge (verified)

| Model | Examples | The catch |
|---|---|---|
| **Per-seat** | M365 Copilot $30 · Agent 365 $15 · Claude Enterprise $20 + usage · ChatGPT Enterprise (unpublished; ~$45–75 reported) | Shelf-ware risk; demand usage analytics before renewal |
| **Consumption / credits** | Copilot Studio ($200/25k credits; 1–200+ credits per interaction) · Agentforce Flex Credits ($0.10/action) · all API platforms | Credit-conversion opacity recreates the cloud-FinOps problem for agents |
| **Per-outcome** | Fin $0.99/resolution · Sierra custom outcome deals · HubSpot/Zendesk $0.50–2.00 | Outcome-definition gaming ("resolution" = customer gave up); unbudgetable variance |

**The direction (Bessemer, Feb 2026):** pure per-seat fell to ~15% of SaaS companies; **hybrid base + usage is the standard at ~41%**. Outcome pricing is established *only where outcomes are countable* — customer support above all — and was legitimised by Salesforce's **$3.6B agreement to acquire Fin** (June 2026). Treat "we price per outcome" as a wedge pattern with proof points, not the market default. Vendors increasingly sell **all three simultaneously** (Agentforce: $2/conversation *or* credits *or* $125/user) — model your own mix before they model it for you.

---

## 4. Where value is proven (and where evidence cuts both ways)

**Customer service — the strongest causal evidence.** The QJE randomised trial (5,179 agents): **+14%** issues resolved/hour, **+34% for novices**, ~zero for the most experienced — AI compresses the experience curve. The **Klarna arc** is the essential case study told whole: 2024 — assistant does the work of ~700 agents, ~$40M claimed savings; May 2025 — public walk-back and rehiring ("what you end up having is lower quality"), a human floor restored; late 2025 — *still* reporting ~$60M annual savings at an ~850-agent workload. Lesson: the automation ceiling was ~⅔ of volume; **hybrid won, not reversal**.

**Software engineering — genuinely two-sided.** Positive RCTs on typical/greenfield tasks (+55.8% GitHub task RCT; +8.7% PRs in enterprise). The independent METR RCT found experienced open-source developers **19% slower** with AI on their own complex repos (while believing they were 20% faster) — softened by METR's own Feb 2026 update to ~–4% with better tooling and acknowledged selection bias. Honest synthesis: strong gains for typical tasks and juniors; neutral-to-improving for experts on complex legacy code; **self-reported speedup always overstates measured speedup**. Second-order effect (McKinsey, Aug 2026): ~⅓ of firms — nearly half of high performers — have *declined software purchases* to build internally with agentic coding tools.

**Back office / documents:** consistent surveyed value in document-heavy workflows; API usage data shows work shifting from augmentation to automation. Less RCT-grade evidence than the two above.

**Agentic AI specifically — hype vs evidence:** Gartner's verified prediction stands: **>40% of agentic AI projects cancelled by end-2027** (costs, unclear value, inadequate risk controls); only **17%** of enterprises have deployed agents at all; agentic AI is sliding into the Trough of Disillusionment while **40% of $1B+ orgs are now scaling agents** (up from 27%). Verdict: real, growing, *function-specific* value under human oversight — customer support, coding, documents — and **no credible evidence yet of broad autonomous-agent value**. Viral ROI aggregates ("171% average agentic ROI") trace to vendor-sponsored surveys; excluded here.

**Pilot-to-production:** the famous "95% of pilots fail" (MIT NANDA) is real but methodologically weak (52 interviews, conference surveys, an agenda) — yet directionally echoed by stronger sources: Deloitte finds only **25%** of organisations moved ≥40% of pilots to production; McKinsey finds >80% report no material enterprise-level EBIT effect. Improving, still the bottleneck.

---

## 5. The macro picture — spend vs return

- **Spend is enormous and accelerating:** Gartner forecasts **$2.59T worldwide AI spending in 2026** (+47%); hyperscaler capex ~$600–700B+; enterprise LLM API spend ~$15B projected for 2026 (Menlo).
- **The service-as-software thesis has proof points:** AI priced against the **~$4.6T services/labour pool**, not the ~$300B software pool — Harvey ~$200M ARR (legal), Sierra ~$200M (CX), Cursor $2B (coding; acquired for $60B), Abridge $100M+ (clinical). This is why "expensive vs software, cheap vs labour" is the pricing logic to test every AI proposal against.
- **The unresolved margin debate:** AI-native gross margins run ~50–60% vs SaaS 80%+ (ICONIQ: inference ≈23% of revenue at scaling AI companies — though margins improved 41%→52% from 2024→2026). Bulls: a growth-stage artifact that inference deflation fixes. Bears: per-use compute permanently breaks the SaaS margin model. Genuinely unresolved — it turns on whether required model quality rises as fast as prices fall.
- **Workforce (what the credible evidence says):** no economy-wide displacement; but employment of **22–25-year-olds in the most AI-exposed occupations is ~19% below trend** (Stanford, ADP payroll data on 4.6M workers) — concentrated where AI *automates* rather than augments. Plan entry-level pipelines accordingly.

---

## 6. What separates the ~6% who capture real value

Cross-source, consistent: (1) **workflow redesign** — the single biggest EBIT driver; (2) **CEO-level governance ownership** — the strongest correlate of bottom-line impact (only 28% have it); (3) **fewer, bigger bets** — BCG's 10/20/70 rule: 10% algorithms, 20% data/tech, **70% people and process**; (4) **buy for commodity, build the differentiator** — bought solutions historically reach production ~2× as often (67% vs 33%), with agentic coding now eroding that edge; (5) **evals discipline** — the capability that makes model swaps and scaling safe; (6) **human-in-the-loop by design** — the Klarna lesson, institutionalised.

**So what:** the binding constraint on AI value in 2026 is not model capability and not spend. It is the organisation's willingness to redesign work, govern from the top, and measure honestly. Fund those three before funding more technology.
