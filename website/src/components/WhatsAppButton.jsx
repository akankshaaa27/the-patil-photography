import React, { useState, useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';

/* ═══════════════════════════════════════════════════════════
   WHATSAPP FLOAT BUTTON — fixed bottom-LEFT
   Label slides out to the RIGHT on hover
═══════════════════════════════════════════════════════════ */

const STYLES = `
  @keyframes wa-pulse {
    0%   { box-shadow: 0 0 0 0 rgba(201,151,74,0.5); }
    70%  { box-shadow: 0 0 0 14px rgba(201,151,74,0); }
    100% { box-shadow: 0 0 0 0 rgba(201,151,74,0); }
  }
  @keyframes wa-ripple {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes wa-enter {
    from { opacity: 0; transform: translateY(20px) scale(0.85); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }

  .wa-float {
    position: fixed;
    bottom: 28px;
    left: 28px;
    right: auto;
    z-index: 99000;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0;
    animation: wa-enter 0.5s cubic-bezier(.2,.8,.2,1) 0.8s both;
  }

  /* Button comes FIRST (left), label slides out to the RIGHT */
  .wa-btn {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c9974a 0%, #e0b876 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    box-shadow: 0 6px 24px rgba(201,151,74,0.35);
    flex-shrink: 0;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    animation: wa-pulse 2.4s ease-out 1.5s infinite;
  }
  .wa-btn:hover {
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 12px 36px rgba(201,151,74,0.5);
  }
  .wa-btn::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 50%;
    border: 2px solid rgba(201,151,74,0.6);
    animation: wa-ripple 2.4s ease-out 1.5s infinite;
  }
  .wa-btn::after {
    content: '';
    position: absolute; inset: -3px;
    border-radius: 50%;
    border: 1px solid rgba(201,151,74,0.2);
    transition: border-color 0.3s;
  }
  .wa-btn:hover::after { border-color: rgba(201,151,74,0.55); }

  .wa-btn svg {
    position: relative; z-index: 1;
    color: #0d0b09; flex-shrink: 0;
  }

  /* Label — hidden, slides RIGHT from the button */
  .wa-label {
    font-family: 'Outfit', system-ui, sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #f5f0e8;
    background: #161210;
    border: 1px solid rgba(201,151,74,0.25);
    border-radius: 6px;
    padding: 7px 14px;
    white-space: nowrap;
    margin-left: 10px;

    opacity: 0;
    transform: translateX(-8px);
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .wa-float:hover .wa-label {
    opacity: 1;
    transform: translateX(0);
  }
`;

let styleInjected = false;

const WhatsAppButton = () => {
  const { settings } = useSettings();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!styleInjected) {
      const tag = document.createElement('style');
      tag.textContent = STYLES;
      document.head.appendChild(tag);
      styleInjected = true;
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const phoneNumber =
    settings?.whatsapp_no ||
    settings?.primaryMobileNumber ||
    settings?.contactPhone;

  if (!phoneNumber || !visible) return null;

  const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}`;

  return (
    <div className="wa-float">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-btn"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M12.0117 2C6.50574 2 2.02344 6.47837 2.02344 11.9825C2.02344 13.7446 2.48279 15.4624 3.37648 16.9961L2 22L7.13529 20.6659C8.61114 21.4646 10.301 21.966 12.0312 21.966C17.5199 21.966 22 17.5052 22 11.9825C22.0028 6.48006 17.5199 2 12.0117 2ZM12.0117 20.297C10.5186 20.297 9.07344 19.9077 7.79297 19.1449L7.49219 18.966L4.39453 19.7825L5.22396 16.7629L5.03125 16.4526C4.19562 15.1245 3.75 13.5857 3.75 11.9825C3.75 7.43794 7.45605 3.74109 12.0117 3.74109C16.5592 3.74109 20.2656 7.43794 20.2656 11.9825C20.2656 16.5304 16.5565 20.297 12.0117 20.297Z" />
          <path d="M16.5703 14.5028C16.3266 14.3797 15.118 13.7841 14.893 13.698C14.668 13.612 14.5039 13.5703 14.3406 13.8162C14.1773 14.062 13.7086 14.6158 13.5656 14.7797C13.4227 14.9436 13.2797 14.9641 13.0336 14.8411C12.7875 14.718 11.9867 14.4566 11.0391 13.6113C10.2977 12.95 9.79973 12.1336 9.65625 11.8875C9.51277 11.6414 9.64166 11.508 9.76465 11.3855C9.87539 11.275 10.0102 11.0906 10.1332 10.9472C10.2562 10.8037 10.2969 10.7012 10.3789 10.5373C10.4609 10.3734 10.4201 10.2299 10.3584 10.1069C10.2969 9.98391 9.80566 8.77522 9.60059 8.28342C9.4082 7.82281 9.20859 7.88172 9.0625 7.88172C8.92715 7.88172 8.76367 7.88172 8.60059 7.88172C8.4375 7.88172 8.17188 7.94297 7.94727 8.18883C7.72266 8.43469 7.08789 9.02859 7.08789 10.2393C7.08789 11.45 7.94727 12.6178 8.07031 12.7817C8.19336 12.9456 9.77539 15.385 12.1963 16.429C12.7725 16.677 13.2207 16.8241 13.5703 16.9348C14.2508 17.1511 14.8691 17.1189 15.3584 17.0456C15.9033 16.9642 17.0381 16.3591 17.2734 15.6831C17.5088 15.0071 17.5088 14.4284 17.4473 14.3262C17.3857 14.2231 17.2219 14.1627 16.9766 14.0397L16.5703 14.5028Z" />
        </svg>
      </a>
      <span className="wa-label">Chat with us</span>
    </div>
  );
};

export default WhatsAppButton;