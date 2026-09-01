import { useState } from "react";
import { Link } from "react-router-dom";
import { concepts, categoryLabels } from "../../content/concepts";
import { comparePairs } from "../../content/compare";
import { CompareCard } from "../../components/CompareCard";
import { layerById } from "../../content/layers";
import { SourceLink } from "../../components/SourceLink";

const groupOrder = ["models", "build-patterns", "agents", "protocols", "operations", "commercial", "business"];

const groupIntro: Record<string, string> = {
  models: "The intelligence itself — and why its cost structure, not its capability, drives most decisions.",
  "build-patterns": "How knowledge and behaviour actually reach a model: retrieval first, context engineering second, tuning last.",
  agents: "From answering to acting — and the governance that acting requires.",
  protocols: "The standardisation story: what won, what competes, and what's still a draft.",
  operations: "The disciplines that make any of this safe to run: evals, identity, policy, cost.",
  commercial: "How AI is bought and sold — and where lock-in actually lives.",
  business: "The market patterns that decide which budget line AI competes for.",
};

export function BuildingBlocksLevel() {
  const [openGroup, setOpenGroup] = useState<string>("models");

  return (
    <div>
      <section>
        <p>
          Roughly seventy terms carry this whole field — and the rule from the source glossary holds
          everywhere: <strong>every term is one line on what it is, one line on the decision it affects.</strong>{" "}
          If a term affects no decision, it's flagged <span className="tag tag-neutral">⚑ jargon</span> and
          you can safely delegate it. Concepts are grouped by relationship, not alphabet — work a group at
          a time, and open any concept for its full learning page with prerequisites and connections.
        </p>
        <SourceLink ids={["03"]} />
      </section>

      <section style={{ marginTop: 28 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
          {groupOrder.map((g) => (
            <button
              key={g}
              className="btn btn-sm"
              style={
                openGroup === g
                  ? { background: "var(--ink)", color: "white", border: "1px solid var(--ink)" }
                  : { background: "var(--bg)", border: "1px solid var(--border-strong)", color: "var(--ink)" }
              }
              onClick={() => setOpenGroup(g)}
              aria-pressed={openGroup === g}
            >
              {categoryLabels[g]}
            </button>
          ))}
        </div>

        <p style={{ color: "var(--ink-2)", fontSize: "var(--fs-sm)" }}>{groupIntro[openGroup]}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }} key={openGroup}>
          {concepts
            .filter((c) => c.category === openGroup)
            .map((c) => {
              const layer = layerById.get(c.layer);
              return (
                <Link
                  key={c.id}
                  to={`/concept/${c.id}`}
                  className="panel-white rise"
                  style={{ display: "flex", gap: 12, alignItems: "flex-start", color: "var(--ink)", padding: "12px 16px" }}
                >
                  <span
                    className="chip-dot"
                    style={{ background: layer?.color, marginTop: 7, flexShrink: 0 }}
                    aria-hidden
                  />
                  <span style={{ fontSize: "var(--fs-sm)" }}>
                    <strong>{c.term}</strong>
                    {c.jargon && <span className="tag tag-neutral" style={{ marginLeft: 8 }}>⚑ jargon</span>}
                    <span style={{ display: "block", color: "var(--ink-2)", marginTop: 2 }}>{c.whatItIs}</span>
                    <span style={{ display: "block", color: "var(--crimson-deep)", marginTop: 2 }}>
                      Decision: {c.decision}
                    </span>
                  </span>
                </Link>
              );
            })}
        </div>
      </section>

      <section style={{ marginTop: 44 }}>
        <h2>The load-bearing distinctions</h2>
        <p style={{ color: "var(--ink-2)" }}>
          These are the pairs people mix up in real meetings. Read both sides, then check yourself
          against the verdict.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {comparePairs.map((p) => (
            <CompareCard key={p.id} pair={p} />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>The self-test that matters</h2>
        <div className="panel" style={{ background: "var(--crimson-tint)", borderColor: "var(--crimson-tint-2)" }}>
          Explain to a CFO why “tokens-per-dollar” is the wrong metric and “cost per task at target
          quality” is the right one. (Hint: reasoning models spend variable tokens per task — unit prices
          fall while bills rise.)
        </div>
      </section>
    </div>
  );
}
