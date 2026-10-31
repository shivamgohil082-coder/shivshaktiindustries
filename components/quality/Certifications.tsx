interface QualityCertificate {
  id: number;
  title: string;
  image: string;
  description: string;
}

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