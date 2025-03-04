import React from 'react'
import CardContainer from '../../CardContainer'
import EmployeeWorkInfo from '../EmployeeWorkInfo'
import Info from '../detailsTab/Info'
import MonthlyDashboard from '../detailsTab/MonthlyDashboard'
import PersonalInformation from '../detailsTab/PersonalInformation'
import Bonus from '../detailsTab/Bonus'
import Allowances from '../detailsTab/Allowances'
import Memoes from '../detailsTab/Memoes'
import { useSelector } from 'react-redux'

function DetailsTab() {

  const { selectedUser } = useSelector((state) => state.users)
  
  const employeeWorkData = {
    weeklyWorkingDays: "5",
    dailyWorkingHours: "8",
    dailyBreakMinutes: "60",
    salary: "10000",
    paymentPeriod: "Month"
  };

  return (
    <CardContainer className='p-4 space-y-6'>
        <Info user={selectedUser?.userId || {}} isActive={selectedUser?.isActive}/>
        <MonthlyDashboard />
        <PersonalInformation />
        <EmployeeWorkInfo 
          data={employeeWorkData}
          disabled={true}
          showtSelectedUser={false}
        />
        <Bonus />
        <Allowances />
        <Memoes />
    </CardContainer>
  )
}

export default DetailsTab
