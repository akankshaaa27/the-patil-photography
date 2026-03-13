import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StoryModal from "../components/StoryModal";
import "./stories.css";

export default function Stories() {
  const [stories,       setStories]       = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [showModal,     setShowModal]     = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetch("/api/love-stories")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data))
          setStories(data.filter((s) => s.status === "Active"));
      })
      .catch((err) => console.error("Error fetching love stories:", err))
      .finally(() => setLoading(false));
  }, []);

  const openStory = (story) => {
    setSelectedStory({ ...story, subtitle: story.location, images: story.gallery || [] });
    setShowModal(true);
  };

  return (
    <>
      <Header />

      <main className="ps-main">

        {/* ══ HERO ═══════════════════════════════════════════ */}
        <section className="ps-hero">
          <div className="ps-hero-bg">
            <img src="/assets/img/HomePage/128.webp" alt="Love Stories" />
          </div>
          <div className="ps-hero-veil" />
          <div className="ps-hero-body">
            <span className="ps-eyebrow">Captured Forever</span>
            <h1 className="ps-hero-title">Love Stories</h1>
            <p className="ps-hero-sub">
              Real moments, genuine emotions — each one a world of its own.
            </p>
            <nav className="ps-breadcrumb">
              <Link to="/">Home</Link>
              <span className="ps-crumb-sep">✦</span>
              <span className="ps-crumb-cur">Stories</span>
            </nav>
          </div>

          {/* scattered ornamental petals */}
          <div className="ps-hero-orns" aria-hidden="true">
            {["✦","◎","✦","◈","✦"].map((o, i) => (
              <span key={i} className={`ps-orn ps-orn-${i}`}>{o}</span>
            ))}
          </div>
        </section>

        {/* ══ INTRO ══════════════════════════════════════════ */}
        <section className="ps-intro">
          <div className="ps-intro-inner">
            <span className="pp-tag">Moments That Become Forever</span>
            <h2 className="pp-section-title">
              Every Couple Has<br /><em>A Story Worth Telling</em>
            </h2>
            <p className="ps-intro-body">
              Beyond rituals and celebrations, we capture genuine emotions
              and meaningful moments — crafted into timeless love stories
              that you will return to, again and again.
            </p>
          </div>
        </section>

        {/* ══ STORIES GRID ═══════════════════════════════════ */}
        <section className="ps-stories-section">
          <div className="ps-container">

            {loading ? (
              <div className="ps-grid">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="ps-card-skel" />
                ))}
              </div>
            ) : stories.length === 0 ? (
              <p className="ps-empty">No stories found. Check back soon!</p>
            ) : (
              <div className="ps-grid">
                {stories.map((story, idx) => (
                  <article
                    key={story._id}
                    className="ps-card"
                    style={{ animationDelay: `${idx * 70}ms` }}
                    onClick={() => openStory(story)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && openStory(story)}
                    aria-label={`View story: ${story.title}`}
                  >
                    {/* thumbnail */}
                    <div className="ps-card-thumb">
                      <img src={story.thumbnail} alt={story.title} loading="lazy" />
                      <div className="ps-card-veil" />

                      {/* hover cta */}
                      <div className="ps-card-hover-cta" aria-hidden="true">
                        <span className="ps-play-ring">✦</span>
                        <span className="ps-open-label">View Story</span>
                      </div>

                      {/* location badge */}
                      {story.location && (
                        <span className="ps-loc-badge">{story.location}</span>
                      )}
                    </div>

                    {/* info */}
                    <div className="ps-card-info">
                      <h3 className="ps-card-title">{story.title}</h3>
                      {story.description && (
                        <p className="ps-card-desc">
                          {story.description.length > 90
                            ? story.description.slice(0, 90) + "…"
                            : story.description}
                        </p>
                      )}
                      <span className="ps-card-cta">View Story →</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ══ QUOTE BAND ═════════════════════════════════════ */}
        <section className="pp-quote-band">
          <div className="pp-quote-orn">✦</div>
          <blockquote className="pp-quote-text">
            "The best stories are the ones that leave you feeling something
            long after the last page."
          </blockquote>
          <div className="pp-quote-orn">✦</div>
        </section>

        {/* ══ CTA BANNER ═════════════════════════════════════ */}
        <section className="pp-cta-banner">
          <h2 className="pp-cta-title">Let's Write Your Story</h2>
          <p className="pp-cta-sub">
            Your love deserves to be preserved as beautifully as it is lived.
          </p>
          <Link to="/quote" className="pp-btn-primary">Book Your Date</Link>
        </section>

      </main>

      <Footer />

      <StoryModal
        show={showModal}
        onHide={() => setShowModal(false)}
        story={selectedStory}
      />
    </>
  );
}