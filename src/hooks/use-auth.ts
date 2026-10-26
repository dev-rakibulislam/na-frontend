"use client";

import { useState, useEffect, useCallback } from "react";
import type { User, LoginCredentials, RegisterPayload } from "@/types";
import { authService } from "@/services";

// ────────────────────────────────────────────────
//  useAuth — authentication state & actions
// ────────────────────────────────────────────────

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** On mount, try to rehydrate the session */
  useEffect(() => {
    let cancelled = false;
    async function loadUser() {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const profile = await authService.getProfile();
        if (!cancelled) setUser(profile);
      } catch {
        // token expired / invalid — clear it
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadUser();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setError(null);
    try {
      const { user: loggedIn, tokens } = await authService.login(credentials);
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      setUser(loggedIn);
      return loggedIn;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
      throw err;
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    setError(null);
    try {
      const { user: created, tokens } = await authService.register(payload);
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      setUser(created);
      return created;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // best-effort
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    loading,
    error,
    login,
    register,
    logout,
  };
}
