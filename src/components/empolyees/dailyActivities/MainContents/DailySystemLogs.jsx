import React from 'react';
import UniTable from '@components/UniTable';
import CardContainer from '@components/CardContainer';

export default function DailySystemLogs() {
  // Sample data based on the image
  const data = [
    {
      id: 1,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Screenshot',
      description: 'User is now active'
    },
    {
      id: 2,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Login',
      description: 'User is now active'
    },
    {
      id: 3,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Screenshot',
      description: 'User is now active'
    },
    {
      id: 4,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
    {
      id: 5,
      name: 'Nouran Khaled',
      ipAddress: '30/1 8:30',
      timeStamp: '30/1 8:30',
      type: 'Using App',
      description: 'User is now active'
    },
  ];

  // Column definitions
  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      size: 150,
    },
    {
      accessorKey: 'ipAddress',
      header: 'Ip address',
      size: 150,
    },
    {
      accessorKey: 'timeStamp',
      header: 'Time stamp',
      size: 150,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      size: 150,
      cell: ({ row }) => {
        const type = row.original.type;
        const colors = {
          Screenshot: 'text-blue-500',
          Login: 'text-green-500',
          'Using App': 'text-purple-500'
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
        // handleDelete(row);
      },
    },
    
  ];
  return (
    <CardContainer>
      <UniTable
        columns={columns}
        data={data}
        actions={actions}
      />
    </CardContainer>
  );
}
