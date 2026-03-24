"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { UserRole } from "@/types";

export interface AuthUser {
  nin: string;
  name: string; // pulled from NIN verification
  email: string;
  role: UserRole;
  avatarDataUrl: string | null; // base64 image from upload
  verified: boolean;
  memberSince: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, nin: string, ninDocument: string, role: UserRole, avatarDataUrl?: string) => Promise<{ success: boolean; name?: string; error?: string }>;
  logout: () => void;
  updateAvatar: (dataUrl: string) => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: () => {},
  updateAvatar: () => {},
});

// Mock user database for duplicate checking
const USER_DATABASE: AuthUser[] = [];

// ---------------------------------------------------------------------------
// Mock NIN → name lookup. Replace with real API call (e.g. NIMC endpoint).
// ---------------------------------------------------------------------------
const NIN_DATABASE: Record<string, string> = {
  "123456789012": "John Mwangi",
  "111111111111": "Amara Kone",
  "222222222222": "David Okafor",
  "333333333333": "Sarah Chen",
  "444444444444": "Alex Johnson",
  "555555555555": "Fatima Aliyu",
  "999999999999": "Demo User",
};

// Mock OCR function to extract name and NIN from document
async function mockScanDocument(document: string): Promise<{ name: string; nin: string } | null> {
  // Simulate OCR delay
  await new Promise((r) => setTimeout(r, 800));
  // For demo, return fixed extracted data if document is provided
  return { name: "Joseph Adebayo", nin: "123456789012" };
}

async function verifyNIN(nin: string, document?: string): Promise<{ valid: boolean; name?: string }> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 1200));

  // If document provided, scan it and verify NIN matches
  if (document) {
    const scanned = await mockScanDocument(document);
    if (scanned && scanned.nin === nin) {
      return { valid: true, name: scanned.name };
    } else {
      return { valid: false };
    }
  }

  // Fallback to database lookup if no document
  const cleanedNin = nin.replace(/\s/g, "");
  const name = NIN_DATABASE[cleanedNin];
  if (name) return { valid: true, name };
  // Accept any 11-12 digit NIN as valid with generic name for demo purposes
  if (/^\d{11,12}$/.test(cleanedNin)) {
    return { valid: true, name: "Verified User" };
  }
  return { valid: false };
}

// ---------------------------------------------------------------------------

const STORAGE_KEY = "rentwise_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (
      email: string,
      nin: string,
      ninDocument: string,
      role: UserRole,
      avatarDataUrl?: string
    ): Promise<{ success: boolean; name?: string; error?: string }> => {
      // Check for duplicates
      const existingUser = USER_DATABASE.find(u => u.email === email || u.nin === nin);
      if (existingUser) {
        return { success: false, error: "Email or NIN already registered." };
      }

      const result = await verifyNIN(nin, ninDocument);
      if (!result.valid || !result.name) {
        return { success: false, error: "NIN not found. Please check and try again." };
      }
      const newUser: AuthUser = {
        email,
        nin,
        name: result.name,
        role,
        avatarDataUrl: avatarDataUrl ?? null,
        verified: true,
        memberSince: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      };
      USER_DATABASE.push(newUser);
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      return { success: true, name: result.name };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateAvatar = useCallback((dataUrl: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, avatarDataUrl: dataUrl };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
