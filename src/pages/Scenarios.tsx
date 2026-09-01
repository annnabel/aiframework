import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { scenarios } from "../content/scenarios";
import { preMortem, preMortemNote } from "../content/failures";
import { useProgress, progress } from "../lib/progress";
import { SourceLink } from "../components/SourceLink";

export default function ScenariosPage() {
  const [params] = useSearchParams();
  const showPremortem = params.get("tool") === "premortem";
  const prog = useProgress();

  useEffect(() => {
    progress.visitArea("scenarios");
  }, []);

  return (
    <div className="container-narrow" style={{ padding: "48px 24px" }}>
      <h1>Scenario practice</h1>
      <p className="lede">
        Understanding shows up under pressure. Each scenario puts you in a real seat — procurement
        review, board briefing, design review, investment committee — and debriefs every answer with the
        source reasoning.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "28px 0" }}>
        {scenarios.map((s) => {
          const done = prog.scenarios[s.id];
          return (
            <Link
              key={s.id}
              to={`/scenarios/${s.id}`}
              className="panel-white"
              style={{ color: "var(--ink)", display: "flex", gap: 16, alignItems: "flex-start" }}
            >
              <span style={{ minWidth: 0, flex: 1 }}>
                <span style={{ fontWeight: 600, fontSize: "var(--fs-md)" }}>{s.title}</span>
                <span style={{ display: "block", fontSize: "var(--fs-xs)", color: "var(--crimson-deep)", marginTop: 2 }}>
                  {s.setting}
                </span>
                <span style={{ display: "block", fontSize: "var(--fs-sm)", color: "var(--ink-2)", marginTop: 6 }}>
                  {s.brief}
                </span>
                <span style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <span className="tag tag-neutral">{s.steps.length} decisions</span>
                  {done && (
                    <span className="tag tag-ok">
                      Done: {done.score}/{done.total}
                    </span>
                  )}
                </span>
              </span>
              <span aria-hidden style={{ color: "var(--ink-3)", alignSelf: "center" }}>
                →
              </span>
            </Link>
          );
        })}
      </div>

      <hr className="divider" id="premortem" />

      <section>
        <h2>The pre-mortem checklist</h2>
        <p style={{ color: "var(--ink-2)" }}>
          Run it on any live AI proposal in your organisation — seven questions, each killing one failure
          mode. Check a question only when you (or the proposer) can actually answer it.
        </p>
        <PreMortemTool autoFocus={showPremortem} />
      </section>
    </div>
  );
}

function PreMortemTool({ autoFocus }: { autoFocus?: boolean }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (autoFocus) document.getElementById("premortem")?.scrollIntoView();
  }, [autoFocus]);

  const n = checked.size;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {preMortem.map((q) => {
          const on = checked.has(q.num);
          return (
            <label
              key={q.num}
              className="panel-white"
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                cursor: "pointer",
                padding: "13px 16px",
                background: on ? "var(--ok-tint)" : undefined,
                borderColor: on ? "var(--ok)" : undefined,
              }}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => {
                  const next = new Set(checked);
                  if (on) next.delete(q.num);
                  else next.add(q.num);
                  setChecked(next);
                }}
                style={{ accentColor: "var(--ok)", marginTop: 3 }}
              />
              <span style={{ fontSize: "var(--fs-sm)" }}>
                <strong>{q.question}</strong>
                <span style={{ display: "block", color: "var(--ink-3)", fontSize: "var(--fs-xs)", marginTop: 2 }}>
                  Kills the {q.kills.toLowerCase()} failure mode
                </span>
              </span>
            </label>
          );
        })}
      </div>
      <div className="panel" style={{ marginTop: 16 }}>
        {n === 7 ? (
          <span>
            <strong>All seven answerable.</strong> This proposal has cleared the highest-ROI governance
            screen in the package — take it to the ten-step process next.{" "}
            <Link to="/decisions?tool=frameworks">Run the ten steps →</Link>
          </span>
        ) : (
          <span style={{ fontSize: "var(--fs-sm)" }}>
            <strong>{7 - n} of 7 unanswered.</strong> Each unanswered question is a live failure mode.{" "}
            {preMortemNote}
          </span>
        )}
      </div>
      <div style={{ marginTop: 10 }}>
        <SourceLink ids={["10"]} />
      </div>
    </div>
  );
}
