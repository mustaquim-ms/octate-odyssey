"use client";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();

  const checkAuth = (callback: () => void) => {
    const session = localStorage.getItem("pilot_session");
    if (session === "active") {
      callback(); 
    } else {
      // Direct jump to Home with the auth signal
      router.push("/?auth=login");
    }
  };

  return { checkAuth };
}