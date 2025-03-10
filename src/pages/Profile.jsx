import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Edit, 
  Clock, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Download, 
  Gift 
} from 'lucide-react';
import UniBtn from '../components/UniBtn';

function Profile() {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src="/src/assets/Images/model-1.jpg" 
            alt="Emily Williams" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">Emily Williams</h1>
            <span className="bg-primary bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
              Active Profile
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Patient ID: #PAT-2025-0123</p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <UniBtn 
              text={
                <div className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </div>
              } 
              className="text-white"
              onClick={() => {}}
            />
            <UniBtn 
              text="Medical Records" 
              className="border border-primary bg-transparent text-primary hover:bg-primary hover:text-white hover:bg-opacity-10"
              onClick={() => {}}
            />
            <UniBtn 
              text="Book Appointment" 
              className="border border-primary bg-transparent text-primary hover:bg-primary hover:text-white hover:bg-opacity-10"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Information */}
        <div className="bg-background rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Full Name</p>
              <p className="font-medium">Emily Williams</p>
            </div>
            
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Date Of Birth</p>
              <p className="font-medium">March 15, 1988</p>
            </div>
            
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Gender</p>
              <p className="font-medium">Female</p>
            </div>
            
            <div className="flex items-start gap-2">
              <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Phone Number</p>
                <p className="font-medium">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Email Address</p>
                <p className="font-medium">EmilyWilliam@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Address</p>
                <p className="font-medium">123 Main Street, Apt 4B</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Recent Treatments & Documents */}
        <div className="space-y-6">
          {/* Recent Treatments */}
          <div className="bg-background rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Treatments</h2>
            
            <div className="space-y-4">
              <div className="bg-altPrimary bg-opacity-30 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Acne Consultation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dr. Anna Schneider</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Jan 15, 2025
                  </div>
                </div>
                <p className="text-sm">Prescribed new topical medication</p>
              </div>
              
              <div className="bg-altPrimary bg-opacity-30 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Chemical Peel Treatment</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dr. Mohamed Nabil</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Feb 15, 2025
                  </div>
                </div>
                <p className="text-sm">Superficial peel for hyperpigmentation</p>
              </div>
            </div>
          </div>
          
          {/* Documents & Reports */}
          <div className="bg-background rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Documents & Reports</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-altPrimary bg-opacity-20 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-primary mr-3" />
                  <span className="font-medium">Treatment Plan</span>
                </div>
                <button className="text-gray-500 hover:text-primary">
                  <Download className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-altPrimary bg-opacity-20 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-primary mr-3" />
                  <span className="font-medium">Skin Analysis Report</span>
                </div>
                <button className="text-gray-500 hover:text-primary">
                  <Download className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-altPrimary bg-opacity-20 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-primary mr-3" />
                  <span className="font-medium">Medical History Summary</span>
                </div>
                <button className="text-gray-500 hover:text-primary">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Upcoming Appointment & Medical History */}
        <div className="space-y-6">
          {/* Upcoming Appointment */}
          <div className="bg-background rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Upcoming Appointment</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="/src/assets/Images/doctor-1.svg" 
                  alt="Dr. Lukas Weber" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-medium">Dr. Lukas Weber</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">Medical Dermatology</p>
                
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span>12 PM</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Sunday, 16 April 2025</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Medical History */}
          <div className="bg-background rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Medical History</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-medium">Recent Treatments</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Laser Skin Resurfacing</p>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Dr. Lukas Weber</span>
                      <span>Sunday, 16 April 2025</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium">Chemical Peel</p>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Dr. Anna Schneider</span>
                      <span>Thursday, 23 June 2025</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Gift className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-medium">Allergies & Conditions</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200">Penicillin</span>
                  <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200">Latex</span>
                  <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200">Sulfur</span>
                  <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200">Seasonal Allergies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Progress Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6">Treatment Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Progress Bar 1 */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Hyperpigmentation</span>
              <span className="text-primary font-medium">40 %</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '40%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">ongoing</p>
          </div>
          
          {/* Progress Bar 2 */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Acne Treatment</span>
              <span className="text-primary font-medium">75 %</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">in progress</p>
          </div>
          
          {/* Progress Bar 3 */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Skin Hydration</span>
              <span className="text-primary font-medium">90%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '90%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">optimal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
