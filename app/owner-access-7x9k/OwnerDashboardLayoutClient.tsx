"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Inbox,
  FileEdit,
  Globe,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  User,
  Users,
  Banknote,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function OwnerDashboardLayoutClient({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => {
        if (res.status === 401 || res.status === 404) {
          window.location.href = "/owner-access-7x9k";
        }
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
      window.location.href = "/";
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/owner-access-7x9k", icon: LayoutDashboard },
    { label: "Products", href: "/owner-access-7x9k/products", icon: Package },
    { label: "Customers", href: "/owner-access-7x9k/customers", icon: Users },
    { label: "Sales & Revenue", href: "/owner-access-7x9k/sales", icon: Banknote },
    { label: "Enquiries & RFQ", href: "/owner-access-7x9k/enquiries", icon: Inbox },
    { label: "Website Content", href: "/owner-access-7x9k/content", icon: FileEdit },
    { label: "SEO Meta", href: "/owner-access-7x9k/seo", icon: Globe },
    { label: "Backup & Settings", href: "/owner-access-7x9k/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-orange-600 flex items-center justify-center font-black text-white text-sm">
            SSI
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">Shiv Shakti Industries</h1>
            <p className="text-[10px] text-slate-400">Owner Management Portal</p>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle owner menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:block md:w-64 lg:w-72 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between fixed md:sticky top-0 h-screen z-40 transition-all`}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="p-6 border-b border-slate-800/80">
            <Link href="/owner-access-7x9k" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-orange-600/30">
                SSI
              </div>
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-tight">
                  Shiv Shakti
                </h2>
                <p className="text-xs text-orange-400 font-semibold tracking-wider uppercase">
                  Owner Portal
                </p>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/owner-access-7x9k"
                  ? pathname === "/owner-access-7x9k"
                  : pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & User Profile */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          {/* Quick link to public website */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} /> View Live Website
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">Public</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-slate-50 min-h-screen flex flex-col">
        {/* Top Desktop Bar */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
          <div>
            <h1 className="text-xl font-black text-slate-900 capitalize">
              {pathname === "/owner-access-7x9k"
                ? "Overview Dashboard"
                : pathname.replace("/owner-access-7x9k/", "").replace(/-/g, " ")}
            </h1>
            <p className="text-xs text-slate-500">Shiv Shakti Industries Management System</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-orange-600 hover:border-orange-200 transition-all"
            >
              <ExternalLink size={13} /> View Website
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                <ShieldCheck size={14} />
              </div>
              <div className="text-left text-xs">
                <span className="block font-bold text-slate-800">Verified Owner</span>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Authorized
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Inner Container */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
      </main>
    </div>
  );
}
