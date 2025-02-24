import { useState, useEffect } from 'react';

const Timer = ({ startTime }) => {
  const [time, setTime] = useState(() => {
    if (!startTime) return { hours: 12, minutes: 0, period: 'AM' };
    
    const [timeStr, period] = startTime.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    
    // Convert to 24-hour format for internal state
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return { hours, minutes, period };
  });

  useEffect(() => {
    const updateTimer = () => {
      setTime(prevTime => {
        let { hours, minutes, period } = prevTime;
        
        minutes += 1;
        
        if (minutes === 60) {
          minutes = 0;
          hours += 1;
          
          if (hours === 12) {
            period = period === 'AM' ? 'PM' : 'AM';
          } else if (hours === 13) {
            hours = 1;
          }
        }
        
        return { hours, minutes, period };
      });
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const displayHours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
  const displayTime = `${String(displayHours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')} ${time.period}`;

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="text-primary text-[80px] font-mono tracking-wider">
        {displayTime}
      </div>
    </div>
  );
};

export default Timer;
