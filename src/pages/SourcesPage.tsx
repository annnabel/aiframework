import { Link } from "react-router-dom";
import { sourceDocs } from "../content/levels";

export default function SourcesPage() {
  return (
    <div className="container-narrow" style={{ padding: "48px 24px" }}>
      <h1>Source material</h1>
      <p className="lede">
        The fifteen research documents this platform is built from — the single source of truth. Every
        learning module links back here; nothing on the site goes beyond what these documents say.
      </p>
      <p style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)" }}>
        Method: nine specialist research workstreams verified against primary sources on 1 September
        2026. Every load-bearing claim is dated and sourced; unverified claims are flagged.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 24 }}>
        {sourceDocs.map((d) => (
          <Link
            key={d.id}
            to={`/sources/${d.id}`}
            className="panel-white panel-link"
            style={{ display: "flex", gap: 16, alignItems: "baseline", color: "var(--ink)", padding: "13px 18px" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-sm)", color: "var(--ink-3)", flexShrink: 0 }}>
              {d.id}
            </span>
            <span style={{ minWidth: 0 }}>
              <span style={{ fontWeight: 600, fontSize: "var(--fs-sm)" }}>{d.title}</span>
              <span style={{ display: "block", fontSize: "var(--fs-xs)", color: "var(--ink-2)" }}>{d.gives}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
