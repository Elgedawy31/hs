import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Images/logo.svg';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="HS Logo" className="h-15" />
          </Link>
        </div>

        {/* Navigation - Only visible on lg screens and above */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-text hover:text-primary font-medium relative group">
            Home
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 -bottom-2 bg-primary rounded-full group-hover:opacity-100 opacity-0 transition-opacity"></span>
          </Link>
          <Link to="/treatments" className="text-text hover:text-primary font-medium relative group">
            Treatments
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 -bottom-2 bg-primary rounded-full group-hover:opacity-100 opacity-0 transition-opacity"></span>
          </Link>
          <Link to="/products" className="text-text hover:text-primary font-medium relative group">
            Products
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 -bottom-2 bg-primary rounded-full group-hover:opacity-100 opacity-0 transition-opacity"></span>
          </Link>
          <Link to="/contact" className="text-text hover:text-primary font-medium relative group">
            Contact US
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 -bottom-2 bg-primary rounded-full group-hover:opacity-100 opacity-0 transition-opacity"></span>
          </Link>
          <Link to="/terms" className="text-text hover:text-primary font-medium relative group">
            Terms
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 -bottom-2 bg-primary rounded-full group-hover:opacity-100 opacity-0 transition-opacity"></span>
          </Link>
        </nav>

        {/* Buttons - Only visible on lg screens and above */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-full font-medium shadow-lg  hover:bg-opacity-90 transition-colors">
            Login
          </Link>
          <Link to="/book" className="bg-altPrimary text-text px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow">
            Book Appointment
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            className="text-text focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Only visible when menu is open */}
      <div 
        className={`lg:hidden fixed inset-x-0 top-[72px] z-50 bg-body shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-[120%]'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link to="/" className="text-text hover:text-primary font-medium py-2 border-b border-borderColor">
            Home
          </Link>
          <Link to="/treatments" className="text-text hover:text-primary font-medium py-2 border-b border-borderColor">
            Treatments
          </Link>
          <Link to="/products" className="text-text hover:text-primary font-medium py-2 border-b border-borderColor">
            Products
          </Link>
          <Link to="/contact" className="text-text hover:text-primary font-medium py-2 border-b border-borderColor">
            Contact US
          </Link>
          <Link to="/terms" className="text-text hover:text-primary font-medium py-2 border-b border-borderColor">
            Terms
          </Link>
          <div className="flex flex-col space-y-3 pt-2">
            <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-full font-medium shadow-lg hover:bg-opacity-90 transition-colors text-center">
              Login
            </Link>
            <Link to="/book" className="bg-altPrimary text-text px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow text-center">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
