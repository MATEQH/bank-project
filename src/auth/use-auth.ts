import { useContext } from "react";
import { AuthContext } from "./auth-context.tsx";

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth muse be used inside AuthProvider");
    return ctx;
}