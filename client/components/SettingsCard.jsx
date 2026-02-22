import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

// presentational component for showing global settings info in read-only form
export default function SettingsCard({ settings }) {
  return (
    <section className="flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-lg w-full ">
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-t-xl"></div>
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden border-4 border-white">
              {settings?.primaryLogo ? (
                <img
                  src={settings.primaryLogo}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">?</span>
              )}
            </div>
          </div>
        </div>
        <div className="pt-16 pb-8 px-6 text-center space-y-2">
          <h1 className="text-xl font-semibold">
            {settings?.businessName || settings?.companyName || 'Your business name'}
          </h1>
          {settings?.contactEmail && (
            <p className="text-gray-500 text-sm">{settings.contactEmail}</p>
          )}
        </div>
        <div className="border-t px-6 pb-8 space-y-4">
          {settings?.primaryMobileNumber && (
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} />
              <span>{settings.primaryMobileNumber}</span>
            </div>
          )}
          {settings?.secondaryMobileNumber && (
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} />
              <span>{settings.secondaryMobileNumber}</span>
            </div>
          )}
          {settings?.address && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} />
              <span>{settings.address}</span>
            </div>
          )}
          {settings?.socialLinks && settings.socialLinks.length > 0 && (
            <div className="flex justify-center gap-4 mt-2">
              {settings.socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
