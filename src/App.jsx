import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActionMenu from './components/FloatingActionMenu';
import AnimatedBackground from './components/AnimatedBackground';
import DashboardSidebar from './components/dashboard/DashboardSidebar';

// Components
function App() {
  const { isAuthenticated, token } = useAuth();
  const location = useLocation();
  const { theme } = useTheme();
  
  // Check if current path includes 'dashboard'
  const isDashboardPage = location.pathname.includes('dashboard');

  useEffect(() => {
    // Apply theme CSS variables
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  if (!isAuthenticated) {
    return <Login />;
  }

  // Dashboard layout
  if (isDashboardPage) {
    return (
      <div className="min-h-screen bg-body text-text">
         <div className="mb-10">
           <Header />
         </div>
        <div className=" flex gap-10 container pb-2">
          <DashboardSidebar />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>

        </div>
      <Footer />
      <FloatingActionMenu />

      </div>
    );
  }

  // Regular layout
  return (
    <div className="min-h-screen flex flex-col bg-body text-text">
      <Header />
      <main className="flex-1">
        <AnimatedBackground>
          <Outlet />
        </AnimatedBackground>
      </main>
      <Footer />
      <FloatingActionMenu />
    </div>
  );
}

export default App
