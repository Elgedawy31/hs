import React, { useEffect } from 'react'
import HomeCard from '../bonus/HomeCard'
import { CircleCheckBig, ClockAlert, StepForward } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '@contexts/AuthContext'
import { getActivityMetricsForCards } from '../../../store/reducers/activity'
import dayjs from 'dayjs'
import { secondsToHours } from '../../../utils/general'

// Function to convert seconds to hours:minutes format (HH:MM)
const secondsToHoursMinutes = (seconds) => {
  if (!seconds) return "0h";
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
};

function HomeCards() {
  const dispatch = useDispatch()
  const { metricsForCards, metricsLoadingForCards } = useSelector(state => state.activity)
  const { user , token} = useAuth()
  
  useEffect(() => {
    // Get the date from the last day of previous month
    const fromDate = dayjs().startOf('month').subtract(1, 'day')
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
    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      <HomeCard 
        Icon={StepForward} 
        title='Tracked Time' 
        description={metricsLoadingForCards ? '0h' : secondsToHoursMinutes(totalMetrics.totalTimeLogged)} 
      />
      <HomeCard 
        Icon={CircleCheckBig} 
        title='Productivity' 
        description={metricsLoadingForCards ? '0h' : secondsToHoursMinutes(totalMetrics.totalTimeActive)} 
      />
      <HomeCard 
        Icon={ClockAlert} 
        title='Overtime' 
        description={metricsLoadingForCards ? '0h' : secondsToHoursMinutes(totalMetrics.overtime)} 
      />
    </div>
  )
}

export default HomeCards
