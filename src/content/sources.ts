// Raw imports of the canonical source documents (Vite `?raw`).
// The Markdown files at the repository root remain the single source of truth.

import doc00 from "../../00_ONE_PAGE_CHEAT_SHEET.md?raw";
import doc01 from "../../01_EXECUTIVE_SUMMARY.md?raw";
import doc02 from "../../02_ENTERPRISE_AI_MENTAL_MODEL.md?raw";
import doc03 from "../../03_GLOSSARY.md?raw";
import doc04 from "../../04_BUILD_ARCHETYPES.md?raw";
import doc05 from "../../05_DECISION_FRAMEWORK.md?raw";
import doc06 from "../../06_ARCHITECTURE.md?raw";
import doc07 from "../../07_VENDOR_LANDSCAPE.md?raw";
import doc08 from "../../08_GOVERNANCE_REGULATION.md?raw";
import doc09 from "../../09_ECONOMICS_VALUE.md?raw";
import doc10 from "../../10_ENTERPRISE_FAILURE_MODES.md?raw";
import doc11 from "../../11_EXECUTIVE_QUESTIONS.md?raw";
import doc12 from "../../12_LEARNING_PATH.md?raw";
import doc13 from "../../13_SOURCE_REGISTER.md?raw";
import doc14 from "../../14_FACT_CHECK.md?raw";

import type { SourceId } from "./types";

export const sourceContent: Record<SourceId, string> = {
  "00": doc00,
  "01": doc01,
  "02": doc02,
  "03": doc03,
  "04": doc04,
  "05": doc05,
  "06": doc06,
  "07": doc07,
  "08": doc08,
  "09": doc09,
  "10": doc10,
  "11": doc11,
  "12": doc12,
  "13": doc13,
  "14": doc14,
};
