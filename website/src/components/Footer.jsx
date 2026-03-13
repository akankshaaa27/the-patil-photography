import React from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../hooks/useSettings";
import "./footer.css";

const ICON_MAP = {
  WhatsApp:  "bi-whatsapp",
  Instagram: "bi-instagram",
  Facebook:  "bi-facebook",
  YouTube:   "bi-youtube",
  Twitter:   "bi-twitter-x",
  LinkedIn:  "bi-linkedin",
};

const NAV_COL_1 = [
  { to: "/",         label: "Home" },
  { to: "/about",    label: "About Us" },
  { to: "/portfolio",label: "Portfolio" },
  { to: "/stories",  label: "Stories" },
];
const NAV_COL_2 = [
  { to: "/films",             label: "Films" },
  { to: "/reviews-feedback",  label: "Reviews" },
  { to: "/contact",           label: "Contact Us" },
  { to: "/quote",             label: "Book Us" },
];

export default function Footer() {
  const { settings } = useSettings();

  const businessName = settings?.businessName || "Photography";
  const logoUrl      = settings?. primaryLogo|| settings?.secondaryLogo;
  const activeLinks  = settings?.socialLinks?.filter(l => l.active) ?? [];
  const year         = new Date().getFullYear();

  return (
    <footer className="ft-root">

      {/* ── MAIN BODY ── */}
      <div className="ft-body">
        <div className="ft-inner">

          {/* Brand col */}
          <div className="ft-brand">
            <Link to="/" className="ft-logo">
              {logoUrl ? (
                <img src={logoUrl} alt={businessName} />
              ) : (
                <img src="/assets/img/logo.PNG" alt={businessName} />
              )}
            </Link>
            <p className="ft-tagline">Preserving Pure Emotion<br />in Every Frame.</p>

            {/* Contact */}
            <div className="ft-contact">
              {settings?.primaryMobileNumber && (
                <a href={`tel:${settings.primaryMobileNumber}`} className="ft-contact-row">
                  <i className="bi bi-telephone" />
                  <span>{settings.primaryMobileNumber}</span>
                </a>
              )}
              {settings?.contactEmail && (
                <a href={`mailto:${settings.contactEmail}`} className="ft-contact-row">
                  <i className="bi bi-envelope" />
                  <span>{settings.contactEmail}</span>
                </a>
              )}
            </div>

            {/* Socials */}
            <div className="ft-socials">
              {activeLinks.length > 0
                ? activeLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className="ft-social-icon"
                    >
                      <i className={`bi ${ICON_MAP[link.platform] ?? "bi-link-45deg"}`} />
                    </a>
                  ))
                : (
                  <>
                    <a href="#" aria-label="Facebook"  className="ft-social-icon"><i className="bi bi-facebook" /></a>
                    <a href="#" aria-label="Instagram" className="ft-social-icon"><i className="bi bi-instagram" /></a>
                  </>
                )
              }
            </div>
          </div>

          {/* Nav col 1 */}
          <div className="ft-nav-col">
            <h4 className="ft-col-title">Explore</h4>
            <ul className="ft-nav-list">
              {NAV_COL_1.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="ft-nav-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav col 2 */}
          <div className="ft-nav-col">
            <h4 className="ft-col-title">More</h4>
            <ul className="ft-nav-list">
              {NAV_COL_2.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="ft-nav-link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA col */}
          <div className="ft-cta-col">
            <h4 className="ft-col-title">Ready to Begin?</h4>
            <p className="ft-cta-text">
              Let's create timeless memories together. Reach out and let's talk about your story.
            </p>
            <Link to="/quote" className="ft-cta-btn">Book a Session</Link>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="ft-bottom">
        <div className="ft-bottom-inner">
          <p className="ft-copy">© {year} {businessName}. All rights reserved.</p>
          <p className="ft-credit">Crafted with passion for love stories.</p>
        </div>
      </div>

    </footer>
  );
}