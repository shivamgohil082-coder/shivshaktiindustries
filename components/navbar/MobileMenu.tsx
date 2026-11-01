"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Phone, MessageCircle, Mail, MapPin, FileCheck } from "lucide-react";
import { navLinks } from "./NavLinks";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PHONE_NUMBER = "+919213662579";
const WHATSAPP_URL =
  "https://wa.me/919213662579?text=" +
  encodeURIComponent(
    "Hello Shiv Shakti Industries, I am visiting your website on mobile and would like to enquire about precision machining / RFQ."
  );

export default function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="absolute right-0 h-full w-[86vw] max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Shiv Shakti Industries</p>
            <p className="text-[11px] text-gray-500 font-medium">Precision Engineering</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-600 hover:text-primary hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-1.5 p-4 flex-1">
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
                className={`flex items-center justify-between text-base font-semibold px-4 py-3 rounded-xl transition-all active:scale-[0.98] ${
                  isActive
                    ? "bg-primary text-white shadow-sm font-bold"
                    : "text-secondary hover:text-primary hover:bg-gray-50"
                }`}
              >
                <span>{item.title}</span>
                {isActive && <span className="h-2 w-2 rounded-full bg-white animate-pulse" />}
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary text-white font-bold text-sm uppercase tracking-wider shadow-md hover:bg-red-700 active:scale-95 transition-all"
            >
              <FileCheck size={18} />
              Request Quotation (RFQ)
            </Link>
          </div>
        </div>

        {/* Quick Contact Actions Footer inside Drawer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/80 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-xs font-bold shadow-sm hover:border-primary active:scale-95 transition-all"
            >
              <Phone size={15} className="text-primary" />
              <span>Call Us</span>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-sm hover:bg-[#20ba59] active:scale-95 transition-all"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="pt-1 text-[11px] text-gray-600 space-y-1">
            <div className="flex items-center gap-1.5">
              <Mail size={13} className="text-gray-400 shrink-0" />
              <a href="mailto:rfq@shivshaktiindustries.org" className="text-primary font-medium truncate">
                rfq@shivshaktiindustries.org
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-gray-400 shrink-0" />
              <span className="truncate">Makarpura GIDC, Vadodara, Gujarat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
