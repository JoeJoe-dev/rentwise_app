"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { AuthGuard } from "@/components/AuthGuard";
import { SideDrawer } from "@/components/SideDrawer";
import { ThemeToggle } from "@/components/ThemeToggle";

function LandlordDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#101c22] text-black dark:text-white min-h-screen pb-24 max-w-[480px] mx-auto">
      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#101c22]/80 backdrop-blur-xl">
        <div className="flex items-center p-4 pb-2 justify-between">
          <div className="flex size-12 shrink-0 items-center">
            <button onClick={() => setDrawerOpen(true)}>
              {user?.avatarDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarDataUrl} alt="Avatar" className="size-10 rounded-full object-cover border-2 border-primary" />
              ) : (
                <div className="size-10 rounded-full bg-gray-300 dark:bg-slate-700 border-2 border-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-gray-600 dark:text-slate-300 text-xl">account_circle</span>
                </div>
              )}
            </button>
          </div>
          <div className="flex-1 px-3">
            <p className="text-xs text-gray-600 dark:text-slate-400 font-medium">Monday, Oct 24</p>
            <h2 className="text-black dark:text-white text-lg font-bold leading-tight">Good Morning, {user?.name?.split(" ")[0]}</h2>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 text-black dark:text-white">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="px-4 py-2">
        <div className="flex flex-wrap gap-3">
          <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-5 bg-gray-50 dark:bg-[#192b33] shadow-sm border border-gray-200 dark:border-slate-800">
            <p className="text-gray-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Revenue</p>
            <div className="flex items-baseline gap-2">
              <p className="text-black dark:text-white text-2xl font-bold">$12,450</p>
              <p className="text-[#0bda57] text-xs font-bold">+5.2%</p>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-5 bg-[#192b33] shadow-sm border border-slate-800">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Occupancy Rate</p>
            <div className="flex items-baseline gap-2">
              <p className="text-white text-2xl font-bold">94%</p>
              <p className="text-primary text-xs font-bold">High</p>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Alerts */}
      <section className="mt-4">
        <div className="flex items-center justify-between px-4 pb-2">
          <h3 className="text-white text-lg font-bold">Critical Alerts</h3>
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2 NEW</span>
        </div>
        {/* Alert 1 */}
        <div className="px-4 py-2">
          <div className="flex items-stretch justify-between gap-4 rounded-xl bg-[#192b33] p-4 shadow-sm border-l-4 border-red-500">
            <div className="flex flex-[2_2_0px] flex-col justify-between gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-red-500 text-sm">error</span>
                  <p className="text-red-500 text-xs font-bold uppercase tracking-tight">Maintenance</p>
                </div>
                <p className="text-white text-base font-bold">Leaking Pipe - Unit 4B</p>
                <p className="text-slate-400 text-sm">Emergency request submitted 2h ago</p>
              </div>
              <button onClick={() => router.push("/repairs")} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-primary text-white gap-2 text-sm font-bold w-fit">
                <span>Dispatch Repair</span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
            <div className="w-24 bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
              style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsAY9eiFXrp3SGXmwODZIxI9Gq7kgHMCilBb-pn8-MKwSiC-VOk2ddYyiappWt4DejUV19bJ6WG9bqUMrceAeYzlU49PMjNDtzXQyvvItATmh35DhClsN7JdQFBmme2OAR-gCusjpndRVD9PF214CsoIxsEQ9PXGq4zJqWsH_gMRD3gj6R2bLeYJrAgmlVq2WLNUcdGc-7S1Wz4CDMMz3LgSdKk42YYYNZfzd9M7Y8_QFDx9iNZ0MfZ9rACnWYj9aXH102IvjNjPII")` }} />
          </div>
        </div>
        {/* Alert 2 */}
        <div className="px-4 py-2">
          <div className="flex items-stretch justify-between gap-4 rounded-xl bg-[#192b33] p-4 shadow-sm border-l-4 border-amber-500">
            <div className="flex flex-1 flex-col justify-between gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-amber-500 text-sm">schedule</span>
                  <p className="text-amber-500 text-xs font-bold uppercase">Payment Overdue</p>
                </div>
                <p className="text-white text-base font-bold">Unit 12C - Mark Jensen</p>
                <p className="text-slate-400 text-sm">Rent payment overdue by 3 days</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 cursor-pointer items-center justify-center rounded-lg h-9 px-3 bg-slate-700 text-white text-xs font-bold flex">Send Reminder</button>
                <button className="flex-1 cursor-pointer items-center justify-center rounded-lg h-9 px-3 bg-slate-700 text-white text-xs font-bold flex">Call Tenant</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties */}
      <section className="mt-4">
        <div className="flex items-center justify-between px-4 pb-2">
          <h3 className="text-white text-lg font-bold">Properties</h3>
          <button className="text-primary text-sm font-semibold">View All</button>
        </div>
        <div className="flex flex-col gap-3 px-4">
          {[
            { name: "Oakwood Apartments", addr: "124 Oak St, North Bergen", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoUlsh5fp6ZR-oYRMOl7vW7tMRl_0U6xIuzrPP5OKpRzBtRl5-CmpapXSQi78R1qlNDq9Y_4Rbh2AI3wyEv1GQYluO3gBJ9cLZvHjJzJOIRLOpeCUnzcPBwjl6TKhglEdg2ZnqBr-pbptnRyH5p96su6v2q47mRKEHPhdltHknl3-_q_WhJ_fGb4s6euJagaLQCqMMCEXbhkNxlvlyOQmEGAMUfnGOllbvwb1KM5m0JJIs8U-2kOHEMVU4ghmk3RQL5Jqr0KwgHXoz", tags: [{ label: "Rent Paid", color: "text-[#0bda57] bg-[#0bda57]/20" }, { label: "8/8 Units", color: "text-primary bg-primary/20" }] },
            { name: "Skyline View Lofts", addr: "45 Waterfront Ave, Downtown", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtQj7FEa4S3knyE_dNPcoMeHGkesiRr0Cntg2mULryQHAwTeIXoG5buFFsEKwv1vlU2JsR_pw2l_zxAaD_H0KWn2L5yNmnMnNXRBg_uj-gxpeaUroNNrERYtmUKP6F4elKWA8BNMOXUBvES3-ZJMOHh6N1KbcrSSzcloS9T35lctFAeiKLYHbMMAQvZPGbQ-bvoQKKokw_rHI-L3viKfAc0mwMkVzMeD-8uKKx5zFzz5E9cSzu9QCGL_-DwhfLzIJTfrylLu-ykVxQ", tags: [{ label: "3 Tasks", color: "text-red-500 bg-red-500/20" }, { label: "1 Vacancy", color: "text-amber-500 bg-amber-500/20" }] },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl bg-[#192b33] p-3 shadow-sm border border-slate-800">
              <div className="size-16 bg-center bg-no-repeat bg-cover rounded-lg shrink-0" style={{ backgroundImage: `url("${p.img}")` }} />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold truncate">{p.name}</p>
                <p className="text-slate-400 text-xs truncate">{p.addr}</p>
                <div className="flex gap-2 mt-1.5">
                  {p.tags.map((t, j) => (
                    <span key={j} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.color}`}>{t.label}</span>
                  ))}
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAB */}
      <button className="fixed right-6 bottom-24 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 z-40">
        <span className="material-symbols-outlined text-[28px]">add</span>
      </button>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#101c22]/90 backdrop-blur-xl border-t border-slate-800 px-6 flex items-start pt-3 justify-between z-50 max-w-[480px] mx-auto">
        <button className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-[26px]">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => router.push("/community")} className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined text-[26px]">chat_bubble</span>
          <span className="text-[10px] font-medium">Messages</span>
        </button>
        <button onClick={() => alert('Finance page coming soon')} className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined text-[26px]">payments</span>
          <span className="text-[10px] font-medium">Finance</span>
        </button>
        <button onClick={() => alert('Assets page coming soon')} className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined text-[26px]">apartment</span>
          <span className="text-[10px] font-medium">Assets</span>
        </button>
        <button onClick={() => router.push("/profile")} className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined text-[26px]">settings</span>
          <span className="text-[10px] font-medium">Settings</span>
        </button>
      </nav>
    </div>
  );
}

export default function LandlordPage() {
  return <AuthGuard><LandlordDashboard /></AuthGuard>;
}
