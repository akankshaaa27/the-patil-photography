import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import "./films.css";

/* ─── helpers ──────────────────────────────────────────── */
const getYouTubeId = (url) => {
  if (!url) return "";
  const regExp =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
};

/* ─── component ────────────────────────────────────────── */
export default function Films() {
  const [films,          setFilms]          = useState([]);
  const [categories,     setCategories]     = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading,        setLoading]        = useState(true);
  const [lightboxUrl,    setLightboxUrl]    = useState(null);

  /* fetch */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filmsRes, typesRes] = await Promise.all([
          fetch("/api/films"),
          fetch("/api/event-types"),
        ]);
        const filmsData = await filmsRes.json();
        const typesData = await typesRes.json();

        const activeFilms = filmsData.filter((f) => f.status === "Active");
        setFilms(activeFilms);

        const usedCategories = new Set(activeFilms.map((f) => f.category));
        setCategories(
          typesData.filter((t) => t.isActive && usedCategories.has(t.name))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* close lightbox on Escape */
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && setLightboxUrl(null);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* lock body scroll when lightbox open */
  useEffect(() => {
    document.body.style.overflow = lightboxUrl ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxUrl]);

  const filteredFilms =
    activeCategory === "All"
      ? films
      : films.filter((f) => f.category === activeCategory);

  const tabs = [
    { id: "All", label: "All Films" },
    ...categories.map((c) => ({ id: c.name, label: c.label || c.name })),
  ];

  return (
    <>
      <Header />

      <main className="pf-main">

        {/* ══ HERO ═══════════════════════════════════════════ */}
        <PageHero
          eyebrow="Cinematic Storytelling"
          title="Our Films"
          subtitle="Every love story deserves to be felt, not just remembered."
          backgroundImage="/assets/img/HomePage/84.webp"
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Films' }
          ]}
          showOrnaments={false}
        />

        {/* ══ INTRO ══════════════════════════════════════════ */}
        <section className="pf-intro">
          <div className="pf-intro-inner">
            <span className="pp-tag">A Cinematic Journey</span>
            <h2 className="pp-section-title">
              Love Stories,<br /><em>Frame by Frame</em>
            </h2>
            <p className="pf-intro-body">
              Our cinematic films are crafted to capture the emotion, joy, and
              beauty of your wedding day — preserving every precious moment as a
              timeless work of art, to be relived for generations.
            </p>
          </div>
        </section>

        {/* ══ FILTER TABS ════════════════════════════════════ */}
        <section className="pf-films-section">
          <div className="pf-container">

            <div className="pf-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`pf-tab ${activeCategory === tab.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── GRID ── */}
            {loading ? (
              <div className="pf-grid">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="pf-card-skel" />
                ))}
              </div>
            ) : filteredFilms.length > 0 ? (
              <div className="pf-grid">
                {filteredFilms.map((film, idx) => {
                  const videoId = getYouTubeId(film.youtubeUrl);
                  if (!videoId) return null;
                  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

                  return (
                    <article
                      key={film._id}
                      className="pf-card"
                      style={{ animationDelay: `${idx * 60}ms` }}
                      onClick={() =>
                        setLightboxUrl(
                          `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                        )
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        setLightboxUrl(
                          `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                        )
                      }
                      aria-label={`Play ${film.title}`}
                    >
                      {/* thumbnail */}
                      <div className="pf-card-thumb">
                        <img src={thumb} alt={film.title} loading="lazy" />
                        <div className="pf-card-veil" />

                        {/* play button */}
                        <div className="pf-play-btn" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="6 3 20 12 6 21 6 3" />
                          </svg>
                        </div>

                        {/* category badge */}
                        <span className="pf-cat-badge">{film.category}</span>
                      </div>

                      {/* info */}
                      <div className="pf-card-info">
                        <h3 className="pf-card-title">{film.title}</h3>
                        <span className="pf-card-watch">Watch Film →</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="pf-empty">
                No films found{activeCategory !== "All" && ` for ${activeCategory}`}.
              </p>
            )}
          </div>
        </section>

        {/* ══ QUOTE BAND ═════════════════════════════════════ */}
        <section className="pp-quote-band">
          <div className="pp-quote-orn">✦</div>
          <blockquote className="pp-quote-text">
            "A film doesn't just record a wedding — it keeps alive the heartbeat
            of the day you said forever."
          </blockquote>
          <div className="pp-quote-orn">✦</div>
        </section>

        {/* ══ CTA BANNER ═════════════════════════════════════ */}
        <section className="pp-cta-banner">
          <h2 className="pp-cta-title">Want a Film Like This?</h2>
          <p className="pp-cta-sub">
            Let's craft a cinematic story that is entirely, beautifully yours.
          </p>
          <Link to="/quote" className="pp-btn-primary">Book Your Date</Link>
        </section>

      </main>

      <Footer />

      {/* ══ LIGHTBOX ═══════════════════════════════════════ */}
      {lightboxUrl && (
        <div
          className="pf-lightbox"
          onClick={(e) => e.target === e.currentTarget && setLightboxUrl(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Film player"
        >
          <button
            className="pf-lb-close"
            onClick={() => setLightboxUrl(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <div className="pf-lb-frame">
            <iframe
              src={lightboxUrl}
              title="Film"
              allow="autoplay; fullscreen"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </>
  );
}