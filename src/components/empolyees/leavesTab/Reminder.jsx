import React from 'react'
import CardContainer from '../../CardContainer'
import { Info } from 'lucide-react'
import UniBtn from '../../UniBtn'

function Reminder() {
  return (
    <CardContainer className='flex p-2 items-center justify-between'>
      <div className='flex items-center gap-2'>
        <Info className='text-primary' size={24} />
        <span>Nader Ahmed was absent on 12 Apr 2025 without any intimation</span>
      </div>
      <UniBtn text="Send a Reminder" className='text-white' />
    </CardContainer>
  )
}

export default Reminder
