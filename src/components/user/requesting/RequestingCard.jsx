import React from 'react'
import CardContainer from '../../CardContainer'
import { Calendar, Clock, FileText, Flag, Tag } from 'lucide-react'
import dayjs from 'dayjs'

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'approved':
      return 'text-success bg-success/10';
    case 'pending':
      return 'text-warning bg-warning/10';
    case 'rejected':
    case 'deny':
    case 'denied':
      return 'text-danger bg-danger/10';
    default:
      return 'text-gray-500 bg-gray-100';
  }
}

const getPriorityStyle = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'text-danger bg-danger/10';
    case 'medium':
      return 'text-warning bg-warning/10';
    case 'low':
      return 'text-success bg-success/10';
    default:
      return 'text-gray-500 bg-gray-100';
  }
}

const getTypeLabel = (type) => {
  const typeMap = {
    'leave': 'Leave',
    'support': 'Support',
    'payroll': 'Payroll',
    'attendance': 'Attendance',
    'equipment': 'Equipment',
    'other': 'Other'
  };
  
  return typeMap[type?.toLowerCase()] || type;
}

function RequestingCard({ request }) {
  const formatDate = (dateString) => {
    try {
      return dayjs(dateString).format('MMM DD, YYYY HH:mm');
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <CardContainer className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">{request.title || 'Untitled Request'}</h3>
          <span className={`text-sm px-2 py-1 rounded-full ${getPriorityStyle(request.priority)}`}>
            {request.priority || 'Normal'}
          </span>
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusStyle(request.status)}`}>
          {request.status || 'Unknown'}
        </span>
      </div>

      <div className="space-y-4">
        <p className="text-text">{request.description || 'No description provided'}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-placeholderText text-sm">
          {request.type && (
            <div className="flex items-center gap-2">
              <Tag size={16} />
              <span>{getTypeLabel(request.type)}</span>
            </div>
          )}
          
          {request.createdAt && (
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Created: {formatDate(request.createdAt)}</span>
            </div>
          )}
          
          {request.updatedAt && (
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Updated: {formatDate(request.updatedAt)}</span>
            </div>
          )}
          
          {request.priority && (
            <div className="flex items-center gap-2">
              <Flag size={16} />
              <span>Priority: {request.priority}</span>
            </div>
          )}
        </div>
        
        {request.attachments && request.attachments.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <FileText size={16} />
              Attachments ({request.attachments.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {request.attachments.map((attachment, index) => (
                <div key={index} className="text-xs bg-gray-100 rounded-md px-2 py-1">
                  {typeof attachment === 'string' 
                    ? attachment.split('/').pop() 
                    : attachment.name || `File ${index + 1}`}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CardContainer>
  )
}

export default RequestingCard
