import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSettings } from "../hooks/useSettings";

const Contact = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    document.body.className = "contact-page";

    return () => {
      document.body.className = "";
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({
          type: "success",
          message: "✓ Thanks for reaching out! We've sent you a confirmation email and will respond shortly."
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Auto-clear success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: "", message: "" });
        }, 5000);
      } else {
        setStatus({
          type: "error",
          message: "✗ Something went wrong. Please try again or contact us directly."
        });
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      setStatus({
        type: "error",
        message: "✗ Error sending message. Please check your connection and try again."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="main">
        {/* Page Title */}
        <div
          className="page-title dark-background"
          style={{ backgroundImage: "url('/assets/img/HomePage/16.webp')" }}
        >
          <div className="container position-relative">
            <h1>Contact</h1>
            <nav className="breadcrumbs">
              <ol>
                <li>
                  <a href="/">Home</a>
                </li>
                <li className="current">Contact</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Contact Section */}
        <section id="contact" className="contact section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-4">
                <div className="contact-info-page">
                  <div className="contact-card">
                    <div className="icon-box">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div className="contact-text">
                      <h4>Location</h4>
                      <p>{settings?.address || "Maharashtra, India"}</p>
                    </div>
                  </div>

                  <div className="contact-card">
                    <div className="icon-box">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div className="contact-text">
                      <h4>Email</h4>
                      <p>
                        {settings?.contactEmail && (
                          <p>{settings.contactEmail}</p>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="contact-card">
                    <div className="icon-box">
                      <i className="bi bi-telephone"></i>
                    </div>
                    <div className="contact-text">
                      <h4>Call</h4>
                      <p>{settings?.primaryMobileNumber}</p>
                      {settings?.secondaryMobileNumber && (
                        <p>{settings?.secondaryMobileNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="contact-card">
                    <div className="icon-box">
                      <i className="bi bi-clock"></i>
                    </div>
                    <div className="contact-text">
                      <h4>Open Hours</h4>
                      <p>Open 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div
                  className="contact-form-container"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <h3>Get in Touch</h3>
                  <p>
                    We'd love to hear from you. Send us a message and we'll
                    respond as soon as possible.
                  </p>

                  {/* Status Message */}
                  {status.message && (
                    <div
                      style={{
                        padding: "12px 16px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        fontSize: "0.95rem",
                        backgroundColor: status.type === "success" ? "#d4edda" : "#f8d7da",
                        color: status.type === "success" ? "#155724" : "#721c24",
                        border: `1px solid ${status.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
                        animation: "slideDown 0.3s ease"
                      }}
                    >
                      {status.message}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 form-group mt-3 mt-md-0">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <textarea
                        className="form-control"
                        name="message"
                        rows="5"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>

                    <div className="form-submit">
                      <button
                        type="submit"
                        className="submit-btn mt-3"
                        disabled={submitting}
                        style={{
                          opacity: submitting ? 0.7 : 1,
                          cursor: submitting ? "not-allowed" : "pointer",
                          minWidth: "150px",
                          transition: "all 0.3s ease"
                        }}
                      >
                        {submitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Contact;
