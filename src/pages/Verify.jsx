import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import UniTextInput from '../components/UniTextInput';
import UniBtn from '../components/UniBtn';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

// Define validation schema with Zod
const verifySchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

function Verify() {
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

  return (
    <div className="min-h-screen flex items-center justify-center py-16" style={{backgroundColor: theme.body, color: theme.text}}>
      <div className="w-full max-w-md rounded-lg shadow-lg p-6 md:p-8" style={{backgroundColor: theme.background}}>
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{color: theme.text}}>Verify Email</h1>
          <p className="text-placeholderText" style={{color: theme.placeholderText}}>
            Please provide your email to reset your password securely
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errors.root && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.root.message}
            </div>
          )}
          
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

          <UniBtn
            text="Send Reset Link"
            type="submit"
            loading={loading}
            className="w-full bg-[#D29244] text-white py-3"
          />
        </form>

        <div className="mt-8 flex justify-center">
          <Link to="/login" className="flex items-center text-primary hover:underline">
            <ArrowLeft size={16} className="mr-2" />
            Back To Login
          </Link>
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

export default Verify;
