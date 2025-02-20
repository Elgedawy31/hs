import React, { useState } from 'react'
import UniHeading from '../../UniHeading'
import { BadgeDollarSign, Pencil, Trash2 } from 'lucide-react'
import CardContainer from '../../CardContainer'
import { useParams } from 'react-router-dom'
import DeleteConfirmation from '../../DeleteConfirmation'
import AllowancesForm from './AllowancesForm'

function Allowances() {
  const {id} = useParams()
  const [open, setOpen] = useState(false);
  const [selectedAllowance, setSelectedAllowance] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [allowanceToDelete, setAllowanceToDelete] = useState(null);
  
  const handleClick = () => {
    setIsEdit(false);
    setSelectedAllowance(null);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedAllowance(null);
    setIsEdit(false);
  }

  const handleEdit = (allowance) => {
    setIsEdit(true);
    setSelectedAllowance({
      ...allowance,
      rate: allowance.rate.toString()
    });
    setOpen(true);
  }

  const handleAdd = (data) => {
    console.log('Adding new allowance:', data);
    // Here you would typically make an API call to save the allowance
    handleClose();
  }

  const handleUpdate = (data) => {
    console.log('Updating allowance:', data);
    // Here you would typically make an API call to update the allowance
    handleClose();
  }

  const handleDelete = (allowance) => {
    setAllowanceToDelete(allowance);
    setShowDeleteModal(true);
  }

  const handleConfirmDelete = () => {
    console.log('Deleting allowance:', allowanceToDelete);
    // Here you would typically make an API call to delete the allowance
    setShowDeleteModal(false);
    setAllowanceToDelete(null);
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setAllowanceToDelete(null);
  }

  const allowanceData = [
    {
      name: "Transportation",
      type: "Fixed",
      rate: 500
    },
    {
      name: "Housing",
      type: "Percentage",
      rate: 10
    }
  ]

  return (
    <div className='space-y-6'>
      <UniHeading 
        icon={BadgeDollarSign} 
        text="Allowances" 
        showButton
        buttonText='Add Allowance'
        onButtonClick={handleClick}
      />

      <CardContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allowanceData.map((allowance, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-placeholderText text-base font-[500]">
                    {allowance.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {allowance.type}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="hover:opacity-80"
                    onClick={() => handleEdit(allowance)}
                  >
                    <Pencil size={17} className='text-text' />
                  </button>
                  <button 
                    className="text-danger hover:opacity-80"
                    onClick={() => handleDelete(allowance)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
              <p className="text-base font-[600] text-text">
                {allowance.type === 'Fixed' ? `$${allowance.rate}` : `${allowance.rate}%`}
              </p>
            </div>
          ))}
        </div>
      </CardContainer>

      <AllowancesForm 
        isOpen={open}
        onClose={handleClose}
        onSubmit={isEdit ? handleUpdate : handleAdd}
        initialValues={selectedAllowance || { name: '', type: '', rate: '' }}
        isEdit={isEdit}
      />

      <DeleteConfirmation 
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        folderName={allowanceToDelete?.name}
        title="Delete Allowance"
      />
    </div>
  )
}

export default Allowances
