import { getSubgroupsByGroup, findSubgroup } from "../../data/taxonomyUtils.js";

export default function StepSubgroup({ groupId, current, onSelect, onBack }) {
  const subs = getSubgroupsByGroup(groupId);

  return (
    <div className="narrow-step">
      <h3 className="step-title">2. Subgroup</h3>
      <p className="step-sub">Select a subgroup or skip to include all in the group.</p>
      <div className="subgroup-grid">
        {subs.map(s => {
          const active = current === s.id;
          return (
            <button
              key={s.id}
              className={`sub-card ${active ? "active" : ""}`}
              onClick={() => onSelect(s.id)}
              title={s.examples?.join(", ")}
            >
              <span className="sub-label">{s.label}</span>
              {s.examples?.length && (
                <span className="sub-examples">
                  {s.examples.slice(0, 3).join(", ")}
                  {s.examples.length > 3 && "..."}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="wizard-actions-row">
        <button className="btn outline tiny" onClick={onBack}>Back</button>
        <button
          className="btn tiny"
          onClick={() => onSelect("")}
          title="Skip subgroup (show all subgroups in the group)"
        >
          Skip Subgroup
        </button>
      </div>
    </div>
  );
}