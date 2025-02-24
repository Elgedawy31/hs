import { useState, useEffect } from 'react';

const Timer = ({ startTime }) => {
  const [time, setTime] = useState(() => {
    if (!startTime) return { hours: 0, minutes: 0, seconds: 0 };
    
    const [hours, minutes, seconds] = startTime.split(':').map(Number);
    return { hours, minutes, seconds };
  });

  useEffect(() => {
    const updateTimer = () => {
      setTime(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        seconds += 1;
        
        if (seconds === 60) {
          seconds = 0;
          minutes += 1;
        }
        
        if (minutes === 60) {
          minutes = 0;
          hours += 1;
        }
        
        return { hours, minutes, seconds };
      });
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const displayTime = `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;

  return (
    <div className="flex justify-center items-center">
      <div className="text-primary text-[32px] font-[600]">
        {displayTime}
      </div>
    </div>
  );
};

export default Timer;
