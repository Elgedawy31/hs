import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Images/logo.svg';

function Header() {
  return (
    <header className="shadow-md py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="HS Logo" className="h-15" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-text hover:text-primary font-medium relative group">
            Home
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full group-hover:opacity-100 opacity-0 transition-opacity"></span>
          </Link>
          <Link to="/treatments" className="text-text hover:text-primary font-medium relative group">
            Treatments
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full group-hover:opacity-100 opacity-0 transition-opacity"></span>
          </Link>
          <Link to="/products" className="text-text hover:text-primary font-medium relative group">
            Products
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full group-hover:opacity-100 opacity-0 transition-opacity"></span>
          </Link>
          <Link to="/contact" className="text-text hover:text-primary font-medium relative group">
            Contact US
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full group-hover:opacity-100 opacity-0 transition-opacity"></span>
          </Link>
          <Link to="/terms" className="text-text hover:text-primary font-medium relative group">
            Terms
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full group-hover:opacity-100 opacity-0 transition-opacity"></span>
          </Link>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-full font-medium shadow-lg  hover:bg-opacity-90 transition-colors">
            Login
          </Link>
          <Link to="/book" className="bg-altPrimary text-text px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow">
            Book Appointment
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-text focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
