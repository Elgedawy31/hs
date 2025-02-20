import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AddModal from '../../AddModal';
import UniTextInput from '../../UniTextInput';

// Define Zod schema for form validation
const allowanceSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters'),
  type: z.string()
    .min(1, 'Type is required'),
  rate: z.string()
    .min(1, 'Rate is required')
    .refine((val) => !isNaN(val) && Number(val) > 0, 'Rate must be greater than 0')
});

const AllowancesForm = ({ isOpen, onClose, onSubmit, initialValues = { name: '', type: '', rate: '' }, isEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    resolver: zodResolver(allowanceSchema),
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
      title={isEdit ? "Edit Allowance" : "Add New Allowance"}
      onSave={handleSubmit(handleFormSubmit)}
      saveButtonText="Save"
      cancelButtonText="Cancel"
      isLoading={isLoading}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <UniTextInput
          label="Allowance Name"
          placeholder="Enter allowance name"
          value={values.name || ''}
          onChange={(value) => setValue('name', value, { shouldValidate: true })}
          error={errors.name?.message}
          required
        />

        <UniTextInput
          type="select"
          label="Allowance Type"
          placeholder="Select type"
          value={values.type || ''}
          onChange={(value) => setValue('type', value, { shouldValidate: true })}
          error={errors.type?.message}
          options={[
            { value: 'Fixed', label: 'Fixed' },
            { value: 'Percentage', label: 'Percentage' }
          ]}
          required
        />

        <UniTextInput
          type="number"
          label="Fixed / Rate"
          placeholder="Enter rate"
          value={values.rate || ''}
          onChange={(value) => setValue('rate', value, { shouldValidate: true })}
          error={errors.rate?.message}
          required
        />
      </form>
    </AddModal>
  );
};

export default AllowancesForm;
