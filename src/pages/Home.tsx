import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StackMap, MapSelection } from "../components/StackMap";
import { layerById } from "../content/layers";
import { SourceLink } from "../components/SourceLink";

export default function Home() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<MapSelection>(null);
  const previewLayer = preview && preview !== "crosscutting" ? layerById.get(preview) : null;

  return (
    <div>
      {/* Hero */}
      <section className="container" style={{ padding: "72px 24px 40px" }}>
        <div style={{ maxWidth: 780 }}>
          <h1 style={{ marginBottom: 18 }}>
            Enterprise AI is a stack.
            <br />
            <span style={{ color: "var(--crimson-deep)" }}>Learn the map, and everything else has somewhere to go.</span>
          </h1>
          <p className="lede">
            Silicon at the bottom, business outcomes at the top, and a governance plane across
            everything. Every product you'll be pitched, every budget line, every architecture debate
            lives somewhere on this map — and most confusion is someone selling three layers as one
            word.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <Link to="/learn" className="btn btn-accent">
              Start learning
            </Link>
            <Link to="/map" className="btn btn-ghost">
              Explore the map
            </Link>
          </div>
        </div>
      </section>

      {/* The map */}
      <section className="container" style={{ paddingBottom: 24 }}>
        <div className="map-grid">
          <div>
            <StackMap
              selected={preview}
              onSelect={(sel) => {
                if (sel === null) {
                  setPreview(null);
                } else if (preview === sel) {
                  navigate(sel === "crosscutting" ? "/map?layer=crosscutting" : `/map?layer=${sel}`);
                } else {
                  setPreview(sel);
                }
              }}
            />
            <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginTop: 12 }}>
              Click a layer to preview it; click again to open it on the full map.
            </p>
          </div>
          <div>
            {previewLayer ? (
              <div className="rise" key={previewLayer.id}>
                <span className="tag tag-neutral" style={{ marginBottom: 8, display: "inline-block" }}>
                  Layer {previewLayer.num}
                </span>
                <h3>{previewLayer.name}</h3>
                <p style={{ color: "var(--ink-2)" }}>{previewLayer.role}</p>
                <p
                  style={{
                    fontWeight: 500,
                    borderTop: "1px solid var(--border)",
                    paddingTop: 12,
                  }}
                >
                  {previewLayer.remember}
                </p>
                <Link to={`/map?layer=${previewLayer.id}`} className="btn btn-ghost btn-sm">
                  Open on the map →
                </Link>
              </div>
            ) : preview === "crosscutting" ? (
              <div className="rise">
                <h3>The cross-cutting concerns</h3>
                <p style={{ color: "var(--ink-2)" }}>
                  Regulation, security, evaluation, identity, cost and change management aren't layers —
                  they shape every layer. The control plane instruments the stack; these forces shape the
                  control plane itself.
                </p>
                <Link to="/map?layer=crosscutting" className="btn btn-ghost btn-sm">
                  See how they cut across →
                </Link>
              </div>
            ) : (
              <div>
                <h3 style={{ marginBottom: 14 }}>What is Enterprise AI?</h3>
                <p>
                  Not one technology — a system of seven decisions. Compute supplies the physics; models
                  supply the intelligence; serving delivers it; your data gives it something worth
                  knowing; orchestration turns it into software; the control plane makes it governable;
                  applications turn it into outcomes.
                </p>
                <p>
                  <strong>Value flows top-down</strong> — a business problem becomes tokens on silicon.{" "}
                  <strong>Constraints flow from the side</strong> — identity, policy, evaluation, cost —
                  and from outside: regulation and change management.
                </p>
                <p style={{ marginBottom: 0 }}>
                  The one sentence to hold:{" "}
                  <em>
                    models are becoming cheap and swappable; value comes from redesigned workflows on your
                    own data; risk lives at the tool call; and the durable assets are your evals, your
                    governance, and your exit options.
                  </em>
                </p>
                <div style={{ marginTop: 10 }}>
                  <SourceLink ids={["02", "00"]} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Three ways in */}
      <section className="container" style={{ paddingBottom: 20 }}>
        <h2>Three ways in</h2>
        <p className="lede" style={{ marginBottom: 28 }}>
          Nobody is forced down the same path. Pick the depth today calls for.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          <div className="panel-white">
            <span className="tag tag-crimson">5 minutes</span>
            <h4 style={{ marginTop: 12 }}>The night-before skim</h4>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>
              The one-page cheat sheet, the executive summary's ten things to remember, and the map at a
              glance.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "var(--fs-sm)" }}>
              <Link to="/sources/00">One-page cheat sheet →</Link>
              <Link to="/sources/01">Executive summary →</Link>
              <Link to="/map">The map →</Link>
            </div>
          </div>
          <div className="panel-white">
            <span className="tag tag-crimson">30 minutes</span>
            <h4 style={{ marginTop: 12 }}>The working understanding</h4>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>
              The mental model, the core concepts, one architecture walkthrough, and the five decision
              axes.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "var(--fs-sm)" }}>
              <Link to="/learn/mental-model">Level 1 — the mental model →</Link>
              <Link to="/architecture">Follow one request end to end →</Link>
              <Link to="/decisions">The decision tools →</Link>
            </div>
          </div>
          <div className="panel-white">
            <span className="tag tag-crimson">Deep</span>
            <h4 style={{ marginTop: 12 }}>The full journey</h4>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>
              Seven levels from map to mastery, with knowledge checks, scenario practice and every source
              document one click away.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "var(--fs-sm)" }}>
              <Link to="/learn">The learning journey →</Link>
              <Link to="/scenarios">Practise on scenarios →</Link>
              <Link to="/glossary">Explore all concepts →</Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* The numbers */}
      <section className="container" style={{ paddingBottom: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, 1fr) 2fr", gap: 32, alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: "var(--fs-xl)" }}>Why understanding beats adopting</h2>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-2)" }}>
              Adoption is near-universal; value is rare and concentrated. The difference isn't the
              technology — it's workflow redesign, governance ownership, and honest unit economics. That
              judgement is what this platform teaches.
            </p>
            <SourceLink ids={["09", "01"]} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            {[
              { n: "88%", d: "of organisations use AI in at least one function" },
              { n: "37%", d: "attribute any EBIT impact to it" },
              { n: "~6%", d: "are high performers capturing real value" },
              { n: "~21%", d: "actually redesign a workflow — the biggest EBIT driver" },
            ].map((s) => (
              <div key={s.n} className="panel" style={{ padding: "16px 18px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-2xl)", color: "var(--crimson-deep)" }}>
                  {s.n}
                </div>
                <div style={{ fontSize: "var(--fs-xs)", color: "var(--ink-2)" }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
