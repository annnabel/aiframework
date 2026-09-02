import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { conceptById, unlockedBy, categoryLabels, concepts } from "../content/concepts";
import { layerById } from "../content/layers";
import { comparePairs } from "../content/compare";
import { ConceptChips } from "../components/ConceptChip";
import { MiniMap } from "../components/StackMap";
import { SourceLink } from "../components/SourceLink";
import { progress } from "../lib/progress";

export default function ConceptPage() {
  const { conceptId } = useParams();
  const c = conceptId ? conceptById.get(conceptId) : undefined;

  useEffect(() => {
    if (c) progress.viewConcept(c.id);
  }, [c?.id]);

  if (!c) {
    return (
      <div className="container-narrow" style={{ padding: "80px 24px" }}>
        <h1>Concept not found</h1>
        <p>
          <Link to="/glossary">Back to all concepts</Link>
        </p>
      </div>
    );
  }

  const layer = layerById.get(c.layer)!;
  const unlocks = [
    ...new Set([...(c.unlocks ?? []), ...unlockedBy(c.id).map((x) => x.id)]),
  ].filter((id) => conceptById.has(id));
  const relatedCompare = comparePairs.find((p) => p.conceptIds.includes(c.id));

  return (
    <div className="container-narrow" style={{ padding: "48px 24px" }}>
      <div style={{ marginBottom: 8 }}>
        <Link to="/glossary" style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)" }}>
          ← All concepts
        </Link>
      </div>

      <div className="with-minimap" style={{ gap: 32 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
            <span className="tag tag-neutral">{categoryLabels[c.category]}</span>
            <span className="tag tag-neutral">{c.difficulty}</span>
            {c.jargon && <span className="tag tag-warn">⚑ jargon — low strategic importance</span>}
          </div>
          <h1 style={{ fontSize: "var(--fs-2xl)" }}>{c.term}</h1>

          <div className="detail-block">
            <h4>What it is</h4>
            <p style={{ fontSize: "var(--fs-base)" }}>{c.whatItIs}</p>
          </div>

          <div className="detail-block">
            <h4>The decision it affects</h4>
            <p style={{ fontSize: "var(--fs-base)", fontWeight: 500, color: "var(--crimson-deep)" }}>{c.decision}</p>
          </div>

          {c.whyItExists && (
            <div className="detail-block">
              <h4>Why it exists</h4>
              <p>{c.whyItExists}</p>
            </div>
          )}

          <div className="detail-block">
            <h4>Where it fits</h4>
            <p style={{ fontSize: "var(--fs-sm)" }}>
              Lives at{" "}
              <Link to={`/map?layer=${layer.id}`}>
                Layer {layer.num} — {layer.name}
              </Link>
              {" — "}
              {layer.role.charAt(0).toLowerCase() + layer.role.slice(1)}
            </p>
          </div>

          {c.example && (
            <div className="detail-block">
              <h4>In practice</h4>
              <p style={{ fontSize: "var(--fs-sm)" }}>{c.example}</p>
            </div>
          )}

          {c.statusNote && (
            <div className="detail-block">
              <h4>Status in 2026</h4>
              <p style={{ fontSize: "var(--fs-sm)" }}>{c.statusNote}</p>
            </div>
          )}

          {c.prerequisites && c.prerequisites.length > 0 && (
            <div className="detail-block">
              <h4>Understand these first</h4>
              <ConceptChips ids={c.prerequisites} />
            </div>
          )}

          {unlocks.length > 0 && (
            <div className="detail-block">
              <h4>Becomes easier once you know this</h4>
              <ConceptChips ids={unlocks} />
            </div>
          )}

          {c.related && c.related.length > 0 && (
            <div className="detail-block">
              <h4>Related</h4>
              <ConceptChips ids={c.related.filter((id) => conceptById.has(id))} />
            </div>
          )}

          {c.confusedWith && c.confusedWith.length > 0 && (
            <div className="detail-block">
              <h4>Commonly confused with</h4>
              <ConceptChips ids={c.confusedWith.filter((id) => conceptById.has(id))} />
              {relatedCompare && (
                <p style={{ fontSize: "var(--fs-sm)", marginTop: 8 }}>
                  See the side-by-side: <Link to="/learn/building-blocks">“{relatedCompare.title}” in Level 2 →</Link>
                </p>
              )}
            </div>
          )}

          {c.takeaway && (
            <div className="panel" style={{ background: "var(--crimson-tint)", borderColor: "var(--crimson-tint-2)" }}>
              <strong>Key takeaway:</strong> {c.takeaway}
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <SourceLink ids={c.sources} />
          </div>
        </div>

        <div className="minimap-col">
          <p style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", marginBottom: 8 }}>On the map</p>
          <MiniMap hot={[c.layer]} />
        </div>
      </div>

      <NextConcepts current={c.id} />
    </div>
  );
}

function NextConcepts({ current }: { current: string }) {
  const c = conceptById.get(current)!;
  const siblings = concepts
    .filter((x) => x.category === c.category && x.id !== current)
    .slice(0, 4);
  if (!siblings.length) return null;
  return (
    <div style={{ marginTop: 40, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
      <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)", marginBottom: 8 }}>
        More in {categoryLabels[c.category]}:
      </p>
      <ConceptChips ids={siblings.map((s) => s.id)} />
    </div>
  );
}
