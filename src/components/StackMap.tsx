import { stackOrder, crossCutting } from "../content/layers";
import type { LayerId } from "../content/types";

export type MapSelection = LayerId | "crosscutting" | null;

/**
 * The seven-layer stack, drawn as bands with the control plane as an
 * orthogonal plane beside layers 3–7 (it instruments them) and the
 * cross-cutting concerns beneath. The map is the navigation system.
 */
export function StackMap({
  selected,
  onSelect,
  highlight,
}: {
  selected: MapSelection;
  onSelect: (sel: MapSelection) => void;
  /** when set, non-highlighted layers dim (walkthrough / failure views) */
  highlight?: LayerId[];
}) {
  const strata = stackOrder.filter((l) => l.id !== "control");
  const control = stackOrder.find((l) => l.id === "control")!;

  const bandClass = (id: LayerId) => {
    const cls = ["layer-band"];
    if (selected === id) cls.push("selected");
    if (highlight && !highlight.includes(id)) cls.push("dimmed");
    return cls.join(" ");
  };

  return (
    <div>
      <div className="stackmap" role="group" aria-label="The seven-layer Enterprise AI stack">
        <div className="stackmap-layers">
          {strata.map((l) => (
            <button
              key={l.id}
              className={bandClass(l.id)}
              style={{ ["--layer-color" as string]: l.color }}
              onClick={() => onSelect(selected === l.id ? null : l.id)}
              aria-pressed={selected === l.id}
            >
              <span className="layer-swatch" aria-hidden />
              <span className="layer-num" aria-hidden>{l.num}</span>
              <span style={{ minWidth: 0 }}>
                <span className="layer-name">{l.name}</span>
                <span className="layer-short" style={{ display: "block" }}>{l.short}</span>
              </span>
            </button>
          ))}
        </div>
        <button
          className={`stackmap-plane${selected === "control" ? " selected" : ""}${
            highlight && !highlight.includes("control") ? " dimmed" : ""
          }`}
          onClick={() => onSelect(selected === "control" ? null : "control")}
          aria-pressed={selected === "control"}
          title="The control plane instruments every layer"
        >
          <span>6 · {control.name}</span>
          <span className="plane-sub">instruments every layer</span>
        </button>
      </div>
      <div className="crosscut-row">
        <span className="crosscut-label">Cross-cutting:</span>
        {crossCutting.map((c) => (
          <button
            key={c.id}
            className="chip"
            style={
              selected === "crosscutting"
                ? { borderColor: "var(--crimson)", color: "var(--crimson-deep)" }
                : undefined
            }
            onClick={() => onSelect(selected === "crosscutting" ? null : "crosscutting")}
            title={c.remember}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Small orientation map: highlights a set of layers, links nowhere. */
export function MiniMap({ hot }: { hot: LayerId[] }) {
  return (
    <div className="minimap" aria-label={`Layers involved: ${hot.join(", ")}`}>
      {stackOrder.map((l) => (
        <div
          key={l.id}
          className={`minimap-row${hot.includes(l.id) ? " hot" : ""}`}
          style={{ ["--layer-color" as string]: l.color }}
        >
          <span className="minimap-bar" aria-hidden />
          <span>
            {l.num} · {l.id === "control" ? "Control Plane" : l.name}
          </span>
        </div>
      ))}
    </div>
  );
}
