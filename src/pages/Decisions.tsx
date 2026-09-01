import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  guideQuestions,
  guideRecommend,
  type GuideAnswerSet,
} from "../content/decisions";
import { archetypes, archetypeById } from "../content/archetypes";
import { ArchetypeDial } from "../components/ArchetypeDial";
import { LockInQuad, MaturityLadder, TenSteps, DecisionTreeView } from "../components/DecisionWidgets";
import { TaskCostCalculator } from "../components/EconomicsWidgets";
import { audiences, questionPattern, marketingTranslator } from "../content/questions";
import { vendors, vendorReads, marketAnchor } from "../content/vendors";
import { concepts, conceptById, categoryLabels, unlockedBy } from "../content/concepts";
import { layerById, layers } from "../content/layers";
import { ConceptChips } from "../components/ConceptChip";
import { MiniMap } from "../components/StackMap";
import { SourceLink } from "../components/SourceLink";
import { progress } from "../lib/progress";

type Tool = "build" | "fit" | "questions" | "frameworks" | "economics" | "archetypes" | "vendors";

const tools: { id: Tool; label: string; desc: string }[] = [
  { id: "build", label: "How should I build this?", desc: "Walk the archetype decision" },
  { id: "fit", label: "Where does this fit?", desc: "Place any technology on the map" },
  { id: "questions", label: "What should I ask?", desc: "The questions playbook" },
  { id: "frameworks", label: "The frameworks", desc: "Ten steps · 2×2 · ladder · tree" },
  { id: "economics", label: "Cost per task", desc: "The unit-economics calculator" },
  { id: "archetypes", label: "The archetypes", desc: "All seven, on the dial" },
  { id: "vendors", label: "Vendor positioning", desc: "Who owns what + the translator" },
];

export default function DecisionsPage() {
  const [params, setParams] = useSearchParams();
  const tool = (params.get("tool") as Tool) || "build";

  useEffect(() => {
    progress.visitArea("decisions");
  }, []);

  return (
    <div className="container" style={{ padding: "48px 24px" }}>
      <div style={{ maxWidth: 760 }}>
        <h1>Decision Explorer</h1>
        <p className="lede">
          The source frameworks, turned into working tools. The guidance shown is source-backed
          throughout; the interactive routing just helps you find the right part of it.
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "24px 0 32px" }}>
        {tools.map((t) => (
          <button
            key={t.id}
            className="btn btn-sm"
            style={
              tool === t.id
                ? { background: "var(--ink)", color: "white", border: "1px solid var(--ink)" }
                : { background: "var(--bg)", border: "1px solid var(--border-strong)", color: "var(--ink)" }
            }
            onClick={() => setParams({ tool: t.id })}
            aria-pressed={tool === t.id}
            title={t.desc}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tool === "build" && <BuildGuide />}
      {tool === "fit" && <WhereFits />}
      {tool === "questions" && <QuestionsPlaybook initialAud={params.get("aud")} />}
      {tool === "frameworks" && <Frameworks />}
      {tool === "economics" && <EconomicsTool />}
      {tool === "archetypes" && <ArchetypesTool initial={params.get("a") ?? undefined} />}
      {tool === "vendors" && <VendorsTool />}
    </div>
  );
}

/* ── Tool 1: guided build-approach ─────────────────────────────────── */

