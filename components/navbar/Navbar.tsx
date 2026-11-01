"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
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
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 shrink-0 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Shiv Shakti Industries"
                width={64}
                height={64}
                priority
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <p className="text-lg sm:text-2xl md:text-3xl font-bold text-black leading-none tracking-tight truncate">
                Shiv Shakti Industries
              </p>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 font-medium mt-1 truncate">
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

          <div className="flex items-center gap-1.5 lg:hidden">
            <a
              href="tel:+919213662579"
              className="p-2 rounded-lg text-primary hover:bg-red-50 active:scale-95 transition-all"
              aria-label="Call Shiv Shakti Industries"
            >
              <Phone size={22} />
            </a>

            <button
              className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-gray-100 transition-colors"
              onClick={() => setOpen(true)}
              aria-label="Toggle navigation menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
