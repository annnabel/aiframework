import { useState } from "react";
import { Link } from "react-router-dom";
import type { FailureMode } from "../content/types";
import { layerById } from "../content/layers";
import { MiniMap } from "./StackMap";
import { SourceLink } from "./SourceLink";

/**
 * One failure mode: situation → why → consequences → map location →
 * prevention, with progressive disclosure and the mini-map connection.
 */
export function FailureCard({ f }: { f: FailureMode }) {
  const [open, setOpen] = useState(false);
  const origin = layerById.get(f.originLayer)!;
  const visible = layerById.get(f.visibleLayer)!;
  const spansLayers = f.originLayer !== f.visibleLayer;

  return (
    <div id={f.id} className="panel-white" style={{ padding: 0, overflow: "hidden", scrollMarginTop: 80 }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          display: "flex",
          gap: 14,
          alignItems: "baseline",
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: "16px 20px",
          color: "var(--ink)",
        }}
      >
        <span
          aria-hidden
          style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-xl)", color: "var(--crimson-deep)", flexShrink: 0 }}
        >
          {f.num}
        </span>
        <span>
          <span style={{ fontWeight: 600 }}>{f.name}</span>
          <span style={{ display: "block", color: "var(--ink-3)", fontSize: "var(--fs-sm)" }}>{f.oneLiner}</span>
        </span>
        <span style={{ marginLeft: "auto", color: "var(--ink-3)" }}>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="rise with-minimap" style={{ borderTop: "1px solid var(--border)", padding: "18px 20px", gap: 24 }}>
          <div style={{ minWidth: 0 }}>
            <div className="detail-block">
              <h4>What it looks like</h4>
              <p>{f.looksLike}</p>
            </div>
            <div className="detail-block">
              <h4>The evidence</h4>
              <p>{f.evidence}</p>
            </div>
            <div className="detail-block">
              <h4>The smell test</h4>
              <p style={{ fontWeight: 500 }}>{f.smellTest}</p>
            </div>
            <div className="detail-block">
              <h4>Prevention</h4>
              <p>{f.mitigation}</p>
            </div>
            <SourceLink ids={f.sources} />
          </div>
          <div className="minimap-col">
            <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-2)", marginBottom: 8 }}>
              {spansLayers ? (
                <>
                  Starts in{" "}
                  <Link to={`/map?layer=${f.originLayer}`}>
                    Layer {origin.num} — {origin.name}
                  </Link>{" "}
                  but becomes visible in{" "}
                  <Link to={`/map?layer=${f.visibleLayer}`}>
                    Layer {visible.num} — {visible.name}
                  </Link>
                  .
                </>
              ) : (
                <>
                  Lives in{" "}
                  <Link to={`/map?layer=${f.originLayer}`}>
                    Layer {origin.num} — {origin.name}
                  </Link>
                  .
                </>
              )}
            </p>
            <MiniMap hot={spansLayers ? [f.originLayer, f.visibleLayer] : [f.originLayer]} />
          </div>
        </div>
      )}
    </div>
  );
}
