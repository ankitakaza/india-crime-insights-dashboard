
import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('crimeTrackerUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Simple login function (for demo purposes)
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would validate with a backend
    if (email && password.length >= 6) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newUser = { email };
      setUser(newUser);
      localStorage.setItem('crimeTrackerUser', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  // Simple signup function (for demo purposes)
  const signup = async (
    email: string, 
    password: string, 
    name?: string
  ): Promise<boolean> => {
    // In a real app, this would create an account in a backend
    if (email && password.length >= 6) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newUser = { email, name };
      setUser(newUser);
      localStorage.setItem('crimeTrackerUser', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crimeTrackerUser');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        signup, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
