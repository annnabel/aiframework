import { Link } from "react-router-dom";
import { FiveLinks, PriceTable, TaskCostCalculator } from "../../components/EconomicsWidgets";
import {
  valueVerdict,
  pricingModels,
  pricingDirection,
  valueEvidence,
  winnersTraits,
  economicsSoWhat,
} from "../../content/economics";
import { SourceLink } from "../../components/SourceLink";
import { useState } from "react";

export function EconomicsLevel() {
  const [openEvidence, setOpenEvidence] = useState<string | null>(null);

  return (
    <div>
      <section>
        <h2>Where value comes from — the verdict in four numbers</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, margin: "18px 0" }}>
          {valueVerdict.stats.map((s) => (
            <div key={s.value} className="panel" style={{ padding: "16px 18px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-2xl)", color: "var(--crimson-deep)" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-2)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <p>{valueVerdict.bridge}</p>
        <SourceLink ids={["09"]} />
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>What costs matter — the five-link chain</h2>
        <p style={{ color: "var(--ink-2)" }}>
          Optimising any single link in isolation misleads. Walk all five:
        </p>
        <FiveLinks />
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>The price landscape</h2>
        <PriceTable />
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>How vendors actually charge</h2>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Model</th>
                <th>Examples</th>
                <th>The catch</th>
              </tr>
            </thead>
            <tbody>
              {pricingModels.map((p) => (
                <tr key={p.model}>
                  <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{p.model}</td>
                  <td>{p.examples}</td>
                  <td>{p.theCatch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)", marginTop: 10 }}>{pricingDirection}</p>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>Run your own numbers</h2>
        <p style={{ color: "var(--ink-2)" }}>
          The pocket framework, interactive. Watch what doubling the HITL ratio does to your case — that
          stress test is the whole point.
        </p>
        <TaskCostCalculator />
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>Where value is proven — and where evidence cuts both ways</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {valueEvidence.map((e) => {
            const open = openEvidence === e.id;
            return (
              <div key={e.id} className="panel-white" style={{ padding: 0 }}>
                <button
                  onClick={() => setOpenEvidence(open ? null : e.id)}
                  aria-expanded={open}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "baseline",
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: "13px 16px",
                    color: "var(--ink)",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{e.domain}</span>
                  <span className="tag tag-neutral">{e.verdict}</span>
                  <span style={{ marginLeft: "auto", color: "var(--ink-3)" }}>{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <p className="rise" style={{ padding: "0 16px 14px", fontSize: "var(--fs-sm)", color: "var(--ink-2)", margin: 0 }}>
                    {e.body}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginTop: 10 }}>
          Where credible sources disagree (pilot failure rates, coding productivity, margins), the
          disagreement is preserved rather than smoothed — see the{" "}
          <Link to="/sources/13">source register</Link> for claim-by-claim confidence.
        </p>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>What leaders should measure — the ~6% playbook</h2>
        <ol>
          {winnersTraits.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
        <div className="panel" style={{ background: "var(--crimson-tint)", borderColor: "var(--crimson-tint-2)" }}>
          <strong>So what:</strong> {economicsSoWhat}
        </div>
      </section>
    </div>
  );
}
