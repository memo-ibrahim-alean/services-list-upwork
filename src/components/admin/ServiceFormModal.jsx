import { useState, useEffect } from "react";
import { flattenSubgroups } from "../../data/taxonomyUtils.js";
import { useAdminData } from "../../state/adminContext.jsx";
import { useToasts } from "../toast/ToastContext.jsx";

export default function ServiceFormModal({ open, onClose, editItem }) {
  const { addService, editService, services } = useAdminData();
  const { pushToast } = useToasts();
  const subgroups = flattenSubgroups();

  const [form, setForm] = useState({
    name: "",
    subgroupId: "",
    typeId: "b2c",
    summary: "",
    location: "bogota",
    priceTier: "",
    rating: "",
    tags: ""
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editItem) {
      setForm({
        name: editItem.name,
        subgroupId: editItem.subgroupId,
        typeId: editItem.typeId,
        summary: editItem.summary,
        location: editItem.location,
        priceTier: editItem.priceTier || "",
        rating: editItem.rating || "",
        tags: (editItem.tags || []).join(",")
      });
    } else {
      setForm(prev => ({ ...prev, name: "", summary: "", tags: "" }));
    }
  }, [editItem, open]);

  if (!open) return null;

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Name required";
    if (!form.subgroupId) return "Subgroup required";
    if (!form.typeId) return "Type required";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;
    const v = validate();
    if (v) { setError(v); return; }
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: form.name,
        subgroupId: form.subgroupId,
        summary: form.summary,
        typeId: form.typeId,
        location: form.location,
        priceTier: form.priceTier,
        rating: form.rating ? Number(form.rating) : null,
        tags: form.tags.split(",").map(t => t.trim()).filter(Boolean)
      };
      if (editItem) {
        await editService(editItem.id, payload);
        pushToast({ type: "success", message: "Service updated" });
      } else {
        await addService(payload);
        pushToast({ type: "success", message: "Service created" });
      }
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onMouseDown={(e) => {
      if (e.target.classList.contains("modal-overlay")) onClose();
    }}>
      <div className="modal">
        <h3>{editItem ? "Edit Service" : "Add Service"}</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <label>
              <span>Name</span>
              <input
                value={form.name}
                onChange={e => update("name", e.target.value)}
                placeholder="Service name"
                autoFocus
              />
            </label>
            <label>
              <span>Type</span>
              <select
                value={form.typeId}
                onChange={e => update("typeId", e.target.value)}
              >
                <option value="b2c">B2C</option>
                <option value="b2b">B2B</option>
              </select>
            </label>
            <label>
              <span>Subgroup</span>
              <select
                value={form.subgroupId}
                onChange={e => update("subgroupId", e.target.value)}
              >
                <option value="">-- choose --</option>
                {subgroups
                  .filter(sg => sg.typeId === form.typeId)
                  .map(sg => (
                    <option key={sg.id} value={sg.id}>
                      {sg.groupLabel} / {sg.label}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              <span>Location</span>
              <input
                value={form.location}
                onChange={e => update("location", e.target.value)}
                placeholder="bogota"
              />
            </label>
            <label>
              <span>Price Tier</span>
              <input
                value={form.priceTier}
                onChange={e => update("priceTier", e.target.value)}
                placeholder="$, $$ or $$$"
              />
            </label>
            <label>
              <span>Rating</span>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={form.rating}
                onChange={e => update("rating", e.target.value)}
              />
            </label>
            <label className="full">
              <span>Summary</span>
              <textarea
                rows={3}
                value={form.summary}
                onChange={e => update("summary", e.target.value)}
                placeholder="Short description"
              />
            </label>
            <label className="full">
              <span>Tags (comma separated)</span>
              <input
                value={form.tags}
                onChange={e => update("tags", e.target.value)}
                placeholder="eco, 24/7"
              />
            </label>
          </div>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button
              type="button"
              className="btn outline tiny"
              onClick={onClose}
              disabled={saving}
            >Cancel</button>
            <button className="btn tiny" disabled={saving}>
              {saving ? "Saving..." : (editItem ? "Save Changes" : "Create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}