import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MonthDays = ({ currentDate }) => {
  const [monthDays, setMonthDays] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [activeIndex, setActiveIndex] = useState(dayjs().date() - 1); // Current day is active

  useEffect(() => {
    generateMonthDays();
  }, [currentDate]); // Re-generate days when currentDate prop changes

  const generateMonthDays = () => {
    const daysInMonth = currentDate.daysInMonth();
    let days = [];
    
    // Generate all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = currentDate.date(i);
      days.push({
        dayName: dayDate.format('ddd'),
        dayNumber: i,
        time: generateRandomTime() // In real app, this would come from your data
      });
    }
    setMonthDays(days);
    
    // Set start index to show current day in the middle
    // Reset to start of month when month changes
    setStartIndex(0);
    // Update active index to first day of month
    setActiveIndex(0);
  };

  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handlePrevSlide = () => {
    if (startIndex > 0) {
      setSlideDirection(-1);
      setTimeout(() => {
        setStartIndex(prev => prev - 1);
        setSlideDirection(0);
      }, 300);
    }
  };

  const handleNextSlide = () => {
    if (startIndex < monthDays.length - 7) {
      setSlideDirection(1);
      setTimeout(() => {
        setStartIndex(prev => prev + 1);
        setSlideDirection(0);
      }, 300);
    }
  };

  const handleDayClick = (index) => {
    setActiveIndex(index);
    // Center the clicked day if possible
    const newStartIndex = Math.min(
      Math.max(index - 3, 0),
      monthDays.length - 7
    );
    if (newStartIndex !== startIndex) {
      setSlideDirection(newStartIndex > startIndex ? 1 : -1);
      setTimeout(() => {
        setStartIndex(newStartIndex);
        setSlideDirection(0);
      }, 300);
    }
  };

  const getTimeColor = (time) => {
    const [hours] = time.split(':').map(Number);
    if (hours < 4) return 'text-red-500';
    if (hours < 7) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <div className="relative mt-6">
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handlePrevSlide}
          className="p-2 rounded-full hover:bg-background transition-colors"
          disabled={startIndex === 0}
        >
          <ChevronLeft className={`w-5 h-5 text-primary ${startIndex === 0 ? 'opacity-50' : ''}`} />
        </button>

        <div className="flex gap-4 overflow-hidden">
          {monthDays.slice(startIndex, startIndex + 7).map((day, index) => (
            <div
              key={startIndex + index}
              onClick={() => handleDayClick(startIndex + index)}
              className={`transform transition-all duration-300 ease-in-out cursor-pointer
                ${startIndex + index === activeIndex ? 'scale-110 shadow-lg z-10' : 'scale-100'}
                ${slideDirection === 1 ? '-translate-x-full' : slideDirection === -1 ? 'translate-x-full' : 'translate-x-0'}
              `}
            >
              <div
                className={`w-32 h-32 rounded-lg p-4 flex flex-col items-center justify-center
                  ${startIndex + index === activeIndex ? 'bg-background border-2 border-primary' : 'bg-background'}
                `}
              >
                <span className={`text-sm ${startIndex + index === activeIndex ? 'text-primary' : 'text-placeholderText'}`}>
                  {day.dayName}
                </span>
                <span className={`text-2xl font-bold my-2 ${startIndex + index === activeIndex ? 'text-primary' : 'text-text'}`}>
                  {day.dayNumber}
                </span>
                {startIndex + index === activeIndex ? (
                  <span className="w-2 h-2 bg-primary rounded-full" />
                ) : (
                  <span className={`text-sm ${getTimeColor(day.time)}`}>
                    {day.time}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNextSlide}
          className="p-2 rounded-full hover:bg-background transition-colors"
          disabled={startIndex >= monthDays.length - 7}
        >
          <ChevronRight className={`w-5 h-5 text-primary ${startIndex >= monthDays.length - 7 ? 'opacity-50' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default MonthDays;
