import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Line, ComposedChart, ResponsiveContainer, Label, Tooltip } from 'recharts';
import CardContainer from './CardContainer';
import { useTheme } from '../contexts/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { getActivityMetrics } from '../store/reducers/activity';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
import { secondsToHours } from '../utils/general';

const WorkHoursTracker = () => {
  const dispatch = useDispatch();
  const { metrics, metricsLoading } = useSelector(state => state.activity);
  const { user, token } = useAuth();
  const [chartData, setChartData] = useState([]);

  // Add direct console log to see metrics data structure
  console.log('Raw metrics data:', metrics);
  
  // Debug function to help analyze the structure
  const debugMetricsStructure = (data) => {
    if (!data) return;
    
    console.log("DEBUG - Metrics Structure:");
    console.log("Type:", typeof data);
    console.log("Is Array:", Array.isArray(data));
    
    if (Array.isArray(data)) {
      console.log("Array length:", data.length);
      if (data.length > 0) {
        console.log("First item:", data[0]);
        console.log("First item keys:", Object.keys(data[0]));
      }
    } else if (typeof data === 'object') {
      console.log("Object keys:", Object.keys(data));
      
      // Check for details property
      if (data.details) {
        console.log("Details type:", typeof data.details);
        console.log("Details is Array:", Array.isArray(data.details));
        
        if (Array.isArray(data.details)) {
          console.log("Details length:", data.details.length);
          if (data.details.length > 0) {
            console.log("First detail item:", data.details[0]);
            console.log("First detail keys:", Object.keys(data.details[0]));
          }
        }
      }
    }
  };

  // Function to get month name from month number
  const getMonthName = (monthNum) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNum - 1] || 'Unknown';
  };

  useEffect(() => {
    // Get date from 7 days ago
    const fromDate = dayjs().subtract(7, 'day');
    // Get today's date
    const toDate = dayjs();
    
    // Format dates as M-D-YYYY
    const from = fromDate.format('M-D-YYYY');
    const to = toDate.format('M-D-YYYY');
    
    // Dispatch the action to get metrics
    dispatch(getActivityMetrics({ 
      token, 
      from, 
      to, 
      userId: user.id 
    }))
    .then(result => {
      console.log('Activity metrics data for chart:', result.payload);
    });
  }, [dispatch, token, user.id]);

  useEffect(() => {
    if (!metricsLoading && metrics) {
      console.log("Processing metrics data:", metrics);
      
      // Check if metrics is an array
      if (Array.isArray(metrics) && metrics.length > 0) {
        console.log("Processing metrics array with length:", metrics.length);
        
        // Create an array for all days of the week
        const allDaysOfWeek = [
          { day: 'Sun', fullName: 'Sunday', dayIndex: 0 },
          { day: 'Mon', fullName: 'Monday', dayIndex: 1 },
          { day: 'Tue', fullName: 'Tuesday', dayIndex: 2 },
          { day: 'Wed', fullName: 'Wednesday', dayIndex: 3 },
          { day: 'Thu', fullName: 'Thursday', dayIndex: 4 },
          { day: 'Fri', fullName: 'Friday', dayIndex: 5 },
          { day: 'Sat', fullName: 'Saturday', dayIndex: 6 }
        ];
        
        // Get today's day of week
        const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
        console.log(`Today is ${allDaysOfWeek[today].fullName}`);
        
        // Reorder days so that today is the last day
        // For example, if today is Wednesday (3), the order will be:
        // Thursday (4), Friday (5), Saturday (6), Sunday (0), Monday (1), Tuesday (2), Wednesday (3)
        const daysOfWeek = [];
        
        // Add days after today
        for (let i = today + 1; i < 7; i++) {
          daysOfWeek.push(allDaysOfWeek[i]);
        }
        
        // Add days before and including today
        for (let i = 0; i <= today; i++) {
          daysOfWeek.push(allDaysOfWeek[i]);
        }
        
        console.log("Reordered days of week:", daysOfWeek.map(d => d.day).join(', '));
        
        // Initialize data with 0 hours for all days
        const initialData = daysOfWeek.map(day => ({
          day: day.day,
          fullName: day.fullName,
          dayIndex: day.dayIndex,
          hours: 0,
          count: 0, // Count of days processed for this day of week
          label: '0 h',
          isToday: day.dayIndex === today
        }));
        
        // Process all months in the metrics array
        metrics.forEach(monthData => {
          // Debug the structure of each month's data
          debugMetricsStructure(monthData);
          
          // Process the details array from each month
          if (monthData.details && Array.isArray(monthData.details) && monthData.details.length > 0) {
            console.log(`Processing details array for month ${monthData.month}/${monthData.year} with length:`, monthData.details.length);
            
            // Loop through each detail (daily data)
            monthData.details.forEach((detail, index) => {
              console.log(`Processing detail ${index}:`, detail);
              
              if (detail && detail.date) {
                try {
                  // Parse the date to get the day of week
                  const date = new Date(detail.date);
                  const dayOfWeekIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
                  
                  // Find the corresponding day in our reordered array
                  const dayDataIndex = initialData.findIndex(d => d.dayIndex === dayOfWeekIndex);
                  
                  if (dayDataIndex !== -1) {
                    console.log(`Date: ${detail.date}, Day of week: ${dayOfWeekIndex} (${initialData[dayDataIndex].fullName})`);
                    
                    // Get the hours (convert from seconds)
                    const hours = detail.totalTimeLogged ? secondsToHours(detail.totalTimeLogged) : 0;
                    
                    // Add to our running total for this day of week
                    initialData[dayDataIndex].hours += hours;
                    initialData[dayDataIndex].count += 1;
                    
                    console.log(`Added ${hours}h to ${initialData[dayDataIndex].fullName}, new total: ${initialData[dayDataIndex].hours}h over ${initialData[dayDataIndex].count} days`);
                  } else {
                    console.warn(`Could not find day of week ${dayOfWeekIndex} in reordered array`);
                  }
                } catch (error) {
                  console.error(`Error processing detail ${index}:`, error);
                }
              } else {
                console.warn(`Detail ${index} has no date:`, detail);
              }
            });
          } else {
            console.warn(`No details array found in month ${monthData.month}/${monthData.year} or it's empty`);
          }
        });
        
        // Calculate averages and format labels
        initialData.forEach(dayData => {
          if (dayData.count > 0) {
            // Calculate average hours for this day of week
            dayData.hours = Math.round((dayData.hours / dayData.count) * 10) / 10;
            dayData.label = `${dayData.hours} h`;
          }
        });
        
        // Log the final data we're using for the chart
        console.log("Final chart data:", initialData);
        
        // Update state with our processed data
        setChartData(initialData);
      } else {
        console.log("Metrics is not an array or is empty:", metrics);
      }
    } else {
      console.log("Metrics not loaded yet or no metrics data:", { metricsLoading, metrics });
    }
  }, [metrics, metricsLoading]);

  // Use chartData if available, otherwise use empty data
  const data = chartData.length > 0 ? chartData : [
    { day: 'Sun', hours: 0, label: '0 h' },
    { day: 'Mon', hours: 0, label: '0 h' },
    { day: 'Tue', hours: 0, label: '0 h' },
    { day: 'Wed', hours: 0, label: '0 h' },
    { day: 'Thu', hours: 0, label: '0 h' },
    { day: 'Fri', hours: 0, label: '0 h' },
    { day: 'Sat', hours: 0, label: '0 h' },
  ];
  console.log(metrics);
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <CardContainer className="bg-[#FFF5E9] p-3 rounded-lg shadow-lg border-none">
          <p className="text-primary font-bold">{data.fullName}</p>
          <p className="text-text font-medium">
            Avg Working Hours: {payload[0].value}h
          </p>
          {data.count > 0 && (
            <p className="text-text font-medium">
              Based on {data.count} {data.count === 1 ? 'day' : 'days'}
            </p>
          )}
        </CardContainer>
      );
    }
    return null;
  };

  return (
    <CardContainer className="flex flex-col rounded-3xl h-full p-6 bg-[#1E1E1E]">
      <div className="flex justify-between mb-4">
        <div className="grid grid-cols-7 w-full">
          {data.map((item) => (
            <div key={item.day} className="text-center">
              <span className="text-base font-medium text-text">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={false} />
            <YAxis hide={true} />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'transparent' }}
            />
            
            {/* Bar chart */}
            <Bar 
              dataKey="hours" 
              fill="#FFF5E9"
              radius={[10, 10, 10, 10]} 
              barSize={40} 
              isAnimationActive={true}
            />
            
            {/* Line chart overlay */}
            <Line 
              type="monotone" 
              dataKey="hours" 
              stroke="#CCFF00" 
              strokeWidth={4} 
              dot={false} 
              activeDot={false}
              isAnimationActive={true}
            />
            
            {/* Labels for each bar */}
            {data.map((entry, index) => (
              <Label
                key={`label-${index}`}
                content={({ x, y, width, height, value }) => {
                  const xPos = x + width / 2;
                  const yPos = y - 35;
                  return (
                    <g>
                      <rect 
                        x={xPos - 22}
                        y={yPos - 20}
                        width={44}
                        height={35}
                        rx={8}
                        ry={8}
                        fill="#FFF5E9"
                      />
                      <text
                        x={xPos}
                        y={yPos + 2}
                        textAnchor="middle"
                        fill="#E76507"
                        fontSize={16}
                        fontWeight="bold"
                      >
                        {entry.label}
                      </text>
                    </g>
                  );
                }}
                position="top"
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </CardContainer>
  );
};

export default WorkHoursTracker;
