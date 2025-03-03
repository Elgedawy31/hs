import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../store/reducers/users';
import { useAuth } from '../../contexts/AuthContext';
import UniTextInput from "../UniTextInput";
import CardContainer from '../CardContainer';
import UniBtn from '../UniBtn';

// Define Zod Schema
const bonusSchema = z.object({
  name: z.string().min(3, "Bonus name must be at least 3 characters"),
  type: z.enum(["misc", "project", "holiday", "overtime"]),
  description: z.string().optional(),
  fixedAmount: z.string().optional(),
  users: z.array(z.string()).min(1, "At least one user must be selected"),
  paymentInterval: z.enum(["weekly", "monthly", "semi-annually", "annually", "on-demand"]).default("monthly"),
  overtimeRates: z.array(
    z.object({
      fromHours: z.string(),
      toHours: z.string(),
      rate: z.string(),
    })
  ).optional(),
}).refine((data) => {
  if ((data.type === "misc" || data.type === "project" || data.type === "holiday") && !data.fixedAmount) {
    return false;
  }
  if (data.type === "overtime" && (!data.overtimeRates || data.overtimeRates.length === 0)) {
    return false;
  }
  return true;
}, {
  message: "Required fields are missing based on the selected bonus type.",
});

const BonusForm = ({ onClose, onSubmit: onSubmitProp, editMode = false, initialData = null }) => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.users);
  const { token , user:{id}} = useAuth();

  useEffect(() => {
    // Fetch all users when component mounts
    dispatch(getAllUsers({ token, page: 1, limit: 10000 }));
  }, [dispatch, token]);

  // Prepare initial data - ensure fixedAmount is a string
  const preparedInitialData = initialData ? {
    ...initialData,
    fixedAmount: initialData.fixedAmount?.toString() || "",
    overtimeRates: initialData.overtimeRates?.map(rate => ({
      fromHours: rate.fromHours?.toString() || "0",
      toHours: rate.toHours?.toString() || "0",
      rate: rate.rate?.toString() || "150"
    })) || []
  } : null;

  const { handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(bonusSchema),
    defaultValues: preparedInitialData || {
      name: "",
      description: "",
      type: "misc",
      fixedAmount: "",
      users: [],
      paymentInterval: "monthly",
      overtimeRates: [
        {
          fromHours: "0",
          toHours: "0",
          rate: "150"
        }
      ],
    },
  });

  const values = watch();
  const bonusType = values.type;

  const onSubmit = (data) => {
    // Format the data before submitting
    const formattedData = { ...data };
    
    // Convert fixedAmount to number if present
    if (formattedData.fixedAmount) {
      formattedData.fixedAmount = Number(formattedData.fixedAmount);
    }
    
    // Convert overtime rates to numbers
    if (formattedData.overtimeRates) {
      formattedData.overtimeRates = formattedData.overtimeRates.map(rate => ({
        fromHours: Number(rate.fromHours),
        toHours: Number(rate.toHours),
        rate: Number(rate.rate)
      }));
    }
    
    // Only include overtimeRates if the type is overtime
    if (data.type !== "overtime") {
      delete formattedData.overtimeRates;
    }
    
    onSubmitProp(formattedData);
    reset();
  };

  return (
    <CardContainer className="">
      <h2 className="text-lg font-medium mb-2">{editMode ? "Edit Bonus" : "Add Bonus"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Bonus Name */}
        <UniTextInput
          label="Name"
          type="text"
          placeholder="Bonus Name"
          value={values.name || ''}
          onChange={(value) => setValue('name', value, { shouldValidate: true })}
          error={errors.name?.message}
          required
        />

        {/* Bonus Type Dropdown */}
        <UniTextInput
          label="Type"
          type="select"
          value={values.type || ''}
          onChange={(value) => setValue('type', value, { shouldValidate: true })}
          error={errors.type?.message}
          required
          options={[
            { value: "misc", label: "Misc" },
            { value: "project", label: "Project" },
            { value: "holiday", label: "Holiday" },
            { value: "overtime", label: "Overtime" }
          ]}
        />

        {/* Payment Interval */}
        <UniTextInput
          label="Payment Interval"
          type="select"
          value={values.paymentInterval || 'monthly'}
          onChange={(value) => setValue('paymentInterval', value, { shouldValidate: true })}
          error={errors.paymentInterval?.message}
          required
          options={[
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
            { value: "semi-annually", label: "Semi-Annually" },
            { value: "annually", label: "Annually" },
            { value: "on-demand", label: "On-Demand" }
          ]}
        />

        {/* Description field for all types */}
        <UniTextInput
          label="Description"
          type="text"
          placeholder="Description"
          value={values.description || ''}
          onChange={(value) => setValue('description', value, { shouldValidate: true })}
        />

        {/* Users select field */}
        <UniTextInput
          type="select"
          label="Users"
          multiple
          placeholder="Select Users"
          value={values.users || []}
          onChange={(value) => setValue('users', value, { shouldValidate: true })}
          options={users?.filter(user => user?._id !== id).map(user => ({ 
            value: user._id, 
            label: `${user?.userId?.name?.first} ${user?.userId?.name?.last}` || 'Unknown User'
          })) || []}
          error={errors.users?.message}
          required
        />

        {/* Conditional Fields Based on Bonus Type */}
        {(bonusType === "misc" || bonusType === "project" || bonusType === "holiday") && (
          <UniTextInput
            label="Fixed Amount"
            type="number"
            placeholder="Enter amount"
            value={values.fixedAmount || ''}
            onChange={(value) => setValue('fixedAmount', value, { shouldValidate: true })}
            error={errors.fixedAmount?.message}
            required
          />
        )}

        {bonusType === "overtime" && (
          <CardContainer className="space-y-4">
            <h3 className="font-medium">Overtime Rates</h3>
            {values.overtimeRates?.map((rate, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <UniTextInput
                  label="From Hours"
                  type="number"
                  placeholder="From Hours"
                  value={rate.fromHours || ''}
                  onChange={(value) => {
                    const newRates = [...values.overtimeRates];
                    newRates[index].fromHours = value;
                    setValue('overtimeRates', newRates, { shouldValidate: true });
                  }}
                  error={errors.overtimeRates?.[index]?.fromHours?.message}
                  required
                />
                <UniTextInput
                  label="To Hours"
                  type="number"
                  placeholder="To Hours"
                  value={rate.toHours || ''}
                  onChange={(value) => {
                    const newRates = [...values.overtimeRates];
                    newRates[index].toHours = value;
                    setValue('overtimeRates', newRates, { shouldValidate: true });
                  }}
                  error={errors.overtimeRates?.[index]?.toHours?.message}
                  required
                />
                <UniTextInput
                  label="Rate (%) - Can exceed 100%"
                  type="number"
                  placeholder="Rate"
                  value={rate.rate || ''}
                  min={100}
                  max={999}
                  onChange={(value) => {
                    const newRates = [...values.overtimeRates];
                    newRates[index].rate = value;
                    setValue('overtimeRates', newRates, { shouldValidate: true });
                  }}
                  error={errors.overtimeRates?.[index]?.rate?.message}
                  required
                />
              </div>
            ))}
            <div className="flex gap-2">
              <UniBtn
                text="Add Rate"
                onClick={() => {
                  const newRates = [...(values.overtimeRates || []), { fromHours: "", toHours: "", rate: "150" }];
                  setValue('overtimeRates', newRates);
                }}
                className="!bg-transparent !text-text border"
                type="button"
              />
              {values.overtimeRates?.length > 1 && (
                <UniBtn
                  text="Remove Rate"
                  onClick={() => {
                    const newRates = [...values.overtimeRates];
                    newRates.pop();
                    setValue('overtimeRates', newRates, { shouldValidate: true });
                  }}
                  className="!bg-red-500 text-white"
                  type="button"
                />
              )}
            </div>
          </CardContainer>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <UniBtn
            text="Cancel"
            onClick={onClose}
            className="!bg-transparent !text-text border"
          />
          <UniBtn
            text={editMode ? "Update" : "Add"}
            type="submit"
            className='text-white'
          />
        </div>
      </form>
    </CardContainer>
  );
};

BonusForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  initialData: PropTypes.object
};

export default BonusForm;
