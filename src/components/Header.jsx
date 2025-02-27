import { useState, useRef, useEffect } from 'react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmails } from '../store/reducers/email';
import {useAuth} from "@src/contexts/AuthContext";


export default function Header({ sidebarOpen, setSidebarOpen }) {
  const {logout} = useAuth()
  const newFolderRef = useRef(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);;
  const {allEmails} = useSelector(state => state.box);
  const dispatch = useDispatch();
    const { user } = useAuth()
  
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const navigate = useNavigate();

  
 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const handleLogout = async () => {
    try {
      const result = await logout()
      if (!result.success) {
        console.error('Logout failed:', result.error)
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
    setIsDropdownOpen(false)
  }

  const handleFilterEamils = (e) => {
    const filteredEmails = allEmails.filter(email => email.subject.toLowerCase().includes(e.target.value.toLowerCase()));
    dispatch(setEmails(filteredEmails));
  }

  return (
    <header className="mt-4 sm:mt-6 flex items-center justify-between px-4 sm:px-8">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 sm:p-2 hover:bg-secondPrimaryColor rounded-full transition-all duration-300 
            ease-in-out transform hover:scale-105 active:scale-95
            mr-3 sm:mr-6
            lg:hidden block
            "
        >
          <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6 text-text transition-all duration-300 
            ease-in-out group-hover:rotate-12" />
        </button>
      <div className="flex items-center">
        <Link to={user?.role ==='admin' ? '/dashboard' : '/'} >
          <img src={logo} className="w-[80px] sm:w-[100px]
          md:block hidden
          " />
        </Link>
      </div>

      {/* Search Section */}
      <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
        <div className="relative group">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search"
            onChange={handleFilterEamils}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full bg-secondPrimaryColor rounded-full
              placeholder:text-placeholderText text-text font-medium text-sm sm:text-base
              pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5
              transition-all duration-200 ease-out
              focus:outline-none focus:bg-background 
              focus:shadow-[0_2px_8px_0px_rgba(0,0,0,0.16)]
              dark:focus:shadow-[0_2px_8px_0px_rgba(0,0,0,0.3)]
              "
          />
          <MagnifyingGlassIcon 
            className={`h-5 w-5 absolute left-3 top-[0.6rem]
              md:top-[14px]
              transition-all duration-300 ease-in-out
              ${isSearchFocused ? 'text-primary transform scale-110' : 'text-placeholderText'}`}
          />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Theme Toggle - Hidden on mobile, shown on sm and up */}
        <button 
          onClick={useTheme().toggleTheme}
          className="hidden sm:block p-2 hover:bg-secondPrimaryColor rounded-full
          transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
        >
          {useTheme().currentTheme === 'light' ? (
            <MoonIcon className="h-5 w-5 sm:h-6 sm:w-6 text-text transition-transform duration-300 
              ease-in-out hover:rotate-90" />
          ) : (
            <SunIcon className="h-5 w-5 sm:h-6 sm:w-6 text-text transition-transform duration-300 
              ease-in-out hover:rotate-90" />
          )}
        </button>

        {/* Separator - Hidden on mobile */}
        <div className="hidden sm:block h-6 w-px bg-text/50 transition-all duration-300 ease-in-out 
          transform hover:scale-y-125" />

        {/* User Account Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 p-1.5 sm:p-2 hover:bg-secondPrimaryColor rounded-lg
              transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-text transition-transform duration-300 
              ease-in-out group-hover:rotate-12" />
            <span className="hidden sm:inline text-sm font-medium text-text transition-all duration-300 
              ease-in-out group-hover:translate-x-1">
              My Account
            </span>
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 sm:w-60 bg-background rounded-lg shadow-lg border 
              border-borderColor py-1 top-full z-50 transition-all duration-300 ease-in-out 
              transform origin-top ${isDropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
          >
            {/* <button
              onClick={() => navigate('/profile')}
              className="w-full text-left px-3 sm:px-4 py-2 text-sm text-text 
                hover:bg-secondPrimaryColor flex items-center transition-all duration-300 
                ease-in-out transform hover:translate-x-1 group"
            >
              <UserIcon className="h-4 w-4 mr-2 transition-transform duration-300 
                ease-in-out group-hover:rotate-12" />
              Profile
            </button> */}
            {/* Theme Toggle for mobile */}
            <button
              onClick={useTheme().toggleTheme}
              className="sm:hidden w-full text-left px-3 py-2 text-sm text-text 
                hover:bg-secondPrimaryColor flex items-center transition-all duration-300 
                ease-in-out transform hover:translate-x-1 group"
            >
              {useTheme().currentTheme === 'light' ? (
                <>
                  <MoonIcon className="h-4 w-4 mr-2 transition-transform duration-300 
                    ease-in-out group-hover:rotate-12" />
                  Dark Mode
                </>
              ) : (
                <>
                  <SunIcon className="h-4 w-4 mr-2 transition-transform duration-300 
                    ease-in-out group-hover:rotate-12" />
                  Light Mode
                </>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 sm:px-4 py-2 text-sm text-text 
                hover:bg-secondPrimaryColor flex items-center transition-all duration-300 
                ease-in-out transform hover:translate-x-1 group"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2 transition-transform 
                duration-300 ease-in-out group-hover:translate-x-1" />
              Sign out
            </button>
          </div>
        </div>
      </div>

     
    </header>
  );
}
