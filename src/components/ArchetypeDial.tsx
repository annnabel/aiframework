import { useState } from "react";
import { archetypes, archetypeDimensions, portfolioNote } from "../content/archetypes";
import { SourceLink } from "./SourceLink";

/** The build-archetype control dial: one dial, seven positions. */
export function ArchetypeDial({ initial }: { initial?: string }) {
  const [activeId, setActiveId] = useState(initial ?? "seats");
  const active = archetypes.find((a) => a.id === activeId)!;

  return (
    <div>
      <div className="dial-track" role="tablist" aria-label="Build archetypes, ordered by how much of the system you own">
        {archetypes.map((a) => (
          <button
            key={a.id}
            role="tab"
            aria-selected={a.id === activeId}
            className={`dial-stop${a.id === activeId ? " active" : ""}`}
            style={{ left: `${a.control}%` }}
            onClick={() => setActiveId(a.id)}
            title={a.name}
          >
            {a.num}
          </button>
        ))}
      </div>
      <div className="dial-labels" aria-hidden>
        <span>← Speed · inherited governance · vendor accountability</span>
        <span>Control · differentiation · owned risk →</span>
      </div>

      <div className="panel-white rise" key={active.id}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h4 style={{ margin: 0 }}>
            {active.num}. {active.name}
          </h4>
          <span style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)" }}>{active.tagline}</span>
        </div>
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)", margin: "10px 0 14px" }}>
          <em>{active.examples}</em>
        </p>
        <div className="table-wrap">
          <table className="data">
            <tbody>
              {active.rows.map((r) => (
                <tr key={r.label}>
                  <td style={{ fontWeight: 600, whiteSpace: "nowrap", width: 190 }}>{r.label}</td>
                  <td>{r.value}</td>
                </tr>
              ))}
              <tr>
                <td style={{ fontWeight: 600 }}>Best use cases</td>
                <td>{active.bestFor}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Poor use cases</td>
                <td>{active.poorFor}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Typical buyer</td>
                <td>{active.buyer}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 12 }}>
          <SourceLink ids={active.sources} />
        </div>
      </div>
    </div>
  );
}

export function ArchetypeDimensions() {
  return (
    <div>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>At archetype 1 (embedded)</th>
              <th>At archetype 6 (self-host)</th>
            </tr>
          </thead>
          <tbody>
            {archetypeDimensions.map((d) => (
              <tr key={d.dimension}>
                <td style={{ fontWeight: 600 }}>{d.dimension}</td>
                <td>{d.at1}</td>
                <td>{d.at6}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)", marginTop: 12 }}>{portfolioNote}</p>
    </div>
  );
}
