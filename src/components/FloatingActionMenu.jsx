import React, { useState, useEffect } from 'react';
import { Plus, X, Sun, Moon, Bell, ShoppingCart, LogOut, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, currentTheme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.floating-menu-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Define menu items with their icons and actions
  const menuItems = user ? [
    { 
      icon: currentTheme === 'dark' ? Sun : Moon, 
      label: currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode', 
      onClick: toggleTheme 
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      component: Link,
      to: '/notifications'
    },
    { 
      icon: ShoppingCart, 
      label: 'Cart', 
      component: Link,
      to: '/cart',
      badge: cartTotalQuantity > 0 ? cartTotalQuantity : null
    },
    { 
      icon: User, 
      label: 'Profile', 
      component: Link,
      to: '/profile'
    },
    { 
      icon: LogOut, 
      label: 'Logout', 
      onClick: logout 
    }
  ] : [];

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 ${
          isOpen ? 'opacity-30' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 floating-menu-container">
        {/* Menu Items */}
        <div className={`relative ${isOpen ? 'visible' : 'invisible'} transition-all duration-300 ease-in-out`}>
          {menuItems.map((item, index) => {
            // Calculate position for each item in a circular pattern
            // Position items in a semi-circular pattern to the left of the main button
            const startAngle = 90; // Start from top
            const spreadAngle = 180; // Spread over 180 degrees (left half)
            const angle = (startAngle + (index * (spreadAngle / (menuItems.length - 1)))) * (Math.PI / 180);
            const radius = 120; // Distance from center
            const translateX = Math.cos(angle) * radius;
            const translateY = Math.sin(angle) * radius;
            
            // Calculate delay for staggered animation
            const delay = index * 0.05;
            
            return (
              <div key={index} className="absolute" style={{ zIndex: 10 }}>
                {/* Tooltip */}
                <div 
                  className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap transition-opacity duration-200 ${
                    isOpen ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                  }`}
                >
                  {item.label}
                </div>
                
                {/* Button or Link */}
                {item.component === Link ? (
                  <Link
                    to={item.to}
                    className={`group w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transform transition-all duration-500 ease-in-out hover:shadow-xl ${
                      isOpen 
                        ? 'scale-100 opacity-100' 
                        : 'scale-0 opacity-0'
                    }`}
                    style={{ 
                      transform: isOpen 
                        ? `translate(${translateX}px, ${translateY}px) scale(1)` 
                        : 'translate(0, 0) scale(0)',
                      backgroundColor: theme.background,
                      color: theme.primary,
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                      transitionDelay: isOpen ? `${delay}s` : '0s'
                    }}
                    aria-label={item.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                  >
                    <div className="relative">
                      <item.icon size={20} className="transition-transform duration-200 ease-in-out group-hover:scale-110" />
                      
                      {/* Badge for cart */}
                      {item.badge && (
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                      
                      {/* Tooltip on hover */}
                      <div 
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
                      >
                        {item.label}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      item.onClick();
                      setIsOpen(false);
                    }}
                    className={`group w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transform transition-all duration-500 ease-in-out hover:shadow-xl ${
                      isOpen 
                        ? 'scale-100 opacity-100' 
                        : 'scale-0 opacity-0'
                    }`}
                    style={{ 
                      transform: isOpen 
                        ? `translate(${translateX}px, ${translateY}px) scale(1)` 
                        : 'translate(0, 0) scale(0)',
                      backgroundColor: theme.background,
                      color: theme.primary,
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                      transitionDelay: isOpen ? `${delay}s` : '0s'
                    }}
                    aria-label={item.label}
                  >
                    <div className="relative">
                      <item.icon size={20} className="transition-transform duration-200 ease-in-out group-hover:scale-110" />
                      
                      {/* Tooltip on hover */}
                      <div 
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
                      >
                        {item.label}
                      </div>
                    </div>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={toggleMenu}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center focus:outline-none transition-all duration-300 ease-in-out transform hover:shadow-xl"
          style={{ 
            backgroundColor: theme.primary,
            color: '#FFFFFF',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
          }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <div 
            className="transition-transform duration-300 ease-in-out"
            style={{ transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)' }}
          >
            <Plus size={24} />
          </div>
        </button>
      </div>
    </>
  );
};

export default FloatingActionMenu;
