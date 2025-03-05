import React from 'react'

function MonthlyCard({ hours, minutes, label, icon: Icon, prefix = '' }) {
  return (
    <div className="bg-background rounded-3xl px-6 py-8 border border-borderColor">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-[24px] font-[600] text-text whitespace-nowrap">
            {prefix}{hours} h {minutes > 0 ? `${minutes} m` : ''}
          </h3>
        </div>
        <div className={`w-[38px] h-[38px] rounded-full bg-[#F8EEE6] flex items-center justify-center`}>
          <Icon className="w-[22px] h-[22px] text-primary " />
        </div>
      </div>
      <p className="text-placeholderText mt-2 text-lg">{label}</p>

    </div>
  )
}

export default MonthlyCard
