"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockProperties } from "@/lib/mockData";
import { AuthGuard } from "@/components/AuthGuard";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Property } from "@/types";

const FILTERS = ["Location", "Price", "Type", "Beds"];

function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const filtered: Property[] = mockProperties.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.location.toLowerCase().includes(query.toLowerCase())
  );

  const toggleSave = (id: string) => setSaved(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white dark:bg-[#0a0f12] text-black dark:text-slate-100 overflow-x-hidden">
      {/* Sticky top */}
      <div className="sticky top-0 z-50 bg-white dark:bg-[#0a0f12]/95 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between max-w-[480px] mx-auto">
          <button onClick={() => router.back()} className="text-black dark:text-white flex size-12 shrink-0 items-center">
            <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
          </button>
          <h2 className="text-white dark:text-black text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Find a House</h2>
          <ThemeToggle />
        </div>
        {/* Search */}
        <div className="px-4 py-2 max-w-[480px] mx-auto">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-12 bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/50">
            <div className="text-slate-400 flex items-center justify-center pl-4">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="City or neighborhood"
              className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-slate-500 px-4 pl-2 text-base" />
          </div>
        </div>
        {/* Filter chips */}
        <div className="flex gap-3 px-4 py-3 overflow-x-auto no-scrollbar max-w-[480px] mx-auto">
          {FILTERS.map(f => (
            <button key={f} className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-4 shadow-sm">
              <p className="text-black dark:text-slate-200 text-sm font-medium">{f}</p>
              <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
            </button>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="flex flex-col gap-4 p-4 pb-20 max-w-[480px] mx-auto w-full">
        {filtered.map(property => (
          <div key={property.id} className="flex flex-col items-stretch rounded-xl overflow-hidden shadow-md bg-white dark:bg-[#162229] border border-gray-200 dark:border-slate-700/40">
            <div className="relative w-full aspect-[16/10] bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url("${property.imageUrl}")` }}>
              <div className="absolute top-4 left-4 bg-[#f97316] text-white px-3 py-1.5 rounded-lg font-bold text-lg shadow-lg">
                ${property.price.toLocaleString()}<span className="text-sm font-normal">/mo</span>
              </div>
              {property.verified && (
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/80 dark:bg-[#0a0f12]/80 backdrop-blur px-2.5 py-1 rounded-full border border-primary/20 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-sm font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="text-primary text-xs font-bold uppercase tracking-wider">Verified</span>
                </div>
              )}
            </div>
            <div className="flex w-full grow flex-col gap-2 p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-black dark:text-white text-xl font-bold leading-tight">{property.title}</h3>
                <button onClick={() => toggleSave(property.id)} className={`${saved.has(property.id) ? "text-red-500" : "text-gray-400 dark:text-slate-400"}`}>
                  <span className="material-symbols-outlined" style={saved.has(property.id) ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-lg">location_on</span>
                <p className="text-sm">{property.location}</p>
              </div>
              <div className="flex items-center gap-4 py-2 border-y border-gray-200 dark:border-slate-700/50 my-1">
                {[
                  { icon: "bed", val: `${property.beds} Beds` },
                  { icon: "bathroom", val: `${property.baths} Baths` },
                  { icon: "straighten", val: `${property.sqft} sqft` },
                ].map((d, i) => (
                  <div key={i} className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-lg">{d.icon}</span>
                    {d.val}
                  </div>
                ))}
              </div>
              <button className="mt-2 w-full h-11 bg-primary text-white font-bold rounded-xl shadow-sm shadow-primary/20 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg">visibility</span>
                View Property
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <span className="material-symbols-outlined text-5xl mb-3">search_off</span>
            <p className="text-base font-medium">No properties found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPageWrapper() {
  return <AuthGuard><SearchPage /></AuthGuard>;
}
