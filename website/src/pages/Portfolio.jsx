import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LuxGallery from "../components/LuxGallery";
import TabsFilter from "../components/TabsFilter";
import Skeleton from "../components/Skeleton";

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
          fetch("/api/event-types")
        ]);

        const galleryData = await galleryRes.json();
        const typesData = await typesRes.json();

        const activeItems = galleryData.filter((item) => item.status === "Active");
        setPortfolioImages(activeItems);

        // Filter types to only show those that have images
        const usedCategories = new Set(activeItems.map(item => item.category));
        setCategories(typesData.filter(t => t.isActive && usedCategories.has(t.name)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredImages = activeCategory === "All"
    ? portfolioImages
    : portfolioImages.filter(img => img.category === activeCategory);

  useEffect(() => {
    if (!filteredImages.length || !window.GLightbox) return;

    // Destroy previous instance
    if (lightboxRef.current) {
      lightboxRef.current.destroy();
      lightboxRef.current = null;
    }

    // Create new instance
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
  return (
    <>
      <Header />

      {/* Page Title */}
      <div
        className="page-title portfolio-hero dark-background"
        style={{ backgroundImage: "url('/assets/img/HomePage/11.webp')" }}
      >
        <div className="portfolio-hero-overlay" />
        <div className="container position-relative portfolio-hero-content">
          <h1 className="portfolio-hero-title">Portfolio</h1>
          <p className="portfolio-hero-subtitle text-center">
            Explore our collection of timeless frames and cinematic stories.
          </p>

          <nav className="breadcrumbs portfolio-breadcrumbs">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="current">Portfolio</li>
            </ol>
          </nav>
        </div>
      </div>

      <main className="main portfolio-lux">
        {/* Intro Section */}
        <section className="portfolio-intro pb-0">
          <div className="container section-title portfolioHeader" data-aos="fade-up">
            <h2 className="portfolio-title">Experience Our Art</h2>
            <p className="portfolio-desc">
              With an unwavering passion for storytelling and a keen eye for detail,
              we’ve curated a portfolio that beautifully embodies our creative vision.
              Our work spans diverse cultures, stunning destinations, and unique traditions—
              each moment preserved with elegance and soul.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="portfolio-gallery pt-3" id="Portfolio-gallery">
          <div className="container" data-aos="fade-up" data-aos-delay="100">

            {/* Category Filter Tabs */}
            <div className="row mb-5">
              <div className="col-12">
                <TabsFilter
                  tabs={[
                    { id: "All", label: "All" },
                    ...categories.map(cat => ({ id: cat.name, label: cat.label || cat.name }))
                  ]}
                  activeTab={activeCategory}
                  onChange={setActiveCategory}
                  loading={loading}
                  variant="pill"
                />
              </div>
            </div>

            {loading ? (
              <div className="row g-4">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div key={index} className="col-12 col-md-4">
                    <Skeleton width="100%" height="300px" borderRadius="10px" />
                  </div>
                ))}
              </div>
            ) : filteredImages.length > 0 ? (
              <LuxGallery images={filteredImages.map(item => item.image)} galleryId="portfolio" />
            ) : (
              <div className="text-center py-5">
                <p>No images found {activeCategory !== "All" && `for ${activeCategory}`}.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Scroll to Top */}
      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};

export default Portfolio;
