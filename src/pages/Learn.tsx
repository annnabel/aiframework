import { Link } from "react-router-dom";
import { levels } from "../content/levels";
import { quizById } from "../content/quizzes";
import { useProgress } from "../lib/progress";
import { SourceLink } from "../components/SourceLink";

export default function Learn() {
  const prog = useProgress();

  return (
    <div className="container-narrow" style={{ padding: "48px 24px" }}>
      <h1>The learning journey</h1>
      <p className="lede">
        Seven levels, from recognising the terminology to making informed decisions. Each level teaches
        the connections, gives you something to interact with, and ends with a knowledge check. Don't
        skip levels: the decisions at level 4 are unsafe without the vocabulary of level 2.
      </p>
      <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)" }}>
        A motivated professional can do the whole journey in a few hours — or one level per day for a
        week. Progress is saved on this device.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 32 }}>
        {levels.map((l) => {
          const quiz = quizById.get(l.id);
          const result = prog.quizzes[l.id];
          const visited = prog.levelsVisited.includes(l.id);
          return (
            <Link
              key={l.id}
              to={`/learn/${l.id}`}
              className="panel-white panel-link"
              style={{
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
                color: "var(--ink)",
                textDecoration: "none",
              }}
            >
              <span
                aria-hidden
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-2xl)",
                  color: result ? "var(--crimson-deep)" : "var(--ink-3)",
                  width: 34,
                  textAlign: "center",
                  flexShrink: 0,
                  lineHeight: 1.2,
                }}
              >
                {l.num}
              </span>
              <span style={{ minWidth: 0, flex: 1 }}>
                <span style={{ fontWeight: 600, fontSize: "var(--fs-md)" }}>{l.title}</span>
                <span style={{ display: "block", color: "var(--ink-2)", fontSize: "var(--fs-sm)", marginTop: 3 }}>
                  {l.goal}
                </span>
                <span style={{ display: "flex", gap: 10, marginTop: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span className="tag tag-neutral">~{l.minutes} min</span>
                  {result ? (
                    <span className="tag tag-ok">
                      Check: {result.score}/{result.total}
                    </span>
                  ) : visited ? (
                    <span className="tag tag-warn">In progress</span>
                  ) : quiz ? (
                    <span className="tag tag-neutral">{quiz.questions.length}-question check</span>
                  ) : null}
                </span>
              </span>
              <span aria-hidden style={{ color: "var(--ink-3)", alignSelf: "center" }}>
                →
              </span>
            </Link>
          );
        })}
      </div>

      <div className="panel" style={{ marginTop: 32 }}>
        <strong>After level 7 — maintenance mode.</strong>{" "}
        <span style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>
          This field turns over in months, but the framework is designed so that facts expire faster than
          structure: the seven layers, five axes, archetype dial and failure taxonomy have been stable
          through two years of product churn. Refresh the facts quarterly (the source register flags
          which claims are perishable); re-examine the framework only when something structural shifts.
        </span>
        <div style={{ marginTop: 8 }}>
          <SourceLink ids={["12", "13"]} />
        </div>
      </div>
    </div>
  );
}
