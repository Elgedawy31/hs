import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, Lock, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import UniTextInput from '../components/UniTextInput';
import UniBtn from '../components/UniBtn';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import AnimatedBackground from '../components/AnimatedBackground';
import resetPassImage from '../assets/Images/resetPass.jpeg';

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

// Define password validation schema with Zod
const passwordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Initialize React Hook Form with Zod validation
  const { 
    handleSubmit, 
    formState: { errors },
    setValue,
    watch,
    setError
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  // Watch form values
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // Check password requirements
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);


  useEffect(() => {
    if(user){
      navigate('/')
    }
  } , [user])

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Here you would typically call an API to reset the password
      console.log('New password:', data.password);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        toast.success('Password reset successfully!');
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
                  src={resetPassImage} 
                  alt="Reset Password" 
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

                {/* Lock animation */}
                <motion.div
                  className="absolute bottom-1/4 left-1/4 z-20"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="bg-white/20 backdrop-blur-md rounded-full p-4"
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(210, 146, 68, 0.4)",
                        "0 0 20px rgba(210, 146, 68, 0.6)",
                        "0 0 0 rgba(210, 146, 68, 0.4)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Lock size={40} color="rgba(255,255,255,0.9)" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Reset Password Form Section */}
              <motion.div 
                className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8"
                variants={itemVariants}
              >
                <motion.div 
                  className="text-center mb-8"
                  variants={itemVariants}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Create New Password</h1>
                  <motion.div 
                    className="flex items-center justify-center gap-2 text-sm text-placeholderText"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          delay: 0.7 
                        }}
                      >
                        <Check size={16} className="text-green-500 mr-1" />
                      </motion.div>
                      <span>Email Verified</span>
                    </div>
                    <span>•</span>
                    <span>Step 2 of 2</span>
                  </motion.div>
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
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-placeholderText cursor-pointer" onClick={togglePasswordVisibility}>
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
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-placeholderText cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="space-y-2 bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-borderColor/30"
                    variants={itemVariants}
                  >
                    <h3 className="text-sm font-medium">Password Requirements</h3>
                    <ul className="space-y-2 text-sm">
                      <motion.li 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.3 }
                        }}
                      >
                        <motion.div 
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${hasMinLength ? 'text-green-500 bg-green-100/20' : 'text-gray-400 bg-gray-100/10'}`}
                          animate={{ 
                            scale: hasMinLength ? [1, 1.2, 1] : 1,
                            transition: { duration: 0.3 }
                          }}
                        >
                          <Check size={16} />
                        </motion.div>
                        <span className="ml-2">Minimum 8 characters long</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.4 }
                        }}
                      >
                        <motion.div 
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${hasUppercase ? 'text-green-500 bg-green-100/20' : 'text-gray-400 bg-gray-100/10'}`}
                          animate={{ 
                            scale: hasUppercase ? [1, 1.2, 1] : 1,
                            transition: { duration: 0.3 }
                          }}
                        >
                          <Check size={16} />
                        </motion.div>
                        <span className="ml-2">At least one uppercase letter</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.5 }
                        }}
                      >
                        <motion.div 
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${hasNumber ? 'text-green-500 bg-green-100/20' : 'text-gray-400 bg-gray-100/10'}`}
                          animate={{ 
                            scale: hasNumber ? [1, 1.2, 1] : 1,
                            transition: { duration: 0.3 }
                          }}
                        >
                          <Check size={16} />
                        </motion.div>
                        <span className="ml-2">At least one number</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.6 }
                        }}
                      >
                        <motion.div 
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${hasSpecialChar ? 'text-green-500 bg-green-100/20' : 'text-gray-400 bg-gray-100/10'}`}
                          animate={{ 
                            scale: hasSpecialChar ? [1, 1.2, 1] : 1,
                            transition: { duration: 0.3 }
                          }}
                        >
                          <Check size={16} />
                        </motion.div>
                        <span className="ml-2">At least one special character</span>
                      </motion.li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <UniBtn
                      text="Reset Password"
                      type="submit"
                      loading={loading}
                      className="w-full bg-[#D29244] text-white py-3"
                    />
                  </motion.div>

                  <motion.div 
                    className="text-center text-sm text-placeholderText flex items-center justify-center"
                    variants={itemVariants}
                  >
                    <Lock size={14} className="mr-2 text-primary/70" />
                    Your password is securely encrypted
                  </motion.div>
                </form>

                <motion.div 
                  className="mt-6 flex justify-center"
                  variants={itemVariants}
                >
                  <Link to="/login" className="flex items-center text-primary hover:underline transition-transform hover:-translate-x-1">
                    <ArrowLeft size={16} className="mr-2" />
                    Back To Login
                  </Link>
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

export default ResetPassword;
