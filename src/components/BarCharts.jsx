import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Line, ComposedChart, ResponsiveContainer, Label, Tooltip } from 'recharts';
import CardContainer from './CardContainer';
import { useTheme } from '../contexts/ThemeContext';

const WorkHoursTracker = () => {

  const {currentTheme} = useTheme()
  const isDark = currentTheme === 'dark'
  
  // Sample data for work hours
  const data = [
    { day: 'Sun', hours: 6, label: '6 h' },
    { day: 'Mon', hours: 8, label: '8 h' },
    { day: 'Tue', hours: 3, label: '3 h' },
    { day: 'Wed', hours: 8, label: '8 h' },
    { day: 'Thu', hours: 10, label: '10 h' },
    { day: 'Fri', hours: 0, label: '0 h' },
    { day: 'Sat', hours: 3, label: '3 h' },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CardContainer className="bg-[#FFF5E9] p-3 rounded-lg shadow-lg border-none">
          <p className="text-[#FF6B00] font-bold">{payload[0].payload.day}</p>
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
                        fill="#FF6B00"
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
