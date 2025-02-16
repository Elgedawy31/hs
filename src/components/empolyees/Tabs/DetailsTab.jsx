import React from 'react'
import CardContainer from '../../CardContainer'
import Info from '../detailsTab/Info'
import MonthlyDashboard from '../detailsTab/MonthlyDashboard'

function DetailsTab() {
  return (
    <CardContainer className='p-4 space-y-6'>
        <Info />
        <MonthlyDashboard />
    </CardContainer>
  )
}

export default DetailsTab
