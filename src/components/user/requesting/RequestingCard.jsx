import React from 'react'
import CardContainer from '../../CardContainer'
import { Calendar, Clock } from 'lucide-react'

const getStatusStyle = (status) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'text-success-500';
    case 'pending':
      return 'text-gray-500';
    case 'deny':
    case 'denied':
      return 'text-danger';
    default:
      return 'text-gray-500';
  }
}

function RequestingCard({ request }) {
  return (
    <CardContainer className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">{request.type}</h3>
        <span className={`${getStatusStyle(request.status)} font-medium px-3 py-1 rounded-full`}>
          {request.status}
        </span>
      </div>

      <div className="space-y-4">
        <p className="text-text text-lg">{request.description}</p>
        
        <div className="flex items-center gap-6 text-placeholderText">
          <div className="flex items-center gap-2">
            <Calendar size={20} />
            <span>{request.dateRange}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <span>{request.duration}</span>
          </div>
        </div>
      </div>
    </CardContainer>
  )
}

export default RequestingCard
