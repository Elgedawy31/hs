import React from 'react';
import { Inbox } from 'lucide-react';
import PropTypes from 'prop-types';
import { useTheme } from '../contexts/ThemeContext';

const NoDataMsg = ({ 
  icon: Icon = Inbox,
  title = 'No data found',
  description = 'There is no data to display at the moment',
  additionalMessage = 'Check back later for updates',
  iconBgColor = 'bg-[#F8EEE6]',
  iconColor = 'text-primary'
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 py-12">
      <div className={`w-32 h-32 ${iconBgColor} rounded-full flex items-center justify-center`}>
        <Icon 
          className={`w-16 h-16 ${iconColor}`} 
          stroke={theme.primary}
        />
      </div>
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-semibold" style={{ color: theme.primary }}>{title}</h3>
        <p className="text-lg max-w-md" style={{ color: theme.placeholderText }}>
          {description}
        </p>
      </div>
      {additionalMessage && (
        <div className="text-sm" style={{ color: theme.placeholderText }}>
          {additionalMessage}
        </div>
      )}
    </div>
  );
};

NoDataMsg.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string,
  description: PropTypes.string,
  additionalMessage: PropTypes.string,
  iconBgColor: PropTypes.string,
  iconColor: PropTypes.string
};

export default NoDataMsg;
