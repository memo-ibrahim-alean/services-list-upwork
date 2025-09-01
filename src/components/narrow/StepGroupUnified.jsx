import { groupsForTypes } from "../../data/taxonomyUtils.js";

export default function StepGroupUnified({
  allowedTypeIds,
  currentGroupId,
  onSelectGroup,
  b2bEnabled
}) {
  const groups = groupsForTypes(allowedTypeIds);

  // Optional: order B2C groups first then B2B for visual clarity
  const ordered = groups.sort((a, b) => {
    if (a.typeId === b.typeId) return a.label.localeCompare(b.label);
    return a.typeId.localeCompare(b.typeId);
  });

  return (
    <div className="narrow-step">
      <h3 className="step-title">1. Choose a Main Group</h3>
      <p className="step-sub">
        {b2bEnabled
          ? "Showing both Personal (B2C) and Business (B2B) groups."
          : "Showing Personal (B2C) groups only. Enable B2B to see more."}
      </p>
      <div className="group-unified-grid">
        {ordered.map(g => {
          const active = currentGroupId === g.id;
            return (
              <button
                key={g.id}
                className={`group-card unified ${active ? "active" : ""}`}
                onClick={() => onSelectGroup(g.id)}
                title={`${g.label} • ${g.typeLabel}`}
              >
                <span className="group-label">{g.label}</span>
                <span className={`group-type-chip type-${g.typeId}`}>
                  {g.typeId === "b2b" ? "B2B" : "B2C"}
                </span>
              </button>
            );
        })}
      </div>
    </div>
  );
}