import React, { useState } from 'react'
import { ListTodo, Pencil, Trash2 } from 'lucide-react'
import UniHeading from '../../UniHeading'
import MemoForm from './MemoForm'
import DeleteConfirmation from '../../DeleteConfirmation'

const getWarningTypeStyle = (type) => {
  switch (type.toLowerCase()) {
    case 'minor':
      return 'text-success-500 bg-success-100 px-2 py-1 rounded';
    case 'moderate':
      return 'text-orange-500 bg-orange-100 px-2 py-1 rounded';
    case 'final':
      return 'text-danger bg-red-100 px-2 py-1 rounded';
    default:
      return 'text-gray-500 bg-gray-100 px-2 py-1 rounded';
  }
}

function Memoes() {
  const [open, setOpen] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memoToDelete, setMemoToDelete] = useState(null);

  const handleClick = () => {
    setIsEdit(false);
    setSelectedMemo(null);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedMemo(null);
    setIsEdit(false);
  }

  const handleEdit = (memo) => {
    setIsEdit(true);
    setSelectedMemo({
      title: memo.type,
      severity: memo.warningType.toLowerCase(),
      description: memo.description,
      requiredAction: memo.requiredAction
    });
    setOpen(true);
  }

  const handleAdd = (data) => {
    console.log('Adding new memo:', data);
    // Here you would typically make an API call to save the memo
    handleClose();
  }

  const handleUpdate = (data) => {
    console.log('Updating memo:', data);
    // Here you would typically make an API call to update the memo
    handleClose();
  }

  const handleDelete = (memo) => {
    setMemoToDelete(memo);
    setShowDeleteModal(true);
  }

  const handleConfirmDelete = () => {
    console.log('Deleting memo:', memoToDelete);
    // Here you would typically make an API call to delete the memo
    setShowDeleteModal(false);
    setMemoToDelete(null);
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setMemoToDelete(null);
  }

  const memoData = [
    {
      type: 'Attendance Warning',
      warningType: 'Final',
      date: '30/6/2025',
      description: 'Repeated late arrivals in the past month',
      requiredAction: 'Improve punctuality within next 30 days'
    },
    {
      type: 'Attendance Warning',
      warningType: 'Minor',
      date: '25/6/2025',
      description: 'Late arrival on Monday',
      requiredAction: 'Ensure timely arrival'
    },
    {
      type: 'Attendance Warning',
      warningType: 'Moderate',
      date: '28/6/2025',
      description: 'Multiple late arrivals this week',
      requiredAction: 'Maintain consistent arrival time'
    }
  ]

  return (
    <div className="space-y-4">
      <UniHeading 
        icon={ListTodo} 
        text="Memoes" 
        showButton
        buttonText='Add Memo'
        onButtonClick={handleClick}
      />

      {memoData.map((memo, index) => (
        <div key={index} className="bg-background rounded-lg border border-borderColor p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-primary font-medium">{memo.type}</span>
              <span className={`${getWarningTypeStyle(memo.warningType)} font-medium`}>
                {memo.warningType} Warning
              </span>
              <span className="text-placeholderText">{memo.date}</span>
            </div>
            <div className="flex gap-2">
              <button 
                className="hover:opacity-80"
                onClick={() => handleEdit(memo)}
              >
                <Pencil size={17} className="text-text" />
              </button>
              <button 
                className="text-danger hover:opacity-80"
                onClick={() => handleDelete(memo)}
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-placeholderText mb-2">Description</h3>
              <p className="text-text">{memo.description}</p>
            </div>

            <div>
              <h3 className="text-placeholderText mb-2">Required Action:</h3>
              <p className="text-text">{memo.requiredAction}</p>
            </div>
          </div>
        </div>
      ))}

      <MemoForm 
        isOpen={open}
        onClose={handleClose}
        onSubmit={isEdit ? handleUpdate : handleAdd}
        initialValues={selectedMemo}
        isEdit={isEdit}
      />

      <DeleteConfirmation 
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        folderName={memoToDelete?.type}
        title="Delete Memo"
      />
    </div>
  )
}

export default Memoes
