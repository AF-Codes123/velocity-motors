
import { useEffect, useState } from "react";
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import "./App.css";
import "./extra.css";
import { wa } from "./cars";
import { Home, Collection, CarDetail, Experience, Contact } from "./pages";

const links = [
  ["Home", "/"],
  ["Collection", "/collection"],
  ["Experience", "/experience"],
  ["Contact", "/contact"],
];

const Logo = ({ cls = "" }) => (
  <Link to="/" className={`brand ${cls}`}>
    <span className="brand-symbol">V<span>M</span></span>
    <span className="brand-copy"><strong>VELOCITY</strong><small>M O T O R S</small></span>
  </Link>
);

export default function App() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1300); return () => clearTimeout(t); }, []);

  // cursor glow + scroll progress
  useEffect(() => {
    const glow = document.querySelector(".cursor-glow");
    const mv = (e) => glow && (glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`);
    const sc = () => {
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100);
    };
    window.addEventListener("mousemove", mv);
    window.addEventListener("scroll", sc, { passive: true });
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("scroll", sc); };
  }, []);

  // new page: scroll top + re-run reveal animations
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenu(false);
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    const t = setTimeout(() => document.querySelectorAll(".reveal:not(.revealed)").forEach((el) => io.observe(el)), 60);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [pathname]);

  return (
    <div className="site-shell">
      <div className={loading ? "loader" : "loader done"}>
        <div className="loader-logo">V<span>M</span></div>
        <div className="loader-bar"><i /></div>
      </div>
      <div className="progress" style={{ width: `${progress}%` }} />
      <div className="cursor-glow" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="top-strip">
        <span>CURATED AUTOMOTIVE EXCELLENCE</span>
        <span className="top-strip-right"><span className="status-dot" /> YOUR NEXT DRIVE STARTS HERE</span>
      </div>

      <header className="navbar">
        <Logo />
        <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">
          {menu ? "✕" : "☰"}
        </button>
        <nav className={menu ? "nav-links nav-open" : "nav-links"}>
          {links.map(([n, to]) => (
            <NavLink key={n} to={to} end={to === "/"} className={({ isActive }) => (isActive ? "active-link" : "")}>
              {n}
            </NavLink>
          ))}
          <a className="nav-cta" href={wa("Hello! I would like to enquire about your cars.")} target="_blank" rel="noreferrer">
            Enquire <span>↗</span>
          </a>
        </nav>
      </header>

      <main key={pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:id" element={<CarDetail />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="footer">
        <Logo cls="footer-brand" />
        <p>THE ART OF FINDING YOUR NEXT DRIVE.</p>
        <span className="footer-copy">© {new Date().getFullYear()} VELOCITY MOTORS</span>
      </footer>

      <a className="whatsapp-float" href={wa("Hello! I would like to enquire about a car.")} target="_blank" rel="noreferrer">
        <span>◉</span><span className="whatsapp-label">LET'S TALK</span>
      </a>
    </div>
  );
}