import React from 'react';
import UniTable from '../UniTable';
import UniHeading from '../UniHeading';
import { UsersRound } from 'lucide-react';
import CardContainer from '../CardContainer';
import { useSelector } from 'react-redux';

function OnlineEmployees() {
  // Get sseData from Redux store
  const { sseData } = useSelector(state => state.onlineUsers);
  
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
  
  // Transform sseData into the format expected by the table
  const data = Array.isArray(sseData) ? sseData.map(user => {
    // Extract email username (before @)
    const name = user.email ? user.email.split('@')[0].replace('.',' ') : 'Unknown';
    
    return {
      id: user.id,
      name: name,
      status: user.isActive ? 'Active' : user.inBreak ? 'Break' : 'Idle',
      hoursToday: formatTime(user.totalTimeLogged || 0),
      productiveHours: formatTime((user.totalTimeActive || 0) )
    };
  }) : [];

  // Column definitions
  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      size: 200,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 120,
      cell: ({ row }) => {
        const status = row.original.status;
        const colors = {
          Break: 'text-orange-500',
          Active: 'text-green-500',
          Idle: 'text-red-500',
        };
        return (
          <span className={colors[status]}>
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: 'hoursToday',
      header: 'Hours Today',
      size: 150,
    },
    {
      accessorKey: 'productiveHours',
      header: 'Productive hours',
      size: 150,
    },
  ];

  // No actions as per user request
  const actions = [];

  const handleRowSelect = () => {
    // No action handling as per user request
  };
  console.log(sseData)
  return (
    <div className=''>
    <UniHeading icon={UsersRound} text="Online Employees"  />

    <CardContainer>
      <UniTable
        columns={columns}
        data={data}
        actions={actions}
        onRowSelect={handleRowSelect}
      />
      </CardContainer>

    </div>
  )
}

export default OnlineEmployees
