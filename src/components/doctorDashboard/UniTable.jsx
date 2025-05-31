import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { X, Check, Search, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

function UniTable({ 
  data = defaultData, 
  headers = defaultHeaders, 
  columnMappings = defaultColumnMappings,
  title = "Appointments"
}) {
  const { theme } = useTheme();
  
  // Create a ref for colors to optimize rendering
  const colorRef = useRef({
    primary: theme.primary,
    borderColor: theme.borderColor,
    text: theme.text,
    background: theme.background
  });

  // Update color ref when theme changes
  useEffect(() => {
    colorRef.current = {
      primary: theme.primary,
      borderColor: theme.borderColor,
      text: theme.text,
      background: theme.background
    };
  }, [theme]);

  // Fix image paths by removing the leading slash if it exists
  const getImagePath = (path) => {
    if (path && path.startsWith('/src')) {
      return path.substring(1);
    }
    return path;
  };

  // Render cell content based on column type
  const renderCellContent = (item, mapping, index) => {
    switch (mapping.type) {
      case 'patientName':
        return (
          <div className="flex items-center gap-3">
            {item[mapping.imageField] && (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                <img 
                  src={getImagePath(item[mapping.imageField])} 
                  alt={item[mapping.field]} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <span className="font-medium">{item[mapping.field]}</span>
          </div>
        );
      
      case 'status':
        return (
          <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
            {item[mapping.field]}
          </span>
        );
      
      case 'actions':
        return (
          <div className="flex items-center gap-4">
            {mapping.actionType === 'buttons' ? (
              <>
                <button 
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-borderColor hover:bg-red-50 hover:border-red-200 transition-colors group"
                  aria-label="Cancel"
                >
                  <X size={18} className="text-hoverText group-hover:text-red-500 transition-colors" />
                </button>
                <button 
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-borderColor hover:bg-green-50 hover:border-green-200 transition-colors group"
                  aria-label="Confirm"
                >
                  <Check size={18} className="text-hoverText group-hover:text-green-500 transition-colors" />
                </button>
              </>
            ) : (
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={20} />
              </button>
            )}
          </div>
        );
      
      case 'combined':
        return `${item[mapping.field1]} / ${item[mapping.field2]}`;
      
      case 'text':
      default:
        return item[mapping.field];
    }
  };

  return (
    <div className="" data-aos="fade-up" data-aos-delay="200">
      <div className="border border-borderColor rounded-3xl shadow-lg overflow-hidden ">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-text">{title}</h2>
          
          {/* Search bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 rounded-full bg-transparent border border-borderColor focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-placeholderText" size={18} />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: colorRef.current.primary }}>
                {headers.map((header, index) => (
                  <th key={index} className="py-4 px-6 text-left text-text capitalize font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr 
                  key={`row-${index}`}
                  className="border-t border-borderColor hover:bg-altPrimary transition-colors"
                >
                  {columnMappings.map((mapping, colIndex) => (
                    <td key={colIndex} className="py-4 px-6 text-text">
                      {renderCellContent(item, mapping, index)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Default headers if none are provided
const defaultHeaders = [
  'Patient Name',
  'ID',
  'Age / Gender',
  'Diagnosis',
  'Type',
  'Actions',
  'Time'
];

// Default column mappings - defines how to render each column
const defaultColumnMappings = [
  { type: 'patientName', field: 'patientName', imageField: 'patientImage' },
  { type: 'text', field: 'id' },
  { type: 'combined', field1: 'age', field2: 'gender' },
  { type: 'text', field: 'diagnosis' },
  { type: 'status', field: 'type' },
  { type: 'actions', actionType: 'buttons' },
  { type: 'text', field: 'time' }
];

// Default data if none is provided
const defaultData = [
  {
    patientName: 'Jane Smith',
    patientImage: '/src/assets/Images/Amira.jpg',
    id: '001',
    age: '32',
    gender: 'Female',
    diagnosis: 'Alphaviruses',
    type: 'General',
    time: '11:00 AM'
  },
  {
    patientName: 'Jane Smith',
    patientImage: '/src/assets/Images/Amira.jpg',
    id: '001',
    age: '32',
    gender: 'Female',
    diagnosis: 'Alphaviruses',
    type: 'General',
    time: '11:00 AM'
  },
  {
    patientName: 'Jane Smith',
    patientImage: '/src/assets/Images/Amira.jpg',
    id: '001',
    age: '32',
    gender: 'Female',
    diagnosis: 'Alphaviruses',
    type: 'General',
    time: '11:00 AM'
  },
  {
    patientName: 'Jane Smith',
    patientImage: '/src/assets/Images/Amira.jpg',
    id: '001',
    age: '32',
    gender: 'Female',
    diagnosis: 'Alphaviruses',
    type: 'General',
    time: '11:00 AM'
  },
  {
    patientName: 'Jane Smith',
    patientImage: '/src/assets/Images/Amira.jpg',
    id: '001',
    age: '32',
    gender: 'Female',
    diagnosis: 'Alphaviruses',
    type: 'General',
    time: '11:00 AM'
  }
];

export default UniTable;
