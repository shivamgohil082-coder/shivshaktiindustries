interface ManufacturingStandard {
  id: number;
  title: string;
  description: string;
}

export const manufacturingStandards: ManufacturingStandard[] = [
  {
    id: 1,
    title: "ISO Manufacturing Standards",
    description:
      "Processes follow internationally accepted quality management standards.",
  },
  {
    id: 2,
    title: "Customer Drawing Compliance",
    description:
      "Every manufactured part is produced according to approved engineering drawings.",
  },
  {
    id: 3,
    title: "Precision Measurement",
    description:
      "Inspection performed using calibrated measuring instruments.",
  },
  {
    id: 4,
    title: "Final Quality Verification",
    description:
      "Every shipment undergoes final approval before dispatch.",
  },
];