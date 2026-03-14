import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSettings } from "../hooks/useSettings";
import "./contact.css";

/* ═══════════════════════════════════════════════════════════
   THE PATIL PHOTOGRAPHY — CONTACT PAGE
   Matches dark luxury editorial design system
═══════════════════════════════════════════════════════════ */

const INFO_CARDS = (settings) => [
  {
    icon: "◎",
    label: "Location",
    lines: [settings?.address || "Maharashtra, India"],
  },
  {
    icon: "✉",
    label: "Email",
    lines: [settings?.contactEmail].filter(Boolean),
  },
  {
    icon: "☏",
    label: "Call",
    lines: [
      settings?.primaryMobileNumber,
      settings?.secondaryMobileNumber,
    ].filter(Boolean),
  },
  {
    icon: "◷",
    label: "Open Hours",
    lines: ["Available 24 / 7"],
  },
];

export default function Contact() {
  const { settings } = useSettings();

  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [status, setStatus]       = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({
          type: "success",
          message: "✦ Thank you for reaching out — we'll respond shortly.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus({ type: "", message: "" }), 5000);
      } else {
        setStatus({ type: "error", message: "✗ Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ type: "error", message: "✗ Connection error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <div className="pp-main">

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="cnt-hero">
          <div className="cnt-hero-bg">
            <img src="/assets/img/HomePage/16.webp" alt="Contact hero" />
          </div>
          <div className="cnt-hero-veil" />
          <div className="cnt-hero-body">
            <span className="cnt-eyebrow">Let's Connect</span>
            <h1 className="cnt-hero-title">Get in Touch</h1>
            <p className="cnt-hero-sub">
              We'd love to hear your story — reach out and let's create something beautiful together.
            </p>
            <nav aria-label="Breadcrumb">
              <ol className="cnt-breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li className="sep">›</li>
                <li className="current">Contact</li>
              </ol>
            </nav>
          </div>
        </section>

        {/* ══ CONTACT BODY ══════════════════════════════════════ */}
        <section className="cnt-section">
          <div className="cnt-inner">

            {/* ── Info column ── */}
            <aside className="cnt-info-col">
              <span className="pp-tag">Reach Us</span>
              <h2 className="cnt-info-title">
                Always <em>Here</em> for You
              </h2>
              <p className="cnt-info-desc">
                Whether you're planning a wedding, a portrait session, or simply want to say hello — we're just a message away.
              </p>

              <div className="cnt-cards">
                {INFO_CARDS(settings).map((card, i) => (
                  <div className="cnt-card" key={i}>
                    <span className="cnt-card-icon">{card.icon}</span>
                    <div className="cnt-card-body">
                      <span className="cnt-card-label">{card.label}</span>
                      {card.lines.map((line, j) => (
                        <span className="cnt-card-val" key={j}>{line}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social strip */}
              <div className="cnt-social">
                <span className="cnt-social-label">Follow Along</span>
                <a
                  href="https://www.instagram.com/thepatilphotography"
                  target="_blank"
                  rel="noreferrer"
                  className="cnt-social-link"
                >
                  @thepatilphotography
                </a>
              </div>
            </aside>

            {/* ── Form column ── */}
            <div className="cnt-form-col">

              {/* Status banner */}
              {status.message && (
                <div className={`cnt-status cnt-status--${status.type}`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="cnt-form" noValidate>

                <div className="cnt-form-row">
                  <div className="cnt-field">
                    <label className="cnt-label" htmlFor="cnt-name">Your Name</label>
                    <input
                      id="cnt-name"
                      type="text"
                      name="name"
                      className="cnt-input"
                      placeholder="Priya & Rahul"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="cnt-field">
                    <label className="cnt-label" htmlFor="cnt-email">Email Address</label>
                    <input
                      id="cnt-email"
                      type="email"
                      name="email"
                      className="cnt-input"
                      placeholder="hello@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="cnt-field">
                  <label className="cnt-label" htmlFor="cnt-subject">Subject</label>
                  <input
                    id="cnt-subject"
                    type="text"
                    name="subject"
                    className="cnt-input"
                    placeholder="Wedding Photography Inquiry"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="cnt-field">
                  <label className="cnt-label" htmlFor="cnt-message">Your Message</label>
                  <textarea
                    id="cnt-message"
                    name="message"
                    className="cnt-input cnt-textarea"
                    placeholder="Tell us about your special day — venue, date, style, or anything on your mind…"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="cnt-form-footer">
                  <button
                    type="submit"
                    className="pp-btn-primary cnt-submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="cnt-spinner-wrap">
                        <span className="cnt-spinner" />
                        Sending…
                      </span>
                    ) : (
                      "Send Message ✦"
                    )}
                  </button>
                  <p className="cnt-privacy">
                    We respect your privacy and will never share your details.
                  </p>
                </div>

              </form>
            </div>

          </div>
        </section>

        {/* ══ QUOTE BAND ════════════════════════════════════════ */}
        <section className="pp-quote-band">
          <div className="pp-quote-orn">✦</div>
          <blockquote className="pp-quote-text">
            "Every love story is beautiful — let us tell yours."
          </blockquote>
          <div className="pp-quote-orn">✦</div>
        </section>

      </div>

      <Footer />

   
    </>
  );
}