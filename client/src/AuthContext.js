import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  }
  const removeToken = () => {
    setToken('');
    localStorage.removeItem('token');
  }
  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      { children }
    </AuthContext.Provider>
  );
}

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
}