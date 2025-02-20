
import React from 'react'
import UniHeading from '../../UniHeading'
import { ChartColumn, Play, LayoutGrid, Clock } from 'lucide-react'
import MonthlyCard from './MonthlyCard'

function MonthlyDashboard({showHeader=true}) {
  return (
    <div className='space-y-6'>
     {showHeader && <UniHeading text="Monthly Dashboard" icon={ChartColumn} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MonthlyCard 
          hours={167}
          minutes={30}
          label="Tracked time"
          icon={Play}
        />
        <MonthlyCard 
          hours={167}
          minutes={30}
          label="Productivity"
          icon={LayoutGrid}
        />
        <MonthlyCard 
          hours={23}
          minutes={0}
          label="Overtime"
          icon={Clock}
          prefix="+"
        />
      </div>
    </div>
  )
}

export default MonthlyDashboard
