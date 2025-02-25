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
import { Provider } from "react-redux";
import { store } from "./store/store";
import ToastProvider from './components/CustomToast.jsx'
import NotFound from './pages/NotFound.jsx'
import Dashboard from './pages/admin/Dashboard/Dashboard.jsx'
import Screenshots from './pages/admin/Screenshots.jsx'
import Payment from './pages/admin/Payment/Payment.jsx'
import Bouns from './pages/admin/Bouns/Bonus.jsx'
import Employees from './pages/admin/Empolyees/Employees.jsx'
import AddEmployee from './pages/admin/Empolyees/AddEmployee.jsx'
import EditEmployee from './pages/admin/Empolyees/EditEmployee.jsx'
import EmployeeDetails from './pages/admin/Empolyees/EmployeeDetails.jsx'
import HomePage from './pages/user/HomePage.jsx'
import Tracking from './pages/user/Tracking.jsx'
import Requesting from './pages/user/Requesting.jsx'
import Memo from './pages/user/Memo.jsx'

const ProtectedRoute = ({ requireAdmin, children }) => {
  const { isAuthenticated, user } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  // Check for admin access if required
  if (requireAdmin && (!user?.role || user?.role !== 'admin')) {
    return <Navigate to="/" replace />
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
      {
        path: '/tracking',
        element: <Tracking />
      },
      {
        path: '/requesting',
        element: <Requesting />
      },
      {
        path: '/memo',
        element: <Memo />
      },
      {
        element: <ProtectedRoute requireAdmin={true}><Dashboard /></ProtectedRoute>,
        path: 'dashboard'
      },
      // Admin-only routes
      {
        path: 'dashboard/employees',
        element: <ProtectedRoute requireAdmin={true}><Employees /></ProtectedRoute>
      },
      {
        path: 'dashboard/employees/new',
        element: <ProtectedRoute requireAdmin={true}><AddEmployee /></ProtectedRoute>
      },
      {
        path: 'dashboard/employees/edit/:id',
        element: <ProtectedRoute requireAdmin={true}><EditEmployee /></ProtectedRoute>
      },
      {
        path: 'dashboard/employees/:id',
        element: <ProtectedRoute requireAdmin={true}><EmployeeDetails /></ProtectedRoute>
      },
      {
        path: 'dashboard/screenshots',
        element: <ProtectedRoute requireAdmin={true}><Screenshots /></ProtectedRoute>
      },
      {
        path: 'dashboard/payment',
        element: <ProtectedRoute requireAdmin={true}><Payment /></ProtectedRoute>
      },
      {
        path: 'dashboard/bonus',
        element: <ProtectedRoute requireAdmin={true}><Bouns /></ProtectedRoute>
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  </AuthProvider>
)
