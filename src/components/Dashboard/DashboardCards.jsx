import React, { useEffect, useRef } from 'react';
import UniCard from '../UniCard';
import { UsersRound, UserCheck, Clock, TimerOff } from 'lucide-react';
import { BASE_URL } from '../../utils/constants';
import { useAuth } from '@contexts/AuthContext';
import toast from 'react-hot-toast';
import { EventSourceWithAuth } from '../../utils/general';
import { useDispatch, useSelector } from 'react-redux';
import { updateOnlineUsers } from '../../store/reducers/onlineUsers';

function DashboardCards() {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const { sseData } = useSelector(state => state.onlineUsers);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    // Create and connect to EventSource
    const eventSource = new EventSourceWithAuth(`${BASE_URL}/sse/admin`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Store the reference to clean up later
    eventSourceRef.current = eventSource;
    
    // Connect to the server
    eventSource.connect();
    
    // Add event listeners
    eventSource.addEventListener('open', () => {
      console.log('SSE connection opened');
    });
    
    eventSource.addEventListener('activity', (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data) {
          // Dispatch the action to update Redux store
          dispatch(updateOnlineUsers(data));
        }
      } catch (error) {
        console.error('Error parsing activity data:', error);
      }
    });
    
    eventSource.addEventListener('error', (err) => {
      console.error('SSE error:', err);
      toast.error(err.data?.message || 'Connection error occurred');
    });
    
    // Clean up function to close the connection when component unmounts
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log('SSE connection closed');
      }
    };
  }, [token, dispatch]); // Re-connect if token changes or dispatch function changes
  // Helper function to format time based on duration
  const formatTime = (seconds) => {
    // Constants for time conversions
    const SECONDS_IN_MINUTE = 60;
    const SECONDS_IN_HOUR = 3600;
    const SECONDS_IN_DAY = 86400;
    const SECONDS_IN_WEEK = 604800;
    const SECONDS_IN_MONTH = 2592000; // Approximation: 30 days
    
    // If more than 99 days (8,553,600 seconds)
    if (seconds >= 99 * SECONDS_IN_DAY) {
      // Option 1: Show in months and weeks
      const months = Math.floor(seconds / SECONDS_IN_MONTH);
      const remainingSeconds = seconds % SECONDS_IN_MONTH;
      const weeks = Math.floor(remainingSeconds / SECONDS_IN_WEEK);
      
      if (months > 0 && weeks > 0) {
        return `${months}mo ${weeks}w`;
      } else if (months > 0) {
        return `${months}mo`;
      } else {
        // Fallback to weeks and days if months is 0
        const weeks = Math.floor(seconds / SECONDS_IN_WEEK);
        const remainingSeconds = seconds % SECONDS_IN_WEEK;
        const days = Math.floor(remainingSeconds / SECONDS_IN_DAY);
        return `${weeks}w ${days}d`;
      }
    }
    // If more than 99 hours (356,400 seconds)
    else if (seconds >= 99 * SECONDS_IN_HOUR) {
      const days = Math.floor(seconds / SECONDS_IN_DAY);
      const remainingSeconds = seconds % SECONDS_IN_DAY;
      const hours = Math.floor(remainingSeconds / SECONDS_IN_HOUR);
      
      return `${days}d ${hours}h`;
    }
    // Default: hours and minutes
    else {
      const hours = Math.floor(seconds / SECONDS_IN_HOUR);
      const minutes = Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
      
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      } else {
        return `${minutes}m`;
      }
    }
  };

  // Calculate metrics from sseData
  const calculateMetrics = () => {
    if (!sseData || !Array.isArray(sseData)) {
      return {
        totalUsers: 0,
        activeUsers: 0,
        totalActiveTimeSeconds: 0,
        totalBreakTimeSeconds: 0
      };
    }

    const totalUsers = sseData.length;
    const activeUsers = sseData.filter(user => user.isActive).length;
    
    // Calculate total active time in seconds
    const totalActiveTimeSeconds = sseData.reduce((sum, user) => {
      return sum + (user.totalTimeActive || 0);
    }, 0);
    
    // Calculate total break time in seconds
    const totalBreakTimeSeconds = sseData.reduce((sum, user) => {
      return sum + (user.totalBreakTime || 0);
    }, 0);

    return {
      totalUsers,
      activeUsers,
      totalActiveTimeSeconds,
      totalBreakTimeSeconds
    };
  };

  const { totalUsers, activeUsers, totalActiveTimeSeconds, totalBreakTimeSeconds } = calculateMetrics();
  
  // Format the time values
  const formattedActiveTime = formatTime(totalActiveTimeSeconds);
  const formattedBreakTime = formatTime(totalBreakTimeSeconds);

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 ">
        <UniCard 
          title="Total Employees" 
          value={totalUsers}
          icon={UsersRound}
        />
        <UniCard 
          title="Active Now" 
          value={activeUsers}
          icon={UserCheck}
        />
        <UniCard 
          title="Total Active Time" 
          value={formattedActiveTime}
          icon={Clock}
        />
        <UniCard 
          title="Total Break Time" 
          value={formattedBreakTime}
          icon={TimerOff}
        />
      </div>
    </div>
  )
}

export default DashboardCards
