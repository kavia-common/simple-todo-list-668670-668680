import React from "react";

/**
 * PUBLIC_INTERFACE
 * Header component renders the app title and description using the Ocean Professional theme.
 */
export default function Header() {
  return (
    <div className="header-bar card" role="banner" aria-label="Todo header">
      <div className="header">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 13l3 3 9-9" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="header-title">Todo Manager</h1>
      </div>
      <p className="header-subtitle">Stay organized. Add, edit, and complete tasks effortlessly.</p>
    </div>
  );
}
