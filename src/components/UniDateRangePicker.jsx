import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useTheme } from '../contexts/ThemeContext';
import { parseDate } from '@internationalized/date';

const UniDateRangePicker = ({
  label,
  defaultValue,
  value,
  onChange,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  errorMessage,
  className = "",
  labelPlacement = "outside",
  hideTimeZone = true,
  granularity = "day",
  minValue,
  maxValue,
}) => {
  const { currentTheme } = useTheme();
  const isDarkMode = currentTheme === 'dark';
  
  // State for the date range
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Set up initial values
  useEffect(() => {
    if (value) {
      const start = new Date(value.start.toString());
      const end = new Date(value.end.toString());
      setDateRange([start, end]);
    } else if (defaultValue) {
      const start = new Date(defaultValue.start.toString());
      const end = new Date(defaultValue.end.toString());
      setDateRange([start, end]);
    } else {
      const today = new Date();
      setDateRange([today, today]);
    }
  }, []);

  // Handle date changes
  const handleDateChange = (update) => {
    setDateRange(update);
    
    if (onChange && update[0] && update[1]) {
      const startStr = dayjs(update[0]).format('YYYY-MM-DD');
      const endStr = dayjs(update[1]).format('YYYY-MM-DD');
      
      const start = parseDate(startStr);
      const end = parseDate(endStr);
      
      onChange({ start, end });
    }
  };

  // Custom styles for the date picker
  const customStyles = {
    datePickerContainer: `
      w-full
    `,
    datePickerInput: `
      w-full rounded-lg text-sm px-3 py-2 border-b-2
      ${isDarkMode 
        ? 'bg-[#151515] text-[#e6e6e6] placeholder-[#a0a0a1] border-[#2d2d2d]' 
        : 'bg-white text-[#101010] placeholder-[#525253] border-[#E4E5E7]'
      }
      ${errorMessage 
        ? 'border-red-500 focus:border-red-500' 
        : isDarkMode 
          ? 'focus:border-[#4f6bcc]'
          : 'focus:border-[#264699]'
      } 
      ${isDisabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'focus:outline-none focus:ring-0'
      }
      transition-all duration-200 ease-in-out
    `
  };

  // Custom CSS to be injected
  useEffect(() => {
    // Add custom styles for react-datepicker
    const style = document.createElement('style');
    style.innerHTML = `
      .react-datepicker {
        font-family: inherit;
        border-radius: 0.5rem;
        border: 1px solid ${isDarkMode ? '#2d2d2d' : '#E4E5E7'};
        background-color: ${isDarkMode ? '#151515' : 'white'};
      }
      .react-datepicker__header {
        background-color: ${isDarkMode ? '#1a1a2e' : '#ECEDFF'};
        border-bottom: 1px solid ${isDarkMode ? '#2d2d2d' : '#E4E5E7'};
      }
      .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
        color: ${isDarkMode ? '#e6e6e6' : '#101010'};
      }
      .react-datepicker__day:hover {
        background-color: ${isDarkMode ? '#2d2d2d' : '#ECEDFF'};
      }
      .react-datepicker__day--selected, .react-datepicker__day--in-range {
        background-color: ${isDarkMode ? '#4f6bcc' : '#264699'};
        color: white;
      }
      .react-datepicker__day--keyboard-selected {
        background-color: ${isDarkMode ? '#4f6bcc' : '#264699'};
        color: white;
      }
      .react-datepicker__input-container input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.375rem;
        border-bottom-width: 2px;
        border-color: ${isDarkMode ? '#2d2d2d' : '#E4E5E7'};
        background-color: ${isDarkMode ? '#151515' : 'white'};
        color: ${isDarkMode ? '#e6e6e6' : '#101010'};
        font-size: 0.875rem;
        line-height: 1.25rem;
        outline: none;
      }
      .react-datepicker__input-container input:focus {
        border-color: ${isDarkMode ? '#4f6bcc' : '#264699'};
      }
      .react-datepicker__triangle {
        display: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [isDarkMode]);

  return (
    <div className={`space-y-1 ${className}`}>
      {label && labelPlacement === "outside" && (
        <label className={`block text-sm font-medium mb-1.5
          ${isDarkMode ? 'text-[#e6e6e6]' : 'text-[#101010]'}`}>
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className={customStyles.datePickerContainer}>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date range"
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          minDate={minValue ? new Date(minValue.toString()) : undefined}
          maxDate={maxValue ? new Date(maxValue.toString()) : undefined}
          className={customStyles.datePickerInput}
          calendarClassName={isDarkMode ? 'dark-theme' : 'light-theme'}
        />
      </div>
      
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default UniDateRangePicker;
