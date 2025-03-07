import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Eye, EyeOff } from 'lucide-react';
import UniTextInput from '../components/UniTextInput';
import UniBtn from '../components/UniBtn';
import { useTheme } from '../contexts/ThemeContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { theme } = useTheme();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      // Handle login logic here
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center  py-16"style={{backgroundColor:theme.body , color:theme.text}}>
      <div className="w-full max-w-md  rounded-lg shadow-lg p-6 md:p-8" style={{backgroundColor:theme.background}}>
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{color:theme.text}}>Welcome Back</h1>
          <p className="text-placeholderText" style={{color:theme.placeholderText}} >Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <div className="relative">
                <UniTextInput
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="Enter Your Email"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-placeholderText">
                  <Mail size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <UniTextInput
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  placeholder="Enter Your Password"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 rounded border-borderColor text-primary focus:ring-primary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link to="/forget-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <UniBtn
            text="Log in"
            type="submit"
            loading={loading}
            className="w-full bg-[#D29244] text-white py-3"
          />

          <div className="relative flex items-center justify-center mt-6">
            <div className=" w-full absolute"></div>
            <div className="bg-background px-4 relative z-10 text-placeholderText text-sm">
              Or continue with
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              className="flex items-center justify-center w-full border border-borderColor rounded-lg py-2.5 px-4 hover:bg-altPrimary transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
            
            <button
              type="button"
              className="flex items-center justify-center w-full border border-borderColor rounded-lg py-2.5 px-4 hover:bg-altPrimary transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  fill="#1877F2"
                />
                <path
                  d="M15.893 14.89l.443-2.89h-2.773v-1.876c0-.791.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.195-2.238-.195c-2.285 0-3.777 1.384-3.777 3.89V12h-2.54v2.89h2.54v6.988a10.06 10.06 0 003.115 0v-6.987h2.33z"
                  fill="white"
                />
              </svg>
              Continue with Facebook
            </button>
            
            <button
              type="button"
              className="flex items-center justify-center w-full border border-borderColor rounded-lg py-2.5 px-4 hover:bg-altPrimary transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"
                  fill="currentColor"
                />
              </svg>
              Continue with Apple
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-borderColor text-center text-xs text-placeholderText space-y-4">
          <div className="flex justify-center space-x-4">
            <Link to="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
          <p>© 2025 HealthySkin Clinic, All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
