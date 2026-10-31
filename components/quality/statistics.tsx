interface QualityStatistic {
  id: number;
  value: string;
  label: string;
}

export const qualityStats: QualityStatistic[] = [
  {
    id: 1,
    value: "100%",
    label: "Final Inspection",
  },
  {
    id: 2,
    value: "±0.005 mm",
    label: "Tolerance Capability",
  },
  {
    id: 3,
    value: "ISO 9001",
    label: "Certified Facility",
  },
  {
    id: 4,
    value: "15+",
    label: "Years Experience",
  },
];