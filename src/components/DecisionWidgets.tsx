import { useState } from "react";
import {
  lockInQuadrants,
  maturityLadder,
  tenSteps,
  tenStepsMetaRule,
  decisionTree,
  decisionTreeRule,
} from "../content/decisions";
import { SourceLink } from "./SourceLink";

/** The Axis-1 lock-in 2×2, clickable. */
export function LockInQuad() {
  const [sel, setSel] = useState<string | null>(null);
  const q = lockInQuadrants.find((x) => x.id === sel);
  const cells = [
    lockInQuadrants.find((x) => x.earns && x.highCost)!,
    lockInQuadrants.find((x) => x.earns && !x.highCost)!,
    lockInQuadrants.find((x) => !x.earns && x.highCost)!,
    lockInQuadrants.find((x) => !x.earns && !x.highCost)!,
  ];
  return (
    <div>
      <div className="quad-axis" style={{ marginBottom: 8 }}>
        Dependency EARNS its cost ▲
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 8, alignItems: "center" }}>
        <div className="quad-axis" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          High switching cost ◀
        </div>
        <div className="quad">
          {cells.map((c) => (
            <button
              key={c.id}
              className={`quad-cell${sel === c.id ? " selected" : ""}${!c.earns ? " danger" : ""}`}
              onClick={() => setSel(sel === c.id ? null : c.id)}
              aria-pressed={sel === c.id}
            >
              <div className="quad-name">{c.name}</div>
              <p>{c.body}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="quad-axis" style={{ marginTop: 8 }}>
        ▼ Dependency does NOT earn its cost
      </div>
      {q && (
        <div className="panel rise" style={{ marginTop: 14 }}>
          <strong>{q.name}.</strong> {q.body}{" "}
          <span style={{ color: "var(--ink-2)" }}>
            The question that locates you here: “If we had to leave this vendor in 18 months, what
            exactly would we rebuild, and what would it cost?”
          </span>
        </div>
      )}
    </div>
  );
}

/** The governance maturity ladder with a self-assessment cursor. */
export function MaturityLadder() {
  const [level, setLevel] = useState<number | null>(null);
  return (
    <div>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th style={{ width: 40 }}></th>
              <th>Level</th>
              <th>You have…</th>
              <th>You can safely run…</th>
            </tr>
          </thead>
          <tbody>
            {maturityLadder.map((m) => (
              <tr
                key={m.level}
                style={
                  level === m.level
                    ? { background: "var(--crimson-tint)" }
                    : level !== null && m.level > level
                      ? { opacity: 0.45 }
                      : undefined
                }
              >
                <td>
                  <input
                    type="radio"
                    name="maturity"
                    checked={level === m.level}
                    onChange={() => setLevel(m.level)}
                    aria-label={`We are at level ${m.level}: ${m.name}`}
                    style={{ accentColor: "var(--crimson)" }}
                  />
                </td>
                <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                  {m.level}. {m.name}
                </td>
                <td>{m.have}</td>
                <td>{m.canRun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)", marginTop: 10 }}>
        {level === null ? (
          <>Select the highest level you fully have — everything below your level is what you can safely run. Autonomy must not exceed maturity.</>
        ) : (
          <>
            At level {level}, the autonomy ceiling is:{" "}
            <strong>{maturityLadder.find((m) => m.level === level)!.canRun}</strong>. Anything more
            autonomous exceeds the governance available. Non-negotiables at any level: human approval on
            irreversible actions; never combine the lethal trifecta; per-agent budget caps.
          </>
        )}
      </p>
    </div>
  );
}

/** The ten-step executive decision process as a walkable checklist. */
export function TenSteps() {
  const [open, setOpen] = useState<number | null>(1);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {tenSteps.map((s) => (
          <div key={s.num} className="panel-white" style={{ padding: 0 }}>
            <button
              onClick={() => setOpen(open === s.num ? null : s.num)}
              aria-expanded={open === s.num}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "baseline",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "12px 16px",
                color: "var(--ink)",
                fontWeight: 600,
                fontSize: "var(--fs-sm)",
              }}
            >
              <span style={{ color: "var(--crimson-deep)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
                {String(s.num).padStart(2, "0")}
              </span>
              {s.title}
              <span style={{ marginLeft: "auto", color: "var(--ink-3)", fontWeight: 400 }}>
                {open === s.num ? "−" : "+"}
              </span>
            </button>
            {open === s.num && (
              <div className="rise" style={{ padding: "0 16px 14px 44px", fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>
                {s.body}
              </div>
            )}
          </div>
        ))}
      </div>
      <p style={{ fontSize: "var(--fs-sm)", marginTop: 12 }}>
        <strong>The meta-rule:</strong> {tenStepsMetaRule}
      </p>
    </div>
  );
}

/** The knowledge-vs-behaviour decision tree, question-led. */
export function DecisionTreeView() {
  const [branch, setBranch] = useState<string | null>(null);
  const active = decisionTree.find((b) => b.id === branch);
  return (
    <div>
      <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>What does your system need?</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {decisionTree.map((b) => (
          <button
            key={b.id}
            className="btn btn-sm"
            style={
              branch === b.id
                ? { background: "var(--ink)", color: "white", border: "1px solid var(--ink)" }
                : { background: "var(--bg)", border: "1px solid var(--border-strong)", color: "var(--ink)" }
            }
            onClick={() => setBranch(b.id)}
            aria-pressed={branch === b.id}
          >
            {b.need.replace("Need ", "").replace("?", "").toLowerCase()}
          </button>
        ))}
      </div>
      {active ? (
        <div className="panel-white rise" key={active.id}>
          <strong>{active.need}</strong>
          <ol style={{ marginTop: 10 }}>
            {active.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          {active.note && <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>{active.note}</p>}
          <p style={{ fontSize: "var(--fs-sm)", marginBottom: 0 }}>
            <strong>In every branch:</strong> {decisionTreeRule.replace("In every branch: ", "")}
          </p>
          <div style={{ marginTop: 10 }}>
            <SourceLink ids={["04"]} />
          </div>
        </div>
      ) : (
        <p style={{ color: "var(--ink-3)", fontSize: "var(--fs-sm)" }}>
          Pick a need to see the escalation path — always cheapest lever first.
        </p>
      )}
    </div>
  );
}
