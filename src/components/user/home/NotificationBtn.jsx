import { Bell } from 'lucide-react'
import React, { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react"
import { useTheme } from '../../../contexts/ThemeContext'

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    title: 'Notification name here',
    description: 'Lorem Ipsum is simply dummy text',
    date: new Date(),
    read: false
  },
  {
    id: 2,
    title: 'Notification name here',
    description: 'Lorem Ipsum is simply dummy text',
    date: new Date(),
    read: false
  },
  {
    id: 3,
    title: 'Notification name here',
    description: 'Lorem Ipsum is simply dummy text',
    date: new Date(Date.now() - 86400000), // yesterday
    read: true
  },
  {
    id: 4,
    title: 'Notification name here',
    description: 'Lorem Ipsum is simply dummy text',
    date: new Date(Date.now() - 86400000), // yesterday
    read: true
  },
  {
    id: 5,
    title: 'Notification name here',
    description: 'Lorem Ipsum is simply dummy text',
    date: new Date(Date.now() - 172800000), // 2 days ago
    read: true
  },
  {
    id: 6,
    title: 'Notification name here',
    description: 'Lorem Ipsum is simply dummy text',
    date: new Date(Date.now() - 604800000), // 1 week ago
    read: true
  }
]

// Helper function to determine if a date is today
const isToday = (date) => {
  const today = new Date()
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
}

// Helper function to determine if a date is yesterday
const isYesterday = (date) => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
}

function NotificationBtn() {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  
  const unreadCount = mockNotifications.filter(n => !n.read).length
  
  const filteredNotifications = activeTab === 'all' 
    ? mockNotifications 
    : mockNotifications.filter(n => !n.read)
    
  // Group notifications by time period
  const todayNotifications = filteredNotifications.filter(n => isToday(n.date))
  const yesterdayNotifications = filteredNotifications.filter(n => isYesterday(n.date))
  const earlierNotifications = filteredNotifications.filter(n => !isToday(n.date) && !isYesterday(n.date))
  
  const markAllAsRead = () => {
    // In a real app, this would call an API to mark all as read
    console.log('Mark all as read')
  }
  
  return (
    <Popover placement="bottom-end"  isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div className='relative w-[48px] h-[48px] bg-[#F8EEE6] cursor-pointer duration-300 hover:bg-primary text-primary hover:text-text hover:scale-105 rounded-full flex items-center justify-center'>
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0 bg-background border border-borderColor rounded-lg shadow-xl">
        <div className="flex items-center justify-between border-b border-borderColor px-4 py-3">
          <div className="flex gap-4">
            <button 
              className={`text-sm font-medium ${activeTab === 'all' ? 'text-primary' : 'text-placeholderText'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`text-sm font-medium ${activeTab === 'unread' ? 'text-primary' : 'text-placeholderText'}`}
              onClick={() => setActiveTab('unread')}
            >
              Unread ({unreadCount})
            </button>
          </div>
          <button 
            className="text-primary text-sm hover:underline"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {/* Today's notifications */}
          {todayNotifications.length > 0 && (
            <div className="py-2">
              <h3 className="px-4 py-2 text-sm font-medium text-placeholderText">Today</h3>
              {todayNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`px-4 py-3 hover:bg-secondPrimaryColor/20 cursor-pointer flex gap-3 ${!notification.read ? 'bg-secondPrimaryColor/10' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notification.read ? 'bg-secondPrimaryColor' : 'bg-secondPrimaryColor/50'}`}>
                    <Bell size={20} className={!notification.read ? 'text-primary' : 'text-placeholderText'} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text">{notification.title}</h4>
                    <p className="text-xs text-placeholderText">{notification.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Yesterday's notifications */}
          {yesterdayNotifications.length > 0 && (
            <div className="py-2">
              <h3 className="px-4 py-2 text-sm font-medium text-placeholderText">Yesterday</h3>
              {yesterdayNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`px-4 py-3 hover:bg-secondPrimaryColor/20 cursor-pointer flex gap-3 ${!notification.read ? 'bg-secondPrimaryColor/10' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notification.read ? 'bg-secondPrimaryColor' : 'bg-secondPrimaryColor/50'}`}>
                    <Bell size={20} className={!notification.read ? 'text-primary' : 'text-placeholderText'} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text">{notification.title}</h4>
                    <p className="text-xs text-placeholderText">{notification.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Earlier notifications */}
          {earlierNotifications.length > 0 && (
            <div className="py-2">
              <h3 className="px-4 py-2 text-sm font-medium text-placeholderText">Earlier</h3>
              {earlierNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`px-4 py-3 hover:bg-secondPrimaryColor/20 cursor-pointer flex gap-3 ${!notification.read ? 'bg-secondPrimaryColor/10' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notification.read ? 'bg-secondPrimaryColor' : 'bg-secondPrimaryColor/50'}`}>
                    <Bell size={20} className={!notification.read ? 'text-primary' : 'text-placeholderText'} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text">{notification.title}</h4>
                    <p className="text-xs text-placeholderText">{notification.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Empty state */}
          {filteredNotifications.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-placeholderText">No notifications</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NotificationBtn
