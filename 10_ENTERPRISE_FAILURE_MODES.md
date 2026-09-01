# Enterprise AI Failure Modes — Why Initiatives Die, and How to Stop Yours

> **Why this document exists:** the base rates are brutal — >80% of enterprises report no material EBIT effect from AI, only ~25% have moved even 40% of pilots to production, and Gartner expects >40% of agentic projects cancelled by end-2027. But the failures are *patterned*, which means they're screenable. Seven categories, each with the evidence, the smell test, and the mitigation.

---

## The seven failure categories

### 1. Technology failures — the wrong tool, not a bad tool

**What it looks like:** an autonomous agent deployed where a deterministic workflow belonged; a "GenAI" solution to a problem that needed a form; demos that never survive real inputs; tools that don't retain context or fit the workflow (MIT NANDA's "learning gap" — the core technical failure it found, distinct from raw model capability, which was rarely the blocker).

**Evidence:** Gartner's "agent washing" finding — of thousands of vendors claiming agentic products, only ~130 were assessed as real; most agentic projects are "early-stage experiments… driven by hype and often misapplied."

**Smell test:** *"Why does this need to be an agent?"* If the answer describes a predictable path, it's a workflow wearing a costume — build the workflow (cheaper, testable, reliable).

**Mitigation:** choose the least-agentic architecture that solves the problem; pilot on production-realistic data from day one; require an eval suite before any go/no-go.

### 2. Data failures — the pilot's silent killer

**What it looks like:** the retrieval corpus is stale, unpermissioned, or wrong; document access controls don't flow into agent answers (an over-permissioned agent is a breach generator); the data needed for the use case lives in a system nobody scoped.

**Evidence:** Stanford AI Index 2026 identifies data infrastructure — not models — as the primary barrier; Layer-4 problems are where most production failures originate.

**Smell test:** *"Show me the three datasets this depends on, their owner, their freshness, and their permissions model."* Hand-waving on any of the four predicts failure.

**Mitigation:** treat data readiness as a gate, not "phase 2"; permission-aware retrieval as a hard requirement; a named data owner in the project team.

### 3. Process failures — bolting AI onto an unredesigned workflow

**What it looks like:** AI drafts the document, then the same five approvals happen anyway; the "assistant" adds a step instead of removing one; savings appear in nobody's budget because the process didn't change.

**Evidence:** the strongest finding in the entire evidence base — **workflow redesign is the single biggest driver of EBIT impact** (McKinsey), yet only ~21% of organisations redesign any workflow; Deloitte finds 37% use AI at "surface level" with minimal process change.

**Smell test:** *"What does the process look like AFTER, and which steps disappear?"* If the after-picture is the before-picture plus AI, value will be invisible.

**Mitigation:** redesign the workflow first, insert AI second; assign the saved capacity explicitly (redeploy, or reduce, or grow throughput — decide, don't drift).

### 4. Governance failures — dying in security review, or worse, not dying there

**What it looks like:** the pilot that works but can't answer "who owns this agent, what can it access, and who gets paged?"; the agent with standing super-user credentials; the prompt-injectable agent holding the lethal trifecta (private data + untrusted input + exfiltration path); ungoverned SaaS AI features that switched themselves on.

**Evidence:** only **21%** have mature agentic governance while ~74% plan adoption (Deloitte); inadequate risk controls is one of Gartner's three cancellation drivers; the incident record (EchoLeak, Salesloft Drift, malicious MCP server, production-DB deletion) shows what un-governed agents do.

**Smell test:** *"Can this pass security review today — identity, least privilege, policy on tool calls, audit trail, kill switch?"* A "we'll add governance later" is a cancellation notice with a delay.

**Mitigation:** the seven-control stack in [08](08_GOVERNANCE_REGULATION.md); governance capability built *before* the agent portfolio scales, matched to autonomy level.

### 5. Economics failures — the unit math never closed

**What it looks like:** the pilot cost per task looked fine at demo scale; at production volume the reasoning loops, retries and tool calls blow it up; the human-review ratio never fell; consumption credits (1–200+ per interaction) produced an unbudgetable bill; nobody ever calculated value per task at all.

**Evidence:** "escalating costs, unclear business value" — the first two of Gartner's three cancellation drivers; 20% of McKinsey respondents say AI operating costs now constrain use; agent-loop consumption is non-deterministic by nature.

**Smell test:** *"What's the all-in cost per completed task at our volume — and the same number if the HITL ratio doubles?"* No number, no scale-up.

**Mitigation:** the five-link chain in [09](09_ECONOMICS_VALUE.md); routing/caching/batching engineered from the start; per-agent budget caps; scale threshold of value ≥ 3× cost on measured production traffic.

### 6. People & change failures — the 70% that gets 10% of the budget

**What it looks like:** licences deployed, training skipped; middle managers routing around the tool; usage that spikes at launch and decays to the enthusiasts; the shadow-AI economy (personal ChatGPT) outperforming the sanctioned tool because it's actually convenient.

**Evidence:** BCG's 10/20/70 — 70% of the challenge is people and process; leaders plan to upskill >50% of employees vs 20% for laggards; Deloitte finds talent readiness the *lowest-scoring* dimension (20% "highly prepared," falling); MIT NANDA found individual adoption succeeding while formal enterprise builds stalled.

**Smell test:** *"What's the change budget relative to the technology budget?"* If change ≪ technology, expect licence shelf-ware.

**Mitigation:** line managers (not a central lab) own adoption; measure weekly active use per workflow, not licences; make the sanctioned tool better than shadow AI or absorb the shadow.

### 7. Operating-model failures — pilots without owners

**What it looks like:** an innovation lab producing demos with no path to a P&L; twelve simultaneous pilots, none with production funding; a "centre of excellence" that excellently blocks; nobody empowered to change the process the AI is supposed to improve; buy-vs-build decided by ideology rather than the 67%-vs-33% deployment evidence.

**Evidence:** CEO-level governance oversight is the attribute *most correlated* with bottom-line impact — only 28% have it; BCG leaders make fewer, bigger bets; NANDA found purchased/partnered solutions reached deployment ~2× as often as internal builds, with successful buyers holding vendors to business metrics.

**Smell test:** *"Who owns this in eighteen months — name and budget line?"* A pilot the business hasn't pre-committed to operate is a demo.

**Mitigation:** every initiative has a business owner with P&L accountability from day one; a portfolio governance board that kills fast (>40% cancellation is fine *if it happens early and cheaply*); production funding contingent on the ten-step gate in [05](05_DECISION_FRAMEWORK.md).

---

## The compound failure — how they chain

Real post-mortems rarely show one category; they chain: **an ungoverned pilot (4) on unready data (2) automating an unredesigned process (3) with unexamined economics (5), owned by nobody (7)** — and the write-up blames "the technology" (1). The screening questions above exist to break the chain at proposal time, when it costs a meeting instead of a year.

## The pre-mortem checklist (run on every AI proposal)

| # | Question | Kills the failure mode |
|---|---|---|
| 1 | Why an agent and not a workflow? | Technology |
| 2 | Name the datasets, owners, permissions, freshness | Data |
| 3 | What does the process look like after — which steps disappear? | Process |
| 4 | Can it pass security review today? Who owns the agent? | Governance |
| 5 | Cost per task at volume, with the HITL ratio doubled? | Economics |
| 6 | Change budget vs technology budget? | People |
| 7 | Who operates this in 18 months — name and budget line? | Operating model |

Seven questions, ten minutes, most bad projects dead before they consume a year. That is the highest-ROI governance artifact in this entire package.
