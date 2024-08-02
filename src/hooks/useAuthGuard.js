import { useSession } from "next-auth/react";

export function useAuthGuard() {
    const { status: sessionStatus } = useSession();

    return { isAuthenticated: sessionStatus === "authenticated" };
}