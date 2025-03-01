import { Plus, LogOut, Play, MonitorSmartphone, Moon, Coffee, Clock, LogIn } from 'lucide-react';

import React from 'react'
import CardContainer from '../../../CardContainer';

const DetailCard = ({ title, value, icon }) => {
  return (
    <CardContainer className="relative rounded-[30px] transition-colors py-12">
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

function TrackingDetailsTab({activeDay}) {
  console.log('activeDay', activeDay);
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

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

      </div>
  )
}

export default TrackingDetailsTab
