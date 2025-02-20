import React, { useState } from 'react';
import CalendarHeader from '../dailyActivities/CalendarHeader';
import MonthDays from '../dailyActivities/MonthDays';
import dayjs from 'dayjs';
import ActivitiesContainer from '../dailyActivities/MainContents/ActivitiesContainer';
import MonthlyDashboard from '../detailsTab/MonthlyDashboard';

function DailyActivities() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handleMonthChange = (newDate) => {
    setCurrentMonth(newDate);
  };

  return (
    <div className="space-y-6">
      <CalendarHeader onMonthChange={handleMonthChange} />
      <MonthlyDashboard showHeader={false} />

      <MonthDays currentDate={currentMonth} />
      <ActivitiesContainer />
    </div>
  );
}

export default DailyActivities;
