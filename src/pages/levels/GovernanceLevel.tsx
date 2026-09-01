import { RegTimeline, SevenControls, ThreatModelPanel } from "../../components/GovernanceWidgets";
import { MaturityLadder } from "../../components/DecisionWidgets";
import {
  maturityGap,
  governanceReframe,
  bridgeStandards,
  extraterritorial,
  oneSlideSummary,
} from "../../content/governance";
import { SourceLink } from "../../components/SourceLink";

export function GovernanceLevel() {
  return (
    <div>
      <section>
        <h2>What are we trying to do?</h2>
        <p>
          Run AI — increasingly, AI that <em>acts</em> — without it failing security review, breaching
          law, or causing harm. The frame that makes everything else fall into place:{" "}
          <strong>an agent that acts on real systems is an employee from a risk perspective.</strong> It
          needs an identity, scoped permissions, a budget, supervision, an audit trail, and offboarding.
        </p>
        <p style={{ fontWeight: 500 }}>{maturityGap}</p>
        <SourceLink ids={["08"]} />
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>What risks emerge?</h2>
        <ThreatModelPanel />
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>What controls matter?</h2>
        <p style={{ color: "var(--ink-2)" }}>
          The seven-control stack that leading enterprises converge on — each control links to its concept
          page:
        </p>
        <SevenControls />
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>What governance is required — at your autonomy level?</h2>
        <p style={{ color: "var(--ink-2)" }}>
          Assess yourself before approving autonomy. Autonomy must not exceed maturity.
        </p>
        <MaturityLadder />
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>What regulations may apply?</h2>
        <p>
          Start from the deadlines, not the statutes. Filter by jurisdiction and expand only what touches
          you — that's how the source material is meant to be used.
        </p>
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>{extraterritorial}</p>
        <RegTimeline />
        <p style={{ fontSize: "var(--fs-sm)", marginTop: 14 }}>
          <strong>The bridge across all jurisdictions:</strong> {bridgeStandards}
        </p>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>The one-slide summary for an executive</h2>
        <div className="panel">
          <ul style={{ marginBottom: 0, fontSize: "var(--fs-sm)" }}>
            {oneSlideSummary.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="panel" style={{ marginTop: 14, background: "var(--crimson-tint)", borderColor: "var(--crimson-tint-2)" }}>
          <strong>The reframe for the board:</strong> {governanceReframe}
        </div>
      </section>
    </div>
  );
}
