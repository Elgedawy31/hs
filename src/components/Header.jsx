import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/Images/logo.svg';
import { Menu, X, Sun, Moon, Bell, ShoppingCart, LogOut, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useSelector } from 'react-redux';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentTheme, toggleTheme } = useTheme();
  const {user, logout} = useAuth();
  const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img  draggable="false" src={logo} alt="HS Logo" className="h-15" />
          </Link>
        </div>

        {/* Navigation - Only visible on lg screens and above */}
        <nav className="hidden lg:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium relative group ${isActive ? 'text-primary' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                Home
                <span className={`absolute left-1/2 transform -translate-x-1/2 w-2 h-2 -bottom-2 bg-primary rounded-full transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'group-hover:opacity-100 opacity-0 group-hover:scale-100 scale-0'
                }`}></span>
              </>
            )}
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium relative group ${isActive ? 'text-primary' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                Products
                <span className={`absolute left-1/2 transform -translate-x-1/2 w-2 h-2 -bottom-2 bg-primary rounded-full transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'group-hover:opacity-100 opacity-0 group-hover:scale-100 scale-0'
                }`}></span>
              </>
            )}
          </NavLink>
          <NavLink 
            to="/experts" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium relative group ${isActive ? 'text-primary' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                Experts
                <span className={`absolute left-1/2 transform -translate-x-1/2 w-2 h-2 -bottom-2 bg-primary rounded-full transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'group-hover:opacity-100 opacity-0 group-hover:scale-100 scale-0'
                }`}></span>
              </>
            )}
          </NavLink>
          <NavLink 
            to="/blog" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium relative group ${isActive ? 'text-primary' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                Blog
                <span className={`absolute left-1/2 transform -translate-x-1/2 w-2 h-2 -bottom-2 bg-primary rounded-full transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'group-hover:opacity-100 opacity-0 group-hover:scale-100 scale-0'
                }`}></span>
              </>
            )}
          </NavLink>
          <NavLink 
            to="/library" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium relative group ${isActive ? 'text-primary' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                Library
                <span className={`absolute left-1/2 transform -translate-x-1/2 w-2 h-2 -bottom-2 bg-primary rounded-full transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'group-hover:opacity-100 opacity-0 group-hover:scale-100 scale-0'
                }`}></span>
              </>
            )}
          </NavLink>
          <NavLink 
            to="/contact-us" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium relative group ${isActive ? 'text-primary' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                Contact US
                <span className={`absolute left-1/2 transform -translate-x-1/2 w-2 h-2 -bottom-2 bg-primary rounded-full transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'group-hover:opacity-100 opacity-0 group-hover:scale-100 scale-0'
                }`}></span>
              </>
            )}
          </NavLink>
          <NavLink 
            to="/terms" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium relative group ${isActive ? 'text-primary' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                Terms
                <span className={`absolute left-1/2 transform -translate-x-1/2 w-2 h-2 -bottom-2 bg-primary rounded-full transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'group-hover:opacity-100 opacity-0 group-hover:scale-100 scale-0'
                }`}></span>
              </>
            )}
          </NavLink>
        </nav>

        {/* Buttons - Only visible on lg screens and above */}
        <div className="hidden lg:flex items-center space-x-4">
          <span 
            onClick={toggleTheme} 
            className="p-2 rounded-full flex items-center justify-center relative overflow-hidden group transition-all duration-300 ease-in-out hover:bg-altPrimary"
            aria-label={currentTheme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            <div className="absolute inset-0 w-full h-full bg-altPrimary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            <div className="relative z-10 transform group-hover:rotate-45 transition-transform duration-500 ease-in-out">
              {currentTheme === 'dark' ? (
                <Sun className="h-5 w-5 text-text" />
              ) : (
                <Moon className="h-5 w-5 text-text" />
              )}
            </div>
          </span>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/notifications" className="text-text hover:text-primary">
                <Bell className="h-6 w-6" />
              </Link>
              <Link to="/cart" className="text-text hover:text-primary relative">
                <ShoppingCart className="h-6 w-6" />
                {cartTotalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartTotalQuantity}
                  </span>
                )}
              </Link>
              <Link to="/profile" className="text-text hover:text-primary">
                <User className="h-6 w-6" />
              </Link>
              <span 
                onClick={logout} 
                className="text-text hover:text-primary"
                aria-label="Logout"
              >
                <LogOut className="h-6 w-6" />
              </span>
             
            </div>
          ) : (
            <>
              <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-full font-medium shadow-lg hover:bg-opacity-90 transition-colors">
                Login
              </Link>
              <Link to="/contact-us" className="bg-altPrimary text-text px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow">
                Book Appointment
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <span 
            className="text-text focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </span>
        </div>
      </div>

      {/* Mobile Menu - Only visible when menu is open */}
      <div 
        className={`lg:hidden absolute inset-x-0 top-[72px] z-50 bg-body shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-[120%]'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium py-2 border-b border-borderColor ${isActive ? 'text-primary' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium py-2 border-b border-borderColor ${isActive ? 'text-primary' : ''}`
            }
          >
            Products
          </NavLink>
          <NavLink 
            to="/blog" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium py-2 border-b border-borderColor ${isActive ? 'text-primary' : ''}`
            }
          >
            Blog
          </NavLink>
          <NavLink 
            to="/experts" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium py-2 border-b border-borderColor ${isActive ? 'text-primary' : ''}`
            }
          >
            Experts
          </NavLink>
          <NavLink 
            to="/contact-us" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium py-2 border-b border-borderColor ${isActive ? 'text-primary' : ''}`
            }
          >
            Contact US
          </NavLink>
          <NavLink 
            to="/library" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium py-2 border-b border-borderColor ${isActive ? 'text-primary' : ''}`
            }
          >
            Library
          </NavLink>
          <NavLink 
            to="/terms" 
            className={({ isActive }) => 
              `text-text hover:text-primary font-medium py-2 border-b border-borderColor ${isActive ? 'text-primary' : ''}`
            }
          >
            Terms
          </NavLink>
          <div className="flex flex-col space-y-3 pt-2">
            <span 
              onClick={toggleTheme} 
              className="flex items-center justify-center p-2 rounded-full group transition-all duration-300 ease-in-out hover:bg-altPrimary"
              aria-label={currentTheme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className="transform group-hover:rotate-45 transition-transform duration-500 ease-in-out mr-2">
                {currentTheme === 'dark' ? (
                  <Sun className="h-5 w-5 text-text" />
                ) : (
                  <Moon className="h-5 w-5 text-text" />
                )}
              </div>
              <span className="text-text">{currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </span>
            
            {user ? (
              <div className="grid md:gird-cols-4 grid-cols-2 gap-4 justify-between  py-2">
                <Link to="/notifications" className="text-text hover:text-primary flex items-center">
                  <Bell className="h-6 w-6 mr-2" />
                  <span>Notifications</span>
                </Link>
                <Link to="/cart" className="text-text hover:text-primary flex items-center relative">
                  <ShoppingCart className="h-6 w-6 mr-2" />
                  <span>Cart</span>
                  {cartTotalQuantity > 0 && (
                    <span className="absolute -top-2 left-4 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartTotalQuantity}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="text-text hover:text-primary flex items-center">
                  <User className="h-6 w-6 mr-2" />
                  <span>Profile</span>
                </Link>
                <span 
                  onClick={logout} 
                  className="text-text hover:text-primary flex items-center"
                  aria-label="Logout"
                >
                  <LogOut className="h-6 w-6 mr-2" />
                  <span>Logout</span>
                </span>
              
              </div>
            ) : (
              <>
                <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-full font-medium shadow-lg hover:bg-opacity-90 transition-colors text-center">
                  Login
                </Link>
                <Link to="/contact-us" className="bg-altPrimary text-text px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow text-center">
                  Book Appointment
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
