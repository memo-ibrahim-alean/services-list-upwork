import { categories } from "../../data/data.js";

export default function StepCategory({
  services,
  locationId,
  categoryId,
  onSelect,
  onBack
}) {
  const counts = categories.reduce((acc, c) => {
    acc[c.id] = services.filter(
      s => s.location === locationId && s.category === c.id
    ).length;
    return acc;
  }, {});

  const available = categories.filter(c => counts[c.id] > 0);

  return (
    <div className="narrow-step">
      <h3 className="step-title">2. Pick a category</h3>
      <p className="step-sub">
        Only categories with services in your selected location are shown.
      </p>

      <div className="category-grid">
        {available.map(cat => {
          const count = counts[cat.id];
          return (
            <button
              key={cat.id}
              type="button"
              className={`cat-card ${categoryId === cat.id ? "active" : ""}`}
              onClick={() => onSelect(cat.id)}
              style={categoryId === cat.id ? { "--cat-color": cat.color } : {}}
            >
              <span className="cat-icon" aria-hidden="true">{cat.icon}</span>
              <span className="cat-label">{cat.label}</span>
              <span className="cat-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="step-nav-inline">
        <button className="btn outline tiny" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}