import React, { useState } from 'react';
import CardContainer from '../../../CardContainer';
import { Plus, LogOut, Play, MonitorSmartphone, Moon, Coffee, Clock, LogIn } from 'lucide-react';
import AddTimeManuallyForm from './AddTimeManuallyForm';

const DetailCard = ({ title, value, icon }) => {
  return (
    <CardContainer className="relative rounded-[20px] transition-colors py-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold">{value}</span>
          <div className="text-primary bg-[#F8EEE6] rounded-full p-2">
            {icon}
          </div>
        </div>
        <span className="text-placeholderText text-sm">{title}</span>
      </div>
    </CardContainer>
  );
};

const AddManuallyCard = ({ onClick }) => {
  return (
    <CardContainer 
      className="relative cursor-pointer rounded-[20px] transition-colors py-8 hover:bg-primary/5"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-primary bg-[#F8EFE6] rounded-full p-2">
          <Plus className="w-5 h-5" />
        </div>
        <span className="text-primary text-xl font-semibold">Add Manually</span>
      </div>
    </CardContainer>
  );
};

function DailyDetailsContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add Manually Card */}
        <AddManuallyCard onClick={() => setIsModalOpen(true)} />

        {/* Today's in time */}
        <DetailCard
          title="Today's in time"
          value="9:16 AM"
          icon={<LogIn className="w-5 h-5" />}
        />

        {/* Tracked time */}
        <DetailCard
          title="Tracked time"
          value="8h 45m"
          icon={<Play className="w-5 h-5" />}
        />

        {/* Productivity */}
        <DetailCard
          title="Productivity"
          value="8h 30m"
          icon={<MonitorSmartphone className="w-5 h-5" />}
        />

        {/* Unproductivity */}
        <DetailCard
          title="Unproductivity"
          value="30m"
          icon={<Moon className="w-5 h-5" />}
        />

        {/* Break Time */}
        <DetailCard
          title="Break Time"
          value="23m"
          icon={<Coffee className="w-5 h-5" />}
        />

        {/* Overtime */}
        <DetailCard
          title="Overtime"
          value="+23m"
          icon={<Clock className="w-5 h-5" />}
        />

        {/* Last Checkout */}
        <DetailCard
          title="Last Checkout"
          value="8h 30m"
          icon={<LogOut className="w-5 h-5" />}
        />
      </div>

      {/* Add Time Manually Form */}
      <AddTimeManuallyForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default DailyDetailsContent;
