import SearchBar from "../SearchBar.jsx";
import SortSelect from "../SortSelect.jsx";
import ServiceList from "../ServiceList.jsx";
import ActiveFilters from "../ActiveFilters.jsx";
import { findSubgroup, getGroupsByType, getType } from "../../data/taxonomyUtils.js";

export default function StepRefineHierarchy({
  groupId,
  subgroupId,
  search,
  onSearch,
  sort,
  onSort,
  services,
  filtered,
  onBackGroup,
  onBackSubgroup,
  onResetWizard,
  loading
}) {
  // We infer type via subgroup OR group
  let subgroup = subgroupId ? findSubgroup(subgroupId) : null;
  let groupType = null;
  if (!subgroup) {
    // need group to determine type
    // This is a bit indirect; you can store group object earlier if you want
  }

  const activePath = [
    subgroup?.typeLabel || "",
    subgroup?.groupLabel || "",
    subgroup?.label || ""
  ].filter(Boolean).join(" / ");

  return (
    <div className="narrow-step">
      <h3 className="step-title">3. Refine & Results</h3>
      {activePath && <p className="step-sub">{activePath}</p>}

      <div className="hier-breadcrumbs">
        <button className="crumb" onClick={onBackGroup}>Group</button>
        {subgroup && (
          <>
            <span className="crumb-sep">›</span>
            <button className="crumb" onClick={onBackSubgroup}>{subgroup.label}</button>
          </>
        )}
      </div>

      <SearchBar value={search} onChange={onSearch} variant="pill" />

      <div className="refine-controls">
        <SortSelect value={sort} onChange={onSort} />
        <span className="refine-count" aria-live="polite">
          {filtered.length} service{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <ServiceList services={filtered} highlight={search} loading={loading} />

      <div className="reset-wizard">
        <button className="btn outline tiny" onClick={onResetWizard}>Start Over</button>
      </div>

      <ActiveFilters
        categoryLabel={subgroup?.label}
        locationLabel={null}
        search={search}
        onClearCategory={() => onBackSubgroup()}
        onClearLocation={() => {}}
        onClearSearch={() => onSearch("")}
        onClearAll={onResetWizard}
      />
    </div>
  );
}