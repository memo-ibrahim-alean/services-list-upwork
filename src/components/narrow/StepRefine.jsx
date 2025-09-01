import SearchBar from "../SearchBar.jsx";
import CategoryChips from "../CategoryChips.jsx";
import ServiceList from "../ServiceList.jsx";
import SortSelect from "../SortSelect.jsx";
import ActiveFilters from "../ActiveFilters.jsx";
import { categories, locations } from "../../data/data.js";

export default function StepRefine({
  services,
  category,
  onCategory,
  location,
  onLocationChange,
  search,
  onSearch,
  sort,
  onSort,
  filtered,
  categoryCounts,
  onResetWizard,
  onBackLocation,
  onBackCategory,
  loading
}) {
  const locationLabel = locations.find(l => l.id === location)?.label;
  const categoryLabel = category
    ? categories.find(c => c.id === category)?.label
    : "";

  const resultsText = `${filtered.length} service${filtered.length !== 1 ? "s" : ""}`;

  return (
    <div className="narrow-step">
      <div className="refine-head">
        <h3 className="step-title">3. Refine results</h3>
        <ActiveFilters
          categoryLabel={categoryLabel}
          locationLabel={locationLabel}
          search={search}
          onClearCategory={() => onCategory("")}
          onClearLocation={() => onLocationChange("")}
          onClearSearch={() => onSearch("")}
          onClearAll={onResetWizard}
        />
      </div>

      <div className="wizard-breadcrumbs">
        <button className="crumb" onClick={onBackLocation}>
          Location: <strong>{locationLabel}</strong>
        </button>
        <span className="crumb-sep">›</span>
        <button
          className={`crumb ${!category ? "muted" : ""}`}
          onClick={onBackCategory}
        >
          {categoryLabel ? (
            <>Category: <strong>{categoryLabel}</strong></>
          ) : "All Categories"}
        </button>
      </div>

      <SearchBar value={search} onChange={onSearch} variant="pill" />

      <div className="refine-topbar">
        <CategoryChips
          activeCategory={category}
          onSelect={onCategory}
          counts={categoryCounts}
        />
        <div className="refine-controls">
          <SortSelect value={sort} onChange={onSort} />
          <span className="refine-count" aria-live="polite">{resultsText}</span>
        </div>
      </div>

      <ServiceList
        services={filtered}
        highlight={search}
        loading={loading}
      />

      <div className="reset-wizard">
        <button className="btn outline tiny" onClick={onResetWizard}>
          Start Over
        </button>
      </div>
    </div>
  );
}