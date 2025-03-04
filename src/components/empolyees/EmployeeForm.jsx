import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UniTextInput from "../UniTextInput";
import UniBtn from "../UniBtn";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardContainer from "../CardContainer";
import UniHeading from "../UniHeading";
import EmployeeWorkInfo from "./EmployeeWorkInfo";

const employeeSchema = z.object({
  // User Information
  userId: z.string().min(1, "Please select a user"),
  
  // Working Information
  weeklyWorkingDays: z.string().regex(/^\d+$/, "Weekly working days must be a valid number"),
  dailyWorkingHours: z.string().regex(/^\d+$/, "Daily working hours must be a valid number"),
  annualLeavs: z.string().regex(/^\d+$/, "Annual leaves must be a valid number"),
  weekEnd: z.array(z.string()).min(1, "Please select at least one weekend day"),
  
  // Payroll Information
  salary: z.string().regex(/^\d+$/, "Salary must be a valid number"),
  paymentInterval: z.enum(["monthly", "weekly", "daily"], {
    errorMap: () => ({ message: "Please select a valid payment interval" })
  }),
  paymentPeriod: z.string().regex(/^\d+$/, "Payment period must be a valid number"),
});

const EmployeeForm = ({ onSubmit, loading = false, initialValues = {} , MainIcon, MainHead='Add New Employee' }) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    register,
  } = useForm({
    resolver: zodResolver(employeeSchema),
    mode: "onChange",
    defaultValues: {
      userId: initialValues.userId || "",
      weeklyWorkingDays: initialValues.weeklyWorkingDays || "",
      dailyWorkingHours: initialValues.dailyWorkingHours || "",
      annualLeavs: initialValues.annualLeavs || "",
      weekEnd: initialValues.weekEnd || [],
      salary: initialValues.salary || "",
      paymentInterval: initialValues.paymentInterval || "monthly",
      paymentPeriod: initialValues.paymentPeriod || "",
    }
  });

  // Update form values when initialValues change
  useEffect(() => {
    if (Object.keys(initialValues).length > 0) {
      setValue("userId", initialValues.userId || "");
      setValue("weeklyWorkingDays", initialValues.weeklyWorkingDays || "");
      setValue("dailyWorkingHours", initialValues.dailyWorkingHours || "");
      setValue("annualLeavs", initialValues.annualLeavs || "");
      setValue("weekEnd", initialValues.weekEnd || []);
      setValue("salary", initialValues.salary || "");
      setValue("paymentInterval", initialValues.paymentInterval || "monthly");
      setValue("paymentPeriod", initialValues.paymentPeriod || "");
    }
  }, [initialValues, setValue]);

  const values = watch();


  const navigate = useNavigate();

  const processSubmit = (data) => {
    onSubmit(data);
  };

  return (
   <div className="space-y-6">
      
     <form onSubmit={handleSubmit(processSubmit)} className="w-full space-y-6">
       {/* Employee Information Section */}
       <UniHeading text={MainHead} icon={MainIcon} className="mb-6" />

       <EmployeeWorkInfo 
         data={values}
         onChange={(field, value) => setValue(field, value, { shouldValidate: true })}
         errors={errors}
       />

       <div className="flex justify-end space-x-4 mt-6">
         <UniBtn
           text="Cancel"
           onClick={() => navigate(-1)}
           className="bg-transparent border border-borderColor text-text"
         />
         <UniBtn
           className="text-white"
           text={"Submit"}
           type="submit"
           loading={loading}
           disabled={loading}
         />
       </div>
     </form>
   </div>
  );
};

export default EmployeeForm;
