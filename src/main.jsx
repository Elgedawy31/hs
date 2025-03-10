import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Login from '@pages/Login'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import store from './store'
import NotFound from './pages/NotFound.jsx'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage.jsx'
import { CheckCircle, Info, XCircle } from 'lucide-react'
import Products from './pages/Products.jsx'
import Experts from './pages/Experts.jsx'
import Expert from './pages/Expert.jsx'
import ProdcutDetails from './pages/ProdcutDetails.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Terms from './pages/Terms.jsx'
import Notifications from './pages/Notifications.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Model from './pages/Model.jsx'
import Register from './pages/Register.jsx'
import Verify from './pages/Verify.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Profile from './pages/Profile.jsx'
import Library from './pages/Library.jsx'
import Blog from './pages/Blog.jsx'
import EditProfile from './pages/EditProfile.jsx'
import Prescription from './pages/Prescription.jsx'
import AddService from './pages/AddService.jsx'

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
    path: '/register',
    element: <Register />
  },
  {
    path: '/verify',
    element: <Verify />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/',
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        'path': '/products',
        element:<Products />
      },
      {
        'path': '/products/:id',
        element:<ProdcutDetails />
      },
      {
        path:'/experts',
        element: <Experts />
      },
      {
        path:'/experts/:id',
        element: <Expert />
      },
      {
        path:'/contact-us',
        element: <ContactUs />
      },
      {
        path:'/terms',
        element: <Terms />
      },
      {
        path:'/notifications',
        element: <Notifications />
      },
      {
        path:'/cart',
        element: <Cart />
      },
      {
        path:'/checkout',
        element: <Checkout />
      },
      {
        path:'/model',
        element: <Model />
      },
      {
        path:'/profile',
        element: <Profile />
      },
      {
        path:'/profile/edit',
        element: <EditProfile />
      },
      {
        path:'/library',
        element: <Library />
      },
      {
        path:'/blog',
        element: <Blog />
      },
      {
        path:'/prescription',
        element: <Prescription />
      },
      {
        path:'/add-service',
        element: <AddService />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// Check if the root element already has a React root associated with it
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the application
root.render(
  <Provider store={store}>
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
  </Provider>
);
