import type { LearningLevel, SourceDoc } from "./types";

// The learning journey — seven levels, restructured from 12_LEARNING_PATH.md
// (its eight levels are regrouped: vendor strategy joins decision making,
// and failure modes get their own level, per the platform's learning design).

export const levels: LearningLevel[] = [
  {
    id: "mental-model",
    num: 1,
    title: "The Mental Model",
    goal: "Understand the overall Enterprise AI landscape: the seven-layer stack, the cross-cutting concerns, and how the layers interact.",
    minutes: 20,
    sources: ["02", "01", "00"],
  },
  {
    id: "building-blocks",
    num: 2,
    title: "Core Building Blocks",
    goal: "Understand the fundamental concepts — grouped by relationship, each with the decision it affects.",
    minutes: 35,
    sources: ["03"],
  },
  {
    id: "how-built",
    num: 3,
    title: "How Enterprise AI Systems Are Built",
    goal: "The seven build archetypes, the architecture that connects everything, and when you would choose each approach.",
    minutes: 30,
    sources: ["04", "06"],
  },
  {
    id: "decision-making",
    num: 4,
    title: "Decision Making",
    goal: "The five decision axes, the ten-step process, and the vendor landscape — turning frameworks into judgement.",
    minutes: 30,
    sources: ["05", "07", "11"],
  },
  {
    id: "governance",
    num: 5,
    title: "Governance, Risk & Regulation",
    goal: "What risks emerge, what controls matter, what regulations apply — structured for decisions, not policy reading.",
    minutes: 30,
    sources: ["08"],
  },
  {
    id: "economics",
    num: 6,
    title: "Economics & Value",
    goal: "Where value comes from, how it's captured, what costs matter, why initiatives fail to pay, and what leaders should measure.",
    minutes: 25,
    sources: ["09"],
  },
  {
    id: "failure-modes",
    num: 7,
    title: "What Goes Wrong",
    goal: "The seven failure modes: how they look, why they happen, where they originate on the map, and how to screen for them.",
    minutes: 20,
    sources: ["10"],
  },
];

export const levelById = new Map(levels.map((l) => [l.id, l]));

// Registry of the canonical source documents.
export const sourceDocs: SourceDoc[] = [
  { id: "00", file: "00_ONE_PAGE_CHEAT_SHEET.md", title: "One-Page Cheat Sheet", gives: "Read the night before an executive conversation" },
  { id: "01", file: "01_EXECUTIVE_SUMMARY.md", title: "Executive Summary", gives: "The 7 core conclusions + “10 things to remember”" },
  { id: "02", file: "02_ENTERPRISE_AI_MENTAL_MODEL.md", title: "Enterprise AI Mental Model", gives: "The seven-layer stack: what each layer does, who sells it, what locks you in" },
  { id: "03", file: "03_GLOSSARY.md", title: "Glossary", gives: "Every term: what it is + what decision it affects" },
  { id: "04", file: "04_BUILD_ARCHETYPES.md", title: "Build Archetypes", gives: "The seven ways enterprises build AI, and the knowledge-vs-behaviour decision tree" },
  { id: "05", file: "05_DECISION_FRAMEWORK.md", title: "Decision Framework", gives: "Five decision axes + the 10-step executive decision process" },
  { id: "06", file: "06_ARCHITECTURE.md", title: "Architecture", gives: "How everything connects, with diagrams and a full worked example" },
  { id: "07", file: "07_VENDOR_LANDSCAPE.md", title: "Vendor Landscape", gives: "Who is trying to own what + the vendor marketing translator" },
  { id: "08", file: "08_GOVERNANCE_REGULATION.md", title: "Governance & Regulation", gives: "EU AI Act (verified), Australia, standards, and operating governance" },
  { id: "09", file: "09_ECONOMICS_VALUE.md", title: "Economics & Value", gives: "Unit economics, pricing models, and the value evidence" },
  { id: "10", file: "10_ENTERPRISE_FAILURE_MODES.md", title: "Failure Modes", gives: "Why AI initiatives fail, categorised, with mitigations" },
  { id: "11", file: "11_EXECUTIVE_QUESTIONS.md", title: "Executive Questions", gives: "The questions playbook: vendor, CTO, data, security, legal, procurement" },
  { id: "12", file: "12_LEARNING_PATH.md", title: "Learning Path", gives: "Eight-level curriculum through this material" },
  { id: "13", file: "13_SOURCE_REGISTER.md", title: "Source Register", gives: "Every important claim: source, date, type, confidence" },
  { id: "14", file: "14_FACT_CHECK.md", title: "Fact Check", gives: "Audit of the original brief: CLAIM → VERDICT → EVIDENCE → CORRECTION" },
];

export const sourceById = new Map(sourceDocs.map((s) => [s.id, s]));
