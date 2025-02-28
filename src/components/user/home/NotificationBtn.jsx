import { Bell, Eye } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react"
import { useTheme } from '../../../contexts/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '@contexts/AuthContext'
import { getAllNotifications, resetNotificationState } from '../../../store/reducers/notification'
import toast from 'react-hot-toast'

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
  const {token , user} = useAuth()
  const [activeTab, setActiveTab] = useState('all')
  const [localNotifications, setLocalNotifications] = useState(mockNotifications)
  
  const dispatch = useDispatch()
  const { notifications, loading, error } = useSelector(state => state.notification)
  
  // Comment out API calls and use mock data only
  useEffect(() => {
    // Get the token from localStorage or your auth context
    
    if (token) {
      dispatch(getAllNotifications({ token , page: 1, limit: 10 , userId:user?.id }))
    }
  }, [dispatch])
  
  useEffect(() => {
    console.log('Notifications from API:', notifications)
    
  }, [notifications])
  
  // Use mock data only
  useEffect(() => {
    setLocalNotifications(mockNotifications)
  }, [])
  
  const unreadCount = localNotifications.filter(n => !n.read).length
  
  const filteredNotifications = activeTab === 'all' 
    ? localNotifications 
    : localNotifications.filter(n => !n.read)
    
  // Group notifications by time period
  const todayNotifications = filteredNotifications.filter(n => isToday(n.date))
  const yesterdayNotifications = filteredNotifications.filter(n => isYesterday(n.date))
  const earlierNotifications = filteredNotifications.filter(n => !isToday(n.date) && !isYesterday(n.date))
  
  const markAllAsRead = () => {
    // In a real app, this would call an API to mark all as read
    setLocalNotifications(localNotifications.map(n => ({ ...n, read: true })))
  }
  
  const markAsRead = (id) => {
    // In a real app, this would call an API to mark a specific notification as read
    setLocalNotifications(localNotifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  
  useEffect(() => {
    // Reset form when modal is closed
    if (error) {
      toast.error(error);
      dispatch(resetNotificationState());
    }
  }, [error]);
  return (
    <Popover placement="bottom-end"  isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div className='relative w-[48px] h-[48px] bg-[#F8EEE6] cursor-pointer duration-300 hover:bg-primary text-primary hover:text-white hover:scale-105 rounded-full flex items-center justify-center'>
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
          {/* <button 
            className="text-primary text-sm hover:underline"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button> */}
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {/* Today's notifications */}
          {todayNotifications.length > 0 && (
            <div className="py-2">
              <h3 className="px-4 py-2 text-sm font-medium text-placeholderText">Today</h3>
              {todayNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`px-4 py-3 hover:bg-secondPrimaryColor/20  flex gap-3  hover:shadow-sm relative group ${!notification.read ? 'bg-secondPrimaryColor/10' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notification.read ? 'bg-secondPrimaryColor' : 'bg-secondPrimaryColor/50'}`}>
                    <Bell size={20} className={!notification.read ? 'text-primary' : 'text-placeholderText'} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-text">{notification.title}</h4>
                    <p className="text-xs text-placeholderText">{notification.description}</p>
                  </div>
                  {!notification.read && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary/80"
                      title="Mark as read"
                    >
                      <Eye size={16} className="text-white" />
                    </button>
                  )}
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
                  className={`px-4 py-3 hover:bg-secondPrimaryColor/20  flex gap-3  hover:shadow-sm relative group ${!notification.read ? 'bg-secondPrimaryColor/10' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notification.read ? 'bg-secondPrimaryColor' : 'bg-secondPrimaryColor/50'}`}>
                    <Bell size={20} className={!notification.read ? 'text-primary' : 'text-placeholderText'} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-text">{notification.title}</h4>
                    <p className="text-xs text-placeholderText">{notification.description}</p>
                  </div>
                  {!notification.read && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary/80"
                      title="Mark as read"
                    >
                      <Eye size={16} className="text-white" />
                    </button>
                  )}
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
                  className={`px-4 py-3 hover:bg-secondPrimaryColor/20  flex gap-3  hover:shadow-sm relative group ${!notification.read ? 'bg-secondPrimaryColor/10' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!notification.read ? 'bg-secondPrimaryColor' : 'bg-secondPrimaryColor/50'}`}>
                    <Bell size={20} className={!notification.read ? 'text-primary' : 'text-placeholderText'} />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-text">{notification.title}</h4>
                    <p className="text-xs text-placeholderText">{notification.description}</p>
                  </div>
                  {!notification.read && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-primary/80"
                      title="Mark as read"
                    >
                      <Eye size={16} className="text-white" />
                    </button>
                  )}
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
