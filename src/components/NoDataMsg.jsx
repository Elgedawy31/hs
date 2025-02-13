import React from 'react';
import { InboxIcon } from '@heroicons/react/24/outline';

const NoDataMsg = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 ">
      <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
        <InboxIcon className="w-16 h-16 text-primary" />
      </div>
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-semibold text-altPrimary">Your inbox is empty</h3>
        <p className="text-gray-500 text-lg max-w-md">
          When new emails arrive, they'll appear here
        </p>
      </div>
      <div className="text-sm text-gray-400">
        Check back later for new messages
      </div>
    </div>
  );
};

export default NoDataMsg;