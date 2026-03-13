import React, { useEffect, useRef, useCallback } from "react";
import "./LuxGallery.css";

let glightboxReady = false;
let glightboxCallbacks = [];

function loadGLightbox(cb) {
  if (glightboxReady) {
    cb();
    return;
  }

  glightboxCallbacks.push(cb);

  if (document.getElementById("pp-glightbox-script")) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/css/glightbox.min.css";
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.id = "pp-glightbox-script";
  script.src =
    "https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/js/glightbox.min.js";

  script.onload = () => {
    glightboxReady = true;
    glightboxCallbacks.forEach((fn) => fn());
    glightboxCallbacks = [];
  };

  document.head.appendChild(script);
}

const LuxGallery = ({ images = [], galleryId = "gallery" }) => {
  const glRef = useRef(null);
  const mountedRef = useRef(true);

  const initGL = useCallback(() => {
    if (!mountedRef.current) return;
    if (!window.GLightbox) return;

    if (glRef.current) return;

    const elements = images.map((src) => ({
      href: src,
      type: "image",
      alt: "",
    }));

    glRef.current = window.GLightbox({
      elements,
      touchNavigation: true,
      loop: true,
      zoomable: true,
      draggable: true,
      openEffect: "fade",
      closeEffect: "fade",
      slideEffect: "slide",
      closeOnOutsideClick: true,
      autoplayVideos: false,
      svg: {
        close: " ",
        next: " ",
        prev: " ",
      },
    });
  }, [images]);

  const handleClick = useCallback((e, index) => {
    e.preventDefault();
    if (glRef.current && typeof glRef.current.openAt === "function") {
      glRef.current.openAt(index);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    if (!images.length) return;

    loadGLightbox(() => {
      initGL();
    });

    return () => {
      mountedRef.current = false;
    };
  }, [images, initGL]);

  if (!images.length) return null;

  return (
    <div className="pp-gal-grid">
      {images.map((image, index) => {
        const isTall = index === 0 || index % 5 === 4;

        return (
          <a
            key={`${galleryId}-${index}`}
            href={image}
            className={`pp-gal-item ${isTall ? "pp-gal-item--tall" : ""}`}
            onClick={(e) => handleClick(e, index)}
          >
            <img
              src={image}
              alt={`photo ${index + 1}`}
              loading="lazy"
              decoding="async"
              draggable="false"
            />

            <span className="pp-gal-shine" />

            <div className="pp-gal-overlay">
              <span className="pp-gal-overlay-icon">
                <svg viewBox="0 0 18 18">
                  <path
                    d="M10.5 3H15V7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 3L9.5 8.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7.5 15H3V10.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 15L8.5 9.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default LuxGallery;
