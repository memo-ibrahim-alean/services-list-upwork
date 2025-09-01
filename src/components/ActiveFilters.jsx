export default function ActiveFilters({ categoryLabel, locationLabel, search, onClearCategory, onClearLocation, onClearSearch, onClearAll }) {
  const pills = [];
  if (categoryLabel) pills.push({ type: "category", label: categoryLabel, onClear: onClearCategory });
  if (locationLabel) pills.push({ type: "location", label: locationLabel, onClear: onClearLocation });
  if (search) pills.push({ type: "search", label: `"${search}"`, onClear: onClearSearch });

  if (pills.length === 0) return null;

  return (
    <div className="active-filters" aria-label="Active filters">
      {pills.map(p => (
        <button
          key={p.type}
            className={`filter-pill pill-${p.type}`}
            onClick={p.onClear}
            aria-label={`Remove ${p.type} filter ${p.label}`}
        >
          {p.label}
          <span aria-hidden="true" className="pill-x">×</span>
        </button>
      ))}
      {pills.length > 1 && (
        <button
          className="filter-pill pill-clear-all"
          onClick={onClearAll}
          aria-label="Clear all filters"
        >
          Clear All
        </button>
      )}
    </div>
  );
}