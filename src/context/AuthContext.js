import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Simple login with mobile number and secret code
  const login = (mobileNumber, secretCode) => {
    // For demo purposes - in real app, this would call an API
    if (secretCode === 'AAHAR2024') { // Admin secret code
      setUser({ mobileNumber, role: 'admin' });
      setIsAdmin(true);
      return { success: true, isAdmin: true };
    } else if (secretCode === 'CUSTOMER24') { // Customer secret code
      setUser({ mobileNumber, role: 'customer' });
      setIsAdmin(false);
      return { success: true, isAdmin: false };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const value = {
    user,
    isAdmin,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};