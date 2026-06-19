import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authApi } from "../lib/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const data = await authApi.me();
      setAuthUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch {
      setAuthUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (form) => {
    const data = await authApi.login(form);
    setAuthUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    toast.success("Login successful");
    return data;
  };

  const signup = async (form) => {
    const data = await authApi.signup(form);
    setAuthUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    toast.success("Signup successful");
    return data;
  };

  const logout = async () => {
    await authApi.logout();
    setAuthUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        loading,
        login,
        signup,
        logout,
        checkAuth,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};