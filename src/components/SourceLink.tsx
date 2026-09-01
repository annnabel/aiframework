import { Link } from "react-router-dom";
import type { SourceId } from "../content/types";
import { sourceById } from "../content/levels";

/** The subtle traceability affordance: "Based on <doc> →". */
export function SourceLink({ ids, label = "Based on" }: { ids: SourceId[]; label?: string }) {
  const docs = ids.map((id) => sourceById.get(id)).filter(Boolean);
  if (!docs.length) return null;
  return (
    <span className="source-link">
      {label}{" "}
      {docs.map((d, i) => (
        <span key={d!.id}>
          {i > 0 && " · "}
          <Link to={`/sources/${d!.id}`}>{d!.title}</Link>
        </span>
      ))}
    </span>
  );
}
