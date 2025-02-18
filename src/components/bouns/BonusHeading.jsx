import React from 'react';
import PropTypes from 'prop-types';
import UniBtn from '../UniBtn';

const BonusHeading = ({ onAddClick }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
          <div className="w-4 h-4 text-primary relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-primary"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rotate-90">
              <div className="w-full h-0.5 bg-primary"></div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-medium text-text">Bonus Configuration</h1>
          <p className="text-sm text-placeholderText">Manage and configure employee bonus types</p>
        </div>
      </div>
      <UniBtn 
        text="Add Bonus"
        onClick={onAddClick}
        className="text-white"
      />
    </div>
  );
};

BonusHeading.propTypes = {
  onAddClick: PropTypes.func.isRequired
};

export default BonusHeading;
