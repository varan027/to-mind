import { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../lib/axios";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      instance.defaults.headers.Authorization = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await instance.post("/auth/login", { email, password });

    const token = res.data.token;

    localStorage.setItem("token", token);
    instance.defaults.headers.Authorization = `Bearer ${token}`;

    setToken(token);
    setUser(res.data.user);
  };

  const signup = async (username: string, email: string, password: string) => {
    const res = await instance.post("/auth/register", {
      username,
      email,
      password,
    });
    const token = res.data.token;
    localStorage.setItem("token", token);
    instance.defaults.headers.Authorization = `Bearer ${token}`;
    setToken(token);
    setUser(res.data.user);

    localStorage.setItem("token", res.data.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete instance.defaults.headers.Authorization;
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
