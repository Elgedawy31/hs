import React from 'react';
import { useSelector } from 'react-redux';

const Timer = ({activeDay}) => {
  const { metricsForCards, metricsLoadingForCards } = useSelector(state => state.activity)
  const data = metricsForCards[0] || {};

  // Use totalTimeLogged from metricsForCards (in seconds)
  let hours = 0, minutes = 0, seconds = 0;
  
  if (data && data.totalTimeLogged !== undefined) {
    const totalSeconds = data.totalTimeLogged;
    // Convert seconds to hours, minutes, seconds
    hours = Math.floor(totalSeconds / 3600);
    minutes = Math.floor((totalSeconds % 3600) / 60);
    seconds = totalSeconds % 60;
  }

  const displayTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="flex justify-center items-center">
      <div className="text-primary text-[32px] font-[600]">
        {displayTime}
      </div>
    </div>
  );
};

export default Timer;
