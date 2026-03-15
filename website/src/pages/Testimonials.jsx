import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import "./Testimonials.css";

export default function Testimonials() {
  const [testimonials,    setTestimonials]    = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [showForm,        setShowForm]        = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [submitting,      setSubmitting]      = useState(false);
  const [successMessage,  setSuccessMessage]  = useState("");
  const [errorMessage,    setErrorMessage]    = useState("");

  const [formData, setFormData] = useState({
    coupleName: "",
    location: "",
    fullDescription: "",
    rating: 5,
    thumbnail: null,
  });

  /* ── helpers ─────────────────────────── */
  const truncateText = (text, wordLimit = 50) => {
    if (!text) return "";
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "…";
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setErrorMessage("Please select a valid image file"); return; }
    if (file.size > 5 * 1024 * 1024)    { setErrorMessage("Image size must be less than 5MB"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData(p => ({ ...p, thumbnail: { name: file.name, size: file.size, data: ev.target.result } }));
      setErrorMessage("");
    };
    reader.onerror = () => setErrorMessage("Failed to read image file");
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => setFormData(p => ({ ...p, thumbnail: null }));
  const toggleExpand      = (id) => setExpandedReviews(p => ({ ...p, [id]: !p[id] }));

  /* ── data ────────────────────────────── */
  useEffect(() => {
    document.body.className = "reviews-feedback-page";
    fetch("/api/testimonials?type=active")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setTestimonials(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => { document.body.className = ""; };
  }, []);

  /* ── submit ──────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorMessage(""); setSuccessMessage("");
    try {
      const body = {
        coupleName: formData.coupleName,
        location: formData.location,
        fullDescription: formData.fullDescription,
        rating: formData.rating,
        status: "Pending",
        ...(formData.thumbnail?.data ? { thumbnail: formData.thumbnail.data } : {}),
      };
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setSuccessMessage("Thank you! Your review will be published after approval.");
        setFormData({ coupleName: "", location: "", fullDescription: "", rating: 5, thumbnail: null });
        setTimeout(() => { setShowForm(false); setSuccessMessage(""); }, 3000);
      } else {
        setErrorMessage("Failed to submit. Please try again.");
      }
    } catch {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

       <main className="ps-main">


          <PageHero
          eyebrow="Kind Words"
          title="Reviews & Feedback"
          subtitle="Words from the heart of our beloved couples"
          backgroundImage="/assets/img/HomePage/16.webp"
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Reviews & Feedback' }
          ]}
        />

        {/* ── REVIEWS SECTION ── */}
        <section className="tm-section">
          <div className="tm-container">

            {/* Section head */}
            <div className="tm-section-head">
              <span className="tm-tag">From Our Couples</span>
              <h2 className="tm-section-title">From the Hearts of <em>Our Couples</em></h2>
              <p className="tm-section-sub">
                Every love story is unique, and we're honoured to be part of it.
                Read what our couples say about their experience with us.
              </p>
              <button
                className="tm-share-btn"
                onClick={() => setShowForm(p => !p)}
              >
                <i className="bi bi-pencil-square" />
                Share Your Review
              </button>
            </div>

            {/* ── FORM ── */}
            {showForm && (
              <div className="tm-form-wrap">
                <h3 className="tm-form-title">Share Your Experience</h3>
                <form onSubmit={handleSubmit} className="tm-form">

                  <div className="tm-form-row">
                    <div className="tm-form-group">
                      <label htmlFor="coupleName" className="tm-label">Couple Name *</label>
                      <input type="text" id="coupleName" name="coupleName" className="tm-input"
                        value={formData.coupleName} onChange={handleInput}
                        placeholder="Your couple name" required />
                    </div>
                    <div className="tm-form-group">
                      <label htmlFor="location" className="tm-label">Location *</label>
                      <input type="text" id="location" name="location" className="tm-input"
                        value={formData.location} onChange={handleInput}
                        placeholder="Your location" required />
                    </div>
                  </div>

                  <div className="tm-form-group">
                    <label htmlFor="fullDescription" className="tm-label">Your Review *</label>
                    <textarea id="fullDescription" name="fullDescription" className="tm-textarea"
                      value={formData.fullDescription} onChange={handleInput}
                      placeholder="Share your experience with us…" rows="5" required />
                  </div>

                  <div className="tm-form-row">
                    <div className="tm-form-group">
                      <label htmlFor="rating" className="tm-label">Rating *</label>
                      <select id="rating" name="rating" className="tm-select"
                        value={formData.rating} onChange={handleInput}>
                        <option value="5">5 Stars — Excellent</option>
                        <option value="4">4 Stars — Very Good</option>
                        <option value="3">3 Stars — Good</option>
                        <option value="2">2 Stars — Fair</option>
                        <option value="1">1 Star — Poor</option>
                      </select>
                    </div>

                    <div className="tm-form-group tm-upload-group">
                      <label className="tm-label">Upload Photo (Optional)</label>
                      <input type="file" id="thumbnail" accept="image/*"
                        className="tm-file-input" onChange={handleImageUpload} />
                      <label htmlFor="thumbnail" className="tm-upload-btn">
                        <i className="bi bi-cloud-arrow-up" />
                        {formData.thumbnail ? "Change Image" : "Upload Image"}
                      </label>
                      {formData.thumbnail && (
                        <div className="tm-preview">
                          <img src={formData.thumbnail.data} alt="Preview" className="tm-preview-img" />
                          <div className="tm-preview-info">
                            <span className="tm-preview-name">{formData.thumbnail.name}</span>
                            <span className="tm-preview-size">{(formData.thumbnail.size / 1024).toFixed(1)} KB</span>
                          </div>
                          <button type="button" className="tm-remove-btn" onClick={handleRemoveImage}>Remove</button>
                        </div>
                      )}
                    </div>
                  </div>

                  {successMessage && <div className="tm-alert tm-alert--success">{successMessage}</div>}
                  {errorMessage   && <div className="tm-alert tm-alert--error">{errorMessage}</div>}

                  <div className="tm-form-actions">
                    <button type="submit" className="tm-submit-btn" disabled={submitting}>
                      {submitting ? "Submitting…" : "Submit Review"}
                    </button>
                    <button type="button" className="tm-cancel-btn"
                      onClick={() => setShowForm(false)} disabled={submitting}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── GRID ── */}
            {!showForm && (
              loading ? (
                <div className="tm-loading">
                  <div className="tm-spinner" />
                  <p>Loading reviews…</p>
                </div>
              ) : testimonials.length > 0 ? (
                <div className="tm-grid">
                  {testimonials.map((r) => (
                    <div className="tm-card" key={r._id}>
                      <div className="tm-card-quote">"</div>
                      <p className="tm-card-text">
                        {expandedReviews[r._id]
                          ? (r.fullDescription || "")
                          : truncateText(r.fullDescription || "")}
                      </p>
                      {r.fullDescription?.split(" ").length > 50 && (
                        <button className="tm-toggle-btn" onClick={() => toggleExpand(r._id)}>
                          {expandedReviews[r._id] ? "View Less" : "View More"}
                        </button>
                      )}
                      <div className="tm-stars">
                        {[...Array(r.rating || 5)].map((_, i) => (
                          <i key={i} className="bi bi-star-fill" />
                        ))}
                      </div>
                      <div className="tm-card-divider" />
                      <div className="tm-card-author">
                        {r.thumbnail && (
                          <img src={r.thumbnail} alt={r.coupleName} className="tm-avatar" />
                        )}
                        <div>
                          <strong className="tm-author-name">{r.coupleName}</strong>
                          <span className="tm-author-loc">{r.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tm-empty">
                  <i className="bi bi-chat-heart" />
                  <p>No reviews yet. Be the first to share your experience!</p>
                </div>
              )
            )}

          </div>
        </section>

        {/* ── CTA ── */}
        <section className="tm-cta">
          <h2 className="tm-cta-title">Ready to Create Your <em>Love Story?</em></h2>
          <p className="tm-cta-sub">Let us capture your special moments with the elegance they deserve.</p>
          <Link to="/quote" className="tm-cta-btn">
            Get Your Quote <i className="bi bi-arrow-right" />
          </Link>
        </section>

      </main>

      <Footer />

   
    </>
  );
}