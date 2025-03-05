import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import ScreenCard from '../../../screenshots/ScreenCard';
import UniPagination from '../../../../components/UniPagination';
import { getAllPhotos } from '../../../../store/reducers/photos';
import { IMAGE_URL } from '../../../../utils/constants';
import Loading from '../../../../components/Loading';
import NoDataMsg from '../../../../components/NoDataMsg';
import { useAuth } from '../../../../contexts/AuthContext';
import { useParams } from 'react-router-dom';

function DailyScreenShots({ activeDay, userId }) {
  const dispatch = useDispatch();
  const { photos, loading, error, pagination } = useSelector((state) => state.photos);
  const {id} = useParams()
  const { token } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (activeDay && token) {
      // Use the activeDay for API request
      const startDate = activeDay;
      const endDate = activeDay;
      
      dispatch(getAllPhotos({
        token,
        page: currentPage,
        limit: 20,
        userId: userId, // Use the userId passed as prop or from the URL
        startDate,
        endDate ,
        userId:id
      }));
    }
  }, [dispatch, activeDay, token, currentPage, userId]);

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
    <div className="overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {photos.map(photo => (
          <ScreenCard
            key={photo._id}
            screenshot={`${IMAGE_URL}/${photo.filename}`}
            user={{
              name: photo.userId?.userId?.fullName,
              avatar: null
            }}
            type={photo.deviceId ? 'Desktop Screenshot' : 'Mobile Screenshot'}
            timestamp={formatTimestamp(photo.timestamp)}
            showName={false}
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

export default DailyScreenShots
