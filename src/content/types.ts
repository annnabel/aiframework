// ── Content model types ──────────────────────────────────────────────
// Every record carries `sources`: the IDs of the canonical Markdown
// documents it was derived from. The documents remain the source of truth.

export type SourceId =
  | "00" | "01" | "02" | "03" | "04" | "05" | "06"
  | "07" | "08" | "09" | "10" | "11" | "12" | "13" | "14";

export type LayerId =
  | "compute"
  | "models"
  | "serving"
  | "data"
  | "build"
  | "control"
  | "apps"
  | "crosscutting";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type ConceptCategory =
  | "models"
  | "build-patterns"
  | "agents"
  | "protocols"
  | "operations"
  | "commercial"
  | "business";

export interface Concept {
  id: string;
  term: string;
  category: ConceptCategory;
  /** Where it primarily lives on the seven-layer map */
  layer: LayerId;
  difficulty: Difficulty;
  /** One-line: what it is (from the decision-oriented glossary) */
  whatItIs: string;
  /** One-line: what decision it affects */
  decision: string;
  /** Why it exists / where it fits — expanded from source material */
  whyItExists?: string;
  /** A practical example, only where clearly supported by the sources */
  example?: string;
  /** Key takeaway in one sentence */
  takeaway?: string;
  /** ⚑ flagged in the glossary as jargon — low strategic importance */
  jargon?: boolean;
  /** Marked dead/renamed in the sources */
  statusNote?: string;
  /** Concepts to understand first ("what do I need before this makes sense?") */
  prerequisites?: string[];
  /** Concepts that become easier once you understand this */
  unlocks?: string[];
  related?: string[];
  confusedWith?: string[];
  sources: SourceId[];
}

export interface Layer {
  id: LayerId;
  /** 1–7, or 0 for cross-cutting concerns */
  num: number;
  name: string;
  short: string;
  /** What it does */
  role: string;
  /** Why it exists */
  why: string;
  /** State of play, Sept 2026 — condensed */
  state: string;
  /** Decisions made at this layer */
  decisions: string[];
  standardised: string;
  lockIn: string;
  /** Common misconceptions / honest caveats tied to this layer */
  misconceptions: string[];
  /** Ids of concepts that live here */
  concepts: string[];
  /** The one thing to remember */
  remember: string;
  color: string;
  sources: SourceId[];
}

export interface CrossCuttingConcern {
  id: string;
  name: string;
  why: string;
  remember: string;
  sources: SourceId[];
}

export interface ArchetypeRow {
  label: string;
  value: string;
}

export interface Archetype {
  id: string;
  num: number;
  name: string;
  tagline: string;
  examples: string;
  rows: ArchetypeRow[];
  bestFor: string;
  poorFor: string;
  buyer: string;
  /** 0–100 position on the control dial */
  control: number;
  sources: SourceId[];
}

export interface DecisionAxis {
  id: string;
  num: number;
  name: string;
  idea: string;
  detail: string[];
  question: string;
  sources: SourceId[];
}

export interface WalkthroughStep {
  num: number;
  title: string;
  layerIds: LayerId[];
  body: string;
  concepts: string[];
  /** Which explorer view-modes this step belongs to */
  modes: ("request" | "data" | "governance")[];
  governanceNote?: string;
}

export interface FailureMode {
  id: string;
  num: number;
  name: string;
  oneLiner: string;
  looksLike: string;
  evidence: string;
  smellTest: string;
  mitigation: string;
  /** Where it originates → where it becomes visible */
  originLayer: LayerId;
  visibleLayer: LayerId;
  sources: SourceId[];
}

export interface ExecQuestion {
  audience: string;
  question: string;
  screensFor: string;
}

export type QuizQuestion =
  | {
      kind: "choice";
      id: string;
      prompt: string;
      options: string[];
      correct: number;
      explanation: string;
      sources: SourceId[];
    }
  | {
      kind: "multi";
      id: string;
      prompt: string;
      options: string[];
      correct: number[];
      explanation: string;
      sources: SourceId[];
    }
  | {
      kind: "order";
      id: string;
      prompt: string;
      /** Items given in correct order; UI shuffles */
      items: string[];
      explanation: string;
      sources: SourceId[];
    }
  | {
      kind: "match";
      id: string;
      prompt: string;
      pairs: { left: string; right: string }[];
      explanation: string;
      sources: SourceId[];
    };

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface LearningLevel {
  id: string;
  num: number;
  title: string;
  goal: string;
  minutes: number;
  sources: SourceId[];
}

export interface SourceDoc {
  id: SourceId;
  file: string;
  title: string;
  gives: string;
}
