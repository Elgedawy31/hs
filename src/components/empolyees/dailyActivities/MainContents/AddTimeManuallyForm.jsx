import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AddModal from '../../../AddModal';
import UniTextInput from '../../../UniTextInput';

// Define Zod schema for form validation
const timeManuallySchema = z.object({
  employee: z.string().min(1, 'Employee is required'),
  date: z.string().min(1, 'Date is required'),
  hours: z.string()
    .min(1, 'Hours is required')
    .refine((val) => {
      const num = parseInt(val);
      return num >= 0 && num <= 23;
    }, 'Hours must be between 0 and 23'),
  minutes: z.string()
    .min(1, 'Minutes is required')
    .refine((val) => {
      const num = parseInt(val);
      return num >= 0 && num <= 59;
    }, 'Minutes must be between 0 and 59')
});

const AddTimeManuallyForm = ({ isOpen, onClose }) => {
  const { handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(timeManuallySchema),
    mode: 'onChange',
    defaultValues: {
      employee: '',
      date: '',
      hours: '',
      minutes: ''
    }
  });

  const values = watch();

  const onSubmit = (data) => {
    onClose();
  };

  return (
    <AddModal 
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSubmit(onSubmit)}
      title="Add Time Manually"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <UniTextInput
            label="Employee"
            placeholder="Select an Employee"
            value={values.employee || ''}
            onChange={(value) => setValue('employee', value, { shouldValidate: true })}
            error={errors.employee?.message}
            required
          />
        </div>
        <div>
          <UniTextInput
            label="Date"
            type="date"
            value={values.date || ''}
            onChange={(value) => setValue('date', value, { shouldValidate: true })}
            error={errors.date?.message}
            required
          />
        </div>
        <div>
          <label className="text-sm text-placeholderText">Time</label>
          <div className="flex gap-4">
            <div className="flex-1">
              <UniTextInput
                type="number"
                placeholder="Hour"
                value={values.hours || ''}
                onChange={(value) => setValue('hours', value, { shouldValidate: true })}
                error={errors.hours?.message}
                min="0"
                max="23"
                required
              />
            </div>
            <div className="flex-1">
              <UniTextInput
                type="number"
                placeholder="Minute"
                value={values.minutes || ''}
                onChange={(value) => setValue('minutes', value, { shouldValidate: true })}
                error={errors.minutes?.message}
                min="0"
                max="59"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </AddModal>
  );
};

AddTimeManuallyForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddTimeManuallyForm;
