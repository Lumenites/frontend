import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api.me(token)
      .then((data) => {
        setUser(data.user || data);
      })
      .catch(() => {
        localStorage.removeItem("auth_token");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    const token = res.token || res.accessToken;
    if (token) localStorage.setItem("auth_token", token);
    setUser(res.user || res);
    return res;
  };

  const signup = async (username, email, password) => {
    const res = await api.signup({ username, email, password });
    const token = res.token || res.accessToken;
    if (token) localStorage.setItem("auth_token", token);
    setUser(res.user || res);
    return res;
  };

  const signout = async () => {
    const token = localStorage.getItem("auth_token");
    try { if (token) await api.logout(token); } catch {}
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    loading,
    error,
    setError,
    login,
    signup,
    logout: signout,
  }), [user, loading, error]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


