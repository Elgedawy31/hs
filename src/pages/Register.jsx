import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Eye, EyeOff, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import UniTextInput from '../components/UniTextInput';
import UniBtn from '../components/UniBtn';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import AnimatedBackground from '../components/AnimatedBackground';
import registerImage from '../assets/Images/register.jpg';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const imageVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, delay: 0.2 }
  }
};

// Define validation schema with Zod
const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the Terms of Service and Privacy Policy'
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Initialize React Hook Form with Zod validation
  const { 
    handleSubmit, 
    formState: { errors },
    setValue,
    watch,
    setError
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    }
  });

  // Watch form values
  const fullName = watch('fullName');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const agreeToTerms = watch('agreeToTerms');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Here you would typically call an API to register the user
      console.log('Registration data:', data);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        toast.success('Account created successfully!');
        navigate('/login');
      }, 1500);
    } catch (error) {
      setError('root', { 
        type: 'manual',
        message: error.message || 'Something went wrong'
      });
      toast.error(error.message || 'An error occurred');
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (field, value) => {
    setValue(field, value, { shouldValidate: true });
  };

  const handleAgreeToTermsChange = () => {
    setValue('agreeToTerms', !agreeToTerms, { shouldValidate: true });
  };

  useEffect(() => {
    if(user){
      navigate('/')
    }
  } , [user])

  useEffect(() => {
    // Apply theme CSS variables
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  return (
    <div style={{backgroundColor:theme.body, color:theme.text}}> 
      <AnimatedBackground>
        <div className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="w-full max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image Section */}
              <motion.div 
                className="relative h-[400px] lg:h-[600px] overflow-hidden rounded-2xl"
                variants={imageVariants}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
                
                <motion.img 
                  src={registerImage} 
                  alt="Register" 
                  className="w-full h-full object-cover rounded-2xl"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
                />
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute top-10 left-10 w-16 h-16 rounded-full border border-primary/30 z-20"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div 
                  className="absolute bottom-20 right-10 w-10 h-10 rounded-full border border-primary/30 z-20"
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                <motion.div 
                  className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-primary/10 backdrop-blur-sm z-20"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </motion.div>

              {/* Registration Form Section */}
              <motion.div 
                className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8"
                variants={itemVariants}
              >
                <motion.div 
                  className="text-center mb-8"
                  variants={itemVariants}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Join HealthySkin</h1>
                  <p className="text-placeholderText">Create your account</p>
                </motion.div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {errors.root && (
                    <motion.div 
                      className="p-3 bg-red-100 border border-red-400 text-red-700 rounded"
                      variants={itemVariants}
                    >
                      {errors.root.message}
                    </motion.div>
                  )}
                  
                  <div className="space-y-4">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-1.5">Full Name</label>
                      <div className="relative">
                        <UniTextInput
                          type="text"
                          value={fullName}
                          onChange={(value) => handleInputChange('fullName', value)}
                          placeholder="Enter Your Full Name"
                          error={errors.fullName?.message}
                          required
                        />
                        <div className="absolute right-3 top-5 transform -translate-y-1/2 text-placeholderText">
                          <User size={18} />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-1.5">Email Address</label>
                      <div className="relative">
                        <UniTextInput
                          type="email"
                          value={email}
                          onChange={(value) => handleInputChange('email', value)}
                          placeholder="Enter Your Email"
                          error={errors.email?.message}
                          required
                        />
                        <div className="absolute right-3 top-5 transform -translate-y-1/2 text-placeholderText">
                          <Mail size={18} />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-1.5">Password</label>
                      <div className="relative">
                        <UniTextInput
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(value) => handleInputChange('password', value)}
                          placeholder="Enter Your Password"
                          error={errors.password?.message}
                          required
                        />
                        <div className="absolute right-3 top-5 transform -translate-y-1/2 text-placeholderText cursor-pointer" onClick={togglePasswordVisibility}>
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <UniTextInput
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(value) => handleInputChange('confirmPassword', value)}
                          placeholder="Confirm your Password"
                          error={errors.confirmPassword?.message}
                          required
                        />
                        <div className="absolute right-3 top-5 transform -translate-y-1/2 text-placeholderText cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <div className="flex items-center h-5">
                      <input
                        id="agree-terms"
                        name="agree-terms"
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={handleAgreeToTermsChange}
                        className="h-4 w-4 rounded border-borderColor text-primary focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agree-terms" className="font-medium">
                        I agree to the{' '}
                        <Link to="/privacy-policy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link to="/terms-of-service" className="text-primary hover:underline">
                          Terms of Service
                        </Link>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms.message}</p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <UniBtn
                      text="Create Account"
                      type="submit"
                      loading={loading}
                      className="w-full bg-[#D29244] text-white py-3"
                    />
                  </motion.div>

                  <motion.div 
                    className="relative flex items-center justify-center mt-6"
                    variants={itemVariants}
                  >
                    <div className="w-full absolute border-t border-borderColor/30" style={{borderColor:`${theme.borderColor}30`}}></div>
                    <div className="bg-background/80 px-4 relative z-10 text-placeholderText text-sm">
                      Or continue with
                    </div>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-1 gap-3"
                    variants={containerVariants}
                  >
                    <motion.button
                      type="button"
                      className="flex items-center justify-center w-full border border-borderColor rounded-lg py-2.5 px-4"
                      style={{color:theme.text, borderColor:theme.borderColor}}
                      variants={itemVariants}
                      whileHover={{ y: -2, boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ y: 0 }}
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
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      className="flex items-center justify-center w-full border border-borderColor rounded-lg py-2.5 px-4"
                      style={{color:theme.text, borderColor:theme.borderColor}}
                      variants={itemVariants}
                      whileHover={{ y: -2, boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ y: 0 }}
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
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      className="flex items-center justify-center w-full border border-borderColor rounded-lg py-2.5 px-4"
                      style={{color:theme.text, borderColor:theme.borderColor}}
                      variants={itemVariants}
                      whileHover={{ y: -2, boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ y: 0 }}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"
                          fill="currentColor"
                        />
                      </svg>
                      Continue with Apple
                    </motion.button>
                  </motion.div>
                </form>

                <motion.div 
                  className="mt-8 text-center text-text"
                  variants={itemVariants}
                >
                  <p className="text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline">
                      Log In
                    </Link>
                  </p>
                </motion.div>

                <motion.div 
                  className="mt-8 pt-6 border-t border-borderColor text-center text-xs text-placeholderText space-y-4"
                  variants={itemVariants}
                >
                  <div className="flex justify-center space-x-4">
                    <Link to="/privacy-policy" className="hover:text-primary">
                      Privacy Policy
                    </Link>
                    <Link to="/terms-of-service" className="hover:text-primary">
                      Terms of Service
                    </Link>
                  </div>
                  <p>© 2025 HealthySkin Clinic, All rights reserved.</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedBackground>
    </div>
  );
}

export default Register;
