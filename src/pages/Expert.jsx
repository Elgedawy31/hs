import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import UniUploadDoc from '../components/UniUploadDoc';
import SEO from '../components/SEO';
import { Clock, Calendar, CheckCircle2, GraduationCap, UserRound } from 'lucide-react';

function Expert() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // Sample expert data
  const expert = {
    id: 1,
    name: 'Dr. Alexander Schmidt',
    image: '/src/assets/Images/doctor-1.svg',
    description: 'Dr. Alexander is a board-certified dermatologist specializing in medical and cosmetic dermatology. She has extensive experience in treating various skin conditions and is known for her patient-centered approach.',
    experience: 15,
    education: 'Stanford Medical School',
    specializations: ['Medical Dermatology', 'Cosmetic Dermatology'],
    languages: ['English', 'German']
  };
  
  // State for appointment booking
  const [selectedTime, setSelectedTime] = useState(null);
  const [reasonForVisit, setReasonForVisit] = useState('');
  const [patientType, setPatientType] = useState('new');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  // Available time slots
  const morningSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'];
  const eveningSlots = ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  
  // Handle time slot selection
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };
  
  // Handle file changes
  const handleFilesChange = (files) => {
    setUploadedFiles(files);
  };
  
  // Handle form submission
  const handleConfirmAppointment = () => {
    // In a real app, this would submit the appointment data to a server
    alert('Appointment confirmed!');
    // Navigate back to experts page
    navigate('/experts');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title={`HS - Healthcare Solutions - ${expert.name}`}
        description={`Book an appointment with ${expert.name}, a dermatology specialist.`}
        keywords="dermatology, skin specialist, doctor, healthcare, appointment"
        ogImage={expert.image}
      />
      
      {/* Expert Profile Card */}
      <div className="rounded-xl overflow-hidden shadow-sm mb-10 bg-white" style={{ backgroundColor: theme.background }}>
        <div className="flex flex-col md:flex-row">
          {/* Expert Image */}
          <div className="md:w-1/3 p-6">
            <img 
              src={expert.image} 
              alt={expert.name} 
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
          
          {/* Expert Details */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-2xl font-bold mb-4" style={{ color: theme.text }}>
              {expert.name}
            </h1>
            
            <p className="mb-4 text-sm" style={{ color: theme.placeholderText }}>
              {expert.description}
            </p>
            
            <div className="flex items-center mb-2">
              <span className="font-medium mr-2" style={{ color: theme.text }}>
                {expert.experience} years experience
              </span>
            </div>
            
            <div className="flex items-center">
              <span className="text-amber-500"><GraduationCap /></span>
              <span className="ml-2" style={{ color: theme.text }}>
                {expert.education}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6" style={{ color: theme.text }}>
        Book Your Appointment
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {/* Available Time */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2" style={{ color: theme.text }}>
              Available Time
            </h3>
            
            <div className="mb-4">
              <p className="text-sm mb-2" style={{ color: theme.placeholderText }}>
                Morning
              </p>
              <div className="grid grid-cols-4 gap-2">
                {morningSlots.map((time) => (
                  <button
                    key={time}
                    className={`py-2 px-4 rounded-md text-sm border transition-colors ${
                      selectedTime === time 
                        ? 'border-primary bg-secondPrimaryColor' 
                        : 'border-borderColor hover:border-primary'
                    }`}
                    style={{ 
                      borderColor: selectedTime === time ? theme.primary : theme.borderColor,
                      color: theme.text
                    }}
                    onClick={() => handleTimeSelection(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm mb-2" style={{ color: theme.placeholderText }}>
                Evening
              </p>
              <div className="grid grid-cols-4 gap-2">
                {eveningSlots.map((time) => (
                  <button
                    key={time}
                    className={`py-2 px-4 rounded-md text-sm border transition-colors ${
                      selectedTime === time 
                        ? 'border-primary bg-secondPrimaryColor' 
                        : 'border-borderColor hover:border-primary'
                    }`}
                    style={{ 
                      borderColor: selectedTime === time ? theme.primary : theme.borderColor,
                      color: theme.text
                    }}
                    onClick={() => handleTimeSelection(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Reason For Visit */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2" style={{ color: theme.text }}>
              Reason For Visit
            </h3>
            <textarea
              placeholder="Please Enter your Concerns"
              value={reasonForVisit}
              onChange={(e) => setReasonForVisit(e.target.value)}
              className="w-full p-3 border rounded-md resize-none"
              style={{ 
                borderColor: theme.borderColor,
                backgroundColor: theme.background,
                color: theme.text,
                height: '120px'
              }}
            />
          </div>
          
          {/* Patient Type */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2" style={{ color: theme.text }}>
              Patient Type
            </h3>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="patientType"
                  value="new"
                  checked={patientType === 'new'}
                  onChange={() => setPatientType('new')}
                  className="mr-2"
                  style={{ accentColor: theme.primary }}
                />
                <span style={{ color: theme.text }}>New Patient</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="patientType"
                  value="returning"
                  checked={patientType === 'returning'}
                  onChange={() => setPatientType('returning')}
                  className="mr-2"
                  style={{ accentColor: theme.primary }}
                />
                <span style={{ color: theme.text }}>Returning Patient</span>
              </label>
            </div>
          </div>
          
          {/* Upload Medical Records */}
          <div>
            <h3 className="font-semibold mb-2" style={{ color: theme.text }}>
              Upload Medical Records
            </h3>
            <UniUploadDoc
              title=""
              fileType="all"
              onFilesChange={handleFilesChange}
              maxFiles={3}
              description="Upload your medical records or any relevant documents"
            />
          </div>
        </div>
        
        <div>
          {/* Appointment Summary */}
          <div className="bg-white rounded-lg p-6 mb-6 border" style={{ 
            backgroundColor: theme.background,
            borderColor: theme.borderColor
          }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
              Appointment Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <span ><UserRound className="w-5 h-5 mr-2" style={{ color: theme.primary }}  /></span>
                <div>
                  <p className="text-sm" style={{ color: theme.placeholderText }}>Doctor</p>
                  <p className="font-medium" style={{ color: theme.text }}>{expert.name}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="w-5 h-5 mr-2" style={{ color: theme.primary }} />
                <div>
                  <p className="text-sm" style={{ color: theme.placeholderText }}>Date & Time</p>
                  <p className="font-medium" style={{ color: theme.text }}>
                    {selectedTime ? `Select your suitable Time` : 'Select your suitable Time'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-2" style={{ color: theme.primary }} />
                <div>
                  <p className="text-sm" style={{ color: theme.placeholderText }}>Duration</p>
                  <p className="font-medium" style={{ color: theme.text }}>30 minutes</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Appointment Instructions */}
          <div className="bg-white rounded-lg p-6 border" style={{ 
            backgroundColor: theme.background,
            borderColor: theme.borderColor
          }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
              Appointment Instructions
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: theme.primary }} />
                <span style={{ color: theme.text }}>Please arrive 10 minutes before your appointment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: theme.primary }} />
                <span style={{ color: theme.text }}>Medical history documentation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: theme.primary }} />
                <span style={{ color: theme.text }}>Bring your insurance card and photo ID</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: theme.primary }} />
                <span style={{ color: theme.text }}>List of Current Medications</span>
              </li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate('/experts')}
              className="px-6 py-3 rounded-lg border font-medium"
              style={{ 
                borderColor: theme.borderColor,
                color: theme.text
              }}
            >
              Return To Experts
            </button>
            
            <button
              onClick={handleConfirmAppointment}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: theme.primary }}
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expert;
