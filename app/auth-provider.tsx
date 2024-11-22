"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { refreshAccessToken } from "./components/action";
import Cookies from "js-cookie";

const AuthContext = createContext<{
  accessToken: string | null;
  isAuthenticated: boolean;
  logout: () => void;
}>({
  accessToken: null,
  isAuthenticated: false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // กำหนดค่าคงที่สำหรับ refresh interval
  const REFRESH_INTERVAL = 4 * 60 * 1000; // 4 นาที (240,000 มิลลิวินาที)
  // const REFRESH_BEFORE_EXPIRY = 1 * 60 * 1000; // 1 นาที ก่อน token หมดอายุ

  useEffect(() => {
    const existingToken = Cookies.get("user-token");
    if (existingToken) {
      setAccessToken(existingToken);
      setIsAuthenticated(true);
    }

    async function handleRefresh() {
      try {
        const currentToken = Cookies.get("user-token");

        const newToken = await refreshAccessToken();

        if (newToken) {
          setAccessToken(newToken);
          Cookies.set("user-token", newToken);
        } else {

        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        Cookies.remove("user-token");
        setAccessToken(null);
      }
    }

    // เริ่มต้น refresh ครั้งแรกหลังจาก 1 วินาที
    const initialRefreshTimeout = setTimeout(handleRefresh, 1000);

    // ตั้งค่า interval สำหรับ refresh token
    const interval = setInterval(handleRefresh, REFRESH_INTERVAL);

    return () => {
      clearTimeout(initialRefreshTimeout);
      clearInterval(interval);
    };
  }, []);

  const logout = () => {
    Cookies.remove("user-token");
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
