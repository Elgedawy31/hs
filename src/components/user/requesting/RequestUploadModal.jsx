import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddModal from '../../AddModal';
import UniUploadDoc from '../../UniUploadDoc';
import UniTextInput from '../../UniTextInput';

const requestTypes = [
  { value: 'leaves', label: 'Leaves' },
  { value: 'equipment', label: 'Equipment Request' },
  { value: 'other', label: 'Other' }
];

const RequestUploadModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestType, setRequestType] = useState('leaves');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);

  const handleSubmit = () => {
    setIsLoading(true);
    // TODO: Implement request submission logic
    console.log('Request data:', {
      type: requestType,
      description,
      files
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // Reset form
      setRequestType('leaves');
      setDescription('');
      setFiles([]);
    }, 1000);
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
          type="select"
          label="Request Type"
          value={requestType}
          onChange={setRequestType}
          options={requestTypes}
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
          rows={3}
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
