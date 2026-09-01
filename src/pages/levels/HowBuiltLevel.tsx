import { Link } from "react-router-dom";
import { ArchetypeDial, ArchetypeDimensions } from "../../components/ArchetypeDial";
import { DecisionTreeView } from "../../components/DecisionWidgets";
import { SourceLink } from "../../components/SourceLink";

export function HowBuiltLevel() {
  return (
    <div>
      <section>
        <h2>One dial, seven ways to build</h2>
        <p>
          “Should we build or buy AI?” is the wrong question — there are seven distinct ways to acquire AI
          capability, and they turn <strong>one underlying dial: how much of the system you own.</strong>{" "}
          Moving right, control and differentiation rise; speed and inherited governance fall. Most
          enterprises run several at once, on purpose.
        </p>
        <p style={{ color: "var(--ink-2)", fontSize: "var(--fs-sm)" }}>
          The question to hold for each archetype is <em>when would you choose it</em> — not just what it
          is. Watch the “best / poor use cases” rows as you move the dial.
        </p>
        <ArchetypeDial />
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>What fundamentally changes from 1 → 6</h2>
        <p style={{ color: "var(--ink-2)" }}>
          Score any proposal on these five dimensions rather than debating labels:
        </p>
        <ArchetypeDimensions />
        <SourceLink ids={["04"]} />
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>The knowledge-vs-behaviour question</h2>
        <p>
          The classic heuristic — <strong>“RAG = knowledge, fine-tuning = behaviour”</strong> — survived
          the audit as <em>mostly true</em> first-order guidance, with three corrections: context
          engineering now carries most behaviour work; fine-tuning's biggest enterprise use is cost
          compression (distillation); and production systems combine techniques rather than choosing.
          What decides it in every case: <strong>evals, not doctrine.</strong>
        </p>
        <DecisionTreeView />
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>See the machinery in motion</h2>
        <p>
          The architecture explorer walks one real request through every layer — the plan, the retrieval,
          the policy-checked tool calls, the gated write, the eval loop. It's the fastest way to make
          these archetypes concrete.
        </p>
        <Link to="/architecture" className="btn btn-primary">
          Open the Architecture Explorer →
        </Link>
      </section>
    </div>
  );
}
