
import React, { useEffect } from 'react'
import UniHeading from '../../UniHeading'
import { ChartColumn, Play, LayoutGrid, Clock } from 'lucide-react'
import MonthlyCard from './MonthlyCard'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '@contexts/AuthContext'
import { getActivityMetricsForMonths } from '../../../store/reducers/activity'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'

// Helper function to convert seconds to hours and minutes
const secondsToHoursAndMinutes = (seconds) => {
  if (!seconds) return { hours: 0, minutes: 0 };
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
};

function MonthlyDashboard({showHeader=true, currentMonth}) {
  const dispatch = useDispatch()
  const { metricsForMonths, metricsLoadingForMonths } = useSelector(state => state.activity)
  const {id} = useParams()
  const {  token } = useAuth()
  
  useEffect(() => {
    // Use currentMonth if provided, otherwise use current date
    const monthToUse = currentMonth || dayjs();
    
    // Get the first day of the selected month
    const fromDate = monthToUse.startOf('month')
    // Get the last day of the selected month
    const toDate = monthToUse.endOf('month')
    
    // Format dates as M-D-YYYY
    const from = fromDate.format('M-D-YYYY')
    const to = toDate.format('M-D-YYYY')
    
    // Dispatch the action to get metrics
    dispatch(getActivityMetricsForMonths({ 
      token, 
      from, 
      to, 
      userId: id  
    }))
  }, [dispatch, token, id, currentMonth])

  // Function to get metrics from the data
  const calculateTotalMetrics = () => {
    if (!metricsForMonths || !Array.isArray(metricsForMonths) || metricsForMonths.length === 0) {
      return {
        totalTimeLogged: 0,
        totalTimeActive: 0,
        overtime: 0
      };
    }

    // If currentMonth is provided, filter metrics for that month
    let filteredMetrics = metricsForMonths;
    if (currentMonth) {
      const month = currentMonth.month() + 1; // dayjs months are 0-indexed
      const year = currentMonth.year();
      
      filteredMetrics = metricsForMonths.filter(metric => 
        metric.month === month && metric.year === year
      );
      
      // If no metrics found for the selected month, return zeros
      if (filteredMetrics.length === 0) {
        return {
          totalTimeLogged: 0,
          totalTimeActive: 0,
          overtime: 0
        };
      }
    }

    // Aggregate data from the filtered months
    return filteredMetrics.reduce((acc, month) => {
      return {
        totalTimeLogged: acc.totalTimeLogged + (month.totalTimeLogged || 0),
        totalTimeActive: acc.totalTimeActive + (month.totalTimeActive || 0),
        overtime: acc.overtime + (month.overtime || 0)
      };
    }, {
      totalTimeLogged: 0,
      totalTimeActive: 0,
      overtime: 0
    });
  };

  // Get the aggregated metrics
  const totalMetrics = calculateTotalMetrics();
  
  // Convert seconds to hours and minutes for each metric
  const trackedTime = secondsToHoursAndMinutes(totalMetrics.totalTimeLogged);
  const productivity = secondsToHoursAndMinutes(totalMetrics.totalTimeActive);
  const overtime = secondsToHoursAndMinutes(totalMetrics.overtime);

  return (
    <div className='space-y-6'>
     {showHeader && <UniHeading text="Monthly Dashboard" icon={ChartColumn} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MonthlyCard 
          hours={metricsLoadingForMonths ? 0 : trackedTime.hours}
          minutes={metricsLoadingForMonths ? 0 : trackedTime.minutes}
          label="Tracked time"
          icon={Play}
        />
        <MonthlyCard 
          hours={metricsLoadingForMonths ? 0 : productivity.hours}
          minutes={metricsLoadingForMonths ? 0 : productivity.minutes}
          label="Productivity"
          icon={LayoutGrid}
        />
        <MonthlyCard 
          hours={metricsLoadingForMonths ? 0 : overtime.hours}
          minutes={metricsLoadingForMonths ? 0 : overtime.minutes}
          label="Overtime"
          icon={Clock}
          prefix="+"
        />
      </div>
    </div>
  )
}

export default MonthlyDashboard
