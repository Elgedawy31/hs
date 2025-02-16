import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AddModal from '../../AddModal';
import UniTextInput from '../../UniTextInput';

// Define Zod schema for form validation
const bonusSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must not exceed 50 characters'),
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(val) && Number(val) > 0, 'Amount must be greater than 0')
});

const AllowancesForm = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(bonusSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      amount: ''
    }
  });

  const values = watch();

  const onSubmit = (data) => {
    setIsLoading(true);
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
      title="Add New Bonus"
      onSave={handleSubmit(onSubmit)}
      saveButtonText="Save"
      cancelButtonText="Cancel"
      isLoading={isLoading}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <UniTextInput
          label="Bonus Title"
          placeholder="Enter bonus title"
          value={values.title || ''}
          onChange={(value) => setValue('title', value, { shouldValidate: true })}
          error={errors.title?.message}
          required
        />

        <UniTextInput
          type="number"
          label="Amount"
          placeholder="Enter amount"
          value={values.amount || ''}
          onChange={(value) => setValue('amount', value, { shouldValidate: true })}
          error={errors.amount?.message}
          required
        />
      </form>
    </AddModal>
  );
};

export default AllowancesForm;
