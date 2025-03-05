import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser, resetUsersState } from '../../../store/reducers/users';
import { useAuth } from '../../../contexts/AuthContext';
import UniTable from '@components/UniTable';
import UniHeading from '@components/UniHeading';
import UniCard from '@components/UniCard';
import { UsersRound, UserCheck, Briefcase, Building2 } from 'lucide-react';
import CardContainer from '@components/CardContainer';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from '@components/DeleteConfirmation';
import Loading from '../../../components/Loading';
import NoDataMsg from '../../../components/NoDataMsg';
import UniPagination from '../../../components/UniPagination';

export default function Employees() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Get users data from Redux store
  const { users, loading, error, count, isDeleted } = useSelector((state) => state.users);
  
  // Fetch users on component mount
  useEffect(() => {
    if (token) {
      dispatch(getAllUsers({ token, page: currentPage, limit }));
    }
  }, [dispatch, token, currentPage, limit]);
  
  // Reset state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetUsersState());
    };
  }, [dispatch]);
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // Reset state after successful deletion
  useEffect(() => {
    if (isDeleted) {
      dispatch(resetUsersState());
      dispatch(getAllUsers({ token, page: currentPage, limit }));
    }
  }, [isDeleted, dispatch, token, currentPage, limit]);

  // Column definitions
  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      size: 200,
      cell: ({ row }) => {
        const name = row.original.userId?.fullName;
        return name ? name : 'N/A';
      }
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 200,
      cell: ({ row }) => {
        return row.original.userId?.email || 'N/A';
      }
    },
    {
      accessorKey: 'role',
      header: 'Role',
      size: 120,
      cell: ({ row }) => {
        return row.original.userId?.role || 'N/A';
      }
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      size: 120,
      cell: ({ row }) => {
        const isActive = row.original?.isActive || false;
        return (
          <span className={isActive ? 'text-green-500' : 'text-red-500'}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
    {
      accessorKey: 'dailyWorkingHours',
      header: 'Daily Hours',
      size: 150,
    },
    {
      accessorKey: 'paymentInterval',
      header: 'Payment',
      size: 120,
    }
  ];

  // Action menu items
  const handleDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete && token) {
      dispatch(deleteUser({ userId: employeeToDelete._id || employeeToDelete.userId?._id, token }));
    }
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  const actions = [
    {
      label: 'Edit',
      onClick: (row) => {
       navigate('edit/'+(row._id || row.userId?._id))
      },
    },
    {
      label: 'Details',
      onClick: (row) => {
        console.log('Viewing details for:', row);
        navigate(`${row._id || row.userId?._id}`)
      },
    },
    {
      label: 'Delete',
      onClick: (row) => {
        handleDelete(row);
      },
    },
  ];

  // Handle row selection
  const handleRowSelect = (selectedRows) => {
    console.log('Selected rows:', selectedRows);
  };
  const handleClick = () => {
   navigate('new')
  }

  return (
    <div className=" space-y-6">
      <UniHeading icon={UsersRound} text="Employees Overview" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <UniCard 
          title="Total Employees" 
          value={count || 0}
          icon={UsersRound}
        />
        <UniCard 
          title="Active Now" 
          value={users?.filter(user => user?.isActive )?.length || 0}
          icon={UserCheck}
        />
        <UniCard 
          title="On Leave" 
          value={users?.filter(user => !user.isActive )?.length || 0}
          icon={Briefcase}
        />
        <UniCard 
          title="Working Days" 
          value={users?.[0]?.weeklyWorkingDays || 5}
          icon={Building2}
        />
      </div>

      <UniHeading icon={UsersRound} text="All Employees" showButton buttonText='Add New Emplyee' onButtonClick={handleClick} />

      <CardContainer>
        {loading ? (
         <Loading />
        ) : error ? (
         <NoDataMsg title="Failed to load employees" description="An error occurred while loading employees. Please try again later." />
        ) : (
          <>
            <UniTable
              columns={columns}
              data={users || []}
              actions={actions}
              onRowSelect={handleRowSelect}
            />
            <div className="mt-4 flex justify-center">
              <UniPagination
                currentPage={currentPage}
                totalPages={Math.ceil(count / limit)}
                onPageChange={handlePageChange}
                color="primary"
                size="md"
              />
            </div>
          </>
        )}
      </CardContainer>

      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        folderName={employeeToDelete?.userId?.name?.first + ' ' + employeeToDelete?.userId?.name?.last}
        title="Delete Employee"
      />
    </div>
  );
}
