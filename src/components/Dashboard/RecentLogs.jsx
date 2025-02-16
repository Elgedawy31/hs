import React, { useState } from 'react';
import UniTable from '../../components/UniTable';
import UniHeading from '../../components/UniHeading';
import { Clock8Icon} from 'lucide-react';
import CardContainer from '../../components/CardContainer';

function RecentLogs() {
     const [selectedRows, setSelectedRows] = useState([]);
  
    const handleCheckboxChange = (id) => {
      setSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
      );
    };
     const data = [
    {
      id: 1,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Screenshot',
      description:'User is now active'
    },
    {
      id: 2,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Screenshot',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Login',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Login',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Login',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Login',
      description:'User is now active'

    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Screenshot',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Screenshot',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Screenshot',
      description:'User is now active'
      
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Login',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Login',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Login',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Login',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Login',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Login',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Screenshot',
      description:'User is now active'
    },
    {
      id: 3,
      name: 'John Doe',
      ipAddress: '30/1 8:30',
      timeStemp: '30/1 8:30',
      type: 'Screenshot',
      description:'User is now active'
    },
  ];

  // Column definitions
  const columns = [
    {
      accessorKey: 'select',
      header: '',
      size: 50,
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.original.id)}
          onChange={() => handleCheckboxChange(row.original.id)}
        />
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      size: 200,
    },
    
    {
      accessorKey: 'timeStemp',
      header: 'Hours Today',
      size: 150,
    },
    {
      accessorKey: 'ipAddress',
      header: 'Ip Address',
      size: 150,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      size: 120,
    }, 
    {
      accessorKey: 'description',
      header: 'Description',
      size: 120,
    },
  ];

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
    <div className=''>
    <UniHeading icon={Clock8Icon} text="Recent Logs"  />

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

export default RecentLogs