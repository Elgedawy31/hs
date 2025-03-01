import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import HomeCard from '../../components/user/bonus/HomeCard'
import CardContainer from '../../components/CardContainer'
import { CircleCheckBig, ClockAlert, StepForward } from 'lucide-react'
import WorkHoursTracker from '../../components/BarCharts'
import CompletedHours from '../../components/CompeletedHours'
import extractName from '../../utils/extractName'
import NotificationBtn from '../../components/user/home/NotificationBtn'
import HomeCards from '../../components/user/home/HomeCards'

function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/dashboard')
    }
  }, [user])
  return (
    <CardContainer className='p-6 space-y-10'>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <img src="https://i.pravatar.cc/150?u=a04258114e29026708c"
            alt="" className='w-[42px] h-[42px] rounded-full ' /> */}
          <h1 className="text-xl font-medium">Welcome <span className="text-xl  capitalize font-meduim text-placeholderText">{extractName(user?.email)} !</span> </h1>

        </div>
        <NotificationBtn />
      </div>
     <HomeCards />

      <div className="grid grid-cols-3 gap-4">
        <div className=' col-span-2'>
          <WorkHoursTracker />
        </div>
        <div className=' col-span-1'>

          <CompletedHours />
        </div>
      </div>

    </CardContainer>
  )
}

export default HomePage
