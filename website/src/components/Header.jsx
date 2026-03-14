import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSettings } from "../hooks/useSettings";
import "./header.css";

const NAV_LINKS = [
  { to: "/",                label: "Home" },
  { to: "/about",           label: "About Us" },
  { to: "/portfolio",       label: "Portfolio" },
  { to: "/stories",         label: "Stories" },
  { to: "/films",           label: "Films" },
  { to: "/reviews-feedback",label: "Reviews" },
  { to: "/contact",         label: "Contact" },
];

export default function Header() {
  const { settings }    = useSettings();
  const location        = useLocation();
  const isHome          = location.pathname === "/";

  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  /* scroll detection */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mobile nav on route change */
  useEffect(() => { setMobileOpen(false); }, [location]);

  /* body lock when mobile open */
  useEffect(() => {
    document.body.classList.toggle("mobile-nav-active", mobileOpen);
  }, [mobileOpen]);

  const solid = !isHome || scrolled;

  return (
    <header className={`hd-root ${solid ? "hd-solid" : ""} ${mobileOpen ? "hd-mobile-open" : ""}`}>
      <div className="hd-inner">

        {/* ── LOGO ── */}
        <Link to="/" className="hd-logo" onClick={() => setMobileOpen(false)}>
          {settings?.primaryLogo ? (
            <img src={settings.primaryLogo} alt={settings?.businessName || "Logo"} />
          ) : (
            <img src="/assets/img/logo.PNG" alt="Logo" />
          )}
        </Link>

        {/* ── DESKTOP NAV ── */}
        <nav className="hd-nav">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`hd-link ${location.pathname === to ? "hd-link--active" : ""}`}
            >
              {label}
            </Link>
          ))}
          <Link to="/quote" className="hd-book-btn">Book Us</Link>
        </nav>

        {/* ── MOBILE TOGGLE ── */}
        <button
          className="hd-toggle"
          onClick={() => setMobileOpen(p => !p)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`hd-burger ${mobileOpen ? "hd-burger--open" : ""}`}>
            <span /><span /><span />
          </span>
        </button>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <div className={`hd-drawer ${mobileOpen ? "hd-drawer--open" : ""}`}>
        <nav className="hd-drawer-nav">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`hd-drawer-link ${location.pathname === to ? "hd-drawer-link--active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/quote"
            className="hd-book-btn hd-book-btn--drawer"
            onClick={() => setMobileOpen(false)}
          >
            Book Us
          </Link>
        </nav>
      </div>

      {/* backdrop */}
      {mobileOpen && (
        <div className="hd-backdrop" onClick={() => setMobileOpen(false)} />
      )}
    </header>
  );
}