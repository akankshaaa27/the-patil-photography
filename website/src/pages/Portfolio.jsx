import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./portfolio.css";
/* ═══════════════════════════════════════════════════════════
   PORTFOLIO PAGE — matching Home page design system
   Palette: Ink #0d0b09 · Cream #f5f0e8 · Gold #c9974a
   Fonts: DM Serif Display · Outfit
═══════════════════════════════════════════════════════════ */

/* ── Inline styles using the same design tokens ── */
const S = {
  page: {
    fontFamily: "'Outfit', system-ui, sans-serif",
    background: "var(--cream-2, #faf7f2)",
    color: "var(--body, #6b5a48)",
    overflowX: "hidden",
  },

  /* HERO */
  hero: {
    position: "relative",
    height: "62vh",
    minHeight: 420,
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
  },
  heroBgImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "scale(1.06)",
    animation: "pp-kb 18s ease-in-out alternate infinite",
  },
  heroVeil: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(13,11,9,0.93) 0%, rgba(13,11,9,0.5) 50%, rgba(13,11,9,0.18) 100%)",
    zIndex: 1,
  },
  heroBody: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 clamp(24px,5vw,72px) clamp(48px,7vh,80px)",
    animation: "pp-fade 1.1s cubic-bezier(.2,.8,.2,1) both",
  },
  eyebrow: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.68rem",
    fontWeight: 600,
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    color: "var(--gold, #c9974a)",
    marginBottom: 16,
    display: "block",
  },
  heroTitle: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "clamp(2.8rem,6vw,5.5rem)",
    fontWeight: 400,
    color: "var(--cream, #f5f0e8)",
    lineHeight: 1.05,
    margin: "0 0 18px",
  },
  heroSub: {
    fontSize: "clamp(0.95rem,1.4vw,1.1rem)",
    color: "rgba(245,240,232,0.6)",
    fontStyle: "italic",
    margin: "0 0 28px",
    maxWidth: 480,
    lineHeight: 1.75,
  },
  breadcrumb: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    fontSize: "0.78rem",
    letterSpacing: "0.06em",
  },
  breadcrumbLink: {
    color: "rgba(245,240,232,0.5)",
    textDecoration: "none",
    transition: "color 0.3s",
  },
  breadcrumbSep: { color: "rgba(201,151,74,0.5)" },
  breadcrumbCurrent: { color: "var(--gold, #c9974a)", fontWeight: 600 },

  /* INTRO */
  intro: {
    background: "var(--ink, #0d0b09)",
    padding: "clamp(56px,7vw,88px) clamp(24px,5vw,72px)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  introOrn: { color: "var(--gold, #c9974a)", fontSize: "1rem", opacity: 0.6 },
  introTitle: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "clamp(1.9rem,3.5vw,2.8rem)",
    fontWeight: 400,
    color: "var(--cream, #f5f0e8)",
    margin: 0,
    lineHeight: 1.2,
  },
  introTitleEm: { fontStyle: "italic", color: "var(--gold, #c9974a)" },
  introDesc: {
    fontSize: "0.98rem",
    lineHeight: 1.9,
    color: "rgba(245,240,232,0.5)",
    maxWidth: 640,
    margin: 0,
  },

  /* FILTER TABS */
  filterWrap: {
    background: "var(--ink-2, #1a1410)",
    borderBottom: "1px solid rgba(201,151,74,0.12)",
    padding: "0 clamp(24px,5vw,72px)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  filterInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    gap: 0,
    overflowX: "auto",
    scrollbarWidth: "none",
    padding: "0 0 0 0",
  },
  filterBtn: (active) => ({
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    background: "transparent",
    border: "none",
    borderBottom: active ? "2px solid var(--gold, #c9974a)" : "2px solid transparent",
    color: active ? "var(--gold, #c9974a)" : "rgba(245,240,232,0.45)",
    padding: "20px 28px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "color 0.3s, border-color 0.3s",
    flexShrink: 0,
  }),

  /* GALLERY SECTION */
  gallerySection: {
    background: "var(--ink, #0d0b09)",
    padding: "clamp(48px,6vw,80px) clamp(24px,5vw,72px)",
  },
  galleryGrid: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },

  /* Gallery item */
  galleryItem: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 12,
    cursor: "pointer",
    display: "block",
    background: "var(--ink-3, #2a2018)",
  },
  galleryItemTall: { gridRow: "span 2" },
  galleryImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.6s ease",
  },
  galleryOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(13,11,9,0.7) 0%, transparent 60%)",
    opacity: 0,
    transition: "opacity 0.4s ease",
    display: "flex",
    alignItems: "flex-end",
    padding: "20px 18px",
  },
  galleryOverlayIcon: {
    color: "var(--gold, #c9974a)",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },

  /* Skeleton */
  skel: {
    background: "linear-gradient(90deg,#1a1410 25%,#2a2018 50%,#1a1410 75%)",
    backgroundSize: "200% 100%",
    animation: "pp-skel 1.5s ease-in-out infinite",
    borderRadius: 12,
    aspectRatio: "4/3",
  },
  skelTall: { gridRow: "span 2", aspectRatio: "unset", minHeight: 360 },

  /* Empty */
  empty: {
    textAlign: "center",
    color: "rgba(245,240,232,0.3)",
    padding: "80px 0",
    fontSize: "0.95rem",
    maxWidth: 1200,
    margin: "0 auto",
  },

  /* CTA */
  ctaBanner: {
    background:
      "linear-gradient(rgba(13,11,9,0.78), rgba(13,11,9,0.78)), url('/assets/img/slider/webbg.webp') center/cover fixed",
    padding: "clamp(72px,9vw,110px) clamp(24px,5vw,72px)",
    textAlign: "center",
  },
  ctaTitle: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "clamp(2rem,4vw,3.2rem)",
    fontWeight: 400,
    color: "var(--cream, #f5f0e8)",
    margin: "0 0 14px",
  },
  ctaSub: {
    fontSize: "1.05rem",
    color: "rgba(245,240,232,0.55)",
    margin: "0 0 38px",
    fontStyle: "italic",
  },

  tag: {
    display: "inline-block",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.68rem",
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "var(--gold, #c9974a)",
    marginBottom: 14,
  },
};

