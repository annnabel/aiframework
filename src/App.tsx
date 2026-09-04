import { Suspense, lazy, useEffect, useState } from "react";
import { NavLink, Link, Route, Routes, useLocation } from "react-router-dom";
import { SearchPalette } from "./components/SearchPalette";

const Home = lazy(() => import("./pages/Home"));
const MapPage = lazy(() => import("./pages/MapPage"));
const Learn = lazy(() => import("./pages/Learn"));
const LevelPage = lazy(() => import("./pages/LevelPage"));
const Architecture = lazy(() => import("./pages/Architecture"));
const DecisionsPage = lazy(() => import("./pages/Decisions"));
const ScenariosPage = lazy(() => import("./pages/Scenarios"));
const ScenarioPage = lazy(() => import("./pages/ScenarioPage"));
const Glossary = lazy(() => import("./pages/Glossary"));
const ConceptPage = lazy(() => import("./pages/ConceptPage"));
const ProgressPage = lazy(() => import("./pages/ProgressPage"));
const SourcesPage = lazy(() => import("./pages/SourcesPage"));
const SourceDocPage = lazy(() => import("./pages/SourceDocPage"));

const NAV = [
  { to: "/learn", label: "Learn" },
  { to: "/map", label: "The Map" },
  { to: "/architecture", label: "Architecture" },
  { to: "/decisions", label: "Decisions" },
  { to: "/scenarios", label: "Scenarios" },
  { to: "/glossary", label: "Glossary" },
  { to: "/progress", label: "Progress" },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // move screen-reader/keyboard context to the new page's content
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="shell">
      <ScrollToTop />
      <a
        href="#main"
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
          zIndex: 600,
          background: "var(--bg)",
          padding: "8px 14px",
        }}
        onFocus={(e) => (e.currentTarget.style.left = "8px")}
        onBlur={(e) => (e.currentTarget.style.left = "-9999px")}
      >
        Skip to content
      </a>
      <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="brand">
            <span className="brand-mark" aria-hidden>
              <svg width="12" height="12" viewBox="0 0 12 12">
                <rect x="1" y="1" width="10" height="1.8" rx="0.9" fill="#e8e5e3" />
                <rect x="1" y="4" width="10" height="1.8" rx="0.9" fill="#c94f43" />
                <rect x="1" y="7" width="10" height="1.8" rx="0.9" fill="#a8a29e" />
              </svg>
            </span>
            <span>Enterprise AI Framework</span>
          </Link>
          <nav className="nav" aria-label="Primary">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? "active" : "")}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="topbar-actions">
            <button
              className="search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label={`Search (${isMac ? "Cmd" : "Ctrl"}+K)`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="search-label">Search</span>
              <kbd aria-hidden>{isMac ? "⌘K" : "Ctrl K"}</kbd>
            </button>
          </div>
        </div>
      </header>

      <main className="main" id="main" tabIndex={-1} style={{ outline: "none" }}>
        <Suspense
          fallback={
            <div className="container" style={{ padding: "80px 24px", color: "var(--ink-3)" }}>
              Loading…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/:levelId" element={<LevelPage />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/decisions" element={<DecisionsPage />} />
            <Route path="/scenarios" element={<ScenariosPage />} />
            <Route path="/scenarios/:scenarioId" element={<ScenarioPage />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/concept/:conceptId" element={<ConceptPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/sources" element={<SourcesPage />} />
            <Route path="/sources/:docId" element={<SourceDocPage />} />
            <Route
              path="*"
              element={
                <div className="container-narrow" style={{ padding: "80px 24px" }}>
                  <h1>Page not found</h1>
                  <p>
                    That route doesn't exist. Start from <Link to="/">the big picture</Link> or{" "}
                    <Link to="/map">explore the map</Link>.
                  </p>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>

      <footer className="footer">
        <div className="container">
          <span>
            Enterprise AI Framework — built from the Enterprise AI 2026 research package. Current as of
            1 September 2026.
          </span>
          <span>
            <Link to="/sources">Source material</Link> · <Link to="/sources/13">Source register</Link> ·{" "}
            <Link to="/sources/00">Executive cheat sheet</Link>
          </span>
        </div>
      </footer>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
