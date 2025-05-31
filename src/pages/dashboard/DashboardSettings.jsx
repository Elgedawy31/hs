import React, { useState } from 'react'
import { Settings, Camera, Edit3, Trash2, Plus, Clock, Calendar, BarChart3, Users, Eye } from 'lucide-react'

function DashboardSettings() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Dr. Ahmed Samy',
    specialization: 'Dermatologist',
    licenseNumber: 'MD12345678',
    yearsOfExperience: '13',
    emailAddress: 'Ahmed.Samy@gmail.com',
    phoneNumber: '+201203040050'
  })

  const [specializations, setSpecializations] = useState([
    {
      id: 1,
      title: 'Medical Dermatology',
      description: 'Treatment of skin conditions and diseases'
    },
    {
      id: 2,
      title: 'Medical Dermatology',
      description: 'Treatment of skin conditions and diseases'
    },
    {
      id: 3,
      title: 'Medical Dermatology',
      description: 'Treatment of skin conditions and diseases'
    },
    {
      id: 4,
      title: 'Medical Dermatology',
      description: 'Treatment of skin conditions and diseases'
    }
  ])

  const [workingHours, setWorkingHours] = useState({
    Monday: { start: '9:00 AM', end: '5:00 PM', enabled: true },
    Tuesday: { start: '9:00 AM', end: '5:00 PM', enabled: true },
    Wednesday: { start: '9:00 AM', end: '5:00 PM', enabled: true },
    Thursday: { start: '9:00 AM', end: '5:00 PM', enabled: true },
    Friday: { start: '9:00 AM', end: '5:00 PM', enabled: true },
    Saturday: { start: '9:00 AM', end: '5:00 PM', enabled: true },
    Sunday: { start: '9:00 AM', end: '5:00 PM', enabled: true }
  })

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleWorkingHoursChange = (day, field, value) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }))
  }

  const addSpecialization = () => {
    const newSpec = {
      id: specializations.length + 1,
      title: 'New Specialization',
      description: 'Description of the specialization'
    }
    setSpecializations([...specializations, newSpec])
  }

  const removeSpecialization = (id) => {
    setSpecializations(specializations.filter(spec => spec.id !== id))
  }

  const quickActions = [
    { icon: Edit3, label: 'Edit Appointments', color: 'text-blue-500' },
    { icon: Clock, label: 'Update Schedule', color: 'text-green-500' },
    { icon: Users, label: 'Manage Specializations', color: 'text-purple-500' },
    { icon: BarChart3, label: 'View Analytics', color: 'text-orange-500' }
  ]

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Settings className="text-primary" size={32} />
          <h1 className="text-3xl font-bold text-text">
            Settings
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Section */}
          <div className="border border-borderColor rounded-xl p-6">
            <div className="flex items-start gap-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-altPrimary flex items-center justify-center overflow-hidden">
                  <img 
                    src="/src/assets/Images/Ahmed.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-primary text-text p-2 rounded-full hover:bg-altPrimary transition-colors duration-200">
                  <Camera size={16} />
                </button>
              </div>
              <div className="flex-1">
                <button className="flex items-center gap-2 text-primary hover:text-altPrimary font-medium transition-colors duration-200">
                  <Camera size={16} />
                  Change Photo
                </button>
              </div>
            </div>

            {/* Personal Information */}
            <h2 className="text-xl font-semibold text-text mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-hoverText mb-2">Full Name</label>
                <input
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent focus:border-transparent text-text placeholder-placeholderText"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-hoverText mb-2">Specialization</label>
                <input
                  type="text"
                  value={personalInfo.specialization}
                  onChange={(e) => handlePersonalInfoChange('specialization', e.target.value)}
                  className="w-full px-4 py-3 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent focus:border-transparent text-text placeholder-placeholderText"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-hoverText mb-2">License Number</label>
                <input
                  type="text"
                  value={personalInfo.licenseNumber}
                  onChange={(e) => handlePersonalInfoChange('licenseNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent focus:border-transparent text-text placeholder-placeholderText"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-hoverText mb-2">Years of Experience</label>
                <input
                  type="text"
                  value={personalInfo.yearsOfExperience}
                  onChange={(e) => handlePersonalInfoChange('yearsOfExperience', e.target.value)}
                  className="w-full px-4 py-3 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent focus:border-transparent text-text placeholder-placeholderText"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-hoverText mb-2">Email Address</label>
                <input
                  type="email"
                  value={personalInfo.emailAddress}
                  onChange={(e) => handlePersonalInfoChange('emailAddress', e.target.value)}
                  className="w-full px-4 py-3 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent focus:border-transparent text-text placeholder-placeholderText"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-hoverText mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={personalInfo.phoneNumber}
                  onChange={(e) => handlePersonalInfoChange('phoneNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent focus:border-transparent text-text placeholder-placeholderText"
                />
              </div>
            </div>
          </div>

          {/* Specializations Section */}
          <div className="border border-borderColor rounded-xl p-6">
            <h2 className="text-xl font-semibold text-text mb-6">Specializations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specializations.map((spec) => (
                <div key={spec.id} className="border border-borderColor rounded-lg p-4 relative">
                  <button 
                    onClick={() => addSpecialization()}
                    className="absolute top-3 right-12 bg-primary text-white p-1 rounded-full hover:bg-altPrimary transition-colors duration-200"
                  >
                    <Plus size={16} />
                  </button>
                  <button 
                    onClick={() => removeSpecialization(spec.id)}
                    className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                  <h3 className="font-semibold text-text mb-2">{spec.title}</h3>
                  <p className="text-placeholderText text-sm mb-4">{spec.description}</p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200">
                      Edit
                    </button>
                    <button 
                      onClick={() => removeSpecialization(spec.id)}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Working Hours Section */}
          <div className="border border-borderColor rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-text">Working Hours</h2>
              <button 
                onClick={addSpecialization}
                className="flex items-center gap-2 text-primary hover:text-altPrimary font-medium transition-colors duration-200"
              >
                <Plus size={16} />
                Add Hours
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(workingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-text">{day}</div>
                  <input
                    type="time"
                    value={hours.start.replace(' AM', '').replace(' PM', '')}
                    onChange={(e) => handleWorkingHoursChange(day, 'start', e.target.value)}
                    className="px-3 py-2 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-text"
                  />
                  <span className="text-placeholderText">To</span>
                  <input
                    type="time"
                    value={hours.end.replace(' AM', '').replace(' PM', '')}
                    onChange={(e) => handleWorkingHoursChange(day, 'end', e.target.value)}
                    className="px-3 py-2 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-text"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar - 1 column */}
        <div className="lg:col-span-1">
          <div className="border border-borderColor rounded-xl p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-text mb-6">Quick Actions</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-4 border border-borderColor rounded-lg hover:bg-primary transition-colors duration-200 text-left"
                  >
                    <IconComponent className={action.color} size={20} />
                    <span className="text-text font-medium">{action.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-center">
        <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-altPrimary transition-colors duration-200 font-medium">
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default DashboardSettings
