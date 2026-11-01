import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-20 text-center">
      <div className="max-w-md mx-auto">
        <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
          Page Not Found
        </h1>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          The page you are looking for does not exist, has been removed, or has been moved to a new address.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-red-700 active:scale-95 transition-all"
          >
            <ArrowLeft size={16} /> Return to Homepage
          </Link>
          <Link
            href="/products"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-secondary hover:bg-gray-50 active:scale-95 transition-all"
          >
            <Layers size={16} /> Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}
