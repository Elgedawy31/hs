import React, { useEffect, useState } from 'react';
import UniTable from '@components/UniTable';
import CardContainer from '@components/CardContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLogs } from '../../../../store/reducers/logs';
import { useAuth } from '../../../../contexts/AuthContext';
import Loading from '@components/Loading';
import UniPagination from '@components/UniPagination';
import dayjs from 'dayjs';
import NoDataMsg from '@components/NoDataMsg';

export default function TrackingSystemLogs({ activeDay }) {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { logs, loading, error, pagination } = useSelector(state => state.logs);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Reset to first page when activeDay changes
    setCurrentPage(1);
  }, [activeDay]);

  useEffect(() => {
    // Fetch logs with activeDay as both startDate and endDate
    dispatch(getAllLogs({
      token,
      page: currentPage,
      limit: 10,
      startDate: activeDay,
      endDate: activeDay
    }));
  }, [dispatch, token, activeDay, currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Format timestamp to a readable format
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return dayjs(timestamp).format('MM/DD HH:mm');
  };

  // Column definitions
  const columns = [
    {
      accessorKey: 'userId.name.first',
      header: 'Name',
      size: 150,
      cell: ({ row }) => {
        console.log(row)
        const firstName = row.original.userId?.userId?.name?.first || '';
        const lastName = row.original.userId?.userId?.name?.last || '';
        return `${firstName} ${lastName}`;
      }
    },
    {
      accessorKey: 'ipAddress',
      header: 'IP Address',
      size: 150,
    },
    {
      accessorKey: 'timestamp',
      header: 'Time stamp',
      size: 150,
      cell: ({ row }) => formatTimestamp(row.original.timestamp),
    },
    {
      accessorKey: 'module',
      header: 'Type',
      size: 150,
      cell: ({ row }) => {
        const type = row.original.module;
        const colors = {
          screenshot: 'text-blue-500',
          login: 'text-green-500',
          activity: 'text-purple-500',
          access:'text-yellow-500',
        };
        return (
          <span className={colors[type] || 'text-gray-500'}>
            {type}
          </span>
        );
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
      size: 200,
    },
  ];

  if (loading) {
    return <Loading className='min-h-[50vh]' />;
  }

  if (error) {
    return <NoDataMsg message={`Error loading logs: ${error}`} />;
  }

  if (!logs || logs.length === 0) {
    return <NoDataMsg message="No logs found for this day" />;
  }

  return (
    <CardContainer>
      <UniTable
        columns={columns}
        data={logs}
        actions={[]}
      />
      {pagination.totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <UniPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </CardContainer>
  );
}
