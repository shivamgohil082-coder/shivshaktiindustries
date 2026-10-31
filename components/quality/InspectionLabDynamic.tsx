"use client";

import dynamic from "next/dynamic";

const InspectionLab = dynamic(() => import("./InspectionLab"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full animate-pulse bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">Loading 3D Inspection Environment...</div>
});

export default function InspectionLabDynamic() {
  return <InspectionLab />;
}
