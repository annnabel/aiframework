import { Link } from "react-router-dom";
import { levels } from "../content/levels";
import { quizById } from "../content/quizzes";
import { scenarios } from "../content/scenarios";
import { concepts } from "../content/concepts";
import { useProgress, progress } from "../lib/progress";
import { useState } from "react";

export default function ProgressPage() {
  const prog = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);

  const quizzesDone = levels.filter((l) => prog.quizzes[l.id]).length;
  const scenariosDone = scenarios.filter((s) => prog.scenarios[s.id]).length;
  const conceptsSeen = prog.conceptsViewed.length;

  const overall =
    (quizzesDone / levels.length) * 0.5 +
    (scenariosDone / scenarios.length) * 0.25 +
    Math.min(1, conceptsSeen / 30) * 0.25;

  const empty = quizzesDone === 0 && scenariosDone === 0 && conceptsSeen === 0 && prog.levelsVisited.length === 0;

  return (
    <div className="container-narrow" style={{ padding: "48px 24px" }}>
      <h1>Your progress</h1>
      <p className="lede">Stored only on this device — no account, nothing leaves your browser.</p>

      {empty ? (
        <div className="panel" style={{ textAlign: "center", padding: "48px 24px", marginTop: 24 }}>
          <h3>Nothing tracked yet</h3>
          <p style={{ margin: "8px auto 16px", color: "var(--ink-2)", maxWidth: "48ch" }}>
            Work through a level, take a knowledge check, or play a scenario and your progress will appear
            here — so you can leave and pick up where you stopped.
          </p>
          <Link to="/learn" className="btn btn-accent">
            Start Level 1
          </Link>
        </div>
      ) : (
        <>
          <div className="panel-white" style={{ margin: "24px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <strong>Overall journey</strong>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-xl)", color: "var(--crimson-deep)" }}>
                {Math.round(overall * 100)}%
              </span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${overall * 100}%` }} />
            </div>
            <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", margin: "8px 0 0" }}>
              Weighted across knowledge checks (½), scenarios (¼), and concepts explored (¼).
            </p>
          </div>

          <section style={{ marginTop: 28 }}>
            <h3>Knowledge checks</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {levels.map((l) => {
                const q = quizById.get(l.id);
                const r = prog.quizzes[l.id];
                return (
                  <Link
                    key={l.id}
                    to={`/learn/${l.id}`}
                    className="panel-white"
                    style={{ display: "flex", gap: 12, alignItems: "center", padding: "11px 16px", color: "var(--ink)" }}
                  >
                    <span style={{ fontSize: "var(--fs-sm)", fontWeight: 500, flex: 1 }}>
                      Level {l.num} — {l.title}
                    </span>
                    {r ? (
                      <span className="tag tag-ok">
                        {r.score}/{r.total}
                      </span>
                    ) : prog.levelsVisited.includes(l.id) ? (
                      <span className="tag tag-warn">visited</span>
                    ) : (
                      <span className="tag tag-neutral">{q ? "not started" : ""}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>

          <section style={{ marginTop: 28 }}>
            <h3>Scenarios</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {scenarios.map((s) => {
                const r = prog.scenarios[s.id];
                return (
                  <Link
                    key={s.id}
                    to={`/scenarios/${s.id}`}
                    className="panel-white"
                    style={{ display: "flex", gap: 12, alignItems: "center", padding: "11px 16px", color: "var(--ink)" }}
                  >
                    <span style={{ fontSize: "var(--fs-sm)", fontWeight: 500, flex: 1 }}>{s.title}</span>
                    {r ? (
                      <span className="tag tag-ok">
                        {r.score}/{r.total}
                      </span>
                    ) : (
                      <span className="tag tag-neutral">not started</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>

          <section style={{ marginTop: 28 }}>
            <h3>Concepts explored</h3>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>
              {conceptsSeen} of {concepts.length} concept pages opened.{" "}
              <Link to="/glossary">Keep exploring →</Link>
            </p>
            <div className="progress-track" style={{ maxWidth: 360 }}>
              <div className="progress-fill" style={{ width: `${(conceptsSeen / concepts.length) * 100}%` }} />
            </div>
          </section>

          <section style={{ marginTop: 40 }}>
            {confirmReset ? (
              <div className="panel" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: "var(--fs-sm)" }}>Erase all progress on this device?</span>
                <button
                  className="btn btn-sm btn-accent"
                  onClick={() => {
                    progress.reset();
                    setConfirmReset(false);
                  }}
                >
                  Yes, reset
                </button>
                <button className="btn btn-sm btn-ghost" onClick={() => setConfirmReset(false)}>
                  Keep it
                </button>
              </div>
            ) : (
              <button className="btn btn-ghost btn-sm" onClick={() => setConfirmReset(true)}>
                Reset progress…
              </button>
            )}
          </section>
        </>
      )}
    </div>
  );
}
