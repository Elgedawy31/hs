import React, { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';
import CardContainer from './CardContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { getActivityMetricsForMonths } from '../store/reducers/activity';
import dayjs from 'dayjs';
import { secondsToHours } from '../utils/general';

const CompletedHours = () => {
  const dispatch = useDispatch();
  const { metricsForMonths, metricsLoadingForMonths } = useSelector(state => state.activity);
  const { user, token } = useAuth();
  const [monthsData, setMonthsData] = useState([]);
  const max = 160; // Maximum hours expected per month

  useEffect(() => {
    // Get the current month and the two previous months
    const currentMonth = dayjs();
    const lastMonth = dayjs().subtract(1, 'month');
    const twoMonthsAgo = dayjs().subtract(2, 'month');
    
    // Format dates for the API call
    const from = twoMonthsAgo.startOf('month').format('M-D-YYYY');
    const to = currentMonth.endOf('month').format('M-D-YYYY');
    
    // Dispatch the action to get metrics for the last 3 months
    dispatch(getActivityMetricsForMonths({ 
      token, 
      from, 
      to, 
      userId: user.id 
    }))
    .then(result => {
      console.log('Activity metrics for months:', result.payload);
    });
  }, [dispatch, token, user.id]);

  useEffect(() => {
    if (metricsForMonths && Array.isArray(metricsForMonths) && metricsForMonths.length > 0) {
      // Process the data for display
      const currentMonth = dayjs();
      const lastMonth = dayjs().subtract(1, 'month');
      const twoMonthsAgo = dayjs().subtract(2, 'month');
      
      const monthNames = [
        twoMonthsAgo.format('MMMM'),
        lastMonth.format('MMMM'),
        currentMonth.format('MMMM')
      ];
      
      // Calculate max hours based on working days in month (excluding weekends)
      const maxHoursPerDay = 8; // 8 hours per working day
      
      // Function to count weekdays (Monday-Friday) in a month
      const countWeekdaysInMonth = (date) => {
        const daysInMonth = date.daysInMonth();
        let weekdayCount = 0;
        
        for (let day = 1; day <= daysInMonth; day++) {
          const currentDate = date.date(day);
          const dayOfWeek = currentDate.day(); // 0 is Sunday, 6 is Saturday
          
          // Count only weekdays (Monday-Friday: 1-5)
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            weekdayCount++;
          }
        }
        
        return weekdayCount;
      };
      
      const weekdaysInCurrentMonth = countWeekdaysInMonth(currentMonth);
      const weekdaysInLastMonth = countWeekdaysInMonth(lastMonth);
      const weekdaysInTwoMonthsAgo = countWeekdaysInMonth(twoMonthsAgo);
      
      // Group details by month
      const monthlyData = {};
      
      // Process all metrics data from the array
      if (metricsForMonths && Array.isArray(metricsForMonths)) {
        metricsForMonths.forEach(metricsData => {
          if (metricsData && metricsData.details && Array.isArray(metricsData.details)) {
            metricsData.details.forEach(detail => {
              if (detail.date) {
                const date = dayjs(detail.date);
                const monthKey = date.format('YYYY-MM');
                
                if (!monthlyData[monthKey]) {
                  monthlyData[monthKey] = {
                    totalTimeLogged: 0,
                    totalTimeActive: 0,
                    month: date.month() + 1, // 1-12
                    year: date.year()
                  };
                }
                
                monthlyData[monthKey].totalTimeLogged += detail.totalTimeLogged || 0;
                monthlyData[monthKey].totalTimeActive += detail.totalTimeActive || 0;
              }
            });
          }
        });
      }
      
      // Create data for the three months
      const processedData = monthNames.map((monthName, index) => {
        const monthDate = index === 0 ? twoMonthsAgo : 
                         index === 1 ? lastMonth : currentMonth;
        
        const monthKey = monthDate.format('YYYY-MM');
        const monthData = monthlyData[monthKey] || { totalTimeLogged: 0 };
        
        // Count weekdays for this month
        const weekdaysInMonth = countWeekdaysInMonth(monthDate);
        const maxHoursInMonth = weekdaysInMonth * maxHoursPerDay;
        const totalHours = secondsToHours(monthData.totalTimeLogged);
        const percentage = Math.min((totalHours / maxHoursInMonth) * 100, 100);
        
        return {
          month: monthName,
          hours: totalHours,
          percentage: percentage
        };
      });
      
      setMonthsData(processedData);
      
      // Log the processed data for debugging
      console.log('Processed months data:', processedData);
      console.log('Monthly grouped data:', monthlyData);
    }
  }, [metricsForMonths]);

  return (
    <CardContainer className='p-2 h-full'>
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary p-3 rounded-2xl">
          <Timer className="text-white w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold text-text">Completed Hours</h2>
      </div>

      {/* Progress bars */}
      <div className="space-y-6">
        {metricsLoadingForMonths ? (
          <div className="text-center py-6">Loading...</div>
        ) : (
          monthsData.map((data, index) => (
            <div key={index} className="relative border border-borderColor h-14 bg-background rounded-3xl overflow-hidden">
              <div 
                className={`h-full ${index === 2 ? 'bg-primary' : 'bg-borderColor'} rounded-3xl`} 
                style={{ width: `${data.percentage}%` }}
              >
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-text text-xl">
                  {data.month} ({data.hours}h)
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </CardContainer>
  );
};

export default CompletedHours;
