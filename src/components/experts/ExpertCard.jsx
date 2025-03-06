import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Star, Calendar } from 'lucide-react';

const ExpertCard = ({ expert }) => {
  const { theme } = useTheme();
  
  // Render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4"
            fill={i < rating ? theme.primary : "none"}
            stroke={theme.primary}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
      style={{ 
        backgroundColor: theme.background,
        borderColor: theme.borderColor
      }}
    >
      <div className="p-4">
        <div className="flex flex-col items-center">
          <img
            src={expert.image}
            alt={expert.name}
            className="w-32 h-32 object-cover rounded-lg mb-4"
          />
          
          <h3 
            className="font-semibold text-lg mb-2 text-center" 
            style={{ color: theme.primary }}
          >
            {expert.name}
          </h3>
          
          {expert.specializations.map((specialization, index) => (
            <span 
              key={index}
              className="text-sm mb-1 text-center"
              style={{ color: theme.text }}
            >
              {specialization}
            </span>
          ))}
          
          <div className="mt-3 flex items-center">
            <span className="text-sm" style={{ color: theme.text }}>
              {expert.experience} years experience
            </span>
          </div>
          
          <div className="mt-2 flex items-center">
            <span className="text-sm" style={{ color: theme.text }}>
              {expert.languages.map((lang, i) => (
                <span key={i}>
                  {i > 0 && ' & '}{lang}
                </span>
              ))}
            </span>
          </div>
          
          <div className="mt-2 flex items-center">
            <Calendar className="w-4 h-4 mr-1" style={{ color: theme.placeholderText }} />
            <span className="text-sm" style={{ color: theme.placeholderText }}>
              Next Available: {expert.availability.nextAvailable}
            </span>
          </div>
          
          <div className="mt-4 w-full">
            <button
              className="w-full py-2 rounded text-sm mb-2"
              style={{ 
                backgroundColor: 'transparent',
                color: theme.primary,
                border: `1px solid ${theme.primary}`
              }}
            >
              View Profile
            </button>
            
            <button
              className="w-full py-2 rounded text-sm"
              style={{ 
                backgroundColor: theme.primary,
                color: '#FFFFFF'
              }}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
