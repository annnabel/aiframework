import type { SourceId } from "./types";

// Side-by-side comparisons for commonly-confused pairs, each supported
// directly by the source material.

export interface ComparePair {
  id: string;
  title: string;
  a: { name: string; points: string[] };
  b: { name: string; points: string[] };
  verdict: string;
  conceptIds: string[];
  sources: SourceId[];
}

export const comparePairs: ComparePair[] = [
  {
    id: "workflow-agent",
    title: "Workflow vs Agent",
    a: {
      name: "Workflow",
      points: [
        "Model steps orchestrated on predefined paths",
        "Cheaper, testable, reliable",
        "Right wherever the path is predictable",
        "Where most production “agent” value actually is",
      ],
    },
    b: {
      name: "Agent",
      points: [
        "Model directs its own control flow (plan → act → observe → iterate)",
        "Needs identity, policy, trajectory evals, budget caps",
        "Right for genuinely dynamic, unpredictable paths",
        "~130 of thousands of “agentic” vendors assessed as real (agent washing)",
      ],
    },
    verdict:
      "Use workflows wherever the path is predictable; choose the least-agentic architecture that solves the problem. “Why an agent and not a workflow?” is the single best reliability question.",
    conceptIds: ["workflow-vs-agent", "agentic-ai"],
    sources: ["03", "10"],
  },
  {
    id: "rag-finetune",
    title: "RAG vs Fine-tuning",
    a: {
      name: "Retrieval (RAG)",
      points: [
        "Supplies knowledge: fresh, citable, permissioned",
        "Instantly updatable; enforces access control",
        "The answer for volatile facts and internal documents",
        "Fix retrieval when the right facts didn't arrive",
      ],
    },
    b: {
      name: "Fine-tuning",
      points: [
        "Encodes stable behaviour: format, tone, register, tool style",
        "Poor at injecting facts: limited capacity, no citations, instant staleness",
        "Biggest enterprise use: cost compression via distillation",
        "Consider only when evals still fail after prompting and context engineering",
      ],
    },
    verdict:
      "“RAG = knowledge, fine-tuning = behaviour” is mostly true — but in 2026 context engineering carries most behaviour work, production systems combine the approaches, and evals decide, not doctrine.",
    conceptIds: ["rag", "fine-tuning", "context-engineering"],
    sources: ["04", "14"],
  },
  {
    id: "openweight-opensource",
    title: "Open-weight vs Open-source",
    a: {
      name: "Open-weight",
      points: [
        "Weights downloadable and runnable (DeepSeek V4, Qwen 3.x)",
        "Licence terms vary — some restrict commercial use",
        "Your self-hosting escape hatch and negotiating leverage",
      ],
    },
    b: {
      name: "Open-source",
      points: [
        "Weights plus a permissive licence (rarely: data and code too)",
        "MIT/Apache don't restrict; Llama and Kimi do",
        "The label often misapplied — read the licence, not the label",
      ],
    },
    verdict:
      "Often conflated. The decision at stake is legal exposure: the licence, not the marketing label, determines what you can do.",
    conceptIds: ["open-weight", "open-source"],
    sources: ["03"],
  },
  {
    id: "acp-ucp",
    title: "ACP vs UCP (and the AP2 layer beneath)",
    a: {
      name: "ACP — OpenAI + Stripe",
      points: ["Checkout-focused", "Live in ChatGPT", "Reaches ChatGPT's surfaces"],
    },
    b: {
      name: "UCP — Google + Shopify",
      points: ["Full commerce journey", "Google surfaces + Microsoft Copilot checkout", "Launched Jan 2026"],
    },
    verdict:
      "Not complementary layers — the competing pair; merchants implement both. Beneath both sits AP2 (FIDO-governed signed payment mandates), the usually-omitted and arguably most durable piece. And note: IBM's old “ACP” merged into A2A — it no longer exists.",
    conceptIds: ["acp", "ucp", "ap2"],
    sources: ["06", "14"],
  },
  {
    id: "pricing-models",
    title: "Consumption vs Outcome pricing",
    a: {
      name: "Consumption / credits",
      points: [
        "Pay per use: tokens, credits, actions — the enterprise default",
        "Credit-conversion opacity (1–200+ credits/interaction)",
        "Model worst-case bills, not demo-case",
      ],
    },
    b: {
      name: "Per-outcome",
      points: [
        "Pay per completed outcome (Fin $0.99/resolution)",
        "Established only where outcomes are countable — support above all",
        "Audit how “resolution” is defined and gamed",
      ],
    },
    verdict:
      "Hybrid base + usage is the actual standard (~41% of SaaS); pure seats fell to ~15%. Outcome pricing transfers risk to the vendor but invites definition gaming — and vendors increasingly sell all three models simultaneously.",
    conceptIds: ["consumption-pricing", "per-outcome-pricing", "per-seat-pricing"],
    sources: ["09", "03"],
  },
  {
    id: "copilot-agent",
    title: "Copilot vs Autonomous agent",
    a: {
      name: "Copilot",
      points: [
        "Assistive AI — the human does the work",
        "Behind 80% of users' reported individual gains",
        "Increasingly rebranded “agent” without the autonomy changing",
      ],
    },
    b: {
      name: "Autonomous agent",
      points: [
        "Runs multiple steps unattended",
        "Near-zero evidence of unsupervised consequential action at enterprise scale",
        "Demands the full governance stack: identity, policy, evals, caps",
      ],
    },
    verdict:
      "Ask precisely what it can do without a human, what governs that, and the human-in-the-loop ratio at named production customers.",
    conceptIds: ["agentic-ai", "hitl-ratio"],
    sources: ["07", "09"],
  },
];
