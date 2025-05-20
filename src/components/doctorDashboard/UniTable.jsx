import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { X, Check, Search, ChevronLeft, ChevronRight } from 'lucide-react';

function UniTable({ data = defaultData }) {
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
    if (path.startsWith('/src')) {
      return path.substring(1);
    }
    return path;
  };

  return (
    <div className="px-4 py-6" data-aos="fade-up" data-aos-delay="200">
      <div className="border border-borderColor rounded-3xl shadow-lg overflow-hidden ">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-text">Appointments</h2>
          
          {/* Search bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search appointments..." 
              className="pl-10 pr-4 py-2 rounded-full bg-transparent border border-borderColor focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-placeholderText" size={18} />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: colorRef.current.primary }}>
                <th className="py-4 px-6 text-left text-text font-semibold">Patient Name</th>
                <th className="py-4 px-6 text-left text-text font-semibold">ID</th>
                <th className="py-4 px-6 text-left text-text font-semibold">Age / Gender</th>
                <th className="py-4 px-6 text-left text-text font-semibold">Diagnosis</th>
                <th className="py-4 px-6 text-left text-text font-semibold">Type</th>
                <th className="py-4 px-6 text-left text-text font-semibold">Actions</th>
                <th className="py-4 px-6 text-left text-text font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((appointment, index) => (
                <tr 
                  key={`appointment-${index}`}
                  className="border-t border-borderColor hover:bg-altPrimary transition-colors"
                >
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                      <img 
                        src={getImagePath(appointment.patientImage)} 
                        alt={appointment.patientName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{appointment.patientName}</span>
                  </td>
                  <td className="py-4 px-6 text-text">{appointment.id}</td>
                  <td className="py-4 px-6 text-text">{appointment.age} / {appointment.gender}</td>
                  <td className="py-4 px-6 text-text">{appointment.diagnosis}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                      {appointment.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <button 
                        className="w-8 h-8 rounded-full flex items-center justify-center border border-borderColor hover:bg-red-50 hover:border-red-200 transition-colors group"
                        aria-label="Cancel appointment"
                      >
                        <X size={18} className="text-hoverText group-hover:text-red-500 transition-colors" />
                      </button>
                      <button 
                        className="w-8 h-8 rounded-full flex items-center justify-center border border-borderColor hover:bg-green-50 hover:border-green-200 transition-colors group"
                        aria-label="Confirm appointment"
                      >
                        <Check size={18} className="text-hoverText group-hover:text-green-500 transition-colors" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-text">{appointment.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
       
      </div>
    </div>
  );
}

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
