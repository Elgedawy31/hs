import React from 'react';
import { DatePicker } from "@heroui/react";
import { useTheme } from '../contexts/ThemeContext';
import {
  parseAbsoluteToLocal,
  parseDate,
  now,
  getLocalTimeZone,
  toZoned
} from "@internationalized/date";

const UniDateTimePicker = ({
  label,
  mode = "date",
  defaultValue,
  value,
  onChange,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  errorMessage,
  className = "",
  labelPlacement = "outside",
  hideTimeZone = false,
  granularity,
  minValue,
  maxValue,
}) => {
  const getDefaultValue = () => {
    if (defaultValue) return defaultValue;
    if (value) return value;

    try {
      const timezone = getLocalTimeZone();
      const currentDate = now(timezone);
      
      switch (mode) {
        case "zonedDateTime":
          return toZoned(currentDate, timezone);
        case "absoluteDateTime":
          return parseAbsoluteToLocal(currentDate.toString());
        case "datetime":
          return currentDate;
        case "date":
        default:
          return parseDate(currentDate.toString().split('T')[0]);
      }
    } catch (error) {
      console.error("Error parsing date:", error);
      // Return a fallback date
      return parseDate(new Date().toISOString().split('T')[0]);
    }
  };

  const { currentTheme } = useTheme();
  const isDarkMode = currentTheme === 'dark';

  const baseClasses = `
    w-full rounded-lg border text-sm
    ${isDarkMode 
      ? 'bg-[#151515] border-[#2d2d2d] text-[#e6e6e6] placeholder-[#a0a0a1]' 
      : 'bg-white border-[#E4E5E7] text-[#101010] placeholder-[#525253]'
    }
    ${errorMessage 
      ? 'border-red-500 focus:border-red-500' 
      : isDarkMode 
        ? 'focus:border-[#4f6bcc]'
        : 'focus:border-[#264699]'
    } 
    ${isDisabled 
      ? 'opacity-50 cursor-not-allowed' 
      : 'focus:outline-none focus:ring-0 focus:ring-opacity-25'
    }
    transition-all duration-200 ease-in-out
    ${className}
  `;

  return (
    <div className="space-y-1">
      {label && labelPlacement === "outside" && (
        <label className={`block text-sm font-medium mb-1.5
          ${isDarkMode ? 'text-[#e6e6e6]' : 'text-[#101010]'}`}>
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <DatePicker
        label={labelPlacement === "outside" ? undefined : label}
        defaultValue={getDefaultValue()}
        value={value}
        onChange={onChange}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        errorMessage={errorMessage}
        className={baseClasses}
        labelPlacement={labelPlacement}
        hideTimeZone={hideTimeZone}
        granularity={granularity || (mode === "date" ? "day" : "minute")}
        minValue={minValue}
        maxValue={maxValue}
        classNames={{
          label: isDarkMode ? 'text-[#e6e6e6]' : 'text-[#101010]',
          trigger: `${isDarkMode 
            ? 'data-[hover=true]:bg-[#1a1a2e] data-[focus=true]:bg-[#1a1a2e]' 
            : 'data-[hover=true]:bg-[#ECEDFF] data-[focus=true]:bg-[#ECEDFF]'} 
            flex items-center justify-between px-4 py-2.5`,
          content: `${isDarkMode ? 'bg-[#151515] border-[#2d2d2d]' : 'bg-white border-[#E4E5E7]'} 
            p-4 rounded-lg shadow-lg mx-auto`,
          header: 'flex justify-between items-center mb-4',
          heading: `${isDarkMode ? 'text-[#e6e6e6]' : 'text-[#101010]'} text-lg font-semibold text-center`,
          calendar: 'w-full max-w-[320px] mx-auto',
          calendarHeader: 'grid grid-cols-7 mb-2',
          calendarHeaderCell: `
            ${isDarkMode ? 'bg-[#1a1a2e] text-[#e6e6e6]' : 'bg-[#ECEDFF] text-[#101010]'}
            text-center text-sm font-medium py-2 first:rounded-l-md last:rounded-r-md
          `,
          calendarBody: 'grid grid-cols-7 gap-1',
          calendarCell: `
            text-center p-2 rounded-md transition-colors duration-200
            ${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#f8f9fa]'}
            ${isDarkMode 
              ? 'hover:bg-[#2d2d2d] data-[selected=true]:bg-[#4f6bcc] data-[selected=true]:text-white' 
              : 'hover:bg-[#ECEDFF] data-[selected=true]:bg-[#264699] data-[selected=true]:text-white'}
            ${isDarkMode 
              ? 'data-[outside-month=true]:bg-[#151515] data-[outside-month=true]:text-[#4a4a4a]' 
              : 'data-[outside-month=true]:bg-[#ffffff] data-[outside-month=true]:text-[#a0a0a1]'}
            ${isDarkMode 
              ? 'data-[today=true]:border-2 data-[today=true]:border-[#4f6bcc]' 
              : 'data-[today=true]:border-2 data-[today=true]:border-[#264699]'}
          `,
          timeField: `${isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#ECEDFF]'} 
            rounded-md p-2 mt-4`,
          timeFieldInput: `${isDarkMode ? 'text-[#e6e6e6]' : 'text-[#101010]'} 
            w-full text-center`,
          item: isDarkMode 
            ? 'text-[#e6e6e6] data-[hover=true]:bg-[#1a1a2e]' 
            : 'text-[#101010] data-[hover=true]:bg-[#ECEDFF]'
        }}
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default UniDateTimePicker;
