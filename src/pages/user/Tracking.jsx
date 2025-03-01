import React, { useEffect, useState } from 'react'
import CardContainer from '../../components/CardContainer'
import Timer from '@components/Timer'
import CalendarHeader from '../../components/empolyees/dailyActivities/CalendarHeader';
import MonthDays from '../../components/empolyees/dailyActivities/MonthDays';
import CustomTabs from '../../components/CustomTabs'

import dayjs from 'dayjs';
import TrackingDetailsTab from '../../components/user/tracking/tabs/TrackingDetailsTab';
import TrackingScreenshots from '../../components/user/tracking/tabs/TrackingScreenshots';
import TrackingSystemLogs from '../../components/user/tracking/tabs/TrackingSystemLogs';
import TrackingAppTab from '../../components/user/tracking/tabs/TrackingAppTab';
import { useAuth } from '../../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityMetrics } from '../../store/reducers/activity';
import Loading from '../../components/Loading';

function Tracking() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [activeDay, setActiveDay] = useState(dayjs());
  const { user, token } = useAuth();
  const { metrics, metricsLoading, metricsError } = useSelector(state => state.activity);

  const dispatch = useDispatch();

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

  const handleActiveDayChange = (day) => {
    setActiveDay(day);
  };

  // Update activeDay when month changes
  useEffect(() => {
    // If current month is the same as activeDay's month, keep the day
    // Otherwise set to first day of the month
    if (currentMonth.month() !== activeDay.month() || currentMonth.year() !== activeDay.year()) {
      setActiveDay(currentMonth.date(1));
    }
  }, [currentMonth, activeDay]);

  useEffect(() => {
    const fromDate = currentMonth.startOf('month');
    
    // If current month is selected, use today as toDate
    // If previous month is selected, use last day of that month
    const isCurrentMonth = currentMonth.month() === dayjs().month() && currentMonth.year() === dayjs().year();
    const toDate = isCurrentMonth ? dayjs() : currentMonth.endOf('month');

    const from = fromDate.format('M-D-YYYY');
    const to = toDate.format('M-D-YYYY');

    dispatch(getActivityMetrics({
      token,
      from,
      to,
      userId: user.id
    }))
  }, [dispatch, token, user.id, currentMonth]);

  
  return (
    <>
      {metricsLoading ? <Loading /> : <CardContainer className='space-y-8'>
        <Timer />

        <CalendarHeader currentMonth={currentMonth} onMonthChange={handleMonthChange} />

        <MonthDays 
          currentDate={currentMonth} 
          metricsData={metrics[0]} 
          onActiveDayChange={handleActiveDayChange} 
        />
        <CustomTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <div className="mt-4">
          {activeTab === "details" && <TrackingDetailsTab activeDay={activeDay.format('MM-DD-YYYY')} />}
          {activeTab === "screenshots" && <TrackingScreenshots activeDay={activeDay.format('MM-DD-YYYY')} />}
          {activeTab === "systemLogs" && <TrackingSystemLogs activeDay={activeDay.format('MM-DD-YYYY')} />}
          {activeTab === "apps" && <TrackingAppTab activeDay={activeDay.format('MM-DD-YYYY')} />}
        </div >
      </CardContainer>}
    </>
  )
}

export default Tracking
