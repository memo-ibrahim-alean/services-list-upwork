import { useEffect, useMemo, useState } from "react";
import { servicesLarge as servicesData } from "../data/servicesLarge.js";
import { flattenSubgroups, findSubgroup, groupsForTypes } from "../data/taxonomyUtils.js";
import { usePersistentState } from "../hooks/usePersistentState.js";

import B2BToggle from "../components/B2BToggle.jsx";
import StepGroupUnified from "../components/narrow/StepGroupUnified.jsx";
import StepSubgroup from "../components/narrow/StepSubgroup.jsx";
import StepRefineHierarchy from "../components/narrow/StepRefineHierarchy.jsx";

import ServiceList from "../components/ServiceList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SortSelect from "../components/SortSelect.jsx";
import FiltersPanel from "../components/FiltersPanel.jsx";

const LABELS = {
  step1: "Category",
  step2: "Specification",
  step3: "Services"
};

export default function Browse() {
  const [wizardMode, setWizardMode] = usePersistentState("wizard_mode", true);
  const [b2bEnabled, setB2bEnabled] = usePersistentState("b2b_enabled", false);

  const [groupId, setGroupId] = usePersistentState("g_group", "");
  const [subgroupId, setSubgroupId] = usePersistentState("g_subgroup", "");
  const [search, setSearch] = usePersistentState("g_search", "");
  const [sort, setSort] = usePersistentState("g_sort", "name-asc");

  const [loading, setLoading] = useState(false);

  const subgroups = flattenSubgroups();
  const allowedTypeIds = b2bEnabled ? ["b2c", "b2b"] : ["b2c"];

  // Clear group/subgroup if they belong to a disabled (b2b) type after toggle OFF
  useEffect(() => {
    if (!b2bEnabled && groupId) {
      const groups = groupsForTypes(["b2b"]);
      if (groups.find(g => g.id === groupId)) {
        setGroupId("");
        setSubgroupId("");
      }
    }
    if (!b2bEnabled && subgroupId) {
      const sg = findSubgroup(subgroupId);
      if (sg && sg.typeId === "b2b") {
        setSubgroupId("");
      }
    }
  }, [b2bEnabled, groupId, subgroupId, setGroupId, setSubgroupId]);

  const filtered = useMemo(() => {
    let list = servicesData.filter(s => {
      const sg = subgroups.find(x => x.id === s.subgroupId);
      if (!sg) return false;
      if (!allowedTypeIds.includes(sg.typeId)) return false;
      if (groupId && sg.groupId !== groupId) return false;
      if (subgroupId && s.subgroupId !== subgroupId) return false;
      if (search && !matchesSearch(s, search)) return false;
      return true;
    });
    list = sortServices(list, sort);
    return list;
  }, [servicesData, allowedTypeIds, groupId, subgroupId, search, sort, subgroups]);

  const step = determineStep({ groupId, subgroupId });

  useEffect(() => {
    if (wizardMode && step === 3) {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 350);
      return () => clearTimeout(t);
    }
  }, [wizardMode, step]);

  function resetAll() {
    setGroupId("");
    setSubgroupId("");
    setSearch("");
  }

  // ADVANCED MODE
  if (!wizardMode) {
    return (
      <section className="view browse-view">
        <div className="mode-switch">
          <button
            className="btn tiny outline"
            onClick={() => setWizardMode(true)}
          >
            Wizard Mode
          </button>
        </div>

        <div className="advanced-header">
          <h2>Browse Services</h2>
          <B2BToggle enabled={b2bEnabled} onChange={setB2bEnabled} />
        </div>

        <SearchBar value={search} onChange={setSearch} variant="pill" />
        <div className="advanced-inline-filters">
          <SortSelect value={sort} onChange={setSort} />
          <span className="refine-count" aria-live="polite">
            {filtered.length} results
          </span>
        </div>

        <FiltersPanel
          location={""}
          onChangeLocation={() => {}}
          resultsText={`${filtered.length} / ${servicesData.length}`}
        >
          {/* Future filters */}
        </FiltersPanel>

        <ServiceList services={filtered} highlight={search} loading={loading} />

        <div className="mode-switch-bottom">
          <button className="btn outline tiny" onClick={resetAll}>Reset</button>
        </div>
      </section>
    );
  }

  // WIZARD MODE
  return (
    <section className="view browse-view wizard-mode">
      <div className="mode-switch top-right">
        <button
          className="btn tiny outline"
          onClick={() => setWizardMode(false)}
        >
          Advanced Mode
        </button>
      </div>

      <div className="wizard-top-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <WizardProgress step={step} />
        <B2BToggle enabled={b2bEnabled} onChange={setB2bEnabled} />
      </div>

      {step === 1 && (
        <StepGroupUnified
          allowedTypeIds={allowedTypeIds}
          currentGroupId={groupId}
          onSelectGroup={(id) => {
            setGroupId(id);
            setSubgroupId("");
          }}
          b2bEnabled={b2bEnabled}
          // Make sure inside this component any visible text says "Category"
        />
      )}

      {step === 2 && (
        <StepSubgroup
          groupId={groupId}
            current={subgroupId}
          onSelect={(id) => setSubgroupId(id)}
          onBack={() => {
            setGroupId("");
            setSubgroupId("");
          }}
          // Ensure labels inside are changed to "Specification"
        />
      )}

      {step === 3 && (
        <StepRefineHierarchy
          groupId={groupId}
          subgroupId={subgroupId}
          search={search}
          onSearch={setSearch}
          sort={sort}
          onSort={setSort}
          services={servicesData}
          filtered={filtered}
          onBackGroup={() => {
            setGroupId("");
            setSubgroupId("");
          }}
          onBackSubgroup={() => setSubgroupId("")}
          onResetWizard={resetAll}
          loading={loading}
          // Update heading / labels inside to "Services"
        />
      )}
    </section>
  );
}

// FIXED: simpler & correct step logic
function determineStep({ groupId, subgroupId }) {
  if (!groupId) return 1;
  if (!subgroupId) return 2;
  return 3;
}

function matchesSearch(service, term) {
  if (!term) return true;
  const t = term.toLowerCase();
  return (
    service.name.toLowerCase().includes(t) ||
    service.summary.toLowerCase().includes(t)
  );
}

function sortServices(list, mode) {
  const copy = [...list];
  switch (mode) {
    case "name-desc":
      copy.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "category": // (This still sorts by subgroup/category id)
      copy.sort((a, b) => a.subgroupId.localeCompare(b.subgroupId));
      break;
    default:
      copy.sort((a, b) => a.name.localeCompare(b.name));
  }
  return copy;
}

// Progress display (non-clickable)
function WizardProgress({ step }) {
  const steps = [
    { n: 1, label: LABELS.step1 },
    { n: 2, label: LABELS.step2 },
    { n: 3, label: LABELS.step3 }
  ];
  return (
    <div className="wizard-progress" aria-label="Progress">
      {steps.map(s => (
        <div
          key={s.n}
          className={`wiz-node ${step === s.n ? "active" : step > s.n ? "done" : ""}`}
          aria-current={step === s.n ? "step" : undefined}
        >
          <span className="wiz-index">{s.n}</span>
          <span className="wiz-label">{s.label}</span>
        </div>
      ))}
      <div className="wiz-bar">
        <div
          className="wiz-fill"
          style={{ width: `${(step - 1) / (steps.length - 1) * 100}%` }}
        />
      </div>
    </div>
  );
}