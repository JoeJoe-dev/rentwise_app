"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/AuthGuard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/lib/AuthContext";

const CATEGORIES = [
  { label: "All", icon: null },
  { label: "Plumber", icon: "plumbing" },
  { label: "Electrician", icon: "bolt" },
  { label: "Carpenter", icon: "carpenter" },
];

const PROVIDERS = [
  { id: "1", name: "John Doe", category: "Plumber", rating: 4.8, reviews: 120, distance: "Nairobi Central • 2.5 km", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR2kezFLojp5BwhX0P5eJ4F8AdkmFt0HIPpreuYGz6Vm6gV1beRWTX7GwyxN0iCeyWd6M2-Was4drZo-sEF_m71qQCYdtthx2sn2us-AHP1t0_JDz3qa18Z5-7LSlToEszJjiXFTBu5udmI_sufpmtlyaixp0hbRjdsWoQ4MYDGIjMZE47G807WpWCY_2KSSHRycMlmK5g7vCz5oltTIMCXd_ZsG2dVUBqEIuerA6JzCErpESbXFERwbAEylyjS4-fNsGynSQM9cLw" },
  { id: "2", name: "Jane Smith", category: "Electrician", rating: 4.9, reviews: 85, distance: "Westlands • 3.1 km", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSVwVjmrdyOhfQRb3iGb0_262t74K_IPZaV_0Ue21Ovw2syQumxXXblYUBsnez_Vpuryio1PHF9887AdUTeqQSd8mAiKGt55F3JnfPQyfLjpfNYUL60V2_kqKpqD_GFmY9tQLlndiTkz_Q00n3te3ZZK1aVDFZe3ol2Cg6zUWAEd5IgjSUw0gGP07_D1OrcW31BVd2hyelMahgU98jKH1P_PfHmkGxjJiuGz6sBf6CJUZuVwJ26sKO0hcloGn0BlYIKqUKksg0BjRG" },
  { id: "3", name: "Samuel Omari", category: "Carpenter", rating: 4.7, reviews: 42, distance: "Kilimani • 4.8 km", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3Zyq7PuDqCzVSuISv8Qx2jy5XQ9hvbTSxs0MpTRpu_y4kAgf1f3Dh4SfJzr6LxSMp1kN2mK5EYpeIS6GqXb3rYS5uwB5-VSdRMfFMWfnCVHzEfIBsxIzwUkP5ekhkvDsjLm6Pp3j9izof60cPJqszNG86N7vG0WZDu9Wb7n2GoX5hLNyUbu1qPmmNShFp1TpnXJu13ElfXFlMohvK9BnrEdCrKjH-K3XDpr5Ygw02JwHVwgwjFpdy_xiQu7mh-qAW_rZubWgv13Lx" },
  { id: "4", name: "Kevin Maina", category: "Plumber", rating: 4.8, reviews: 156, distance: "Ngong Road • 1.2 km", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzJG_U4O1UO3Pq-EI14cGYMj6l43pMmx39Kn7-HMZkuzBr-Y-6-vn0K--6lPgf_8aRHUvlITjeWCYFg837Ju5S27TKNufUIVFDVAwVQjFkauoi7zTTrCy4vAQGt43DBr6WaFbZ1KpEMPdaa5Z5wlDx5I--VTKx4jZoxLsN56Zaxyo7GiM50WDZsvQAvq_MaJdNIdJCpj3EbHRhiruewQUwqXd0TkVyJWmuxhbyoILkSFZ8KfM9CLzqlCypehm0Y2PHmPMryMwLUxfs" },
];

function ServicesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = PROVIDERS.filter(p => {
    const matchCat = active === "All" || p.category === active;
    const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="bg-white dark:bg-[#0f172a] text-black dark:text-slate-100 min-h-screen max-w-[480px] mx-auto">
      <div className="h-12 w-full" />
      {/* Sticky top */}
      <div className="sticky top-0 z-50 bg-white dark:bg-[#0f172a]/90 backdrop-blur-xl">
        <div className="flex items-center px-4 py-3 justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-black dark:text-white cursor-pointer">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-black dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Verified Services</h2>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="flex items-center justify-center rounded-full h-10 w-10 text-black dark:text-white">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
        </div>
        {/* Search */}
        <div className="px-4 py-2">
          <label className="flex flex-col w-full h-11">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50">
              <div className="text-gray-500 dark:text-slate-400 flex items-center justify-center pl-4">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input value={query} onChange={e => setQuery(e.target.value)}
                className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-500 px-3 text-[17px] font-normal"
                placeholder="Search for service providers" />
            </div>
          </label>
        </div>
        {/* Chips */}
        <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button key={cat.label} onClick={() => setActive(cat.label)}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors ${active === cat.label ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-black dark:text-slate-300"}`}>
              {cat.icon && <span className="material-symbols-outlined text-lg">{cat.icon}</span>}
              <p className="text-sm font-semibold">{cat.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Provider cards */}
      <div className="px-4 pb-32 pt-2 space-y-4">
        {filtered.map(p => (
          <div key={p.id} className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-[#1e293b] p-5 shadow-xl border border-gray-200 dark:border-slate-700/50">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 bg-center bg-no-repeat bg-cover rounded-full border-2 border-primary/30 ring-4 ring-primary/5 shrink-0"
                style={{ backgroundImage: `url("${p.avatar}")` }} />
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-1.5">
                  <p className="text-black dark:text-white text-[17px] font-bold">{p.name}</p>
                  <div className="flex items-center justify-center bg-primary/10 p-0.5 rounded-full">
                    <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                </div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mt-0.5">{p.category}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="material-symbols-outlined text-amber-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <p className="text-gray-700 dark:text-slate-300 text-sm font-semibold">{p.rating} <span className="text-gray-500 dark:text-slate-500 font-normal ml-1">({p.reviews} reviews)</span></p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-700/50 pt-4">
              <div className="flex items-center text-gray-600 dark:text-slate-400 text-xs font-medium">
                <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                {p.distance}
              </div>
              <button className="flex items-center justify-center rounded-xl h-10 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all">
                Request Service
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full bg-white dark:bg-[#0f172a]/80 backdrop-blur-2xl border-t border-gray-200 dark:border-slate-800 pb-8 pt-2 px-6 flex items-center justify-between max-w-[480px]">
        <button onClick={() => router.push(user?.role === "tenant" ? "/dashboard" : "/landlord")} className="flex flex-col items-center gap-1 text-gray-600 dark:text-slate-500">
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="text-[10px] font-semibold">Home</span>
        </button>
        <div className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>build</span>
          <span className="text-[10px] font-bold">Services</span>
        </div>
        <button onClick={() => router.push("/community")} className="flex flex-col items-center gap-1 text-gray-600 dark:text-slate-500">
          <span className="material-symbols-outlined text-2xl">chat_bubble</span>
          <span className="text-[10px] font-semibold">Community</span>
        </button>
        <button onClick={() => router.push("/profile")} className="flex flex-col items-center gap-1 text-gray-600 dark:text-slate-500">
          <span className="material-symbols-outlined text-2xl">person</span>
          <span className="text-[10px] font-semibold">Profile</span>
        </button>
      </div>
    </div>
  );
}

export default function ServicesPageWrapper() {
  return <AuthGuard><ServicesPage /></AuthGuard>;
}