/* ── Gallery Item with hover effect ── */
function GalleryItem({ src, alt, tall, index }) {
  const [hovered, setHovered] = useState(false);

  const isTall = tall || index === 0 || index === 6 || index === 11;

  return (
    <a
      href={src}
      className="glightbox"
      data-gallery="portfolio-gallery"
      style={{
        ...S.galleryItem,
        ...(isTall ? S.galleryItemTall : {}),
        aspectRatio: isTall ? "unset" : "4/3",
        minHeight: isTall ? 340 : "unset",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt || `Portfolio ${index + 1}`}
        style={{
          ...S.galleryImg,
          transform: hovered ? "scale(1.07)" : "scale(1)",
          aspectRatio: isTall ? "unset" : "4/3",
          height: isTall ? "100%" : "auto",
        }}
        loading="lazy"
      />
      <div
        style={{
          ...S.galleryOverlay,
          opacity: hovered ? 1 : 0,
        }}
      >
        <span style={S.galleryOverlayIcon}>View ↗</span>
      </div>
    </a>
  );
}

/* ── Skeleton grid ── */
function SkeletonGrid() {
  return (
    <div style={S.galleryGrid}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          style={{
            ...S.skel,
            ...(i === 0 || i === 6 ? S.skelTall : {}),
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
const Portfolio = () => {
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const lightboxRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [galleryRes, typesRes] = await Promise.all([
          fetch("/api/gallery"),
          fetch("/api/event-types"),
        ]);
        const galleryData = await galleryRes.json();
        const typesData = await typesRes.json();
        const activeItems = galleryData.filter((item) => item.status === "Active");
        setPortfolioImages(activeItems);
        const usedCategories = new Set(activeItems.map((item) => item.category));
        setCategories(typesData.filter((t) => t.isActive && usedCategories.has(t.name)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredImages =
    activeCategory === "All"
      ? portfolioImages
      : portfolioImages.filter((img) => img.category === activeCategory);

  /* Reinitialise GLightbox on filter change */
  useEffect(() => {
    if (!filteredImages.length || !window.GLightbox) return;
    if (lightboxRef.current) {
      lightboxRef.current.destroy();
      lightboxRef.current = null;
    }
    lightboxRef.current = window.GLightbox({
      selector: ".glightbox",
      loop: true,
      touchNavigation: true,
      keyboardNavigation: true,
      zoomable: true,
    });
    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
        lightboxRef.current = null;
      }
    };
  }, [filteredImages]);

  const tabs = [
    { id: "All", label: "All" },
    ...categories.map((cat) => ({ id: cat.name, label: cat.label || cat.name })),
  ];

  return (
    <>
      <Header />

      <div className="pp-main" style={S.page}>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section style={S.hero}>
          <div style={S.heroBg}>
            <img
              src="/assets/img/HomePage/11.webp"
              alt="Portfolio hero"
              style={S.heroBgImg}
            />
          </div>
          <div style={S.heroVeil} />
          <div style={S.heroBody}>
            <span style={S.eyebrow}>Wedding · Portrait · Cinema</span>
            <h1 style={S.heroTitle}>Our Portfolio</h1>
            <p style={S.heroSub}>
              Timeless frames and cinematic stories, crafted with intention.
            </p>
            <nav style={S.breadcrumb}>
              <Link
                to="/"
                style={S.breadcrumbLink}
                onMouseEnter={(e) => (e.target.style.color = "var(--gold, #c9974a)")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(245,240,232,0.5)")}
              >
                Home
              </Link>
              <span style={S.breadcrumbSep}>›</span>
              <span style={S.breadcrumbCurrent}>Portfolio</span>
            </nav>
          </div>
        </section>

        {/* ══ INTRO BAND ════════════════════════════════════════ */}
        <section style={S.intro}>
          <div style={S.introOrn}>✦</div>
          <span style={S.tag}>Our Craft</span>
          <h2 style={S.introTitle}>
            Experience Our <em style={S.introTitleEm}>Art</em>
          </h2>
          <p style={S.introDesc}>
            With an unwavering passion for storytelling and a keen eye for detail,
            we've curated a portfolio that beautifully embodies our creative vision.
            Each moment preserved with elegance and soul — spanning diverse cultures,
            stunning destinations, and unique traditions.
          </p>
          <div style={S.introOrn}>✦</div>
        </section>

        {/* ══ STICKY FILTER TABS ════════════════════════════════ */}
        <div style={S.filterWrap}>
          <div style={S.filterInner}>
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 90,
                      height: 10,
                      margin: "24px 28px",
                      borderRadius: 4,
                      background: "rgba(201,151,74,0.1)",
                      animation: "pp-skel 1.5s ease-in-out infinite",
                      flexShrink: 0,
                    }}
                  />
                ))
              : tabs.map((tab) => (
                  <button
                    key={tab.id}
                    style={S.filterBtn(activeCategory === tab.id)}
                    onClick={() => setActiveCategory(tab.id)}
                    onMouseEnter={(e) => {
                      if (activeCategory !== tab.id)
                        e.target.style.color = "rgba(245,240,232,0.75)";
                    }}
                    onMouseLeave={(e) => {
                      if (activeCategory !== tab.id)
                        e.target.style.color = "rgba(245,240,232,0.45)";
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
          </div>
        </div>

        {/* ══ GALLERY GRID ══════════════════════════════════════ */}
        <section style={S.gallerySection}>
          {loading ? (
            <SkeletonGrid />
          ) : filteredImages.length > 0 ? (
            <>
              <div style={S.galleryGrid}>
                {filteredImages.map((item, i) => (
                  <GalleryItem
                    key={item._id || i}
                    src={item.image}
                    alt={item.title}
                    index={i}
                  />
                ))}
              </div>
            </>
          ) : (
            <p style={S.empty}>
              No images found{activeCategory !== "All" && ` for ${activeCategory}`}.
            </p>
          )}
        </section>

        {/* ══ CTA BANNER ════════════════════════════════════════ */}
        <section style={S.ctaBanner}>
          <h2 style={S.ctaTitle}>Ready to Create Your Story?</h2>
          <p style={S.ctaSub}>Let's turn your fleeting moments into timeless memories.</p>
          <Link to="/quote" className="pp-btn-primary">Book Your Date</Link>
        </section>

      </div>

      <Footer />

      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
    </>
  );
};

export default Portfolio;

