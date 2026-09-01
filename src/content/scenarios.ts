import type { QuizQuestion, SourceId } from "./types";

// Scenario challenges: realistic Enterprise AI situations. Each step's
// debrief restates the reasoning from the source documents.

export interface Scenario {
  id: string;
  title: string;
  setting: string;
  brief: string;
  steps: QuizQuestion[];
  debrief: string[];
  sources: SourceId[];
}

export const scenarios: Scenario[] = [
  {
    id: "vendor-pitch",
    title: "The vendor pitch",
    setting: "Procurement review · 45 minutes with a vendor",
    brief:
      "A vendor proposes an “autonomous AI agent platform” for your claims-processing workflow. The demo is impressive: an agent reads a claim, checks policy terms, drafts a decision and updates the claims system. Pricing is consumption credits. You have 45 minutes with them.",
    steps: [
      {
        kind: "multi",
        id: "vp1",
        prompt: "Which layers of the stack is this pitch actually selling? (Select all that apply.)",
        options: [
          "Layer 5 — Build & Orchestration (the agent runtime and flows)",
          "Layer 4 — Data & Context (retrieval over your claims and policies)",
          "Layer 7 — Applications (the claims workflow itself)",
          "Layer 1 — Compute (GPUs)",
        ],
        correct: [0, 1, 2],
        explanation:
          "An “agent platform” for a business workflow bundles build/orchestration, data access and the application. That's the layer-annexation question: which layers am I buying, which am I marrying? Compute is invisible here — you buy its economics through the price.",
        sources: ["02", "07"],
      },
      {
        kind: "choice",
        id: "vp2",
        prompt:
          "The vendor says the agent “decides autonomously how to handle each claim.” Claims handling follows a documented decision procedure. What's the sharpest challenge?",
        options: [
          "How many parameters does the model have?",
          "Why an agent and not a workflow? A predictable path wants predefined steps — cheaper, testable, reliable. A workflow is fine; label it honestly",
          "Can it run on our cloud?",
          "Does it support multiple languages?",
        ],
        correct: 1,
        explanation:
          "The single best reliability question. Gartner's agent-washing finding (only ~130 of thousands of “agentic” vendors assessed as real) says most autonomy claims are workflows wearing costumes — which is fine, if labelled honestly.",
        sources: ["10", "07", "11"],
      },
      {
        kind: "choice",
        id: "vp3",
        prompt: "On the consumption-credit pricing, what number do you demand before anything else?",
        options: [
          "Price per 1,000 credits",
          "All-in cost per completed claim at your volume — including credit conversion and the production human-review ratio, and the same number if the HITL ratio doubles",
          "Discount for a three-year commitment",
          "Price per token",
        ],
        correct: 1,
        explanation:
          "Credit conversion is opaque (1–200+ credits per interaction) and the HITL ratio dominates task cost. Cost per completed task at target quality is the only number that survives contact with production.",
        sources: ["09", "11"],
      },
      {
        kind: "choice",
        id: "vp4",
        prompt:
          "The agent writes decisions into your claims system. Which demonstration do you require before security will ever approve this?",
        options: [
          "A penetration-test certificate",
          "The agent's identity, permission set and audit trail — and your policy engine blocking one of its tool calls, live",
          "The vendor's ISO 27001 certificate",
          "An SLA for uptime",
        ],
        correct: 1,
        explanation:
          "Agents are employees from a risk perspective: identity, permissions, audit, revocation. “Show the policy engine blocking a tool call” separates governance theatre from enforcement. Claims decisions are also automated decision-making — from 10 Dec 2026, Australian privacy policies must disclose ADM that significantly affects individuals.",
        sources: ["11", "08"],
      },
      {
        kind: "choice",
        id: "vp5",
        prompt: "Last five minutes. Which exit question do you put on the table?",
        options: [
          "Can we renegotiate pricing annually?",
          "If we leave in 18 months, what exactly do we get out — workflows, evals, embeddings, memory, audit logs — and in what format?",
          "Do you offer premium support?",
          "What's on the roadmap?",
        ],
        correct: 1,
        explanation:
          "Negotiate exit at entry — the only time you have leverage. A vendor without a crisp answer is planning your hostage situation (the lock-in 2×2's worst quadrant).",
        sources: ["05", "11"],
      },
    ],
    debrief: [
      "The pattern behind good vendor questions: force a number, force a demonstration, force a name, force the after-state, force the exit.",
      "Every vendor commoditises the layers it doesn't own to funnel value to the layer it does — place the pitch on the map before evaluating features.",
      "This proposal writes to business systems and affects individuals: governance readiness (identity → policy → evals → managed autonomy) must match the autonomy on offer, and ADM transparency duties apply from 10 Dec 2026.",
    ],
    sources: ["05", "07", "09", "10", "11"],
  },
  {
    id: "board-briefing",
    title: "The board briefing",
    setting: "You have five minutes of a board meeting",
    brief:
      "The board has read the headlines: “95% of AI pilots fail”, “agents will replace departments”, “the EU delayed its AI Act”. You have five minutes to leave them with an accurate picture and one decision to own.",
    steps: [
      {
        kind: "choice",
        id: "bb1",
        prompt: "A director quotes “95% of AI pilots fail.” What's the accurate framing?",
        options: [
          "It's true — AI doesn't work",
          "It's false — vendors say most pilots succeed",
          "The specific number is methodologically weak, but directionally echoed by stronger sources: only ~25% of organisations moved even 40% of pilots to production, and >80% report no material EBIT effect",
          "It only applies to small companies",
        ],
        correct: 2,
        explanation:
          "The MIT NANDA figure is real but weak (52 interviews, conference surveys). The stronger evidence: Deloitte's 25%-moved-≥40%-of-pilots finding and McKinsey's >80%-no-material-EBIT — improving, still the bottleneck. Preserve the uncertainty; keep the direction.",
        sources: ["09", "13"],
      },
      {
        kind: "choice",
        id: "bb2",
        prompt: "A director asks: “The EU deferred its AI Act — so nothing applies?” Your correction:",
        options: [
          "Correct, nothing until 2027",
          "The high-risk regime was deferred to Dec 2027, but Article 50 transparency (label chatbots, mark synthetic content) and GPAI enforcement are live now, and prohibitions have applied since Feb 2025",
          "The EU AI Act doesn't reach Australian companies",
          "Only fines were deferred",
        ],
        correct: 1,
        explanation:
          "The Digital Omnibus (verified on EUR-Lex) deferred Annex III to 2 Dec 2027 — but 2 Aug 2026 still activated real obligations, and extraterritorial scope means an Australian enterprise whose output reaches the EU is in scope. Closer to home: ADM privacy transparency lands 10 Dec 2026.",
        sources: ["08"],
      },
      {
        kind: "choice",
        id: "bb3",
        prompt: "Which single decision does the evidence say the board (and CEO) must own?",
        options: [
          "Which model vendor to standardise on",
          "AI governance ownership at CEO level — the strongest correlate of bottom-line impact, held by only 28%",
          "The GPU procurement strategy",
          "The office return policy",
        ],
        correct: 1,
        explanation:
          "CEO-level governance oversight is the attribute most correlated with EBIT impact. Model choice, by contrast, is the least sticky decision in the stack.",
        sources: ["09", "01"],
      },
      {
        kind: "choice",
        id: "bb4",
        prompt: "The one-sentence mental model you leave them with:",
        options: [
          "AI is overhyped; wait for the technology to mature",
          "Models are becoming cheap and swappable; value comes from redesigned workflows on your own data; risk lives at the tool call; and the durable assets are your evals, your governance, and your exit options",
          "Whoever buys the most GPUs wins",
          "Every process should get an autonomous agent",
        ],
        correct: 1,
        explanation:
          "The cheat sheet's closing sentence — the whole package compressed. If the board holds one sentence, it's this one.",
        sources: ["00"],
      },
    ],
    debrief: [
      "Boards absorb structure, not statistics: the seven layers, the 88/37/6 adoption-value funnel, and the one decision they own (CEO-level governance).",
      "Where credible sources disagree (pilot failure rates, coding productivity), preserve the disagreement rather than smoothing it — that's what makes the briefing trustworthy.",
    ],
    sources: ["00", "01", "08", "09"],
  },
  {
    id: "architecture-review",
    title: "The architecture review",
    setting: "Design review · an internal agent proposal",
    brief:
      "An internal team proposes a research agent for your analysts: it reads confidential deal documents, browses the public web for market context, and emails summary reports to distribution lists. It runs on a standing service account “to simplify permissions.” You're the reviewer.",
    steps: [
      {
        kind: "choice",
        id: "ar1",
        prompt: "What's the headline security problem in this design?",
        options: [
          "Email is an outdated channel",
          "It combines the lethal trifecta: private data (deal docs) + untrusted input (public web) + an exfiltration path (email) in one agent — and prompt injection is unsolved",
          "Browsing is too slow",
          "Analysts should write their own reports",
        ],
        correct: 1,
        explanation:
          "A malicious web page can inject instructions the agent may obey; with private data in context and an email tool available, that's an exfiltration engine. Containment is the defence: split the agent, gate the sends, sandbox the browsing.",
        sources: ["08", "05"],
      },
      {
        kind: "choice",
        id: "ar2",
        prompt: "The standing service account “to simplify permissions” — what's the correct pattern?",
        options: [
          "Keep it but rotate the password monthly",
          "Short-lived, task-scoped, user-bound credentials (on-behalf-of): every read runs under the requesting analyst's delegated authority",
          "Give the agent admin rights to reduce friction",
          "Use a shared team account",
        ],
        correct: 1,
        explanation:
          "The worked example's core pattern: the agent never has super-user access; retrieval and writes happen under the user's delegated, scoped authority. An over-permissioned agent is a breach generator.",
        sources: ["06", "08"],
      },
      {
        kind: "multi",
        id: "ar3",
        prompt: "Which control-plane elements must exist before this ships? (Select all that apply.)",
        options: [
          "The agent registered with its own identity and a named owner",
          "A default-deny policy engine evaluating every tool call",
          "Trajectory-level evals and tracing",
          "A per-agent budget cap",
          "A guarantee the model will never hallucinate",
        ],
        correct: [0, 1, 2, 3],
        explanation:
          "Four of the seven-control stack apply directly; no control can guarantee non-hallucination — that's what grounding, evals and human review manage. Budget caps double as runaway-agent safety.",
        sources: ["08"],
      },
      {
        kind: "choice",
        id: "ar4",
        prompt:
          "The team says evals will come “once it's stable.” Per the material, when do evals actually need to exist?",
        options: [
          "After launch, from production feedback",
          "Before technique choices and before go-live: build the eval harness first — evals decide, not doctrine, and no evals = no evidence",
          "Only if the agent is fine-tuned",
          "Evals are optional for internal tools",
        ],
        correct: 1,
        explanation:
          "The knowledge-vs-behaviour tree ends every branch the same way: let evals tell you when to escalate. And the eval loop (production traces → tomorrow's test cases) is what makes model swaps and versioning safe.",
        sources: ["04", "06"],
      },
    ],
    debrief: [
      "Security lives at the tool call, not the conversation: policy engine + delegated identity are the real controls; the model's good intentions are not a control.",
      "The design review question that finds this class of problem: “Where could untrusted input, private data, and an exfiltration path meet in this design?”",
      "Governance here is production-enablement: with identity, policy, evals and caps in place, this agent can actually ship.",
    ],
    sources: ["06", "08", "11"],
  },
  {
    id: "build-or-buy",
    title: "The build-or-buy call",
    setting: "Investment committee · two proposals, one budget",
    brief:
      "Two proposals compete for funding. A: build a custom agent platform (archetype 5) for expense-report processing. B: build a custom advisory workflow (archetype 4/5) that encodes your firm's differentiated client methodology, where data lives across three systems. You can fund one properly.",
    steps: [
      {
        kind: "choice",
        id: "bo1",
        prompt: "Proposal A — custom-building expense processing. What does the framework say?",
        options: [
          "Fund it — expense data is sensitive",
          "Challenge it: expense processing is commodity. Buy for commodity (bought solutions historically reach production ~2× as often); custom build is for the differentiating 10–20%",
          "Fund it — building is always cheaper long-term",
          "Merge both proposals",
        ],
        correct: 1,
        explanation:
          "Archetype 5 for a commodity problem is the classic misallocation: months of engineering, the full Layer-6 governance burden, and the same AI your competitors get from a product. The 67%-vs-33% deployment evidence favours buying commodity capability.",
        sources: ["04", "09"],
      },
      {
        kind: "choice",
        id: "bo2",
        prompt:
          "Proposal B — the differentiated methodology across three systems. Which archetype conversation is right?",
        options: [
          "Archetype 1 — wait for a SaaS vendor to ship it",
          "Archetype 4 (managed runtime) vs 5 (frameworks): differentiating, cross-system, needs your engineering — the choice turns on how much governance you can inherit vs must assemble",
          "Archetype 6 — self-host everything",
          "Archetype 2 — buy more assistant seats",
        ],
        correct: 1,
        explanation:
          "A differentiating cross-system workflow is exactly what archetypes 4–5 exist for. Managed runtimes inherit identity, policy and evals as services; frameworks maximise control but you assemble the full control plane yourself. Governance effort is conserved.",
        sources: ["04"],
      },
      {
        kind: "choice",
        id: "bo3",
        prompt: "Before funding B, which data question gates everything?",
        options: [
          "Which vector database to use",
          "Name the three datasets, their owners, freshness, and permissions model — if the data isn't ready, this is a data project first",
          "How many tokens the corpus contains",
          "Whether to use embeddings or keywords",
        ],
        correct: 1,
        explanation:
          "Step 4 of the ten-step process, and failure-mode screen #2. Hand-waving on owner, freshness or permissions predicts failure — data readiness is a gate, not phase 2.",
        sources: ["05", "10"],
      },
      {
        kind: "choice",
        id: "bo4",
        prompt: "The committee asks what “funding B properly” includes beyond engineering. Your answer:",
        options: [
          "A bigger GPU budget",
          "Evals, monitoring, support ownership, change management and a scale-out plan — a pilot without this list budgeted is a demo, not a project. And a change budget comparable to the technology budget",
          "A second vendor as backup",
          "A patent application",
        ],
        correct: 1,
        explanation:
          "Step 10 of the decision process, plus the people-failure screen: leaders spend ~70% of effort on people and process (BCG's 10/20/70). Value comes from the redesigned workflow, not the deployed tool.",
        sources: ["05", "10", "09"],
      },
    ],
    debrief: [
      "The portfolio, not the archetype, is the decision: seats and embedded AI for the base, platform configuration for departmental automation, custom build only for the differentiating few.",
      "Steps 1–2 of the decision process (what are we changing; least capability that does it) killed proposal A before any vendor comparison was needed.",
      "Every step toward control converts inherited governance into required governance — that conversion is a real budget line in proposal B.",
    ],
    sources: ["04", "05", "09", "10"],
  },
];

export const scenarioById = new Map(scenarios.map((s) => [s.id, s]));
