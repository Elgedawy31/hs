import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActionMenu from './components/FloatingActionMenu';
import AnimatedBackground from './components/AnimatedBackground';

// Components
function App() {
  const { isAuthenticated, token } = useAuth();
  

  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme CSS variables
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [theme]);


  if (!isAuthenticated) {
    return <Login />;
  }
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
