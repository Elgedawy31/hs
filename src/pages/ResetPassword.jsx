import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import UniTextInput from '../components/UniTextInput';
import UniBtn from '../components/UniBtn';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

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
    <div className="min-h-screen flex items-center justify-center py-16" style={{backgroundColor: theme.body, color: theme.text}}>
      <div className="w-full max-w-md rounded-lg shadow-lg p-6 md:p-8" style={{backgroundColor: theme.background}}>
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{color: theme.text}}>Create New Password</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-placeholderText">
            <div className="flex items-center">
              <Check size={16} className="text-green-500 mr-1" />
              <span>Email Verified</span>
            </div>
            <span>•</span>
            <span>Step 2 of 2</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errors.root && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.root.message}
            </div>
          )}
          
          <div className="space-y-4">
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

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Password Requirements</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
                  <Check size={16} />
                </div>
                <span className="ml-2">Minimum 8 characters long</span>
              </li>
              <li className="flex items-center">
                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${hasUppercase ? 'text-green-500' : 'text-gray-400'}`}>
                  <Check size={16} />
                </div>
                <span className="ml-2">At least one uppercase letter</span>
              </li>
              <li className="flex items-center">
                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
                  <Check size={16} />
                </div>
                <span className="ml-2">At least one number</span>
              </li>
              <li className="flex items-center">
                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`}>
                  <Check size={16} />
                </div>
                <span className="ml-2">At least one special character</span>
              </li>
            </ul>
          </div>

          <UniBtn
            text="Reset Password"
            type="submit"
            loading={loading}
            className="w-full bg-[#D29244] text-white py-3"
          />

          <div className="text-center text-sm text-placeholderText">
            Your password is securely encrypted
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-borderColor text-center text-xs text-placeholderText space-y-4">
          <div className="flex justify-center space-x-4">
            <Link to="/privacy-policy" className="hover:text-[#D29244]">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-[#D29244]">
              Terms of Service
            </Link>
          </div>
          <p>© 2025 HealthySkin Clinic, All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
