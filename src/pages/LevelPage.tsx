import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { levelById, levels } from "../content/levels";
import { quizById } from "../content/quizzes";
import { QuizRunner } from "../components/Quiz";
import { SourceLink } from "../components/SourceLink";
import { progress, useProgress } from "../lib/progress";
import { MentalModelLevel } from "./levels/MentalModelLevel";
import { BuildingBlocksLevel } from "./levels/BuildingBlocksLevel";
import { HowBuiltLevel } from "./levels/HowBuiltLevel";
import { DecisionMakingLevel } from "./levels/DecisionMakingLevel";
import { GovernanceLevel } from "./levels/GovernanceLevel";
import { EconomicsLevel } from "./levels/EconomicsLevel";
import { FailureModesLevel } from "./levels/FailureModesLevel";

const bodies: Record<string, () => JSX.Element> = {
  "mental-model": MentalModelLevel,
  "building-blocks": BuildingBlocksLevel,
  "how-built": HowBuiltLevel,
  "decision-making": DecisionMakingLevel,
  governance: GovernanceLevel,
  economics: EconomicsLevel,
  "failure-modes": FailureModesLevel,
};

export default function LevelPage() {
  const { levelId } = useParams();
  const level = levelId ? levelById.get(levelId) : undefined;
  const prog = useProgress();

  useEffect(() => {
    if (level) progress.visitLevel(level.id);
  }, [level?.id]);

  if (!level) {
    return (
      <div className="container-narrow" style={{ padding: "80px 24px" }}>
        <h1>Level not found</h1>
        <p>
          <Link to="/learn">Back to the learning journey</Link>
        </p>
      </div>
    );
  }

  const Body = bodies[level.id];
  const quiz = quizById.get(level.id);
  const prev = levels.find((l) => l.num === level.num - 1);
  const next = levels.find((l) => l.num === level.num + 1);

  return (
    <div className="container-narrow" style={{ padding: "48px 24px" }}>
      <div style={{ marginBottom: 36 }}>
        <div className="kicker">
          Level {level.num} of {levels.length} · ~{level.minutes} min
        </div>
        <h1>{level.title}</h1>
        <p className="lede">{level.goal}</p>
        <SourceLink ids={level.sources} />
      </div>

      {Body && <Body />}

      {quiz && (
        <section style={{ marginTop: 48 }} aria-label="Knowledge check">
          <QuizRunner
            quiz={quiz}
            completedScore={prog.quizzes[quiz.id]}
            onComplete={(score, total) => progress.recordQuiz(quiz.id, score, total)}
          />
        </section>
      )}

      <nav
        aria-label="Level navigation"
        style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 40, flexWrap: "wrap" }}
      >
        {prev ? (
          <Link to={`/learn/${prev.id}`} className="btn btn-ghost">
            ← Level {prev.num}: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/learn/${next.id}`} className="btn btn-primary">
            Level {next.num}: {next.title} →
          </Link>
        ) : (
          <Link to="/scenarios" className="btn btn-accent">
            Practise on scenarios →
          </Link>
        )}
      </nav>
    </div>
  );
}
