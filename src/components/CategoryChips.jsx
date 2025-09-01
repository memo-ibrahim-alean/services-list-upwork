import { categories } from "../data/data.js";
import { useRef, useEffect, useCallback } from "react";

export default function CategoryChips({ activeCategory, onSelect, counts }) {
  const wrapRef = useRef(null);

  // Keyboard arrow navigation
  const handleKey = useCallback((e) => {
    if (!["ArrowLeft","ArrowRight"].includes(e.key)) return;
    const buttons = Array.from(wrapRef.current.querySelectorAll("button.chip"));
    const idx = buttons.findIndex(b => b === document.activeElement);
    if (idx === -1) return;
    e.preventDefault();
    let next = idx + (e.key === "ArrowRight" ? 1 : -1);
    if (next < 0) next = buttons.length - 1;
    if (next >= buttons.length) next = 0;
    buttons[next].focus();
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    el?.addEventListener("keydown", handleKey);
    return () => el?.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <nav
      ref={wrapRef}
      className="chip-row scrollable-x"
      aria-label="Filter by category"
    >
      <button
        type="button"
        className={`chip ${!activeCategory ? "active" : ""}`}
        onClick={() => onSelect("")}
      >
        All ({total})
      </button>
      {categories.map(cat => {
        const count = counts[cat.id] ?? 0;
        return (
          <button
            key={cat.id}
            type="button"
            className={`chip ${activeCategory === cat.id ? "active" : ""}`}
            style={activeCategory === cat.id ? { "--chip-color": cat.color } : {}}
            onClick={() => onSelect(cat.id)}
            aria-pressed={activeCategory === cat.id}
          >
            <span className="chip-icon">{cat.icon}</span>
            {cat.label}
            <span className="chip-count">{count}</span>
          </button>
        );
      })}
    </nav>
  );
}