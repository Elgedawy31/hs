import React from 'react'
import DailyDetailsContent from './DailyDetailsContent'
import DailyScreenShots from './DailyScreenShots'
import DailySystemLogs from './DailySystemLogs'
import DailyAppsUsage from './DailyAppsUsage'
import NoActiveTab from './NoActiveTab'

function MainContent({activeTab}) {
  if(!activeTab) return <NoActiveTab />
  return (
    <>
    {activeTab === 'details' && <DailyDetailsContent />}
    {activeTab === 'screenshots' && <DailyScreenShots />}
    {activeTab === 'systemLogs' && <DailySystemLogs />}
    {activeTab === 'apps' && <DailyAppsUsage />}
    </>

  )
}

export default MainContent
