"use client";

import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[430px] mx-auto bg-[#070B14]">
      <div className="flex items-center p-6 justify-end">
        <button onClick={() => router.push("/role")}
          className="text-primary text-base font-semibold hover:opacity-80 transition-opacity">
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-4 w-full relative">
        <div className="w-full aspect-square relative flex items-center justify-center"
          style={{ background: "radial-gradient(circle at center, rgba(43,173,238,0.15) 0%, rgba(7,11,20,0) 70%)" }}>
          <div className="relative w-52 h-[340px] bg-[#161E31] rounded-[2.5rem] border-[6px] border-[#1E293B] shadow-2xl overflow-hidden flex flex-col">
            <div className="h-6 w-24 bg-[#1E293B] mx-auto mt-2 rounded-full mb-4" />
            <div className="px-5 space-y-5">
              <div className="h-4 w-2/3 bg-slate-700/50 rounded-full mb-2" />
              {[false, true, false].map((active, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${active ? "bg-primary/10 border-primary/20" : "bg-slate-800/40 border-white/5"}`}>
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${active ? "bg-primary shadow-lg shadow-primary/40" : "bg-primary/20"}`}>
                    <span className={`material-symbols-outlined text-xs ${active ? "text-white font-bold" : "text-primary"}`}>check</span>
                  </div>
                  <div className={`h-2 w-full rounded ${active ? "bg-primary/30" : "bg-slate-600/40"}`} />
                </div>
              ))}
            </div>
            <div className="mt-auto p-4 flex justify-center">
              <div className="h-1.5 w-16 bg-slate-700/80 rounded-full" />
            </div>
          </div>
          <div className="absolute top-10 left-10 w-16 h-16 bg-primary/20 blur-2xl rounded-full" />
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-4 right-12 w-20 h-20 bg-[#161E31] rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center transform rotate-12">
            <span className="material-symbols-outlined text-primary text-4xl">verified_user</span>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="px-8 pb-8 pt-4">
        <h1 className="text-white tracking-tight text-[32px] font-bold leading-[1.2] text-center mb-4">
          Manage your rent &amp; repairs easily
        </h1>
        <p className="text-slate-400 text-lg font-normal leading-relaxed text-center px-2">
          Keep track of maintenance requests and payments all in one secure place. Building trust in every lease.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-auto px-6 pb-12 flex flex-col items-center gap-8">
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-primary shadow-[0_0_8px_rgba(43,173,238,0.6)]" />
          <div className="h-2 w-2 rounded-full bg-slate-800" />
          <div className="h-2 w-2 rounded-full bg-slate-800" />
        </div>
        <button onClick={() => router.push("/role")}
          className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
          <span className="text-lg">Next</span>
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </div>
      <div className="h-2" />
    </div>
  );
}
