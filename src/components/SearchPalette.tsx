import { useEffect, useMemo, useRef, useState } from "react";
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
  const paletteRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  const results = useMemo(() => search(query), [query]);

  useEffect(() => {
    if (open) {
      restoreRef.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setHot(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
        restoreRef.current?.focus?.();
      };
    }
  }, [open]);

  useEffect(() => setHot(0), [query]);

  // keep the active option visible while arrowing through results
  useEffect(() => {
    if (!open) return;
    document.getElementById(`palette-opt-${hot}`)?.scrollIntoView({ block: "nearest" });
  }, [hot, open]);

  if (!open) return null;

  function go(route: string) {
    onClose();
    navigate(route);
  }

  function onDialogKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "Tab") {
      // single-field dialog: keep focus on the input
      e.preventDefault();
      inputRef.current?.focus();
    }
  }

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
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
      onKeyDown={onDialogKeyDown}
    >
      <div ref={paletteRef} className="palette" role="dialog" aria-modal="true" aria-label="Search">
        <input
          ref={inputRef}
          className="palette-input"
          placeholder="Search concepts, layers, decisions, failure modes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onInputKeyDown}
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="palette-results"
          aria-activedescendant={results.length > 0 ? `palette-opt-${hot}` : undefined}
          aria-autocomplete="list"
          aria-label="Search query"
        />
        <div className="palette-results" id="palette-results" role="listbox" aria-label="Search results">
          {query.trim() === "" ? (
            <div className="palette-empty">
              Try “RAG”, “lock-in”, “prompt injection”, “archetype”, “HITL ratio”…
            </div>
          ) : results.length === 0 ? (
            <div className="palette-empty" role="status">Nothing found for “{query}”.</div>
          ) : (
            results.map((r, i) => (
              <button
                key={`${r.kind}-${r.route}-${r.title}`}
                id={`palette-opt-${i}`}
                className={`palette-item${i === hot ? " hot" : ""}`}
                role="option"
                aria-selected={i === hot}
                tabIndex={-1}
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
