"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { navLinks } from "./NavLinks";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="absolute right-0 h-full w-80 bg-white p-6 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Navigation</span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`text-base font-semibold px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-sm font-bold"
                    : "text-secondary hover:text-primary hover:bg-gray-50"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
