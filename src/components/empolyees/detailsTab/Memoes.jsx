import React, { useState } from 'react'
import { ListTodo } from 'lucide-react'
import UniHeading from '../../UniHeading'
import MemoCard from '../../../components/MemoCard'
import MemoForm from './MemoForm'
import DeleteConfirmation from '../../DeleteConfirmation'

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
        <MemoCard 
          key={index}
          memo={memo}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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
