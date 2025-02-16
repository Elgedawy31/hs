import React, { useState } from 'react';
import UniTable from '../../components/UniTable';
import UniHeading from '../../components/UniHeading';
import UniCard from '../../components/UniCard';
import { UsersRound, UserCheck, Briefcase, Building2 } from 'lucide-react';
import CardContainer from '../../components/CardContainer';
import { useNavigate } from 'react-router-dom';

export default function Employees() {
  const navigate = useNavigate();
  // Sample data
  const data = [
    {
      id: 1,
      name: 'Nouran Khaled',
      status: 'Break',
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
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
      hoursToday: '2H 15M',
      productiveHours: '2 h',
    },
    {
      id: 3,
      name: 'Jane Smith',
      status: 'Inactive',
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
          Inactive: 'text-red-500',
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
          value="50"
          icon={UsersRound}
        />
        <UniCard 
          title="Active Now" 
          value="4"
          icon={UserCheck}
        />
        <UniCard 
          title="On Leave" 
          value="5"
          icon={Briefcase}
        />
        <UniCard 
          title="Departments" 
          value="4"
          icon={Building2}
        />
      </div>

      <UniHeading icon={UsersRound} text="All Employees" showButton buttonText='Add New Emplyee' onButtonClick={handleClick} />

      <CardContainer>
      <UniTable
        columns={columns}
        data={data}
        actions={actions}
        onRowSelect={handleRowSelect}
      />
      </CardContainer>
    </div>
  );
}
