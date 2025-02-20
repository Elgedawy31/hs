import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UniTextInput from "../UniTextInput";
import UniBtn from "../UniBtn";
import React from "react";
import { useNavigate } from "react-router-dom";
import CardContainer from "../CardContainer";
import UniHeading from "../UniHeading";
import EmployeeWorkInfo from "./EmployeeWorkInfo";

const employeeSchema = z.object({
  // Employee Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^[0-9]{11}$/, "Phone number must be 11 digits"),
  jobTitle: z.string().min(2, "Job Title must be at least 2 characters"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  about: z.string().min(10, "About must be at least 10 characters"),
  
  // Working Information
  weeklyWorkingDays: z.string().regex(/^\d+$/, "Weekly working days must be a valid number"),
  dailyWorkingHours: z.string().regex(/^\d+$/, "Daily working hours must be a valid number"),
  dailyBreakMinutes: z.string().regex(/^\d+$/, "Daily break minutes must be a valid number"),
  
  // Payroll Information
  salary: z.string().regex(/^\d+$/, "Salary must be a valid number"),
  paymentPeriod: z.enum(["Month", "Week", "Day"], {
    errorMap: () => ({ message: "Please select a valid payment period" })
  }),
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
      firstName: initialValues.firstName || "",
      lastName: initialValues.lastName || "",
      email: initialValues.email || "",
      phoneNumber: initialValues.phoneNumber || "",
      jobTitle: initialValues.jobTitle || "",
      department: initialValues.department || "",
      about: initialValues.about || "",
      weeklyWorkingDays: initialValues.weeklyWorkingDays || "",
      dailyWorkingHours: initialValues.dailyWorkingHours || "",
      dailyBreakMinutes: initialValues.dailyBreakMinutes || "",
      salary: initialValues.salary || "",
      paymentPeriod: initialValues.paymentPeriod || "Month",
    }
  });

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
       <CardContainer>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <UniTextInput
              label="First Name"
              placeholder="Enter first name"
              value={values.firstName || ""}
              onChange={(value) => setValue("firstName", value, { shouldValidate: true })}
              error={errors.firstName?.message}
              required
            />
          </div>
          <div>
            <UniTextInput
              label="Last Name"
              placeholder="Enter last name"
              value={values.lastName || ""}
              onChange={(value) => setValue("lastName", value, { shouldValidate: true })}
              error={errors.lastName?.message}
              required
            />
          </div>
          <div>
            <UniTextInput
              label="E-mail"
              type="email"
              placeholder="Enter email address"
              value={values.email || ""}
              onChange={(value) => setValue("email", value, { shouldValidate: true })}
              error={errors.email?.message}
              required
            />
          </div>
          <div>
            <UniTextInput
              label="Phone Number"
              placeholder="Enter phone number"
              value={values.phoneNumber || ""}
              onChange={(value) => setValue("phoneNumber", value, { shouldValidate: true })}
              error={errors.phoneNumber?.message}
              required
            />
          </div>
          <div>
            <UniTextInput
              label="Job Title"
              placeholder="Enter Job Title"
              value={values.jobTitle || ""}
              onChange={(value) => setValue("jobTitle", value, { shouldValidate: true })}
              error={errors.jobTitle?.message}
              required
            />
          </div>
          <div>
            <UniTextInput
              label="Department"
              placeholder="Enter department"
              value={values.department || ""}
              onChange={(value) => setValue("department", value, { shouldValidate: true })}
              error={errors.department?.message}
              required
            />
          </div>
           <div className="md:col-span-2">
             <UniTextInput
               label="About"
               type="textarea"
               placeholder="Enter about information"
               value={values.about || ""}
               onChange={(value) => setValue("about", value, { shouldValidate: true })}
               error={errors.about?.message}
               required
             />
           </div>
         </div>

       </CardContainer>

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
