import { createContext, useContext, useState, useEffect } from 'react'
import Loading from '../components/Loading'
const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => { },
  logout: async () => { },
  isAuthenticated: false
})

export function AuthProvider({ children }) {
  const defaultUser = {
    name: "Default User",
    email: "user@example.com",
    role: "user"
  }
  const [user, setUser] = useState(defaultUser)
  const [loading, setLoading] = useState(false) 

  const verifyConnection = async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.success) {
        let role ='user'
        setUser({...data.user , role});
        localStorage.setItem('user', JSON.stringify({...data.user , role}));
        return;
      }
      throw new Error(data.error || 'Something went wrong!!');
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (data.success) {
        let role = 'user'
        localStorage.setItem('user', JSON.stringify({ ...data.user, role }))
        setUser({ ...data.user, role });
        return {
          success: true,
          user: data.user
        }
      }
      throw new Error(data.error || 'Invalid credentials')
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
      return {
        success: false,
        error: error.message || 'Failed to login'
      }
    }
  }

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem('user')
        setUser(null)
      }
      throw new Error(data.message || 'Logout failed')
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to logout'
      }
    }
  }


  if (loading) {
    return (
     <Loading />
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: true }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
