import React, { useState } from 'react'
import CustomTabs from '../../components/CustomTabs'
import Leaves from '../../components/empolyees/tabs/Leaves';
import DetailsTab from '../../components/empolyees/tabs/DetailsTab';
import DeilyTab from '../../components/empolyees/tabs/DailyActivities';

function EmployeeDetails() {
  const [activeTab, setActiveTab] = useState("details");

  const tabs = [
    { id: "details", label: "Details" },
    { id: "daily", label: "Daily Activity" },
    { id: "leaves", label: "Leaves" },
  ];

  return (
    <div className="w-full">
      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="mt-4">
      {activeTab === "details" && <DetailsTab />}
      {activeTab === "daily" && <DeilyTab />}
      {activeTab === "leaves" && <Leaves />}
      </div>
      
     
    </div>
  )
}

export default EmployeeDetails
