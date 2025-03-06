import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Login from '@pages/Login'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { HelmetProvider } from 'react-helmet-async'
import NotFound from './pages/NotFound.jsx'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage.jsx'
import { CheckCircle, Info, XCircle } from 'lucide-react'

const ProtectedRoute = ({ requireAdmin, children }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

// Check if the root element already has a React root associated with it
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the application
root.render(
  <AuthProvider>
      <ThemeProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#333",
                color: "#fff",
                padding: "16px",
                borderRadius: "8px",
                fontSize: "14px",
                maxWidth: "400px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
              },
              success: {
                icon: <CheckCircle size={18} color="#fafafa" />,
                style: {
                  background: "#10B981",
                  color: "#ffffff",
                  padding: "10px 20px",
                },
              },
              error: {
                icon: <XCircle size={18} color="#fafafa" />,
                style: {
                  background: "#e00a0a",
                  color: "#ffffff",
                  padding: "10px 20px",
                },
              },
              loading: {
                icon: <Info size={18} color="#3B82F6" />,
                style: {
                  background: "#3B82F6",
                },
              },
            }}
          />
        </HelmetProvider>
      </ThemeProvider>
  </AuthProvider>
);
