import React from 'react'
import CardContainer from '../../CardContainer'
import Info from '../detailsTab/Info'
import MonthlyDashboard from '../detailsTab/MonthlyDashboard'
import PersonalInformation from '../detailsTab/PersonalInformation'
import Allowances from '../detailsTab/Allowances'
import Memoes from '../detailsTab/Memoes'

function DetailsTab() {
  return (
    <CardContainer className='p-4 space-y-6'>
        <Info />
        <MonthlyDashboard />
        <PersonalInformation />
        <Allowances />
        <Memoes />
    </CardContainer>
  )
}

export default DetailsTab
