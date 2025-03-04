import React, { useEffect } from 'react';
import CardContainer from "../CardContainer";
import UniHeading from "../UniHeading";
import UniTextInput from "../UniTextInput";
import { BriefcaseBusiness, BadgeDollarSign, Calendar } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllSystemUsers } from '../../store/reducers/users';
import { useAuth } from '../../contexts/AuthContext';

const EmployeeWorkInfo = ({ 
  data = {}, 
  disabled = false,
  onChange,
  errors = {}
}) => {
  const { systemUsers } = useSelector(state => state.users);
  return (
    <div className="space-y-6">
      {/* User Selection Section */}
      <UniHeading text="User Information" icon={BriefcaseBusiness} className="mb-6" />
      <CardContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <UniTextInput
              label="Select User"
              type="select"
              placeholder="Select a user"
              value={data.userId || ""}
              onChange={(value) => onChange?.("userId", value)}
              options={systemUsers.map(user => ({ 
                value: user._id, 
                label: `${user?.name?.first} ${user?.name?.last}` || 'Unknown User'
              }))}
              error={errors.userId?.message}
              disabled={disabled}
              required
            />
          </div>
        </div>
      </CardContainer>

      {/* Working Information Section */}
      <UniHeading text="Working Information" icon={BriefcaseBusiness} className="mb-6" />
      <CardContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <UniTextInput
              label="Weekly Working Days"
              type="number"
              max={7}
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
              max={24}
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
              label="Annual Leaves"
              type="number"
              max={365}
              placeholder="Enter annual leaves"
              value={data.annualLeavs || ""}
              onChange={(value) => onChange?.("annualLeavs", value)}
              error={errors.annualLeavs?.message}
              disabled={disabled}
              required
            />
          </div>
        </div>
      </CardContainer>

      {/* Weekend Selection Section */}
      <UniHeading text="Weekend Days" icon={Calendar} className="mb-6" />
      <CardContainer>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <UniTextInput
              label="Weekend Days"
              type="select"
              multiple
              placeholder="Select weekend days"
              value={data.weekEnd || []}
              onChange={(value) => onChange?.("weekEnd", value)}
              options={[
                { value: "sunday", label: "Sunday" },
                { value: "monday", label: "Monday" },
                { value: "tuesday", label: "Tuesday" },
                { value: "wednesday", label: "Wednesday" },
                { value: "thursday", label: "Thursday" },
                { value: "friday", label: "Friday" },
                { value: "saturday", label: "Saturday" }
              ]}
              error={errors.weekEnd?.message}
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
              label="Payment Interval"
              type="select"
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "weekly", label: "Weekly" },
                { value: "daily", label: "Daily" }
              ]}
              value={data.paymentInterval || "monthly"}
              onChange={(value) => onChange?.("paymentInterval", value)}
              error={errors.paymentInterval?.message}
              disabled={disabled}
              required
            />
          </div>
          <div>
            <UniTextInput
              label="Payment Period"
              type="number"
              placeholder="Enter payment period"
              value={data.paymentPeriod || ""}
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
