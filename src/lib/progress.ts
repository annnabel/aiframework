import { useSyncExternalStore } from "react";

// Local (device-only) progress tracking. No accounts, no server.

export interface ProgressState {
  /** quiz id → { score, total, when } */
  quizzes: Record<string, { score: number; total: number; when: number }>;
  /** scenario id → { score, total, when } */
  scenarios: Record<string, { score: number; total: number; when: number }>;
  /** level ids visited */
  levelsVisited: string[];
  /** concept ids viewed */
  conceptsViewed: string[];
  /** area routes visited (map, architecture, decisions…) */
  areasVisited: string[];
}

const KEY = "eaif-progress-v1";

const empty: ProgressState = {
  quizzes: {},
  scenarios: {},
  levelsVisited: [],
  conceptsViewed: [],
  areasVisited: [],
};

let cache: ProgressState = load();
const listeners = new Set<() => void>();

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...empty };
    const parsed = JSON.parse(raw);
    return { ...empty, ...parsed };
  } catch {
    return { ...empty };
  }
}

function persist(next: ProgressState) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private mode etc.) — keep in-memory state
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, () => cache);
}

export const progress = {
  get: () => cache,
  recordQuiz(id: string, score: number, total: number) {
    persist({ ...cache, quizzes: { ...cache.quizzes, [id]: { score, total, when: Date.now() } } });
  },
  recordScenario(id: string, score: number, total: number) {
    persist({ ...cache, scenarios: { ...cache.scenarios, [id]: { score, total, when: Date.now() } } });
  },
  visitLevel(id: string) {
    if (cache.levelsVisited.includes(id)) return;
    persist({ ...cache, levelsVisited: [...cache.levelsVisited, id] });
  },
  viewConcept(id: string) {
    if (cache.conceptsViewed.includes(id)) return;
    persist({ ...cache, conceptsViewed: [...cache.conceptsViewed, id] });
  },
  visitArea(id: string) {
    if (cache.areasVisited.includes(id)) return;
    persist({ ...cache, areasVisited: [...cache.areasVisited, id] });
  },
  reset() {
    persist({ ...empty });
  },
};
