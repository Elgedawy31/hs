import React from 'react'
import DailyDetailsContent from './DailyDetailsContent'
import DailyScreenShots from './DailyScreenShots'
import DailySystemLogs from './DailySystemLogs'
import DailyAppsUsage from './DailyAppsUsage'
import NoActiveTab from './NoActiveTab'

function MainContent({activeTab}) {
  if(!activeTab) return <NoActiveTab />
  return (
    <div className="h-full overflow-y-auto">
    {activeTab === 'details' && <DailyDetailsContent />}
    {activeTab === 'screenshots' && <DailyScreenShots />}
    {activeTab === 'systemLogs' && <DailySystemLogs />}
    {activeTab === 'apps' && <DailyAppsUsage />}
    </div>

  )
}

export default MainContent
