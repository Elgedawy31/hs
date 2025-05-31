import React from 'react'
import { Users, Star, TrendingUp, Clock, UserCheck, BarChart3, Smile } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts'
import UniTable from '../../components/doctorDashboard/UniTable'
import { useTheme } from '../../contexts/ThemeContext'

function DashboardAnalatycs() {
  const {theme} = useTheme()

  const analyticsStats = [
    {
      title: 'Total Patients',
      value: '2840',
      icon: Users,
      iconColor: 'text-blue-300'
    },
    {
      title: 'Patient Satisfaction',
      value: '4.8',
      icon: Star,
      iconColor: 'text-yellow-300'
    },
    {
      title: 'Revenue This Month',
      value: '200,000 LE',
      icon: TrendingUp,
      iconColor: 'text-red-300'
    }
  ]

  // Key Metrics data
  const keyMetrics = [
    {
      title: 'Avg. Appointment Duration',
      value: '45 mins',
      icon: Clock,
      iconColor: 'text-blue-500'
    },
    {
      title: 'Patient Retention Rate',
      value: '80%',
      icon: UserCheck,
      iconColor: 'text-blue-500'
    },
    {
      title: 'New Patient Conversion',
      value: '62%',
      icon: BarChart3,
      iconColor: 'text-blue-500'
    },
    {
      title: 'Treatment Success Rate',
      value: '96%',
      icon: Smile,
      iconColor: 'text-blue-500'
    }
  ]

  // Data for Patient Visit Trends (Line Chart)
  const visitTrendsData = [
    { month: 'Jan', visits1: 20, visits2: 15 },
    { month: 'Feb', visits1: 18, visits2: 12 },
    { month: 'Mar', visits1: 25, visits2: 18 },
    { month: 'Apr', visits1: 30, visits2: 22 },
    { month: 'May', visits1: 45, visits2: 35 },
    { month: 'Jun', visits1: 35, visits2: 40 }
  ]

  // Data for Treatment Distribution (Pie Chart)
  const treatmentData = [
    { name: 'Acne', value: 40, color: '#3B82F6' },
    { name: 'Acne', value: 25, color: '#8B5A2B' },
    { name: 'Acne', value: 20, color: theme.primary },
    { name: 'Other', value: 15, color: '#EF4444' }
  ]

  // Data for Revenue Analytics (Bar Chart)
  const revenueData = [
    { month: 'Jan', revenue: 50000 },
    { month: 'Feb', revenue: 75000 },
    { month: 'Mar', revenue: 90000 },
    { month: 'Apr', revenue: 120000 },
    { month: 'May', revenue: 160000 },
    { month: 'Jun', revenue: 200000 }
  ]

  // Data for Recent Activity Table
  const recentActivityData = [
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      date: '32 / Female',
      diagnosis: 'Active',
      status: 'Pending',
      revenue: 'Atopic Dermatitis'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      date: '32 / Female',
      diagnosis: 'Active',
      status: 'Pending',
      revenue: 'Atopic Dermatitis'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      date: '32 / Female',
      diagnosis: 'Active',
      status: 'Pending',
      revenue: 'Atopic Dermatitis'
    },
    {
      patientName: 'Jane Smith',
      patientImage: '/src/assets/Images/Amira.jpg',
      date: '32 / Female',
      diagnosis: 'Active',
      status: 'Pending',
      revenue: 'Atopic Dermatitis'
    }
  ]

  // Table headers for recent activity
  const recentActivityHeaders = [
    'Patient Name',
    'Date',
    'Diagnosis',
    'Status',
    'Revenue'
  ]

  // Column mappings for the recent activity table
  const recentActivityColumnMappings = [
    { type: 'patientName', field: 'patientName', imageField: 'patientImage' },
    { type: 'text', field: 'date' },
    { type: 'text', field: 'diagnosis' },
    { type: 'text', field: 'status' },
    { type: 'text', field: 'revenue' }
  ]

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-text mb-2">
          Medical Performance Analytics
        </h1>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {analyticsStats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div
              key={index}
              className="border border-borderColor rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-hoverText mb-2">
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



      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Patient Visit Trends Chart */}
        <div className="border border-borderColor rounded-xl p-6">
          <h2 className="text-xl font-semibold text-text mb-6">
            Patient Visit Trends
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="visits1" 
                  stroke={theme.primary }
                  strokeWidth={3}
                  dot={{ fill: theme.primary, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: theme.primary }}
                />
                <Line 
                  type="monotone" 
                  dataKey="visits2" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Treatment Distribution Chart */}
        <div className="border border-borderColor rounded-xl p-6">
          <h2 className="text-xl font-semibold text-text mb-6">
            Treatment Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={treatmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {treatmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => (
                    <span style={{ color: entry.color, fontSize: '14px', fontWeight: '500' }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue Analytics Chart - Full Width */}
      <div className="border border-borderColor rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-text mb-6">
          Revenue Analytics
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}K`}
              />
              <Bar 
                dataKey="revenue" 
                fill={theme.primary}
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table - Full Width */}
      <div className="border border-borderColor rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-text mb-6">
          Recent Activity
        </h2>
        <UniTable 
          data={recentActivityData}
          headers={recentActivityHeaders}
          columnMappings={recentActivityColumnMappings}
          title=""
        />
      </div>
            {/* Key Metrics Section */}
      <div className="border border-borderColor rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-text mb-6">
          Key Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {keyMetrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <div key={index} className="flex items-start gap-4">
                <div className={`${metric.iconColor} p-2 rounded-lg`}>
                  <IconComponent size={24} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-placeholderText mb-1">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-text">
                    {metric.value}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DashboardAnalatycs
