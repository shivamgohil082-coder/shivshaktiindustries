"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, FileCheck, Layers } from "lucide-react";

const PHONE_NUMBER = "+919213662579";
const WHATSAPP_URL =
  "https://wa.me/919213662579?text=" +
  encodeURIComponent(
    "Hello Shiv Shakti Industries, I am visiting your website on mobile and would like to enquire about precision machining / RFQ."
  );

export default function MobileBottomBar() {
  const pathname = usePathname();

  // Hide on admin owner portal routes to not interfere with owner dashboard
  if (pathname.startsWith("/owner-access-7x9k")) {
    return null;
  }

  return (
    <aside
      aria-label="Mobile quick actions"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 6px)" }}
    >
      <div className="grid grid-cols-4 items-center px-2 py-2 gap-1 text-center">
        {/* 1. Direct Call */}
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-gray-700 hover:text-primary active:scale-95 transition-all"
          aria-label="Call Shiv Shakti Industries directly"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-800 shadow-sm">
            <Phone size={18} className="text-primary" />
          </div>
          <span className="mt-1 text-[11px] font-bold tracking-tight">Call</span>
        </a>

        {/* 2. Direct WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-gray-700 hover:text-emerald-600 active:scale-95 transition-all"
          aria-label="Chat with Shiv Shakti Industries on WhatsApp"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-sm">
            <MessageCircle size={18} />
          </div>
          <span className="mt-1 text-[11px] font-bold tracking-tight text-emerald-700">WhatsApp</span>
        </a>

        {/* 3. Products Catalog */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-95 ${
            pathname === "/products"
              ? "text-primary font-bold"
              : "text-gray-700 hover:text-primary"
          }`}
          aria-label="View product catalog"
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-colors ${
              pathname === "/products"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            <Layers size={18} />
          </div>
          <span className="mt-1 text-[11px] font-bold tracking-tight">Products</span>
        </Link>

        {/* 4. Request RFQ */}
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl active:scale-95 transition-all"
          aria-label="Request quotation"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-red-600/30">
            <FileCheck size={18} />
          </div>
          <span className="mt-1 text-[11px] font-extrabold tracking-tight text-primary">Get RFQ</span>
        </Link>
      </div>
    </aside>
  );
}
