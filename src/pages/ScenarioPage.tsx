import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { scenarioById } from "../content/scenarios";
import { QuizRunner } from "../components/Quiz";
import { SourceLink } from "../components/SourceLink";
import { progress, useProgress } from "../lib/progress";

export default function ScenarioPage() {
  const { scenarioId } = useParams();
  const s = scenarioId ? scenarioById.get(scenarioId) : undefined;
  const prog = useProgress();
  const [finished, setFinished] = useState(false);

  if (!s) {
    return (
      <div className="container-narrow" style={{ padding: "80px 24px" }}>
        <h1>Scenario not found</h1>
        <p>
          <Link to="/scenarios">Back to scenarios</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container-narrow" style={{ padding: "48px 24px" }}>
      <div style={{ marginBottom: 8 }}>
        <Link to="/scenarios" style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)" }}>
          ← All scenarios
        </Link>
      </div>
      <div className="kicker">{s.setting}</div>
      <h1>{s.title}</h1>
      <div className="panel" style={{ margin: "18px 0 28px" }}>
        <p style={{ margin: 0, fontSize: "var(--fs-base)" }}>{s.brief}</p>
      </div>

      <QuizRunner
        quiz={{ id: s.id, title: `Work the scenario`, questions: s.steps }}
        completedScore={prog.scenarios[s.id]}
        onComplete={(score, total) => {
          progress.recordScenario(s.id, score, total);
          setFinished(true);
        }}
      />

      {(finished || prog.scenarios[s.id]) && (
        <section className="rise" style={{ marginTop: 28 }}>
          <h2>The debrief</h2>
          <ul>
            {s.debrief.map((d) => (
              <li key={d} style={{ marginBottom: 8 }}>
                {d}
              </li>
            ))}
          </ul>
          <SourceLink ids={s.sources} />
        </section>
      )}
    </div>
  );
}
