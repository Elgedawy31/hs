import React from 'react'
import CardContainer from '../../CardContainer'
import Reminder from '../leavesTab/Reminder'
import Requesting from '../leavesTab/Requesting'

function Leaves() {
  return (
    <CardContainer className='p-4 space-y-6'>
    
    <Reminder />
    <Requesting />
    </CardContainer>
  )
}

export default Leaves
