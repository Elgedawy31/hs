import React from 'react'
import CardContainer from '../../CardContainer'
import Info from '../detailsTab/Info'
import MonthlyDashboard from '../detailsTab/MonthlyDashboard'
import PersonalInformation from '../detailsTab/PersonalInformation'
import Allowances from '../detailsTab/Allowances'

function DetailsTab() {
  return (
    <CardContainer className='p-4 space-y-6'>
        <Info />
        <MonthlyDashboard />
        <PersonalInformation />
        <Allowances />
    </CardContainer>
  )
}

export default DetailsTab
