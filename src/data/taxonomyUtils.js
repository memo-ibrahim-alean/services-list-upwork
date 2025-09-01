import { taxonomy } from "./taxonomy.js";

// (Existing exports unchanged – KEEP them if already present)
// Added helper to collect groups for multiple types.
export function groupsForTypes(typeIds) {
  const set = new Set(typeIds);
  const out = [];
  taxonomy.forEach(t => {
    if (!set.has(t.id)) return;
    t.groups.forEach(g => {
      out.push({
        ...g,
        typeId: t.id,
        typeLabel: t.label
      });
    });
  });
  return out;
}

// The rest of your previously defined functions (flattenSubgroups, findSubgroup, etc.)
// should remain below. If they already exist, do not duplicate them.

export function flattenSubgroups() {
  const list = [];
  taxonomy.forEach(t => {
    t.groups.forEach(g => {
      g.subgroups.forEach(sg => {
        list.push({
          ...sg,
          typeId: t.id,
          typeLabel: t.label,
          groupId: g.id,
          groupLabel: g.label
        });
      });
    });
  });
  return list;
}

export function findSubgroup(id) {
  return flattenSubgroups().find(s => s.id === id) || null;
}

export function getGroupsByType(typeId) {
  const type = taxonomy.find(t => t.id === typeId);
  return type ? type.groups : [];
}

export function getSubgroupsByGroup(groupId) {
  return flattenSubgroups().filter(s => s.groupId === groupId);
}

export function getType(id) {
  return taxonomy.find(t => t.id === id) || null;
}

export function allTypes() {
  return taxonomy.map(t => ({ id: t.id, label: t.label }));
}