import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import UniTextInput from '../components/UniTextInput';
import UniBtn from '../components/UniBtn';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

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

  return (
    <div className="min-h-screen flex items-center justify-center py-16" style={{backgroundColor: theme.body, color: theme.text}}>
      <div className="w-full max-w-md rounded-lg shadow-lg p-6 md:p-8" style={{backgroundColor: theme.background}}>
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{color: theme.text}}>Create your account</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errors.root && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.root.message}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">FullName</label>
              <div className="relative">
                <UniTextInput
                  type="text"
                  value={fullName}
                  onChange={(value) => handleInputChange('fullName', value)}
                  placeholder="Enter Your FullName"
                  error={errors.fullName?.message}
                  required
                />
              </div>
            </div>

            <div>
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
                  onChange={(value) => handleInputChange('password', value)}
                  placeholder="Enter Your Password"
                  error={errors.password?.message}
                  required
                />
                             </div>
            </div>

            <div>
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
              </div>
            </div>
          </div>

          <div className="flex items-start">
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
          </div>

          <UniBtn
            text="Create Account"
            type="submit"
            loading={loading}
            className="w-full bg-[#D29244] text-white py-3"
          />
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Log In
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

export default Register;
