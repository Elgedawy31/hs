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
  const { metricsForCards, metricsLoadingForCards } = useSelector(state => state.activity)
  const { user , token} = useAuth()
  
  useEffect(() => {
    // Get the date from one month ago
    const fromDate = dayjs().subtract(1, 'month')
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
  }, [dispatch, token, user.id])
  // Function to calculate total metrics from all months
  const calculateTotalMetrics = () => {
    if (!metricsForCards || !Array.isArray(metricsForCards) || metricsForCards.length === 0) {
      return {
        totalTimeLogged: 0,
        totalTimeActive: 0,
        overtime: 0
      };
    }

    // Aggregate data from all months
    return metricsForCards.reduce((totals, monthData) => {
      return {
        totalTimeLogged: totals.totalTimeLogged + (monthData?.totalTimeLogged || 0),
        totalTimeActive: totals.totalTimeActive + (monthData?.totalTimeActive || 0),
        overtime: totals.overtime + (monthData?.overtime || 0)
      };
    }, {
      totalTimeLogged: 0,
      totalTimeActive: 0,
      overtime: 0
    });
  };

  // Get the aggregated metrics
  const totalMetrics = calculateTotalMetrics();

  return (
    <div className="grid grid-cols-3 gap-8">
      <HomeCard 
        Icon={StepForward} 
        title='Tracked Time' 
        description={metricsLoadingForCards ? '0 h' : `${secondsToHours(totalMetrics.totalTimeLogged)} h`} 
      />
      <HomeCard 
        Icon={CircleCheckBig} 
        title='Productivity' 
        description={metricsLoadingForCards ? '0 h' : `${secondsToHours(totalMetrics.totalTimeActive)} h`} 
      />
      <HomeCard 
        Icon={ClockAlert} 
        title='Overtime' 
        description={metricsLoadingForCards ? '0 h' : `${secondsToHours(totalMetrics.overtime)} h`} 
      />
    </div>
  )
}

export default HomeCards
