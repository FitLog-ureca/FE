"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/interceptor/clientInterceptor";
import { tokenStore } from "@/store/AuthToken";
import { authRestoreStatus } from "./AuthStatus";

interface User {
  loginId: string;
  name: string;
}

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const setAuth = (token: string, userData: User) => {
    setAccessToken(token);
    setUser(userData);
    tokenStore.set(token);
  };

  const clearAuth = () => {
    setAccessToken(null);
    setUser(null);
    tokenStore.clear();
  };

  // 🔑 새로고침 / 첫 진입 시 인증 복구
  useEffect(() => {
    const restoreAuth = async () => {
      try {
        authRestoreStatus.start();
        const res = await apiClient.post("/auth/refresh");
        setAuth(res.data.result.accessToken, res.data.result.user);
      } catch {
        clearAuth();
        router.replace("/login");
      } finally {
        authRestoreStatus.end();
      }
    };

    restoreAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, user, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
