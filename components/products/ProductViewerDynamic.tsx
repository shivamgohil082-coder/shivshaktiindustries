"use client";

import dynamic from "next/dynamic";

const ProductViewer = dynamic(() => import("./ProductViewer"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full animate-pulse bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">Loading 3D Product Viewer...</div>
});

export default function ProductViewerDynamic() {
  return <ProductViewer />;
}
