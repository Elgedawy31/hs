import React from 'react';
import UniHeading from '../UniHeading';
import { useTheme } from '../../contexts/ThemeContext';

// Import doctor images
import doctor1 from '../../assets/Images/doctor-1.svg';
import doctor2 from '../../assets/Images/doctor-2.svg';
import doctor3 from '../../assets/Images/doctor-3.svg';

function Doctors() {
  const { theme } = useTheme();

  const doctors = [
    {
      id: 1,
      image: doctor1,
      name: 'Dr. Malak Mohamed',
      description: 'A highly experienced dermatologist specializing in advanced skin treatments, providing personalized care for every patient.'
    },
    {
      id: 2,
      image: doctor2,
      name: 'Dr. Karim Salah',
      description: 'Known for expertise in diagnosing and treating complex skin conditions with the latest medical innovations.'
    },
    {
      id: 3,
      image: doctor3,
      name: 'Dr. Hana Magdy',
      description: 'Brings years of expertise in medical and cosmetic dermatology to provide exceptional care.'
    }
  ];

  return (
    <section className="py-16 px-4">
      <UniHeading title="Expert Dermatologists" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="flex flex-col">
            <div className="mb-4">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-[350px] object-cover"
              />
            </div>
            
            <h3 
              className="text-2xl font-medium mb-2"
              style={{ 
                color: theme.text,
                fontFamily: 'Montaga, serif'
              }}
            >
              {doctor.name}
            </h3>
            
            <p 
              className="text-base mb-4"
              style={{ color: theme.text }}
            >
              {doctor.description}
            </p>
            
            <button 
              className="mt-auto py-2 px-6 rounded-md shadow-md w-full text-center"
              style={{ 
                backgroundColor: theme.altPrimary,
                color: theme.text,
                border: `1px solid ${theme.borderColor}`
              }}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Doctors;
