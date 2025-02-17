import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

const CalendarHeader = () => {

  return (
     
  <div className="">
      <div className="flex items-center justify-between shadow-sm rounded-lg p-3">
        <div className="">
         <div className='flex items-center gap-2 mb-1'>
         <CalendarHeader className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-xl font-semibold text-primary">Nouran's Working hour</h1>
          </div>
         </div>
            <div className="text-placeholderText text-sm">
              <span className="mr-2">This Week</span>
              <span className='text-primary'>27:56:07</span>
            </div>
        </div>
        <div className="flex items-center gap-3">
          <ChevronLeft className="w-5 h-5 text-primary cursor-pointer" />
          <span className="text-base text-primary ">Feb 2025</span>
          <ChevronRight className="w-5 h-5 text-primary cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
