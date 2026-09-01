import type { FailureMode } from "./types";

// The seven failure categories, from 10_ENTERPRISE_FAILURE_MODES.md.
// Base rates from the source: >80% of enterprises report no material EBIT
// effect from AI; ~25% moved even 40% of pilots to production; Gartner
// expects >40% of agentic projects cancelled by end-2027. The failures are
// patterned — which means they're screenable.

export const failureModes: FailureMode[] = [
  {
    id: "technology",
    num: 1,
    name: "Technology failures",
    oneLiner: "The wrong tool, not a bad tool",
    looksLike:
      "An autonomous agent deployed where a deterministic workflow belonged; a “GenAI” solution to a problem that needed a form; demos that never survive real inputs; tools that don't retain context or fit the workflow.",
    evidence:
      "Gartner's “agent washing” finding — of thousands of vendors claiming agentic products, only ~130 were assessed as real; most agentic projects are early-stage experiments driven by hype and often misapplied.",
    smellTest:
      "“Why does this need to be an agent?” If the answer describes a predictable path, it's a workflow wearing a costume — build the workflow (cheaper, testable, reliable).",
    mitigation:
      "Choose the least-agentic architecture that solves the problem; pilot on production-realistic data from day one; require an eval suite before any go/no-go.",
    originLayer: "build",
    visibleLayer: "apps",
    sources: ["10"],
  },
  {
    id: "data",
    num: 2,
    name: "Data failures",
    oneLiner: "The pilot's silent killer",
    looksLike:
      "The retrieval corpus is stale, unpermissioned, or wrong; document access controls don't flow into agent answers (an over-permissioned agent is a breach generator); the data needed for the use case lives in a system nobody scoped.",
    evidence:
      "Stanford AI Index 2026 identifies data infrastructure — not models — as the primary barrier; Layer-4 problems are where most production failures originate.",
    smellTest:
      "“Show me the three datasets this depends on, their owner, their freshness, and their permissions model.” Hand-waving on any of the four predicts failure.",
    mitigation:
      "Treat data readiness as a gate, not “phase 2”; permission-aware retrieval as a hard requirement; a named data owner in the project team.",
    originLayer: "data",
    visibleLayer: "apps",
    sources: ["10"],
  },
  {
    id: "process",
    num: 3,
    name: "Process failures",
    oneLiner: "Bolting AI onto an unredesigned workflow",
    looksLike:
      "AI drafts the document, then the same five approvals happen anyway; the “assistant” adds a step instead of removing one; savings appear in nobody's budget because the process didn't change.",
    evidence:
      "The strongest finding in the entire evidence base — workflow redesign is the single biggest driver of EBIT impact (McKinsey), yet only ~21% of organisations redesign any workflow; Deloitte finds 37% use AI at “surface level” with minimal process change.",
    smellTest:
      "“What does the process look like AFTER, and which steps disappear?” If the after-picture is the before-picture plus AI, value will be invisible.",
    mitigation:
      "Redesign the workflow first, insert AI second; assign the saved capacity explicitly (redeploy, or reduce, or grow throughput — decide, don't drift).",
    originLayer: "apps",
    visibleLayer: "apps",
    sources: ["10"],
  },
  {
    id: "governance",
    num: 4,
    name: "Governance failures",
    oneLiner: "Dying in security review — or worse, not dying there",
    looksLike:
      "The pilot that works but can't answer “who owns this agent, what can it access, and who gets paged?”; the agent with standing super-user credentials; the prompt-injectable agent holding the lethal trifecta (private data + untrusted input + exfiltration path); ungoverned SaaS AI features that switched themselves on.",
    evidence:
      "Only 21% have mature agentic governance while ~74% plan adoption (Deloitte); inadequate risk controls is one of Gartner's three cancellation drivers; the incident record (EchoLeak, Salesloft Drift, malicious MCP server, production-DB deletion) shows what un-governed agents do.",
    smellTest:
      "“Can this pass security review today — identity, least privilege, policy on tool calls, audit trail, kill switch?” A “we'll add governance later” is a cancellation notice with a delay.",
    mitigation:
      "The seven-control stack (see Governance); governance capability built before the agent portfolio scales, matched to autonomy level.",
    originLayer: "control",
    visibleLayer: "apps",
    sources: ["10", "08"],
  },
  {
    id: "economics",
    num: 5,
    name: "Economics failures",
    oneLiner: "The unit math never closed",
    looksLike:
      "The pilot cost per task looked fine at demo scale; at production volume the reasoning loops, retries and tool calls blow it up; the human-review ratio never fell; consumption credits (1–200+ per interaction) produced an unbudgetable bill; nobody ever calculated value per task at all.",
    evidence:
      "“Escalating costs, unclear business value” — the first two of Gartner's three cancellation drivers; 20% of McKinsey respondents say AI operating costs now constrain use; agent-loop consumption is non-deterministic by nature.",
    smellTest:
      "“What's the all-in cost per completed task at our volume — and the same number if the HITL ratio doubles?” No number, no scale-up.",
    mitigation:
      "The five-link chain (see Economics); routing/caching/batching engineered from the start; per-agent budget caps; scale threshold of value ≥ 3× cost on measured production traffic.",
    originLayer: "serving",
    visibleLayer: "apps",
    sources: ["10", "09"],
  },
  {
    id: "people",
    num: 6,
    name: "People & change failures",
    oneLiner: "The 70% that gets 10% of the budget",
    looksLike:
      "Licences deployed, training skipped; middle managers routing around the tool; usage that spikes at launch and decays to the enthusiasts; the shadow-AI economy (personal ChatGPT) outperforming the sanctioned tool because it's actually convenient.",
    evidence:
      "BCG's 10/20/70 — 70% of the challenge is people and process; leaders plan to upskill >50% of employees vs 20% for laggards; Deloitte finds talent readiness the lowest-scoring dimension; MIT NANDA found individual adoption succeeding while formal enterprise builds stalled.",
    smellTest:
      "“What's the change budget relative to the technology budget?” If change ≪ technology, expect licence shelf-ware.",
    mitigation:
      "Line managers (not a central lab) own adoption; measure weekly active use per workflow, not licences; make the sanctioned tool better than shadow AI or absorb the shadow.",
    originLayer: "apps",
    visibleLayer: "apps",
    sources: ["10"],
  },
  {
    id: "operating-model",
    num: 7,
    name: "Operating-model failures",
    oneLiner: "Pilots without owners",
    looksLike:
      "An innovation lab producing demos with no path to a P&L; twelve simultaneous pilots, none with production funding; a “centre of excellence” that excellently blocks; nobody empowered to change the process the AI is supposed to improve; buy-vs-build decided by ideology rather than the 67%-vs-33% deployment evidence.",
    evidence:
      "CEO-level governance oversight is the attribute most correlated with bottom-line impact — only 28% have it; BCG leaders make fewer, bigger bets; NANDA found purchased/partnered solutions reached deployment ~2× as often as internal builds.",
    smellTest:
      "“Who owns this in eighteen months — name and budget line?” A pilot the business hasn't pre-committed to operate is a demo.",
    mitigation:
      "Every initiative has a business owner with P&L accountability from day one; a portfolio governance board that kills fast (>40% cancellation is fine if it happens early and cheaply); production funding contingent on the ten-step gate.",
    originLayer: "apps",
    visibleLayer: "apps",
    sources: ["10"],
  },
];

export const compoundFailure =
  "Real post-mortems rarely show one category; they chain: an ungoverned pilot (4) on unready data (2) automating an unredesigned process (3) with unexamined economics (5), owned by nobody (7) — and the write-up blames “the technology” (1). The screening questions exist to break the chain at proposal time, when it costs a meeting instead of a year.";

// The pre-mortem checklist — run on every AI proposal (doc 10).
export const preMortem = [
  { num: 1, question: "Why an agent and not a workflow?", kills: "Technology" },
  { num: 2, question: "Name the datasets, owners, permissions, freshness", kills: "Data" },
  { num: 3, question: "What does the process look like after — which steps disappear?", kills: "Process" },
  { num: 4, question: "Can it pass security review today? Who owns the agent?", kills: "Governance" },
  { num: 5, question: "Cost per task at volume, with the HITL ratio doubled?", kills: "Economics" },
  { num: 6, question: "Change budget vs technology budget?", kills: "People" },
  { num: 7, question: "Who operates this in 18 months — name and budget line?", kills: "Operating model" },
];

export const preMortemNote =
  "Seven questions, ten minutes, most bad projects dead before they consume a year. The highest-ROI governance artifact in the entire package.";
