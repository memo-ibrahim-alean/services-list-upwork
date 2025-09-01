export default function StatCard({ label, value, sub }) {
  return (
    <div className="adm-stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}