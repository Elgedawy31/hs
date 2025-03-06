import React, { useState } from 'react';
import CustomTabs from '../components/CustomTabs';

function Notifications() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'lab-results', label: 'Lab Results' },
    { id: 'updates', label: 'Updates' },
  ];

  // Sample notification data
  const notifications = [
    {
      id: 1,
      date: 'Today',
      actualDate: '28/2/2025',
      type: 'appointments',
      title: 'Upcoming Appointment Tommorrow',
      description: '8:00 PM with Dr. Alejandro Gómez',
      actions: [
        { label: 'Confirm', primary: true },
        { label: 'Reschedule', primary: false }
      ]
    },
    {
      id: 2,
      date: 'Today',
      actualDate: '28/2/2025',
      type: 'lab-results',
      title: 'Skin Analysis Results Ready',
      description: 'Your recent skin analysis results are now available',
      actions: [
        { label: 'View Results', primary: true }
      ]
    },
    {
      id: 3,
      date: 'Yesterday',
      actualDate: '27/2/2025',
      type: 'updates',
      title: 'New Treatment Available',
      description: 'Learn about our new laser treatment for acne scars',
      actions: [
        { label: 'Read More', primary: true }
      ]
    },
    {
      id: 4,
      date: 'Yesterday',
      actualDate: '27/2/2025',
      type: 'appointments',
      title: 'Appointment Feedback',
      description: 'How was your appointment with Dr. Alejandro Gómez',
      actions: [
        { label: 'Leave Feedback', primary: true }
      ]
    }
  ];

  // Filter notifications based on active tab
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === activeTab);

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = notification.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">Notifications</h1>
        <p className="text-text/80">Stay updated with your appointments and clinic news</p>
      </div>

      <CustomTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab}>
        <div className="mt-6">
          {Object.keys(groupedNotifications).length > 0 ? (
            Object.entries(groupedNotifications).map(([date, dateNotifications]) => (
              <div key={date} className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-text">{date}</span>
                  </div>
                  <span className="ml-2 text-sm text-text/60">{dateNotifications[0].actualDate}</span>
                </div>

                {dateNotifications.map(notification => (
                  <div key={notification.id} className="bg-altPrimary rounded-lg shadow-sm mb-4 p-6 border border-borderColor relative">
                    <button className="absolute top-4 right-4 text-text/40 hover:text-text/60">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    <h3 className="text-lg font-semibold text-text mb-1">{notification.title}</h3>
                    <p className="text-text/70 mb-4">{notification.description}</p>
                    
                    <div className="flex space-x-3">
                      {notification.actions.map((action, index) => (
                        <button 
                          key={index} 
                          className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                            action.primary 
                              ? 'bg-primary text-white hover:bg-primary/90' 
                              : 'border border-primary text-primary hover:bg-primary/10'
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-text/60">No notifications found</p>
            </div>
          )}
        </div>
      </CustomTabs>
    </div>
  );
}

export default Notifications;
