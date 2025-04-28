import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('inventicon_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'company':
        navigate('/company/dashboard');
        break;
      case 'investor':
        navigate('/investor/dashboard');
        break;
      case 'landowner':
        navigate('/landowner/dashboard'); // <-- ADD THIS
        break;
      case 'results': // <-- fix role name
        navigate('/results/dashboard'); // <-- fix path
        break;
      default:
        navigate('/');
        break;
    }
  };

  const login = (email, password, role) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: '123',
          email,
          role,
          name: role === 'student' ? 'Student User' : 'Admin User'
        };
        setUser(mockUser);
        localStorage.setItem('inventicon_user', JSON.stringify(mockUser));
        redirectBasedOnRole(role); // <-- Added navigation after login
        resolve(mockUser);
      }, 1000);
    });
  };

  const signup = (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: 'new_' + Math.random().toString(36).substr(2, 9),
          ...userData
        };
        setUser(newUser);
        localStorage.setItem('inventicon_user', JSON.stringify(newUser));
        redirectBasedOnRole(userData.role); // <-- Added navigation after signup
        resolve(newUser);
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('inventicon_user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
