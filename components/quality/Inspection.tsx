import { SearchCheck, Microscope, Ruler, ScanLine, ShieldCheck } from "lucide-react";

interface QualityProcessStep {
  id: number;
  title: string;
  description: string;
  icon: any;
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