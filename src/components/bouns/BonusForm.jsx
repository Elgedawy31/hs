import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UniTextInput from "../UniTextInput";
import CardContainer from '../CardContainer';
import UniBtn from '../UniBtn';

// Define Zod Schema
const bonusSchema = z.object({
  bonusName: z.string().min(3, "Bonus name must be at least 3 characters"),
  bonusType: z.enum(["MISC Bonus", "Percentage of salary", "Over Time", "Specific Bonus"]),
  description: z.string().optional(),
  fixedRate: z.string().optional(),
  rateOfSalary: z.string().optional(),
  hourlyRate: z.string().optional(),
  fromHours: z.string().optional(),
  toHours: z.string().optional(),
  specificAmount: z.string().optional(),
  selectedOption: z.array(z.string()).optional(),
}).refine((data) => {
  if (data.bonusType === "MISC Bonus" && !data.fixedRate) {
    return false;
  }
  if (data.bonusType === "Percentage of salary" && !data.rateOfSalary) {
    return false;
  }
  if (data.bonusType === "Over Time" && (!data.hourlyRate || !data.fromHours || !data.toHours)) {
    return false;
  }
  if (data.bonusType === "Specific Bonus" && (!data.specificAmount || !data.selectedOption?.length)) {
    return false;
  }
  return true;
}, {
  message: "Required fields are missing based on the selected bonus type.",
});

