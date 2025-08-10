import React, { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, setAuthToken, getAuthToken } from '../services/api/apiClient';

const AdminContext = createContext(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already authenticated on mount
    const checkAdminAuth = () => {
      const authenticated = isAuthenticated();
      setIsAdmin(authenticated);
      setLoading(false);
    };

    checkAdminAuth();
  }, []);

  const login = (token) => {
    setAuthToken(token);
    setIsAdmin(true);
  };

  const logout = () => {
    setAuthToken(null);
    setIsAdmin(false);
  };

  const value = {
    isAdmin,
    loading,
    login,
    logout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
