import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Camera, ArrowLeft } from 'lucide-react';
import UniBtn from '../components/UniBtn';
import UniTextInput from '../components/UniTextInput';

// Zod schema for form validation
const profileSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  gender: z.string().min(1, { message: 'Please select a gender' }),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  preferredTime: z.string().optional(),
  emailNotifications: z.boolean().optional(),
  smsNotifications: z.boolean().optional(),
  streetAddress: z.string().min(1, { message: 'Street address is required' }),
  zipCode: z.string().min(1, { message: 'Zip code is required' }),
  city: z.string().optional(),
  country: z.string().min(1, { message: 'Country is required' }),
});

function EditProfile() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState('/src/assets/Images/model-1.jpg');
  
  // React Hook Form setup with Zod validation
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: 'Emily',
      lastName: 'Williams',
      phoneNumber: '+1 (555) 123-4567',
      dateOfBirth: '1988-03-15',
      email: 'EmilyWilliam@gmail.com',
      gender: 'female',
      bloodType: '',
      allergies: '',
      preferredTime: '',
      emailNotifications: true,
      smsNotifications: false,
      streetAddress: '123 Main Street, Apt 4B',
      zipCode: '10001',
      city: 'New York',
      country: 'United States',
    }
  });

  const watchAllFields = watch();

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    const requiredFields = ['firstName', 'lastName', 'phoneNumber', 'dateOfBirth', 'email', 'gender', 'streetAddress', 'zipCode', 'country'];
    const optionalFields = ['bloodType', 'allergies', 'preferredTime', 'city'];
    
    const requiredFilled = requiredFields.filter(field => watchAllFields[field]).length;
    const optionalFilled = optionalFields.filter(field => watchAllFields[field]).length;
    
    const totalWeight = requiredFields.length + (optionalFields.length * 0.5);
    const filledWeight = requiredFilled + (optionalFilled * 0.5);
    
    return Math.round((filledWeight / totalWeight) * 100);
  };

  const completion = calculateCompletion();

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to your backend
    navigate('/profile');
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gender options for select input
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  // Blood type options
  const bloodTypeOptions = [
    { value: 'a-positive', label: 'A+' },
    { value: 'a-negative', label: 'A-' },
    { value: 'b-positive', label: 'B+' },
    { value: 'b-negative', label: 'B-' },
    { value: 'ab-positive', label: 'AB+' },
    { value: 'ab-negative', label: 'AB-' },
    { value: 'o-positive', label: 'O+' },
    { value: 'o-negative', label: 'O-' }
  ];

  // Allergy options
  const allergyOptions = [
    { value: 'penicillin', label: 'Penicillin' },
    { value: 'latex', label: 'Latex' },
    { value: 'sulfur', label: 'Sulfur' },
    { value: 'seasonal', label: 'Seasonal Allergies' },
    { value: 'none', label: 'No Known Allergies' }
  ];

  // Preferred time options
  const timeOptions = [
    { value: 'morning', label: 'Morning (8AM - 12PM)' },
    { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
    { value: 'evening', label: 'Evening (5PM - 9PM)' }
  ];

  // Country options
  const countryOptions = [
    { value: 'United States', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Germany', label: 'Germany' },
    { value: 'France', label: 'France' },
    { value: 'Japan', label: 'Japan' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-body">
      {/* Back button */}
      <button 
        onClick={() => navigate('/profile')}
        className="flex items-center text-primary mb-6 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        <span>Back to Profile</span>
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Profile</h1>
        
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4">
            <img  draggable="false" 
              src={profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full border-4 border-background"
            />
            <label 
              htmlFor="profile-image" 
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-opacity-90 transition-opacity"
            >
              <Camera className="h-5 w-5" />
              <input 
                type="file" 
                id="profile-image" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </label>
          </div>
          {/* <button 
            type="button"
            className="text-primary flex items-center hover:underline"
            onClick={() => document.getElementById('profile-image').click()}
          >
            <Camera className="h-4 w-4 mr-2" />
            Change Photo
          </button> */}
        </div>

        {/* Profile Completion */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Profile Completion</h2>
            <span className="text-primary font-medium">{completion}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-8">
          {/* Personal Information */}
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UniTextInput
                label="First Name"
                required
                value={watchAllFields.firstName}
                onChange={(value) => setValue('firstName', value)}
                placeholder="Enter your first name"
                error={errors.firstName?.message}
              />
              
              <UniTextInput
                label="Last Name"
                required
                value={watchAllFields.lastName}
                onChange={(value) => setValue('lastName', value)}
                placeholder="Enter your last name"
                error={errors.lastName?.message}
              />
              
              <UniTextInput
                label="Phone Number"
                required
                value={watchAllFields.phoneNumber}
                onChange={(value) => setValue('phoneNumber', value)}
                placeholder="Enter your phone number"
                error={errors.phoneNumber?.message}
              />
              
              <UniTextInput
                type="date"
                label="Date of Birth"
                required
                value={watchAllFields.dateOfBirth}
                onChange={(value) => setValue('dateOfBirth', value)}
                placeholder="yyyy / mm / dd"
                error={errors.dateOfBirth?.message}
              />
              
              <UniTextInput
                label="Email Address"
                required
                value={watchAllFields.email}
                onChange={(value) => setValue('email', value)}
                placeholder="Enter your email address"
                error={errors.email?.message}
              />
              
              <UniTextInput
                type="select"
                label="Gender"
                required
                value={watchAllFields.gender}
                onChange={(value) => setValue('gender', value)}
                placeholder="Select gender"
                options={genderOptions}
                error={errors.gender?.message}
              />
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Medical Information</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <UniTextInput
                type="select"
                label="Blood Type"
                value={watchAllFields.bloodType}
                onChange={(value) => setValue('bloodType', value)}
                placeholder="Select blood type"
                options={bloodTypeOptions}
                error={errors.bloodType?.message}
              />
              
              <UniTextInput
                type="select"
                label="Allergies"
                value={watchAllFields.allergies}
                onChange={(value) => setValue('allergies', value)}
                placeholder="Select allergies"
                options={allergyOptions}
                error={errors.allergies?.message}
              />
              
              <UniTextInput
                type="select"
                label="Preferred Appointment Time"
                value={watchAllFields.preferredTime}
                onChange={(value) => setValue('preferredTime', value)}
                placeholder="Select preferred time"
                options={timeOptions}
                error={errors.preferredTime?.message}
              />
            </div>
          </div>

          {/* Contact Reminders */}
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Contact Reminders</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-notifications"
                  checked={watchAllFields.emailNotifications}
                  onChange={(e) => setValue('emailNotifications', e.target.checked)}
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <label htmlFor="email-notifications" className="ml-3 text-sm">
                  Email notifications for appointments
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sms-notifications"
                  checked={watchAllFields.smsNotifications}
                  onChange={(e) => setValue('smsNotifications', e.target.checked)}
                  className="h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <label htmlFor="sms-notifications" className="ml-3 text-sm">
                  SMS notifications for appointments
                </label>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Address Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UniTextInput
                label="Street Address"
                required
                value={watchAllFields.streetAddress}
                onChange={(value) => setValue('streetAddress', value)}
                placeholder="Enter street name"
                error={errors.streetAddress?.message}
              />
              
              <UniTextInput
                label="Zip Code"
                required
                value={watchAllFields.zipCode}
                onChange={(value) => setValue('zipCode', value)}
                placeholder="1234"
                error={errors.zipCode?.message}
              />
              
              <UniTextInput
                label="City"
                value={watchAllFields.city}
                onChange={(value) => setValue('city', value)}
                placeholder="Enter your city"
                error={errors.city?.message}
              />
              
              <UniTextInput
                type="select"
                label="Country"
                required
                value={watchAllFields.country}
                onChange={(value) => setValue('country', value)}
                placeholder="Select country"
                options={countryOptions}
                error={errors.country?.message}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <UniBtn
            text="Cancel"
            onClick={() => navigate('/profile')}
            className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white hover:bg-opacity-10"
          />
          <UniBtn
            text="Save Changes"
            type="submit"
            className="text-white"
          />
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
