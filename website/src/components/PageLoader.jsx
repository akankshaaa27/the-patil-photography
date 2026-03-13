import React from 'react';
import '../styles/home.css';

const PageLoader = () => {
  return (
    <div className="pp-page-loader">
      <div className="pp-loader-content">
        <div className="pp-loader-spinner"></div>
        <p className="pp-loader-text">Loading beautiful moments...</p>
      </div>
    </div>
  );
};

export default PageLoader;