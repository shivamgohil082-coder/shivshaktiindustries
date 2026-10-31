"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Lock,
  Database,
  FileDown,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Server,
  AlertCircle,
  KeyRound,
} from "lucide-react";

export default function AdminSettingsPage() {
  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // System stats state
  const [stats, setStats] = useState<{ isMySqlActive: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch(() => {});
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    try {
      setPasswordLoading(true);
      setPasswordError("");
      setPasswordSuccess("");

      const res = await fetch("/api/admin/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (data.success) {
        setPasswordSuccess("Your password was updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(""), 4000);
      } else {
        setPasswordError(data.error || "Failed to update password.");
      }
    } catch {
      setPasswordError("Network error. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          System Settings &amp; Security Controls
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your account credentials, database connection status, and download backups.
        </p>
      </div>

      {/* Database Backup & Export (Requirement: Automated backups & recovery) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Database size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Database Backup &amp; Recovery</h3>
            <p className="text-xs text-slate-500">
              Download complete, timestamped snapshots of all catalog products, customer inquiries, and content.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase text-slate-700 block mb-1">
                JSON Data Snapshot
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Universal JSON backup containing structured arrays of all products, RFQs, SEO, and text content.
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.open("/api/admin/backup?format=json", "_blank")}
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <FileDown size={14} /> Download JSON Backup
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase text-slate-700 block mb-1">
                MySQL / MariaDB SQL Script
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Raw SQL dump with `INSERT INTO products` and `INSERT INTO enquiries` statements ready for phpMyAdmin.
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.open("/api/admin/backup?format=sql", "_blank")}
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors shadow-md shadow-orange-600/20"
            >
              <FileDown size={14} /> Download SQL Dump
            </button>
          </div>
        </div>
      </div>

      {/* Database Connection Status */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Server size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Database Engine Status</h3>
            <p className="text-xs text-slate-500">
              Live health monitor of your persistent data storage layer.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-3">
          <div>
            <span className="text-xs font-bold uppercase text-slate-700 block">
              Active Storage Mode:
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {stats?.isMySqlActive ? "MySQL / MariaDB Database Server" : "High-Performance Local Persistence Store"}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {stats?.isMySqlActive
                ? "All transactions are executing in live MySQL tables with ACID safety."
                : "Credentials not yet supplied in .env.local; operating safely in zero-dependency local store."}
            </p>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 ${
              stats?.isMySqlActive
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                stats?.isMySqlActive ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span>{stats?.isMySqlActive ? "MySQL Connected" : "Local Store Active"}</span>
          </div>
        </div>
      </div>

      {/* Change Password Form (Requirement 11) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
            <KeyRound size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Change Administrator Password</h3>
            <p className="text-xs text-slate-500">
              Update your account password. Requires your current password for security verification.
            </p>
          </div>
        </div>

        {passwordError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
            {passwordError}
          </div>
        )}

        {passwordSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} /> {passwordSuccess}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Current Password *
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              New Password (Minimum 8 Characters) *
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={passwordLoading}
            className="mt-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-600/20 transition-all flex items-center gap-2"
          >
            {passwordLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
