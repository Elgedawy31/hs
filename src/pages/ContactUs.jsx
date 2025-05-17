import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import UniTextInput from '../components/UniTextInput';
import UniBtn from '../components/UniBtn';
import SEO from '../components/SEO';
import contactUsImage from '../assets/Images/contact-us.jpg';
import AnimatedBackground from '../components/AnimatedBackground';

// Form validation schema using Zod
const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

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

function ContactUs() {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      console.log('Form submitted:', data);
      
      // Show success message (you can use a toast library here)
      alert('Message sent successfully!');
      
      // Reset form
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <SEO 
          title={`HS - Healthcare Solutions - Contact Us`}
          description={`Contact us for any queries or questions. We are here to help you.`}
        />
        
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Contact Us</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">We are ready for helping and answering any questions. Our team is here to provide you with the best support.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Form Section */}
            <motion.div 
              className="bg-background/80 backdrop-blur-sm card-radius card-shadow p-8 md:p-10 order-2 lg:order-1"
              variants={itemVariants}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <UniTextInput
                    label="Full Name"
                    value={watch('fullName')}
                    onChange={(value) => setValue('fullName', value)}
                    placeholder="Enter your full name"
                    error={errors.fullName?.message}
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <UniTextInput
                    label="Email Address"
                    value={watch('email')}
                    onChange={(value) => setValue('email', value)}
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <UniTextInput
                    label="Phone Number"
                    value={watch('phoneNumber')}
                    onChange={(value) => setValue('phoneNumber', value)}
                    placeholder="Enter your phone number"
                    error={errors.phoneNumber?.message}
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <UniTextInput
                    label="Subject"
                    value={watch('subject')}
                    onChange={(value) => setValue('subject', value)}
                    placeholder="Enter your subject"
                    error={errors.subject?.message}
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <UniTextInput
                    label="Message"
                    type="textarea"
                    value={watch('message')}
                    onChange={(value) => setValue('message', value)}
                    placeholder="Your message"
                    error={errors.message?.message}
                    required
                    rows={5}
                  />
                </motion.div>

                <motion.div 
                  className="pt-2"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <UniBtn
                    text="Send Message"
                    type="submit"
                    loading={isSubmitting}
                    className="w-full text-white font-medium"
                  />
                </motion.div>
              </form>
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
                src={contactUsImage} 
                alt="Contact Us" 
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
            </motion.div>
          </div>
          
          {/* Contact Info Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            <motion.div 
              className="bg-background/80 backdrop-blur-sm p-6 rounded-xl card-shadow"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-500">+1 (234) 567-8901</p>
                <p className="text-gray-500">Mon-Fri, 9am-6pm</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-background/80 backdrop-blur-sm p-6 rounded-xl card-shadow"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-500">support@healthcare.com</p>
                <p className="text-gray-500">We reply within 24 hours</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-background/80 backdrop-blur-sm p-6 rounded-xl card-shadow"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-gray-500">123 Healthcare St.</p>
                <p className="text-gray-500">New York, NY 10001</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
  );
}

export default ContactUs;
