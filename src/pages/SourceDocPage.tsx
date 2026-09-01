import { Link, useParams } from "react-router-dom";
import { sourceById, sourceDocs } from "../content/levels";
import { sourceContent } from "../content/sources";
import { Markdown } from "../components/Markdown";
import type { SourceId } from "../content/types";

export default function SourceDocPage() {
  const { docId } = useParams();
  const doc = docId ? sourceById.get(docId as SourceId) : undefined;

  if (!doc) {
    return (
      <div className="container-narrow" style={{ padding: "80px 24px" }}>
        <h1>Document not found</h1>
        <p>
          <Link to="/sources">Back to source material</Link>
        </p>
      </div>
    );
  }

  const idx = sourceDocs.findIndex((d) => d.id === doc.id);
  const prev = idx > 0 ? sourceDocs[idx - 1] : null;
  const next = idx < sourceDocs.length - 1 ? sourceDocs[idx + 1] : null;

  return (
    <div className="container-narrow" style={{ padding: "48px 24px" }}>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <Link to="/sources" style={{ fontSize: "var(--fs-sm)", color: "var(--ink-3)" }}>
          ← All source documents
        </Link>
        <span style={{ fontSize: "var(--fs-xs)", color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>
          {doc.file}
        </span>
      </div>
      <Markdown text={sourceContent[doc.id]} />
      <nav
        aria-label="Document navigation"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 40,
          borderTop: "1px solid var(--border)",
          paddingTop: 20,
          flexWrap: "wrap",
        }}
      >
        {prev ? (
          <Link to={`/sources/${prev.id}`} style={{ fontSize: "var(--fs-sm)" }}>
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/sources/${next.id}`} style={{ fontSize: "var(--fs-sm)" }}>
            {next.title} →
          </Link>
        )}
      </nav>
    </div>
  );
}
