import { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, logout, fetchUserProfile } = useAuthStore();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
