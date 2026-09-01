import { useMemo, useState } from "react";
import type { Quiz as QuizData, QuizQuestion } from "../content/types";
import { SourceLink } from "./SourceLink";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LETTERS = "ABCDEFGH";

/** Runs a quiz question-by-question with immediate, source-cited feedback. */
export function QuizRunner({
  quiz,
  onComplete,
  completedScore,
}: {
  quiz: QuizData;
  onComplete: (score: number, total: number) => void;
  completedScore?: { score: number; total: number };
}) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  const total = quiz.questions.length;
  const q = quiz.questions[idx];

  function handleAnswered(correct: boolean) {
    if (answered) return;
    setAnswered(true);
    setLastCorrect(correct);
    if (correct) setScore((s) => s + 1);
  }

  function next() {
    if (idx + 1 >= total) {
      const finalScore = score;
      setFinished(true);
      onComplete(finalScore, total);
    } else {
      setIdx(idx + 1);
      setAnswered(false);
    }
  }

  function restart() {
    setIdx(0);
    setScore(0);
    setAnswered(false);
    setFinished(false);
    setStarted(true);
  }

  if (!started && !finished) {
    return (
      <div className="quiz">
        <div className="quiz-head">
          <h3>{quiz.title}</h3>
          <span className="quiz-progress">{total} questions</span>
        </div>
        <div className="quiz-body">
          <p style={{ color: "var(--ink-2)" }}>
            Scenario-first questions — they test relationships and judgement, not recall. Each answer
            explains the source reasoning.
            {completedScore && (
              <>
                {" "}Your best so far: <strong>{completedScore.score}/{completedScore.total}</strong>.
              </>
            )}
          </p>
          <button className="btn btn-primary" onClick={() => setStarted(true)}>
            {completedScore ? "Retake the check" : "Start the check"}
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = score / total;
    return (
      <div className="quiz">
        <div className="quiz-head">
          <h3>{quiz.title}</h3>
        </div>
        <div className="quiz-body">
          <div className="score-banner">
            <span className="score-num">
              {score}/{total}
            </span>
            <div>
              <strong>
                {pct === 1
                  ? "Complete command of this level."
                  : pct >= 0.7
                    ? "Solid — review the explanations you missed."
                    : "Worth another pass through this level before moving on."}
              </strong>
              <div style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>
                Progress is saved on this device.
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <button className="btn btn-ghost" onClick={restart}>
              Retake
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-head">
        <h3>{quiz.title}</h3>
        <span className="quiz-progress">
          {idx + 1} of {total}
        </span>
      </div>
      <div className="quiz-body" key={q.id}>
        <QuestionView q={q} answered={answered} onAnswered={handleAnswered} />
        {answered && (
          <div className="quiz-foot">
            <SourceLink ids={q.sources} />
            <button className="btn btn-primary" onClick={next} autoFocus>
              {idx + 1 >= total ? "See result" : "Next question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Explain({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="quiz-explain" role="status">
      <span className={`verdict ${ok ? "good" : "bad"}`}>{ok ? "Right." : "Not quite."}</span>
      {text}
    </div>
  );
}

function QuestionView({
  q,
  answered,
  onAnswered,
}: {
  q: QuizQuestion;
  answered: boolean;
  onAnswered: (correct: boolean) => void;
}) {
  switch (q.kind) {
    case "choice":
      return <ChoiceQ q={q} answered={answered} onAnswered={onAnswered} />;
    case "multi":
      return <MultiQ q={q} answered={answered} onAnswered={onAnswered} />;
    case "order":
      return <OrderQ q={q} answered={answered} onAnswered={onAnswered} />;
    case "match":
      return <MatchQ q={q} answered={answered} onAnswered={onAnswered} />;
  }
}

function ChoiceQ({
  q,
  answered,
  onAnswered,
}: {
  q: Extract<QuizQuestion, { kind: "choice" }>;
  answered: boolean;
  onAnswered: (c: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const order = useMemo(() => shuffle(q.options.map((_, i) => i)), [q.id]);

  function pick(i: number) {
    if (answered) return;
    setPicked(i);
    onAnswered(i === q.correct);
  }

  return (
    <div>
      <p className="quiz-prompt">{q.prompt}</p>
      <div className="quiz-options" role="group" aria-label="Answer options">
        {order.map((optIdx, displayIdx) => {
          let cls = "quiz-option";
          if (answered) {
            if (optIdx === q.correct) cls += " correct";
            else if (optIdx === picked) cls += " incorrect";
          } else if (optIdx === picked) cls += " picked";
          return (
            <button key={optIdx} className={cls} onClick={() => pick(optIdx)} disabled={answered}>
              <span className="option-key" aria-hidden>
                {LETTERS[displayIdx]}
              </span>
              <span>{q.options[optIdx]}</span>
            </button>
          );
        })}
      </div>
      {answered && <Explain ok={picked === q.correct} text={q.explanation} />}
    </div>
  );
}

function MultiQ({
  q,
  answered,
  onAnswered,
}: {
  q: Extract<QuizQuestion, { kind: "multi" }>;
  answered: boolean;
  onAnswered: (c: boolean) => void;
}) {
  const [picked, setPicked] = useState<Set<number>>(new Set());
  const order = useMemo(() => shuffle(q.options.map((_, i) => i)), [q.id]);
  const correctSet = useMemo(() => new Set(q.correct), [q]);

  function toggle(i: number) {
    if (answered) return;
    const next = new Set(picked);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setPicked(next);
  }

  function submit() {
    const ok =
      picked.size === correctSet.size && [...picked].every((i) => correctSet.has(i));
    onAnswered(ok);
  }

  const wasCorrect =
    picked.size === correctSet.size && [...picked].every((i) => correctSet.has(i));

  return (
    <div>
      <p className="quiz-prompt">{q.prompt}</p>
      <div className="quiz-options" role="group" aria-label="Answer options (select all that apply)">
        {order.map((optIdx, displayIdx) => {
          let cls = "quiz-option";
          if (answered) {
            if (correctSet.has(optIdx)) cls += " correct";
            else if (picked.has(optIdx)) cls += " incorrect";
          } else if (picked.has(optIdx)) cls += " picked";
          return (
            <button
              key={optIdx}
              className={cls}
              onClick={() => toggle(optIdx)}
              disabled={answered}
              aria-pressed={picked.has(optIdx)}
            >
              <span className="option-key" aria-hidden>
                {LETTERS[displayIdx]}
              </span>
              <span>{q.options[optIdx]}</span>
            </button>
          );
        })}
      </div>
      {!answered && (
        <button className="btn btn-ghost btn-sm" onClick={submit} disabled={picked.size === 0}>
          Check answer
        </button>
      )}
      {answered && <Explain ok={wasCorrect} text={q.explanation} />}
    </div>
  );
}

function OrderQ({
  q,
  answered,
  onAnswered,
}: {
  q: Extract<QuizQuestion, { kind: "order" }>;
  answered: boolean;
  onAnswered: (c: boolean) => void;
}) {
  const [items, setItems] = useState<string[]>(() => {
    let s = shuffle(q.items);
    // ensure the shuffle actually changed something
    if (s.every((v, i) => v === q.items[i]) && s.length > 1) s = [...s.slice(1), s[0]];
    return s;
  });

  function move(i: number, dir: -1 | 1) {
    if (answered) return;
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  }

  function submit() {
    onAnswered(items.every((v, i) => v === q.items[i]));
  }

  const ok = items.every((v, i) => v === q.items[i]);

  return (
    <div>
      <p className="quiz-prompt">{q.prompt}</p>
      <ol className="order-list" style={{ listStyle: "none", padding: 0 }}>
        {items.map((item, i) => (
          <li
            key={item}
            className={`order-item${answered ? (item === q.items[i] ? " right" : " wrong") : ""}`}
          >
            <span style={{ color: "var(--ink-3)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
              {i + 1}.
            </span>
            <span>{item}</span>
            {!answered && (
              <span className="order-controls">
                <button onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move "${item}" up`}>
                  ↑
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  aria-label={`Move "${item}" down`}
                >
                  ↓
                </button>
              </span>
            )}
          </li>
        ))}
      </ol>
      {!answered && (
        <button className="btn btn-ghost btn-sm" onClick={submit}>
          Check order
        </button>
      )}
      {answered && <Explain ok={ok} text={q.explanation} />}
    </div>
  );
}

function MatchQ({
  q,
  answered,
  onAnswered,
}: {
  q: Extract<QuizQuestion, { kind: "match" }>;
  answered: boolean;
  onAnswered: (c: boolean) => void;
}) {
  const rightOptions = useMemo(() => shuffle(q.pairs.map((p) => p.right)), [q.id]);
  const [choices, setChoices] = useState<Record<number, string>>({});

  function submit() {
    onAnswered(q.pairs.every((p, i) => choices[i] === p.right));
  }

  const complete = q.pairs.every((_, i) => choices[i]);
  const ok = q.pairs.every((p, i) => choices[i] === p.right);

  return (
    <div>
      <p className="quiz-prompt">{q.prompt}</p>
      <div className="match-grid">
        {q.pairs.map((p, i) => (
          <div
            key={p.left}
            className={`match-row${answered ? (choices[i] === p.right ? " right" : " wrong") : ""}`}
          >
            <span className="match-left">{p.left}</span>
            {answered ? (
              <span style={{ fontSize: "var(--fs-sm)" }}>
                {choices[i] === p.right ? (
                  p.right
                ) : (
                  <>
                    <s style={{ color: "var(--ink-3)" }}>{choices[i]}</s> → <strong>{p.right}</strong>
                  </>
                )}
              </span>
            ) : (
              <select
                value={choices[i] ?? ""}
                onChange={(e) => setChoices({ ...choices, [i]: e.target.value })}
                aria-label={`Match for ${p.left}`}
              >
                <option value="" disabled>
                  Choose…
                </option>
                {rightOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
      {!answered && (
        <button className="btn btn-ghost btn-sm" onClick={submit} disabled={!complete}>
          Check matches
        </button>
      )}
      {answered && <Explain ok={ok} text={q.explanation} />}
    </div>
  );
}
