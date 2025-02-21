import React from 'react';
import { DatePicker } from "@heroui/react";
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

  return (
    <DatePicker
      label={label}
      defaultValue={getDefaultValue()}
      value={value}
      onChange={onChange}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      errorMessage={errorMessage}
      className={className}
      labelPlacement={labelPlacement}
      hideTimeZone={hideTimeZone}
      granularity={granularity || (mode === "date" ? "day" : "minute")}
      minValue={minValue}
      maxValue={maxValue}
    />
  );
};

export default UniDateTimePicker;
