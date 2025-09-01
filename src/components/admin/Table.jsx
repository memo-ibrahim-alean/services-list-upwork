export default function Table({ columns, rows, keyField = "id", emptyMessage = "No data", actions }) {
  return (
    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            {columns.map(c => <th key={c.key} style={c.style}>{c.label}</th>)}
            {actions && <th style={{ width: "90px" }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="empty-cell">
                {emptyMessage}
              </td>
            </tr>
          )}
          {rows.map(r => (
            <tr key={r[keyField]}>
              {columns.map(c => (
                <td key={c.key}>
                  {typeof c.render === "function" ? c.render(r) : r[c.key]}
                </td>
              ))}
              {actions && (
                <td className="row-actions">
                  {actions.map(a => (
                    <button
                      key={a.label}
                      className={"btn tiny " + (a.variant || "outline")}
                      onClick={() => a.onClick(r)}
                      title={a.label}
                    >
                      {a.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}