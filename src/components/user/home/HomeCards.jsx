import React from 'react'
import HomeCard from '../bonus/HomeCard'
import { CircleCheckBig, ClockAlert, StepForward } from 'lucide-react'

function HomeCards() {
  return (
    <div className="grid grid-cols-3 gap-8">
           <HomeCard Icon={StepForward} title='Tracked Time' description='167 h 19 m' />
           <HomeCard Icon={CircleCheckBig} title='Producitity' description='167 h 19 m' />
           <HomeCard Icon={ClockAlert} title='Overtime' description='16 h' />
         </div>
  )
}

export default HomeCards
