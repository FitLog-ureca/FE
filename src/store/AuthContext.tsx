"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { tokenStore } from "@/store/tokenStore";

type User = { loginId: string; name: string };

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  setAuth: (token: string, user: User | null) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const setAuth = (token: string, userData: User | null) => {
    tokenStore.set(token);
    setAccessToken(token);
    setUser(userData);
  };

  const clearAuth = () => {
    tokenStore.clear();
    setAccessToken(null);
    setUser(null);
  };

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
