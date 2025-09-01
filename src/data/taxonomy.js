// Hierarchical taxonomy derived from spreadsheet (Type -> Main Group -> Subgroup)
export const taxonomy = [
  {
    id: "b2c",
    label: "B2C (+B2B)",
    groups: [
      {
        id: "healthcare-wellness",
        label: "Healthcare & Wellness",
        subgroups: [
          {
            id: "medical-services",
            label: "Medical Services",
            examples: ["Doctors", "Specialists", "Hospitals", "Telemedicine"]
          },
            {
            id: "mental-health",
            label: "Mental Health",
            examples: ["Therapists", "Psychologists", "Counselors"]
          },
          {
            id: "pharmacy-medication",
            label: "Pharmacy & Medication",
            examples: ["Pharmacies", "Prescription Delivery"]
          },
          {
            id: "fitness-wellbeing",
            label: "Fitness & Wellbeing",
            examples: ["Gyms", "Trainers", "Yoga", "Nutritionists"]
          }
        ]
      },
      {
        id: "legal-compliance",
        label: "Legal & Compliance",
        subgroups: [
          {
            id: "personal-legal",
            label: "Personal Legal",
            examples: ["Lawyers", "Notaries", "Family Law"]
          },
          {
            id: "compliance-verification",
            label: "Compliance & Verification",
            examples: ["Background Checks", "Certifications"]
          }
        ]
      },
      {
        id: "finance-insurance",
        label: "Finance & Insurance",
        subgroups: [
          {
            id: "personal-finance",
            label: "Personal Finance",
            examples: ["Tax Advisors", "Accountants", "Financial Coaches"]
          },
          {
            id: "banking-payments",
            label: "Banking & Payments",
            examples: ["Banks", "Payment Providers", "Credit Services"]
          },
          {
            id: "insurance",
            label: "Insurance",
            examples: ["Health", "Auto", "Property Insurance"]
          }
        ]
      },
      {
        id: "education-training",
        label: "Education & Training",
        subgroups: [
          {
            id: "formal-education",
            label: "Formal Education",
            examples: ["Schools", "Colleges", "Universities"]
          },
          {
            id: "tutoring-courses",
            label: "Tutoring & Courses",
            examples: ["Tutors", "Online Learning", "Test Prep"]
          },
          {
            id: "professional-development",
            label: "Professional Development",
            examples: ["Career Coaches", "Mentors"]
          }
        ]
      },
      {
        id: "child-elder-care",
        label: "Child & Elder Care",
        subgroups: [
          {
            id: "childcare",
            label: "Childcare",
            examples: ["Babysitters", "Nannies", "Daycare"]
          },
          {
            id: "elderly-care",
            label: "Elderly Care",
            examples: ["Home Nurses", "Caregivers"]
          },
          {
            id: "special-needs",
            label: "Special Needs",
            examples: ["Disability Care", "Support Services"]
          }
        ]
      },
      {
        id: "personal-care-beauty",
        label: "Personal Care & Beauty",
        subgroups: [
          {
            id: "hair-grooming",
            label: "Hair & Grooming",
            examples: ["Barbers", "Hairdressers", "Makeup Artists"]
          },
          {
            id: "spa-wellness",
            label: "Spa & Wellness",
            examples: ["Massage", "Spa Services"]
          },
          {
            id: "cosmetic",
            label: "Cosmetic",
            examples: ["Dermatology", "Aesthetic Clinics"]
          }
        ]
      },
      {
        id: "food-retail",
        label: "Food & Retail",
        subgroups: [
          {
            id: "food-beverage",
            label: "Food & Beverage",
            examples: ["Restaurants", "Cafes", "Fruit Stores", "Grocery Shops"]
          },
          {
            id: "retail-shopping",
            label: "Retail Shopping",
            examples: ["Clothing", "Electronics", "Furniture", "Books"]
          },
          {
            id: "delivery-services",
            label: "Delivery Services",
            examples: ["Food Delivery", "Grocery Delivery"]
          }
        ]
      },
      {
        id: "home-living",
        label: "Home & Living",
        subgroups: [
          {
            id: "maintenance-repairs",
            label: "Maintenance & Repairs",
            examples: ["Plumbers", "Electricians", "HVAC"]
          },
          {
            id: "household-services",
            label: "Household Services",
            examples: ["Cleaners", "Laundry", "Housekeepers"]
          },
          {
            id: "outdoor-services",
            label: "Outdoor Services",
            examples: ["Gardeners", "Landscapers", "Pool Maintenance"]
          }
        ]
      },
      {
        id: "housing-real-estate",
        label: "Housing & Real Estate",
        subgroups: [
          {
            id: "property-services",
            label: "Property Services",
            examples: ["Real Estate Agents", "Property Managers"]
          },
          {
            id: "construction-renovation",
            label: "Construction & Renovation",
            examples: ["Builders", "Contractors", "Interior Designers"]
          }
        ]
      },
      {
        id: "transport-mobility",
        label: "Transport & Mobility",
        subgroups: [
          {
            id: "passenger-transport",
            label: "Passenger Transport",
            examples: ["Taxi", "Ride-hailing", "Chauffeurs"]
          },
          {
            id: "vehicle-services",
            label: "Vehicle Services",
            examples: ["Car Repair", "Car Wash"]
          },
          {
            id: "logistics-delivery",
            label: "Logistics & Delivery",
            examples: ["Courier", "Moving Services"]
          }
        ]
      },
      {
        id: "hospitality-travel",
        label: "Hospitality & Travel",
        subgroups: [
          {
            id: "accommodation",
            label: "Accommodation",
            examples: ["Hotels", "Hostels", "Guesthouses"]
          },
          {
            id: "travel-services",
            label: "Travel Services",
            examples: ["Travel Agencies", "Tour Guides"]
          },
          {
            id: "events",
            label: "Events",
            examples: ["Event Venues", "Banquet Halls"]
          }
        ]
      },
      {
        id: "arts-entertainment",
        label: "Arts & Entertainment",
        subgroups: [
          {
            id: "cultural-services",
            label: "Cultural Services",
            examples: ["Theaters", "Museums", "Galleries"]
          },
          {
            id: "media-production",
            label: "Media Production",
            examples: ["Photographers", "Videographers"]
          },
          {
            id: "recreation",
            label: "Recreation",
            examples: ["Festivals", "Artists", "Musicians"]
          }
        ]
      },
      {
        id: "sports-leisure",
        label: "Sports & Leisure",
        subgroups: [
          {
            id: "sports-facilities",
            label: "Sports Facilities",
            examples: ["Gyms", "Clubs", "Sports Arenas"]
          },
          {
            id: "outdoor-adventure",
            label: "Outdoor & Adventure",
            examples: ["Adventure Guides", "Outdoor Tours"]
          },
          {
            id: "personal-training",
            label: "Personal Training",
            examples: ["Coaches", "Fitness Trainers"]
          }
        ]
      },
      {
        id: "pets-animals",
        label: "Pets & Animals",
        subgroups: [
          {
            id: "veterinary",
            label: "Veterinary",
            examples: ["Veterinarians", "Animal Clinics"]
          },
          {
            id: "pet-services",
            label: "Pet Services",
            examples: ["Grooming", "Boarding", "Training"]
          },
          {
            id: "pet-retail",
            label: "Pet Retail",
            examples: ["Pet Stores", "Food Suppliers"]
          }
        ]
      },
      {
        id: "community-public",
        label: "Community & Public",
        subgroups: [
          {
            id: "religious-community",
            label: "Religious & Community",
            examples: ["Churches", "Temples", "Community Centers"]
          },
          {
            id: "charities-ngos",
            label: "Charities & NGOs",
            examples: ["Nonprofits", "Aid Organizations"]
          },
          {
            id: "government-services",
            label: "Government Services",
            examples: ["Licensing", "Permits", "Social Services"]
          }
        ]
      }
    ]
  },
  {
    id: "b2b",
    label: "B2B",
    groups: [
      {
        id: "corporate-professional",
        label: "Corporate & Professional",
        subgroups: [
          {
            id: "consulting",
            label: "Consulting",
            examples: ["Business Consultants", "Strategy Advisors"]
          },
          {
            id: "hr-staffing",
            label: "HR & Staffing",
            examples: ["Recruitment", "Payroll", "Outsourcing"]
          },
          {
            id: "auditing-tax",
            label: "Auditing & Tax",
            examples: ["Auditors", "Corporate Tax Specialists"]
          }
        ]
      },
      {
        id: "technology-it",
        label: "Technology & IT",
        subgroups: [
          {
            id: "software-development",
            label: "Software Development",
            examples: ["Web", "Mobile", "Enterprise Development"]
          },
          {
            id: "it-infrastructure",
            label: "IT Infrastructure",
            examples: ["Cloud", "Hosting", "System Integration"]
          },
          {
            id: "cybersecurity",
            label: "Cybersecurity",
            examples: ["Security Auditors", "Data Privacy Specialists"]
          }
        ]
      },
      {
        id: "marketing-growth",
        label: "Marketing & Growth",
        subgroups: [
          {
            id: "digital-marketing",
            label: "Digital Marketing",
            examples: ["SEO", "Social Media", "Content Marketing"]
          },
          {
            id: "pr-branding",
            label: "PR & Branding",
            examples: ["PR Agencies", "Branding Consultants"]
          },
          {
            id: "market-research",
            label: "Market Research",
            examples: ["Analytics Firms", "Research Agencies"]
          }
        ]
      },
      {
        id: "logistics-supply-chain",
        label: "Logistics & Supply Chain",
        subgroups: [
          {
            id: "transport-freight",
            label: "Transport & Freight",
            examples: ["Freight Forwarders", "Trucking", "Shipping"]
          },
          {
            id: "warehousing",
            label: "Warehousing",
            examples: ["Storage", "Cold Chain Logistics"]
          },
          {
            id: "procurement",
            label: "Procurement",
            examples: ["Sourcing Specialists", "Supply Chain Consultants"]
          }
        ]
      },
      {
        id: "manufacturing-industrial",
        label: "Manufacturing & Industrial",
        subgroups: [
          {
            id: "production-services",
            label: "Production Services",
            examples: ["Factories", "Fabrication", "Prototyping"]
          },
          {
            id: "industrial-support",
            label: "Industrial Support",
            examples: ["Machinery Repair", "Engineering Services"]
          }
        ]
      },
      {
        id: "agriculture-production",
        label: "Agriculture & Production",
        subgroups: [
          {
            id: "farming-food-production",
            label: "Farming & Food Production",
            examples: ["Farms", "Fisheries", "Food Factories"]
          },
          {
            id: "agricultural-services",
            label: "Agricultural Services",
            examples: ["Machinery Leasing", "Irrigation Services"]
          }
        ]
      },
      {
        id: "construction-infrastructure",
        label: "Construction & Infrastructure",
        subgroups: [
          {
            id: "large-scale-projects",
            label: "Large Scale Projects",
            examples: ["Commercial Construction", "Civil Engineering"]
          },
          {
            id: "industrial-design",
            label: "Industrial Design",
            examples: ["Architectural & Infrastructure Firms"]
          }
        ]
      },
      {
        id: "energy-utilities",
        label: "Energy & Utilities",
        subgroups: [
          {
            id: "energy-providers",
            label: "Energy Providers",
            examples: ["Renewable Energy", "Power Plants"]
          },
          {
            id: "waste-water-management",
            label: "Waste & Water Management",
            examples: ["Waste Disposal", "Water Treatment"]
          }
        ]
      },
      {
        id: "research-development",
        label: "Research & Development",
        subgroups: [
          {
            id: "innovation",
            label: "Innovation",
            examples: ["R&D Firms", "Labs", "Product Development"]
          },
          {
            id: "think-tanks",
            label: "Think Tanks",
            examples: ["Policy Research", "Market Intelligence"]
          }
        ]
      }
    ]
  }
];