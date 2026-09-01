import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "../lib/search";

const kindTagClass: Record<string, string> = {
  concept: "tag-crimson",
  layer: "tag-slate",
  archetype: "tag-neutral",
  failure: "tag-warn",
  question: "tag-neutral",
  level: "tag-ok",
  scenario: "tag-ok",
  source: "tag-neutral",
  tool: "tag-slate",
};

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [hot, setHot] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = search(query);

  useEffect(() => {
    if (open) {
      setQuery("");
      setHot(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setHot(0), [query]);

  if (!open) return null;

  function go(route: string) {
    onClose();
    navigate(route);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHot((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHot((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && results[hot]) {
      go(results[hot].route);
    }
  }

  return (
    <div
      className="palette-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="palette" role="dialog" aria-modal="true" aria-label="Search">
        <input
          ref={inputRef}
          className="palette-input"
          placeholder="Search concepts, layers, decisions, failure modes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Search query"
        />
        <div className="palette-results" role="listbox" aria-label="Search results">
          {query.trim() === "" ? (
            <div className="palette-empty">
              Try “RAG”, “lock-in”, “prompt injection”, “archetype”, “HITL ratio”…
            </div>
          ) : results.length === 0 ? (
            <div className="palette-empty">Nothing found for “{query}”.</div>
          ) : (
            results.map((r, i) => (
              <button
                key={`${r.kind}-${r.route}-${r.title}`}
                className={`palette-item${i === hot ? " hot" : ""}`}
                role="option"
                aria-selected={i === hot}
                onMouseEnter={() => setHot(i)}
                onClick={() => go(r.route)}
              >
                <span style={{ minWidth: 0 }}>
                  <span style={{ fontWeight: 500 }}>{r.title}</span>
                  <span className="pi-sub">{r.sub}</span>
                </span>
                <span className={`tag pi-kind ${kindTagClass[r.kind] ?? "tag-neutral"}`}>{r.kindLabel}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
