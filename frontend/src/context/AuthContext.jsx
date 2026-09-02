import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  async function register({ name, email, password }) {
    const res = await api.post('/api/auth/register', {
      name,
      email,
      password,
    });

    persistAuth(res.data.data);
  }

  async function login({ email, password }) {
    const res = await api.post('/api/auth/login', {
      email,
      password,
    });

    persistAuth(res.data.data);
  }

  function persistAuth({ user, token }) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}