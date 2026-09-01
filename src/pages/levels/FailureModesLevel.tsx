import { Link } from "react-router-dom";
import { failureModes, compoundFailure } from "../../content/failures";
import { FailureCard } from "../../components/FailureCard";
import { SourceLink } from "../../components/SourceLink";

export function FailureModesLevel() {
  return (
    <div>
      <section>
        <h2>The base rates are brutal — and patterned</h2>
        <p>
          More than 80% of enterprises report no material EBIT effect from AI; only ~25% have moved even
          40% of pilots to production; Gartner expects &gt;40% of agentic projects cancelled by end-2027.
          But the failures are <strong>patterned</strong> — which means they're screenable, at proposal
          time, when killing a bad project costs a meeting instead of a year.
        </p>
        <p style={{ color: "var(--ink-2)", fontSize: "var(--fs-sm)" }}>
          Open each failure mode: the situation, why it happens, the smell test that exposes it, and where
          it sits on the map — failures often <em>start</em> in one layer and <em>surface</em> in another.
        </p>
        <SourceLink ids={["10"]} />
      </section>

      <section style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
        {failureModes.map((f) => (
          <FailureCard key={f.id} f={f} />
        ))}
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>The compound failure — how they chain</h2>
        <p>{compoundFailure}</p>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>Break the chain before it starts</h2>
        <p>
          The pre-mortem checklist — seven questions, ten minutes, most bad projects dead before they
          consume a year — is available as an interactive screening tool.
        </p>
        <Link to="/scenarios?tool=premortem" className="btn btn-primary">
          Run the pre-mortem checklist →
        </Link>
      </section>
    </div>
  );
}
