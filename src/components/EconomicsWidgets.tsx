import { useState } from "react";
import {
  fiveLinks,
  priceTiers,
  priceFacts,
  calcDefaults,
  calcCost,
  calcValue,
  type CalcInputs,
} from "../content/economics";
import { SourceLink } from "./SourceLink";

/** The five-link chain as a horizontal walk. */
export function FiveLinks() {
  const [open, setOpen] = useState<string>("model");
  const active = fiveLinks.find((l) => l.id === open)!;
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
        {fiveLinks.map((l, i) => (
          <span key={l.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {i > 0 && <span aria-hidden style={{ color: "var(--ink-3)" }}>→</span>}
            <button
              className="btn btn-sm btn-toggle btn-toggle-accent"
              onClick={() => setOpen(l.id)}
              aria-pressed={open === l.id}
            >
              {l.name}
            </button>
          </span>
        ))}
      </div>
      <div className="panel rise" key={active.id}>
        <strong>{active.name}.</strong> {active.body}
      </div>
    </div>
  );
}

export function PriceTable() {
  return (
    <div>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Tier</th>
              <th>Examples</th>
              <th>Input $/MTok</th>
              <th>Output $/MTok</th>
            </tr>
          </thead>
          <tbody>
            {priceTiers.map((t) => (
              <tr key={t.tier}>
                <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{t.tier}</td>
                <td>{t.examples}</td>
                <td>${t.input}</td>
                <td>${t.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)", marginTop: 10 }}>
        {priceFacts.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)" }}>
        Verified list prices, Aug–Sep 2026 — flagged perishable in the source register; re-verify before
        quoting after Q4 2026.
      </p>
    </div>
  );
}

function Num({
  label,
  value,
  step = 1,
  min = 0,
  onChange,
}: {
  label: string;
  value: number;
  step?: number;
  min?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="field">
      <label>
        {label}
        <input
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </label>
    </div>
  );
}

/**
 * Cost-per-task calculator. The arithmetic is exactly the pocket framework
 * from the source (05/09); the sliders are interface, not new expertise.
 */
export function TaskCostCalculator() {
  const [inp, setInp] = useState<CalcInputs>(calcDefaults);
  const set = (k: keyof CalcInputs) => (v: number) => setInp({ ...inp, [k]: v });

  const cost = calcCost(inp);
  const value = calcValue(inp);
  const ratio = cost.total > 0 ? value / cost.total : 0;

  const doubled = calcCost({ ...inp, hitlRatio: Math.min(1, inp.hitlRatio * 2) });
  const doubledRatio = doubled.total > 0 ? value / doubled.total : 0;

  const maxBar = Math.max(cost.total, value, 0.01);

  return (
    <div className="calc-grid">
      <div>
        <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-base)", fontWeight: 600 }}>
          Cost per task
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Num label="Model calls per task" value={inp.modelCalls} onChange={set("modelCalls")} />
          <Num label="Avg tokens per call (thousands)" value={inp.avgTokensK} onChange={set("avgTokensK")} />
          <Num label="Routed blended price ($/MTok)" value={inp.pricePerMTok} step={0.1} onChange={set("pricePerMTok")} />
          <Num label="Tool / infra cost per task ($)" value={inp.toolCost} step={0.01} onChange={set("toolCost")} />
          <Num label="Review minutes when reviewed" value={inp.reviewMinutes} onChange={set("reviewMinutes")} />
          <Num label="Loaded human rate ($/hr)" value={inp.humanRate} onChange={set("humanRate")} />
          <Num label="Amortised build + governance ($)" value={inp.amortised} step={0.05} onChange={set("amortised")} />
        </div>
        <div className="field">
          <label>
            Human-in-the-loop ratio: <strong>{Math.round(inp.hitlRatio * 100)}%</strong>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={inp.hitlRatio}
              onChange={(e) => set("hitlRatio")(Number(e.target.value))}
            />
          </label>
        </div>
        <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-base)", fontWeight: 600, marginTop: 20 }}>
          Value per task
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <Num label="Human labour cost of the task ($)" value={inp.labourCost} step={0.5} onChange={set("labourCost")} />
          <Num label="Cycle-time value per task ($)" value={inp.cycleValue} step={0.5} onChange={set("cycleValue")} />
          <Num label="Risk-reduction value per task ($)" value={inp.riskValue} step={0.5} onChange={set("riskValue")} />
        </div>
        <div className="field">
          <label>
            Quality-adjusted substitution rate: <strong>{Math.round(inp.substitution * 100)}%</strong>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={inp.substitution}
              onChange={(e) => set("substitution")(Number(e.target.value))}
            />
          </label>
        </div>
      </div>

      <div className="calc-readout">
        <div className="panel-white">
          <h4 style={{ fontFamily: "var(--font-ui)", fontSize: "var(--fs-base)", fontWeight: 600 }}>
            The verdict
          </h4>
          <div className="calc-bar-row">
            <span className="calc-bar-label">Tokens</span>
            <div className="calc-bar-track">
              <div className="calc-bar" style={{ width: `${(cost.tokens / maxBar) * 100}%`, background: "var(--l2)" }} />
            </div>
            <span style={{ width: 70, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
              ${cost.tokens.toFixed(2)}
            </span>
          </div>
          <div className="calc-bar-row">
            <span className="calc-bar-label">Human review (HITL)</span>
            <div className="calc-bar-track">
              <div className="calc-bar" style={{ width: `${(cost.hitl / maxBar) * 100}%`, background: "var(--l6)" }} />
            </div>
            <span style={{ width: 70, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
              ${cost.hitl.toFixed(2)}
            </span>
          </div>
          <div className="calc-bar-row">
            <span className="calc-bar-label">All-in cost per task</span>
            <div className="calc-bar-track">
              <div className="calc-bar" style={{ width: `${(cost.total / maxBar) * 100}%`, background: "var(--ink)" }} />
            </div>
            <span style={{ width: 70, textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
              ${cost.total.toFixed(2)}
            </span>
          </div>
          <div className="calc-bar-row">
            <span className="calc-bar-label">Value per task</span>
            <div className="calc-bar-track">
              <div className="calc-bar" style={{ width: `${(value / maxBar) * 100}%`, background: "var(--crimson)" }} />
            </div>
            <span style={{ width: 70, textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
              ${value.toFixed(2)}
            </span>
          </div>

          <div className="calc-verdict" style={{ color: ratio >= 3 ? "oklch(0.45 0.11 155)" : "var(--crimson-deep)" }}>
            Value / cost = {ratio.toFixed(1)}× {ratio >= 3 ? "— clears the 3× scale threshold" : "— below the 3× scale threshold"}
          </div>
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)", marginTop: 8 }}>
            Stress test — HITL ratio doubled: cost ${doubled.total.toFixed(2)}, ratio{" "}
            <strong>{doubledRatio.toFixed(1)}×</strong>
            {doubledRatio < 3 && ratio >= 3 ? " — the case no longer clears the bar. This is why the framework demands the doubled number." : "."}
          </p>
          <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: 0 }}>
            Source-backed: the formula and the value/cost &gt; 3× decision rule come from the decision
            framework and economics documents. The inputs are yours; the tool adds no assumptions of its
            own.
          </p>
          <div style={{ marginTop: 8 }}>
            <SourceLink ids={["05", "09"]} />
          </div>
        </div>
      </div>
    </div>
  );
}
