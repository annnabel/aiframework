import type { ExecQuestion } from "./types";

// The questions playbook, from 11_EXECUTIVE_QUESTIONS.md.
// Good answers are specific, quantified and demo-able; bad answers are adjectives.

export interface Audience {
  id: string;
  name: string;
  intro: string;
  questions: ExecQuestion[];
}

export const audiences: Audience[] = [
  {
    id: "vendor",
    name: "To a vendor",
    intro: "Expose lock-in, hidden costs, governance theatre and autonomy inflation.",
    questions: [
      {
        audience: "vendor",
        question: "Show me this working on our data, with our permissions, not your demo corpus.",
        screensFor: "Data limitations, permission-blind retrieval — the #1 demo-to-production gap.",
      },
      {
        audience: "vendor",
        question:
          "What is the all-in cost per completed task at our volume — including credits/actions conversion, and with the human-review ratio your reference customers actually see in production?",
        screensFor: "Hidden costs; credit-pack opacity; HITL reality vs demo.",
      },
      {
        audience: "vendor",
        question:
          "If we leave you in 18 months, what exactly do we get out — workflows, evals, embeddings, memory, audit logs — and in what format?",
        screensFor: "Lock-in; a vendor without a crisp answer is planning your hostage situation.",
      },
      {
        audience: "vendor",
        question:
          "Which model(s) run under the hood, can we swap them, and can your model access be revoked from the supply side?",
        screensFor: "Model dependency; BYOM reality; the Cursor lesson.",
      },
      {
        audience: "vendor",
        question:
          "Walk me through your eval suite for our use case — what's measured, what gates a release, and can we run it ourselves?",
        screensFor: "Weak evaluations; “we test extensively” is not an answer.",
      },
      {
        audience: "vendor",
        question:
          "Show me an agent's identity, permission set, and audit trail in your product — and how our policy engine can block one of its tool calls.",
        screensFor: "Governance theatre vs enforcement; agent-washing.",
      },
      {
        audience: "vendor",
        question:
          "Which of your “agentic” features run autonomously in production at named customers, and at what human-in-the-loop ratio?",
        screensFor: "Autonomy inflation; Gartner's ~130-real-vendors finding.",
      },
      {
        audience: "vendor",
        question:
          "Is our data used for training or product improvement — under exactly which contract clause — and who are the sub-processors?",
        screensFor: "Data terms; the clause matters more than the marketing page.",
      },
      {
        audience: "vendor",
        question:
          "Map your “responsible AI” controls to ISO 42001 / NIST AI RMF — which are enforced at runtime vs written in a policy PDF?",
        screensFor: "Responsible-AI-as-slogan.",
      },
      {
        audience: "vendor",
        question:
          "What happens to our contract price when your model costs fall 10× — do we share the deflation?",
        screensFor: "Pricing asymmetry; capability-cost falls ~50×/year and your price shouldn't be flat forever.",
      },
    ],
  },
  {
    id: "cto",
    name: "To the CTO / CIO",
    intro: "Test whether strategy, portfolio and control points are real or aspirational.",
    questions: [
      {
        audience: "cto",
        question: "Which layer of the stack are we differentiated at, and does our spend map to that?",
        screensFor: "Strategy: differentiation is almost always data + workflows, not infrastructure.",
      },
      {
        audience: "cto",
        question:
          "What's our model portfolio and routing policy — who decided it, and when did we last swap a model on evals?",
        screensFor: "Single-lab dependency; whether swappability is real or aspirational.",
      },
      {
        audience: "cto",
        question: "Where is our policy enforcement point for agent tool calls, and who controls it?",
        screensFor: "The control-plane choke point.",
      },
      {
        audience: "cto",
        question:
          "How many agents exist in our estate right now — including SaaS-embedded ones — and where's the register?",
        screensFor: "Shadow agents; embedded-AI sprawl.",
      },
      {
        audience: "cto",
        question: "What breaks if our primary AI vendor has a bad quarter, a price rise, or an outage?",
        screensFor: "Concentration risk, tested not assumed.",
      },
      {
        audience: "cto",
        question:
          "Are we betting on protocols (MCP/A2A) or on frameworks — and how much code is portable?",
        screensFor: "Framework churn.",
      },
    ],
  },
  {
    id: "data",
    name: "To the data team",
    intro: "Data readiness and permissions are where pilots silently die.",
    questions: [
      {
        audience: "data",
        question:
          "For our top three AI use cases: where does the data live, how fresh is it, and who owns quality?",
        screensFor: "Data readiness as a gate.",
      },
      {
        audience: "data",
        question:
          "How do document permissions flow into retrieval — what does a query return for a user who shouldn't see the source?",
        screensFor: "The over-permissioned-agent breach generator; demand a demonstration.",
      },
      {
        audience: "data",
        question: "What did we embed/index, in whose platform, and can we re-point it?",
        screensFor: "Data-gravity lock-in accruing silently.",
      },
      {
        audience: "data",
        question: "Where does agent memory live, and under what retention and access policy?",
        screensFor: "A new store of business data nobody classified.",
      },
    ],
  },
  {
    id: "architect",
    name: "To the AI architect",
    intro: "The reliability and containment questions that find missing control points.",
    questions: [
      {
        audience: "architect",
        question: "Why is this an agent and not a workflow?",
        screensFor: "The single best reliability question; predictable path → workflow.",
      },
      {
        audience: "architect",
        question:
          "Show me the eval suite: offline gates, online monitoring, trajectory-level scoring — and the last regression it caught.",
        screensFor: "Evals discipline; a suite that has never caught anything isn't one.",
      },
      {
        audience: "architect",
        question:
          "Under whose authority does the agent act — how are user-bound, short-lived, scoped credentials enforced?",
        screensFor: "Least-privilege delegation vs standing super-user access.",
      },
      {
        audience: "architect",
        question:
          "Where could untrusted input, private data, and an exfiltration path meet in this design?",
        screensFor: "The lethal trifecta; prompt injection is unsolved — containment is the answer.",
      },
      {
        audience: "architect",
        question:
          "What's the token budget per task, the cap per agent, and what happens when it's hit?",
        screensFor: "Runaway loops; FinOps-as-safety.",
      },
      {
        audience: "architect",
        question:
          "Which model tier does each step route to, and what would this cost on the cheap tier with the frontier model only where evals demand it?",
        screensFor: "Routing discipline — the biggest cost lever.",
      },
    ],
  },
  {
    id: "business",
    name: "To the business owner",
    intro: "Value lands in a budget or it doesn't land at all.",
    questions: [
      {
        audience: "business",
        question:
          "What are we actually changing — task, decision, process, or product — and what disappears from the workflow?",
        screensFor: "Process-redesign failure; the biggest EBIT driver.",
      },
      {
        audience: "business",
        question: "What's the measured baseline today, so we can prove impact later?",
        screensFor: "No baseline = unfalsifiable success theatre.",
      },
      {
        audience: "business",
        question:
          "Who on your team owns this in production — name, budget line, and the capacity you'll redeploy if it works?",
        screensFor: "Operating-model failure; value that lands in nobody's budget.",
      },
      {
        audience: "business",
        question: "What's your change plan and its budget relative to the technology spend?",
        screensFor: "The 70% that gets 10%.",
      },
    ],
  },
  {
    id: "procurement",
    name: "To procurement",
    intro: "Negotiate exit at entry — the only time you have leverage.",
    questions: [
      {
        audience: "procurement",
        question:
          "Which pricing model — seat, consumption, outcome — and what's the worst-case monthly bill at P95 usage?",
        screensFor: "Unbudgetable variance; credit opacity.",
      },
      {
        audience: "procurement",
        question:
          "How is “resolution”/“outcome” defined, measured, audited — and what stops it being gamed?",
        screensFor: "Outcome-definition gaming.",
      },
      {
        audience: "procurement",
        question: "Does this draw down our cloud commit, and is that steering us to a worse product?",
        screensFor: "The ~$470B commit-economy distortion.",
      },
      {
        audience: "procurement",
        question:
          "What are the exit provisions: data export, eval export, transition assistance, price protection at renewal?",
        screensFor: "Negotiate exit at entry — the only time you have leverage.",
      },
    ],
  },
  {
    id: "security",
    name: "To security",
    intro: "Containment posture, supply chain, and kill-switch reality.",
    questions: [
      {
        audience: "security",
        question: "What's our agent inventory, and which agents hold the lethal trifecta today?",
        screensFor: "Containment posture.",
      },
      {
        audience: "security",
        question:
          "How do we vet and monitor MCP servers and third-party tools — supply chain included?",
        screensFor: "The malicious-MCP-server incident class; tool-description poisoning.",
      },
      {
        audience: "security",
        question: "Can we kill any agent in one step, and have we rehearsed it?",
        screensFor: "Kill-switch reality.",
      },
      {
        audience: "security",
        question:
          "Do approval interfaces show the actual action payload, or the agent's summary of it?",
        screensFor: "Trust-exploitation — agents can manipulate what reviewers see.",
      },
      {
        audience: "security",
        question: "Have we red-teamed the top deployments, and what did we change afterwards?",
        screensFor: "Red teaming as practice, not paperwork.",
      },
    ],
  },
  {
    id: "legal",
    name: "To legal / risk",
    intro: "The obligations that are live now, not the ones in the headlines.",
    questions: [
      {
        audience: "legal",
        question:
          "Do any of our AI outputs reach the EU — and are our chatbots disclosed and synthetic content marked, as required now?",
        screensFor: "Art 50 is live; extraterritorial scope.",
      },
      {
        audience: "legal",
        question:
          "What's our inventory of automated decision-making affecting individuals, ahead of the 10 December 2026 privacy-policy transparency deadline?",
        screensFor: "The nearest binding Australian date.",
      },
      {
        audience: "legal",
        question:
          "What's our exposure to training-data copyright — given Australia has no TDM exception?",
        screensFor: "Unhedged legal risk; licences or a documented risk position.",
      },
      {
        audience: "legal",
        question:
          "If regulated: how do we evidence the APRA/ASIC AI expectations — board literacy, supply-chain visibility, agentic controls, fallbacks?",
        screensFor: "Supervisory expectations already in force.",
      },
      {
        audience: "legal",
        question:
          "When an agent causes harm, who is accountable — and does our insurance know about our agent estate?",
        screensFor: "Liability allocation before the incident, not after.",
      },
    ],
  },
];

