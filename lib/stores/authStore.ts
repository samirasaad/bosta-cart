import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/types";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user?: User) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => {
        if (typeof window !== "undefined") {
          localStorage.setItem(AUTH_TOKEN_KEY, token);
          if (user) {
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
          }
        }
        set({ token, user: user ?? null });
      },
      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          localStorage.removeItem(AUTH_USER_KEY);
        }
        set({ token: null, user: null });
      },
      hydrate: () => {
        if (typeof window === "undefined") return;
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        const userStr = localStorage.getItem(AUTH_USER_KEY);
        const user = userStr ? (JSON.parse(userStr) as User) : null;
        set({ token, user });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
