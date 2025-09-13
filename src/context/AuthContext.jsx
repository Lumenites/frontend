import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (!storedToken) {
      setLoading(false);
      return;
    }
    setToken(storedToken);
    api.me(storedToken)
      .then((data) => {
        setUser(data.user || data);
      })
      .catch(() => {
        localStorage.removeItem("auth_token");
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    const authToken = res.token || res.accessToken;
    if (authToken) {
      localStorage.setItem("auth_token", authToken);
      setToken(authToken);
    }
    setUser(res.user || res);
    return res;
  };

  const signup = async (name, email, password) => {
    const res = await api.signup({ name, email, password });
    const authToken = res.token || res.accessToken;
    if (authToken) {
      localStorage.setItem("auth_token", authToken);
      setToken(authToken);
    }
    setUser(res.user || res);
    return res;
  };

  const signout = async () => {
    const authToken = localStorage.getItem("auth_token");
    try { if (authToken) await api.logout(authToken); } catch {}
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    loading,
    error,
    setError,
    login,
    signup,
    logout: signout,
  }), [user, token, loading, error]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


