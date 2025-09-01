/**
 * Mock Admin Service API (localStorage backed)
 * Provides CRUD for services + audit log.
 */
const LS_KEY_SERVICES = "admin_services";
const LS_KEY_AUDIT = "admin_audit";
const SEED_FLAG = "admin_seeded_v1";

function load(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function nowISO() {
  return new Date().toISOString();
}

export function seedIfEmpty(seedFn) {
  if (localStorage.getItem(SEED_FLAG)) return;
  const existing = load(LS_KEY_SERVICES);
  if (existing.length === 0) {
    const seed = seedFn();
    save(LS_KEY_SERVICES, seed);
  }
  localStorage.setItem(SEED_FLAG, "1");
}

export async function fetchServices() {
  return load(LS_KEY_SERVICES);
}

export async function createService(data, actor = "admin") {
  const list = load(LS_KEY_SERVICES);
  const service = {
    id: "ADM-" + Date.now().toString(36),
    name: data.name.trim(),
    subgroupId: data.subgroupId,
    location: data.location || "bogota",
    summary: data.summary || "",
    typeId: data.typeId, // "b2c" or "b2b"
    priceTier: data.priceTier || "",
    rating: data.rating || null,
    tags: data.tags || [],
    createdAt: nowISO(),
    updatedAt: nowISO()
  };
  list.push(service);
  save(LS_KEY_SERVICES, list);
  logAudit({
    action: "create",
    entity: "service",
    entityId: service.id,
    metadata: { name: service.name },
    actor
  });
  return service;
}

export async function updateService(id, updates, actor = "admin") {
  const list = load(LS_KEY_SERVICES);
  const idx = list.findIndex(s => s.id === id);
  if (idx === -1) throw new Error("Service not found");
  const prev = list[idx];
  const next = {
    ...prev,
    ...updates,
    name: updates.name?.trim() || prev.name,
    updatedAt: nowISO()
  };
  list[idx] = next;
  save(LS_KEY_SERVICES, list);
  logAudit({
    action: "update",
    entity: "service",
    entityId: id,
    metadata: { name: next.name },
    actor
  });
  return next;
}

export async function deleteService(id, actor = "admin") {
  const list = load(LS_KEY_SERVICES);
  const idx = list.findIndex(s => s.id === id);
  if (idx === -1) return false;
  const [removed] = list.splice(idx, 1);
  save(LS_KEY_SERVICES, list);
  logAudit({
    action: "delete",
    entity: "service",
    entityId: id,
    metadata: { name: removed.name },
    actor
  });
  return true;
}

export async function fetchAuditLog(limit = 200) {
  return load(LS_KEY_AUDIT).slice(-limit).reverse();
}

function logAudit(entry) {
  const log = load(LS_KEY_AUDIT);
  log.push({
    id: "AUD-" + Date.now().toString(36),
    ts: nowISO(),
    ...entry
  });
  save(LS_KEY_AUDIT, log);
}