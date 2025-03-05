import React, { useState, useEffect } from 'react';
import CalendarHeader from '../dailyActivities/CalendarHeader';
import MonthDays from '../dailyActivities/MonthDays';
import dayjs from 'dayjs';
import ActivitiesContainer from '../dailyActivities/MainContents/ActivitiesContainer';
import MonthlyDashboard from '../detailsTab/MonthlyDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityMetrics } from '../../../store/reducers/activity';
import { useAuth } from '../../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import Loading from '../../Loading';

function DailyActivities() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [activeDay, setActiveDay] = useState(dayjs());
  const dispatch = useDispatch();
  const { metrics, metricsLoading } = useSelector(state => state.activity);
  const { token } = useAuth();
  const { id } = useParams();

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
    // Get the last day of the previous month
    const fromDate = currentMonth.subtract(1, 'month').endOf('month');
    
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
      userId: id
    }));
  }, [dispatch, token, id, currentMonth]);

  return (
    <div className="space-y-6">
      {metricsLoading ? <Loading /> : (
        <>
          <CalendarHeader currentMonth={currentMonth} onMonthChange={handleMonthChange} />
          <MonthlyDashboard showHeader={false} currentMonth={currentMonth} />

          <MonthDays 
            currentDate={currentMonth} 
            metricsData={metrics} 
            onActiveDayChange={handleActiveDayChange} 
          />
          <ActivitiesContainer activeDay={activeDay} />
        </>
      )}
    </div>
  );
}

export default DailyActivities;
