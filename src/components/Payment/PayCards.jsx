import React from 'react';
import UniCard from '@components/UniCard';
import { BadgeDollarSignIcon, ClockArrowUpIcon, BookPlusIcon, CircleDollarSignIcon } from 'lucide-react';


function PayCards() {
  return (
     <div className="">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <UniCard 
          title="Total Salaries" 
          value="25"
          icon={BadgeDollarSignIcon}
        />
        <UniCard 
          title="Total Overtime" 
          value="4"
          icon={ClockArrowUpIcon}
        />
        <UniCard 
          title="Total bounses" 
          value="680"
          icon={BookPlusIcon}
        />
        <UniCard 
          title="Total Payment" 
          value="$ 2,500"
          icon={CircleDollarSignIcon}
        />
      </div>

     
    </div>
  )
}

export default PayCards