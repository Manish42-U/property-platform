


// import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   const fetchUser = useCallback(async () => {
//     try {
//       const res = await axios.get('http://localhost:3000/api/auth/me');
//       setUser(res.data);
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       logout();
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['x-auth-token'] = token;
//       fetchUser();
//     } else {
//       setLoading(false);
//     }
//   }, [token, fetchUser]);

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
//       const { token, user } = res.data;
//       localStorage.setItem('token', token);
//       axios.defaults.headers.common['x-auth-token'] = token;
//       setToken(token);
//       setUser(user);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.message || 'Login failed' };
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const res = await axios.post('http://localhost:3000/api/auth/register', userData);
//       const { token, user } = res.data;
//       localStorage.setItem('token', token);
//       axios.defaults.headers.common['x-auth-token'] = token;
//       setToken(token);
//       setUser(user);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.response?.data?.message || 'Registration failed' };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['x-auth-token'];
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   const fetchUser = useCallback(async () => {
//     try {
//       const storedToken = localStorage.getItem('token');
//       if (!storedToken) {
//         setLoading(false);
//         return;
//       }
      
//       const res = await axios.get('http://localhost:3000/api/auth/me', {
//         headers: { 'x-auth-token': storedToken }
//       });
      
//       // Important: Set user from response data
//       setUser(res.data.user || res.data);
//       localStorage.setItem('user', JSON.stringify(res.data.user || res.data));
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['x-auth-token'] = token;
//       fetchUser();
//     } else {
//       setLoading(false);
//     }
//   }, [token, fetchUser]);

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
//       const { token, user } = res.data;
      
//       console.log('Login successful:', { token, user });
      
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       axios.defaults.headers.common['x-auth-token'] = token;
//       setToken(token);
//       setUser(user);
      
//       return { success: true };
//     } catch (error) {
//       console.error('Login error:', error);
//       return { success: false, error: error.response?.data?.message || 'Login failed' };
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const res = await axios.post('http://localhost:3000/api/auth/register', userData);
//       const { token, user } = res.data;
      
//       console.log('Registration successful:', { token, user });
      
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       axios.defaults.headers.common['x-auth-token'] = token;
//       setToken(token);
//       setUser(user);
      
//       return { success: true };
//     } catch (error) {
//       console.error('Registration error:', error);
//       return { success: false, error: error.response?.data?.message || 'Registration failed' };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     delete axios.defaults.headers.common['x-auth-token'];
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   const fetchUser = useCallback(async () => {
//     try {
//       const storedToken = localStorage.getItem('token');
//       if (!storedToken) {
//         setLoading(false);
//         return;
//       }
      
//       const res = await axios.get('http://localhost:3000/api/auth/me', {
//         headers: { 'x-auth-token': storedToken }
//       });
      
//       console.log('Fetched user from backend:', res.data);
      
//       // Set user from response
//       const userData = res.data.user || res.data;
//       setUser(userData);
//       localStorage.setItem('user', JSON.stringify(userData));
      
//       console.log('User set in context:', userData);
//       console.log('User role:', userData.role);
      
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       setUser(null);
//       setToken(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['x-auth-token'] = token;
//       fetchUser();
//     } else {
//       setLoading(false);
//     }
//   }, [token, fetchUser]);

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
//       const { token, user } = res.data;
      
//       console.log('Login API response:', { token, user });
//       console.log('User role from API:', user.role);
      
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       axios.defaults.headers.common['x-auth-token'] = token;
//       setToken(token);
//       setUser(user);
      
//       return { success: true, user };
//     } catch (error) {
//       console.error('Login error:', error);
//       return { success: false, error: error.response?.data?.message || 'Login failed' };
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const res = await axios.post('http://localhost:3000/api/auth/register', userData);
//       const { token, user } = res.data;
      
//       console.log('Register API response:', { token, user });
      
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       axios.defaults.headers.common['x-auth-token'] = token;
//       setToken(token);
//       setUser(user);
      
//       return { success: true };
//     } catch (error) {
//       console.error('Registration error:', error);
//       return { success: false, error: error.response?.data?.message || 'Registration failed' };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     delete axios.defaults.headers.common['x-auth-token'];
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// ✅ Add this - Production API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchUser = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setLoading(false);
        return;
      }
      
      // ✅ Updated: Use API_URL
      const res = await axios.get(`${API_URL}/auth/me`, {
        headers: { 'x-auth-token': storedToken }
      });
      
      console.log('Fetched user from backend:', res.data);
      
      const userData = res.data.user || res.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('User set in context:', userData);
      console.log('User role:', userData.role);
      
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token, fetchUser]);

  const login = async (email, password) => {
    try {
      // ✅ Updated: Use API_URL
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = res.data;
      
      console.log('Login API response:', { token, user });
      console.log('User role from API:', user.role);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['x-auth-token'] = token;
      setToken(token);
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      // ✅ Updated: Use API_URL
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      const { token, user } = res.data;
      
      console.log('Register API response:', { token, user });
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['x-auth-token'] = token;
      setToken(token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['x-auth-token'];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};