import { Link } from "react-router-dom";
import { conceptById } from "../content/concepts";
import { layerById } from "../content/layers";

/** Relationship chip linking to a concept, coloured by its home layer. */
export function ConceptChip({ id }: { id: string }) {
  const c = conceptById.get(id);
  if (!c) return null;
  const layer = layerById.get(c.layer);
  return (
    <Link to={`/concept/${c.id}`} className="chip" title={c.whatItIs}>
      <span className="chip-dot" style={{ background: layer?.color ?? "var(--ink-3)" }} aria-hidden />
      {c.term}
    </Link>
  );
}

export function ConceptChips({ ids }: { ids?: string[] }) {
  if (!ids?.length) return null;
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", gap: 6 }}>
      {ids.map((id) => (
        <ConceptChip key={id} id={id} />
      ))}
    </span>
  );
}
