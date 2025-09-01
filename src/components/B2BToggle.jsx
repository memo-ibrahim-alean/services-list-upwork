export default function B2BToggle({ enabled, onChange }) {
  return (
    <label className="b2b-toggle">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        role="switch"
        aria-checked={enabled}
        aria-label={`Include B2B services (${enabled ? "enabled" : "disabled"})`}
      />
      <span className="b2b-track" aria-hidden="true">
        <span className="b2b-thumb" />
      </span>
      <span className={`b2b-label ${enabled ? "active" : ""}`}>
        B2B
      </span>
    </label>
  );
}