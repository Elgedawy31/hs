import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification, resetNotificationState } from '../../store/reducers/notification';
import { useAuth } from '../../contexts/AuthContext';
import AddModal from '../AddModal';
import UniTextInput from '../UniTextInput';
import toast from 'react-hot-toast';

// Define Zod schema for form validation
const notificationSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must not exceed 50 characters'),
  message: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  recipients: z.array(z.string())
});

const memberOptions = [
  { value: 'all', label: 'All employee' },
  { value: 'dev', label: 'Developers' },
  { value: 'design', label: 'Designers' },
  { value: 'marketing', label: 'Marketing' }
];

const SendNotificationForm = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error, isCreated } = useSelector(state => state.notification);
  const { token } = useAuth();

  const { handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    resolver: zodResolver(notificationSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      message: '',
      recipients: 'all'
    }
  });

  const values = watch();

  useEffect(() => {
    // Close modal and reset form when notification is isCreatedfully sent
    if (isCreated) {
      reset();
      onClose();
      dispatch(resetNotificationState());
    }
  }, [isCreated, onClose, reset, dispatch]);

  useEffect(() => {
    // Reset form when modal is closed
    if (error) {
      toast.error(error);
      dispatch(resetNotificationState());
    }
  }, [error]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(resetNotificationState());
    };
  }, [dispatch]);

  const onSubmit = (data) => {
    // Format data for API
    const notificationData = {
      title: data.title,
      message: data.message,
      recipients: data.recipients
    };

    // Dispatch the create notification action with token
    dispatch(createNotification({ notificationData, token }));
  };

  return (
    <AddModal
      isOpen={isOpen}
      onClose={onClose}
      title="Public Notification"
      onSave={handleSubmit(onSubmit)}
      saveButtonText="Send"
      cancelButtonText="Cancel"
      isLoading={loading}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <UniTextInput
          label="Title"
          placeholder="Enter notification title"
          value={values.title || ''}
          onChange={(value) => setValue('title', value, { shouldValidate: true })}
          error={errors.title?.message}
          required
        />

        <UniTextInput
          type="textarea"
          label="Description"
          placeholder="Enter notification description"
          value={values.message || ''}
          onChange={(value) => setValue('message', value, { shouldValidate: true })}
          error={errors.message?.message}
          required
          rows={3}
        />

        <UniTextInput
          type="select"
          label="TO"
          multiple
          placeholder="Choose Members"
          value={values.recipients || ''}
          onChange={(value) => setValue('recipients', value, { shouldValidate: true })}
          options={memberOptions}
          error={errors.recipients?.message}
          required
        />
      </form>
    </AddModal>
  );
};

export default SendNotificationForm;
