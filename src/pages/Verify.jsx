import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
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
import verifyImage from '../assets/Images/verify.jpg';

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
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, delay: 0.2 }
  }
};

// Define validation schema with Zod
const verifySchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

function Verify() {
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {user} = useAuth()

  // Initialize React Hook Form with Zod validation
  const { 
    handleSubmit, 
    formState: { errors },
    setValue,
    watch,
    setError
  } = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      email: ''
    }
  });

  // Watch form values
  const email = watch('email');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Here you would typically call an API to send a reset link
      console.log('Verification email:', data.email);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        toast.success('Reset link sent to your email!');
        // You might want to redirect or show a success message
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

  const handleInputChange = (field, value) => {
    setValue(field, value, { shouldValidate: true });
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
              {/* Verify Form Section */}
              <motion.div 
                className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 order-2 lg:order-1"
                variants={itemVariants}
              >
                <motion.div 
                  className="text-center mb-8"
                  variants={itemVariants}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Reset Password</h1>
                  <p className="text-placeholderText">Please provide your email to reset your password securely</p>
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

                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <UniBtn
                      text="Send Reset Link"
                      type="submit"
                      loading={loading}
                      className="w-full bg-[#D29244] text-white py-3"
                    />
                  </motion.div>
                </form>

                <motion.div 
                  className="mt-8 flex justify-center"
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
              
              {/* Image Section */}
              <motion.div 
                className="relative order-1 lg:order-2 h-[400px] lg:h-[600px] overflow-hidden rounded-2xl"
                variants={imageVariants}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
                
                <motion.img 
                  src={verifyImage} 
                  alt="Verify" 
                  className="w-full h-full object-cover rounded-2xl"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
                />
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute top-10 right-10 w-16 h-16 rounded-full border border-primary/30 z-20"
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
                  className="absolute bottom-20 left-10 w-10 h-10 rounded-full border border-primary/30 z-20"
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
                  className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-primary/10 backdrop-blur-sm z-20"
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

                {/* Email verification animation */}
                <motion.div
                  className="absolute bottom-1/4 right-1/4 z-20"
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
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                      d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6Z"
                      stroke="rgba(255,255,255,0.9)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        repeatDelay: 1
                      }}
                    />
                    <motion.path
                      d="M22 6L12 13L2 6"
                      stroke="rgba(255,255,255,0.9)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: 0.5,
                        repeatDelay: 1
                      }}
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedBackground>
    </div>
  );
}

export default Verify;
