import { locations } from "../data/data.js";

export default function FiltersPanel({
  location,
  onChangeLocation,
  resultsText,
  children // place for sort control on right
}) {
  return (
    <div className="filters-panel refined">
      <div className="filter-cluster">
        <div className="filter-group compact">
          <label htmlFor="locationSel">Location</label>
          <select
            id="locationSel"
            value={location}
            onChange={(e) => onChangeLocation(e.target.value)}
          >
            <option value="">All</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="filters-spacer" />
      <div className="filters-right">
        {children}
        <div className="filter-stats" aria-live="polite">{resultsText}</div>
      </div>
    </div>
  );
}