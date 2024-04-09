'use client'

import { UserData } from '@/lib/schema';
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserData;
  handleLogin: (username: string, jobTitle: string) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provides localStorage based 'authentication' functionality to the application.
 * @param {ReactNode} children - The child components to be wrapped by the AuthProvider.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({ username: '', jobTitle: '' });

  useEffect(() => {
    const username = localStorage.getItem('username');
    const jobTitle = localStorage.getItem('jobTitle');
    setIsAuthenticated(!!username && !!jobTitle);
    setUserData({ username: username || '', jobTitle: jobTitle || '' });
  }, []);


  /**
   * Handles the localStorage 'login' functionality.
   * @param {string} username - The username of the user.
   * @param {string} jobTitle - The job title of the user.
   */
  const handleLogin = useCallback((username: string, jobTitle: string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('jobTitle', jobTitle);
    setIsAuthenticated(true);
    setUserData({ username, jobTitle });
  }, []);

  /**
   * Handles the localStorage 'logout' functionality.
   */
  const handleLogout = useCallback(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('jobTitle');
    setIsAuthenticated(false);
    setUserData({ username: '', jobTitle: '' });
  }, []);

  /**
   * Retrieves the user details from localStorage.
   * @returns {Object} The user details.
   */

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook that provides access to the authentication context.
 * @returns The authentication context.
 * @throws {Error} If used outside of an AuthProvider.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
