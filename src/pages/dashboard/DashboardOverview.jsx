import React from 'react'
import {ChevronDown, MoreHorizontal } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts'
import Header from '../../components/Header'
import UniTable from '../../components/doctorDashboard/UniTable'
import CenteredCards from '../../components/dashboard/CenteredCards'
import { useTheme } from '../../contexts/ThemeContext'

const dataOne = [
  {text:"Today's Appointments", count:"15"},
  {text:"Total Patients", count:"250"},
  {text:"Pending Reports", count:"7"},
  {text:"Revenue This Month", count:"200,000 LE"},
]

const todaySchedule = [
  {time:"11:00 AM =>", name:"Dr. Elena Vargs", fol:"Follow_Up"},
  {time:"12:00 AM =>", name:"Dr. Lukas Weber", fol:"Consultation"},
  {time:"11:00 AM =>", name:"Dr. Anna Schneider", fol:"Treatment"}
]

// Data for Weekly Patient Visits Chart
const weeklyVisitsData = [
  { month: 'JANUARY', analysis1: 500, analysis2: 3000, analysis3: 3000 },
  { month: 'FEBRUARY', analysis1: 1000, analysis2: 2500, analysis3: 2800 },
  { month: 'MARCH', analysis1: 4000, analysis2: 2800, analysis3: 2200 },
  { month: 'APRIL', analysis1: 3000, analysis2: 2200, analysis3: 2500 },
  { month: 'MAY', analysis1: 4500, analysis2: 3500, analysis3: 4200 },
  { month: 'JUNE', analysis1: 2500, analysis2: 4500, analysis3: 4800 },
  { month: 'JULY', analysis1: 5000, analysis2: 4000, analysis3: 4200 }
]

// Data for the Recent Patients table using UniTable format
const recentPatientsData = [
  {
    patientName: "Jane Smith",
    patientImage: "src/assets/Images/Amira.jpg",
    id: "001",
    age: "32",
    gender: "Female",
    diagnosis: "Acne Vulgaris",
    type: "Completed",
    time: "Jan 15, 2024"
  },
  {
    patientName: "Jane Smith",
    patientImage: "src/assets/Images/Amira.jpg",
    id: "002",
    age: "32",
    gender: "Female",
    diagnosis: "Acne Vulgaris",
    type: "In Progress",
    time: "Jan 15, 2024"
  },
  {
    patientName: "Jane Smith",
    patientImage: "src/assets/Images/Amira.jpg",
    id: "003",
    age: "32",
    gender: "Female",
    diagnosis: "Acne Vulgaris",
    type: "Scheduled",
    time: "Jan 15, 2024"
  },
  {
    patientName: "Jane Smith",
    patientImage: "src/assets/Images/Amira.jpg",
    id: "004",
    age: "32",
    gender: "Female",
    diagnosis: "Acne Vulgaris",
    type: "In Progress",
    time: "Jan 15, 2024"
  },
  {
    patientName: "Jane Smith",
    patientImage: "src/assets/Images/Amira.jpg",
    id: "005",
    age: "32",
    gender: "Female",
    diagnosis: "Acne Vulgaris",
    type: "Completed",
    time: "Jan 15, 2024"
  }
]

export default function DashboardOverview() {
  const { theme } = useTheme()

  return (
    <div className='p-6 bg-background min-h-screen'>
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-text mb-2">
          Dashboard Overview
        </h1>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dataOne.map((item) => {
          return(
            <div key={item.count} className="border border-borderColor rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-hoverText mb-2">
                    {item.text}
                  </p>
                  <p className="text-3xl font-bold text-text">
                    {item.count}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Today's Schedule */}
        <div className="border border-borderColor rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className='text-xl font-semibold text-text'>Today's Schedule</h3>
            <p className='text-primary hover:text-altPrimary cursor-pointer font-medium transition-colors duration-200'>View All</p>
          </div>
          <div className="space-y-4">
            {todaySchedule.map((el) => {
              return(
                <div key={el.time} className="flex justify-between items-center p-4 rounded-lg border border-borderColor hover:bg-primary transition-colors duration-200">
                  <div className="flex gap-3 items-center">
                    <p className='font-medium text-sm text-text'>{el.time}</p>
                    <div className="">
                      <p className='text-sm font-medium text-text leading-none mb-1'>{el.name}</p>
                      <p className='text-hoverText text-sm'>{el.fol}</p>
                    </div>
                  </div>
                  <ChevronDown className="text-placeholderText" size={20} />
                </div>
              ) 
            })}
          </div>
        </div>

        {/* Weekly Patient Visits Chart */}
        <div className="border border-borderColor rounded-xl p-6">
          <h3 className='text-xl font-semibold text-text mb-6'>Weekly Patient Visits</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyVisitsData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}K`}
                  domain={[0, 5000]}
                  ticks={[0, 1000, 3000, 5000]}
                />
                <Line 
                  type="monotone" 
                  dataKey="analysis1" 
                  stroke="#FFFFFF"
                  strokeWidth={3}
                  dot={{ fill: '#FFFFFF', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#FFFFFF' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="analysis2" 
                  stroke="#FFFFFF"
                  strokeWidth={3}
                  dot={{ fill: '#FFFFFF', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#FFFFFF' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="analysis3" 
                  stroke="#14B8A6"
                  strokeWidth={3}
                  dot={{ fill: '#14B8A6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#14B8A6' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  wrapperStyle={{ paddingTop: '20px' }}
                  payload={[
                    { value: 'ANALYSIS 1', type: 'line', color: '#FFFFFF' },
                    { value: 'ANALYSIS 2', type: 'line', color: '#FFFFFF' },
                    { value: 'ANALYSIS 3', type: 'line', color: '#14B8A6' }
                  ]}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Patients Section */}
      <div className="border border-borderColor rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className='text-xl font-semibold text-text'>Recent Patients</h3>
          <p className='text-primary hover:text-altPrimary cursor-pointer font-medium transition-colors duration-200'>View All</p>
        </div>
        <UniTable 
          data={recentPatientsData} 
          headers={['Patient Name', 'Date', 'Diagnosis', 'Status', 'Actions']}
          columnMappings={[
            { type: 'patientName', field: 'patientName', imageField: 'patientImage' },
            { type: 'text', field: 'time' },
            { type: 'text', field: 'diagnosis' },
            { type: 'status', field: 'type' },
            { type: 'actions', actionType: 'menu' }
          ]}
          title=""
        />
      </div>

      {/* Centered Cards Component */}
      <CenteredCards />
    </div>
  )
}
