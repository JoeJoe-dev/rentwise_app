"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { AuthGuard } from "@/components/AuthGuard";
import { SideDrawer } from "@/components/SideDrawer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationDropdown } from "@/components/NotificationDropdown";

function TenantDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col max-w-md mx-auto shadow-2xl overflow-x-hidden bg-white dark:bg-[#101c22]">
      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* TopAppBar */}
      <div className="flex items-center bg-white dark:bg-[#101c22] p-4 pb-2 justify-between sticky top-0 z-10 border-b border-gray-200 dark:border-white/5">
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
          <p className="text-gray-600 dark:text-[#92b7c9] text-xs font-normal">Good morning,</p>
          <h2 className="text-black dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">{user?.name ?? "Tenant"}</h2>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative flex size-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-black dark:text-white transition-colors active:bg-gray-200 dark:active:bg-white/10"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500" />
            </button>
            <NotificationDropdown
              isOpen={notificationOpen}
              onClose={() => setNotificationOpen(false)}
            />
          </div>
        </div>
      </div>

      <div className="h-4" />

      {/* Rent Due Card */}
      <div className="px-4 @container">
        <div className="flex flex-col items-stretch rounded-xl shadow-xl bg-gray-50 dark:bg-[#192b33] border border-gray-200 dark:border-white/5 overflow-hidden">
          <div className="w-full bg-center bg-no-repeat aspect-[21/9] bg-cover relative"
            style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUVVvIffgWy9wqQ-6gwdPQFjsuinodsGuB8pEUe89_HvAf22abfPTWW1muYMNgx0W2wZ93S0dwMUjXlb2z35sg3XYqnKNRVT_Xu43-37joGgxKYYYOArUxLdd9OyZgU8gTHEl7lMTAqdhLQG9rg-p09xPWfoFDUXDCZUSTo-K-BKhNc_7xYfg4G4lpE4s3DsuZKSk51o2ytd_JOtOd3FhcfXgUA_3U-pcmgllnBn9OFx6N-C0Ag9niSltn5sOErWTCaeSfUNm0P9Ln")` }}>
            <div className="w-full h-full bg-gradient-to-t from-gray-50 dark:from-[#192b33] to-transparent" />
          </div>
          <div className="flex w-full min-w-72 grow flex-col gap-1 py-5 px-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-black dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">$1,200.00</p>
                <p className="text-gray-600 dark:text-[#92b7c9] text-sm">Rent for October</p>
              </div>
              <div className="bg-primary/10 px-2 py-1 rounded">
                <p className="text-primary text-[10px] font-bold uppercase tracking-wider">Due in 3 days</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-between mt-4">
              <p className="text-gray-600 dark:text-[#92b7c9] text-sm">Due: Oct 1, 2023</p>
              <button className="flex min-w-[100px] items-center justify-center rounded-lg h-10 px-4 bg-primary text-[#111c22] text-sm font-bold shadow-lg shadow-primary/20 transition-transform active:scale-95">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance */}
      <div className="flex justify-between items-center px-4 pb-2 pt-8">
        <h3 className="text-black dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Maintenance Status</h3>
        <button onClick={() => router.push("/repairs")} className="text-primary text-sm font-medium">View History</button>
      </div>
      <div className="mx-4 mb-4 rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#192b33] p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <span className="material-symbols-outlined text-primary">water_drop</span>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex justify-between items-center">
                <p className="text-black dark:text-white text-base font-bold">Leaking Sink</p>
                <p className="text-gray-600 dark:text-[#92b7c9] text-xs">#MT-8291</p>
              </div>
              <p className="text-gray-600 dark:text-[#92b7c9] text-sm">Kitchen Faucet</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-medium uppercase tracking-wider">
              <span className="text-primary">In Progress</span>
              <span className="text-gray-500 dark:text-white/40 italic">ETA: 2:00 PM Today</span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-300 dark:bg-[#325567] overflow-hidden">
              <div className="h-full rounded-full bg-primary" style={{ width: "75%" }} />
            </div>
            <div className="flex justify-between text-[10px] text-gray-600 dark:text-[#92b7c9] pt-1">
              <span>Reported</span><span>Assigned</span><span className="text-white font-bold">Progress</span><span>Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-2 pt-6">
        <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4">
        <div onClick={() => router.push("/repairs")} className="flex flex-col gap-3 rounded-xl border border-white/5 bg-[#192b33] p-4 items-start transition-colors active:bg-[#253e49] cursor-pointer">
          <div className="text-primary bg-primary/10 p-2 rounded-lg"><span className="material-symbols-outlined">build</span></div>
          <h2 className="text-white text-sm font-bold">Report Issue</h2>
        </div>
        <div onClick={() => router.push("/search")} className="flex flex-col gap-3 rounded-xl border border-white/5 bg-[#192b33] p-4 items-start transition-colors active:bg-[#253e49] cursor-pointer">
          <div className="text-primary bg-primary/10 p-2 rounded-lg"><span className="material-symbols-outlined">search</span></div>
          <h2 className="text-white text-sm font-bold">Find House</h2>
        </div>
        <div onClick={() => router.push("/community")} className="flex flex-col gap-3 rounded-xl border border-white/5 bg-[#192b33] p-4 items-start transition-colors active:bg-[#253e49] cursor-pointer col-span-2">
          <div className="flex items-center gap-3 w-full">
            <div className="text-primary bg-primary/10 p-2 rounded-lg"><span className="material-symbols-outlined">groups</span></div>
            <div className="flex-1">
              <h2 className="text-white text-sm font-bold">Community Forum</h2>
              <p className="text-[#92b7c9] text-xs">Join local discussions</p>
            </div>
            <span className="material-symbols-outlined text-[#92b7c9]">chevron_right</span>
          </div>
        </div>
      </div>

      <div className="h-24" />

      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-[#111c22]/90 backdrop-blur-md border-t border-gray-200 dark:border-white/10 px-8 py-3 flex justify-between items-center">
        <div className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </div>
        <button onClick={() => router.push("/search")} className="flex flex-col items-center gap-1 text-gray-600 dark:text-[#92b7c9]">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-medium">Rent</span>
        </button>
        <button onClick={() => router.push("/services")} className="flex flex-col items-center gap-1 text-gray-600 dark:text-[#92b7c9]">
          <span className="material-symbols-outlined">build</span>
          <span className="text-[10px] font-medium">Services</span>
        </button>
        <button onClick={() => router.push("/profile")} className="flex flex-col items-center gap-1 text-gray-600 dark:text-[#92b7c9]">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <AuthGuard><TenantDashboard /></AuthGuard>;
}
