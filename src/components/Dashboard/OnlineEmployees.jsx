import React, { useState } from 'react';
import UniTable from '../UniTable';
import UniHeading from '../UniHeading';
import { UsersRound} from 'lucide-react';
import CardContainer from '../CardContainer';

function OnlineEmployees() {
  const [selectedRows, setSelectedRows] = useState([]);
  
    const handleCheckboxChange = (id) => {
      setSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
      );
    };
     const data = [
    {
      id: 1,
      name: 'Nouran Khaled',
      status: 'Idle',
      hoursToday: '6H 30M',
      productiveHours: '7 h',
    },
    {
      id: 2,
      name: 'John Doe',
      status: 'Active',
      hoursToday: '5H 45M',
      productiveHours: '5 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Idle',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Active',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Active',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Active',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Idle',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Idle',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Idle',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Idle',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Active',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Idle',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Idle',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Active',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Active',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Active',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Active',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
  ];

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

  // Action menu items
  const actions = [
    {
      label: 'Edit',
      onClick: (row) => {
        console.log('Edit:', row);
      },
    },
    {
      label: 'Delete',
      onClick: (row) => {
        console.log('Delete:', row);
      },
    },
    {
      label: 'View Details',
      onClick: (row) => {
        console.log('View Details:', row);
      },
    },
  ];

  const handleRowSelect = (selectedRows) => {
  };
  
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