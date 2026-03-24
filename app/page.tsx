"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/onboarding"), 2800);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex h-screen w-full flex-col bg-[#121417] overflow-hidden max-w-[430px] mx-auto">
      <div className="flex-grow flex flex-col items-center justify-center px-6">
        {/* Logo glow */}
        <div className="relative mb-10 flex items-center justify-center">
          <div className="absolute w-48 h-48 bg-[#3ABEF9]/20 rounded-full blur-[60px]" />
          <div className="relative flex items-center justify-center w-28 h-28 bg-[#1E2228] rounded-3xl border border-white/5 shadow-2xl"
            style={{ filter: "drop-shadow(0 0 20px rgba(58,190,249,0.4))" }}>
            <span className="material-symbols-outlined text-[#3ABEF9] text-[72px]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48" }}>
              home_work
            </span>
            <div className="absolute -bottom-1 -right-1 bg-[#3ABEF9] text-[#121417] rounded-full p-1.5 border-[5px] border-[#121417] flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[20px] font-bold">check</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <h1 className="text-white tracking-tight text-[42px] font-bold leading-tight text-center"
            style={{ textShadow: "0 0 15px rgba(58,190,249,0.3)" }}>
            RentWise
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed text-center max-w-[280px]">
            Smart renting.<br />Peaceful living.
          </p>
        </div>
      </div>

      {/* Loading */}
      <div className="flex flex-col items-center justify-end pb-24">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 border-[3px] border-white/5 rounded-full" />
            <div className="absolute inset-0 border-[3px] border-[#3ABEF9] border-t-transparent rounded-full animate-spin" />
            <div className="w-1 h-1 bg-[#3ABEF9] rounded-full animate-pulse" />
          </div>
          <p className="text-white/40 text-sm font-semibold tracking-widest uppercase">
            Securing your home
          </p>
        </div>
      </div>
      <div className="h-10" />
    </div>
  );
}
