import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types';
import { MOCK_USERS } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: User['role']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER_ROLES: User['role'][] = ['admin', 'business_owner', 'agency', 'sales'];

function readSavedUser() {
  try {
    const saved = localStorage.getItem('funneling_user');
    if (!saved) return null;
    const parsed = JSON.parse(saved) as User;
    return parsed?.role && USER_ROLES.includes(parsed.role) ? parsed : null;
  } catch {
    localStorage.removeItem('funneling_user');
    return null;
  }
}

function toUserRole(role?: string): User['role'] {
  return USER_ROLES.includes(role as User['role']) ? role as User['role'] : 'business_owner';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(readSavedUser);

  const isLoggedIn = !!user;

  const login = async (email: string, _password: string, role?: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const demoRole = toUserRole(role);
    const foundUser = MOCK_USERS.find(u => u.role === demoRole) || MOCK_USERS[0];
    const loginUser = email ? { ...foundUser, email } : foundUser;
    setUser(loginUser);
    localStorage.setItem('funneling_user', JSON.stringify(loginUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('funneling_user');
  };

  const switchRole = (role: User['role']) => {
    const newUser = MOCK_USERS.find(u => u.role === role);
    if (newUser && user) {
      const updated = { ...newUser, email: user.email };
      setUser(updated);
      localStorage.setItem('funneling_user', JSON.stringify(updated));
    }
  };

  useEffect(() => {
    if (user) localStorage.setItem('funneling_user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
