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
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Screenshots from './pages/Screenshots.jsx'
import Payment from './pages/Payment/Payment.jsx'
import Bouns from './pages/Bouns/Bonus.jsx'
import Employees from './pages/Empolyees/Employees.jsx'
import AddEmployee from './pages/Empolyees/AddEmployee.jsx'
import EditEmployee from './pages/Empolyees/EditEmployee.jsx'
import EmployeeDetails from './pages/Empolyees/EmployeeDetails.jsx'
import AddBonus from './components/bouns/BounsList.jsx'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
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
        index: true,
        element: <Dashboard />,
        path:'dashboard'
      },
      {
        path: 'employees',
        element: <Employees />
      },
      {
        path: 'employees/new',
        element: <AddEmployee />
      },
      {
        path: 'employees/edit/:id',
        element: <EditEmployee />
      },
      {
        path: 'employees/:id',
        element: <EmployeeDetails />
      },
      {
        path: 'screenshots',
        element: <Screenshots />
      },
      {
        path: 'payment',
        element: <Payment />
      },
      {
        path: 'bonus',
        element: <Bouns />
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
