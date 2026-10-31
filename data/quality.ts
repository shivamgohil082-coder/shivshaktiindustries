import {
  Microscope,
  Ruler,
  ShieldCheck,
  ScanLine,
  BadgeCheck,
  Factory,
  Gauge,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                  Interfaces                                */
/* -------------------------------------------------------------------------- */

export interface QualityProcessStep {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface InspectionEquipment {
  id: number;
  name: string;
  image: string;
  icon: LucideIcon;
  description: string;
  accuracy: string;
}

export interface QualityCertificate {
  id: number;
  title: string;
  image: string;
  description: string;
}

export interface QualityStatistic {
  id: number;
  value: string;
  label: string;
}

export interface ManufacturingStandard {
  id: number;
  title: string;
  description: string;
}

export const qualityProcess: QualityProcessStep[] = [
  {
    id: 1,
    title: "Incoming Material Inspection",
    description:
      "Raw materials are verified for grade, hardness, dimensions and supplier certifications before production.",
    icon: SearchCheck,
  },
  {
    id: 2,
    title: "In-Process Inspection",
    description:
      "Critical dimensions are measured during machining to maintain consistency throughout production.",
    icon: Microscope,
  },
  {
    id: 3,
    title: "Final Dimensional Inspection",
    description:
      "Finished components are inspected using precision measuring instruments before approval.",
    icon: Ruler,
  },
  {
    id: 4,
    title: "Surface & Visual Inspection",
    description:
      "Surface finish, burr removal, coating quality and cosmetic appearance are verified.",
    icon: ScanLine,
  },
  {
    id: 5,
    title: "Packing & Dispatch",
    description:
      "Products are cleaned, protected and securely packed before shipment.",
    icon: ShieldCheck,
  },
];

export const inspectionEquipment: InspectionEquipment[] = [
  {
    id: 1,
    name: "Coordinate Measuring Machine (CMM)",
    image: "/images/quality/cmm.jpg",
    icon: Gauge,
    description:
      "High precision dimensional measurement using probe-based inspection for complex machined parts.",
    accuracy: "±0.001 mm",
  },
  {
    id: 2,
    name: "Optical Comparator",
    image: "/images/quality/optical-comparator.jpg",
    icon: Microscope,
    description:
      "Profile inspection and dimensional verification of components using high-resolution optical imaging.",
    accuracy: "±0.01 mm",
  },
  {
    id: 3,
    name: "Surface Roughness Tester",
    image: "/images/quality/surface-roughness.jpg",
    icon: Factory,
    description:
      "Surface finish inspection to ensure that machined parts meet the required Ra and Rz standards.",
    accuracy: "0.1 µm",
  },
];

export const qualityCertificates: QualityCertificate[] = [
  {
    id: 1,
    title: "ISO 9001:2015",
    image: "/images/certificates/iso9001.jpg",
    description:
      "Certified Quality Management System ensuring consistent manufacturing practices.",
  },
  {
    id: 2,
    title: "Material Traceability",
    image: "/images/certificates/material.jpg",
    description:
      "Complete material traceability from procurement to finished product.",
  },
  {
    id: 3,
    title: "Inspection Reports",
    image: "/images/certificates/report.jpg",
    description:
      "Detailed dimensional reports supplied on customer request.",
  },
];