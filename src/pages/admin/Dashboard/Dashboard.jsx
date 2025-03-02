import React, { useState } from 'react';
import UniHeading from '@components/UniHeading';
import { HomeIcon } from 'lucide-react';
import OnlineEmployees from '@components/dashboard/OnlineEmployees';
import DashboardCards from '@components/dashboard/DashboardCards';
import RecentLogs from '@components/dashboard/RecentLogs';
import SendNotificationForm from '@components/dashboard/SendNotificationForm';
import { useAuth } from '@contexts/AuthContext';
import extractName from '../../../utils/extractName';

const Dashboard = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
const {user} = useAuth();

  const handleClick = () => {
    setIsNotificationModalOpen(true);
  };
    return (
      <> 
        <div className='space-y-4'>
          <div className="flex space-y-4">
            <h1 className="text-xl font-medium">Welcome <span className="text-xl font-meduim text-placeholderText">{extractName(user.email)} !</span> </h1>
          </div>
          <div>
            <UniHeading 
              icon={HomeIcon} 
              text="Dashboard Overview" 
              showButton 
              buttonText='Send public notification' 
              onButtonClick={handleClick}
            />
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
        
        {/* Notification Modal */}
        <SendNotificationForm 
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
        />
      </>
    );
};

export default Dashboard;
