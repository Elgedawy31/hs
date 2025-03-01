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
      
      // Based on user feedback, metrics is an array with a single object
      // We need to access it using metrics[0]
      if (Array.isArray(metrics) && metrics.length > 0) {
        console.log("Accessing metrics[0]:", metrics[0]);
        console.log("Details array:", metrics[0].details);
        
        // Debug the structure of metrics[0]
        debugMetricsStructure(metrics[0]);
        
        // Create an array for all days of the week
        const daysOfWeek = [
          { day: 'Sun', fullName: 'Sunday', dayIndex: 0 },
          { day: 'Mon', fullName: 'Monday', dayIndex: 1 },
          { day: 'Tue', fullName: 'Tuesday', dayIndex: 2 },
          { day: 'Wed', fullName: 'Wednesday', dayIndex: 3 },
          { day: 'Thu', fullName: 'Thursday', dayIndex: 4 },
          { day: 'Fri', fullName: 'Friday', dayIndex: 5 },
          { day: 'Sat', fullName: 'Saturday', dayIndex: 6 }
        ];
        
        // Initialize data with 0 hours for all days
        const initialData = daysOfWeek.map(day => ({
          day: day.day,
          hours: 0,
          label: '0 h'
        }));
        
        // Process the details array from metrics[0]
        if (metrics[0].details && Array.isArray(metrics[0].details) && metrics[0].details.length > 0) {
          console.log("Processing details array with length:", metrics[0].details.length);
          
          // Loop through each detail
          metrics[0].details.forEach((detail, index) => {
            console.log(`Processing detail ${index}:`, detail);
            
            if (detail && detail.date) {
              try {
                // Simple date parsing - just get the day of week
                const date = new Date(detail.date);
                const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
                
                console.log(`Date: ${detail.date}, Day of week: ${dayOfWeek} (${daysOfWeek[dayOfWeek].fullName})`);
                
                // Get the hours (convert from seconds)
                const hours = detail.totalTimeLogged ? secondsToHours(detail.totalTimeLogged) : 0;
                const roundedHours = Math.round(hours * 10) / 10; // Round to 1 decimal place
                
                console.log(`Hours for ${daysOfWeek[dayOfWeek].fullName}: ${roundedHours} (from ${detail.totalTimeLogged} seconds)`);
                
                // Update our data array
                initialData[dayOfWeek].hours = roundedHours;
                initialData[dayOfWeek].label = `${roundedHours} h`;
                
                console.log(`Updated data for ${daysOfWeek[dayOfWeek].fullName}:`, initialData[dayOfWeek]);
              } catch (error) {
                console.error(`Error processing detail ${index}:`, error);
              }
            } else {
              console.warn(`Detail ${index} has no date:`, detail);
            }
          });
        } else {
          console.warn("No details array found in metrics[0] or it's empty");
        }
        
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

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CardContainer className="bg-[#FFF5E9] p-3 rounded-lg shadow-lg border-none">
          <p className="text-primary font-bold">{payload[0].payload.day}</p>
          <p className="text-text font-medium">
            Working Hours: {payload[0].value}h
          </p>
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
              fill="#FAF3E7" 
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
