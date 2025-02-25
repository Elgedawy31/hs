import React from 'react'
import { ListTodo } from 'lucide-react'
import UniHeading from '../../components/UniHeading'
import MemoCard from '../../components/MemoCard'
import CardContainer from '../../components/CardContainer'
import { useAuth } from '../../contexts/AuthContext'

function Memo() {
  const memoData = [
    {
      type: 'Attendance Warning',
      warningType: 'Final',
      date: '30/6/2025',
      description: 'Repeated late arrivals in the past month',
      requiredAction: 'Improve punctuality within next 30 days'
    },
    {
      type: 'Performance Warning',
      warningType: 'Minor',
      date: '25/6/2025',
      description: 'Missed project deadline by 2 days',
      requiredAction: 'Ensure timely project completion'
    },
    {
      type: 'Conduct Warning',
      warningType: 'Moderate',
      date: '28/6/2025',
      description: 'Inappropriate communication with team members',
      requiredAction: 'Maintain professional communication standards'
    }
  ]

  // Dummy handlers (no actual functionality needed)
  const handleEdit = (memo) => {
    console.log('Edit memo:', memo)
  }

  const handleDelete = (memo) => {
    console.log('Delete memo:', memo)
  }

  return (
    <CardContainer className="space-y-4 p-6">
      <UniHeading 
        icon={ListTodo} 
        text="My Memoes" 
        showButton={false}
      />

      {memoData.map((memo, index) => (
        <MemoCard 
          key={index}
          memo={memo}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </CardContainer>
  )
}

export default Memo
