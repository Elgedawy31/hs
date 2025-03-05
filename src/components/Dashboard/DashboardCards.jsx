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
  // Helper function to format time in "Xh Ym" format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
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
