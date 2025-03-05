import React, { useState, useEffect } from 'react';
import UniTable from '../UniTable';
import UniHeading from '../UniHeading';
import { Clock8Icon } from 'lucide-react';
import CardContainer from '../CardContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLogs, deleteLog } from '../../store/reducers/logs';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../Loading';
import NoDataMsg from '../NoDataMsg';
import dayjs from 'dayjs';
import DeleteConfirmation from '../DeleteConfirmation';
import UniPagination from '@components/UniPagination';

function RecentLogs() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [logToDelete, setLogToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { logs, loading, error, pagination } = useSelector(state => state.logs);
  
  // Get today's date in YYYY-MM-DD format
  const today = dayjs().format('YYYY-MM-DD');
  
  useEffect(() => {
    // Fetch logs with today as both startDate and endDate
    dispatch(getAllLogs({
      token,
      page: currentPage,
      limit: 10,
      startDate: today,
      endDate: today
    }));
  }, [dispatch, token, currentPage, today]);
  
  
  // Format timestamp to a readable format
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return dayjs(timestamp).format('MM/DD HH:mm');
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (logToDelete) {
      dispatch(deleteLog({ logId: logToDelete._id, token }))
        .unwrap()
        .then(() => {
          setShowDeleteModal(false);
          setLogToDelete(null);
        })
        .catch(error => {
          console.error('Failed to delete log:', error);
          setShowDeleteModal(false);
          setLogToDelete(null);
        });
    }
  };

  // Column definitions
  const columns = [
    {
      accessorKey: 'userId.name.first',
      header: 'Name',
      size: 150,
      cell: ({ row }) => {
        return row.original.userId?.userId?.fullName || row.original.userId?.fullName || 'Unknown';
      }
    },
    {
      accessorKey: 'timestamp',
      header: 'Time',
      size: 150,
      cell: ({ row }) => formatTimestamp(row.original.timestamp),
    },
    {
      accessorKey: 'ipAddress',
      header: 'IP Address',
      size: 150,
    },
    {
      accessorKey: 'module',
      header: 'Type',
      size: 120,
      cell: ({ row }) => {
        const type = row.original.module;
        const colors = {
          screenshot: 'text-blue-500',
          login: 'text-green-500',
          activity: 'text-purple-500',
          access: 'text-yellow-500',
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

  const actions = [
    {
      label: 'Delete',
      onClick: (row) => {
        setLogToDelete(row);
        setShowDeleteModal(true);
      },
    },
  ];

  // Handle row selection
  const handleRowSelect = (selectedRows) => {
    setSelectedRows(selectedRows);
  };

  if (loading) {
    return (
      <div>
        <UniHeading icon={Clock8Icon} text="Recent Logs" />
        <CardContainer>
          <Loading className='min-h-[80vh]' />
        </CardContainer>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <UniHeading icon={Clock8Icon} text="Recent Logs" />
        <CardContainer>
          <NoDataMsg message={`Error loading logs: ${error}`} />
        </CardContainer>
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div>
        <UniHeading icon={Clock8Icon} text="Recent Logs" />
        <CardContainer>
          <NoDataMsg message="No logs found for today" />
        </CardContainer>
      </div>
    );
  }

  return (
    <div className=''>
      <UniHeading icon={Clock8Icon} text="Recent Logs" />

      <CardContainer>
        <UniTable
          columns={columns}
          data={logs}
          actions={actions}
          onRowSelect={handleRowSelect}
        />
      </CardContainer>
  {pagination.totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <UniPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmation
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setLogToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Delete Log"
          message="Are you sure you want to delete this log? This action cannot be undone."
        />
      )}
    </div>
  );
}

export default RecentLogs;