const BonusForm = ({ onClose, onSubmit: onSubmitProp }) => {
  const { handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(bonusSchema),
    defaultValues: {
      bonusName: "",
      description: "",
      bonusType: "MISC Bonus",
      fixedRate: "",
      rateOfSalary: "10%",
      hourlyRate: "",
      fromHours: "",
      toHours: "",
      specificAmount: "",
      selectedOption: [],
    },
  });

  const values = watch();
  const bonusType = values.bonusType;

  const onSubmit = (data) => {
    onSubmitProp(data);
    reset();
  };

  return (
    <CardContainer className="">
      <h2 className="text-lg font-medium mb-2">Add Bonus</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Bonus Name */}
        <UniTextInput
          label="Bonus Name"
          type="text"
          placeholder="Bonus Name"
          value={values.bonusName || ''}
          onChange={(value) => setValue('bonusName', value, { shouldValidate: true })}
          error={errors.bonusName?.message}
          required
        />

        {/* Bonus Type Dropdown */}
        <UniTextInput
          label="Bonus Type"
          type="select"
          value={values.bonusType || ''}
          onChange={(value) => setValue('bonusType', value, { shouldValidate: true })}
          error={errors.bonusType?.message}
          required
          options={[
            { value: "MISC Bonus", label: "MISC Bonus" },
            { value: "Percentage of salary", label: "Percentage of salary" },
            { value: "Over Time", label: "Over Time" },
            { value: "Specific Bonus", label: "Specific Bonus" }
          ]}
        />

        {/* Conditional Fields Based on Bonus Type */}
        {bonusType === "MISC Bonus" && (
          <>
            <UniTextInput
              label="Fixed Rate"
              type="text"
              placeholder="Fixed Rate"
              value={values.fixedRate || ''}
              onChange={(value) => setValue('fixedRate', value, { shouldValidate: true })}
              error={errors.fixedRate?.message}
              required
            />
            <UniTextInput
              label="Description"
              type="text"
              placeholder="Description"
              value={values.description || ''}
              onChange={(value) => setValue('description', value, { shouldValidate: true })}
            />
            <UniTextInput
              label="To"
              type="select"
              placeholder="Select Employee"
              value={values.selectedOption || []}
              onChange={(value) => setValue('selectedOption', value, { shouldValidate: true })}
              error={errors.selectedOption?.message}
              required
              multiple={true}
              options={[
                { value: "Nancy Mahmoud", label: "Nancy Mahmoud" },
                { value: "Mohamed Elgedawy", label: "Mohamed Elgedawy" },
                { value: "Noran Khaled", label: "Noran Khaled" },
                { value: "Mohamed Ramadan", label: "Mohamed Ramadan" }
              ]}
            />
          </>
        )}

        {bonusType === "Percentage of salary" && (
          <>
            <UniTextInput
              label="Rate of Salary"
              type="text"
              placeholder="Rate of Salary"
              value={values.rateOfSalary || ''}
              onChange={(value) => setValue('rateOfSalary', value, { shouldValidate: true })}
              error={errors.rateOfSalary?.message}
              required
            />
            <UniTextInput
              label="Description"
              type="text"
              placeholder="Description"
              value={values.description || ''}
              onChange={(value) => setValue('description', value, { shouldValidate: true })}
            />
            <UniTextInput
              label="To"
              type="select"
              placeholder="Select Employee"
              value={values.selectedOption || []}
              onChange={(value) => setValue('selectedOption', value, { shouldValidate: true })}
              error={errors.selectedOption?.message}
              required
              multiple={true}
              options={[
                { value: "Nancy Mahmoud", label: "Nancy Mahmoud" },
                { value: "Mohamed Elgedawy", label: "Mohamed Elgedawy" },
                { value: "Noran Khaled", label: "Noran Khaled" },
                { value: "Mohamed Ramadan", label: "Mohamed Ramadan" }
              ]}
            />
          </>
        )}

        {bonusType === "Over Time" && (
          <>
            <UniTextInput
              label="Hourly Rate"
              type="number"
              placeholder="Hourly Rate"
              value={values.hourlyRate || ''}
              onChange={(value) => setValue('hourlyRate', value, { shouldValidate: true })}
              error={errors.hourlyRate?.message}
              required
            />
            <UniTextInput
              label="From Number of Overtime Hours"
              type="number"
              placeholder="From Number of Overtime Hours"
              value={values.fromHours || ''}
              onChange={(value) => setValue('fromHours', value, { shouldValidate: true })}
              error={errors.fromHours?.message}
              required
            />
            <UniTextInput
              label="To Number of Overtime Hours"
              type="number"
              placeholder="To Number of Overtime Hours"
              value={values.toHours || ''}
              onChange={(value) => setValue('toHours', value, { shouldValidate: true })}
              error={errors.toHours?.message}
              required
            />
            <UniTextInput
              label="To"
              type="select"
              placeholder="Select Employee"
              value={values.selectedOption || []}
              onChange={(value) => setValue('selectedOption', value, { shouldValidate: true })}
              error={errors.selectedOption?.message}
              required
              multiple={true}
              options={[
                { value: "Nancy Mahmoud", label: "Nancy Mahmoud" },
                { value: "Mohamed Elgedawy", label: "Mohamed Elgedawy" },
                { value: "Noran Khaled", label: "Noran Khaled" },
                { value: "Mohamed Ramadan", label: "Mohamed Ramadan" }
              ]}
            />
          </>
        )}

        {bonusType === "Specific Bonus" && (
          <>
            <UniTextInput
              label="Amount"
              type="number"
              placeholder="Amount"
              value={values.specificAmount || ''}
              onChange={(value) => setValue('specificAmount', value, { shouldValidate: true })}
              error={errors.specificAmount?.message}
              required
            />
            <UniTextInput
              label="To"
              type="select"
              placeholder="Select Employee"
              value={values.selectedOption || []}
              onChange={(value) => setValue('selectedOption', value, { shouldValidate: true })}
              error={errors.selectedOption?.message}
              required
              multiple={true}
              options={[
                { value: "Nancy Mahmoud", label: "Nancy Mahmoud" },
                { value: "Mohamed Elgedawy", label: "Mohamed Elgedawy" },
                { value: "Noran Khaled", label: "Noran Khaled" },
                { value: "Mohamed Ramadan", label: "Mohamed Ramadan" }
              ]}
            />
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <UniBtn
            text="Cancel"
            onClick={onClose}
            className="!bg-transparent !text-text border"
          />
          <UniBtn
            text="Add"
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
  onSubmit: PropTypes.func.isRequired
};

export default BonusForm;
