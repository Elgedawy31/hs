import React, { useState, useMemo } from 'react'
import { Calendar, Clock, CheckCircle, XCircle, Search, Filter, ChevronDown } from 'lucide-react'
import UniTable from '../../components/doctorDashboard/UniTable'
import UniPagination from '../../components/UniPagination'

function DashportAppointments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Most Recent')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) // Number of items to show per page

  const sortOptions = ['Most Recent', 'Oldest First', 'By Name', 'By Date']

  const appointmentStats = [
    {
      title: 'Total Appointment',
      value: '30',
      icon: Calendar,
      iconColor: 'text-blue-300',
      borderColor: 'border-blue-700'
    },
    {
      title: 'Pending Confirmation',
      value: '8',
      icon: Clock,
      iconColor: 'text-orange-300',
      borderColor: 'border-orange-700'
    },
    {
      title: 'Completed Today',
      value: '12',
      icon: CheckCircle,
      iconColor: 'text-green-300',
      borderColor: 'border-green-700'
    },
    {
      title: 'Cancelled',
      value: '3',
      icon: XCircle,
      iconColor: 'text-red-300',
      borderColor: 'border-red-700'
    }
  ]

  // Appointment data formatted for UniTable
  const appointmentData = [
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      date: 'Jan 15, 2024',
      diagnosis: 'Acne Vulgaris',
      status: 'Completed'
    },
    {
      patientName: 'David Miller',
      patientImage: '/src/assets/Images/kareem.jpg',
      date: 'Jan 15, 2024',
      diagnosis: 'Acne Vulgaris',
      status: 'In Progress'
    },
    {
      patientName: 'Michael Brown',
      patientImage: '/src/assets/Images/Omar.jpg',
      date: 'Jan 15, 2024',
      diagnosis: 'Skin Check',
      status: 'Scheduled'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      date: 'Jan 15, 2024',
      diagnosis: 'Acne Vulgaris',
      status: 'Canceled'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      date: 'Jan 15, 2024',
      diagnosis: 'Acne Vulgaris',
      status: 'Completed'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      date: 'Jan 15, 2024',
      diagnosis: 'Acne Vulgaris',
      status: 'In Progress'
    },
    {
      patientName: 'David Miller',
      patientImage: '/src/assets/Images/kareem.jpg',
      date: 'Jan 15, 2024',
      diagnosis: 'Acne Vulgaris',
      status: 'Canceled'
    },
    {
      patientName: 'Michael Brown',
      patientImage: '/src/assets/Images/Omar.jpg',
      date: 'Jan 15, 2024',
      diagnosis: 'Skin Check',
      status: 'Completed'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      date: 'Jan 15, 2024',
      diagnosis: 'Acne Vulgaris',
      status: 'Scheduled'
    }
  ]

  // Table headers for appointments
  const appointmentHeaders = [
    'Patient Name',
    'Date',
    'Diagnosis',
    'Status',
    'Actions'
  ]

  // Column mappings for the appointment table
  const appointmentColumnMappings = [
    { type: 'patientName', field: 'patientName', imageField: 'patientImage' },
    { type: 'text', field: 'date' },
    { type: 'text', field: 'diagnosis' },
    { type: 'status', field: 'status' },
    { type: 'actions', actionType: 'menu' }
  ]

  // Filter and sort appointments based on search term and sort option
  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = appointmentData.filter(appointment =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Sort based on selected option
    switch (sortBy) {
      case 'By Name':
        filtered.sort((a, b) => a.patientName.localeCompare(b.patientName))
        break
      case 'By Date':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case 'Oldest First':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case 'Most Recent':
      default:
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
    }

    return filtered
  }, [searchTerm, sortBy])

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedAppointments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedAppointments = filteredAndSortedAppointments.slice(startIndex, endIndex)

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
          Appointments Dashboard
        </h1>
        <p className="text-placeholderText text-lg">
          Manage and track patient appointments
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {appointmentStats.map((stat, index) => {
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
              placeholder="Search Appointment"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent focus:border-transparent text-text placeholder-placeholderText"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-text rounded-lg hover:bg-altPrimary transition-colors duration-200 font-medium"
            >
              <Filter size={18} />
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

        {/* Appointments Section Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text">
            Appointments
          </h2>
          <button className="text-primary hover:text-altPrimary font-medium transition-colors duration-200">
            View All
          </button>
        </div>

        {/* UniTable Component */}
        <div className="mt-6">
          <UniTable 
            data={paginatedAppointments}
            headers={appointmentHeaders}
            columnMappings={appointmentColumnMappings}
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

      {/* Today's Schedule Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-text mb-6">
          Today's Schedule
        </h2>
        
        <div className=" rounded-xl border border-borderColor p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Schedule Items */}
            <div className="flex flex-col sm:flex-row gap-6 flex-1">
              {/* Appointment 1 */}
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-text mb-1">Jane Smith</h3>
                <p className="text-placeholderText text-sm mb-2">Acne Vulgaris</p>
                <span className="text-placeholderText text-sm">10:30 AM</span>
              </div>
              
              {/* Appointment 2 */}
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-text mb-1">David Miller</h3>
                <p className="text-placeholderText text-sm mb-2">Skin Consultation</p>
                <span className="text-placeholderText text-sm">10:30 AM</span>
              </div>
              
              {/* Appointment 3 */}
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-text mb-1">Michael Brown</h3>
                <p className="text-placeholderText text-sm mb-2">Skin Check</p>
                <span className="text-placeholderText text-sm">10:30 AM</span>
              </div>
              
              {/* Appointment 4 */}
              <div className="flex flex-col items-start">
                <h3 className="font-semibold text-text mb-1">David Miller</h3>
                <p className="text-placeholderText text-sm mb-2">Skin Consultation</p>
                <span className="text-placeholderText text-sm">10:30 AM</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button className="px-6 py-3 bg-primary text-text rounded-lg hover:bg-altPrimary transition-colors duration-200 font-medium whitespace-nowrap">
                New Appointment
              </button>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-text transition-colors duration-200 font-medium whitespace-nowrap">
                View Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashportAppointments
