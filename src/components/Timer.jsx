import React from 'react';

const Timer = ({ time }) => {
  // Parse the time if it's provided as a string (e.g., "01:30:45")
  let hours = 0, minutes = 0, seconds = 0;
  
  if (time) {
    if (typeof time === 'string') {
      [hours, minutes, seconds] = time.split(':').map(Number);
    } else if (typeof time === 'object' && time !== null) {
      // If time is provided as an object with hours, minutes, seconds properties
      hours = time.hours || 0;
      minutes = time.minutes || 0;
      seconds = time.seconds || 0;
    } else if (typeof time === 'number') {
      // If time is provided as seconds
      hours = Math.floor(time / 3600);
      minutes = Math.floor((time % 3600) / 60);
      seconds = time % 60;
    }
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
