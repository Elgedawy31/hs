import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import ScreenCard from '@components/screenshots/ScreenCard';
import UniPagination from '@components/UniPagination';
import { getAllPhotos } from '@store/reducers/photos';
import { IMAGE_URL } from '@utils/constants';
import Loading from '@components/Loading';
import NoDataMsg from '@components/NoDataMsg';
import { useAuth } from '../../../../contexts/AuthContext';

function TrackingScreenshots({ activeDay }) {
  const dispatch = useDispatch();
  const { photos, loading, error, pagination } = useSelector((state) => state.photos);
  const { token, user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (activeDay && token) {
      // Format the activeDay to ISO string for API
      const startDate = dayjs(activeDay).startOf('day').toISOString();
      const endDate = dayjs(activeDay).endOf('day').toISOString();
      
      dispatch(getAllPhotos({
        token,
        page: currentPage,
        limit: 20,
        userId: user?._id,
        startDate,
        endDate
      }));
    }
  }, [dispatch, activeDay, token, currentPage, user]);

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
    return <Loading />;
  }

  if (error) {
    return <NoDataMsg message={error} />;
  }

  if (!photos || photos.length === 0) {
    return <NoDataMsg message="No screenshots available for this day" />;
  }

  return (
    <div className="mt-6 h-[calc(100vh-140px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map(photo => (
          <ScreenCard
            showName={false}
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
  );
}

export default TrackingScreenshots;
