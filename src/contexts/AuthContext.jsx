import { createContext, useContext, useEffect, useState } from 'react';
import { loadUser, logout as apiLogout, updateUser as updateUserApi } from '../api/authApi.js';
import { getToken } from '../api/apiClient.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // Only attempt to load user if a token actually exists
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const data = await loadUser();
        setUser(data.user);
      } catch {
        // Token is invalid/expired — clear it silently
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const loginSuccess = (userData) => setUser(userData);

  const updateUser = async (updates) => {
    const data = await updateUserApi(updates);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, loginSuccess, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
