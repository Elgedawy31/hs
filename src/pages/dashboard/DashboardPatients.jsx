import React, { useState, useMemo } from 'react'
import { Users, UserPlus, Clock, Calendar, Search, Filter, ChevronDown, Download, Plus, User, MessageSquare } from 'lucide-react'
import UniTable from '../../components/doctorDashboard/UniTable'
import UniPagination from '../../components/UniPagination'

function DashboardPatients() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Most Recent')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10) // Number of items to show per page

  const sortOptions = ['Most Recent', 'Oldest First', 'By Name', 'By ID']

  const patientStats = [
    {
      title: 'Total Patients',
      value: '1250',
      icon: Users,
      iconColor: 'text-blue-300',
      borderColor: 'border-blue-700'
    },
    {
      title: 'New Patients',
      value: '90',
      icon: UserPlus,
      iconColor: 'text-green-300',
      borderColor: 'border-green-700'
    },
    {
      title: 'Pending Review',
      value: '12',
      icon: Clock,
      iconColor: 'text-red-300',
      borderColor: 'border-red-700'
    },
    {
      title: 'Appointment Today',
      value: '32',
      icon: Calendar,
      iconColor: 'text-orange-300',
      borderColor: 'border-orange-700'
    }
  ]

  // Patient data formatted for UniTable
  const patientData = [
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      id: 'P-1001',
      ageGender: '32 / Female',
      contact: '+1 (555) 123-4567',
      lastVisit: '2025-01-15',
      nextAppointment: '2025-02-10',
      status: 'Active'
    },
    {
      patientName: 'David Miller',
      patientImage: '/src/assets/Images/kareem.jpg',
      id: 'P-1002',
      ageGender: '28 / Male',
      contact: '+1 (555) 234-5678',
      lastVisit: '2025-01-12',
      nextAppointment: '2025-02-08',
      status: 'Active'
    },
    {
      patientName: 'Michael Brown',
      patientImage: '/src/assets/Images/Omar.jpg',
      id: 'P-1003',
      ageGender: '45 / Male',
      contact: '+1 (555) 345-6789',
      lastVisit: '2025-01-10',
      nextAppointment: '2025-02-15',
      status: 'Active'
    },
    {
      patientName: 'Sarah Johnson',
      patientImage: '/src/assets/Images/sofia.jpg',
      id: 'P-1004',
      ageGender: '29 / Female',
      contact: '+1 (555) 456-7890',
      lastVisit: '2025-01-08',
      nextAppointment: '2025-02-12',
      status: 'Inactive'
    },
    {
      patientName: 'Ahmed Hassan',
      patientImage: '/src/assets/Images/Ahmed.jpg',
      id: 'P-1005',
      ageGender: '35 / Male',
      contact: '+1 (555) 567-8901',
      lastVisit: '2025-01-14',
      nextAppointment: '2025-02-18',
      status: 'Active'
    },
    {
      patientName: 'Emily Davis',
      patientImage: '/src/assets/Images/Amira.jpg',
      id: 'P-1006',
      ageGender: '26 / Female',
      contact: '+1 (555) 678-9012',
      lastVisit: '2025-01-11',
      nextAppointment: '2025-02-14',
      status: 'Active'
    },
    {
      patientName: 'Robert Wilson',
      patientImage: '/src/assets/Images/kareem.jpg',
      id: 'P-1007',
      ageGender: '52 / Male',
      contact: '+1 (555) 789-0123',
      lastVisit: '2025-01-09',
      nextAppointment: '2025-02-16',
      status: 'Active'
    },
    {
      patientName: 'Lisa Anderson',
      patientImage: '/src/assets/Images/sofia.jpg',
      id: 'P-1008',
      ageGender: '38 / Female',
      contact: '+1 (555) 890-1234',
      lastVisit: '2025-01-13',
      nextAppointment: '2025-02-11',
      status: 'Pending'
    },
    {
      patientName: 'Omar Khalil',
      patientImage: '/src/assets/Images/Omar.jpg',
      id: 'P-1009',
      ageGender: '41 / Male',
      contact: '+1 (555) 901-2345',
      lastVisit: '2025-01-07',
      nextAppointment: '2025-02-13',
      status: 'Active'
    },
    {
      patientName: 'Maria Garcia',
      patientImage: '/src/assets/Images/Amira.jpg',
      id: 'P-1010',
      ageGender: '33 / Female',
      contact: '+1 (555) 012-3456',
      lastVisit: '2025-01-16',
      nextAppointment: '2025-02-09',
      status: 'Active'
    },
    {
      patientName: 'John Thompson',
      patientImage: '/src/assets/Images/kareem.jpg',
      id: 'P-1011',
      ageGender: '47 / Male',
      contact: '+1 (555) 123-4567',
      lastVisit: '2025-01-05',
      nextAppointment: '2025-02-17',
      status: 'Inactive'
    },
    {
      patientName: 'Fatima Al-Zahra',
      patientImage: '/src/assets/Images/sofia.jpg',
      id: 'P-1012',
      ageGender: '24 / Female',
      contact: '+1 (555) 234-5678',
      lastVisit: '2025-01-17',
      nextAppointment: '2025-02-07',
      status: 'Active'
    }
  ]

  // Table headers for patients
  const patientHeaders = [
    'Patient Name',
    'ID',
    'Age / Gender',
    'Contact',
    'Last Visit',
    'Next Appointment',
    'Status',
    'Actions'
  ]

  // Column mappings for the patient table
  const patientColumnMappings = [
    { type: 'patientName', field: 'patientName', imageField: 'patientImage' },
    { type: 'text', field: 'id' },
    { type: 'text', field: 'ageGender' },
    { type: 'text', field: 'contact' },
    { type: 'text', field: 'lastVisit' },
    { type: 'text', field: 'nextAppointment' },
    { type: 'status', field: 'status' },
    { type: 'actions', actionType: 'menu' }
  ]

  // Filter and sort patients based on search term and sort option
  const filteredAndSortedPatients = useMemo(() => {
    let filtered = patientData.filter(patient =>
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.status.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Sort based on selected option
    switch (sortBy) {
      case 'By Name':
        filtered.sort((a, b) => a.patientName.localeCompare(b.patientName))
        break
      case 'By ID':
        filtered.sort((a, b) => a.id.localeCompare(b.id))
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
  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPatients = filteredAndSortedPatients.slice(startIndex, endIndex)

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
          Patients Dashboard
        </h1>
        <p className="text-placeholderText text-lg">
          Manage and track patient information
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {patientStats.map((stat, index) => {
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
            {/* Add New Patient Button */}
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-text rounded-lg hover:bg-altPrimary transition-colors duration-200 font-medium">
              <Plus size={18} />
              Add New Patient
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

        {/* Patients Section Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text">
            Patients
          </h2>
          <button className="text-primary hover:text-altPrimary font-medium transition-colors duration-200">
            View All
          </button>
        </div>

        {/* UniTable Component */}
        <div className="mt-6">
          <UniTable 
            data={paginatedPatients}
            headers={patientHeaders}
            columnMappings={patientColumnMappings}
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
          
          <div className="space-y-6">
            {/* Activity 1 */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="text-blue-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text mb-1">New Patient Registration</h3>
                <p className="text-placeholderText text-sm mb-1">
                  Emma Thompson completed registration
                </p>
                <span className="text-placeholderText text-xs">10 minutes ago</span>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="text-green-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text mb-1">Appointment Scheduled</h3>
                <p className="text-placeholderText text-sm mb-1">
                  Michael Chen - Nov 25, 2023
                </p>
                <span className="text-placeholderText text-xs">1 hour ago</span>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageSquare className="text-orange-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text mb-1">Medical Record Updated</h3>
                <p className="text-placeholderText text-sm mb-1">
                  Dr. Watson updated Sarah's record
                </p>
                <span className="text-placeholderText text-xs">2 hour ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-borderColor p-6">
          <h2 className="text-xl font-semibold text-text mb-6">
            Quick Actions
          </h2>
          
          <div className="space-y-4">
            {/* Patient Name Input */}
            <input
              type="text"
              placeholder="Patient Name"
              className="w-full px-4 py-3 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent focus:border-transparent text-text placeholder-placeholderText"
            />
            
            {/* Contact Number Input */}
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full px-4 py-3 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent focus:border-transparent text-text placeholder-placeholderText"
            />
            
            {/* Add Patient Button */}
            <button className="w-full px-6 py-3 bg-primary text-text rounded-lg hover:bg-altPrimary transition-colors duration-200 font-medium">
              Add Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPatients
