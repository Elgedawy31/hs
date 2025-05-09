import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { Calendar, Globe } from 'lucide-react';

const ExpertCard = ({ expert }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const handleNavigateToExpert = () => {
    navigate(`/experts/${expert.id}`);
  };

  return (
    <div 
      className="rounded-3xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 bg-white cursor-pointer"
      style={{ 
        backgroundColor: theme.background,
        borderColor: theme.borderColor
      }}
      onClick={handleNavigateToExpert}
    >
      <div className="flex flex-col h-full justify-between">
        <div 
          className="w-full h-64 bg-sky-100 flex items-center justify-center"
          data-aos="zoom-in"
          data-aos-duration="600"
        >
          <img draggable="false"
            src={expert.image}
            alt={expert.name}
            className="h-full object-cover"
          />
        </div>
        
        <div className="p-4 flex flex-col justify-between h-full">
          <h3 
            className="font-bold text-xl mb-4 text-center" 
            style={{ color: theme.text }}
          >
            {expert.name}
          </h3>
          
          <div className="flex flex-wrap justify-start gap-2 mb-2">
            {expert.specializations.map((specialization, index) => (
              <span 
                key={index}
                className="text-sm py-1 px-4 rounded-full bg-altPrimary"
                style={{ color: theme.text }}
                data-aos="fade-right"
                data-aos-delay={100 * (index + 1)}
                data-aos-duration="500"
              >
                {specialization}
              </span>
            ))}
          </div>
          
          <div className="mb-1">
            <span className="text-sm" style={{ color: theme.text }}>
              {expert.experience} years experience
            </span>
          </div>
          
          <div className="mb-1 flex items-center justify-start">
            <Globe className="w-4 h-4 mr-2" style={{ color: theme.primary }} />
            <span className="text-sm" style={{ color: theme.text }}>
              {expert.languages.map((lang, i) => (
                <span key={i}>
                  {i > 0 && ' & '}{lang}
                </span>
              ))}
            </span>
          </div>
          
          <div className="mb-4 flex items-center justify-start">
            <Calendar className="w-4 h-4 mr-2" style={{ color: theme.primary }} />
            <span className="text-sm" style={{ color: theme.text }}>
              Next Available : {expert.availability.nextAvailable}
            </span>
          </div>
          
          <div className="mt-4 w-full">
            <button
              className="w-full py-2 rounded-full text-sm mb-3"
              style={{ 
                backgroundColor: 'transparent',
                color: theme.primary,
                border: `1px solid ${theme.primary}`
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the card's onClick from firing
                handleNavigateToExpert();
              }}
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="500"
            >
              View Profile
            </button>
            
            <button
              className="w-full py-2 rounded-full text-sm"
              style={{ 
                backgroundColor: theme.primary,
                color: '#FFFFFF'
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the card's onClick from firing
                handleNavigateToExpert();
              }}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="500"
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
