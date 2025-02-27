import { createContext, useContext, useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { API_URL } from '../utils/constants'
const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => { },
  logout: async () => { },
  isAuthenticated: false,
  token: null
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify({ ...data.user }))
        localStorage.setItem('token', JSON.stringify(data.token))
        setUser({ ...data.user });
        setToken(data.token );
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

    localStorage.removeItem('user')
    setUser(null)
  }

  if (loading) {
    return (
        <Loading />
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user  , token }}>
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
