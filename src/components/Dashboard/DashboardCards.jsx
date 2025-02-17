import React from 'react';
import UniCard from '../UniCard';
import { UsersRound, UserCheck, MailIcon, FileChartLineIcon } from 'lucide-react';

function DashboardCards() {
  return (
    <div className="p-4 space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <UniCard 
          title="Total Employees" 
          value="50"
          icon={UsersRound}
        />
        <UniCard 
          title="Active Now" 
          value="4"
          icon={UserCheck}
        />
        <UniCard 
          title="MTD / CH" 
          value="680"
          icon={MailIcon}
        />
        <UniCard 
          title="Bouns This Month" 
          value="$ 2,500"
          icon={FileChartLineIcon}
        />
      </div>

     
    </div>
  )
}

export default DashboardCards