import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const Timer = ({ activeDay }) => {
  const { metricsForCards, metricsLoadingForCards } = useSelector(state => state.activity);
  const data = metricsForCards && typeof metricsForCards === 'object' ? metricsForCards : {};
  
  // Initialize state for the timer
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isToday, setIsToday] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  // Check if activeDay is today
  useEffect(() => {
    if (!activeDay) return;
    
    const today = dayjs();
    // Handle activeDay whether it's a dayjs object or a string
    const activeDayObj = dayjs.isDayjs(activeDay) ? activeDay : dayjs(activeDay);
    
    // Check if activeDay is today (same day, month, and year)
    const isSameDay = activeDayObj.format('YYYY-MM-DD') === today.format('YYYY-MM-DD');
    setIsToday(isSameDay);
    
    // Only run the timer if it's today
    setIsRunning(isSameDay);
    
    console.log('Timer: Active day is today?', isSameDay);
  }, [activeDay]);
  
  // Initialize timer with data from Redux store
  useEffect(() => {
    if (data && data.totalTimeLogged !== undefined) {
      setTimerSeconds(data.totalTimeLogged);
    } else {
      setTimerSeconds(0);
    }
  }, [data]);
;
  
  // Convert seconds to hours, minutes, seconds
  const hours = Math.floor(timerSeconds / 3600);
  const minutes = Math.floor((timerSeconds % 3600) / 60);
  const seconds = timerSeconds % 60;
  
  const displayTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="flex justify-center items-center">
      <div className={`text-[32px] font-[600] ${isToday ? 'text-primary' : 'text-placeholderText'}`}>
        {displayTime}
      </div>
    </div>
  );
};

export default Timer;
