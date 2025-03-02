import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import React, { useState } from 'react';
import dayjs from 'dayjs';

const CalendarHeader = ({ currentMonth, onMonthChange }) => {
  const [slideDirection, setSlideDirection] = useState(0);

  const isCurrentMonth = currentMonth.format('YYYY-MM') === dayjs().format('YYYY-MM');

  const handlePrevMonth = () => {
    setSlideDirection(-1);
    setTimeout(() => {
      const newDate = currentMonth.subtract(1, 'month');
      onMonthChange(newDate);
      setSlideDirection(0);
    }, 150);
  };

  const handleNextMonth = () => {
    if (isCurrentMonth) return;
    setSlideDirection(1);
    setTimeout(() => {
      const newDate = currentMonth.add(1, 'month');
      onMonthChange(newDate);
      setSlideDirection(0);
    }, 150);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between shadow-sm rounded-lg p-3">
        <div className="">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-xl font-semibold text-primary">Working hours</h1>
            </div>
          </div>
          {/* <div className="text-placeholderText text-sm">
            <span className="mr-2">This Week</span>
            <span className="text-primary">27:56:07</span>
          </div> */}
        </div>
        <div className="flex items-center gap-2">
          <ChevronLeft 
            className="w-5 h-5 text-primary cursor-pointer" 
            onClick={handlePrevMonth}
          />
          <div className="overflow-hidden w-20 text-center">
            <span 
              className="text-base text-primary inline-block transition-all duration-300 ease-in-out transform"
              style={{
                transform: `translateX(${slideDirection * 100}%)`,
                opacity: slideDirection === 0 ? 1 : 0
              }}
            >
              {currentMonth.format('MMM YYYY')}
            </span>
          </div>
          <ChevronRight 
            className={`w-5 h-5 text-primary ${isCurrentMonth ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={handleNextMonth}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
