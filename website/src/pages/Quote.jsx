import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { useSettings } from "../hooks/useSettings";
import "./Quote.css";

const EVENTS   = ["Haldi", "Mehendi", "Sangeet", "Wedding", "Reception", "Engagement", "Prewedding", "Other"];
const SERVICES = ["Photography", "Films", "Both"];

const EMPTY_FORM = {
  groomName: "", brideName: "", phoneNumber: "",
  eventStartDate: "", eventEndDate: "",
  events: [], budget: "", location: "",
  services: [], message: "",
};

export default function Quote() {
  const { settings } = useSettings();
  const businessName = settings?.businessName || "Photography";

  const [formData,       setFormData]       = useState(EMPTY_FORM);
  const [submitting,     setSubmitting]      = useState(false);
  const [successMessage, setSuccessMessage]  = useState("");
  const [errorMessage,   setErrorMessage]    = useState("");

  useEffect(() => {
    document.body.className = "quote-page";
    return () => { document.body.className = ""; };
  }, []);

  useEffect(() => {
    if (!successMessage && !errorMessage) return;
    const t = setTimeout(() => { setSuccessMessage(""); setErrorMessage(""); }, 5000);
    return () => clearTimeout(t);
  }, [successMessage, errorMessage]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleCheckbox = (e, field) => {
    const { value, checked } = e.target;
    if (field === "services") {
      setFormData(p => {
        let updated = [...p.services];
        if (value === "Both") {
          updated = checked ? ["Photography", "Films", "Both"] : [];
        } else {
          updated = checked ? [...updated, value] : updated.filter(i => i !== value);
          if (updated.includes("Photography") && updated.includes("Films") && !updated.includes("Both")) updated.push("Both");
          if (!checked && updated.includes("Both")) updated = updated.filter(i => i !== "Both");
        }
        return { ...p, services: updated };
      });
      return;
    }
    setFormData(p => ({
      ...p,
      [field]: checked ? [...p[field], value] : p[field].filter(i => i !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccessMessage("Thank you for your enquiry! We will get back to you within 48 hours.");
        setFormData(EMPTY_FORM);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch {
      setErrorMessage("Error submitting. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="pp-main">

        <PageHero
          eyebrow="Reserve Your Date"
          title="Book Us"
          subtitle="Let's create unforgettable memories together"
          backgroundImage="/assets/img/HomePage/3.webp"
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'Book Us' }
          ]}
        />

        {/* ── INTRO ── */}
        <section className="qt-intro">
          <div className="qt-intro-inner">
            <span className="qt-tag">Begin Your Story</span>
            <h2 className="qt-intro-title">
              Let's Create Something <em>Beautiful Together</em>
            </h2>
            <div className="qt-intro-body">
              <p>Book your special wedding day with <strong>{businessName}</strong>. We turn your most cherished moments into timeless memories — heartfelt candid emotions, cinematic storytelling, every frame captured with passion.</p>
              <p>Kindly complete the form below with as much detail as possible. We aim to respond within <strong>48 hours</strong>. If urgent, please contact us directly on the number provided.</p>
            </div>
          </div>
        </section>

        {/* ── MAIN FORM SECTION ── */}
        <section className="qt-section">
          <div className="qt-container">
            <div className="qt-layout">

              {/* ─ LEFT — info panel ─ */}
              <aside className="qt-info">
                <h2 className="qt-info-title">Capture Your <em>Perfect Moments</em></h2>
                <p className="qt-info-sub">
                  Experience photography excellence with our dedicated team — artistry, passion, and uncompromising quality in every shoot.
                </p>

                <div className="qt-benefits">
                  {[
                    { icon: "bi-camera",   title: "Professional Excellence",  desc: "Expert photography with artistic vision and technical precision" },
                    { icon: "bi-heart",    title: "Personalised Service",     desc: "Tailored sessions that reflect your unique love story" },
                    { icon: "bi-clock",    title: "Timely Delivery",          desc: "Professional turnaround times with exceptional quality" },
                  ].map(({ icon, title, desc }) => (
                    <div className="qt-benefit" key={title}>
                      <div className="qt-benefit-icon"><i className={`bi ${icon}`} /></div>
                      <div>
                        <h4 className="qt-benefit-title">{title}</h4>
                        <p className="qt-benefit-desc">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="qt-contact-info">
                  {settings?.primaryMobileNumber && (
                    <a href={`tel:${settings.primaryMobileNumber}`} className="qt-contact-row">
                      <i className="bi bi-telephone-fill" />
                      <span>
                        {settings.primaryMobileNumber}
                        {settings?.secondaryMobileNumber && `, ${settings.secondaryMobileNumber}`}
                      </span>
                    </a>
                  )}
                  {settings?.contactEmail && (
                    <a href={`mailto:${settings.contactEmail}`} className="qt-contact-row">
                      <i className="bi bi-envelope-fill" />
                      <span>{settings.contactEmail}</span>
                    </a>
                  )}
                </div>
              </aside>

              {/* ─ RIGHT — form ─ */}
              <div className="qt-form-wrap">
                <div className="qt-form-head">
                  <h3 className="qt-form-title">Wedding Enquiry Form</h3>
                  <p className="qt-form-sub">Share your details and receive a personalised quote tailored to your vision.</p>
                </div>

                <form onSubmit={handleSubmit} className="qt-form">

                  {successMessage && <div className="qt-alert qt-alert--success">{successMessage}</div>}
                  {errorMessage   && <div className="qt-alert qt-alert--error">{errorMessage}</div>}

                  {/* Names */}
                  <div className="qt-row">
                    <div className="qt-group">
                      <label htmlFor="groomName" className="qt-label">Groom Name *</label>
                      <input type="text" id="groomName" name="groomName" className="qt-input"
                        value={formData.groomName} onChange={handleInput} placeholder="Groom's name" required />
                    </div>
                    <div className="qt-group">
                      <label htmlFor="brideName" className="qt-label">Bride Name *</label>
                      <input type="text" id="brideName" name="brideName" className="qt-input"
                        value={formData.brideName} onChange={handleInput} placeholder="Bride's name" required />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="qt-group">
                    <label htmlFor="phoneNumber" className="qt-label">Phone Number *</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" className="qt-input"
                      value={formData.phoneNumber} onChange={handleInput} placeholder="+91 00000 00000" required />
                  </div>

                  {/* Dates */}
                  <div className="qt-row">
                    <div className="qt-group">
                      <label htmlFor="eventStartDate" className="qt-label">Event Start Date *</label>
                      <input type="date" id="eventStartDate" name="eventStartDate" className="qt-input"
                        value={formData.eventStartDate} onChange={handleInput}
                        min="2026-01-11" max="2028-01-11" required />
                    </div>
                    <div className="qt-group">
                      <label htmlFor="eventEndDate" className="qt-label">Event End Date *</label>
                      <input type="date" id="eventEndDate" name="eventEndDate" className="qt-input"
                        value={formData.eventEndDate} onChange={handleInput}
                        min="2026-01-11" max="2028-01-11" required />
                    </div>
                  </div>

                  {/* Events */}
                  <div className="qt-group">
                    <label className="qt-label">Select Your Events</label>
                    <div className="qt-checkbox-grid">
                      {EVENTS.map(ev => (
                        <label key={ev} className={`qt-chip ${formData.events.includes(ev) ? "qt-chip--on" : ""}`}>
                          <input type="checkbox" value={ev}
                            checked={formData.events.includes(ev)}
                            onChange={e => handleCheckbox(e, "events")} />
                          {ev}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="qt-group">
                    <label htmlFor="budget" className="qt-label">Estimated Budget (₹)</label>
                    <input type="number" id="budget" name="budget" className="qt-input"
                      value={formData.budget} onChange={handleInput} placeholder="e.g. 200000" />
                  </div>

                  {/* Location */}
                  <div className="qt-group">
                    <label htmlFor="location" className="qt-label">Event Location *</label>
                    <input type="text" id="location" name="location" className="qt-input"
                      value={formData.location} onChange={handleInput} placeholder="City / Venue" required />
                  </div>

                  {/* Services */}
                  <div className="qt-group">
                    <label className="qt-label">Services Required</label>
                    <div className="qt-services-row">
                      {SERVICES.map(svc => (
                        <label key={svc} className={`qt-chip qt-chip--lg ${formData.services.includes(svc) ? "qt-chip--on" : ""}`}>
                          <input type="checkbox" value={svc}
                            checked={formData.services.includes(svc)}
                            onChange={e => handleCheckbox(e, "services")} />
                          {svc}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="qt-group">
                    <label htmlFor="message" className="qt-label">Your Wedding Vision</label>
                    <textarea id="message" name="message" rows="4" className="qt-textarea"
                      value={formData.message} onChange={handleInput}
                      placeholder="Share your vision, preferences, or any special requests…" />
                  </div>

                  <button type="submit" className="qt-submit-btn" disabled={submitting}>
                    {submitting ? "Sending Enquiry…" : "Submit Enquiry"}
                  </button>

                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />

   
    </>
  );
}