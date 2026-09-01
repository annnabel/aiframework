import { useState } from "react";
import type { ComparePair } from "../content/compare";
import { ConceptChips } from "./ConceptChip";
import { SourceLink } from "./SourceLink";

/** Side-by-side comparison with a "got it" acknowledgement. */
export function CompareCard({ pair }: { pair: ComparePair }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="panel-white" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
        <strong>{pair.title}</strong>
      </div>
      <div className="dep-row" style={{ gap: 0 }}>
        {[pair.a, pair.b].map((side, i) => (
          <div
            key={side.name}
            style={{
              padding: "16px 20px",
              borderRight: i === 0 ? "1px solid var(--border)" : undefined,
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8, color: i === 0 ? "var(--ink)" : "var(--crimson-deep)" }}>
              {side.name}
            </div>
            <ul style={{ paddingLeft: "1.1em", margin: 0, fontSize: "var(--fs-sm)" }}>
              {side.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border)", background: "var(--panel)" }}>
        {revealed ? (
          <div className="rise">
            <p style={{ fontSize: "var(--fs-sm)", marginBottom: 8 }}>
              <strong>The distinction that matters: </strong>
              {pair.verdict}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <ConceptChips ids={pair.conceptIds} />
              <SourceLink ids={pair.sources} />
            </div>
          </div>
        ) : (
          <button className="btn btn-ghost btn-sm" onClick={() => setRevealed(true)}>
            I can state the difference — check me
          </button>
        )}
      </div>
    </div>
  );
}