export const questionPattern =
  "Every question does one of five jobs: (1) forces a number where the pitch offers an adjective; (2) forces a demonstration where the pitch offers a slide; (3) forces a name where the pitch offers a committee; (4) forces the after-state where the pitch describes the tool; (5) forces the exit while you still have leverage. If you remember nothing else: numbers, demos, names, after-states, exits.";

// ── Vendor marketing translator (07) ─────────────────────────────────

export interface TranslatorRow {
  says: string;
  means: string;
  ask: string;
}

export const marketingTranslator: TranslatorRow[] = [
  {
    says: "Agentic AI",
    means:
      "Anything from a chatbot with one tool to genuine autonomous loops; Gartner found only ~130 of thousands of “agentic” vendors were real (“agent washing”).",
    ask: "Show me the agent deciding its own control flow on our data — or is this a workflow? (A workflow is fine; label it honestly.)",
  },
  {
    says: "AI platform",
    means: "We bundle layers 3–6 so you buy them together.",
    ask: "Which layers am I buying, which am I marrying, and what's the exit cost per layer?",
  },
  {
    says: "Agent fabric / control plane",
    means: "Registry + identity + policy for agents — including, allegedly, other vendors'.",
    ask: "Which third-party agents can you actually inventory, permission and kill today — demo it.",
  },
  {
    says: "Copilot",
    means: "Assistive AI, human does the work; increasingly rebranded “agent” without the autonomy changing.",
    ask: "What can it do without a human — precisely — and what governs that?",
  },
  {
    says: "Autonomous agent",
    means:
      "Runs multiple steps unattended in a sandbox; near-zero evidence of unsupervised consequential action at enterprise scale.",
    ask: "What's the human-in-the-loop ratio in your reference customers' production deployments?",
  },
  {
    says: "AI operating system",
    means: "We want to be the layer everything else must integrate through.",
    ask: "Who else has shipped on this “OS”, and what happens to my apps if I leave it?",
  },
  {
    says: "Enterprise context / grounded in your data",
    means: "Retrieval over the data we can index — permissions handling varies wildly.",
    ask: "Walk me through how document permissions flow into agent answers, and what a mis-permissioned query returns.",
  },
  {
    says: "Responsible AI",
    means: "We have principles and content filters.",
    ask: "Which controls are enforced at runtime vs written in a PDF? Map them to NIST AI RMF / ISO 42001.",
  },
  {
    says: "AI governance",
    means: "Dashboards; sometimes real policy enforcement.",
    ask: "Where is the enforcement point — can your policy engine block a non-compliant tool call, or just log it?",
  },
  {
    says: "Model-agnostic / BYOM",
    means: "The model slot is swappable; orchestration, memory, evals and governance usually aren't.",
    ask: "If I swap models tomorrow, what re-tuning do my prompts/evals need — and can model access be revoked from your side?",
  },
];
