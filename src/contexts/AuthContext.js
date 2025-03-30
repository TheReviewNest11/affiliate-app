import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate authentication on component mount
  useEffect(() => {
    // Simulate auth state change after a delay
    const timeout = setTimeout(() => {
      // For demo purposes, always log in a mock user
      const mockUser = {
        uid: 'demo-user-123',
        email: 'demo@example.com',
        displayName: 'Demo User',
        photoURL: null
      };
      setCurrentUser(mockUser);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Mock login function
  const login = () => {
    const mockUser = {
      uid: 'demo-user-123',
      email: 'demo@example.com',
      displayName: 'Demo User',
      photoURL: null
    };
    setCurrentUser(mockUser);
    return Promise.resolve();
  };

  // Mock logout function
  const logout = () => {
    setCurrentUser(null);
    return Promise.resolve();
  };

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}