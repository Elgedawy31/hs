import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AddModal from '../../AddModal';
import UniTextInput from '../../UniTextInput';

const severityOptions = [
  { value: 'minor', label: 'Minor' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'final', label: 'Final' }
];

const memoSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must not exceed 50 characters'),
  severity: z.string({
    required_error: 'Please select severity level'
  }),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  requiredAction: z.string()
    .min(10, 'Required action must be at least 10 characters')
    .max(500, 'Required action must not exceed 500 characters')
});

const MemoForm = ({ isOpen, onClose, onSubmit, initialValues = { 
  title: '', 
  severity: 'moderate', 
  description: '', 
  requiredAction: '' 
}, isEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    resolver: zodResolver(memoSchema),
    mode: 'onChange',
    defaultValues: initialValues
  });

  const values = watch();

  React.useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleFormSubmit = (data) => {
    setIsLoading(true);
    onSubmit(data);
    setIsLoading(false);
    onClose();
  };

  return (
    <AddModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Memo" : "Issue a New Memo"}
      onSave={handleSubmit(handleFormSubmit)}
      saveButtonText={isEdit ? "Save" : "Issue"}
      cancelButtonText="Cancel"
      isLoading={isLoading}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <UniTextInput
          label="Warning Title"
          placeholder="Enter warning title"
          value={values.title || ''}
          onChange={(value) => setValue('title', value, { shouldValidate: true })}
          error={errors.title?.message}
          required
        />

        <UniTextInput
          type="select"
          label="Severity Level"
          placeholder="Select severity level"
          value={values.severity || ''}
          onChange={(value) => setValue('severity', value, { shouldValidate: true })}
          options={severityOptions}
          error={errors.severity?.message}
          required
        />

        <UniTextInput
          type="textarea"
          label="Description"
          placeholder="Enter description"
          value={values.description || ''}
          onChange={(value) => setValue('description', value, { shouldValidate: true })}
          error={errors.description?.message}
          required
          rows={3}
        />

        <UniTextInput
          type="textarea"
          label="Required Action"
          placeholder="Enter required action"
          value={values.requiredAction || ''}
          onChange={(value) => setValue('requiredAction', value, { shouldValidate: true })}
          error={errors.requiredAction?.message}
          required
          rows={3}
        />
      </form>
    </AddModal>
  );
};

export default MemoForm;
