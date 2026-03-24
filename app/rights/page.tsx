"use client";

import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const rights = [
  { icon: "visibility_off", color: "text-[#38bdf8]", title: "Privacy Rights", desc: "24-hour mandatory notice before landlord entry." },
  { icon: "gavel", color: "text-[#34d399]", title: "Fair Eviction", desc: "Strict legal process required; no instant lockouts." },
  { icon: "water_drop", color: "text-[#a78bfa]", title: "Basic Services", desc: "Right to functional water, electricity, and sanitation." },
];

const responsibilities = [
  { icon: "payments", color: "text-[#fbbf24]", title: "Timely Rent", desc: "Pay by the 5th to maintain a high trust score." },
  { icon: "mop", color: "text-[#38bdf8]", title: "Care of Premises", desc: "Maintain cleanliness and report damages promptly." },
];

export default function RightsGuidePage() {
  const router = useRouter();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col mx-auto max-w-[480px] bg-white dark:bg-[#0a0f12] text-black dark:text-white">
      <div className="h-11 w-full" />
      {/* Header */}
      <div className="flex items-center bg-white dark:bg-[#0a0f12]/80 backdrop-blur-xl p-4 sticky top-0 z-20 border-b border-gray-200 dark:border-white/10">
        <button onClick={() => router.back()} className="text-primary flex size-10 shrink-0 items-center cursor-pointer">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
        </button>
        <h2 className="text-black dark:text-white text-lg font-semibold leading-tight flex-1 text-center">Rights &amp; Guide</h2>
        <div className="flex w-10 items-center justify-end gap-2">
          <ThemeToggle />
          <button className="text-black dark:text-white"><span className="material-symbols-outlined">info</span></button>
        </div>
      </div>

      {/* Language toggle */}
      <div className="px-4 py-4">
        <div className="flex h-11 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5 p-1 border border-gray-200 dark:border-white/5">
          <label className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 bg-primary text-white text-sm font-semibold">
            <span>English</span>
          </label>
          <label className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 text-gray-500 dark:text-gray-400 text-sm font-semibold">
            <span>Swahili</span>
          </label>
        </div>
      </div>

      <div className="px-4 space-y-6 pb-20">
        <div className="pt-2">
          <h3 className="text-black dark:text-white text-xl font-bold tracking-tight">Essential Knowledge</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Key information for a safe rental experience.</p>
        </div>

        {/* Know Your Rights */}
        <div className="flex flex-col rounded-2xl bg-[#162229] border border-white/10 overflow-hidden shadow-2xl">
          <div className="relative h-32 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(43,173,238,0.2) 0%, rgba(37,99,235,0.2) 100%)" }}>
            <div className="bg-[#162229] p-4 rounded-2xl shadow-lg border border-white/5">
              <span className="material-symbols-outlined text-[#fbbf24] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <h4 className="text-white text-xl font-bold">Know Your Rights</h4>
              <p className="text-gray-400 text-sm mt-1">Legal protections every tenant should know.</p>
            </div>
            <div className="space-y-4">
              {rights.map((r, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className={`material-symbols-outlined mt-0.5 ${r.color}`}>{r.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-white">{r.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl text-sm font-bold transition-colors">Expand Legal Guide</button>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="flex flex-col rounded-2xl bg-[#162229] border border-white/10 overflow-hidden shadow-2xl">
          <div className="relative h-32 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.1) 0%, rgba(5,150,105,0.1) 100%)" }}>
            <div className="bg-[#162229] p-4 rounded-2xl shadow-lg border border-white/5">
              <span className="material-symbols-outlined text-[#34d399] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>home_repair_service</span>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <h4 className="text-white text-xl font-bold">Your Responsibilities</h4>
              <p className="text-gray-400 text-sm mt-1">Maintain harmony and safety in your community.</p>
            </div>
            <div className="space-y-4">
              {responsibilities.map((r, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className={`material-symbols-outlined mt-0.5 ${r.color}`}>{r.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-white">{r.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl text-sm font-bold transition-colors">View Maintenance Guide</button>
          </div>
        </div>

        {/* Support Resources */}
        <div className="pt-4 space-y-4">
          <h3 className="text-white text-lg font-bold">Support Resources</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: "description", color: "text-blue-400 bg-blue-500/10", title: "Lease Agreement Template", sub: "PDF • 1.2 MB", action: "download" },
              { icon: "support_agent", color: "text-emerald-400 bg-emerald-500/10", title: "Legal Aid Hotline", sub: "Free consultation", action: "call" },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#162229] rounded-xl border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-lg flex items-center justify-center ${r.color}`}>
                    <span className="material-symbols-outlined">{r.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{r.title}</p>
                    <p className="text-xs text-gray-500">{r.sub}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-400">{r.action}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-4 opacity-50">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
            <span className="material-symbols-outlined text-[16px] text-[#34d399]">offline_pin</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Available Offline</span>
          </div>
        </div>
      </div>
      <div className="h-20 w-full" />
    </div>
  );
}
