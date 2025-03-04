import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AddModal from '../../AddModal';
import UniTextInput from '../../UniTextInput';

const levelOptions = [
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'red', label: 'Red' }
];

const memoSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must not exceed 50 characters'),
  level: z.string({
    required_error: 'Please select level level'
  }),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
});

const MemoForm = ({ isOpen, onClose, onSubmit, initialValues = { 
  title: '', 
  level: 'moderate', 
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
          label="Title"
          placeholder="Enter title"
          value={values.title || ''}
          onChange={(value) => setValue('title', value, { shouldValidate: true })}
          error={errors.title?.message}
          required
        />

        <UniTextInput
          type="select"
          label="Level"
          placeholder="Select  level"
          value={values.level || ''}
          onChange={(value) => setValue('level', value, { shouldValidate: true })}
          options={levelOptions}
          error={errors.level?.message}
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

      </form>
    </AddModal>
  );
};

export default MemoForm;
