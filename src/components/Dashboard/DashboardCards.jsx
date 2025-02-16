import React from 'react';
import UniCard from '../../components/UniCard';
import { UsersRound, UserCheck, Briefcase, Building2 } from 'lucide-react';

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
          title="On Leave" 
          value="5"
          icon={Briefcase}
        />
        <UniCard 
          title="Departments" 
          value="4"
          icon={Building2}
        />
      </div>

     
    </div>
  )
}

export default DashboardCards