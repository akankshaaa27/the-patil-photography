import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const STYLES = `
  @keyframes st-enter {
    from { opacity: 0; transform: translateY(22px) scale(0.76); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .st-float {
    position: fixed;
    bottom: 26px;
    right: 26px;
    z-index: 99500;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: st-enter 0.4s cubic-bezier(.2,.8,.2,1) both;
  }

  .st-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, #c9974a 0%, #e0b876 100%);
    color: #0d0b09;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 24px rgba(201,151,74,0.35);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .st-btn:hover {
    transform: scale(1.08) translateY(-1px);
    box-shadow: 0 10px 30px rgba(201,151,74,0.5);
  }

  .st-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1px solid rgba(201,151,74,0.4);
  }

  .st-btn svg {
    width: 24px;
    height: 24px;
    color: #0d0b09;
    position: relative;
    z-index: 1;
  }
`;

let stStylesInjected = false;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!stStylesInjected) {
      const styleTag = document.createElement('style');
      styleTag.textContent = STYLES;
      document.head.appendChild(styleTag);
      stStylesInjected = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 140);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <nav className="st-float" aria-label="Scroll to top">
      <button className="st-btn" type="button" onClick={scrollToTop} title="Scroll to top">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 6.343L5.515 12.828l1.414 1.414L11 10.172V18h2v-7.828l4.071 4.07 1.414-1.414L12 6.343z" />
        </svg>
      </button>
    </nav>
  );
};

export default ScrollToTop;