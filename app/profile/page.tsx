"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { AuthGuard } from "@/components/AuthGuard";
import { ThemeToggle } from "@/components/ThemeToggle";

function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateAvatar } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logout();
    router.replace("/role");
  };

  if (!user) return null;

  const isTenant = user.role === "tenant";

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col max-w-[480px] mx-auto overflow-x-hidden bg-white dark:bg-[#0B1114] text-black dark:text-slate-100">
      {/* Top bar */}
      <div className="flex items-center bg-white dark:bg-[#0B1114]/80 backdrop-blur-xl p-4 pb-2 justify-between sticky top-0 z-20 border-b border-gray-200 dark:border-slate-800">
        <button onClick={() => router.back()} className="text-black dark:text-slate-100 flex size-12 shrink-0 items-center cursor-pointer">
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </button>
        <h2 className="text-black dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Profile &amp; Security</h2>
        <ThemeToggle />
      </div>

      {/* Avatar + name */}
      <div className="flex p-6">
        <div className="flex w-full flex-col gap-5 items-center">
          <div className="relative">
            <button onClick={() => fileInputRef.current?.click()} className="group block">
              {user.avatarDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarDataUrl} alt="Avatar"
                  className="min-h-28 w-28 rounded-full object-cover border-2 border-slate-700 shadow-xl" />
              ) : (
                <div className="min-h-28 w-28 rounded-full bg-slate-700 border-2 border-slate-600 shadow-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400 text-5xl">account_circle</span>
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">edit</span>
              </div>
            </button>
            <div className="absolute bottom-0 right-1 bg-[#22C55E] text-white p-1 rounded-full border-2 border-[#0B1114] flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px] font-bold">check</span>
            </div>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />

          <div className="flex flex-col items-center text-center">
            <p className="text-black dark:text-slate-100 text-2xl font-bold leading-tight tracking-tight">{user.name}</p>
            <div className="flex items-center gap-1.5 mt-1 px-3 py-1 bg-[#22C55E]/10 rounded-full border border-[#22C55E]/20">
              <span className="material-symbols-outlined text-[#22C55E] text-sm">verified</span>
              <span className="text-[#22C55E] text-xs font-bold uppercase tracking-wider">
                Verified {isTenant ? "Tenant" : "Landlord"}
              </span>
            </div>
            <p className="text-gray-500 dark:text-slate-400 text-sm font-normal mt-2">Member since {user.memberSince}</p>
          </div>
        </div>
      </div>

      {/* Identity verified card */}
      <div className="px-4 py-2">
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#162229] p-5 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#22C55E]/10 text-[#22C55E]">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <div className="flex flex-col">
              <p className="text-black dark:text-slate-100 text-base font-bold">Identity Verified</p>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-snug">Your NIN has been verified. You&apos;re a trusted member.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl p-3">
            <span className="material-symbols-outlined text-primary text-sm">badge</span>
            <div>
              <p className="text-gray-600 dark:text-slate-400 text-[10px] uppercase tracking-wider">NIN</p>
              <p className="text-black dark:text-white text-sm font-semibold">{"•".repeat(8) + user.nin.slice(-4)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="mt-6 px-4">
        <h3 className="text-gray-600 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.1em] mb-3 ml-1">Account Settings</h3>
        <div className="bg-white dark:bg-[#162229] rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800">
          {[
            { icon: "person", label: "Edit Profile" },
            { icon: "lock", label: "Security Settings", sub: "Change PIN & Biometrics" },
            { icon: "visibility", label: "Privacy Controls" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 px-4 py-4 justify-between cursor-pointer active:bg-gray-100 dark:active:bg-slate-800 transition-colors group ${i < 2 ? "border-b border-gray-200 dark:border-slate-800" : ""}`}>
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <p className="text-black dark:text-slate-100 text-base font-medium">{item.label}</p>
                  {item.sub && <p className="text-gray-500 dark:text-slate-500 text-xs mt-0.5">{item.sub}</p>}
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400 dark:text-slate-600 group-active:text-gray-600 dark:group-active:text-slate-400">chevron_right</span>
            </div>
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="mt-6 px-4">
        <h3 className="text-gray-600 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.1em] mb-3 ml-1">Support</h3>
        <div className="bg-white dark:bg-[#162229] rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800">
          {[
            { icon: "help", label: "Help Center" },
            { icon: "verified_user", label: "Trust & Safety Guidelines" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 px-4 py-4 justify-between cursor-pointer active:bg-gray-100 dark:active:bg-slate-800 transition-colors group ${i === 0 ? "border-b border-gray-200 dark:border-slate-800" : ""}`}>
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <p className="text-black dark:text-slate-100 text-base font-medium">{item.label}</p>
              </div>
              <span className="material-symbols-outlined text-gray-400 dark:text-slate-600 group-active:text-gray-600 dark:group-active:text-slate-400">chevron_right</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency */}
      <div className="mt-6 px-4">
        <button onClick={() => router.push("/emergency")}
          className="flex w-full items-center justify-center gap-3 h-13 py-3.5 rounded-2xl bg-red-600 dark:bg-red-600/20 border border-red-500 dark:border-red-600 text-white dark:text-red-400 hover:bg-red-700 dark:hover:bg-red-600/30 transition-all text-sm font-semibold">
          <span className="material-symbols-outlined text-[20px] font-bold">emergency_home</span>
          <span>Emergency</span>
        </button>
      </div>

      {/* Logout */}
      <div className="mt-12 mb-10 px-6 flex flex-col items-center gap-6">
        <button onClick={handleLogout}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl h-14 bg-gray-200 dark:bg-slate-800/40 border border-gray-300 dark:border-slate-800 text-black dark:text-slate-400 text-base font-semibold hover:bg-red-100 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-900/30 transition-all">
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <span>Log Out</span>
        </button>
        <div className="text-center">
          <p className="text-gray-600 dark:text-slate-600 text-[10px] uppercase tracking-[0.2em] font-bold">App Version 2.0.0 (Build 1)</p>
          <p className="text-gray-700 dark:text-slate-700 text-[9px] mt-1">© 2024 RentWise Systems</p>
        </div>
      </div>
      <div className="h-8" />
    </div>
  );
}

export default function ProfilePageWrapper() {
  return <AuthGuard><ProfilePage /></AuthGuard>;
}
