"use client";

import { useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import type { UserRole } from "@/types";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = (searchParams.get("role") ?? "tenant") as UserRole;
  const { login } = useAuth();

  const [nin, setNin] = useState("");
  const [email, setEmail] = useState("");
  const [ninDocument, setNinDocument] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ninFileInputRef = useRef<HTMLInputElement>(null);

  const handleNinDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setNinDocument(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setError("");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (nin.replace(/\s/g, "").length < 11) {
      setError("Please enter a valid NIN (minimum 11 digits).");
      return;
    }
    if (!ninDocument) {
      setError("Please upload your NIN document.");
      return;
    }
    setLoading(true);
    const result = await login(email, nin, ninDocument, role, avatarDataUrl ?? undefined);
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? "Verification failed.");
    } else {
      router.push(role === "landlord" ? "/landlord" : "/dashboard");
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full max-w-[430px] mx-auto flex-col bg-[#101c22] overflow-x-hidden text-white">
      {/* Top bar */}
      <div className="flex items-center p-4 pb-2 justify-between">
        <button onClick={() => router.back()} className="text-white flex size-12 shrink-0 items-center cursor-pointer">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Sign Up</h2>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-white text-base font-medium">Identity Verification</p>
          <p className="text-slate-400 text-sm font-semibold">Step 2 of 3</p>
        </div>
        <div className="rounded-full bg-slate-800 h-2 overflow-hidden">
          <div className="h-full rounded-full bg-primary" style={{ width: "66.6%" }} />
        </div>
      </div>

      {/* Headline */}
      <div className="px-4 pt-4">
        <h3 className="text-white text-2xl font-bold leading-tight pb-2">Verify your identity</h3>
        <p className="text-slate-400 text-base font-normal leading-relaxed">
          Please provide your official identification. Your name on the NIN will be used as your display name.
        </p>
      </div>

      {/* Form */}
      <div className="mt-4 px-4 flex-1">
        <div className="flex flex-col gap-6">
          {/* Avatar upload */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-white text-base font-medium w-full">Profile Photo (optional)</p>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-24 h-24 rounded-full cursor-pointer group"
            >
              {avatarDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarDataUrl} alt="Avatar" className="w-full h-full rounded-full object-cover border-2 border-primary" />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-800 border-2 border-dashed border-slate-600 flex flex-col items-center justify-center group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-slate-400 text-3xl">add_a_photo</span>
                  <span className="text-[10px] text-slate-500 mt-1">Upload</span>
                </div>
              )}
              {avatarDataUrl && (
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl">edit</span>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>

          {/* Email input */}
          <div className="flex flex-col w-full">
            <label className="flex flex-col w-full">
              <p className="text-white text-base font-medium leading-normal pb-2">Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="Enter your email address"
                className="w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-[#334752] bg-[#1c2a32] h-14 placeholder:text-slate-500 p-[15px] text-base"
              />
            </label>
          </div>

          {/* NIN input */}
          <div className="flex flex-col w-full">
            <label className="flex flex-col w-full">
              <p className="text-white text-base font-medium leading-normal pb-2">National ID Number (NIN)</p>
              <div className="flex w-full items-stretch rounded-lg shadow-sm">
                <input
                  type="text"
                  value={nin}
                  onChange={(e) => { setNin(e.target.value); setError(""); }}
                  placeholder="Enter your 11-12 digit NIN"
                  className="flex w-full min-w-0 flex-1 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-[#334752] bg-[#1c2a32] h-14 placeholder:text-slate-500 p-[15px] border-r-0 text-base"
                />
                <div className="text-primary flex border border-[#334752] bg-[#1c2a32] items-center justify-center px-4 rounded-r-lg border-l-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>lock</span>
                </div>
              </div>
            </label>
            {error && (
              <div className="flex items-center gap-2 mt-2 px-1">
                <span className="material-symbols-outlined text-red-400 text-sm">error</span>
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>
          {/* NIN document upload */}
          <div className="flex flex-col w-full">
            <label className="flex flex-col w-full">
              <p className="text-white text-base font-medium leading-normal pb-2">Upload NIN Document</p>
              <div
                onClick={() => ninFileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-lg border border-dashed border-[#334752] bg-[#1c2a32] p-4 cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary">upload_file</span>
                <span className="text-slate-300">{ninDocument ? "Document uploaded" : "Click to upload your NIN document"}</span>
              </div>
              <input
                ref={ninFileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleNinDocumentChange}
                className="hidden"
              />
            </label>
          </div>
          {/* Encrypted note */}
          <div className="flex items-center gap-3 px-3 py-2.5 bg-primary/5 rounded-lg border border-primary/10">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}>verified_user</span>
            <p className="text-slate-300 text-sm font-medium leading-normal">Your NIN is encrypted and never stored in plain text</p>
          </div>

          {/* Badge placeholder */}
          <div className="p-8 rounded-xl border-2 border-dashed border-[#334752] flex flex-col items-center justify-center bg-white/5">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <span className="material-symbols-outlined text-5xl text-primary">badge</span>
            </div>
            <p className="text-slate-400 text-sm text-center px-4">
              Make sure the ID is valid and shows your full name clearly for instant verification.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-4 bg-[#101c22] border-t border-slate-800 mt-6">
        <button
          onClick={handleSubmit}
          disabled={!nin.trim() || loading}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying NIN...</span>
            </div>
          ) : (
            <>
              <span>Verify &amp; Continue</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </>
          )}
        </button>
        <p className="text-center text-slate-500 text-xs mt-4 px-6">
          By continuing, you agree to our Identity Verification Terms and Privacy Policy.
        </p>
      </div>
      <div className="h-8" />
    </div>
  );
}

export default function SignUpPage() {
  return <Suspense><SignUpForm /></Suspense>;
}
