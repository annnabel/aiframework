import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { StackMap, MapSelection } from "../components/StackMap";
import { layers, layerById, crossCutting, stackOrder } from "../content/layers";
import { failureModes } from "../content/failures";
import { ConceptChips } from "../components/ConceptChip";
import { SourceLink } from "../components/SourceLink";
import { progress } from "../lib/progress";
import type { LayerId } from "../content/types";

// Dependencies read off the stack: value flows downward through the strata;
// the control plane instruments 3–7 (06 master map).
const strataOrder: LayerId[] = ["apps", "build", "data", "serving", "models", "compute"];

function neighbours(id: LayerId): { dependsOn: LayerId[]; dependedBy: LayerId[] } {
  if (id === "control") return { dependsOn: [], dependedBy: ["apps", "build", "data", "serving"] };
  const i = strataOrder.indexOf(id);
  return {
    dependsOn: i < strataOrder.length - 1 ? [strataOrder[i + 1]] : [],
    dependedBy: i > 0 ? [strataOrder[i - 1]] : [],
  };
}

export default function MapPage() {
  const [params, setParams] = useSearchParams();
  const selected = (params.get("layer") as MapSelection) ?? null;

  useEffect(() => {
    progress.visitArea("map");
  }, []);

  function select(sel: MapSelection) {
    if (sel) setParams({ layer: sel }, { replace: false });
    else setParams({}, { replace: false });
  }

  const layer = selected && selected !== "crosscutting" ? layerById.get(selected) : null;

  return (
    <div className="container" style={{ padding: "48px 24px 0" }}>
      <div style={{ maxWidth: 720, marginBottom: 32 }}>
        <h1>The Enterprise AI Map</h1>
        <p className="lede">
          Seven layers, one governance plane, six forces from outside. Click any layer to see what it
          does, what lives there, what it depends on — and what can go wrong.
        </p>
      </div>

      <div className="map-grid">
        <div style={{ position: "sticky", top: 76, alignSelf: "start" }}>
          <StackMap selected={selected} onSelect={select} />
        </div>

        <div className="map-detail">
          {!selected && <MapIntro />}
          {selected === "crosscutting" && <CrossCuttingDetail />}
          {layer && <LayerDetail key={layer.id} layerId={layer.id} />}
        </div>
      </div>
      <div style={{ height: 40 }} />
    </div>
  );
}

function MapIntro() {
  return (
    <div>
      <h3>How to read the map</h3>
      <p>
        <strong>Value flows top-down:</strong> a business problem enters at Applications and becomes
        tokens on silicon at Compute. <strong>Constraints flow from the side:</strong> the Control Plane
        instruments layers 3–7 with identity, policy, evaluation, observability and cost governance.{" "}
        <strong>And everything is shaped from outside</strong> by regulation, security, change management
        and the operating model.
      </p>
      <p>
        The layers are where <em>decisions</em> get made — even though vendors deliberately bundle across
        them. Three honest caveats that separate a real 2026 mental model from a 2024 slide:
      </p>
      <ul>
        <li>
          <strong>Layers 2 and 3 fuse for most buyers.</strong> If you consume models via API, models and
          serving arrive as one product.
        </li>
        <li>
          <strong>Layer 6 is a plane, not a stratum.</strong> It instruments every layer.
        </li>
        <li>
          <strong>Vendors collapse layers on purpose.</strong> Hyperscalers span 1–6; Microsoft spans 2–7;
          the layers describe <em>your decisions</em>, not their org charts.
        </li>
      </ul>
      <div className="panel" style={{ marginTop: 20 }}>
        <strong>The three questions this map lets you ask:</strong>
        <ol style={{ marginTop: 8, marginBottom: 0 }}>
          <li>Which layer does this product actually live in, and which layers does it annex?</li>
          <li>At which layer are we differentiated? (Almost always 4 and 7. Almost never 1–3.)</li>
          <li>Where is our enforcement point, and who controls it?</li>
        </ol>
      </div>
      <div style={{ marginTop: 14 }}>
        <SourceLink ids={["02", "06"]} />
      </div>
    </div>
  );
}

function CrossCuttingDetail() {
  return (
    <div className="rise">
      <span className="tag tag-slate" style={{ marginBottom: 10, display: "inline-block" }}>
        Outside the stack, shaping all of it
      </span>
      <h3>The cross-cutting concerns</h3>
      <p style={{ color: "var(--ink-2)" }}>
        These aren't layers because no single layer contains them — each one connects several layers, and
        each has one thing worth remembering.
      </p>
      <div className="table-wrap" style={{ marginTop: 16 }}>
        <table className="data">
          <thead>
            <tr>
              <th>Concern</th>
              <th>Why it cuts across</th>
              <th>The one thing to remember</th>
            </tr>
          </thead>
          <tbody>
            {crossCutting.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{c.name}</td>
                <td>{c.why}</td>
                <td>{c.remember}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 14 }}>
        <SourceLink ids={["02"]} />
      </div>
    </div>
  );
}

