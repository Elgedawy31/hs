import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

function CustomChart({ data = defaultData }) {
  const { theme } = useTheme();
  const colorRef = useRef({
    primary: theme.primary,
    altPrimary: theme.altPrimary,
    borderColor: theme.borderColor,
    text: theme.text
  });

  // Update color ref when theme changes
  useEffect(() => {
    colorRef.current = {
      primary: theme.primary,
      altPrimary: theme.altPrimary,
      borderColor: theme.borderColor,
      text: theme.text
    };
  }, [theme]);

  // Find the maximum value for scaling
  const maxValue = Math.max(...data.map(item => item.value));
  
  // Custom heights to match the image exactly
  const customHeights = {
    Jan: 15,
    Feb: 25,
    Mar: 40,
    Apr: 20,
    May: 30,
    Jun: 35,
    Jul: 25,
    Aug: 45,
    Sep: 20,
    Oct: 35,
    Nov: 40,
    Dec: 50
  };
  
  return (
    <div className="px-4 py-6">
      <div className="border border-borderColor rounded-3xl shadow-lg overflow-hidden p-6">
        <h2 className="text-2xl font-bold mb-6 text-text">Appointments</h2>
        
        {/* Chart Container */}
        <div className="w-full h-[400px] relative mb-6">
          {/* Background Grid - Vertical lines */}
          <div className="absolute inset-0">
            {data.map((_, index) => (
              <div 
                key={`grid-v-${index}`}
                className="absolute h-full border-l border-dashed border-borderColor"
                style={{ left: `${(index / 12) * 100}%`, width: '1px' }}
              />
            ))}
            {/* Add one more line at the end */}
            <div 
              className="absolute h-full border-l border-dashed border-borderColor"
              style={{ right: '0', width: '1px' }}
            />
          </div>
          
          {/* Background Grid - Horizontal lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, index) => (
              <div 
                key={`grid-h-${index}`}
                className="w-full border-t border-dashed border-borderColor"
              />
            ))}
          </div>
          
          {/* Chart Content */}
          <div className="absolute inset-0 flex items-end justify-between pb-16">
            {data.map((item, index) => {
              // Use the custom heights to match the image exactly
              const heightPercent = (customHeights[item.month] / maxValue) * 75;
              
              return (
                <div 
                  key={`bar-container-${index}`}
                  className="flex flex-col items-center justify-end h-full group"
                  style={{ width: `${100/12}%` }}
                >
                  {/* Tooltip */}
                  <div 
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-8 text-white px-3 py-1 rounded-md text-sm z-10 whitespace-nowrap"
                    style={{ backgroundColor: colorRef.current.primary }}
                  >
                    {item.value} appointments
                  </div>
                  
                  {/* Bar */}
                  <div 
                    className="w-[30px] rounded-full transition-all duration-300 cursor-pointer hover:opacity-90"
                    style={{ 
                      height: `${heightPercent}%`,
                      minHeight: '40px', // Ensure all bars have at least some height
                      backgroundColor: colorRef.current.primary
                    }}
                  />
                </div>
              );
            })}
          </div>
          
          {/* Month Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between">
            {data.map((item, index) => (
              <div 
                key={`month-${index}`}
                className="text-center font-medium"
                style={{ 
                  width: `${100/12}%`,
                  color: colorRef.current.text
                }}
              >
                {item.month}
              </div>
            ))}
          </div>
          
          {/* Bottom border line */}
          <div 
            className="absolute bottom-0 left-0 right-0 w-full"
            style={{ borderTop: `1px solid ${colorRef.current.borderColor}` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Default data if none is provided
const defaultData = [
  { month: 'Jan', value: 15 },
  { month: 'Feb', value: 25 },
  { month: 'Mar', value: 40 },
  { month: 'Apr', value: 20 },
  { month: 'May', value: 30 },
  { month: 'Jun', value: 35 },
  { month: 'Jul', value: 25 },
  { month: 'Aug', value: 45 },
  { month: 'Sep', value: 20 },
  { month: 'Oct', value: 35 },
  { month: 'Nov', value: 40 },
  { month: 'Dec', value: 50 }
];

export default CustomChart;
