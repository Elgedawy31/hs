import React, { useState } from 'react';
import CalendarHeader from '../dailyActivities/CalendarHeader';
import MonthDays from '../dailyActivities/MonthDays';
import dayjs from 'dayjs';
import ActivitiesContainer from '../dailyActivities/MainContents/ActivitiesContainer';

function DailyActivities() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handleMonthChange = (newDate) => {
    setCurrentMonth(newDate);
  };

  return (
    <div className="space-y-4">
      <CalendarHeader onMonthChange={handleMonthChange} />
      <MonthDays currentDate={currentMonth} />
      <ActivitiesContainer />
    </div>
  );
}

export default DailyActivities;
