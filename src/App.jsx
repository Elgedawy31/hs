import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useDispatch } from "react-redux";
import { useTheme } from './contexts/ThemeContext';
import Login from './pages/Login';

// Components
import Header from '@components/Header'
import Sidebar from '@components/Sidebar';
import ToastProvider from './components/CustomToast';
function App() {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(
    false
  )

  if (!isAuthenticated) {
    return <Login />;
  }

  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme CSS variables
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-body text-text">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 overflow-auto h-[calc(100vh-64px)] my-5 
       
        ">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 rounded-2xl" >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App
