import React from "react";
import Modal from "react-bootstrap/Modal";
import LuxGallery from "./LuxGallery";
import "./StoryModal.css";

/* ═══════════════════════════════════════════════════════════
   STORY MODAL — minimal dark luxury editorial
   Class prefix: pp-sm-*
   Palette: Ink #0d0b09 · Cream #f5f0e8 · Gold #c9974a
═══════════════════════════════════════════════════════════ */

const StoryModal = ({ show, onHide, story }) => {
  if (!story) return null;

  const imageCount = story.images?.length ?? 0;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      className="pp-sm-modal"
    >

      {/* ── Header ─────────────────────────────────────────── */}
      <Modal.Header closeButton className="pp-sm-header">
        <div className="pp-sm-header-left">
          <span className="pp-sm-header-dot" />
          <span className="pp-sm-header-label">Love Story</span>
        </div>
      </Modal.Header>

      {/* ── Body ───────────────────────────────────────────── */}
      <Modal.Body className="pp-sm-body">

        {/* Title block */}
        <div className="pp-sm-hero">
          <span className="pp-sm-orn">✦ ✦ ✦</span>

          <h2 className="pp-sm-title">{story.title}</h2>

          {story.subtitle && (
            <p className="pp-sm-subtitle">{story.subtitle}</p>
          )}

          {story.description && (
            <p className="pp-sm-desc">{story.description}</p>
          )}
        </div>

        {/* Gradient divider */}
        <div className="pp-sm-divider" />

        {/* Gallery */}
        {imageCount > 0 && (
          <div className="pp-sm-gallery-wrap">
            <LuxGallery
              images={story.images}
              galleryId={`story-${story._id}`}
            />
          </div>
        )}

        {/* Footer */}
        <div className="pp-sm-footer">
          <span className="pp-sm-counter">
            {imageCount} photograph{imageCount !== 1 ? "s" : ""}
          </span>

          <a href="/quote" className="pp-btn-primary pp-sm-cta">
            Book Your Date
          </a>
        </div>

      </Modal.Body>
    </Modal>
  );
};

export default StoryModal;