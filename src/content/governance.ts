// Governance & regulation content, from 08_GOVERNANCE_REGULATION.md.
// Status labels preserved from the source: IN FORCE / ADOPTED / DEFERRED /
// PROPOSED / UNCERTAIN. Verified against primary sources on 1 Sept 2026.

export type RegStatus = "in-force" | "adopted" | "deferred" | "proposed" | "uncertain";

export interface RegItem {
  date: string;
  sortKey: string;
  jurisdiction: "EU" | "AU" | "US/Global";
  title: string;
  status: RegStatus;
  detail: string;
}

export const regTimeline: RegItem[] = [
  {
    date: "2 Feb 2025",
    sortKey: "2025-02",
    jurisdiction: "EU",
    title: "Prohibited practices (Art 5)",
    status: "in-force",
    detail:
      "Social scoring, manipulative techniques, most real-time biometric ID. Penalties to €35m or 7% of global turnover.",
  },
  {
    date: "10 Jun 2025",
    sortKey: "2025-06",
    jurisdiction: "AU",
    title: "Statutory tort for serious invasions of privacy",
    status: "in-force",
    detail: "Litigation risk for AI misuse of personal information.",
  },
  {
    date: "2 Aug 2025",
    sortKey: "2025-08",
    jurisdiction: "EU",
    title: "GPAI model obligations",
    status: "in-force",
    detail:
      "Transparency, copyright policy, systemic-risk duties ≥10²⁵ FLOP. Pre-Aug-2025 models have until 2 Aug 2027. GPAI Code of Practice operational (voluntary; adherence mitigates).",
  },
  {
    date: "26 Oct 2025",
    sortKey: "2025-10",
    jurisdiction: "AU",
    title: "Copyright — no TDM exception",
    status: "in-force",
    detail:
      "The Attorney-General ruled out a text-and-data-mining exception. Training on Australian works without licence = unresolved legal risk; licensing under CAIRG consultation.",
  },
  {
    date: "Dec 2025",
    sortKey: "2025-12",
    jurisdiction: "AU",
    title: "National AI Plan abandons mandatory guardrails",
    status: "in-force",
    detail:
      "Existing technology-neutral laws + voluntary guidance + a funded Australian AI Safety Institute (A$29.9m). The 10 guardrails were superseded by the National AI Centre's “Guidance for AI Adoption” (six essential practices).",
  },
  {
    date: "1 Jan 2026",
    sortKey: "2026-01",
    jurisdiction: "US/Global",
    title: "California SB 53 in force",
    status: "in-force",
    detail:
      "Frontier-developer transparency. US compliance remains a state patchwork under federal challenge — no enacted federal preemption exists.",
  },
  {
    date: "30 Apr / 8 May 2026",
    sortKey: "2026-04",
    jurisdiction: "AU",
    title: "APRA and ASIC AI supervisory expectations",
    status: "in-force",
    detail:
      "APRA (regulated entities): board AI literacy, AI supply-chain visibility, controls for agentic workflows, fallbacks where AI supports critical operations. ASIC (licensees): cyber resilience vs AI-enabled threats; directors' duties already cover AI.",
  },
  {
    date: "15 Jul 2026",
    sortKey: "2026-07a",
    jurisdiction: "AU",
    title: "Office of AI announced; “Australian Standards for AI” bill promised",
    status: "proposed",
    detail:
      "Office of AI in PM&C operational immediately; bill expected early 2027 covering AI data centres, AI training, and copyright protections. Scope beyond those areas UNCERTAIN.",
  },
  {
    date: "27 Jul 2026",
    sortKey: "2026-07b",
    jurisdiction: "EU",
    title: "Digital Omnibus on AI (Reg (EU) 2026/1744) in force",
    status: "in-force",
    detail:
      "Verified on EUR-Lex: defers Annex III standalone high-risk obligations to 2 Dec 2027 and Annex I product-embedded to 2 Aug 2028. A key driver: zero harmonised standards published — the technical rulebook doesn't exist yet.",
  },
  {
    date: "2 Aug 2026",
    sortKey: "2026-08",
    jurisdiction: "EU",
    title: "Article 50 transparency + GPAI enforcement live",
    status: "in-force",
    detail:
      "Disclose chatbots, mark synthetic content, label deepfakes (grace to 2 Dec 2026 for pre-existing generative systems). Commission GPAI fining powers active (€15m/3%).",
  },
  {
    date: "2 Dec 2026",
    sortKey: "2026-12a",
    jurisdiction: "EU",
    title: "Two new prohibitions (NCII / CSAM generation)",
    status: "adopted",
    detail: "Added by the Omnibus; applicable 2 Dec 2026.",
  },
  {
    date: "10 Dec 2026",
    sortKey: "2026-12b",
    jurisdiction: "AU",
    title: "ADM transparency — APPs 1.7–1.9 commence",
    status: "adopted",
    detail:
      "The binding near-term deadline for an Australian enterprise: privacy policies must disclose the kinds of personal information used in, and decisions made by, automated decision-making that significantly affects rights or interests. Action now: inventory every ADM use and update privacy policies.",
  },
  {
    date: "1 Jan 2027",
    sortKey: "2027-01",
    jurisdiction: "US/Global",
    title: "Colorado AI Act (rewritten)",
    status: "adopted",
    detail: "Re-delayed and stripped from a duty-of-care regime to a disclosure law.",
  },
  {
    date: "Early 2027",
    sortKey: "2027-02",
    jurisdiction: "AU",
    title: "Australian Standards for AI bill expected",
    status: "proposed",
    detail: "Watch: bill lands; CAIRG copyright-licensing outcomes; AISI-driven targeted reforms.",
  },
  {
    date: "2 Dec 2027",
    sortKey: "2027-12",
    jurisdiction: "EU",
    title: "Annex III standalone high-risk obligations apply",
    status: "deferred",
    detail:
      "Hiring, credit, education, essential services, critical infrastructure: risk management, data governance, logging, human oversight, conformity assessment. A 16-month runway to build conformity — not a cancellation. Non-EU providers will need an EU authorised representative.",
  },
  {
    date: "2 Aug 2028",
    sortKey: "2028-08",
    jurisdiction: "EU",
    title: "Annex I product-embedded high-risk obligations apply",
    status: "deferred",
    detail: "Machinery moved to sectoral treatment. (Annex I's original date was 2 Aug 2027 — a one-year deferral, not two.)",
  },
];

