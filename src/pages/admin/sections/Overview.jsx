import { useAdminData } from "../../../state/adminContext.jsx";
import StatCard from "../../../components/admin/StatCard.jsx";

export default function Overview() {
  const { stats, loading, services } = useAdminData();

  if (loading) {
    return <div className="adm-pg"><p>Loading services…</p></div>;
  }

  return (
    <div className="adm-pg">
      <h2 className="adm-title">Dashboard Overview</h2>
      <div className="stat-grid">
        <StatCard label="Total Services" value={stats.total} />
        <StatCard label="B2C" value={stats.b2c} sub={`${(stats.b2c / stats.total * 100 || 0).toFixed(1)}%`} />
        <StatCard label="B2B" value={stats.b2b} sub={`${(stats.b2b / stats.total * 100 || 0).toFixed(1)}%`} />
        <StatCard label="Newest" value={stats.last ? stats.last.name.slice(0,18) + (stats.last.name.length>18?"…":"") : "-"} sub={stats.last ? new Date(stats.last.createdAt).toLocaleDateString() : ""} />
      </div>

      <section className="panel">
        <h3>Recent Additions</h3>
        <ul className="recent-list">
          {[...services]
            .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0,6)
            .map(s => (
              <li key={s.id}>
                <span className={`badge sm ${s.typeId}`}>{s.typeId.toUpperCase()}</span>
                {s.name}
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}