import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createRequest, resetRequestsState } from '../../../store/reducers/requests';
import AddModal from '../../AddModal';
import UniUploadDoc from '../../UniUploadDoc';
import UniTextInput from '../../UniTextInput';

const requestTypes = [
  { value: 'leaves', label: 'Leaves' },
  { value: 'support', label: 'Support' },
  { value: 'payroll', label: 'Payroll' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'equipment', label: 'Equipment Request' },
  { value: 'other', label: 'Other' }
];

const priorities = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' }
];

const RequestUploadModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading: isLoading, isCreated, error } = useSelector((state) => state.requests);
  
  const [requestType, setRequestType] = useState('leaves');
  const [priority, setPriority] = useState('high');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);

  // Reset form when modal is closed or after successful submission
  React.useEffect(() => {
    if (!isOpen) {
      setRequestType('leaves');
      setPriority('high');
      setTitle('');
      setDescription('');
      setFiles([]);
      dispatch(resetRequestsState());
    }
  }, [isOpen, dispatch]);

  // Close modal after successful submission
  React.useEffect(() => {
    if (isCreated) {
      onClose();
    }
  }, [isCreated, onClose]);

  const handleSubmit = () => {
    // Get token from localStorage or auth context
    const token = localStorage.getItem('token') || '';
    
    // Create request data object
    const requestData = {
      type: requestType,
      priority,
      title,
      description,
      files
    };
    
    // Dispatch create request action
    dispatch(createRequest({ requestData, token }));
  };

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
  };

  return (
    <AddModal
      isOpen={isOpen}
      onClose={onClose}
      title="New Request"
      onSave={handleSubmit}
      saveButtonText="Submit Request"
      cancelButtonText="Cancel"
      isLoading={isLoading}
      haveWidth={true}
    >
      <div className="flex flex-col gap-6">
        
         <UniTextInput
          type="text"
          label="Title"
          placeholder="Enter request title"
          value={title}
          onChange={setTitle}
          required
        />
        
        <UniTextInput
          type="select"
          label="Request Type"
          value={requestType}
          onChange={setRequestType}
          options={requestTypes}
          required
        />

        <UniTextInput
          type="select"
          label="Priority"
          value={priority}
          onChange={setPriority}
          options={priorities}
          required
        />

       

        <UniUploadDoc
          title=""
          fileType="all"
          onFilesChange={handleFilesChange}
          maxFiles={5}
          description="Support for single or bulk upload. Strictly prohibit from uploading company data or other banned files"
          showFileList={true}
        />

        <UniTextInput
          type="textarea"
          label="Description"
          placeholder="Enter request description"
          value={description}
          onChange={setDescription}
          rows={6}
          required
        />
      </div>
    </AddModal>
  );
};

RequestUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default RequestUploadModal;
