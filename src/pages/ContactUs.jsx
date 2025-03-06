import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import UniTextInput from '../components/UniTextInput';
import UniBtn from '../components/UniBtn';
import SEO from '../components/SEO';

// Form validation schema using Zod
const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

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
    <div className="flex justify-center items-center min-h-screen  py-16">
       <SEO 
        title={`HS - Healthcare Solutions - Contact Us`}
        description={`Contact us for any queries or questions. We are here to help you.`}
      />
      <div className="w-full max-w-2xl bg-background rounded-lg shadow-md p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-500">We are ready for helping and answering any questions</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <UniTextInput
              label="Full Name"
              value={watch('fullName')}
              onChange={(value) => setValue('fullName', value)}
              placeholder="Enter your FullName"
              error={errors.fullName?.message}
              required
            />
          </div>

          <div>
            <UniTextInput
              label="Email Address"
              value={watch('email')}
              onChange={(value) => setValue('email', value)}
              placeholder="Enter your Email"
              error={errors.email?.message}
              required
            />
          </div>

          <div>
            <UniTextInput
              label="Phone Number"
              value={watch('phoneNumber')}
              onChange={(value) => setValue('phoneNumber', value)}
              placeholder="Enter your Number"
              error={errors.phoneNumber?.message}
              required
            />
          </div>

          <div>
            <UniTextInput
              label="Subject"
              value={watch('subject')}
              onChange={(value) => setValue('subject', value)}
              placeholder="Enter your Subject"
              error={errors.subject?.message}
              required
            />
          </div>

          <div>
            <UniTextInput
              label="Message"
              type="textarea"
              value={watch('message')}
              onChange={(value) => setValue('message', value)}
              placeholder="Your Message"
              error={errors.message?.message}
              required
              rows={6}
            />
          </div>

          <div className="pt-2">
            <UniBtn
              text="Send Message"
              type="submit"
              loading={isSubmitting}
              className="w-full text-white font-medium"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
