import React, { useEffect, useState } from 'react'
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
  const [NewSeelctedUser, setNewSeelctedUser] = useState({});
  

      useEffect(() => {
          if(selectedUser){
             setNewSeelctedUser({
              ...selectedUser,
              weeklyWorkingDays: selectedUser.weeklyWorkingDays?.toString() || "",
              dailyWorkingHours: selectedUser.dailyWorkingHours?.toString() || "",
              annualLeavs: selectedUser.annualLeavs?.toString() || "",
              weekEnd: selectedUser.weekEnd || [],
              salary: selectedUser.salary?.toString() || "",
              paymentInterval: selectedUser.paymentInterval || "monthly",
              paymentPeriod: selectedUser.paymentPeriod?.toString() || "",
             })
          }
      } , [selectedUser])

  return (
    <CardContainer className='p-4 space-y-6'>
        <Info user={selectedUser?.userId || {}} isActive={selectedUser?.isActive}/>
        <MonthlyDashboard userId={selectedUser?.userId?._id} />
        <PersonalInformation user={selectedUser?.userId ||{}} />
        <EmployeeWorkInfo 
          data={NewSeelctedUser}
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
