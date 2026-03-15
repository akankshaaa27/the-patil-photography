import React from "react";
import { Link } from "react-router-dom";
import "./PageHero.css";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  backgroundAlt,
  breadcrumbs = [],
  children,
  showOrnaments = true,
  className = "",
}) {
  return (
    <section className={`page-hero ${className}`}>
      <div className="page-hero-bg">
        <img src={backgroundImage} alt={backgroundAlt || title || "Hero background"} />
      </div>
      <div className="page-hero-veil" />

      <div className="page-hero-body">
        {eyebrow && <span className="page-hero-eyebrow">{eyebrow}</span>}
        {title && <h1 className="page-hero-title">{title}</h1>}
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}

        {breadcrumbs.length > 0 && (
          <nav className="page-hero-breadcrumb" aria-label="breadcrumb">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={`${crumb.label}-${idx}`}>
                {idx > 0 && <span className="page-hero-crumb-sep">✦</span>}
                {crumb.to ? (
                  <Link to={crumb.to}>{crumb.label}</Link>
                ) : (
                  <span className="page-hero-crumb-current">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {children}
      </div>

      {showOrnaments && (
        <div className="page-hero-orns" aria-hidden="true">
          {["✦", "◎", "✦", "◈", "✦"].map((o, i) => (
            <span key={i} className={`page-orn page-orn-${i}`}>
              {o}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
