import React, { useEffect } from 'react';
import UniCard from '../UniCard';
import { UsersRound, UserCheck, MailIcon, FileChartLineIcon } from 'lucide-react';
import { BASE_URL } from '../../utils/constants';
import { useAuth } from '@contexts/AuthContext';
import toast from 'react-hot-toast';
import { EventSourceWithAuth } from '../../utils/general'

function DashboardCards() {
  const {token} = useAuth();

    document.addEventListener('DOMContentLoaded', () => {
      const eventSource = new EventSourceWithAuth(`${BASE_URL}/sse/admin`,{
          headers:{
           
              'Authorization': token
          }
      });
      eventSource.connect();
      eventSource.addEventListener('activity', (event) => {
          console.log('activity',event.data);
      });
  
      eventSource.addEventListener('error',(err)=>{
         toast.error(err || 'An error occured');
      })
  });
   
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