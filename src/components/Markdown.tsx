import { useMemo } from "react";
import { marked } from "marked";

/**
 * Renders one of the canonical source documents. Content is repository-owned
 * Markdown (not user input). Mermaid fences are replaced with a pointer to
 * the interactive equivalents (the Map and the Architecture Explorer).
 */
export function Markdown({ text }: { text: string }) {
  const html = useMemo(() => {
    const prepared = text.replace(
      /```mermaid[\s\S]*?```/g,
      () =>
        `<div class="md-diagram-note">This diagram from the source document is rendered interactively on this site — see <a href="#/map">the Enterprise AI Map</a> and <a href="#/architecture">the Architecture Explorer</a>. The original Mermaid definition remains in the Markdown file.</div>`
    );
    return marked.parse(prepared, { async: false }) as string;
  }, [text]);
  return <div className="md" dangerouslySetInnerHTML={{ __html: html }} />;
}
