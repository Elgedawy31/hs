import React, { useState, useMemo } from 'react'
import { Users, FileText, AlertTriangle, Clock, Search, Filter, ChevronDown, Download, Plus, User, MessageSquare, Calendar, CalendarCheck, FileDown, Printer } from 'lucide-react'
import UniTable from '../../components/doctorDashboard/UniTable'
import UniPagination from '../../components/UniPagination'

function DashboardMedicalRecords() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Most Recent')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10) // Number of items to show per page

  const sortOptions = ['Most Recent', 'Oldest First', 'By Name', 'By Diagnosis']

  const medicalRecordStats = [
    {
      title: 'Total Patients',
      value: '1250',
      icon: Users,
      iconColor: 'text-blue-300',
      borderColor: 'border-blue-700'
    },
    {
      title: 'Recent Consultations',
      value: '90',
      icon: FileText,
      iconColor: 'text-green-300',
      borderColor: 'border-green-700'
    },
    {
      title: 'Pending Reports',
      value: '12',
      icon: AlertTriangle,
      iconColor: 'text-red-300',
      borderColor: 'border-red-700'
    },
    {
      title: "Today's Appointments",
      value: '12',
      icon: Clock,
      iconColor: 'text-orange-300',
      borderColor: 'border-orange-700'
    }
  ]

  // Medical records data formatted for UniTable
  const medicalRecordsData = [
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      ageGender: '32 / Female',
      lastVisit: '32 / Female',
      diagnosis: 'Atopic Dermatitis',
      status: 'Active'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      ageGender: '32 / Female',
      lastVisit: '32 / Female',
      diagnosis: 'Psoriasis',
      status: 'Pending'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      ageGender: '32 / Female',
      lastVisit: '32 / Female',
      diagnosis: 'Melanoma Screening',
      status: 'Completed'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      ageGender: '32 / Female',
      lastVisit: '32 / Female',
      diagnosis: 'Rosacea',
      status: 'Active'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      ageGender: '32 / Female',
      lastVisit: '32 / Female',
      diagnosis: 'Eczema',
      status: 'Active'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      ageGender: '32 / Female',
      lastVisit: '32 / Female',
      diagnosis: 'Acne Vulgaris',
      status: 'Pending'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      ageGender: '32 / Female',
      lastVisit: '32 / Female',
      diagnosis: 'Exanthems',
      status: 'Inactive'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      ageGender: '32 / Female',
      lastVisit: '32 / Female',
      diagnosis: 'Scabies',
      status: 'Pending'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      ageGender: '32 / Female',
      lastVisit: '32 / Female',
      diagnosis: 'Psoriasis',
      status: 'Pending'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      ageGender: '32 / Female',
      lastVisit: '32 / Female',
      diagnosis: 'Rosacea',
      status: 'Completed'
    }
  ]

  // Table headers for medical records
  const medicalRecordHeaders = [
    'Patient Name',
    'Age / Gender',
    'Last Visit',
    'Diagnosis',
    'Status',
    'Actions'
  ]

  // Column mappings for the medical records table
  const medicalRecordColumnMappings = [
    { type: 'patientName', field: 'patientName', imageField: 'patientImage' },
    { type: 'text', field: 'ageGender' },
    { type: 'text', field: 'lastVisit' },
    { type: 'text', field: 'diagnosis' },
    { type: 'status', field: 'status' },
    { type: 'actions', actionType: 'menu' }
  ]

  // Filter and sort medical records based on search term and sort option
  const filteredAndSortedRecords = useMemo(() => {
    let filtered = medicalRecordsData.filter(record =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.status.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Sort based on selected option
    switch (sortBy) {
      case 'By Name':
        filtered.sort((a, b) => a.patientName.localeCompare(b.patientName))
        break
      case 'By Diagnosis':
        filtered.sort((a, b) => a.diagnosis.localeCompare(b.diagnosis))
        break
      case 'Oldest First':
        filtered.sort((a, b) => new Date(a.lastVisit) - new Date(b.lastVisit))
        break
      case 'Most Recent':
      default:
        filtered.sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit))
        break
    }

    return filtered
  }, [searchTerm, sortBy])

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedRecords.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedRecords = filteredAndSortedRecords.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Reset to first page when search or sort changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, sortBy])

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">
          Medical Records Dashboard
        </h1>
        <p className="text-placeholderText text-lg">
          Manage and track patient medical records
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {medicalRecordStats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div
              key={index}
              className={` border border-borderColor rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-hoverText dar mb-2">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-text">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.iconColor} ml-4`}>
                  <IconComponent size={32} strokeWidth={2} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Search and Filter Section */}
      <div className="mt-8 rounded-xl border border-borderColor p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-placeholderText" size={20} />
            <input
              type="text"
              placeholder="Search Patients"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent focus:border-transparent text-text placeholder-placeholderText"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Add New Record Button */}
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-text rounded-lg hover:bg-altPrimary transition-colors duration-200 font-medium">
              <Plus size={18} />
              Add New Record
            </button>

            {/* Filter Button */}
            <button className="p-3 border border-borderColor rounded-lg hover:bg-primary hover:text-text transition-colors duration-200">
              <Filter size={18} />
            </button>

            {/* Download Button */}
            <button className="p-3 border border-borderColor rounded-lg hover:bg-primary hover:text-text transition-colors duration-200">
              <Download size={18} />
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-3 border border-borderColor rounded-lg hover:bg-primary hover:text-text transition-colors duration-200 font-medium"
              >
                {sortBy}
                <ChevronDown size={18} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-body border border-borderColor rounded-lg shadow-lg z-10">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 transition-colors duration-200 ${
                        sortBy === option ? 'bg-primary text-text font-medium' : 'text-text'
                      } ${option === sortOptions[0] ? 'rounded-t-lg' : ''} ${
                        option === sortOptions[sortOptions.length - 1] ? 'rounded-b-lg' : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Medical Records Section Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text">
            Medical Records
          </h2>
          <button className="text-primary hover:text-altPrimary font-medium transition-colors duration-200">
            View All
          </button>
        </div>

        {/* UniTable Component */}
        <div className="mt-6">
          <UniTable 
            data={paginatedRecords}
            headers={medicalRecordHeaders}
            columnMappings={medicalRecordColumnMappings}
            title=""
          />
        </div>

        {/* UniPagination Component */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <UniPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              showControls={true}
              isCompact={false}
              size="md"
              color="primary"
            />
          </div>
        )}
      </div>

      {/* Recent Activities and Quick Actions Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 rounded-xl border border-borderColor p-6">
          <h2 className="text-xl font-semibold text-text mb-6">
            Recent Activities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Activity 1 */}
            <div className="border border-borderColor rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="text-blue-600" size={20} />
                </div>
                <h3 className="font-semibold text-text">New Patient Registration</h3>
              </div>
              <p className="text-placeholderText text-sm mb-2">
                Emma Thompson
              </p>
              <p className="text-placeholderText text-sm mb-2">
                completed registration
              </p>
              <span className="text-placeholderText text-xs">10 minutes ago</span>
            </div>

            {/* Activity 2 */}
            <div className="border border-borderColor rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="text-green-600" size={20} />
                </div>
                <h3 className="font-semibold text-text">Appointment Scheduled</h3>
              </div>
              <p className="text-placeholderText text-sm mb-2">
                Michael Chen - Nov
              </p>
              <p className="text-placeholderText text-sm mb-2">
                25, 2023
              </p>
              <span className="text-placeholderText text-xs">1 hour ago</span>
            </div>

            {/* Activity 3 */}
            <div className="border border-borderColor rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MessageSquare className="text-orange-600" size={20} />
                </div>
                <h3 className="font-semibold text-text">Medical Record Updated</h3>
              </div>
              <p className="text-placeholderText text-sm mb-2">
                Dr. Watson updated
              </p>
              <p className="text-placeholderText text-sm mb-2">
                Sarah's record
              </p>
              <span className="text-placeholderText text-xs">2 hour ago</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-borderColor p-6">
          <h2 className="text-xl font-semibold text-text mb-6">
            Quick Actions
          </h2>
          
          <div className="space-y-4">
            {/* Create New Record Button */}
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-text rounded-lg hover:bg-altPrimary transition-colors duration-200 font-medium">
              <Plus size={18} />
              Create New Record
            </button>
            
            {/* Schedule Follow Up Button */}
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-borderColor text-text rounded-lg hover:bg-primary hover:text-text transition-colors duration-200 font-medium">
              <CalendarCheck size={18} />
              Schedule_Follow Up
            </button>
            
            {/* Generate Record Button */}
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-borderColor text-text rounded-lg hover:bg-primary hover:text-text transition-colors duration-200 font-medium">
              <FileText size={18} />
              Generate Record
            </button>
            
            {/* Export Report Button */}
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-borderColor text-text rounded-lg hover:bg-primary hover:text-text transition-colors duration-200 font-medium">
              <FileDown size={18} />
              Export Report
            </button>
            
            {/* Print Report Button */}
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-borderColor text-text rounded-lg hover:bg-primary hover:text-text transition-colors duration-200 font-medium">
              <Printer size={18} />
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMedicalRecords
