import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./auth-context";
import type { ReactNode } from "react";
import api from "../api/client";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;

      try {
        const res = await api.get("/auth/me");
        return res.data;
      } catch {
        localStorage.removeItem("token");
        return null;
      }
    },
    retry: false,
  });

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    await queryClient.invalidateQueries({queryKey: ["me"]});
  };

  const logout = async () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(["me"], null);
  };

  return (
    <AuthContext.Provider value={{ user: user ?? null, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
