import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Phone, Mail, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';
import logo from '../assets/Images/logo.svg';

function Footer() {
  const { theme } = useTheme();

  return (
    <footer style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Support Column */}
          <div>
            <h3 className="text-2xl font-medium mb-6" style={{ fontFamily: 'Montaga, serif' }}>
              Support
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <Link to="/faqs" className="hover:text-gray-300 transition duration-300">
                  FAQs
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <Link to="/privacy-policy" className="hover:text-gray-300 transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <Link to="/terms" className="hover:text-gray-300 transition duration-300">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-2xl font-medium mb-6" style={{ fontFamily: 'Montaga, serif' }}>
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone size={20} className="mr-2" />
                <span>123-456-789</span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-2" />
                <span>contact@Skin.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-2xl font-medium mb-6" style={{ fontFamily: 'Montaga, serif' }}>
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <Link to="/" className="hover:text-gray-300 transition duration-300">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <Link to="/services" className="hover:text-gray-300 transition duration-300">
                  Services
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <Link to="/contact" className="hover:text-gray-300 transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow US Column */}
          <div>
            <h3 className="text-2xl font-medium mb-6" style={{ fontFamily: 'Montaga, serif' }}>
              Follow US
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-white p-2 rounded-full hover:opacity-80 transition duration-300">
                <Linkedin size={24} color="#000000" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full hover:opacity-80 transition duration-300">
                <Facebook size={24} color="#000000" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full hover:opacity-80 transition duration-300">
                <Instagram size={24} color="#000000" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full hover:opacity-80 transition duration-300">
                <Twitter size={24} color="#000000" />
              </a>
            </div>
          </div>
        </div>

        {/* Logo and Copyright */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img  draggable="false" src={logo} alt="Health Skin Clinic" className="h-10 mr-2" />
            <span className="text-2xl font-medium" style={{ fontFamily: 'Montaga, serif' }}>
              Health Skin Clinic
            </span>
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Health Skin Clinic. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
