import React from 'react'
import CardContainer from '../../CardContainer'
import EmployeeWorkInfo from '../EmployeeWorkInfo'
import Info from '../detailsTab/Info'
import MonthlyDashboard from '../detailsTab/MonthlyDashboard'
import PersonalInformation from '../detailsTab/PersonalInformation'
import Bonus from '../detailsTab/Bonus'
import Allowances from '../detailsTab/Allowances'
import Memoes from '../detailsTab/Memoes'

function DetailsTab() {
  // Sample employee work data
  const employeeWorkData = {
    weeklyWorkingDays: "5",
    dailyWorkingHours: "8",
    dailyBreakMinutes: "60",
    salary: "10000",
    paymentPeriod: "Month"
  };

  return (
    <CardContainer className='p-4 space-y-6'>
        <Info />
        <MonthlyDashboard />
        <PersonalInformation />
        <EmployeeWorkInfo 
          data={employeeWorkData}
          disabled={true}
        />
        <Bonus />
        <Allowances />
        <Memoes />
    </CardContainer>
  )
}

export default DetailsTab
