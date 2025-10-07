"use client";
import { http } from "@/http-module/http-client";
import { User } from "@/interfaces/user/user.interface";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextValue {
  status: "loading" | "authenticated" | "unauthenticated";
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthContextValue["status"]>("loading");
  const [user, setUser] = useState<User | null>(null);

  // Tenta restaurar a sessão via refresh no mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const refresh = await http.post("/auth/refresh");
        if (!mounted) return;
        if (refresh.ok) {
          const me = await http.get<User>("/auth/me");
          if (me.ok) {
            setUser(me.body);
            setStatus("authenticated");
          } else {
            setUser(null);
            setStatus("unauthenticated");
          }
        } else {
          setUser(null);
          setStatus("unauthenticated");
        }
      } catch {
        if (!mounted) return;
        setUser(null);
        setStatus("unauthenticated");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const res = await http.post("/auth/signin", { email, password });
    if (res.ok) {
      const me = await http.get<User>("/auth/me");
      if (!me.ok) {
        return false;
      }

      setUser(me.body);
      setStatus("authenticated");
      return true;
    }
    setStatus("unauthenticated");
    return false;
  }, []);

  const signOut = useCallback(async () => {
    await http.post("/auth/signout");
    setStatus("unauthenticated");
  }, []);

  const value = useMemo(
    () => ({ status, signIn, signOut, user }),
    [status, signIn, signOut, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
