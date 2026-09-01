import { concepts, categoryLabels } from "../content/concepts";
import { layers, crossCutting } from "../content/layers";
import { archetypes } from "../content/archetypes";
import { failureModes } from "../content/failures";
import { audiences } from "../content/questions";
import { levels, sourceDocs } from "../content/levels";
import { scenarios } from "../content/scenarios";

export interface SearchEntry {
  kind: "concept" | "layer" | "archetype" | "failure" | "question" | "level" | "scenario" | "source" | "tool";
  kindLabel: string;
  title: string;
  sub: string;
  route: string;
  /** searchable haystack, lowercased */
  hay: string;
  /** ranking priority: lower = shown first on ties (exact concept > related > module > source) */
  rank: number;
}

function h(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(" ").toLowerCase();
}

export const searchIndex: SearchEntry[] = [
  ...concepts.map((c) => ({
    kind: "concept" as const,
    kindLabel: categoryLabels[c.category],
    title: c.term,
    sub: c.whatItIs,
    route: `/concept/${c.id}`,
    hay: h(c.term, c.whatItIs, c.decision, c.takeaway),
    rank: 0,
  })),
  ...layers.map((l) => ({
    kind: "layer" as const,
    kindLabel: `Layer ${l.num}`,
    title: l.name,
    sub: l.short,
    route: `/map?layer=${l.id}`,
    hay: h(l.name, l.short, l.role, l.state),
    rank: 1,
  })),
  ...crossCutting.map((c) => ({
    kind: "layer" as const,
    kindLabel: "Cross-cutting",
    title: c.name,
    sub: c.remember,
    route: `/map?layer=crosscutting`,
    hay: h(c.name, c.why, c.remember),
    rank: 1,
  })),
  ...archetypes.map((a) => ({
    kind: "archetype" as const,
    kindLabel: `Archetype ${a.num}`,
    title: a.name,
    sub: a.tagline,
    route: `/decisions?tool=archetypes&a=${a.id}`,
    hay: h(a.name, a.tagline, a.examples, a.bestFor),
    rank: 1,
  })),
  ...failureModes.map((f) => ({
    kind: "failure" as const,
    kindLabel: "Failure mode",
    title: f.name,
    sub: f.oneLiner,
    route: `/learn/failure-modes#${f.id}`,
    hay: h(f.name, f.oneLiner, f.looksLike, f.smellTest),
    rank: 1,
  })),
  ...audiences.flatMap((aud) =>
    aud.questions.map((q, i) => ({
      kind: "question" as const,
      kindLabel: aud.name,
      title: q.question,
      sub: `Screens for: ${q.screensFor}`,
      route: `/decisions?tool=questions&aud=${aud.id}`,
      hay: h(q.question, q.screensFor, aud.name),
      rank: 2,
    }))
  ),
  ...levels.map((l) => ({
    kind: "level" as const,
    kindLabel: `Level ${l.num}`,
    title: l.title,
    sub: l.goal,
    route: `/learn/${l.id}`,
    hay: h(l.title, l.goal),
    rank: 2,
  })),
  ...scenarios.map((s) => ({
    kind: "scenario" as const,
    kindLabel: "Scenario",
    title: s.title,
    sub: s.setting,
    route: `/scenarios/${s.id}`,
    hay: h(s.title, s.setting, s.brief),
    rank: 2,
  })),
  ...sourceDocs.map((d) => ({
    kind: "source" as const,
    kindLabel: "Source document",
    title: d.title,
    sub: d.gives,
    route: `/sources/${d.id}`,
    hay: h(d.title, d.gives, d.file),
    rank: 3,
  })),
  {
    kind: "tool",
    kindLabel: "Tool",
    title: "Architecture Explorer",
    sub: "Follow a request, the data, or the governance controls end to end",
    route: "/architecture",
    hay: "architecture explorer request flow data flow governance walkthrough protocols mcp a2a",
    rank: 2,
  },
  {
    kind: "tool",
    kindLabel: "Tool",
    title: "Cost-per-task calculator",
    sub: "The unit-economics pocket framework, interactive",
    route: "/decisions?tool=economics",
    hay: "calculator cost per task value hitl unit economics",
    rank: 2,
  },
  {
    kind: "tool",
    kindLabel: "Tool",
    title: "Pre-mortem checklist",
    sub: "Seven questions that kill bad projects in a meeting",
    route: "/scenarios?tool=premortem",
    hay: "pre-mortem premortem checklist screening proposal",
    rank: 2,
  },
];

export interface SearchResult extends SearchEntry {
  score: number;
}

export function search(query: string, limit = 12): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const results: SearchResult[] = [];
  for (const e of searchIndex) {
    let score = 0;
    const titleLc = e.title.toLowerCase();
    if (titleLc === q) score += 120;
    else if (titleLc.startsWith(q)) score += 70;
    else if (titleLc.includes(q)) score += 45;
    let all = true;
    for (const t of terms) {
      if (titleLc.includes(t)) score += 22;
      else if (e.hay.includes(t)) score += 8;
      else all = false;
    }
    if (!all || score === 0) {
      if (!e.hay.includes(q)) continue;
      score += 5;
    }
    score -= e.rank * 6;
    results.push({ ...e, score });
  }
  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
