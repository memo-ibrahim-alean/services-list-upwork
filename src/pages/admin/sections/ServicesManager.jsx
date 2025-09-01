import { useState, useMemo } from "react";
import { useAdminData } from "../../../state/adminContext.jsx";
import Table from "../../../components/admin/Table.jsx";
import ServiceFormModal from "../../../components/admin/ServiceFormModal.jsx";
import { useToasts } from "../../../components/toast/ToastContext.jsx";

export default function ServicesManager() {
  const { services, loading, removeService } = useAdminData();
  const { pushToast } = useToasts();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sort, setSort] = useState("name-asc");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = useMemo(() => {
    let list = services;
    if (typeFilter !== "all") {
      list = list.filter(s => s.typeId === typeFilter);
    }
    if (search) {
      const t = search.toLowerCase();
      list = list.filter(s =>
        s.name.toLowerCase().includes(t) ||
        s.summary.toLowerCase().includes(t)
      );
    }
    switch (sort) {
      case "name-desc":
        list = [...list].sort((a,b) => b.name.localeCompare(a.name));
        break;
      case "created-desc":
        list = [...list].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "created-asc":
        list = [...list].sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [services, search, typeFilter, sort]);

  const columns = [
    { key: "name", label: "Name", render: r => <span className="cell-strong">{r.name}</span> },
    { key: "typeId", label: "Type", render: r => <span className={`badge sm ${r.typeId}`}>{r.typeId.toUpperCase()}</span>, style: { width: "60px" } },
    { key: "subgroupId", label: "Subgroup" },
    { key: "location", label: "Loc", style: { width: "60px" } },
    { key: "createdAt", label: "Created", render: r => new Date(r.createdAt).toLocaleDateString(), style: { width: "100px" } }
  ];

  function openCreate() {
    setEditItem(null);
    setModalOpen(true);
  }
  function openEdit(row) {
    setEditItem(row);
    setModalOpen(true);
  }
  async function performDelete(row) {
    await removeService(row.id);
    pushToast({ type: "info", message: "Service deleted" });
    setConfirmDelete(null);
  }

  return (
    <div className="adm-pg">
      <h2 className="adm-title">Services</h2>
      <div className="toolbar">
        <div className="inputs">
          <input
            className="adm-input"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="adm-input"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="b2c">B2C</option>
            <option value="b2b">B2B</option>
          </select>
          <select
            className="adm-input"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="created-desc">Newest First</option>
            <option value="created-asc">Oldest First</option>
          </select>
        </div>
        <div className="actions">
          <button className="btn tiny" onClick={openCreate}>Add</button>
        </div>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <Table
          columns={columns}
            rows={filtered}
            actions={[
              { label: "Edit", onClick: openEdit, variant: "outline" },
              { label: "Del", onClick: (r) => setConfirmDelete(r), variant: "danger" }
            ]}
        />
      )}

      <p className="table-meta">{filtered.length} of {services.length}</p>

      <ServiceFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editItem={editItem}
      />

      {confirmDelete && (
        <div className="modal-overlay" onMouseDown={e => {
          if (e.target.classList.contains("modal-overlay")) setConfirmDelete(null);
        }}>
          <div className="modal small">
            <h3>Delete Service</h3>
            <p>Are you sure you want to delete <strong>{confirmDelete.name}</strong>?</p>
            <div className="modal-actions">
              <button className="btn outline tiny" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn tiny danger" onClick={() => performDelete(confirmDelete)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}