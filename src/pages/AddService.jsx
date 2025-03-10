import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin } from 'lucide-react';
import UniBtn from '../components/UniBtn';
import UniTextInput from '../components/UniTextInput';
import UniUploadDoc from '../components/UniUploadDoc';

// Zod schema for form validation
const serviceSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  professionalTitle: z.string().min(1, { message: 'Professional title is required' }),
  licenseNumber: z.string().min(1, { message: 'License number is required' }),
  yearsOfExperience: z.string().min(1, { message: 'Years of experience is required' }),
  primarySpecialization: z.string().optional(),
  subSpecializations: z.array(z.string()).optional(),
  treatmentAreas: z.array(z.string()).optional(),
  serviceDescription: z.string().min(10, { message: 'Service description is required (min 10 characters)' }),
  availableDays: z.array(z.string()).min(1, { message: 'Select at least one available day' }),
  startTime: z.string().min(1, { message: 'Start time is required' }),
  endTime: z.string().min(1, { message: 'End time is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
});

function AddService() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileFiles, setProfileFiles] = useState([]);
  
  // React Hook Form setup with Zod validation
  const { handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      fullName: '',
      professionalTitle: '',
      licenseNumber: '',
      yearsOfExperience: '',
      primarySpecialization: '',
      subSpecializations: [],
      treatmentAreas: [],
      serviceDescription: '',
      availableDays: [],
      startTime: '9:00 am',
      endTime: '5:00 pm',
      location: '',
    }
  });

  const watchAllFields = watch();

  // Professional title options
  const titleOptions = [
    { value: 'dermatologist', label: 'Dermatologist' },
    { value: 'plastic-surgeon', label: 'Plastic Surgeon' },
    { value: 'cosmetic-dermatologist', label: 'Cosmetic Dermatologist' },
    { value: 'dermatopathologist', label: 'Dermatopathologist' },
  ];

  // Years of experience options
  const experienceOptions = [
    { value: '0-2', label: '0-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '6-10', label: '6-10 years' },
    { value: '10+', label: 'More than 10 years' },
  ];

  // Handle file change
  const handleFilesChange = (files) => {
    setProfileFiles(files);
  };

  // Handle checkbox changes for days
  const handleDayChange = (day) => {
    const currentDays = watchAllFields.availableDays || [];
    if (currentDays.includes(day)) {
      setValue('availableDays', currentDays.filter(d => d !== day));
    } else {
      setValue('availableDays', [...currentDays, day]);
    }
  };

  // Handle checkbox changes for specializations
  const handleSpecializationChange = (specialization) => {
    const currentSpecs = watchAllFields.subSpecializations || [];
    if (currentSpecs.includes(specialization)) {
      setValue('subSpecializations', currentSpecs.filter(s => s !== specialization));
    } else {
      setValue('subSpecializations', [...currentSpecs, specialization]);
    }
  };

  // Handle checkbox changes for treatment areas
  const handleTreatmentAreaChange = (area) => {
    const currentAreas = watchAllFields.treatmentAreas || [];
    if (currentAreas.includes(area)) {
      setValue('treatmentAreas', currentAreas.filter(a => a !== area));
    } else {
      setValue('treatmentAreas', [...currentAreas, area]);
    }
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to your backend
  };

  // Navigate between steps
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Time options
  const startTimeOptions = [
    { value: '8:00 am', label: '8:00 am' },
    { value: '9:00 am', label: '9:00 am' },
    { value: '10:00 am', label: '10:00 am' },
    { value: '11:00 am', label: '11:00 am' },
    { value: '12:00 pm', label: '12:00 pm' },
  ];

  const endTimeOptions = [
    { value: '4:00 pm', label: '4:00 pm' },
    { value: '5:00 pm', label: '5:00 pm' },
    { value: '6:00 pm', label: '6:00 pm' },
    { value: '7:00 pm', label: '7:00 pm' },
    { value: '8:00 pm', label: '8:00 pm' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-body">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Add New Service</h1>
        
        {/* Step Indicator */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center w-full max-w-2xl justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${currentStep >= 1 ? 'bg-primary' : 'bg-gray-300'}`}>
                1
              </div>
              <span className={`mt-2 text-sm ${currentStep >= 1 ? 'text-primary' : 'text-gray-500'}`}>Basic Info</span>
            </div>
            
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div className={`h-full ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`} style={{ width: currentStep >= 2 ? '100%' : '0%' }}></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'}`}>
                2
              </div>
              <span className={`mt-2 text-sm ${currentStep >= 2 ? 'text-primary' : 'text-gray-500'}`}>Specialization</span>
            </div>
            
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div className={`h-full ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`} style={{ width: currentStep >= 3 ? '100%' : '0%' }}></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-300'}`}>
                3
              </div>
              <span className={`mt-2 text-sm ${currentStep >= 3 ? 'text-primary' : 'text-gray-500'}`}>Service Details</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <UniTextInput
                  label="Full Name"
                  required
                  value={watchAllFields.fullName}
                  onChange={(value) => setValue('fullName', value)}
                  placeholder="Enter full name"
                  error={errors.fullName?.message}
                />
                
                <UniTextInput
                  type="select"
                  label="Professional Title"
                  required
                  value={watchAllFields.professionalTitle}
                  onChange={(value) => setValue('professionalTitle', value)}
                  placeholder="Select title"
                  options={titleOptions}
                  error={errors.professionalTitle?.message}
                />
                
                <UniTextInput
                  label="Professional License Number"
                  required
                  value={watchAllFields.licenseNumber}
                  onChange={(value) => setValue('licenseNumber', value)}
                  placeholder="Enter license number"
                  error={errors.licenseNumber?.message}
                />
                
                <UniTextInput
                  type="select"
                  label="Years of Experience"
                  required
                  value={watchAllFields.yearsOfExperience}
                  onChange={(value) => setValue('yearsOfExperience', value)}
                  placeholder="Select years of experience"
                  options={experienceOptions}
                  error={errors.yearsOfExperience?.message}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Profile Photo</label>
                <UniUploadDoc
                  title=""
                  fileType="images"
                  onFilesChange={handleFilesChange}
                  maxFiles={1}
                  description="Upload a professional photo (JPG, PNG)"
                  className="mb-0"
                />
              </div>
              
              <div className="flex justify-end mt-6">
                <UniBtn
                  text="Next"
                  onClick={nextStep}
                  className="text-white"
                />
              </div>
            </div>
          )}
          
          {/* Step 2: Specialization */}
          {currentStep === 2 && (
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Specialization</h2>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Primary Specialization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="dermatology"
                      name="primarySpecialization"
                      value="dermatology"
                      checked={watchAllFields.primarySpecialization === 'dermatology'}
                      onChange={() => setValue('primarySpecialization', 'dermatology')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="dermatology" className="ml-2 text-sm">
                      Dermatology
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="plastic-surgery"
                      name="primarySpecialization"
                      value="plastic-surgery"
                      checked={watchAllFields.primarySpecialization === 'plastic-surgery'}
                      onChange={() => setValue('primarySpecialization', 'plastic-surgery')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="plastic-surgery" className="ml-2 text-sm">
                      Plastic Surgery
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Sub- Specialization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="medical-dermatology"
                      checked={watchAllFields.subSpecializations?.includes('medical-dermatology')}
                      onChange={() => handleSpecializationChange('medical-dermatology')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="medical-dermatology" className="ml-2 text-sm">
                      Medical Dermatology
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="cosmetic-dermatology"
                      checked={watchAllFields.subSpecializations?.includes('cosmetic-dermatology')}
                      onChange={() => handleSpecializationChange('cosmetic-dermatology')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="cosmetic-dermatology" className="ml-2 text-sm">
                      Cosmetic Dermatology
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pediatric-dermatology"
                      checked={watchAllFields.subSpecializations?.includes('pediatric-dermatology')}
                      onChange={() => handleSpecializationChange('pediatric-dermatology')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="pediatric-dermatology" className="ml-2 text-sm">
                      Pediatric Dermatology
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="surgical-dermatology"
                      checked={watchAllFields.subSpecializations?.includes('surgical-dermatology')}
                      onChange={() => handleSpecializationChange('surgical-dermatology')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="surgical-dermatology" className="ml-2 text-sm">
                      Surgical Dermatology
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <UniBtn
                  text="Back"
                  onClick={prevStep}
                  className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white hover:bg-opacity-10"
                />
                <UniBtn
                  text="Next"
                  onClick={nextStep}
                  className="text-white"
                />
              </div>
            </div>
          )}
          
          {/* Step 3: Service Details */}
          {currentStep === 3 && (
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Service Details</h2>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Treatment Areas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="acne"
                      checked={watchAllFields.treatmentAreas?.includes('acne')}
                      onChange={() => handleTreatmentAreaChange('acne')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="acne" className="ml-2 text-sm">
                      Acne
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="eczema"
                      checked={watchAllFields.treatmentAreas?.includes('eczema')}
                      onChange={() => handleTreatmentAreaChange('eczema')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="eczema" className="ml-2 text-sm">
                      Eczema
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="other"
                      checked={watchAllFields.treatmentAreas?.includes('other')}
                      onChange={() => handleTreatmentAreaChange('other')}
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="other" className="ml-2 text-sm">
                      Other
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <UniTextInput
                  type="textarea"
                  label="Service Description"
                  required
                  value={watchAllFields.serviceDescription}
                  onChange={(value) => setValue('serviceDescription', value)}
                  placeholder="Describe your services"
                  error={errors.serviceDescription?.message}
                  rows={4}
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Available Days & Times</h3>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                    <div key={day} className="flex flex-col items-center">
                      <input
                        type="checkbox"
                        id={day}
                        checked={watchAllFields.availableDays?.includes(day)}
                        onChange={() => handleDayChange(day)}
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary mb-2"
                      />
                      <label htmlFor={day} className="text-sm">
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <UniTextInput
                    type="select"
                    label="Start Time"
                    required
                    value={watchAllFields.startTime}
                    onChange={(value) => setValue('startTime', value)}
                    placeholder="9:00 am"
                    options={startTimeOptions}
                    error={errors.startTime?.message}
                  />
                  
                  <UniTextInput
                    type="select"
                    label="End Time"
                    required
                    value={watchAllFields.endTime}
                    onChange={(value) => setValue('endTime', value)}
                    placeholder="5:00 pm"
                    options={endTimeOptions}
                    error={errors.endTime?.message}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <UniTextInput
                  label="Location / Address"
                  required
                  value={watchAllFields.location}
                  onChange={(value) => setValue('location', value)}
                  placeholder="Enter clinic address"
                  error={errors.location?.message}
                  className="pr-10"
                />
              </div>
              
              <div className="flex justify-between mt-6">
                <UniBtn
                  text="Back"
                  onClick={prevStep}
                  className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white hover:bg-opacity-10"
                />
                <div className="flex gap-3">
                  <UniBtn
                    text="Preview"
                    onClick={() => console.log('Preview')}
                    className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white hover:bg-opacity-10"
                  />
                  <UniBtn
                    text="Submit for review"
                    type="submit"
                    className="text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddService;
