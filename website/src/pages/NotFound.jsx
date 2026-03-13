import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="nf-root">
      <div className="nf-bg-number">404</div>

      <div className="nf-content">
        <span className="nf-eyebrow">Error 404</span>
        <h1 className="nf-title">Page Not Found</h1>
        <p className="nf-sub">
          The moment you're looking for seems to have wandered off.
          Let's bring you back to where the story begins.
        </p>
        <Link to="/" className="nf-btn">
          Return Home <span className="nf-arrow">↗</span>
        </Link>
      </div>
    </div>
  );
}