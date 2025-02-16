import React from 'react';
import UniHeading from '../components/UniHeading';
import { HomeIcon } from 'lucide-react';
import OnlineEmployees from '../components/Dashboard/OnlineEmployees';
import DashboardCards from '../components/Dashboard/DashboardCards';
import RecentLogs from '../components/Dashboard/RecentLogs';

const Dashboard = () => {
   const handleRowSelect = (selectedRows) => {
    console.log('Selected rows:', selectedRows);
  };
  const handleClick = () => {
   navigate('new')
  }
    return (
    <> 
    <div className='space-y-4 p-4'>
      <div className="flex space-y-4">
        <h1 className="text-xl font-medium">Good Morning <span className="text-xl font-meduim text-gray-600">Admin !</span> </h1>
      </div>
        <div>
          <UniHeading 
          icon={HomeIcon} 
          text="Dashboard Overview" showButton buttonText='Send public notification' onButtonClick={handleClick}/>
          
        </div>
        <div>
          <DashboardCards />
        </div>
        <div>
          <OnlineEmployees />
        </div>
        <div>
          <RecentLogs/>
        </div>
    </div>
      
    </>
       
    );
};

export default Dashboard;
