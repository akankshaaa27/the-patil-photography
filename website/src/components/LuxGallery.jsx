import React from "react";
import "./LuxGallery.css";

/* ═══════════════════════════════════════════════════════════
   LUX GALLERY — dark luxury editorial design system
   Masonry-style grid, glightbox compatible
═══════════════════════════════════════════════════════════ */

const LuxGallery = ({ images = [], galleryId = "gallery" }) => {
  if (!images.length) return null;

  return (
    <div className="lux-gallery">
      {images.map((image, index) => {
        const isTall = index === 0 || index % 5 === 4;
        return (
          <a
            key={index}
            href={image}
            className={`lux-card glightbox${isTall ? " lux-card--tall" : ""}`}
            data-gallery={galleryId}
            data-type="image"
            data-description=""
            aria-label={`Open ${galleryId} image ${index + 1}`}
          >
            <img
              src={image}
              alt={`${galleryId} ${index + 1}`}
              loading="lazy"
            />
            <span className="lux-shine" />
            <div className="lux-overlay">
              <span className="lux-overlay-icon">↗</span>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default LuxGallery;