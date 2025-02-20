import React from 'react';
import CardContainer from "../CardContainer";
import UniHeading from "../UniHeading";
import UniTextInput from "../UniTextInput";
import { BriefcaseBusiness, BadgeDollarSign } from "lucide-react";

const EmployeeWorkInfo = ({ 
  data = {}, 
  disabled = false,
  onChange,
  errors = {}
}) => {
  return (
    <div className="space-y-6">
      {/* Working Information Section */}
      <UniHeading text="Working Information" icon={BriefcaseBusiness} className="mb-6" />
      <CardContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <UniTextInput
              label="Weekly Working Days"
              type="number"
              placeholder="Enter number of working days"
              value={data.weeklyWorkingDays || ""}
              onChange={(value) => onChange?.("weeklyWorkingDays", value)}
              error={errors.weeklyWorkingDays?.message}
              disabled={disabled}
              required
            />
          </div>
          <div>
            <UniTextInput
              label="Daily Working Hours"
              type="number"
              placeholder="Enter working hours per day"
              value={data.dailyWorkingHours || ""}
              onChange={(value) => onChange?.("dailyWorkingHours", value)}
              error={errors.dailyWorkingHours?.message}
              disabled={disabled}
              required
            />
          </div>
          <div>
            <UniTextInput
              label="Daily Break Minutes"
              type="number"
              placeholder="Enter break minutes per day"
              value={data.dailyBreakMinutes || ""}
              onChange={(value) => onChange?.("dailyBreakMinutes", value)}
              error={errors.dailyBreakMinutes?.message}
              disabled={disabled}
              required
            />
          </div>
        </div>
      </CardContainer>

      {/* Payroll Information Section */}
      <UniHeading text="Payroll Information" icon={BadgeDollarSign} className="mb-6" />
      <CardContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <UniTextInput
              label="Salary"
              type="number"
              placeholder="Enter salary amount"
              value={data.salary || ""}
              onChange={(value) => onChange?.("salary", value)}
              error={errors.salary?.message}
              disabled={disabled}
              required
            />
          </div>
          <div>
            <UniTextInput
              label="Payment Period"
              type="select"
              options={[
                { value: "Month", label: "Monthly" },
                { value: "Week", label: "Weekly" },
                { value: "Day", label: "Daily" }
              ]}
              value={data.paymentPeriod || "Month"}
              onChange={(value) => onChange?.("paymentPeriod", value)}
              error={errors.paymentPeriod?.message}
              disabled={disabled}
              required
            />
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

export default EmployeeWorkInfo;
