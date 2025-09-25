// lib/auth.tsx
"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch, postJson } from "../lib/api";

interface AuthContextValue {
  status: "loading" | "authenticated" | "unauthenticated";
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthContextValue["status"]>("loading");

  // Tenta restaurar a sessão via refresh no mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const r = await apiFetch("/auth/refresh", {
          method: "POST",
          retry: false,
        });
        if (!mounted) return;
        setStatus(r.ok ? "authenticated" : "unauthenticated");
      } catch {
        if (!mounted) return;
        setStatus("unauthenticated");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const res = await postJson("/auth/signin", { email, password });
    if (res.ok) {
      setStatus("authenticated");
      return true;
    }
    setStatus("unauthenticated");
    return false;
  }, []);

  const signOut = useCallback(async () => {
    await apiFetch("/auth/signout", { method: "POST", retry: false });
    setStatus("unauthenticated");
  }, []);

  const value = useMemo(
    () => ({ status, signIn, signOut }),
    [status, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
