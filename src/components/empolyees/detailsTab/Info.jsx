import React from 'react'
import UniHeading from '../../UniHeading'
import { UserRound } from 'lucide-react'
import CardContainer from '../../CardContainer'
import { Avatar } from "@heroui/react"
import UniBtn from '../../UniBtn'

function Info() {
  return (
    <div className='space-y-4'>
      <UniHeading
        icon={UserRound}
        text="Nouran Khaled"
      />

      <CardContainer>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar
              className="w-24 h-24 rounded-full object-cover" 
            />
            <div className="flex flex-col">
              <h2 className="text-base font-[600] text-text ">Nouran Khaled</h2>
              <span className="text-hover text-sm mt-0.5 font-[600]">Admin</span>
              <span className="text-text text-sm mt-0.5 font-[600]">Nouran.khaled@gmail.com</span>
            </div>
          </div>
          <UniBtn text='Active' className='bg-success text-white' />
        </div>
      </CardContainer>
    </div>
  )
}

export default Info
