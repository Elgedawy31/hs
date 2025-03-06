import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../contexts/ThemeContext';

function UniHeading({ title, className = "" }) {
  const { theme } = useTheme();
  
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h2 
        className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3"
        style={{ 
          color: theme.text, 
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          fontFamily: 'Montaga, serif'
        }}
      >
        {title}
      </h2>
      <div 
        className="h-1 w-[170px] mx-auto rounded-full"
        style={{ backgroundColor: theme.primary }}
      ></div>
    </div>
  );
}

UniHeading.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default UniHeading;