export function LayerDetail({ layerId, compact }: { layerId: LayerId; compact?: boolean }) {
  const layer = layerById.get(layerId)!;
  const { dependsOn, dependedBy } = neighbours(layerId);
  const fails = failureModes.filter((f) => f.originLayer === layerId);

  return (
    <div className="rise">
      <span
        className="tag"
        style={{ background: "color-mix(in oklch, var(--bg) 82%, " + layer.color + ")", color: layer.color, marginBottom: 10, display: "inline-block" }}
      >
        Layer {layer.num}
      </span>
      <h3>{layer.name}</h3>

      <div className="detail-block">
        <h4>What it does</h4>
        <p>{layer.role}</p>
      </div>
      <div className="detail-block">
        <h4>Why it exists</h4>
        <p>{layer.why}</p>
      </div>
      {!compact && (
        <div className="detail-block">
          <h4>State of play — September 2026</h4>
          <p>{layer.state}</p>
        </div>
      )}

      <div className="detail-block">
        <h4>Dependencies</h4>
        <div className="dep-row">
          <div className="dep-box">
            <div className="dep-title">Runs on / depends on</div>
            {dependsOn.length === 0 ? (
              <span style={{ color: "var(--ink-3)" }}>
                {layerId === "control" ? "Instruments the stack rather than sitting in it" : "The physical floor of the stack"}
              </span>
            ) : (
              dependsOn.map((d) => {
                const l = layerById.get(d)!;
                return (
                  <Link key={d} to={`/map?layer=${d}`} style={{ display: "block" }}>
                    ↓ Layer {l.num} — {l.name}
                  </Link>
                );
              })
            )}
          </div>
          <div className="dep-box">
            <div className="dep-title">Feeds / governed by it</div>
            {dependedBy.map((d) => {
              const l = layerById.get(d)!;
              return (
                <Link key={d} to={`/map?layer=${d}`} style={{ display: "block" }}>
                  ↑ Layer {l.num} — {l.name}
                </Link>
              );
            })}
            {layerId !== "control" && (
              <Link to="/map?layer=control" style={{ display: "block", color: "var(--l6)" }}>
                ⊕ Instrumented by the Control Plane
              </Link>
            )}
          </div>
        </div>
      </div>

      {layer.concepts.length > 0 && (
        <div className="detail-block">
          <h4>Concepts that live here</h4>
          <ConceptChips ids={layer.concepts} />
        </div>
      )}

      <div className="detail-block">
        <h4>Decisions made at this layer</h4>
        <ul>
          {layer.decisions.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>

      <div className="detail-block">
        <h4>Standardised vs lock-in</h4>
        <div className="dep-row">
          <div className="dep-box">
            <div className="dep-title">Already commodity</div>
            {layer.standardised}
          </div>
          <div className="dep-box">
            <div className="dep-title">Where lock-in lives</div>
            {layer.lockIn}
          </div>
        </div>
      </div>

      <div className="detail-block">
        <h4>Commonly misunderstood</h4>
        <ul>
          {layer.misconceptions.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>

      {fails.length > 0 && (
        <div className="detail-block">
          <h4>Failure modes that start here</h4>
          {fails.map((f) => (
            <p key={f.id} style={{ marginBottom: 6 }}>
              <Link to={`/learn/failure-modes#${f.id}`}>{f.name}</Link>{" "}
              <span style={{ color: "var(--ink-3)", fontSize: "var(--fs-xs)" }}>— {f.oneLiner}</span>
            </p>
          ))}
        </div>
      )}

      <div className="panel" style={{ background: "var(--crimson-tint)", borderColor: "var(--crimson-tint-2)" }}>
        <strong>Remember:</strong> {layer.remember}
      </div>

      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <SourceLink ids={layer.sources} />
        <span style={{ display: "flex", gap: 12, fontSize: "var(--fs-sm)" }}>
          {(() => {
            const strata = stackOrder.map((l) => l.id);
            const i = strata.indexOf(layerId);
            const prev = i > 0 ? layers.find((l) => l.id === strata[i - 1]) : null;
            const next = i < strata.length - 1 ? layers.find((l) => l.id === strata[i + 1]) : null;
            return (
              <>
                {prev && <Link to={`/map?layer=${prev.id}`}>← {prev.name}</Link>}
                {next && <Link to={`/map?layer=${next.id}`}>{next.name} →</Link>}
              </>
            );
          })()}
        </span>
      </div>
    </div>
  );
}
