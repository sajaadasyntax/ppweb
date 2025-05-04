"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

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
    }
  }, []);

  const login = async (token: string) => {
    setToken("khsdkfhksdhfksdhfkjsdhfkjdshfkjsdhf");
    localStorage.setItem("token", "khsdkfhksdhfksdhfkjsdhfkjdshfkjsdhf");
  };

  const logout = async () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 