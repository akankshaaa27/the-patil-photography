import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StoryModal from "../components/StoryModal";
import TributeModal from "../components/TributeModal";
import LuxGallery from "../components/LuxGallery";
import { useSettings } from "../hooks/useSettings";
import "../styles/home.css";

/* ─── tiny helpers ─────────────────────────────────────────── */

function useCountUp(target, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const num = parseInt(target);
        if (isNaN(num)) { setVal(target); return; }
        let cur = 0;
        const step = num / (duration / 16);
        const id = setInterval(() => {
          cur += step;
          if (cur >= num) { setVal(target); clearInterval(id); }
          else setVal(Math.ceil(cur) + (String(target).includes("+") ? "+" : ""));
        }, 16);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return [val, ref];
}

function StatPill({ num, label, sub }) {
  const [val, ref] = useCountUp(num);
  return (
    <div ref={ref} className="stat-pill">
      <span className="stat-num">{val}</span>
      <span className="stat-label">{label}</span>
      <span className="stat-sub">{sub}</span>
    </div>
  );
}

function Stars({ n = 5 }) {
  return (
    <div className="stars-row">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="star">★</span>
      ))}
    </div>
  );
}

/* ─── component ────────────────────────────────────────────── */

export default function Home() {
  const { settings } = useSettings();
  const businessName = settings?.businessName || "Photography";

  /* data */
  const [slides, setSlides] = useState([]);
  const [stories, setStories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);

  /* ui */
  const [slideIdx, setSlideIdx] = useState(0);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTribute, setShowTribute] = useState(false);

  /* loading flags */
  const [ldSlider, setLdSlider] = useState(true);
  const [ldStories, setLdStories] = useState(true);
  const [ldTestimonials, setLdTestimonials] = useState(true);
  const [ldGallery, setLdGallery] = useState(true);

  /* overall page loading */
  const [pageLoading, setPageLoading] = useState(true);

  /* ── fetch ── */
  useEffect(() => {
    fetch("/api/slider")
      .then(r => r.json())
      .then(d => setSlides(Array.isArray(d) ? d.filter(s => s.status === "Active") : []))
      .catch(() => {})
      .finally(() => setLdSlider(false));

    fetch("/api/love-stories")
      .then(r => r.json())
      .then(d => setStories(Array.isArray(d) ? d.filter(s => s.status === "Active") : []))
      .catch(() => {})
      .finally(() => setLdStories(false));

    fetch("/api/testimonials?type=active")
      .then(r => r.json())
      .then(d => setTestimonials(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLdTestimonials(false));

    fetch("/api/gallery")
      .then(r => r.json())
      .then(d => {
        const active = Array.isArray(d) ? d.filter(i => i.status === "Active") : [];
        setGallery(active.slice(0, 12));
      })
      .catch(() => {})
      .finally(() => setLdGallery(false));

    /* tribute popup */
    if (!localStorage.getItem("popupClosed")) {
      const t = setTimeout(() => setShowTribute(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  /* check if all loading is complete */
  useEffect(() => {
    if (!ldSlider && !ldStories && !ldTestimonials && !ldGallery) {
      setPageLoading(false);
    }
  }, [ldSlider, ldStories, ldTestimonials, ldGallery]);

  /* ── auto slide ── */
  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setSlideIdx(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  /* ── helpers ── */
  const openStory = (story) => { setSelectedStory(story); setShowModal(true); };

  /* Extract image URLs for LuxGallery */
  const galleryImageUrls = gallery.map(item => item.image);

  const SERVICES = [
    { icon: "◉", title: "Wedding Photography", desc: "Full-day coverage from pre-ceremony to reception — every genuine emotion preserved." },
    { icon: "◈", title: "Cinematic Films", desc: "4K drone-assisted storytelling that makes your film feel like a feature release." },
    { icon: "◎", title: "Portrait Sessions", desc: "Editorial portraits in curated Maharashtra locations with professional direction." },
    { icon: "♥", title: "Engagement Shoots", desc: "Intimate pre-wedding sessions that are organic, warm, and entirely yours." },
    { icon: "⬡", title: "Albums & Prints", desc: "Museum-grade heirloom albums and canvas art crafted to last generations." },
    { icon: "✦", title: "Drone & Aerial", desc: "Licensed aerial coverage adding breathtaking grandeur to venues and ceremonies." },
  ];

  return (
    <>
      <Header />

      {/* Page Loading Overlay */}
      {pageLoading && (
        <div className="pp-page-loader">
          <div className="pp-loader-content">
            <div className="pp-loader-spinner"></div>
            <p className="pp-loader-text">Loading beautiful moments...</p>
          </div>
        </div>
      )}

      <TributeModal
        isOpen={showTribute}
        onClose={() => { setShowTribute(false); localStorage.setItem("popupClosed", "true"); }}
      />

      <main className="pp-main">

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="pp-hero">
          {!ldSlider && slides.length > 0 ? (
            slides.map((s, i) => (
              <div key={i} className={`pp-hero-bg ${i === slideIdx ? "active" : ""}`}>
                <img src={s.image} alt={s.title} />
              </div>
            ))
          ) : (
            <div className="pp-hero-bg active">
              <img src="/website/assets/img/HomePage/website_4.webp" alt="hero" />
            </div>
          )}

          <div className="pp-hero-veil" />

          <div className="pp-hero-body">
            <p className="pp-eyebrow">Wedding · Portrait · Cinema</p>
            <h1 className="pp-hero-title">
              {slides[slideIdx]?.title || "Pure Traditions,\nPure Emotions"}
            </h1>
            <p className="pp-hero-sub">
              {slides[slideIdx]?.subtitle || "Documenting your wedding rituals with perfection."}
            </p>
            <div className="pp-hero-ctas">
              <Link to="/quote" className="pp-btn-primary">Book Your Date</Link>
              <Link to="/portfolio" className="pp-btn-ghost">View Portfolio</Link>
            </div>
          </div>

          {slides.length > 1 && (
            <div className="pp-hero-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`pp-dot ${i === slideIdx ? "active" : ""}`}
                  onClick={() => setSlideIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* ══ STATS BAR ═════════════════════════════════════════ */}
        <section className="pp-stats-bar">
          <StatPill num="300+" label="Happy Couples" sub="Worldwide" />
          <div className="stat-divider" />
          <StatPill num="7+" label="Years Experience" sub="Industry Expert" />
          <div className="stat-divider" />
          <StatPill num="15+" label="Team Members" sub="Professionals" />
          <div className="stat-divider" />
          <StatPill num="24/7" label="Support" sub="Always Available" />
        </section>

        {/* ══ ABOUT ═════════════════════════════════════════════ */}
        <section className="pp-about">
          <div className="pp-about-img-col">
            <img src="/website/assets/img/HomePage/website_1.webp" alt="about" />
            <div className="pp-about-badge">
              <span className="badge-num">300+</span>
              <span className="badge-label">Happy Couples</span>
            </div>
          </div>

          <div className="pp-about-text-col">
            <span className="pp-tag">About Us</span>
            <h2 className="pp-section-title">Your Story,<br /><em>Our Passion</em></h2>
            <p className="pp-body-text">
              At <strong>{businessName}</strong>, we don't just capture moments — we tell your
              unique love story through stunning visuals and cinematic excellence.
            </p>
            <p className="pp-body-text">
              With over a decade of experience, our team has perfected preserving authentic
              emotions and beautiful details that make your wedding day truly unforgettable.
            </p>
            <ul className="pp-check-list">
              <li><span className="chk">✦</span> Authentic candid storytelling</li>
              <li><span className="chk">✦</span> State-of-the-art equipment</li>
              <li><span className="chk">✦</span> Personal, vision-led approach</li>
            </ul>
            <Link to="/quote" className="pp-btn-primary">Start Your Journey</Link>
          </div>
        </section>

        {/* ══ SERVICES ══════════════════════════════════════════ */}
        <section className="pp-services">
          <div className="pp-section-head">
            <span className="pp-tag">What We Offer</span>
            <h2 className="pp-section-title">Signature Services</h2>
            <p className="pp-section-sub">Premium photography & videography crafted to capture your unique story</p>
          </div>

          <div className="pp-services-grid">
            {SERVICES.map((s, i) => (
              <div className="pp-service-card" key={i}>
                <span className="svc-icon">{s.icon}</span>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ GALLERY — A Glimpse Into Our Craft ═══════════════ */}
        <section className="pp-gallery">
          <div className="pp-section-head pp-section-head--light">
            <span className="pp-tag pp-tag--gold">Our Portfolio</span>
            <h2 className="pp-section-title pp-section-title--light">
              A Glimpse Into Our Craft
            </h2>
          </div>

          {ldGallery ? (
            /* Skeleton matches pp-gal-grid 4-col layout */
            <div className="pp-gallery-skel-wrap">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`pp-gallery-skel${i === 0 || i === 4 ? " pp-gallery-skel--tall" : ""}`}
                />
              ))}
            </div>
          ) : galleryImageUrls.length > 0 ? (
            <>
              {/*
                LuxGallery handles:
                  • pp-gal-grid CSS grid (4-col → 3 → 2 responsive)
                  • pp-gal-item--tall visual rhythm
                  • Gold shine sweep + expand overlay on hover
                  • GLightbox init/destroy (scoped to galleryId)
              */}
              <LuxGallery
                images={galleryImageUrls}
                galleryId="home-craft"
              />
              <div className="pp-center-cta">
                <Link to="/portfolio" className="pp-btn-ghost pp-btn-ghost--light">
                  See More Projects
                </Link>
              </div>
            </>
          ) : (
            <p className="pp-empty">No portfolio images yet.</p>
          )}
        </section>

        {/* ══ QUOTE ═════════════════════════════════════════════ */}
        <section className="pp-quote-band">
          <div className="pp-quote-orn">✦</div>
          <blockquote className="pp-quote-text">
            "Love's journey is written in small moments — the smiles, the glances,
            the warmth — each deserving to be held forever."
          </blockquote>
          <div className="pp-quote-orn">✦</div>
        </section>

        {/* ══ LOVE STORIES ══════════════════════════════════════ */}
        <section className="pp-stories">
          <div className="pp-section-head">
            <span className="pp-tag">Captured Forever</span>
            <h2 className="pp-section-title">Our Latest<br /><em>Love Stories</em></h2>
          </div>

          {ldStories ? (
            <div className="pp-stories-grid">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="pp-story-skel" />
              ))}
            </div>
          ) : stories.length > 0 ? (
            <>
              <div className="pp-stories-grid">
                {stories.slice(0, 6).map((story) => (
                  <div
                    key={story._id}
                    className="pp-story-card"
                    onClick={() => openStory(story)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === "Enter" && openStory(story)}
                  >
                    <img src={story.thumbnail} alt={story.title} />
                    <div className="pp-story-veil" />
                    <div className="pp-story-info">
                      <span className="pp-story-loc">{story.location}</span>
                      <h3 className="pp-story-name">{story.title}</h3>
                      <span className="pp-story-cta">View Story →</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pp-center-cta">
                <Link to="/stories" className="pp-btn-primary">View All Stories</Link>
              </div>
            </>
          ) : (
            <p className="pp-empty">No stories yet. Check back soon!</p>
          )}
        </section>

        {/* ══ TESTIMONIALS ══════════════════════════════════════ */}
        <section className="pp-testimonials">
          <div className="pp-section-head">
            <span className="pp-tag">Kind Words</span>
            <h2 className="pp-section-title">From the Hearts<br /><em>of Our Couples</em></h2>
          </div>

          {ldTestimonials ? (
            <div className="pp-testi-grid">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="pp-testi-skel" />
              ))}
            </div>
          ) : testimonials.length > 0 ? (
            <>
              <div className="pp-testi-grid">
                {testimonials.slice(0, 6).map((t, i) => (
                  <div key={t._id || i} className="pp-testi-card">
                    <div className="pp-testi-quote">"</div>
                    <p className="pp-testi-text">"{t.fullDescription}"</p>
                    <Stars n={t.rating || 5} />
                    <div className="pp-testi-author">
                      <img
                        src={t.thumbnail || "https://placehold.co/80x80?text=♥"}
                        alt={t.coupleName}
                        className="pp-testi-avatar"
                      />
                      <div>
                        <strong className="pp-testi-name">{t.coupleName}</strong>
                        <span className="pp-testi-loc">{t.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pp-center-cta">
                <Link to="/reviews-feedback" className="pp-btn-outline">View All Reviews</Link>
              </div>
            </>
          ) : (
            <p className="pp-empty">Reviews coming soon!</p>
          )}
        </section>

        {/* ══ CTA BANNER ════════════════════════════════════════ */}
        <section className="pp-cta-banner">
          <h2 className="pp-cta-title">Ready to Create Magic?</h2>
          <p className="pp-cta-sub">Let's turn your fleeting moments into timeless memories.</p>
          <Link to="/quote" className="pp-btn-primary">Book Your Date</Link>
        </section>

        {/* ══ INSTAGRAM ═════════════════════════════════════════ */}
        <section className="pp-instagram">
          <div className="pp-section-head">
            <span className="pp-tag">Follow Along</span>
            <h2 className="pp-section-title">As Seen on Instagram</h2>
            <a
              href="https://www.instagram.com/thepatilphotography"
              target="_blank"
              rel="noreferrer"
              className="pp-insta-handle"
            >
              @thepatilphotography
            </a>
          </div>

          <div className="pp-insta-grid">
            {[
              "/assets/img/HomePage/7.webp",
              "/assets/img/HomePage/11.webp",
              "/assets/img/HomePage/16.webp",
              "/assets/img/HomePage/18.webp",
              "/assets/img/HomePage/128.webp",
              "/assets/img/HomePage/7.webp",
            ].map((src, i) => (
              <a
                key={i}
                href="https://www.instagram.com/thepatilphotography"
                target="_blank"
                rel="noreferrer"
                className="pp-insta-item"
              >
                <img src={src} alt="Instagram post" />
              </a>
            ))}
          </div>

          <div className="pp-center-cta">
            <a
              href="https://www.instagram.com/thepatilphotography"
              target="_blank"
              rel="noreferrer"
              className="pp-btn-outline"
            >
              Follow on Instagram
            </a>
          </div>
        </section>

      </main>

      <Footer />

      {/* Story modal */}
      <StoryModal
        show={showModal}
        onHide={() => setShowModal(false)}
        story={
          selectedStory
            ? { ...selectedStory, subtitle: selectedStory.location, images: selectedStory.gallery || [] }
            : null
        }
      />

      {/* Scroll-top */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short" />
      </a>
    </>
  );
}