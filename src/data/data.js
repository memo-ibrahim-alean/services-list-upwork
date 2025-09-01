// Added stable sort order assumption (no change to content except maybe reorder if desired)
export const categories = [
  { id: "plumber", label: "Plumber", icon: "🔧", color: "#2563eb" },
  { id: "electrician", label: "Electrician", icon: "⚡", color: "#f59e0b" },
  { id: "lawyer", label: "Lawyer", icon: "⚖️", color: "#7c3aed" },
  { id: "it-support", label: "IT Support", icon: "💻", color: "#059669" },
  { id: "accountant", label: "Accountant", icon: "📊", color: "#0d9488" },
  { id: "cleaning", label: "Cleaning", icon: "🧹", color: "#db2777" }
];

export const locations = [
  { id: "bogota", label: "Bogotá" },
  { id: "medellin", label: "Medellín" },
  { id: "cali", label: "Cali" },
  { id: "barranquilla", label: "Barranquilla" },
  { id: "cartagena", label: "Cartagena" }
];

export const initialServices = [
  { id: "SVC-1001", name: "RapidFix Plumbing", category: "plumber", location: "bogota", summary: "Emergency pipe & leak repairs." },
  { id: "SVC-1002", name: "Andes Electrical", category: "electrician", location: "medellin", summary: "Residential wiring & panel upgrades." },
  { id: "SVC-1003", name: "LegalWay Associates", category: "lawyer", location: "bogota", summary: "Business & immigration law consultations." },
  { id: "SVC-1004", name: "Cali Tech Helpdesk", category: "it-support", location: "cali", summary: "On-site & remote computer troubleshooting." },
  { id: "SVC-1005", name: "CleanPro Medellín", category: "cleaning", location: "medellin", summary: "Office & apartment deep cleaning." },
  { id: "SVC-1006", name: "Contablia Solutions", category: "accountant", location: "bogota", summary: "Bookkeeping & tax advisory." },
  { id: "SVC-1007", name: "Bright Wiring Barranquilla", category: "electrician", location: "barranquilla", summary: "24/7 electrical maintenance." },
  { id: "SVC-1008", name: "Cartagena Coastal Cleaning", category: "cleaning", location: "cartagena", summary: "Vacation rental turnover specialists." }
];