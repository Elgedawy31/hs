import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import CardContainer from '../../CardContainer';
import { Calendar, Edit, Flag, Tag, Trash2 } from 'lucide-react';
import dayjs from 'dayjs';
import { IMAGE_URL } from '../../../utils/constants';
import { deleteRequest } from '../../../store/reducers/requests';
import { useAuth } from '../../../contexts/AuthContext';
import DeleteConfirmation from '../../DeleteConfirmation';
import toast from 'react-hot-toast';

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
};

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
};

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
};

function RequestingCard({ request, onEdit }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const { token } = useAuth();
  
  const formatDate = (dateString) => {
    try {
      return dayjs(dateString).format('MMM DD, YYYY HH:mm');
    } catch (error) {
      return dateString;
    }
  };
  
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteRequest({ 
      requestId: request._id || request.id, 
      token 
    }))
      .unwrap()
      .then(() => {
        toast.success('Request deleted successfully');
      })
      .catch((error) => {
        toast.error(error || 'Failed to delete request');
      })
      .finally(() => {
        setShowDeleteModal(false);
      });
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(request);
    }
  };

  return (
    <>
      <CardContainer className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">{request.title || 'Untitled Request'}</h3>
            <span className={`text-sm px-2 py-1 rounded-full ${getPriorityStyle(request.priority)}`}>
              {request.priority || 'Normal'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusStyle(request.status)}`}>
              {request.status || 'Unknown'}
            </span>
            
            {/* Only show edit/delete buttons for pending requests */}
            {(!request.status || request.status.toLowerCase() === 'pending') && (
              <>
                <button 
                  onClick={handleEdit}
                  className="p-2 text-placeholderText hover:text-primary transition-colors"
                  title="Edit request"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={handleDelete}
                  className="p-2 text-placeholderText hover:text-danger transition-colors"
                  title="Delete request"
                >
                  <Trash2 size={18} />
                </button>
              </>
            )}
          </div>
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
            
            {request.priority && (
              <div className="flex items-center gap-2">
                <Flag size={16} />
                <span>Priority: {request.priority}</span>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-placeholderText mb-2">Attachments</h3>
            {!request.attachments || request.attachments.length === 0 ? (
              <p className="text-placeholderText/20 italic">No attachments</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {request.attachments.map((attachment, index) => (
                  <a 
                    key={index}
                    href={attachment.startsWith('http') ? attachment : `${IMAGE_URL}/${attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 rounded-md underline transition-colors"
                  >
                    <span className="text-sm">{attachment.split('/').pop()}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContainer>
      
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Request"
        message="Are you sure you want to delete this request? This action cannot be undone."
      />
    </>
  );
}

RequestingCard.propTypes = {
  request: PropTypes.object.isRequired,
  onEdit: PropTypes.func
};

export default RequestingCard;
