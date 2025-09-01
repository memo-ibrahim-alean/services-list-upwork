import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  seedIfEmpty,
  fetchServices,
  createService,
  updateService,
  deleteService,
  fetchAuditLog
} from "../api/adminServiceApi.js";
import { servicesLarge } from "../data/servicesLarge.js"; // fallback dataset
import { flattenSubgroups } from "../data/taxonomyUtils.js";

const AdminDataContext = createContext(null);

export function AdminDataProvider({ children }) {
  const [services, setServices] = useState([]);
  const [audit, setAudit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auditLoading, setAuditLoading] = useState(true);

  // Seed initial dataset if empty
  useEffect(() => {
    seedIfEmpty(() => {
      // Map public dataset to include typeId (derive from subgroup)
      const subgroups = flattenSubgroups();
      return servicesLarge.slice(0, 40).map(s => {
        const sg = subgroups.find(x => x.id === s.subgroupId);
        return {
          id: s.id,
          name: s.name,
            subgroupId: s.subgroupId,
            location: s.location || "bogota",
            summary: s.summary,
            typeId: sg?.typeId || "b2c",
            priceTier: s.priceTier || "",
            rating: s.rating || null,
            tags: s.tags || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
      });
    });
  }, []);

  async function loadData() {
    setLoading(true);
    const list = await fetchServices();
    setServices(list);
    setLoading(false);
  }

  async function loadAudit() {
    setAuditLoading(true);
    const log = await fetchAuditLog();
    setAudit(log);
    setAuditLoading(false);
  }

  useEffect(() => {
    loadData();
    loadAudit();
  }, []);

  async function addService(payload) {
    const s = await createService(payload);
    setServices(prev => [...prev, s]);
    loadAudit();
    return s;
  }
  async function editService(id, payload) {
    const s = await updateService(id, payload);
    setServices(prev => prev.map(x => x.id === id ? s : x));
    loadAudit();
    return s;
  }
  async function removeService(id) {
    await deleteService(id);
    setServices(prev => prev.filter(x => x.id !== id));
    loadAudit();
  }

  const stats = useMemo(() => {
    const total = services.length;
    const b2b = services.filter(s => s.typeId === "b2b").length;
    const b2c = services.filter(s => s.typeId === "b2c").length;
    const last = [...services].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    return { total, b2b, b2c, last };
  }, [services]);

  const value = {
    services,
    audit,
    loading,
    auditLoading,
    addService,
    editService,
    removeService,
    reload: loadData,
    reloadAudit: loadAudit,
    stats
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  return useContext(AdminDataContext);
}