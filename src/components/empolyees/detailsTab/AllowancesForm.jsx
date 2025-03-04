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
  value: z.string()
    .min(1, 'Value is required')
    .refine((val) => !isNaN(val) && Number(val) > 0, 'Value must be greater than 0'),
  paymentInterval: z.enum(['weekly', 'monthly', 'semi-annually', 'annually'], {
    errorMap: () => ({ message: 'Please select a payment interval' })
  })
});

const AllowancesForm = ({ isOpen, onClose, onSubmit, initialValues = { name: '', value: '', paymentInterval: 'monthly' }, isEdit }) => {
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
          type="number"
          label="Value"
          placeholder="Enter value"
          value={values.value || ''}
          onChange={(value) => setValue('value', value, { shouldValidate: true })}
          error={errors.value?.message}
          required
        />

        <UniTextInput
          type="select"
          label="Payment Interval"
          placeholder="Select payment interval"
          value={values.paymentInterval || ''}
          onChange={(value) => setValue('paymentInterval', value, { shouldValidate: true })}
          error={errors.paymentInterval?.message}
          options={[
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'semi-annually', label: 'Semi-Annually' },
            { value: 'annually', label: 'Annually' }
          ]}
          required
        />
      </form>
    </AddModal>
  );
};

export default AllowancesForm;
