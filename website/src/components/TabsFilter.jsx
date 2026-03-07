import React from "react";
import Skeleton from "./Skeleton";
import "./TabsFilter.css";

const TabsFilter = ({ 
  tabs = [], 
  activeTab, 
  onChange, 
  loading = false,
  variant = "pill" // "pill" or "underline"
}) => {
  const shouldScroll = tabs.length > 7;

  if (loading) {
    return (
      <div className="tabs-filter__skeleton">
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton key={index} width="120px" height="40px" borderRadius="25px" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`tabs-filter tabs-filter--${variant} ${shouldScroll ? 'tabs-filter--scrollable' : ''}`}>
      <div className="tabs-filter__container">
        <ul className="tabs-filter__list">
          {tabs.map((tab) => (
            <li
              key={tab.id || tab.name}
              className={`tabs-filter__item ${activeTab === (tab.id || tab.name) ? "tabs-filter__item--active" : ""}`}
              onClick={() => onChange(tab.id || tab.name)}
            >
              <button
                type="button"
                className="tabs-filter__button"
                aria-selected={activeTab === (tab.id || tab.name)}
                aria-label={`Filter by ${tab.label || tab.name}`}
              >
                {tab.label || tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TabsFilter;
