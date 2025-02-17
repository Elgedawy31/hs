import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddModal from '../../../AddModal';
import UniTextInput from '../../../UniTextInput';
import { DatePicker } from "@nextui-org/react";

const AddTimeManuallyForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    employee: '',
    date: new Date().toISOString().split('T')[0],
    hours: '',
    minutes: ''
  });

  const handleSave = () => {
    console.log('Saving time:', formData);
    onClose();
  };

  return (
    <AddModal 
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      title="Add Time Manually"
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm text-placeholderText">Notes</label>
          <UniTextInput
            placeholder="Select an Employee"
            value={formData.employee}
            onChange={(e) => setFormData(prev => ({...prev, employee: e.target.value}))}
          />
        </div>
        <div>
          <label className="text-sm text-placeholderText">Date</label>
          <DatePicker
              description={'placement'}
              label={"Birth date"}
              labelPlacement={'outside'}
            />
        </div>
        <div>
          <label className="text-sm text-placeholderText">Time</label>
          <div className="flex gap-4">
            <div className="flex-1">
              <UniTextInput
                type="number"
                placeholder="Hour"
                value={formData.hours}
                onChange={(e) => setFormData(prev => ({...prev, hours: e.target.value}))}
                min="0"
                max="23"
              />
            </div>
            <div className="flex-1">
              <UniTextInput
                type="number"
                placeholder="Minute"
                value={formData.minutes}
                onChange={(e) => setFormData(prev => ({...prev, minutes: e.target.value}))}
                min="0"
                max="59"
              />
            </div>
          </div>
        </div>
      </div>
    </AddModal>
  );
};

AddTimeManuallyForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddTimeManuallyForm;
