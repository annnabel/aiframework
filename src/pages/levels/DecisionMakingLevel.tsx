import { useState } from "react";
import { Link } from "react-router-dom";
import { axes } from "../../content/decisions";
import { LockInQuad, MaturityLadder, TenSteps } from "../../components/DecisionWidgets";
import { SourceLink } from "../../components/SourceLink";

export function DecisionMakingLevel() {
  const [openAxis, setOpenAxis] = useState<string | null>("trust");

  return (
    <div>
      <section>
        <h2>Five axes, not feature lists</h2>
        <p>
          Vendor feature comparison is how enterprises get <em>sold</em>; these five axes are how they
          should <em>decide</em>. Each axis ends in a question you can put to any proposal.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {axes.map((a) => {
            const open = openAxis === a.id;
            return (
              <div key={a.id} className="panel-white" style={{ padding: 0 }}>
                <button
                  onClick={() => setOpenAxis(open ? null : a.id)}
                  aria-expanded={open}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "baseline",
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: "14px 18px",
                    color: "var(--ink)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-lg)", color: "var(--crimson-deep)" }}
                  >
                    {a.num}
                  </span>
                  <span>
                    <span style={{ fontWeight: 600 }}>{a.name}</span>
                    <span style={{ display: "block", fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>{a.idea}</span>
                  </span>
                  <span style={{ marginLeft: "auto", color: "var(--ink-3)" }}>{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <div className="rise" style={{ borderTop: "1px solid var(--border)", padding: "16px 18px" }}>
                    <ul style={{ fontSize: "var(--fs-sm)" }}>
                      {a.detail.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    <div className="panel" style={{ background: "var(--crimson-tint)", borderColor: "var(--crimson-tint-2)", padding: "12px 16px" }}>
                      <strong>The question to ask:</strong>{" "}
                      <span style={{ fontSize: "var(--fs-sm)" }}>{a.question}</span>
                    </div>
                    {a.id === "trust" && (
                      <div style={{ marginTop: 18 }}>
                        <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-sm)", fontWeight: 700 }}>
                          The lock-in 2×2 — click a quadrant
                        </h4>
                        <LockInQuad />
                      </div>
                    )}
                    {a.id === "governance" && (
                      <div style={{ marginTop: 18 }}>
                        <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-sm)", fontWeight: 700 }}>
                          The maturity ladder — where are you?
                        </h4>
                        <MaturityLadder />
                      </div>
                    )}
                    <div style={{ marginTop: 12 }}>
                      <SourceLink ids={a.sources} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>The ten-step executive decision process</h2>
        <p style={{ color: "var(--ink-2)" }}>
          When someone brings you an AI problem, walk it in order — each step gates the next.
        </p>
        <TenSteps />
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Put it to work</h2>
        <p>
          The Decision Explorer turns these frameworks into interactive tools: a build-approach guide,
          the cost-per-task calculator, and the questions playbook for every audience — vendor, CTO,
          data, security, legal.
        </p>
        <Link to="/decisions" className="btn btn-primary">
          Open the Decision Explorer →
        </Link>
      </section>
    </div>
  );
}
