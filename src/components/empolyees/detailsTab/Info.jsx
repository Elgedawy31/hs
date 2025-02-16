import React from 'react'
import UniHeading from '../../UniHeading'
import { UserRound } from 'lucide-react'
import CardContainer from '../../CardContainer'
import { Avatar } from "@nextui-org/react"
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
                <div className="flex items-center gap-4">
                  <Avatar
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    className="w-24 h-24"
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
