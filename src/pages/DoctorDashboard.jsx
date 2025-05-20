import React from 'react'
import DoctorHero from '../components/doctorDashboard/DoctorHero'
import CustomChart from '../components/doctorDashboard/CustomChart'

function DoctorDashboard() {
  // Sample appointment data
  const appointmentData = [
    { month: 'Jan', value: 15 },
    { month: 'Feb', value: 25 },
    { month: 'Mar', value: 40 },
    { month: 'Apr', value: 20 },
    { month: 'May', value: 30 },
    { month: 'Jun', value: 35 },
    { month: 'Jul', value: 25 },
    { month: 'Aug', value: 45 },
    { month: 'Sep', value: 20 },
    { month: 'Oct', value: 35 },
    { month: 'Nov', value: 40 },
    { month: 'Dec', value: 50 }
  ];

  return (
    <div className='space-y-8 container mx-auto mt-10'>
      <DoctorHero />
      <CustomChart data={appointmentData} />
    </div>
  )
}

export default DoctorDashboard
