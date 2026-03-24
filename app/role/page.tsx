"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types";

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<UserRole>(null);

  return (
    <div className="bg-[#0a0f12] min-h-screen flex flex-col font-display text-white max-w-[430px] mx-auto">
      <header className="flex items-center justify-between p-4 pt-6">
        <button onClick={() => router.back()} className="p-2 text-white/80 hover:text-white transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
          Role Selection
        </h1>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-4 pb-10 w-full">
        <div className="mb-8 text-center">
          <h2 className="text-white text-[32px] font-bold leading-tight tracking-tight mb-3">Welcome!</h2>
          <p className="text-slate-400 text-lg">How will you be using the app?</p>
        </div>

        <div className="space-y-6 flex-1">
          {/* Tenant */}
          <div onClick={() => setSelected("tenant")} className="cursor-pointer transition-all duration-300 active:scale-[0.98]">
            <div className={`flex flex-col items-stretch rounded-2xl bg-[#162127] overflow-hidden border transition-all ${selected === "tenant" ? "border-[#39ff14]/60 shadow-[0_0_15px_rgba(57,255,20,0.1)]" : "border-[#39ff14]/30"}`}>
              <div className="h-36 w-full bg-[#39ff14]/5 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#39ff14 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div className="z-10 bg-[#0a0f12]/80 backdrop-blur-sm p-4 rounded-2xl border border-[#39ff14]/20">
                  <span className="material-symbols-outlined text-[#39ff14] text-5xl">person_pin_circle</span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-white text-xl font-bold tracking-tight">I am a Tenant</p>
                  <span className={`material-symbols-outlined ${selected === "tenant" ? "text-[#39ff14] fill-icon" : "text-[#39ff14]"}`}>
                    {selected === "tenant" ? "check_circle" : "radio_button_unchecked"}
                  </span>
                </div>
                <p className="text-slate-400 text-sm font-normal leading-relaxed mt-2">
                  I want to find and rent a safe, verified property with transparent contracts.
                </p>
              </div>
            </div>
          </div>

          {/* Landlord */}
          <div onClick={() => setSelected("landlord")} className="cursor-pointer transition-all duration-300 active:scale-[0.98]">
            <div className={`flex flex-col items-stretch rounded-2xl bg-[#162127] overflow-hidden border transition-all ${selected === "landlord" ? "border-[#00f2ff]/60 shadow-[0_0_15px_rgba(0,242,255,0.1)]" : "border-[#00f2ff]/30"}`}>
              <div className="h-36 w-full bg-[#00f2ff]/5 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#00f2ff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div className="z-10 bg-[#0a0f12]/80 backdrop-blur-sm p-4 rounded-2xl border border-[#00f2ff]/20">
                  <span className="material-symbols-outlined text-[#00f2ff] text-5xl">location_city</span>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-white text-xl font-bold tracking-tight">I am a Landlord</p>
                  <span className={`material-symbols-outlined ${selected === "landlord" ? "text-[#00f2ff] fill-icon" : "text-[#00f2ff]"}`}>
                    {selected === "landlord" ? "check_circle" : "radio_button_unchecked"}
                  </span>
                </div>
                <p className="text-slate-400 text-sm font-normal leading-relaxed mt-2">
                  I want to list my properties, manage tenants, and receive secure payments.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => selected && router.push(`/signup?role=${selected}`)}
              disabled={!selected}
              className="flex min-w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 px-5 bg-white text-[#0a0f12] text-lg font-bold leading-normal tracking-wide shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              Continue
            </button>
            <p className="text-center text-slate-400 text-sm">
              Already have an account?{" "}
              <button onClick={() => router.push("/signup")} className="text-[#00f2ff] font-bold hover:underline">Log in</button>
            </p>
          </div>
          <div className="flex items-center justify-center mt-8 gap-2 text-slate-500">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Secure &amp; Verified Ecosystem</span>
          </div>
        </div>
      </main>
      <div className="h-8" />
    </div>
  );
}
