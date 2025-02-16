import React, { useState } from 'react'
import CustomTabs from '../../components/CustomTabs'
import CardContainer from '../../components/CardContainer';

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
      >
      </CustomTabs>

      
     
    </div>
  )
}

export default EmployeeDetails
