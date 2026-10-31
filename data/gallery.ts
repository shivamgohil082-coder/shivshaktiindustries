export interface GalleryItem {
  id: number;
  title: string;
  category:
    | "Factory"
    | "Machines"
    | "Products"
    | "Inspection"
    | "Team"
    | "Warehouse";

  image: string;
  description: string;
  featured: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Modern SSIpro Facility",
    category: "Factory",
    image: "/images/gallery/factory-1.jpg",
    description:
      "Complete view of our advanced SSIpro machining facility.",
    featured: true,
  },

  {
    id: 2,
    title: "Production Area",
    category: "Factory",
    image: "/images/gallery/factory-2.jpg",
    description:
      "Organized production floor with multiple machining centers.",
    featured: true,
  },

  {
    id: 3,
    title: "SSIpro Turning Center",
    category: "Machines",
    image: "/images/gallery/machine-1.jpg",
    description:
      "High precision SSIpro turning machine.",
    featured: true,
  },

  {
    id: 4,
    title: "Vertical Machining Center",
    category: "Machines",
    image: "/images/gallery/machine-2.jpg",
    description:
      "Advanced VMC for complex machining operations.",
    featured: false,
  },

  {
    id: 5,
    title: "5 Axis SSIpro Machine",
    category: "Machines",
    image: "/images/gallery/machine-3.jpg",
    description:
      "Multi-axis machining for intricate components.",
    featured: true,
  },

  {
    id: 6,
    title: "Finished Shaft",
    category: "Products",
    image: "/images/gallery/product-1.jpg",
    description:
      "Precision machined transmission shaft.",
    featured: true,
  },

  {
    id: 7,
    title: "Aluminium Housing",
    category: "Products",
    image: "/images/gallery/product-2.jpg",
    description:
      "SSIpro milled aluminium enclosure.",
    featured: true,
  },

  {
    id: 8,
    title: "Bearing Block",
    category: "Products",
    image: "/images/gallery/product-3.jpg",
    description:
      "Industrial bearing housing block.",
    featured: false,
  },

  {
    id: 9,
    title: "Medical Component",
    category: "Products",
    image: "/images/gallery/product-4.jpg",
    description:
      "High precision medical connector.",
    featured: true,
  },

  {
    id: 10,
    title: "CMM Inspection",
    category: "Inspection",
    image: "C:\\cnc-machining-demo\\public\\images\\gallery\\Advanced-CMM-Technology-Boosts-Inspection-Precision-and-Productivity.jpg",
    description:
      "Coordinate Measuring Machine quality inspection.",
    featured: true,
  },

  {
    id: 11,
    title: "Surface Finish Testing",
    category: "Inspection",
    image: "/images/gallery/inspection-2.jpg",
    description:
      "Surface roughness inspection process.",
    featured: false,
  },

  {
    id: 12,
    title: "Dimensional Verification",
    category: "Inspection",
    image: "/images/gallery/inspection-3.jpg",
    description:
      "Precision dimensional measurement.",
    featured: false,
  },

  {
    id: 13,
    title: "Engineering Team",
    category: "Team",
    image: "/images/gallery/team-1.jpg",
    description:
      "Experienced manufacturing engineers.",
    featured: true,
  },

  {
    id: 14,
    title: "Production Staff",
    category: "Team",
    image: "/images/gallery/team-2.jpg",
    description:
      "Skilled SSIpro machine operators.",
    featured: false,
  },

  {
    id: 15,
    title: "Packing Area",
    category: "Warehouse",
    image: "/images/gallery/warehouse-1.jpg",
    description:
      "Secure packaging before dispatch.",
    featured: false,
  },

  {
    id: 16,
    title: "Finished Goods Storage",
    category: "Warehouse",
    image: "/images/gallery/warehouse-2.jpg",
    description:
      "Organized warehouse for ready components.",
    featured: false,
  },

  {
    id: 17,
    title: "Raw Material Storage",
    category: "Warehouse",
    image: "/images/gallery/warehouse-3.jpg",
    description:
      "Steel, aluminium and alloy inventory.",
    featured: false,
  },

  {
    id: 18,
    title: "Robot Arm Component",
    category: "Products",
    image: "/images/gallery/product-5.jpg",
    description:
      "Precision robotic arm mounting bracket.",
    featured: true,
  },

  {
    id: 19,
    title: "Hydraulic Manifold",
    category: "Products",
    image: "/images/gallery/product-6.jpg",
    description:
      "Complex hydraulic manifold block.",
    featured: true,
  },

  {
    id: 20,
    title: "Final Quality Inspection",
    category: "Inspection",
    image: "/images/gallery/inspection-4.jpg",
    description:
      "Final quality approval before delivery.",
    featured: true,
  },
];

export const galleryCategories = [
  "All",
  "Factory",
  "Machines",
  "Products",
  "Inspection",
  "Team",
  "Warehouse",
] as const;