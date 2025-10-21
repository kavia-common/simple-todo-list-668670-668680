import React from "react";

/**
 * PUBLIC_INTERFACE
 * Filters renders filter buttons and calls onChange with the selected filter.
 * filter options: 'all' | 'active' | 'completed'
 */
export default function Filters({ current, onChange }) {
  const options = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
  ];
  return (
    <div className="filters" role="radiogroup" aria-label="Filter todos">
      {options.map(opt => (
        <button
          key={opt.id}
          type="button"
          className={`filter-btn ${current === opt.id ? "active" : ""}`}
          aria-pressed={current === opt.id}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
