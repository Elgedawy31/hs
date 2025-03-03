import React, { useEffect, useState } from 'react';
import { Focus, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import UniHeading from '@components/UniHeading';
import ScreenCard from '@components/screenshots/ScreenCard';
import UniPagination from '@components/UniPagination';
import UniDateRangePicker from '@components/UniDateRangePicker';
import { getAllPhotos } from '@store/reducers/photos';
import { IMAGE_URL } from '@utils/constants';
import Loading from '@components/Loading';
import NoDataMsg from '@components/NoDataMsg';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { parseDate } from '@internationalized/date';

export default function Screenshots() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { photos, loading, error, pagination } = useSelector((state) => state.photos);
  const { token } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Initialize date range with today's date
  const today = parseDate(dayjs().format('YYYY-MM-DD'));
  const [dateRange, setDateRange] = useState({
    start: today,
    end: today
  });

  useEffect(() => {
    if (token) {
      // Format dates as MM-DD-YYYY for API
      const startDate = dayjs(dateRange.start.toString()).format('MM-DD-YYYY');
      const endDate = dayjs(dateRange.end.toString()).format('MM-DD-YYYY');
      
      dispatch(getAllPhotos({
        token,
        page: currentPage,
        limit: 20,
        startDate,
        endDate
      }));
    }
  }, [dispatch, token, currentPage, dateRange]);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setCurrentPage(1); // Reset to first page when date range changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Format timestamp to a readable format
  const formatTimestamp = (timestamp) => {
    try {
      return dayjs(timestamp).format('h:mm A');
    } catch (error) {
      return 'Unknown time';
    }
  };

  if (loading) {
    return (
      <div className="">
        <UniHeading icon={Focus} text="Screenshots" />
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="">
        <UniHeading icon={Focus} text="Screenshots" />
        <NoDataMsg message={error} />
      </div>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <div className="">
        <UniHeading icon={Focus} text="Screenshots" />
        <NoDataMsg message="No screenshots available for today" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <UniHeading icon={Focus} text="Screenshots" />
        <div className="w-72">
          <UniDateRangePicker
            label="Date Range"
            value={dateRange}
            onChange={handleDateRangeChange}
          />
        </div>
      </div>
      
      <div className="mt-6 h-[calc(100vh-180px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map(photo => (
            <ScreenCard
              key={photo._id}
              screenshot={`${IMAGE_URL}/${photo.filename}`}
              user={{
                name: photo.userId?.userId?.name?.first + ' ' + photo.userId?.userId?.name?.last,
                avatar: null
              }}
              type={photo.deviceId ? 'Desktop Screenshot' : 'Mobile Screenshot'}
              timestamp={formatTimestamp(photo.timestamp)}
            />
          ))}
        </div>
        
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <UniPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
