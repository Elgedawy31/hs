import { Plus, LogOut, Play, MonitorSmartphone, Moon, Coffee, Clock, LogIn } from 'lucide-react';

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '@contexts/AuthContext'
import { getActivityMetricsForCards } from '../../../../store/reducers/activity'
import { secondsToHours } from '../../../../utils/general'
import dayjs from 'dayjs'
import CardContainer from '../../../CardContainer';
import Loading from '../../../Loading';

const DetailCard = ({ title, value, icon }) => {
  return (
    <CardContainer className="relative rounded-[30px] transition-colors py-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold">{value}</span>
          <div className="text-primary bg-[#F8EEE6] rounded-full p-2">
            {icon}
          </div>
        </div>
        <span className="text-placeholderText text-sm">{title}</span>
      </div>
    </CardContainer>
  );
};

function TrackingDetailsTab({activeDay}) {
  const dispatch = useDispatch()
  const { metricsForCards, metricsLoadingForCards } = useSelector(state => state.activity)
  const { user, token } = useAuth()
  
  useEffect(() => {
    // Parse the activeDay using dayjs
    const activeDayDate = dayjs(activeDay, 'MM-DD-YYYY')
    
    // Check if it's the first day of the month
    const isFirstDayOfMonth = activeDayDate.date() === 1
    
    let targetDate
    if (isFirstDayOfMonth) {
      // If it's the first day of the month, use the last day of the previous month
      targetDate = activeDayDate.subtract(1, 'day')
    } else {
      // Otherwise, use the previous day
      targetDate = activeDayDate.subtract(1, 'day')
    }
    
    // Format the target date as M-D-YYYY for the API
    const formattedDate = targetDate.format('M-D-YYYY')
    
    // Use the same date for both from and to
    const from = formattedDate
    const to = formattedDate
    
    console.log(`Using date: ${formattedDate} for activeDay: ${activeDay}`)
    
    // Dispatch the action to get metrics for the specific day
    dispatch(getActivityMetricsForCards({ 
      token, 
      from, 
      to, 
      userId: user.id 
    }))
    .then(result => {
      console.log('Activity metrics data for day:', result.payload)
    })
  }, [dispatch, token, user.id, activeDay])

  // Function to get metrics from the new object structure
  const getMetrics = () => {
    if (!metricsForCards || typeof metricsForCards !== 'object') {
      return {
        totalTimeLogged: 0,
        totalTimeActive: 0,
        totalInactiveTime: 0,
        totalBreakTime: 0,
        overtime: 0
      };
    }

    // Return the metrics directly from the object
    return {
      totalTimeLogged: metricsForCards?.totalTimeLogged || 0,
      totalTimeActive: metricsForCards?.totalTimeActive || 0,
      totalInactiveTime: metricsForCards?.totalInactiveTime || 0,
      totalBreakTime: metricsForCards?.totalBreakTime || 0,
      overtime: metricsForCards?.overtime || 0
    };
  };

  // Get the metrics
  const metrics = getMetrics();
  
  // Function to convert seconds to hours:minutes format (HH:MM)
  const secondsToHoursMinutes = (seconds) => {
    if (!seconds) return "0h";
    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
  };
  console.log('metrics for us', metricsForCards)
  return (
    <>
    {
      metricsLoadingForCards ? <Loading className='min-h-[50vh]' /> :
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {/* Tracked time */}
      <DetailCard
        title="Tracked time"
        value={metricsLoadingForCards ? "0h" : `${secondsToHoursMinutes(metrics.totalTimeLogged)}`}
        icon={<Play className="w-5 h-5" />}
      />

      {/* Productivity */}
      <DetailCard
        title="Productivity"
        value={metricsLoadingForCards ? "0h" : `${secondsToHoursMinutes(metrics.totalTimeActive)}`}
        icon={<MonitorSmartphone className="w-5 h-5" />}
      />

      {/* Unproductivity */}
      <DetailCard
        title="Unproductivity"
        value={metricsLoadingForCards ? "0h" : `${secondsToHoursMinutes(metrics.totalInactiveTime)}`}
        icon={<Moon className="w-5 h-5" />}
      />

      {/* Break Time */}
      <DetailCard
        title="Break Time"
        value={metricsLoadingForCards ? "0h" : `${secondsToHoursMinutes(metrics.totalBreakTime)}`}
        icon={<Coffee className="w-5 h-5" />}
      />

      {/* Overtime */}
      <DetailCard
        title="Overtime"
        value={metricsLoadingForCards ? "00:00" : `+${secondsToHoursMinutes(metrics.overtime)}`}
        icon={<Clock className="w-5 h-5" />}
      />

    </div>
    }</>
  )
}

export default TrackingDetailsTab
