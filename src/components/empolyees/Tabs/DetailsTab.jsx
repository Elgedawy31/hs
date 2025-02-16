import React from 'react'
import CardContainer from '../../CardContainer'
import Info from '../detailsTab/Info'
import MonthlyDashboard from '../detailsTab/MonthlyDashboard'
import PersonalInformation from '../detailsTab/PersonalInformation'

function DetailsTab() {
  return (
    <CardContainer className='p-4 space-y-6'>
        <Info />
        <MonthlyDashboard />
        <PersonalInformation />
    </CardContainer>
  )
}

export default DetailsTab
