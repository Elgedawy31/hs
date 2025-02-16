import React, { useState } from 'react';
import UniTable from '../../components/UniTable';
import UniHeading from '../../components/UniHeading';
import { Users} from 'lucide-react';
import CardContainer from '../../components/CardContainer';

function AllPays() {
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
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',

    },
    {
        id: 2,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
        id: 4,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
        id: 5,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
        id: 6,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
        id: 7,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',

    },
    {
        id: 8,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
        id: 9,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
        id: 10,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
      
    },
    {
        id: 11,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
        id: 12,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
      id: 13,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
      id: 14,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
      id: 15,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
      id: 16,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
      id: 17,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
    },
    {
      id: 18,
        name: 'John Doe',
        position: 'UI/UX',
        salary: '20000 Egp',
        overTime: '24',
        bouns:'1480 Egp',
        totalSalary:'21480 Egp',
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
      accessorKey: 'position',
      header: 'Position ',
      size: 150,
    },
    {
      accessorKey: 'salary',
      header: 'Salary' ,
      size: 150,
    },
    {
      accessorKey: 'overTime',
      header: 'Over Time',
      size: 120,
    }, 
    {
      accessorKey: 'bouns',
      header: 'Bouns',
      size: 120,
    },
    {
      accessorKey: 'totalSalary',
      header: 'Total Salary',
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
    <UniHeading icon={Users} text="All Payments"  />

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

export default AllPays;