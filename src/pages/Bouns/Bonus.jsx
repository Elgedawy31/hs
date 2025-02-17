import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import UniHeading from "../../components/UniHeading";
import CardContainer from "../../components/CardContainer";
import BounsList from "../../components/bouns/BounsList";
import UniTextInput from "../../components/UniTextInput";

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
  selectedOption: z.string().optional(),
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
  if (data.bonusType === "Specific Bonus" && (!data.specificAmount || !data.selectedOption)) {
    return false;
  }
  return true;
}, {
  message: "Required fields are missing based on the selected bonus type.",
});

const Bouns = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
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
      selectedOption: "",
    },
  });

  const bonusType = watch("bonusType");

  const onSubmit = (data) => {
    console.log("New Bonus Added:", data);
    setIsFormOpen(false);
    reset();
  };

  return (
    <div className="p-6 space-y-4 min-h-screen">
      <CardContainer>
        <UniHeading
          icon={PlusCircle}
          text="Bonus Configuration"
          desc="Manage and configure employee bonus types"
          showButton
          buttonText="Add Bonus"
          onButtonClick={() => setIsFormOpen(true)}
        />
      </CardContainer>

      {isFormOpen && (
        <div className="p-4 border rounded-md bg-white shadow">
          <h2 className="text-lg font-medium mb-2">Add Bonus</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Bonus Name */}
            <UniTextInput
              label="Bonus Name"
              type="text"
              placeholder="Bonus Name"
              {...register("bonusName")}
            />
            {errors.bonusName && <p className="text-red-500">{errors.bonusName.message}</p>}

            {/* Bonus Type Dropdown */}
            <select className="border p-2 w-full rounded" {...register("bonusType")}>
              <option>MISC Bonus</option>
              <option>Percentage of salary</option>
              <option>Over Time</option>
              <option>Specific Bonus</option>
            </select>

            {/* Conditional Fields Based on Bonus Type */}
            {bonusType === "MISC Bonus" && (
              <>
                <UniTextInput
                  label="Fixed Rate"
                  type="text"
                  placeholder="Fixed Rate"
                  {...register("fixedRate")}
                />
                {errors.fixedRate && <p className="text-red-500">{errors.fixedRate.message}</p>}
                <textarea
                  placeholder="Description"
                  className="border p-2 w-full rounded"
                  {...register("description")}
                />
              </>
            )}

            {bonusType === "Percentage of salary" && (
              <>
                <UniTextInput
                  label="Rate of Salary"
                  type="text"
                  placeholder="Rate of Salary"
                  {...register("rateOfSalary")}
                />
                {errors.rateOfSalary && <p className="text-red-500">{errors.rateOfSalary.message}</p>}
                <textarea
                  placeholder="Description"
                  className="border p-2 w-full rounded"
                  {...register("description")}
                />
              </>
            )}

            {bonusType === "Over Time" && (
              <>
                <UniTextInput
                  label="Hourly Rate"
                  type="number"
                  placeholder="Hourly Rate"
                  {...register("hourlyRate")}
                />
                {errors.hourlyRate && <p className="text-red-500">{errors.hourlyRate.message}</p>}
                <UniTextInput
                  label="From Number of Overtime Hours"
                  type="number"
                  placeholder="From Number of Overtime Hours"
                  {...register("fromHours")}
                />
                {errors.fromHours && <p className="text-red-500">{errors.fromHours.message}</p>}
                <UniTextInput
                  label="To Number of Overtime Hours"
                  type="number"
                  placeholder="To Number of Overtime Hours"
                  {...register("toHours")}
                />
                {errors.toHours && <p className="text-red-500">{errors.toHours.message}</p>}
              </>
            )}

            {bonusType === "Specific Bonus" && (
              <>
                <UniTextInput
                  label="Amount"
                  type="number"
                  placeholder="Amount"
                  {...register("specificAmount")}
                />
                {errors.specificAmount && <p className="text-red-500">{errors.specificAmount.message}</p>}
                <select className="border p-2 w-full rounded" {...register("selectedOption")}>
                  <option value="">To</option>
                  <option value="Nancy Mahmoud">Nancy Mahmoud</option>
                  <option value="Mohamed Elgedawy">Mohamed Elgedawy</option>
                </select>
                {errors.selectedOption && <p className="text-red-500">{errors.selectedOption.message}</p>}
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="border px-4 py-2 rounded"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
          </form>
        </div>
      )}

      <BounsList />
    </div>
  );
};

export default Bouns;
