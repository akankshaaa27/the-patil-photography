import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSettings } from "../hooks/useSettings";
import "./about.css";

const WHY_CHOOSE = [
  { icon: "bi-camera", title: "Timeless Storytelling", desc: "We believe your wedding is a once-in-a-lifetime story. Our approach blends cinematic vision with genuine emotions." },
  { icon: "bi-gem", title: "Luxury Aesthetic", desc: "From soft lighting to refined compositions, our style is elegant, graceful, and cinematic." },
  { icon: "bi-heart", title: "Emotion-Driven Expertise", desc: "The most beautiful moments are unspoken. We capture genuine emotions naturally and authentically." },
  { icon: "bi-stars", title: "Stress-Free Experience", desc: "From consultation to delivery, we ensure a smooth, professional journey you can trust." },
  { icon: "bi-people", title: "Tailored Stories", desc: "No two love stories are the same. Every wedding is customised to reflect your unique vision." },
  { icon: "bi-infinity", title: "Lasting Memories", desc: "Your wedding visuals are heirlooms — timeless, emotional, and crafted to last forever." },
];

export default function About() {
  const { settings } = useSettings();
  const businessName = settings?.businessName || "Photography";

  const [team, setTeam] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);

  useEffect(() => {
    document.body.className = "index-page";
    return () => { document.body.className = ""; };
  }, []);

  useEffect(() => {
    fetch("/api/team?publicOnly=true")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setTeam(d); })
      .catch(() => { })
      .finally(() => setTeamLoading(false));
  }, []);

  return (
    <>
      <Header />

      {/* ── PAGE TITLE ─────────────────────────────────────── */}
      <div
        className="ab-page-title"
        style={{ backgroundImage: "url('/assets/img/HomePage/16.webp')" }}
      >
        <div className="ab-page-title-inner">
          <p className="ab-page-eyebrow">Our Story</p>
          <h1 className="ab-page-heading">About Us</h1>
          <p className="ab-page-sub">Discover our story and passion for capturing life's beautiful moments</p>
          <nav className="ab-breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span>About Us</span>
          </nav>
        </div>
      </div>

      <main className="ab-main">

        {/* ── FOUNDER ────────────────────────────────────────── */}
        <section className="ab-founder">
          <div className="ab-founder-img-col">
            <img
              src="/assets/img/person/founder.jpg"
              alt={`Founder — ${businessName}`}
            />
            <div className="ab-founder-badge">
              <span className="ab-founder-name">Aakash Darme-Patil</span>
              <span className="ab-founder-role">Founder &amp; Lead Photographer</span>
              <span className="ab-founder-brand">{businessName}</span>
            </div>
          </div>

          <div className="ab-founder-text-col">
            <span className="ab-tag">The Artist Behind The Lens</span>
            <h2 className="ab-section-title">Meet Our<br /><em>Founder</em></h2>

            <p className="ab-body">
              At the heart of our venture is a visionary with a keen eye for detail and an
              unwavering passion for storytelling through the lens. With every click, the aim
              is not just to capture an image, but to freeze a moment in time — filled with
              emotion, love, joy, or quiet beauty.
            </p>
            <p className="ab-body">
              Founded with a simple yet powerful vision: to create timeless, artistic memories
              that last a lifetime. We turn life's most meaningful moments into beautifully
              captured stories that evoke emotion, preserve beauty, and exceed expectations.
            </p>
            <p className="ab-body">
              From our beginning, we've worked passionately, pouring heart and soul into every
              shoot. As artists, the pursuit of excellence and award-worthy work has been a
              driving force.
            </p>

            <Link to="/quote" className="ab-btn-primary">Book a Session</Link>
          </div>
        </section>

        {/* ── WHY CHOOSE US ──────────────────────────────────── */}
        <section className="ab-why">
          <div className="ab-why-inner">
            <div className="ab-section-head">
              <span className="ab-tag ab-tag--gold">Why Us</span>
              <h2 className="ab-section-title ab-section-title--light">Why Choose <em>{businessName}</em></h2>
              <p className="ab-section-sub">
                We craft timeless stories filled with emotion, elegance, and authenticity
              </p>
            </div>

            <div className="ab-why-grid">
              {WHY_CHOOSE.map((item, i) => (
                <div className="ab-why-card" key={i}>
                  <div className="ab-why-icon">
                    <i className={`bi ${item.icon}`} />
                  </div>
                  <h3 className="ab-why-title">{item.title}</h3>
                  <p className="ab-why-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM (only if data exists) ──────────────────────── */}
        {!teamLoading && team.length > 0 && (
          <section className="ab-team">
            <div className="ab-section-head">
              <span className="ab-tag">The People</span>
              <h2 className="ab-section-title">Meet The <em>Atelier</em></h2>
              <p className="ab-section-sub">
                A collective of storytellers, each handpicked for craft, discretion,
                and an eye for cinematic romance.
              </p>
            </div>

            <div className="ab-team-grid">
              {team.map((member, i) => (
                <div className="ab-team-card" key={member._id || i}>
                  <div className="ab-team-img">
                    <img
                      src={member.image || "/assets/img/logo.PNG"}
                      alt={member.name}
                    />
                  </div>
                  <div className="ab-team-info">
                    <strong className="ab-team-name">{member.name}</strong>
                    <span className="ab-team-role">{member.role}</span>
                    {member.bio && <p className="ab-team-bio">{member.bio}</p>}
                    <div className="ab-team-socials">
                      {member.socialLinks?.instagram && (
                        <a href={member.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                          <i className="bi bi-instagram" />
                        </a>
                      )}
                      {member.socialLinks?.facebook && (
                        <a href={member.socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                          <i className="bi bi-facebook" />
                        </a>
                      )}
                      {member.socialLinks?.website && (
                        <a href={member.socialLinks.website} target="_blank" rel="noreferrer" aria-label="Website">
                          <i className="bi bi-globe" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA BANNER ─────────────────────────────────────── */}
        <section className="ab-cta">
          <h2 className="ab-cta-title">Ready to Create Your Story?</h2>
          <p className="ab-cta-sub">Let's capture the moments that matter most to you.</p>
          <Link to="/quote" className="ab-btn-primary">Get a Quote</Link>
        </section>

      </main>

      <Footer />

      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short" />
      </a>
    </>
  );
}