"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { apiClient } from "./apiContext";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isHydrated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  logout: async () => {},
  isLoading: false,
  error: null,
  isHydrated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    const loadToken = () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken); // Update state if token exists
      }
    };
    
    // Only run in browser environment
    if (typeof window !== "undefined") {
      loadToken();
      setIsHydrated(true);
    }
  }, []);

  const login = async (mobileNumber: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.auth.login(mobileNumber, password);
      const { token: authToken, user } = response;
      
      // Check if user has USER role (not ADMIN)
      if (user && user.role === "ADMIN") {
        throw new Error("غير مصرح لك بالدخول إلى الموقع. يرجى استخدام لوحة التحكم الإدارية");
      }
      
      setToken(authToken);
      localStorage.setItem("token", authToken);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ أثناء تسجيل الدخول';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      if (token) {
        await apiClient.auth.logout(token);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setToken(null);
      localStorage.removeItem("token");
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading, error, isHydrated }}>
      {children}
    </AuthContext.Provider>
  );
}; 