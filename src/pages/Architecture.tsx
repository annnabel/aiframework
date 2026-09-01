import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  walkthroughScenario,
  walkthroughSteps,
  walkthroughLessons,
  protocols,
  protocolFacts,
  blurBoundaries,
} from "../content/walkthrough";
import { MiniMap } from "../components/StackMap";
import { ConceptChips } from "../components/ConceptChip";
import { SourceLink } from "../components/SourceLink";
import { progress } from "../lib/progress";

type Mode = "request" | "data" | "governance";

const modeCopy: Record<Mode, { label: string; blurb: string }> = {
  request: {
    label: "Request flow",
    blurb: "User → application → agent → tools → context → model → response. The full journey of one ask.",
  },
  data: {
    label: "Data flow",
    blurb: "Where knowledge enters: retrieval, tool results, grounding, and the traces that feed evals.",
  },
  governance: {
    label: "Governance view",
    blurb: "Where identity, policy, approval gates, evaluation and cost controls apply along the same journey.",
  },
};

export default function Architecture() {
  const [mode, setMode] = useState<Mode>("request");
  const [stepNum, setStepNum] = useState(1);

  useEffect(() => {
    progress.visitArea("architecture");
  }, []);

  const activeSteps = useMemo(() => walkthroughSteps.filter((s) => s.modes.includes(mode)), [mode]);

  // keep the selected step valid for the mode
  useEffect(() => {
    if (!activeSteps.some((s) => s.num === stepNum)) setStepNum(activeSteps[0]?.num ?? 1);
  }, [mode]);

  const step = walkthroughSteps.find((s) => s.num === stepNum) ?? walkthroughSteps[0];
  const activeIdx = activeSteps.findIndex((s) => s.num === step.num);

  return (
    <div className="container" style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: 760 }}>
        <h1>Architecture Explorer</h1>
        <p className="lede">
          Not a static diagram — one real request, followed end to end through every layer. Switch views
          to trace the request itself, the data feeding it, or the governance controls wrapped around it.
        </p>
      </div>

      <div className="panel" style={{ margin: "24px 0", maxWidth: 760 }}>
        <span className="tag tag-crimson" style={{ marginBottom: 8, display: "inline-block" }}>
          The scenario
        </span>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-lg)", margin: 0 }}>
          “{walkthroughScenario.ask}”
        </p>
        <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", margin: "8px 0 0" }}>
          {walkthroughScenario.note}
        </p>
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginBottom: 24 }}>
        <div className="mode-toggle" role="tablist" aria-label="Explorer view mode">
          {(Object.keys(modeCopy) as Mode[]).map((m) => (
            <button key={m} role="tab" aria-selected={mode === m} className={mode === m ? "active" : ""} onClick={() => setMode(m)}>
              {modeCopy[m].label}
            </button>
          ))}
        </div>
        <span style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>{modeCopy[mode].blurb}</span>
      </div>

      <div className="walk-grid">
        <div className="walk-steps" role="tablist" aria-label="Walkthrough steps">
          {walkthroughSteps.map((s) => {
            const included = s.modes.includes(mode);
            return (
              <button
                key={s.num}
                role="tab"
                aria-selected={s.num === step.num}
                className={`walk-step-btn${s.num === step.num ? " active" : ""}${included ? "" : " excluded"}`}
                onClick={() => included && setStepNum(s.num)}
                disabled={!included}
                title={included ? undefined : `Not part of the ${modeCopy[mode].label.toLowerCase()}`}
              >
                <span className="walk-step-num">{s.num}</span>
                <span className="walk-step-label">{s.title}</span>
              </button>
            );
          })}
        </div>

        <div className="walk-card rise" key={`${mode}-${step.num}`}>
          <div className="walk-card-head">
            <div style={{ minWidth: 0, flex: 1 }}>
              <div className="kicker">Step {step.num} of 10</div>
              <h3 style={{ marginBottom: 8 }}>{step.title}</h3>
              <p style={{ maxWidth: "58ch", marginBottom: 0 }}>{step.body}</p>
            </div>
            <MiniMap hot={step.layerIds} />
          </div>
          {mode === "governance" && step.governanceNote && (
            <div className="gov-note">
              <span aria-hidden>⊕</span>
              <span>
                <strong>Control at this step:</strong> {step.governanceNote}
              </span>
            </div>
          )}
          {step.concepts.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <span style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", display: "block", marginBottom: 6 }}>
                Concepts in play — click to learn:
              </span>
              <ConceptChips ids={step.concepts} />
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, gap: 10, flexWrap: "wrap" }}>
            <button
              className="btn btn-ghost btn-sm"
              disabled={activeIdx <= 0}
              onClick={() => setStepNum(activeSteps[activeIdx - 1].num)}
            >
              ← Previous
            </button>
            <SourceLink ids={["06"]} />
            <button
              className="btn btn-primary btn-sm"
              disabled={activeIdx >= activeSteps.length - 1}
              onClick={() => setStepNum(activeSteps[activeIdx + 1].num)}
            >
              Next step →
            </button>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <section style={{ maxWidth: 820 }}>
        <h2>What the example teaches</h2>
        <ol>
          {walkthroughLessons.map((l) => (
            <li key={l} style={{ marginBottom: 8 }}>
              {l}
            </li>
          ))}
        </ol>
      </section>

      <hr className="divider" />

      <section>
        <h2>The protocol wiring</h2>
        <p style={{ maxWidth: "68ch", color: "var(--ink-2)" }}>
          Six protocols carry the interoperability story. MCP and A2A complement each other under one
          neutral foundation; the commerce pair genuinely competes.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
          {protocols.map((p) => (
            <div key={p.id} className="panel-white" style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                <strong>{p.name}</strong>
                <span style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>{p.full}</span>
                {p.competes && <span className="tag tag-warn">competes with {p.competes.toUpperCase()}</span>}
              </div>
              <p style={{ fontSize: "var(--fs-sm)", margin: "8px 0 6px" }}>{p.role}</p>
              <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", margin: 0 }}>
                {p.governance} · {p.status}
              </p>
            </div>
          ))}
        </div>
        <div className="panel" style={{ marginTop: 16 }}>
          <strong>Three facts that correct the common one-liner:</strong>
          <ul style={{ marginTop: 8, marginBottom: 0, fontSize: "var(--fs-sm)" }}>
            {protocolFacts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div style={{ marginTop: 10 }}>
          <SourceLink ids={["06", "03"]} />
        </div>
      </section>

      <hr className="divider" />

      <section style={{ maxWidth: 820 }}>
        <h2>Where the boundaries blur</h2>
        <p style={{ color: "var(--ink-2)" }}>So the diagrams don't mislead you:</p>
        <ul>
          {blurBoundaries.map((b) => (
            <li key={b} style={{ marginBottom: 6 }}>
              {b}
            </li>
          ))}
        </ul>
        <p style={{ fontSize: "var(--fs-sm)" }}>
          Orient yourself any time on <Link to="/map">the Enterprise AI Map</Link>.
        </p>
      </section>
    </div>
  );
}
