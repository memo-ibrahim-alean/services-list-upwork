import { locations } from "../../data/data.js";

export default function StepLocation({
  services,
  onSelect,
  current,
  geoStatus,
  onGeoRequest,
  autoDetected
}) {
  // counts per location
  const counts = locations.reduce((acc, loc) => {
    acc[loc.id] = services.filter(s => s.location === loc.id).length;
    return acc;
  }, {});

  return (
    <div className="narrow-step">
      <h3 className="step-title">1. Choose your location</h3>
      <p className="step-sub">
        We’ll show only services available there.
      </p>

      <div className="location-grid">
        {locations.map(loc => {
          const count = counts[loc.id];
          return (
            <button
              key={loc.id}
              type="button"
              className={`loc-card ${current === loc.id ? "active" : ""}`}
              onClick={() => onSelect(loc.id)}
            >
              <span className="loc-name">{loc.label}</span>
              <span className="loc-count">{count}</span>
              {autoDetected === loc.id && (
                <span className="auto-pill" title="Auto detected">AUTO</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="geo-actions">
        {geoStatus === "idle" && (
          <button className="btn outline tiny" onClick={onGeoRequest}>
            Use My Location
          </button>
        )}
        {geoStatus === "locating" && <span className="geo-status">Detecting…</span>}
        {geoStatus === "denied" && (
          <span className="geo-status warn">
            Location permission denied. You can still choose manually.
          </span>
        )}
        {geoStatus === "error" && (
          <span className="geo-status error">
            Could not detect location.
          </span>
        )}
      </div>
    </div>
  );
}