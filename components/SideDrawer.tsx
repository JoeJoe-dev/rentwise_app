"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function SideDrawer({ open, onClose }: SideDrawerProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    onClose();
    router.replace("/role");
  };

  if (!user) return null;

  const isTenant = user.role === "tenant";

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel - slides in from left, ~55% wide */}
      <div
        className={`fixed top-0 left-0 h-full w-[58%] max-w-[280px] z-50 bg-white dark:bg-[#0d1b22] border-r border-gray-200 dark:border-white/10 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="pt-14 pb-6 px-5 border-b border-gray-200 dark:border-white/10">
          {/* Avatar */}
          <div className="relative w-20 h-20 mb-4">
            {user.avatarDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarDataUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-primary"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-700 border-2 border-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300">
                  account_circle
                </span>
              </div>
            )}
            {user.verified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-[#0d1b22]">
                <span className="material-symbols-outlined text-white text-[12px]">check</span>
              </div>
            )}
          </div>

          {/* Name */}
          <p className="text-black dark:text-white text-lg font-bold leading-tight">{user.name}</p>

          {/* Role badge */}
          <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="material-symbols-outlined text-primary text-sm">
              {isTenant ? "key" : "location_city"}
            </span>
            <span className="text-primary text-xs font-bold uppercase tracking-wider">
              {isTenant ? "Tenant" : "Landlord"}
            </span>
          </div>
        </div>

        {/* Role-specific info */}
        <div className="px-5 py-5 space-y-3 border-b border-gray-200 dark:border-white/10">
          <p className="text-gray-600 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em]">
            Account Info
          </p>

          {/* NIN */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-sm">badge</span>
            </div>
            <div>
              <p className="text-gray-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">NIN</p>
              <p className="text-black dark:text-white text-sm font-semibold">
                {"•".repeat(8) + user.nin.slice(-4)}
              </p>
            </div>
          </div>

          {/* Verified status */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-green-400 text-sm">verified_user</span>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Status</p>
              <p className="text-green-400 text-sm font-semibold">Identity Verified</p>
            </div>
          </div>

          {/* Member since */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-slate-400 text-sm">calendar_today</span>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                Member Since
              </p>
              <p className="text-white text-sm font-semibold">{user.memberSince}</p>
            </div>
          </div>

          {/* Tenant-specific: property */}
          {isTenant && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-sm">home</span>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  Current Unit
                </p>
                <p className="text-white text-sm font-semibold">Unit 4B, Blue Horizon</p>
              </div>
            </div>
          )}

          {/* Landlord-specific: properties count */}
          {!isTenant && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-sm">apartment</span>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  Properties
                </p>
                <p className="text-white text-sm font-semibold">3 Listed</p>
              </div>
            </div>
          )}
        </div>

        {/* Nav links */}
        <div className="px-3 py-4 flex-1 space-y-1">
          <button
            onClick={() => { onClose(); router.push("/profile"); }}
            className="flex w-full items-center gap-3 px-3 py-3 rounded-xl text-black dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">person</span>
            <span className="text-sm font-medium">Profile &amp; Security</span>
          </button>
          <button
            onClick={() => { onClose(); router.push(isTenant ? "/dashboard" : "/landlord"); }}
            className="flex w-full items-center gap-3 px-3 py-3 rounded-xl text-black dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">home</span>
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => { onClose(); router.push("/rights"); }}
            className="flex w-full items-center gap-3 px-3 py-3 rounded-xl text-black dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">balance</span>
            <span className="text-sm font-medium">Rights &amp; Guide</span>
          </button>
          <button
            onClick={() => { onClose(); router.push("/emergency"); }}
            className="flex w-full items-center gap-3 px-3 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">emergency_home</span>
            <span className="text-sm font-medium">Emergency</span>
          </button>
        </div>

        {/* Logout */}
        <div className="px-4 pb-10">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 h-13 py-3.5 rounded-2xl bg-gray-200 dark:bg-slate-800/60 border border-gray-300 dark:border-slate-700/50 text-black dark:text-slate-300 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-900/30 transition-all text-sm font-semibold"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
