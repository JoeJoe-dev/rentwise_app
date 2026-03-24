"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/AuthGuard";

function EmergencyPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [activated, setActivated] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handlePressStart = () => {
    if (activated) return;
    let p = 0;
    timerRef.current = setInterval(() => {
      p += 100 / 30;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(timerRef.current!);
        setActivated(true);
      }
    }, 100);
  };

  const handlePressEnd = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!activated) setProgress(0);
  };

  const handleCancel = () => {
    setActivated(false);
    setProgress(0);
  };

  const circumference = 2 * Math.PI * 120;

  return (
    <div className="relative flex h-screen w-full max-w-[430px] mx-auto flex-col overflow-x-hidden bg-[#050505]">
      <div className="h-12 w-full" />
      {/* Top bar */}
      <div className="flex items-center p-4 justify-between">
        <button onClick={() => router.back()} className="text-white flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined text-[28px]">chevron_left</span>
        </button>
        <h2 className="text-white text-lg font-semibold leading-tight tracking-tight flex-1 text-center pr-12">Emergency SOS</h2>
      </div>

      {/* Location card */}
      <div className="px-6 py-4">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-xl">
          <div className="bg-primary/20 p-2.5 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-0.5">Live Location Sharing</span>
            <span className="text-sm font-medium text-zinc-200">123 Maple St, Nairobi, Kenya</span>
          </div>
          {activated && (
            <div className="ml-auto flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
              </span>
              <span className="text-red-400 text-xs font-bold">LIVE</span>
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-12 px-6">
        <div className="text-center space-y-3">
          <h3 className="text-white tracking-tight text-3xl font-bold">
            {activated ? "SOS Activated!" : "Press and hold for 3s"}
          </h3>
          <p className="text-zinc-500 text-base">
            {activated ? "Contacts are being notified" : "Release to cancel the emergency request"}
          </p>
        </div>

        {/* SOS button with SVG ring */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-64 h-64 rounded-full border border-[#ff3b30]/30 animate-pulse" />
          <button
            onMouseDown={handlePressStart} onMouseUp={handlePressEnd}
            onTouchStart={handlePressStart} onTouchEnd={handlePressEnd}
            className={`relative z-10 w-52 h-52 rounded-full flex flex-col items-center justify-center active:scale-95 transition-transform duration-150 border-[6px] border-white/20 select-none ${activated ? "bg-red-700" : "bg-[#ff3b30]"}`}
            style={{ boxShadow: activated ? "0 0 60px 10px rgba(255,59,48,0.6), 0 0 120px 20px rgba(255,59,48,0.2)" : "0 0 40px 6px rgba(255,59,48,0.4)" }}
          >
            <span className="text-white text-6xl font-black tracking-tighter">SOS</span>
            {activated && <span className="text-white/80 text-xs font-bold uppercase tracking-wider mt-1">ACTIVE</span>}
          </button>
          <svg className="absolute w-64 h-64 -rotate-90">
            <circle cx="128" cy="128" fill="transparent" r="120" stroke="rgba(255,59,48,0.2)" strokeWidth="4" />
            <circle cx="128" cy="128" fill="transparent" r="120" stroke="#ff3b30"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress / 100)}
              strokeLinecap="round" strokeWidth="4"
              className="transition-all duration-100" />
          </svg>
        </div>

        {/* Contacts */}
        <div className="w-full space-y-8">
          <div className="flex flex-col items-center gap-4">
            <h4 className="text-zinc-500 text-[11px] font-bold tracking-[0.2em] text-center uppercase">Alerting immediate contacts</h4>
            <div className="flex justify-center gap-8">
              {[
                { icon: "real_estate_agent", label: "LANDLORD" },
                { icon: "emergency", label: "FAMILY" },
                { icon: "local_police", label: "SECURITY" },
              ].map(c => (
                <div key={c.label} className="flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-full border flex items-center justify-center shadow-lg transition-colors ${activated ? "bg-red-900/30 border-red-800" : "bg-zinc-900 border-zinc-800"}`}>
                    <span className={`material-symbols-outlined text-2xl ${activated ? "text-red-400" : "text-zinc-300"}`}>{c.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-500 tracking-wider">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed text-center max-w-[280px] mx-auto">
            Landlord, Emergency Contact, and Local Security will receive your live location immediately.
          </p>
        </div>
      </div>

      {/* Cancel */}
      <div className="px-6 py-10 mt-auto">
        <button onClick={handleCancel}
          className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-16 px-5 bg-zinc-900 text-white text-base font-bold active:bg-zinc-800 transition-colors border border-zinc-800">
          <span>Cancel (False Alarm)</span>
        </button>
      </div>
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1.5 bg-zinc-800 rounded-full" />
      </div>
    </div>
  );
}

export default function EmergencyPageWrapper() {
  return <AuthGuard><EmergencyPage /></AuthGuard>;
}
