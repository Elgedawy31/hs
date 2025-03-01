import React, { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MonthDays = ({ currentDate }) => {
  const [monthDays, setMonthDays] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [activeIndex, setActiveIndex] = useState(dayjs().date() - 1);
  const [visibleCards, setVisibleCards] = useState(7);

  // Update visible cards based on screen size
  const updateVisibleCards = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) { // sm
      setVisibleCards(1);
    } else if (width < 768) { // md
      setVisibleCards(3);
    } else if (width < 1024) { // lg
      setVisibleCards(5);
    } else {
      setVisibleCards(7);
    }
  }, []);

  // Listen for window resize
  useEffect(() => {
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, [updateVisibleCards]);

  useEffect(() => {
    generateMonthDays();
  }, [currentDate]); // Re-generate days when currentDate prop changes

  const generateMonthDays = () => {
    const daysInMonth = currentDate.daysInMonth();
    let days = [];
    const today = dayjs();
    
    // Generate all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = currentDate.date(i);
      const isFutureDate = dayDate.isAfter(today, 'day');
      
      days.push({
        dayName: dayDate.format('ddd'),
        dayNumber: i,
        time: isFutureDate ? null : generateRandomTime(),
        isFuture: isFutureDate
      });
    }
    setMonthDays(days);
    
    // Reset to start of month when month changes
    setStartIndex(0);
    // Update active index to first day of month or current day if in current month
    if (currentDate.month() === today.month() && currentDate.year() === today.year()) {
      setActiveIndex(today.date() - 1);
    } else {
      setActiveIndex(0);
    }
  };

  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handlePrevSlide = () => {
    if (startIndex > 0 && monthDays.length > visibleCards) {
      setSlideDirection(-1);
      setTimeout(() => {
        setStartIndex(prev => prev - 1);
        setSlideDirection(0);
      }, 300);
    }
  };

  const handleNextSlide = () => {
    if (startIndex < monthDays.length - visibleCards) {
      setSlideDirection(1);
      setTimeout(() => {
        setStartIndex(prev => prev + 1);
        setSlideDirection(0);
      }, 300);
    }
  };

  const handleDayClick = (index) => {
    // Don't allow selecting future dates
    if (monthDays[index]?.isFuture) {
      return;
    }
    
    setActiveIndex(index);
    // Center the clicked day if possible
    const newStartIndex = Math.min(
      Math.max(index - Math.floor(visibleCards / 2), 0),
      monthDays.length - visibleCards
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
      <div className="flex justify-center items-center gap-2 sm:gap-4">
        <button
          onClick={handlePrevSlide}
          className="p-2 rounded-full hover:bg-background transition-colors"
          disabled={startIndex === 0}
        >
          <ChevronLeft className={`w-5 h-5 text-primary ${startIndex === 0 ? 'opacity-50' : ''}`} />
        </button>

        <div className="flex gap-2 sm:gap-4 ">
          {monthDays.slice(startIndex, startIndex + visibleCards).map((day, index) => (
            <div
              key={startIndex + index}
              onClick={() => handleDayClick(startIndex + index)}
              className={`transform transition-all duration-300 ease-in-out 
                ${day.isFuture ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                ${startIndex + index === activeIndex ? 'scale-110 shadow-lg z-10' : 'scale-100'}
                ${slideDirection === 1 ? '-translate-x-full' : slideDirection === -1 ? 'translate-x-full' : 'translate-x-0'}
              `}
            >
              <div
                className={`w-full sm:w-28 md:w-32 h-32 rounded-lg p-4 flex flex-col items-center justify-center
                  ${startIndex + index === activeIndex ? 'bg-background border-2 border-primary' : 'bg-background'}
                  ${day.isFuture ? 'border border-gray-300' : ''}
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
                ) : day.isFuture ? (
                  <span className="text-sm text-gray-400">00:00</span>
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
          disabled={startIndex >= monthDays.length - visibleCards}
        >
          <ChevronRight className={`w-5 h-5 text-primary ${startIndex >= monthDays.length - visibleCards ? 'opacity-50' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default MonthDays;
