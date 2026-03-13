import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import LuxGallery from "./LuxGallery";
import "./StoryModal.css";

/* ═══════════════════════════════════════════════════════════
   STORY MODAL — minimal dark luxury editorial
   Palette: Ink #0d0b09 · Cream #f5f0e8 · Gold #c9974a
═══════════════════════════════════════════════════════════ */

const StoryModal = ({ show, onHide, story }) => {
  useEffect(() => {
    if (!show || !window.GLightbox) return;
    setTimeout(() => {
      try {
        window.GLightbox({
          selector: ".glightbox",
          loop: true,
          touchNavigation: true,
          keyboardNavigation: true,
          zoomable: true,
        });
      } catch (e) {
        console.warn("GLightbox init error:", e);
      }
    }, 0);
  }, [show, story]);

  if (!story) return null;

  const imageCount = story.images?.length ?? 0;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      scrollable={false}
      className="sm-modal"
    >
      {/* ── Header ── */}
      <Modal.Header closeButton className="sm-header">
        <div className="sm-header-left">
          <span className="sm-header-dot" />
          <span className="sm-header-label">Love Story</span>
        </div>
      </Modal.Header>

      {/* ── Body ── */}
      <Modal.Body className="sm-body">

        {/* Title block */}
        <div className="sm-hero">
          <span className="sm-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          <h2 className="sm-title">{story.title}</h2>
          {story.subtitle && (
            <p className="sm-subtitle">{story.subtitle}</p>
          )}
          {story.description && (
            <p className="sm-desc">{story.description}</p>
          )}
        </div>

        {/* Decorative divider */}
        <div className="sm-divider" />

        {/* Gallery */}
        {imageCount > 0 && (
          <div className="sm-gallery-wrap">
            <LuxGallery
              images={story.images}
              galleryId={`story-${story._id}`}
            />
          </div>
        )}

        {/* Footer */}
        <div className="sm-footer">
          <span className="sm-counter">
            {imageCount} photograph{imageCount !== 1 ? "s" : ""}
          </span>
          <a href="/quote" className="pp-btn-primary sm-cta">
            Book Your Date
          </a>
        </div>

      </Modal.Body>
    </Modal>
  );
};

export default StoryModal;