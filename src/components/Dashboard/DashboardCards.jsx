import React, { useEffect, useRef } from 'react';
import UniCard from '../UniCard';
import { UsersRound, UserCheck, MailIcon, FileChartLineIcon } from 'lucide-react';
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
   console.log(sseData)
  return (
    <div className="p-4 space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <UniCard 
          title="Total Employees" 
          value="50"
          icon={UsersRound}
        />
        <UniCard 
          title="Active Now" 
          value={0}
          icon={UserCheck}
        />
        <UniCard 
          title="MTD / CH" 
          value="680"
          icon={MailIcon}
        />
        <UniCard 
          title="Bouns This Month" 
          value="$ 2,500"
          icon={FileChartLineIcon}
        />
      </div>

     
    </div>
  )
}

export default DashboardCards
