import { useEffect } from "react";

const OPTIONS = [
  { id: "personal", label: "Personal" },
  { id: "business", label: "Business" },
  { id: "all", label: "All" }
];

export default function TypeSelector({ value, onChange, className = "" }) {
  return (
    <div className={`type-selector ${className}`}>
      {OPTIONS.map(opt => (
        <button
          key={opt.id}
          type="button"
          className={`type-seg ${value === opt.id ? "active" : ""}`}
          onClick={() => onChange(opt.id)}
          aria-pressed={value === opt.id}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Helper to map useCase to actual taxonomy type IDs.
 */
export function allowedTypes(useCase) {
  switch (useCase) {
    case "personal":
      return ["b2c"];
    case "business":
      return ["b2b"];
    case "all":
    default:
      return ["b2c", "b2b"];
  }
}