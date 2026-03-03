import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [formData, setFormData] = useState({
    coupleName: "",
    location: "",
    fullDescription: "",
    rating: 5,
    thumbnail: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Helpers
  const truncateText = (text, wordLimit = 50) => {
    if (!text) return "";
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file is an image
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB");
      return;
    }

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result;
      setFormData((prev) => ({
        ...prev,
        thumbnail: {
          name: file.name,
          size: file.size,
          data: base64String,
        },
      }));
      setErrorMessage("");
    };
    reader.onerror = () => {
      setErrorMessage("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: null,
    }));
  };

  const toggleExpandReview = (id) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      document.body.className = "reviews-feedback-page";
    } catch (error) {
      console.error("Error in Reviews useEffect:", error);
    }

    // Fetch Reviews & Feedback
    fetch("/api/testimonials?type=active")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTestimonials(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });

    return () => (document.body.className = '');
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const submitData = {
        coupleName: formData.coupleName,
        location: formData.location,
        fullDescription: formData.fullDescription,
        rating: formData.rating,
        status: "Pending",
      };

      // If thumbnail is available, include the base64 data
      if (formData.thumbnail?.data) {
        submitData.thumbnail = formData.thumbnail.data;
      }

      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setSuccessMessage(
          "Thank you for your testimonial! It will be reviewed and published soon."
        );
        setFormData({
          coupleName: "",
          location: "",
          fullDescription: "",
          rating: 5,
          thumbnail: null,
        });
        setTimeout(() => {
          setShowForm(false);
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage("Failed to submit testimonial. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="main">
        {/* Page Header */}
        <div className="page-title dark-background" style={{ backgroundImage: "url('/assets/img/HomePage/16.webp')" }}>
          <div className="container position-relative">
            <h1>Reviews & Feedback</h1>
            <p>Words from the heart of our beloved couples</p>
            <nav className="breadcrumbs">
              <ol>
                <li><a href="/">Home</a></li>
                <li className="current">Reviews & Feedback</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Reviews & Feedback Section */}
        <section className="reviews-feedback-section">
          <div className="container">
            {/* Header */}
            <div className="reviews-feedback-header" data-aos="fade-up">
              <div className="reviews-feedback-label">
                From Our Couples
              </div>
              <h2 className="reviews-feedback-title">
                From the Hearts of Our Couples
              </h2>
              <p className="reviews-feedback-desc">
                Every love story is unique, and we're honored to be a part of it. Read what our couples have to say about their experience with us.
              </p>
              <button
                className="btn-share-review"
                onClick={() => setShowForm(!showForm)}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <i className="bi bi-pencil-square me-2"></i>
                Share Your Review
              </button>
            </div>

            {/* Review Form */}
            {showForm && (
              <div
                className="review-form-container"
                data-aos="fade-up"
              >
                <h3 className="review-form-title">Share Your Experience</h3>
                <form onSubmit={handleSubmit} className="review-form">
                  <div className="form-row-grid">
                    <div className="form-group">
                      <label htmlFor="coupleName" className="form-label">Couple Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        id="coupleName"
                        name="coupleName"
                        value={formData.coupleName}
                        onChange={handleInputChange}
                        placeholder="Your couple name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="location" className="form-label">Location *</label>
                      <input
                        type="text"
                        className="form-input"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Your location"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="fullDescription" className="form-label">Your Review *</label>
                    <textarea
                      className="form-textarea"
                      id="fullDescription"
                      name="fullDescription"
                      value={formData.fullDescription}
                      onChange={handleInputChange}
                      placeholder="Share your experience with us..."
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <div className="form-row-grid">
                    <div className="form-group">
                      <label htmlFor="rating" className="form-label">Rating *</label>
                      <select
                        className="form-select"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                      >
                        <option value="5">5 Stars - Excellent</option>
                        <option value="4">4 Stars - Very Good</option>
                        <option value="3">3 Stars - Good</option>
                        <option value="2">2 Stars - Fair</option>
                        <option value="1">1 Star - Poor</option>
                      </select>
                    </div>
                    <div className="form-group image-upload-wrapper">
                      <label className="image-upload-label">Upload Photo (Optional)</label>
                      <input
                        type="file"
                        id="thumbnail"
                        className="image-upload-input"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="thumbnail" className="image-upload-button">
                        <i className="bi bi-cloud-arrow-up"></i>
                        {formData.thumbnail ? "Change Image" : "Upload Image"}
                      </label>
                      
                      {formData.thumbnail && (
                        <div className="image-preview-container">
                          <img src={formData.thumbnail.data} alt="Preview" className="image-preview" />
                          <div className="image-preview-info">
                            <div className="image-preview-name">{formData.thumbnail.name}</div>
                            <div className="image-preview-size">
                              {(formData.thumbnail.size / 1024).toFixed(2)} KB
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn-remove-image"
                            onClick={handleRemoveImage}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {successMessage && (
                    <div
                      className="alert alert-success"
                      role="alert"
                    >
                      {successMessage}
                    </div>
                  )}

                  {errorMessage && (
                    <div
                      className="alert alert-danger"
                      role="alert"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div className="form-buttons">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-submit"
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </>
                      ) : (
                        "Submit Review"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      disabled={submitting}
                      className="btn-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Reviews Grid */}
            {!showForm && (
              loading ? (
                <div className="text-center py-5">
                  <p>Loading reviews...</p>
                </div>
              ) : testimonials.length > 0 ? (
                <div className="reviews-grid">
                  <div className="reviews-grid-container">
                    {testimonials.map((review, index) => (
                      <div
                        key={review._id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                        className="review-card"
                      >
                        {/* Quote Icon */}
                        <div className="review-quote-icon">
                          <i className="bi bi-quote"></i>
                        </div>

                        {/* Review Text */}
                        <p className="review-text">
                          "{expandedReviews[review._id] ? (review.fullDescription || '') : truncateText(review.fullDescription || '')}"
                        </p>

                        {/* View More Button */}
                        {review.fullDescription && review.fullDescription.split(' ').length > 50 && (
                          <button
                            onClick={() => toggleExpandReview(review._id)}
                            className="btn-view-more"
                          >
                            {expandedReviews[review._id] ? 'View Less' : 'View More'}
                          </button>
                        )}

                        {/* Star Rating */}
                        <div className="review-stars">
                          {[...Array(review.rating || 5)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                        </div>

                        {/* Divider */}
                        <div className="review-divider"></div>

                        {/* Author Info */}
                        <div className="review-author">
                          {review.thumbnail && (
                            <img
                              src={review.thumbnail}
                              alt={review.coupleName}
                              className="review-avatar"
                            />
                          )}
                          <div className="review-author-info">
                            <h4 className="review-author-name">
                              {review.coupleName}
                            </h4>
                            <p className="review-author-location">
                              {review.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-5">
                  <p style={{ fontSize: '1.05rem', color: '#666' }}>No reviews yet. Be the first to share your experience!</p>
                </div>
              )
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-banner-testimonials">
          <div className="container">
            <h2 className="cta-banner-title">Ready to Create Your Love Story?</h2>
            <p className="cta-banner-desc">Let us capture your special moments with the elegance they deserve.</p>
            <a href="/quote" className="cta-link-btn">
              Get Your Quote
              <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Scroll Top Button */}
      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>

      {/* Preloader */}

    </>
  );
};

export default Testimonials;
