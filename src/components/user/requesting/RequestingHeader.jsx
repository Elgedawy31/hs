import React from 'react';
import PropTypes from 'prop-types';
import UniBtn from '../../UniBtn';
import { ScanText } from 'lucide-react';
import CardContainer from '../../CardContainer';

const RequestingHeader = ({ onAddClick }) => {
  return (
    <CardContainer className="flex items-center rounded-[20px] justify-between">
      <div className="flex items-center gap-4">
        <ScanText size={32} className='text-text' />
        <div>
          <h1 className="text-xl font-medium text-text">Requests</h1>
        </div>
      </div>
      <UniBtn 
        text="New Request"
        onClick={onAddClick}
        className="text-white"
      />
    </CardContainer>
  );
};

RequestingHeader.propTypes = {
  onAddClick: PropTypes.func.isRequired
};

export default RequestingHeader;