function BuildGuide() {
  const [answers, setAnswers] = useState<GuideAnswerSet>({});
  const [done, setDone] = useState(false);

  const answeredCount = guideQuestions.filter((q) => answers[q.id as keyof GuideAnswerSet]).length;
  const result = done ? guideRecommend(answers) : null;

  return (
    <div style={{ maxWidth: 820 }}>
      <p style={{ color: "var(--ink-2)", fontSize: "var(--fs-sm)" }}>
        Five questions from the ten-step process and the archetype framework. Answer what you know — the
        trade-offs shown at the end come straight from the source documents; this routing is navigation,
        not new expertise.
      </p>
      {guideQuestions.map((q, i) => {
        const val = answers[q.id as keyof GuideAnswerSet];
        return (
          <div key={q.id} className="panel-white" style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              <span style={{ color: "var(--crimson-deep)", marginRight: 8 }}>{i + 1}</span>
              {q.prompt}
            </div>
            {q.help && (
              <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: 10 }}>{q.help}</p>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {q.options.map((o) => (
                <button
                  key={o.id}
                  className="btn btn-sm"
                  style={
                    val === o.id
                      ? { background: "var(--crimson)", color: "white", border: "1px solid var(--crimson)" }
                      : { background: "var(--bg)", border: "1px solid var(--border-strong)", color: "var(--ink)" }
                  }
                  onClick={() => {
                    setAnswers({ ...answers, [q.id]: o.id });
                    setDone(false);
                  }}
                  aria-pressed={val === o.id}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
      <button className="btn btn-primary" disabled={answeredCount < 2} onClick={() => setDone(true)}>
        Show the relevant archetypes ({answeredCount}/{guideQuestions.length} answered)
      </button>

      {result && (
        <div className="rise" style={{ marginTop: 28 }}>
          <h3>Where the framework points</h3>
          {result.reasoning.map((r) => (
            <p key={r} style={{ fontSize: "var(--fs-sm)" }}>
              {r}
            </p>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginTop: 12 }}>
            {result.archetypeIds.map((id) => {
              const a = archetypeById.get(id)!;
              return (
                <div key={id} className="panel">
                  <strong>
                    {a.num}. {a.name}
                  </strong>
                  <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)", margin: "6px 0" }}>{a.tagline}</p>
                  <p style={{ fontSize: "var(--fs-xs)", margin: 0 }}>
                    <strong>Best:</strong> {a.bestFor}
                  </p>
                  <p style={{ fontSize: "var(--fs-xs)", margin: "4px 0 8px" }}>
                    <strong>Poor:</strong> {a.poorFor}
                  </p>
                  <Link to={`/decisions?tool=archetypes&a=${a.id}`} style={{ fontSize: "var(--fs-sm)" }}>
                    Full dimension table →
                  </Link>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginTop: 12 }}>
            Source-backed guidance: archetype definitions, trade-offs and the portfolio rule are from the
            build-archetypes and decision-framework documents. The five-question routing is this site's
            navigation logic.
          </p>
          <SourceLink ids={["04", "05"]} />
        </div>
      )}
    </div>
  );
}

/* ── Tool 2: where does this technology fit ────────────────────────── */

function WhereFits() {
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<string | null>(null);

  const matches = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return concepts
      .filter((c) => `${c.term} ${c.whatItIs}`.toLowerCase().includes(query))
      .slice(0, 8);
  }, [q]);

  const c = picked ? conceptById.get(picked) : null;
  const layer = c ? layerById.get(c.layer)! : null;

  return (
    <div style={{ maxWidth: 820 }}>
      <p style={{ color: "var(--ink-2)", fontSize: "var(--fs-sm)" }}>
        Type a technology or concept — see which layer it belongs to, what problem it solves, what it
        connects to, and the decisions it affects.
      </p>
      <input
        type="search"
        placeholder="e.g. RAG, MCP, fine-tuning, agent identity, outcome pricing…"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setPicked(null);
        }}
        aria-label="Search for a technology or concept"
        style={{
          fontFamily: "inherit",
          fontSize: "var(--fs-md)",
          padding: "12px 16px",
          borderRadius: "var(--r-md)",
          border: "1px solid var(--border-strong)",
          width: "100%",
          maxWidth: 480,
          background: "var(--bg)",
          color: "var(--ink)",
        }}
      />
      {!picked && matches.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {matches.map((m) => (
            <button key={m.id} className="chip" onClick={() => setPicked(m.id)} style={{ cursor: "pointer" }}>
              {m.term}
            </button>
          ))}
        </div>
      )}
      {!picked && q.trim() && matches.length === 0 && (
        <p style={{ color: "var(--ink-3)", fontSize: "var(--fs-sm)", marginTop: 12 }}>
          Nothing in the knowledge base matches “{q}”. Try the <Link to="/glossary">full concept list</Link>.
        </p>
      )}

      {c && layer && (
        <div className="rise" style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr auto", gap: 28, alignItems: "start" }}>
          <div style={{ minWidth: 0 }}>
            <h3>{c.term}</h3>
            <div className="detail-block">
              <h4>Which layer it belongs to</h4>
              <p style={{ fontSize: "var(--fs-sm)" }}>
                <Link to={`/map?layer=${layer.id}`}>
                  Layer {layer.num} — {layer.name}
                </Link>{" "}
                ({categoryLabels[c.category]})
              </p>
            </div>
            <div className="detail-block">
              <h4>What problem it solves</h4>
              <p style={{ fontSize: "var(--fs-sm)" }}>{c.whatItIs}</p>
            </div>
            <div className="detail-block">
              <h4>The decision it affects</h4>
              <p style={{ fontSize: "var(--fs-sm)", fontWeight: 500, color: "var(--crimson-deep)" }}>{c.decision}</p>
            </div>
            {(c.related?.length || c.prerequisites?.length) && (
              <div className="detail-block">
                <h4>What it connects to</h4>
                <ConceptChips
                  ids={[...(c.prerequisites ?? []), ...(c.related ?? []), ...unlockedBy(c.id).map((x) => x.id)].filter(
                    (id, i, arr) => conceptById.has(id) && arr.indexOf(id) === i
                  )}
                />
              </div>
            )}
            {c.confusedWith && c.confusedWith.length > 0 && (
              <div className="detail-block">
                <h4>Common alternatives / confusions</h4>
                <ConceptChips ids={c.confusedWith.filter((id) => conceptById.has(id))} />
              </div>
            )}
            <Link to={`/concept/${c.id}`} className="btn btn-ghost btn-sm">
              Full concept page →
            </Link>
          </div>
          <div style={{ width: 200 }}>
            <MiniMap hot={[c.layer]} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Tool 3: questions playbook ────────────────────────────────────── */

function QuestionsPlaybook({ initialAud }: { initialAud: string | null }) {
  const [aud, setAud] = useState(initialAud ?? "vendor");
  const active = audiences.find((a) => a.id === aud) ?? audiences[0];
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  return (
    <div style={{ maxWidth: 860 }}>
      <p style={{ color: "var(--ink-2)", fontSize: "var(--fs-sm)" }}>
        You don't need to out-engineer anyone; you need questions that expose lock-in, hidden costs,
        governance gaps and unclear ownership. Each question names the failure it screens for — think
        about what a good answer looks like before revealing it. Good answers are specific, quantified
        and demo-able; bad answers are adjectives.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "16px 0" }}>
        {audiences.map((a) => (
          <button
            key={a.id}
            className="btn btn-sm"
            style={
              aud === a.id
                ? { background: "var(--crimson)", color: "white", border: "1px solid var(--crimson)" }
                : { background: "var(--bg)", border: "1px solid var(--border-strong)", color: "var(--ink)" }
            }
            onClick={() => setAud(a.id)}
            aria-pressed={aud === a.id}
          >
            {a.name}
          </button>
        ))}
      </div>
      <p style={{ fontSize: "var(--fs-sm)", fontStyle: "italic", color: "var(--ink-2)" }}>{active.intro}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }} key={active.id}>
        {active.questions.map((q, i) => {
          const key = `${active.id}-${i}`;
          const shown = revealed.has(key);
          return (
            <div key={key} className="panel-white rise">
              <p style={{ fontWeight: 500, marginBottom: 8 }}>
                <span style={{ color: "var(--crimson-deep)", marginRight: 8 }}>{i + 1}.</span>
                “{q.question}”
              </p>
              {shown ? (
                <p className="rise" style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)", margin: 0 }}>
                  <strong>Screens for:</strong> {q.screensFor}
                </p>
              ) : (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setRevealed(new Set([...revealed, key]))}
                >
                  What does this screen for?
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="panel" style={{ marginTop: 20 }}>
        <strong>The pattern behind the questions:</strong>{" "}
        <span style={{ fontSize: "var(--fs-sm)" }}>{questionPattern}</span>
      </div>
      <div style={{ marginTop: 10 }}>
        <SourceLink ids={["11"]} />
      </div>
    </div>
  );
}

/* ── Tool 4: frameworks ────────────────────────────────────────────── */

function Frameworks() {
  return (
    <div style={{ maxWidth: 860 }}>
      <section>
        <h3>The ten-step executive decision process</h3>
        <TenSteps />
      </section>
      <section style={{ marginTop: 40 }}>
        <h3>The lock-in 2×2</h3>
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>
          Every AI dependency is a bet on a partner. Click the quadrant a relationship sits in.
        </p>
        <LockInQuad />
      </section>
      <section style={{ marginTop: 40 }}>
        <h3>The governance maturity ladder</h3>
        <MaturityLadder />
      </section>
      <section style={{ marginTop: 40 }}>
        <h3>The knowledge-vs-behaviour decision tree</h3>
        <DecisionTreeView />
      </section>
      <div style={{ marginTop: 16 }}>
        <SourceLink ids={["05", "04"]} />
      </div>
    </div>
  );
}

/* ── Tool 5: economics ─────────────────────────────────────────────── */

function EconomicsTool() {
  return (
    <div>
      <p style={{ maxWidth: "68ch", color: "var(--ink-2)", fontSize: "var(--fs-sm)" }}>
        The pocket framework from the decision-framework and economics documents, interactive: all-in
        cost per completed task vs value per task, with the stress test the source insists on — what
        happens when the human-in-the-loop ratio doubles. Scale only if value/cost &gt; 3× on measured
        production traffic.
      </p>
      <TaskCostCalculator />
    </div>
  );
}

/* ── Tool 6: archetypes ────────────────────────────────────────────── */

function ArchetypesTool({ initial }: { initial?: string }) {
  return (
    <div style={{ maxWidth: 900 }}>
      <p style={{ color: "var(--ink-2)", fontSize: "var(--fs-sm)" }}>
        The seven ways enterprises actually acquire AI — one dial: control and differentiation rise to the
        right; speed and inherited governance rise to the left.
      </p>
      <ArchetypeDial initial={initial && archetypes.some((a) => a.id === initial) ? initial : undefined} />
    </div>
  );
}

/* ── Tool 7: vendors ───────────────────────────────────────────────── */

function VendorsTool() {
  const [sel, setSel] = useState<string | null>(null);
  const active = vendors.find((v) => v.id === sel);
  const gridLayers = [...layers].sort((a, b) => a.num - b.num);

  return (
    <div>
      <p style={{ maxWidth: "70ch", color: "var(--ink-2)", fontSize: "var(--fs-sm)" }}>
        Vendor comparisons age in weeks; vendor <em>strategies</em> persist for years. ●●● = trying to
        own · ●● = strong play · ● = present. Click a vendor for what they own, commoditise, and leave to
        others.
      </p>
      <div className="table-wrap" style={{ margin: "16px 0" }}>
        <table className="data">
          <thead>
            <tr>
              <th>Vendor</th>
              {gridLayers.map((l) => (
                <th key={l.id} title={l.name}>
                  L{l.num}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr
                key={v.id}
                onClick={() => setSel(sel === v.id ? null : v.id)}
                style={{ cursor: "pointer", background: sel === v.id ? "var(--crimson-tint)" : undefined }}
              >
                <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                  <button
                    style={{ all: "unset", cursor: "pointer", font: "inherit" }}
                    aria-expanded={sel === v.id}
                  >
                    {v.name}
                  </button>
                </td>
                {gridLayers.map((l) => {
                  const cell = v.grid[l.id];
                  return (
                    <td key={l.id} title={cell?.note} style={{ whiteSpace: "nowrap", color: "var(--crimson-deep)" }}>
                      {cell ? "●".repeat(cell.level) || "—" : "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {active && (
        <div className="panel-white rise" style={{ maxWidth: 820, marginBottom: 24 }}>
          <h4 style={{ margin: 0 }}>{active.name}</h4>
          <div className="table-wrap" style={{ marginTop: 12 }}>
            <table className="data">
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, width: 160 }}>Trying to own</td>
                  <td>{active.tryingToOwn}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Commoditises</td>
                  <td>{active.commoditises}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Locks you into</td>
                  <td>{active.locksYouInto}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Leaves to others</td>
                  <td>{active.leavesToOthers}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Watch / ask</td>
                  <td>{active.watchOrAsk}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 820 }}>
        <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>{marketAnchor}</p>
        <div className="panel">
          <strong>The three durable reads:</strong>
          <ol style={{ marginTop: 8, marginBottom: 0, fontSize: "var(--fs-sm)" }}>
            {vendorReads.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        </div>
      </div>

      <section style={{ marginTop: 32, maxWidth: 900 }}>
        <h3>The vendor marketing translator</h3>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Vendor says</th>
                <th>Usually means</th>
                <th>The strategic question to ask</th>
              </tr>
            </thead>
            <tbody>
              {marketingTranslator.map((r) => (
                <tr key={r.says}>
                  <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>“{r.says}”</td>
                  <td>{r.means}</td>
                  <td style={{ color: "var(--crimson-deep)" }}>{r.ask}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 10 }}>
          <SourceLink ids={["07"]} />
        </div>
      </section>
    </div>
  );
}
