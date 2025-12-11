import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Register a new user
  const register = (email, password) => {
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'User already exists' };
    }

    // Set admin role if first user or specific email
    const isAdmin = users.length === 0 || email === 'admin@property.com';
    
    const newUser = { 
      email, 
      password,
      role: isAdmin ? 'admin' : 'user',
      profile: {
        name: '',
        phone: '',
        address: ''
      }
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    return { success: true, message: 'Registration successful' };
  };

  // Login user
  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { 
        email: foundUser.email, 
        role: foundUser.role || 'user',
        profile: foundUser.profile || { name: '', phone: '', address: '' }
      };
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true };
    }
    
    return { success: false, message: 'Invalid email or password' };
  };

  // Update user profile
  const updateProfile = (profileData) => {
    const updatedUsers = users.map(u => 
      u.email === user.email 
        ? { ...u, profile: { ...u.profile, ...profileData } }
        : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const updatedUser = { ...user, profile: { ...user.profile, ...profileData } };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
