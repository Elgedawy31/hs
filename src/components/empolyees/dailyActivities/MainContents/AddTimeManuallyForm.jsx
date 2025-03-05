import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createActivity } from '../../../../store/reducers/activity';
import { useAuth } from '../../../../contexts/AuthContext';
import AddModal from '../../../AddModal';
import UniTextInput from '../../../UniTextInput';

// Define Zod schema for form validation
const timeManuallySchema = z.object({
  employee: z.string().min(1, 'Employee is required'),
  date: z.string().min(1, 'Date is required'),
  totalTimeLogged: z.string().min(1, 'Total time logged is required'),
  totalTimeActive: z.string().min(1, 'Total active time is required'),
  totalInactiveTime: z.string().min(1, 'Total inactive time is required'),
  totalBreakTime: z.string().min(1, 'Total break time is required')
});

const AddTimeManuallyForm = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { id } = useParams();
  
  const { handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(timeManuallySchema),
    mode: 'onChange',
    defaultValues: {
      totalTimeLogged: '0',
      totalTimeActive: '0',
      totalInactiveTime: '0',
      totalBreakTime: '0'
    }
  });

  const values = watch();

  const onSubmit = (data) => {
    const { employee, date, totalTimeLogged, totalTimeActive, totalInactiveTime, totalBreakTime } = data;
    
    const activityData = {
      userId: employee,
      date: date,
      totalTimeLogged: parseInt(totalTimeLogged),
      totalTimeActive: parseInt(totalTimeActive),
      totalInactiveTime: parseInt(totalInactiveTime),
      totalBreakTime: parseInt(totalBreakTime)
    };
    
    dispatch(createActivity({ activityData, token }))
      .unwrap()
      .then(() => {
        // Close the modal and potentially refresh the data
        onClose();
      })
      .catch((error) => {
        console.error('Failed to add time manually:', error);
      });
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
            label="Total Time Logged (seconds)"
            type="number"
            placeholder="Total time logged in seconds"
            value={values.totalTimeLogged || ''}
            onChange={(value) => setValue('totalTimeLogged', value, { shouldValidate: true })}
            error={errors.totalTimeLogged?.message}
            min="0"
            required
          />
        </div>
        <div>
          <UniTextInput
            label="Total Active Time (seconds)"
            type="number"
            placeholder="Total active time in seconds"
            value={values.totalTimeActive || ''}
            onChange={(value) => setValue('totalTimeActive', value, { shouldValidate: true })}
            error={errors.totalTimeActive?.message}
            min="0"
            required
          />
        </div>
        <div>
          <UniTextInput
            label="Total Inactive Time (seconds)"
            type="number"
            placeholder="Total inactive time in seconds"
            value={values.totalInactiveTime || ''}
            onChange={(value) => setValue('totalInactiveTime', value, { shouldValidate: true })}
            error={errors.totalInactiveTime?.message}
            min="0"
            required
          />
        </div>
        <div>
          <UniTextInput
            label="Total Break Time (seconds)"
            type="number"
            placeholder="Total break time in seconds"
            value={values.totalBreakTime || ''}
            onChange={(value) => setValue('totalBreakTime', value, { shouldValidate: true })}
            error={errors.totalBreakTime?.message}
            min="0"
            required
          />
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
