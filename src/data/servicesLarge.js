import { servicesData as base } from "./services.js"; // if you want to keep your original 8; can remove if not needed

// Helper pools
const companyPrefixes = [
  "Andes", "Pacific", "Orinoco", "Sierra", "Altiplano", "Vertex",
  "Frontier", "Pioneer", "Fusion", "Atlas", "Nexus", "Lumen",
  "Integral", "Prime", "Apex", "BluePeak", "Eco", "Urban",
  "Heritage", "Nativo", "Nova", "Quantum", "Hyperion", "Cumbre",
  "Verde", "Aurora", "Zenith", "Orbital", "Horizon"
];
const serviceNouns = [
  "Solutions", "Services", "Partners", "Group", "Experts",
  "Advisors", "Clinic", "Studios", "Workshop", "Lab",
  "Systems", "Works", "Collective", "Network", "Dynamics",
  "Logistics", "Consulting", "Management", "Agency", "Center"
];
const adjectives = [
  "Rapid", "Smart", "Elite", "Secure", "Bright", "Dynamic",
  "Reliable", "Premium", "Efficient", "Advanced", "Trusted",
  "Creative", "Agile", "Holistic", "Sustainable", "Innovative",
  "Vibrant", "Essential", "Proactive", "Synergy"
];

// Mapped locations from your earlier file
const locations = ["bogota","medellin","cali","barranquilla","cartagena"];

// Selected subgroups (choose a wide spread)
const subgroupPool = [
  "maintenance-repairs",
  "household-services",
  "personal-legal",
  "personal-finance",
  "software-development",
  "it-infrastructure",
  "digital-marketing",
  "travel-services",
  "accommodation",
  "medical-services",
  "mental-health",
  "pharmacy-medication",
  "fitness-wellbeing",
  "hair-grooming",
  "spa-wellness",
  "cosmetic",
  "food-beverage",
  "retail-shopping",
  "delivery-services",
  "production-services",
  "industrial-support",
  "logistics-delivery",
  "vehicle-services",
  "passenger-transport",
  "construction-renovation",
  "property-services",
  "auditing-tax",
  "consulting",
  "hr-staffing",
  "cybersecurity",
  "media-production",
  "cultural-services",
  "recreation",
  "sports-facilities",
  "outdoor-adventure",
  "personal-training",
  "veterinary",
  "pet-services",
  "pet-retail",
  "religious-community",
  "charities-ngos",
  "government-services",
  "energy-providers",
  "waste-water-management",
  "innovation",
  "think-tanks",
  "farming-food-production",
  "agricultural-services",
  "transport-freight",
  "warehousing",
  "procurement",
  "large-scale-projects",
  "industrial-design"
];

// Simple tag pool
const tagPool = [
  "24/7", "eco", "premium", "budget", "express", "family", "remote",
  "on-site", "certified", "bilingual", "urgent", "subscription"
];

function rand(arr) { return arr[Math.floor(Math.random()*arr.length)]; }
function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function genName() {
  return `${rand(companyPrefixes)} ${rand(adjectives)} ${rand(serviceNouns)}`;
}
function genSummary(sg) {
  return [
    "Professional", "Quality", "Trusted", "Customer‑focused", "Specialized",
    "Reliable", "Affordable", "Comprehensive", "Modern", "Innovative"
  ][randInt(0,9)] + ` ${sg.replace(/-/g," ")} solutions.`;
}
function genPriceTier() {
  return ["$", "$$", "$$$"][randInt(0,2)];
}
function genRating() {
  return +(Math.random()*1.6 + 3.2).toFixed(1); // 3.2–4.8
}
function genTags() {
  const copy = [...tagPool];
  const n = randInt(1,3);
  const out = [];
  for (let i=0;i<n;i++){
    const idx = randInt(0,copy.length-1);
    out.push(copy.splice(idx,1)[0]);
  }
  return out;
}

// Build large dataset
const large = [];
let counter = 2000;
const TARGET = 150; // adjust higher if needed

while (large.length < TARGET) {
  const subgroupId = rand(subgroupPool);
  const location = rand(locations);
  const name = genName();
  const summary = genSummary(subgroupId);
  large.push({
    id: `LSVC-${counter++}`,
    name,
    subgroupId,
    location,
    summary,
    priceTier: genPriceTier(),
    rating: genRating(),
    tags: genTags()
  });
}

// Optionally merge base 8 originals (avoid id collisions)
const servicesLarge = [...base.filter(s => !large.find(l => l.name === s.name)), ...large];

export { servicesLarge };