export const extraterritorial =
  "The EU AI Act reaches providers placing systems on the EU market wherever established, and providers/deployers outside the EU where the system's output is used in the EU. An Australian enterprise serving EU users or selling AI-enabled products into the EU is in scope.";

// The seven-control stack that leading enterprises converge on.
export const sevenControls = [
  {
    num: 1,
    name: "Agent inventory + identity",
    body:
      "Every agent a first-class directory identity with an owner (Entra Agent ID GA Apr 2026; Okta/Auth0 agent products; AgentCore Identity). No identity → no permissioning, audit or revocation.",
    concept: "agent-identity",
  },
  {
    num: 2,
    name: "Least-privilege delegation",
    body:
      "Short-lived, task-scoped, user-bound credentials (on-behalf-of token exchange); no standing secrets.",
    concept: "agent-identity",
  },
  {
    num: 3,
    name: "Policy-as-code at the tool call",
    body: "Deterministic, default-deny engines (Cedar/OPA) evaluating every tool invocation.",
    concept: "policy-engine",
  },
  {
    num: 4,
    name: "Trajectory-level evals + observability",
    body:
      "Score the agent's path, not just outputs (final-answer-only evals materially overstate quality); traces in OpenTelemetry GenAI format (de facto standard, formally still unstable — pin versions).",
    concept: "trajectory-evals",
  },
  {
    num: 5,
    name: "Human-in-the-loop by risk tier",
    body:
      "Propose/commit separation; approval UIs show ground-truth payloads (agents can manipulate summaries — OWASP ASI09).",
    concept: "hitl",
  },
  {
    num: 6,
    name: "Budget caps per agent",
    body:
      "FinOps control and runaway-agent safety in one (98% of FinOps teams now manage AI spend).",
    concept: "ai-finops",
  },
  {
    num: 7,
    name: "Management-system wrapper",
    body:
      "ISO 42001 + NIST AI RMF, with red-teaming (PyRIT/Garak-class tooling) as release practice for high-risk uses.",
    concept: "red-teaming",
  },
];

export const threatModel = {
  headline: "The threat model is settled; the solution isn't.",
  body:
    "OWASP maintains two Top-10s — LLM Applications 2026 (prompt injection still #1; excessive agency jumped to #3) and Agentic Applications (ASI01–10: goal hijack, tool misuse, identity abuse, supply chain, memory poisoning…). Prompt injection remains architecturally unsolved. The working defence is containment, not filtering: least-privilege tools, sandboxing, human gates on consequential actions, and never combining the lethal trifecta (private data + untrusted input + an exfiltration path) in one agent.",
  incidents: [
    "EchoLeak — zero-click Copilot exfiltration (CVE-2025-32711)",
    "Salesloft Drift OAuth breach — 700+ organisations",
    "First confirmed malicious MCP server on npm (~300 orgs)",
    "A coding agent deleting a production database during a code freeze",
    "GTG-1002 — the first reported largely AI-orchestrated espionage campaign (MITRE C0062)",
  ],
};

export const governanceReframe =
  "Governance is not a compliance tax — it is the production-enablement layer. The 21% with mature governance are disproportionately the ~6% capturing serious EBIT value: controls are what let agents ship, scale and survive incidents.";

export const bridgeStandards =
  "The bridge across all jurisdictions: ISO/IEC 42001 (certifiable AI management systems — increasingly a procurement requirement) + NIST AI RMF (+ Generative AI Profile). Build your governance on these two and every regime becomes a delta, not a rebuild.";

export const oneSlideSummary = [
  "Today: existing law fully applies (privacy, consumer, discrimination, directors' duties). If regulated: APRA/ASIC AI expectations are live. If your AI outputs reach the EU: transparency labelling and prohibitions apply now.",
  "10 Dec 2026: ADM transparency in privacy policies (start the inventory immediately).",
  "2 Dec 2027: EU Annex III high-risk conformity, if you provide such systems into the EU.",
  "Early 2027: Australian AI bill lands; copyright licensing framework develops. No TDM exception — licence your training data.",
  "Always: build once on ISO 42001 + NIST AI RMF; treat each jurisdiction as a delta.",
];

export const maturityGap =
  "~74% of organisations plan agent adoption within two years; 21% report mature agentic governance (Deloitte, n=3,235). Adoption is outrunning control.";
