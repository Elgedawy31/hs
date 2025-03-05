import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@contexts/AuthContext';
import { getAppStats } from '../../../../store/reducers/apps';
import CardContainer from '@components/CardContainer';
import Loading from '@components/Loading';
import { LayoutGrid } from 'lucide-react';
import NoDataMsg from '@components/NoDataMsg';
import dayjs from 'dayjs';

function TrackingAppTab({ activeDay }) {
  const dispatch = useDispatch();
  const { apps, loading, error } = useSelector(state => state.apps);
  const { user, token } = useAuth();
  
  useEffect(() => {
    const from = activeDay;
    const to = activeDay;
    
    dispatch(getAppStats({ 
      token, 
      from, 
      to, 
      userId: user.id 
    }))
  }, [dispatch, token, user.id, activeDay]);
  
  // Function to convert seconds to hours:minutes:seconds format
  const formatTimeDisplay = (seconds) => {
    if (!seconds) return "0s";
    
    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const remainingSeconds = seconds % 60;
    
    // If we have hours, show hours and minutes
    if (hours > 0) {
      return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
    }
    
    // If we have minutes but no hours, show minutes and seconds
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds.toString().padStart(2, '0')}s`;
    }
    
    // If we have only seconds, show just seconds
    return `${remainingSeconds}s`;
  };

  return (
    <>
      {loading ? (
        <Loading className='min-h-[50vh]' />
      ) : (
        <div className={apps?.length >0 && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {apps && apps.length > 0 ? (
            apps.map((app, index) => (
              <CardContainer
                className={'rounded-xl p-6'}
                key={index}
              >
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-9 h-9 text-primary" />
                  <h3 className="text-placeholderText font-medium">{app.appName}</h3>
                </div>

                <div className="flex-1">
                  <p className="text-text text-2xl font-semibold mt-3">
                    {formatTimeDisplay(app.timeSpent)}
                  </p>
                </div>
              </CardContainer>
            ))
          ) : (
          <NoDataMsg />
          )}
        </div>
      )}
    </>
  );
}

export default TrackingAppTab;
