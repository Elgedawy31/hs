import React, { useEffect } from 'react'
import HomeCard from '../bonus/HomeCard'
import { CircleCheckBig, ClockAlert, StepForward } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '@contexts/AuthContext'
import { getActivityMetricsForCards } from '../../../store/reducers/activity'
import dayjs from 'dayjs'
import { secondsToHours } from '../../../utils/general'

function HomeCards() {
  const dispatch = useDispatch()
  const { metricsForCards, metricsLoading } = useSelector(state => state.activity)
  const { user , token} = useAuth()
  
  useEffect(() => {
    // Get the first day of the current month
    const fromDate = dayjs().startOf('month')
    // Get the current day
    const toDate = dayjs()
    
    // Format dates as M-D-YYYY
    const from = fromDate.format('M-D-YYYY')
    const to = toDate.format('M-D-YYYY')
    
    // Dispatch the action to get metrics
    dispatch(getActivityMetricsForCards({ 
      token, 
      from, 
      to, 
      userId: user.id 
    }))
    .then(result => {
      console.log('Activity metrics data:', result.payload)
    })
  }, [dispatch])
  return (
    <div className="grid grid-cols-3 gap-8">
      <HomeCard 
        Icon={StepForward} 
        title='Tracked Time' 
        description={metricsLoading ? '0 h' : `${secondsToHours(metricsForCards[0]?.totalTimeLogged)} h`} 
      />
      <HomeCard 
        Icon={CircleCheckBig} 
        title='Productivity' 
        description={metricsLoading ? '0 h' : `${secondsToHours(metricsForCards[0]?.totalTimeActive)} h`} 
      />
      <HomeCard 
        Icon={ClockAlert} 
        title='Overtime' 
        description={metricsLoading ? '0 h' : `${secondsToHours(metricsForCards[0]?.overtime)} h`} 
      />
    </div>
  )
}

export default HomeCards
