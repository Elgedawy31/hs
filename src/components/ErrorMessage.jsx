import React from 'react';
import PropTypes from 'prop-types';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] space-y-6 animate-fadeIn">
      <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center animate-bounce">
        <ExclamationTriangleIcon className="w-16 h-16 text-red-500" />
      </div>
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-semibold text-red-600">Oops! Something went wrong</h3>
        <p className="text-red-500 text-lg max-w-md">
          {message}
        </p>
      </div>
      <div className="text-sm text-placeholderText">
        Please try again later or contact support if the issue persists
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;
