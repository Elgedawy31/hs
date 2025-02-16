import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AddModal from '../AddModal';
import UniTextInput from '../UniTextInput';

// Define Zod schema for form validation
const notificationSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must not exceed 50 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  selectedMember: z.string({
    required_error: 'Please select at least one member'
  })
});

const memberOptions = [
  { value: 'all', label: 'All employee' },
  { value: 'dev', label: 'Developers' },
  { value: 'design', label: 'Designers' },
  { value: 'marketing', label: 'Marketing' }
];

const SendNotificationForm = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(notificationSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      selectedMember: 'all'
    }
  });

  const values = watch();

  const onSubmit = (data) => {
    setIsLoading(true);
    // TODO: Implement send notification logic
    console.log('Form data:', data);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <AddModal
      isOpen={isOpen}
      onClose={onClose}
      title="Public Notification"
      onSave={handleSubmit(onSubmit)}
      saveButtonText="Send"
      cancelButtonText="Cancel"
      isLoading={isLoading}
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
          value={values.description || ''}
          onChange={(value) => setValue('description', value, { shouldValidate: true })}
          error={errors.description?.message}
          required
          rows={3}
        />

        <UniTextInput
          type="select"
          label="TO"
          placeholder="Choose Members"
          value={values.selectedMember || ''}
          onChange={(value) => setValue('selectedMember', value, { shouldValidate: true })}
          options={memberOptions}
          error={errors.selectedMember?.message}
          required
        />
      </form>
    </AddModal>
  );
};

export default SendNotificationForm;
