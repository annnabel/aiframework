import { useState } from "react";
import { Link } from "react-router-dom";
import { StackMap, MapSelection } from "../../components/StackMap";
import { LayerDetail } from "../MapPage";
import { crossCutting } from "../../content/layers";
import { SourceLink } from "../../components/SourceLink";

export function MentalModelLevel() {
  const [sel, setSel] = useState<MapSelection>(null);

  return (
    <div>
      <section>
        <h2>What Enterprise AI actually is</h2>
        <p>
          Enterprise AI is best understood as a stack:{" "}
          <strong>
            Compute → Models → Serving → Data/Context → Build/Orchestration → Control Plane →
            Applications
          </strong>
          , with regulation, security, evaluation, cost and change management cutting across everything.
        </p>
        <p>
          The layers are real as a <em>decision map</em> — each layer has distinct decisions, vendors and
          lock-in mechanics. But they are deliberately blurred as a <em>market map</em>: hyperscalers span
          layers 1–6, Microsoft spans 2–7, and the model labs now sell applications as well as models.{" "}
          <strong>The central strategic tension of 2026 is integrated platform vs best-of-breed</strong> —
          and knowing which layer a vendor is actually trying to own is the single most useful analytical
          skill this material teaches.
        </p>
        <SourceLink ids={["01", "02"]} />
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>Walk the stack</h2>
        <p style={{ color: "var(--ink-2)" }}>
          Click each layer and read its one thing to remember. You know this level when you can place any
          product on the stack from memory.
        </p>
        <StackMap selected={sel} onSelect={setSel} />
        {sel && sel !== "crosscutting" && (
          <div style={{ marginTop: 24 }}>
            <LayerDetail layerId={sel} compact />
          </div>
        )}
        {sel === "crosscutting" && (
          <div className="panel rise" style={{ marginTop: 24 }}>
            <strong>The cross-cutting concerns</strong>
            <ul style={{ marginTop: 8, marginBottom: 0, fontSize: "var(--fs-sm)" }}>
              {crossCutting.map((c) => (
                <li key={c.id}>
                  <strong>{c.name}:</strong> {c.remember}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>How the layers interact</h2>
        <p>
          <strong>Value flows top-down:</strong> a business problem becomes an application, an application
          becomes agent and workflow logic, that logic pulls context from your data, the context reaches a
          routed model, the model runs on serving infrastructure, and serving runs on silicon.
        </p>
        <p>
          <strong>Constraints flow across:</strong> the control plane registers, permissions, watches,
          scores, budgets and audits everything from serving to applications. And{" "}
          <strong>everything is shaped from outside</strong> by regulation, change management and the
          operating model.
        </p>
        <p>
          Note what the map implies: the model is <em>one box of eight</em>. Enterprises that treat
          “which model?” as the whole decision are ignoring seven-eighths of the architecture.
        </p>
        <p>
          <Link to="/architecture">See the layers in action — follow one request end to end →</Link>
        </p>
        <SourceLink ids={["06", "02"]} />
      </section>

      <section style={{ marginTop: 36 }}>
        <h2>Be able to explain it</h2>
        <div className="panel" style={{ background: "var(--crimson-tint)", borderColor: "var(--crimson-tint-2)" }}>
          “Enterprise AI is a stack: silicon at the bottom, business outcomes at the top, and a governance
          plane across everything. Every product you'll be pitched lives somewhere on it — and most
          confusion is someone selling three layers as one word.”
        </div>
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)", marginTop: 10 }}>
          If you can say that to a smart non-technical person — and place M365 Copilot, Bedrock AgentCore,
          DeepSeek V4, LangGraph and Agent 365 on the stack from memory — you've passed this level. The
          knowledge check below tests exactly that.
        </p>
      </section>
    </div>
  );
}
