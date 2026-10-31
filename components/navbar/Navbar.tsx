"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { navLinks } from "./NavLinks";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="container-custom flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <img
              src="/images/logo/logo3.jpeg"
              alt="Shiv Shakti Industries"
              className="h-14 md:h-16 w-auto object-contain"
            />

            <div className="flex flex-col justify-center">
              <h1 className="text-xl md:text-3xl font-bold text-black leading-none tracking-tight">
                Shiv Shakti Industries
              </h1>
              <p className="text-xs md:text-sm text-gray-700 font-medium mt-1">
                Precision Engineering Solutions
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1.5 xl:gap-3 lg:flex">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-bold px-3.5 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-secondary hover:text-primary hover:bg-gray-100"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <button
            className="lg:hidden p-2 rounded-lg text-secondary hover:text-primary hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(true)}
            aria-label="Toggle navigation menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
