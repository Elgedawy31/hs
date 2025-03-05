import React from 'react'
import UniHeading from '../../UniHeading'
import { UserRound } from 'lucide-react'
import CardContainer from '../../CardContainer'
import { Avatar } from "@heroui/react"
import UniBtn from '../../UniBtn'

function Info({user , isActive}) {
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
              <h2 className="text-base font-[600] text-text ">{user?.name?.first} {user?.name?.last}</h2>
              <span className="text-hover text-sm mt-0.5 font-[600] capitalize ">{user?.role}</span>
              <span className="text-text text-sm mt-0.5 font-[600] capitalize">{user?.email}</span>
            </div>
          </div>
          <UniBtn text={isActive ? 'Active' : 'In Active'} className={`${isActive ? 'bg-success' :'bg-red-500'} text-white`} />
        </div>
      </CardContainer>
    </div>
  )
}

export default Info
