"use client";

import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/AuthGuard";
import { ThemeToggle } from "@/components/ThemeToggle";

function RepairsPage() {
  const router = useRouter();

  return (
    <div className="max-w-[480px] mx-auto min-h-screen flex flex-col bg-white dark:bg-[#0a0f12] text-black dark:text-slate-100 overflow-x-hidden">
      {/* Top bar */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-white dark:bg-[#0a0f12]/90 backdrop-blur-md z-10 border-b border-gray-200 dark:border-slate-800/50">
        <button onClick={() => router.back()} className="text-black dark:text-slate-100 flex size-12 shrink-0 items-center">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-black dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Repair Status</h2>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="flex size-12 items-center justify-center text-black dark:text-slate-100">
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 pt-6">
        <h3 className="text-black dark:text-slate-100 tracking-tight text-2xl font-bold">Leaking Tap</h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-primary text-sm font-semibold">Issue #1024</p>
          <span className="text-gray-400 dark:text-slate-600 text-sm">•</span>
          <p className="text-gray-600 dark:text-slate-400 text-sm">Unit 402, Block B</p>
        </div>
      </div>

      {/* Timer card */}
      <div className="p-4">
        <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-slate-800 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl">timer</span>
          </div>
          <p className="text-gray-500 dark:text-slate-500 text-[10px] font-bold tracking-[0.2em] mb-3 uppercase">Time elapsed</p>
          <div className="text-5xl font-mono font-bold text-primary tracking-tighter"
            style={{ filter: "drop-shadow(0 0 15px rgba(43,173,238,0.3))" }}>
            02:45:10
          </div>
          <div className="mt-5 flex items-center gap-3 py-2 px-5 bg-primary/10 border border-primary/20 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_8px_rgba(43,173,238,0.8)]" />
            </span>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Work in Progress</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-[56px_1fr] gap-x-0 px-6 mt-6">
        {/* Reported */}
        <div className="flex flex-col items-center">
          <div className="text-primary relative z-10 bg-white dark:bg-[#0a0f12] rounded-full">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <div className="w-[3px] bg-primary h-12 -mt-1 -mb-1" style={{ boxShadow: "0 0 8px rgba(43,173,238,0.4)" }} />
        </div>
        <div className="flex flex-1 flex-col pb-10 pl-4">
          <p className="text-black dark:text-slate-100 text-base font-bold leading-none">Reported</p>
          <p className="text-gray-600 dark:text-slate-400 text-sm mt-1.5 font-medium">Oct 24, 10:00 AM</p>
        </div>

        {/* Assigned */}
        <div className="flex flex-col items-center">
          <div className="text-primary relative z-10 bg-white dark:bg-[#0a0f12] rounded-full">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <div className="w-[3px] bg-primary h-20 -mt-1 -mb-1" style={{ boxShadow: "0 0 8px rgba(43,173,238,0.4)" }} />
        </div>
        <div className="flex flex-1 flex-col pb-10 pl-4">
          <p className="text-black dark:text-slate-100 text-base font-bold leading-none">Assigned</p>
          <p className="text-gray-600 dark:text-slate-400 text-sm mt-1.5 font-medium">Oct 24, 11:30 AM</p>
          <div className="mt-3 flex items-center gap-3 p-2 pr-4 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full w-fit">
            <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-slate-700 overflow-hidden ring-1 ring-gray-300 dark:ring-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6CUuXqzyyWxvPvWG5nEIlI6oSwA_N8HzHEAYBPF4jaIxbAY4Ss0qEOye8LCIx6-oASbyz4M2PeFKJ59D5hk0Uwy49Nu1We8jomvsfkpJNiHApGxvR8zFjomnXOV6rJvCzhmrVvN9XF7GWUEEKJXEhfWQ4U3cphVhKafb75Z8TQUyKgmDGAswy_W9X0mqQPy2GZVvObtgwGp0JG-IKylpdcNHINp-EnQZkexLsaGdIfi2PU_GbTKlmJQkm_xh4DeY9m-zWg0NuBkoE"
                alt="Technician" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-semibold text-black dark:text-slate-200">David M. (Plumber)</span>
          </div>
        </div>

        {/* In Progress */}
        <div className="flex flex-col items-center">
          <div className="text-primary relative z-10 bg-white dark:bg-[#0a0f12] rounded-full">
            <span className="material-symbols-outlined text-[28px] animate-pulse">pending</span>
          </div>
          <div className="w-[3px] bg-gray-300 dark:bg-slate-800 h-14 -mt-1 -mb-1" />
        </div>
        <div className="flex flex-1 flex-col pb-10 pl-4">
          <p className="text-primary text-base font-bold leading-none">In Progress</p>
          <p className="text-gray-600 dark:text-slate-400 text-sm mt-1.5 font-medium">Active since 12:45 PM</p>
        </div>

        {/* Fixed */}
        <div className="flex flex-col items-center">
          <div className="text-slate-700 relative z-10 bg-[#0a0f12] rounded-full">
            <span className="material-symbols-outlined text-[28px]">radio_button_unchecked</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col pl-4">
          <p className="text-slate-600 text-base font-bold leading-none">Fixed</p>
          <p className="text-slate-600 text-sm mt-1.5 font-medium">Pending completion</p>
        </div>
      </div>

      {/* Upload proof */}
      <div className="mt-auto p-4 space-y-4 pb-10">
        <h4 className="text-slate-500 text-[10px] font-bold tracking-[0.1em] uppercase px-1">Verification Required</h4>
        <button className="w-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-800 bg-slate-900/50 rounded-2xl py-8 hover:bg-slate-900 transition-all group active:scale-[0.98]">
          <div className="bg-primary/10 p-4 rounded-full text-primary ring-1 ring-primary/20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">add_a_photo</span>
          </div>
          <div className="text-center px-8">
            <p className="text-slate-100 font-bold text-base">Upload Photo Proof</p>
            <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">Take a photo of the completed repair to finalize this request.</p>
          </div>
        </button>
        <button className="w-full bg-primary hover:bg-primary/90 text-[#0a0f12] font-extrabold rounded-2xl shadow-xl shadow-primary/10 flex items-center justify-center gap-3 transition-transform active:scale-[0.98] h-14">
          <span className="text-base">Submit Completion</span>
          <span className="material-symbols-outlined font-bold">send</span>
        </button>
      </div>
    </div>
  );
}

export default function RepairsPageWrapper() {
  return <AuthGuard><RepairsPage /></AuthGuard>;
}
