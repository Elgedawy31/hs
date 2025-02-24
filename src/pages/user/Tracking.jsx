import React, { useState } from 'react'
import CardContainer from '../../components/CardContainer'
import Timer from '@components/Timer'
import CalendarHeader from '../../components/empolyees/dailyActivities/CalendarHeader';
import MonthDays from '../../components/empolyees/dailyActivities/MonthDays';
import CustomTabs from '../../components/CustomTabs'

import dayjs from 'dayjs';

function Tracking() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [activeTab, setActiveTab] = useState("details");
  
    const tabs = [
      { id: "details", label: "Details" },
      { id: "screenshots", label: "Screenshots" },
      { id: "systemLogs", label: "System Logs" },
      { id: "apps", label: "Apps" },
    ];
  
    const handleMonthChange = (newDate) => {
      setCurrentMonth(newDate);
    };
  return (
    <CardContainer className='space-y-8'>
      <Timer  />

      <CalendarHeader onMonthChange={handleMonthChange} />

      <MonthDays currentDate={currentMonth} />
 <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </CardContainer>
  )
}

export default Tracking
