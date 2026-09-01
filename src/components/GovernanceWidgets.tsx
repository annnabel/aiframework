import { useState } from "react";
import { regTimeline, sevenControls, threatModel, type RegStatus } from "../content/governance";
import { ConceptChip } from "./ConceptChip";
import { SourceLink } from "./SourceLink";

const statusLabel: Record<RegStatus, { text: string; cls: string }> = {
  "in-force": { text: "IN FORCE", cls: "tag-crimson" },
  adopted: { text: "ADOPTED", cls: "tag-warn" },
  deferred: { text: "DEFERRED", cls: "tag-neutral" },
  proposed: { text: "PROPOSED", cls: "tag-neutral" },
  uncertain: { text: "UNCERTAIN", cls: "tag-neutral" },
};

/** Regulation timeline with jurisdiction filter and progressive disclosure. */
export function RegTimeline() {
  const [jur, setJur] = useState<"all" | "EU" | "AU" | "US/Global">("all");
  const [open, setOpen] = useState<string | null>(null);
  const items = regTimeline
    .filter((r) => jur === "all" || r.jurisdiction === jur)
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));

  return (
    <div>
      <div className="mode-toggle" role="tablist" aria-label="Filter by jurisdiction" style={{ marginBottom: 16 }}>
        {(["all", "EU", "AU", "US/Global"] as const).map((j) => (
          <button key={j} role="tab" aria-selected={jur === j} className={jur === j ? "active" : ""} onClick={() => setJur(j)}>
            {j === "all" ? "All" : j}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((r) => {
          const key = r.sortKey + r.title;
          const expanded = open === key;
          return (
            <div key={key} className="panel-white" style={{ padding: 0 }}>
              <button
                onClick={() => setOpen(expanded ? null : key)}
                aria-expanded={expanded}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "baseline",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "11px 14px",
                  color: "var(--ink)",
                  fontSize: "var(--fs-sm)",
                }}
              >
                <span style={{ width: 118, flexShrink: 0, color: "var(--ink-3)", fontVariantNumeric: "tabular-nums" }}>
                  {r.date}
                </span>
                <span className={`tag ${statusLabel[r.status].cls}`} style={{ flexShrink: 0 }}>
                  {statusLabel[r.status].text}
                </span>
                <span style={{ fontWeight: 500 }}>
                  <span style={{ color: "var(--ink-3)", fontWeight: 400 }}>{r.jurisdiction} · </span>
                  {r.title}
                </span>
                <span style={{ marginLeft: "auto", color: "var(--ink-3)" }}>{expanded ? "−" : "+"}</span>
              </button>
              {expanded && (
                <div className="rise" style={{ padding: "0 14px 12px 144px", fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>
                  {r.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginTop: 10 }}>
        Verified against primary sources (EUR-Lex, OAIC, APRA, pm.gov.au) on 1 September 2026 — status
        labels preserved from the source document.
      </p>
    </div>
  );
}

/** The seven-control stack. */
export function SevenControls() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {sevenControls.map((c) => (
        <div key={c.num} className="panel-white" style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px" }}>
          <span
            aria-hidden
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-lg)",
              color: "var(--l6)",
              width: 22,
              flexShrink: 0,
              textAlign: "center",
            }}
          >
            {c.num}
          </span>
          <div style={{ fontSize: "var(--fs-sm)" }}>
            <strong>{c.name}.</strong> {c.body}{" "}
            <span style={{ whiteSpace: "nowrap", display: "inline-block", verticalAlign: "middle" }}>
              <ConceptChip id={c.concept} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ThreatModelPanel() {
  const [showIncidents, setShowIncidents] = useState(false);
  return (
    <div className="panel">
      <strong>{threatModel.headline}</strong>
      <p style={{ fontSize: "var(--fs-sm)", marginTop: 8 }}>{threatModel.body}</p>
      {showIncidents ? (
        <div className="rise">
          <p style={{ fontSize: "var(--fs-sm)", fontWeight: 600, marginBottom: 6 }}>
            The confirmed incidents that moved risk from hypothetical to actuarial:
          </p>
          <ul style={{ fontSize: "var(--fs-sm)", marginBottom: 8 }}>
            {threatModel.incidents.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      ) : (
        <button className="btn btn-ghost btn-sm" onClick={() => setShowIncidents(true)}>
          Show the confirmed incident record
        </button>
      )}
      <div style={{ marginTop: 10 }}>
        <SourceLink ids={["08"]} />
      </div>
    </div>
  );
}
