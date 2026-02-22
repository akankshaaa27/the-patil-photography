import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
  Globe,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/settings");
        if (!mounted) return;
        if (res.ok) setSettings(await res.json());
      } catch (err) {
        console.error("Unable to fetch settings", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const getSocialIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case "instagram":
        return <Instagram size={20} />;
      case "facebook":
        return <Facebook size={20} />;
      case "youtube":
        return <Youtube size={20} />;
      case "twitter":
        return <Twitter size={20} />;
      case "linkedin":
        return <Linkedin size={20} />;
      default:
        return <Globe size={20} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        Loading profile...
      </div>
    );
  }

  return (
    <section className="min-h-screen">

      {/* HEADER */}
      <div className="relative h-72 md:h-72 w-full rounded-2xl">
        <img
          src="website/assets/img/HomePage/website_4.webp"
          alt="cover"
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

        {/* Logo */}
        {settings?.primaryLogo && (
          <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
            <img
              src={settings.primaryLogo}
              alt="Studio Logo"
              className="w-36 h-36 object-contain drop-shadow-xl rounded-md bg-white/10 p-2"
            />
          </div>
        )}

        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-wide">
            {settings?.businessName || "Your Studio Name"}
          </h1>
          <p className="text-sm md:text-base opacity-80 mt-2 font-semibold">
            Professional Photography Studio
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="py-12">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">

            {/* About */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                About Studio
              </h2>
              <p className="text-neutral-600 leading-relaxed">
                We capture timeless emotions, authentic love stories, and
                unforgettable wedding moments with cinematic precision and
                artistic excellence.
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-semibold">
                Contact Information
              </h2>

              {settings?.contactEmail && (
                <div className="flex items-center gap-4">
                  <Mail size={20} />
                  <span>{settings.contactEmail}</span>
                </div>
              )}

              {settings?.primaryMobileNumber && (
                <div className="flex items-center gap-4">
                  <Phone size={20} />
                  <span>{settings.primaryMobileNumber}</span>
                </div>
              )}

              {settings?.address && (
                <div className="flex items-center gap-4">
                  <MapPin size={20} />
                  <span>{settings.address}</span>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-lg font-semibold mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">

                {settings?.primaryMobileNumber && (
                  <a
                    href={`tel:${settings.primaryMobileNumber}`}
                    className="flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 p-4 rounded-xl transition"
                  >
                    <div className="flex items-center gap-3">
                      <Phone size={18} />
                      <span>Call Now</span>
                    </div>
                    <ExternalLink size={16} />
                  </a>
                )}

                {settings?.contactEmail && (
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 p-4 rounded-xl transition"
                  >
                    <div className="flex items-center gap-3">
                      <Mail size={18} />
                      <span>Send Email</span>
                    </div>
                    <ExternalLink size={16} />
                  </a>
                )}

                {settings?.primaryMobileNumber && (
                  <a
                    href={`https://wa.me/${settings.primaryMobileNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 p-4 rounded-xl transition"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle size={18} />
                      <span>WhatsApp</span>
                    </div>
                    <ExternalLink size={16} />
                  </a>
                )}

              </div>
            </div>

            {/* Social Media */}
            {settings?.socialLinks && settings.socialLinks.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-lg font-semibold mb-6">
                  Connect With Us
                </h2>

                <div className="flex flex-wrap gap-4">
                  {settings.socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 flex items-center justify-center 
                                 rounded-xl bg-neutral-50 hover:bg-black 
                                 hover:text-white transition"
                    >
                      {getSocialIcon(link.platform)}
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}