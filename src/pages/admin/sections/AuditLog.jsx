import { useAdminData } from "../../../state/adminContext.jsx";

export default function AuditLog() {
  const { audit, auditLoading } = useAdminData();

  return (
    <div className="adm-pg">
      <h2 className="adm-title">Audit Log</h2>
      {auditLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="audit-list">
          {audit.length === 0 && <p>No audit entries.</p>}
          {audit.map(a => (
            <div key={a.id} className="audit-row">
              <div className="audit-main">
                <span className={`badge sm action-${a.action}`}>{a.action}</span>
                <strong>{a.metadata?.name || a.entityId}</strong>
              </div>
              <div className="audit-meta">
                <span>{a.entity}</span>
                <span>{new Date(a.ts).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}