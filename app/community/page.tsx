"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/AuthGuard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/lib/AuthContext";

const TAGS = ["All Posts", "Safety", "Maintenance", "Leasing", "Reviews"];

const POSTS = [
  {
    id: "1", author: "David Mwangi", tag: "Safety", time: "2 hours ago", verified: true,
    title: "Street lighting on Main Ave",
    content: "Does anyone know when the city plans to fix the lights near the station? It feels unsafe walking back from work at night.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZQlAW0jOH5aJ69-S8-DD24YIGonI8UfAKkNHtPkW3uS8qP8QipwXNr9HHh2lm_t-XtY8L-MnkbQogOUfpHLUShC6vxy4PnDp5uSBM6qUFWlYNfmEKUlF87NDyMPW87xQ6bDHF20xKmHGoEaj3iDo-zIm0TNDWZlGhtpzLCpQrUz3Eizzu3MLxavUOdVGpSDLK4i9SOh3b1jzVjzZeuXku4lh20yXmSW0EtfQ15D7Ewzyu-UxkaPS8FAtaO5LO7I-o8GdFyeP7N6I3",
    likes: 24, comments: 12,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZOy8Esu6aiUgcHQj0cEUm4NdxZCGf1gpib3XX_4xic4arsdhCSph5CjFG-VI6hPG4RPAJ5RdK9lcOksQobt-SBWVGsHR15p0BAi-9nXq76pG8y1I0OManq9VqIch2kNnHL3PRZJp31AnPTewSYlGjKPOrHLeb9GSdfjIhLcHLa5YZEdxu6jkFoFeXYfOGLJUjZOuVyqFsTmUj-f0Pd4csydsmx5mh2DDALDm7D6YL9j8dC92EnHhincMpX7NwfNYJWQrHfb-R-ArX",
  },
  {
    id: "2", author: "Sarah Chen", tag: "Maintenance", time: "5 hours ago", verified: true,
    title: "Plumbing response times",
    content: "How long does your landlord usually take to respond to non-emergency leaks? I've been waiting for 3 days.",
    img: null, likes: 8, comments: 15,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcrHod6TvzDkMKNfKh8PGQFKasPh-0KleJcZqRGQv70ktjhdmyUg6EyUTvkSMlucq0OL9yQ-XBFMG_o7C1dYD2ABhN08BcRZvX_q2K_vNCKjp34KUKqyuPWpLuVhZFGTHiLMZSUrq5IQ6Vzsa3M1WJHUM8DEF1dP9ZgEk19dk1vgEPyE7IN6oKkJw8t1YosWGgsW040G0e429ldG2JoHC2ancpHXd5uPz_MiAb06Ok485__wqyLGB8fkaT5aE-CLCvOrec2Nzj5DOm",
  },
  {
    id: "3", author: "James O.", tag: "Leasing", time: "Yesterday", verified: false,
    title: "Security Deposit Questions",
    content: "Is it standard for landlords to ask for 3 months upfront? Looking for advice on negotiating this for a new studio.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClv5XFQDrA9ZJ9gWRQRiCwkQbnibp0pwSyNWIUOEDMCCxSUCtWhwnvzxLznOC_LJWw5IwtHxWnZBf85jKD5C8Yz8Wsfs5yJ5U57DlZDDPWZ7e_rUf3G8jo4TtTWIG6xtrW8IrU0YTiZoDWpij8ZUuMPjUtDLDrfE9EesJcuMC4BoXytSWWq3lNoIDTQCuBU96_kFSu6iVZtxYFFP6Z8bLl0Rff6SbsEOsqcUDSN_fQro4_JfL8GcWU-LjdCXuhF_FWJFsXudiHh23m",
    likes: 32, comments: 42,
    avatar: null,
  },
];

function CommunityPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTag, setActiveTag] = useState("All Posts");
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const filtered = POSTS.filter(p => activeTag === "All Posts" || p.tag === activeTag);

  return (
    <div className="bg-white dark:bg-[#0a0f12] text-black dark:text-slate-100 min-h-screen max-w-md mx-auto">
      {/* Sticky top */}
      <div className="sticky top-0 z-50 bg-white dark:bg-[#0a0f12]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center p-4 justify-between">
          <button onClick={() => router.back()} className="text-black dark:text-white flex size-12 shrink-0 items-center">
            <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
          </button>
          <h1 className="text-black dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Community</h1>
          <ThemeToggle />
        </div>
      </div>

      <main className="pb-24">
        {/* Ask Question */}
        <div className="flex px-4 py-4">
          <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary text-white shadow-lg shadow-primary/20 gap-3 transition-transform active:scale-95">
            <span className="material-symbols-outlined">add_circle</span>
            <span className="text-base font-bold leading-normal tracking-wide">Ask a Question</span>
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-3 px-4 py-2 overflow-x-auto no-scrollbar items-center">
          {TAGS.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 border transition-colors ${activeTag === tag ? "bg-primary border-primary/10 text-white" : "bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-400"}`}>
              <p className="text-sm font-semibold">{tag}</p>
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-4 px-4 mt-4">
          {filtered.map(post => (
            <div key={post.id} className="bg-white dark:bg-[#162128] rounded-xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-xl">
              <div className="p-4">
                {/* Author */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden shrink-0">
                    {post.avatar
                      ? <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-slate-400">person</span></div>
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-black dark:text-white">{post.author}</span>
                      {post.verified && <span className="material-symbols-outlined text-primary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>}
                    </div>
                    <p className="text-gray-500 dark:text-slate-400 text-xs">{post.tag} • {post.time}</p>
                  </div>
                  <button className="text-gray-500 dark:text-slate-500"><span className="material-symbols-outlined text-xl">more_horiz</span></button>
                </div>

                {/* Image */}
                {post.img && (
                  <div className="w-full h-48 bg-center bg-no-repeat bg-cover rounded-lg mb-3"
                    style={{ backgroundImage: `url("${post.img}")` }} />
                )}

                <h3 className="text-black dark:text-white text-lg font-bold leading-tight tracking-tight">{post.title}</h3>
                <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed mt-1">{post.content}</p>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-white/5">
                  <div className="flex gap-4">
                    <button onClick={() => setLiked(prev => { const n = new Set(prev); n.has(post.id) ? n.delete(post.id) : n.add(post.id); return n; })}
                      className={`flex items-center gap-1.5 ${liked.has(post.id) ? "text-primary" : "text-gray-500 dark:text-slate-400"}`}>
                      <span className="material-symbols-outlined text-lg" style={liked.has(post.id) ? { fontVariationSettings: "'FILL' 1" } : {}}>thumb_up</span>
                      <span className="text-xs font-medium">{post.likes + (liked.has(post.id) ? 1 : 0)}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400">
                      <span className="material-symbols-outlined text-lg">chat_bubble</span>
                      <span className="text-xs font-medium">{post.comments}</span>
                    </button>
                  </div>
                  <button className="rounded-lg h-8 px-4 bg-primary/20 text-primary text-xs font-bold transition-colors">
                    View Discussion
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#0a0f12]/95 backdrop-blur-lg border-t border-gray-200 dark:border-white/10 px-4 py-2 z-50 max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          <button onClick={() => router.push(user?.role === "tenant" ? "/dashboard" : "/landlord")} className="flex flex-col items-center gap-1 text-gray-600 dark:text-slate-500">
            <span className="material-symbols-outlined text-2xl">home</span>
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <div className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
            <span className="text-[10px] font-bold">Community</span>
          </div>
          <button onClick={() => router.push("/search")} className="flex flex-col items-center gap-1 text-gray-600 dark:text-slate-500">
            <span className="material-symbols-outlined text-2xl">key</span>
            <span className="text-[10px] font-medium">Rentals</span>
          </button>
          <button onClick={() => router.push("/services")} className="flex flex-col items-center gap-1 text-gray-600 dark:text-slate-500">
            <span className="material-symbols-outlined text-2xl">build</span>
            <span className="text-[10px] font-medium">Services</span>
          </button>
          <button onClick={() => router.push("/profile")} className="flex flex-col items-center gap-1 text-gray-600 dark:text-slate-500">
            <span className="material-symbols-outlined text-2xl">account_circle</span>
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommunityPageWrapper() {
  return <AuthGuard><CommunityPage /></AuthGuard>;
}
