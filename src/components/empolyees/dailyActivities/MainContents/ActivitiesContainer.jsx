import React, { useState } from 'react'
import SidebarItem from './SidebarItem'
import MainContent from './MainContent'

function ActivitiesContainer() {
  const [activeTab, setActiveTab] = useState(null)

  const menuItems = [
    { id: 'details', title: 'Details' },
    { id: 'screenshots', title: 'Screen Shots' },
    { id: 'systemLogs', title: 'System Logs' },
    { id: 'apps', title: 'Apps' },
  ]

  return (
    <div className="flex gap-4 h-[calc(100vh-200px)] pt-6">
      {/* Sidebar */}
      <div className="w-64 space-y-4 ">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            title={item.title}
            isActive={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <MainContent activeTab={activeTab} />
      </div>
    </div>
  )
}

export default ActivitiesContainer
