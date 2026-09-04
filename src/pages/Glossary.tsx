import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { concepts, categoryLabels } from "../content/concepts";
import { layers, layerById, stackOrder } from "../content/layers";
import type { Difficulty, LayerId } from "../content/types";

const difficulties: { id: Difficulty; label: string }[] = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export default function Glossary() {
  const [q, setQ] = useState("");
  const [layer, setLayer] = useState<LayerId | "all">("all");
  const [diff, setDiff] = useState<Difficulty | "all">("all");
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return concepts.filter((c) => {
      if (layer !== "all" && c.layer !== layer) return false;
      if (diff !== "all" && c.difficulty !== diff) return false;
      if (cat !== "all" && c.category !== cat) return false;
      if (query && !`${c.term} ${c.whatItIs} ${c.decision}`.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [q, layer, diff, cat]);

  // Group by layer for the default view (organised by the map, not the alphabet)
  const byLayer = useMemo(() => {
    const groups = new Map<LayerId, typeof filtered>();
    for (const l of stackOrder) groups.set(l.id, []);
    for (const c of filtered) groups.get(c.layer)?.push(c);
    return groups;
  }, [filtered]);

  return (
    <div className="container" style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: 720 }}>
        <h1>Concepts</h1>
        <p className="lede">
          Every term with the decision it affects — organised by where it lives on the map, not the
          alphabet. Open any concept for its relationships: what to understand first, and what it unlocks.
        </p>
      </div>

      <div className="filter-bar">
        <input
          type="search"
          placeholder="Filter terms…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Filter glossary terms"
          style={{
            fontFamily: "inherit",
            fontSize: "var(--fs-sm)",
            padding: "8px 12px",
            borderRadius: "var(--r-md)",
            border: "1px solid var(--border-strong)",
            minWidth: 200,
            background: "var(--bg)",
            color: "var(--ink)",
          }}
        />
        <select value={layer} onChange={(e) => setLayer(e.target.value as LayerId | "all")} aria-label="Filter by layer"
          style={{ fontFamily: "inherit", fontSize: "var(--fs-sm)", padding: "8px 10px", borderRadius: "var(--r-md)", border: "1px solid var(--border-strong)", background: "var(--bg)", color: "var(--ink)" }}>
          <option value="all">All layers</option>
          {layers.map((l) => (
            <option key={l.id} value={l.id}>
              Layer {l.num} — {l.name}
            </option>
          ))}
        </select>
        <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by category"
          style={{ fontFamily: "inherit", fontSize: "var(--fs-sm)", padding: "8px 10px", borderRadius: "var(--r-md)", border: "1px solid var(--border-strong)", background: "var(--bg)", color: "var(--ink)" }}>
          <option value="all">All categories</option>
          {Object.entries(categoryLabels).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
        <div className="mode-toggle" role="group" aria-label="Filter by difficulty">
          <button aria-pressed={diff === "all"} className={diff === "all" ? "active" : ""} onClick={() => setDiff("all")}>
            All
          </button>
          {difficulties.map((d) => (
            <button key={d.id} aria-pressed={diff === d.id} className={diff === d.id ? "active" : ""} onClick={() => setDiff(d.id)}>
              {d.label}
            </button>
          ))}
        </div>
        <span style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginLeft: "auto" }}>
          {filtered.length} of {concepts.length} terms
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="panel" style={{ textAlign: "center", padding: 48 }}>
          <strong>No terms match those filters.</strong>
          <p style={{ margin: "8px auto 0", color: "var(--ink-2)", fontSize: "var(--fs-sm)" }}>
            Try clearing the search box, or widen the layer and difficulty filters.
          </p>
        </div>
      ) : (
        stackOrder.map((l) => {
          const items = byLayer.get(l.id) ?? [];
          if (!items.length) return null;
          return (
            <section key={l.id} style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span className="chip-dot" style={{ background: l.color, width: 10, height: 10 }} aria-hidden />
                <h3 style={{ margin: 0, fontSize: "var(--fs-lg)" }}>
                  Layer {l.num} — {l.name}
                </h3>
                <Link to={`/map?layer=${l.id}`} style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>
                  on the map →
                </Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 10 }}>
                {items.map((c) => (
                  <Link
                    key={c.id}
                    to={`/concept/${c.id}`}
                    className="panel-white panel-link"
                    style={{ color: "var(--ink)", padding: "13px 16px", display: "block" }}
                  >
                    <span style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                      <strong style={{ fontSize: "var(--fs-sm)" }}>{c.term}</strong>
                      {c.jargon && (
                        <span className="tag tag-neutral">
                          <span aria-hidden>⚑</span>
                          <span className="sr-only">jargon — low strategic importance</span>
                        </span>
                      )}
                      <span className="tag tag-neutral" style={{ marginLeft: "auto" }}>
                        {c.difficulty}
                      </span>
                    </span>
                    <span style={{ display: "block", fontSize: "var(--fs-xs)", color: "var(--ink-2)", marginTop: 4 }}>
                      {c.whatItIs}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
