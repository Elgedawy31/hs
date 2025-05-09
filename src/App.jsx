import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActionMenu from './components/FloatingActionMenu';

// Components
function App() {
  const { isAuthenticated, token } = useAuth();
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
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingActionMenu />
    </div>
  );
}

export default App
