import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/Images/logo.svg';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const {user} = useAuth();

  useEffect(() => {
    // Measure the header height when the component mounts
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleScroll = () => {
      // Calculate 10vh in pixels (changed from 70vh to 10vh as requested)
      const scrollThreshold = window.innerHeight * 0.1;
      
      // Check if scroll position exceeds 10vh
      if (window.scrollY > scrollThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Handle resize to update header height if needed
    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up the event listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <header 
      style={{backdropFilter: isSticky ? 'blur(20px)' : 'blur(0px)'}}
        ref={headerRef}
        className={`py-3 w-full transition-all duration-500 ease-in-out ${
          isSticky 
            ? 'fixed top-0 left-0 right-0 z-50  shadow-lg transform animate-slideDown scale-100' 
            : 'scale-100'
        }`}
      >
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
          {!user ? (
            <>
              <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-full font-medium shadow-lg hover:bg-opacity-90 transition-colors">
                Login
              </Link>
              <Link to="/contact-us" className="bg-altPrimary text-text px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow">
                Book Appointment
              </Link>
            </>
          ) : null}
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
            {!user ? (
              <>
                <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-full font-medium shadow-lg hover:bg-opacity-90 transition-colors text-center">
                  Login
                </Link>
                <Link to="/contact-us" className="bg-altPrimary text-text px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow text-center">
                  Book Appointment
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
      </header>
      {/* Add a placeholder div with the exact same height as the header when it's sticky to prevent content jump */}
      {isSticky && <div style={{ height: `${headerHeight}px` }}></div>}
    </>
  );
}

export default Header;
