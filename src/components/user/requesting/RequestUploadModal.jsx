import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {useAuth} from '@contexts/AuthContext';
import { z } from 'zod';
import { createRequest, resetRequestsState } from '../../../store/reducers/requests';
import AddModal from '../../AddModal';
import UniUploadDoc from '../../UniUploadDoc';
import UniTextInput from '../../UniTextInput';
import toast from 'react-hot-toast';

// Define Zod schema for form validation
const requestSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  type: z.string()
    .min(1, 'Request type is required'),
  priority: z.string()
    .min(1, 'Priority is required'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  files: z.array(z.any()).optional()
});

const requestTypes = [
  { value: 'leave', label: 'Leave' },
  { value: 'support', label: 'Support' },
  { value: 'payroll', label: 'Payroll' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'equipment', label: 'Equipment' },
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
  const { token } = useAuth();
  
  // Initialize React Hook Form with Zod validation
  const { handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    resolver: zodResolver(requestSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      type: 'leave',
      priority: 'high',
      description: '',
      files: []
    }
  });

  // Watch form values for controlled components
  const values = watch();

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      reset();
      dispatch(resetRequestsState());
    }
  }, [isOpen, dispatch, reset]);

  // Handle successful submission
  useEffect(() => {
    if (isCreated) {
      reset();
      toast.success('Request submitted successfully!');
      onClose();
      dispatch(resetRequestsState());
    }
  }, [isCreated, onClose, reset, dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetRequestsState());
    }
  }, [error, dispatch]);

  const onSubmit = (data) => {
    // Get token from localStorage or auth context
    
    // Dispatch create request action
    dispatch(createRequest({ requestData: data, token }));
  };

  const handleFilesChange = (newFiles) => {
    setValue('files', newFiles, { shouldValidate: true });
  };

  return (
    <AddModal
      isOpen={isOpen}
      onClose={onClose}
      title="New Request"
      onSave={handleSubmit(onSubmit)}
      saveButtonText="Submit Request"
      cancelButtonText="Cancel"
      isLoading={isLoading}
      haveWidth={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <UniTextInput
          type="text"
          label="Title"
          placeholder="Enter request title"
          value={values.title || ''}
          onChange={(value) => setValue('title', value, { shouldValidate: true })}
          error={errors.title?.message}
          required
        />
        
        <UniTextInput
          type="select"
          label="Request Type"
          value={values.type || 'leave'}
          onChange={(value) => setValue('type', value, { shouldValidate: true })}
          options={requestTypes}
          error={errors.type?.message}
          required
        />

        <UniTextInput
          type="select"
          label="Priority"
          value={values.priority || 'high'}
          onChange={(value) => setValue('priority', value, { shouldValidate: true })}
          options={priorities}
          error={errors.priority?.message}
          required
        />

        <UniUploadDoc
          title=""
          fileType="all"
          onFilesChange={handleFilesChange}
          maxFiles={5}
          description="Support for single or bulk upload. Strictly prohibit from uploading company data or other banned files"
          showFileList={true}
          error={errors.files?.message}
        />

        <UniTextInput
          type="textarea"
          label="Description"
          placeholder="Enter request description"
          value={values.description || ''}
          onChange={(value) => setValue('description', value, { shouldValidate: true })}
          error={errors.description?.message}
          rows={6}
          required
        />
      </form>
    </AddModal>
  );
};

RequestUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default RequestUploadModal;
