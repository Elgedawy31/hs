import React, { useState, useEffect, useCallback } from 'react';
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
  const { currentTheme, theme } = useTheme();
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

  // Function to filter out future dates
  const isNotFutureDate = useCallback((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date <= today;
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
      bg-background text-text placeholder-placeholderText border-borderColor
      ${errorMessage 
        ? 'border-red-500 focus:border-red-500' 
        : `focus:border-primary`
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
        border: 1px solid ${theme.borderColor};
        background-color: ${theme.background};
      }
      .react-datepicker__header {
        background-color: ${theme.secondPrimaryColor};
        border-bottom: 1px solid ${theme.borderColor};
        color: ${theme.text};
      }
      .react-datepicker__current-month, 
      .react-datepicker-time__header, 
      .react-datepicker-year-header {
        color: ${theme.text};
      }
      .react-datepicker__day--disabled {
        color: ${isDarkMode ? '#444444' : '#ccc'};
      }
      .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
        color: ${theme.text};
      }
      .react-datepicker__day:hover {
        background-color: ${theme.secondPrimaryColor};
      }
      .react-datepicker__day--selected, .react-datepicker__day--in-range {
        background-color: ${theme.primary};
        color: white;
      }
      .react-datepicker__day--keyboard-selected {
        background-color: ${theme.primary};
        color: white;
      }
      .react-datepicker__input-container input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.375rem;
        border-bottom-width: 2px;
        border-color: ${theme.borderColor};
        background-color: ${theme.background};
        color: ${theme.text};
        font-size: 0.875rem;
        line-height: 1.25rem;
        outline: none;
      }
      .react-datepicker__input-container input:focus {
        border-color: ${theme.primary};
      }
      .react-datepicker__triangle {
        display: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [isDarkMode, theme]);

  return (
    <div className={`space-y-1 ${className} flex items-center justify-end`}>
      <div className={`${customStyles.datePickerContainer}`}>
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
          filterDate={isNotFutureDate}
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
