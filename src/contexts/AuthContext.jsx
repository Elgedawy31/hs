import { createContext, useContext, useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { API_URL } from '../utils/constants'
const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => { },
  logout: async () => { },
  isAuthenticated: false
})

export function AuthProvider({ children }) {
  const defaultUser = {
    email:"example@gmail.com",
    role: 'user',
    id: 1,
    name: 'John Doe',
  }
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false) 

  const login = async (email, password) => {
    try {
      const response = await  fetch(`${API_URL}/auth/login`, {
        method: 'POST',
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
      const response = await  fetch(`${API_URL}/auth/logout`, {
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
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
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
