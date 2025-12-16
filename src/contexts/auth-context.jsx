"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getAuthToken, setAuthToken, removeAuthToken } from "@/lib/api/client";

/**
 * @typedef {import("@/types/auth").User} User
 */

/**
 * @typedef {Object} AuthContextValue
 * @property {User|null} user - Current user
 * @property {boolean} isAuthenticated - Authentication status
 * @property {boolean} isLoading - Loading state
 * @property {(token: string, user: User) => void} login - Login function
 * @property {() => void} logout - Logout function
 * @property {(user: User) => void} setUser - Update user function
 */

const AuthContext = createContext(/** @type {AuthContextValue|undefined} */ (undefined));

/**
 * Authentication Provider Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(/** @type {User|null} */ (null));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = getAuthToken();
    if (token) {
      // TODO: Backend team - Fetch current user from token
      // For now, set a mock user
      setUser({
        id: 1,
        name: "shadcn",
        email: "m@example.com",
        avatar: "https://github.com/shadcn.png",
      });
    }
    setIsLoading(false);
  }, []);

  /**
   * Login user
   * @param {string} token - Auth token
   * @param {User} userData - User data
   */
  const login = (token, userData) => {
    setAuthToken(token);
    setUser(userData);
  };

  /**
   * Logout user
   */
  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth Hook
 * @returns {AuthContextValue}
 * @throws {Error} If used outside AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
