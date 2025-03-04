import React, { useEffect, useState } from 'react'
import UniHeading from '../../UniHeading'
import { BadgeDollarSign, Pencil, Trash2 } from 'lucide-react'
import CardContainer from '../../CardContainer'
import { useParams } from 'react-router-dom'
import DeleteConfirmation from '../../DeleteConfirmation'
import AllowancesForm from './AllowancesForm'
import { useSelector, useDispatch } from 'react-redux'
import { getOneUser, resetUsersState, updateUser } from '../../../store/reducers/users'
import { useAuth } from '../../../contexts/AuthContext'
import { toast } from 'react-hot-toast'

function Allowances() {
  const [open, setOpen] = useState(false);
  const [selectedAllowance, setSelectedAllowance] = useState(null);
  const [selectedAllowanceIndex, setSelectedAllowanceIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [allowanceToDelete, setAllowanceToDelete] = useState(null);
  const [allowanceToDeleteIndex, setAllowanceToDeleteIndex] = useState(null);
  const { selectedUser, isUpdated } = useSelector((state) => state.users)
  const [allowances, setAllowances] = useState([])
  const dispatch = useDispatch()
  const { token } = useAuth()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  
  const handleClick = () => {
    setIsEdit(false);
    setSelectedAllowance(null);
    setSelectedAllowanceIndex(null);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedAllowance(null);
    setSelectedAllowanceIndex(null);
    setIsEdit(false);
  }

  const handleEdit = (allowance, index) => {
    setIsEdit(true);
    setSelectedAllowance({
      ...allowance,
      value: allowance.value.toString()
    });
    setSelectedAllowanceIndex(index);
    setOpen(true);
  }

  const handleAdd = (data) => {
    setLoading(true);
    // Create a new allowance object
    const newAllowance = {
      ...data
    };
    
    // Create a copy of the current allowances array and add the new allowance
    const updatedAllowances = [...allowances, newAllowance];
    
    // Update the user with the new allowances array
    dispatch(updateUser({
      userId: selectedUser._id,
      userData: { allowances: updatedAllowances },
      token
    }))
      .unwrap()
      .then(() => {
        toast.success('Allowance added successfully');
        setAllowances(updatedAllowances);
        handleClose();
      })
      .catch((error) => {
        toast.error(error || 'Failed to add allowance');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleUpdate = (data) => {
    setLoading(true);
    // Create a copy of the current allowances array
    const updatedAllowances = [...allowances];
    // Update the allowance at the selected index
    updatedAllowances[selectedAllowanceIndex] = { ...data };
    
    // Update the user with the modified allowances array
    dispatch(updateUser({
      userId: selectedUser._id,
      userData: { allowances: updatedAllowances },
      token
    }))
      .unwrap()
      .then(() => {
        toast.success('Allowance updated successfully');
        setAllowances(updatedAllowances);
        handleClose();
      })
      .catch((error) => {
        toast.error(error || 'Failed to update allowance');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleDelete = (allowance, index) => {
    setAllowanceToDelete(allowance);
    setAllowanceToDeleteIndex(index);
    setShowDeleteModal(true);
  }

  const handleConfirmDelete = () => {   setLoading(true);
    // Create a copy of the current allowances array without the deleted allowance
    const updatedAllowances = [...allowances];
    updatedAllowances.splice(allowanceToDeleteIndex, 1);
    
    // Update the user with the modified allowances array
    dispatch(updateUser({
      userId: selectedUser._id,
      userData: { allowances: updatedAllowances },
      token
    }))
      .unwrap()
      .then(() => {
        toast.success('Allowance deleted successfully');
        setAllowances(updatedAllowances);
        setShowDeleteModal(false);
        setAllowanceToDelete(null);
        setAllowanceToDeleteIndex(null);
      })
      .catch((error) => {
        toast.error(error || 'Failed to delete allowance');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setAllowanceToDelete(null);
    setAllowanceToDeleteIndex(null);
  }

  useEffect(() => {
    if(selectedUser && selectedUser.allowances){
      setAllowances(selectedUser.allowances || []);
    }
  }, [selectedUser])

  useEffect(() => {
    if (id && token) {
        dispatch(getOneUser({ userId: id, token }))
        dispatch(resetUsersState())
    }
  }, [dispatch, id, isUpdated])

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
        <div className={allowances?.length >0 && 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
          {allowances?.length > 0 ? allowances.map((allowance, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-placeholderText text-base font-[500]">
                    {allowance.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {allowance.paymentInterval}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="hover:opacity-80"
                    onClick={() => handleEdit(allowance, index)}
                  >
                    <Pencil size={17} className='text-text' />
                  </button>
                  <button 
                    className="text-danger hover:opacity-80"
                    onClick={() => handleDelete(allowance, index)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
              <p className="text-base font-[600] text-text">
                ${allowance.value}
              </p>
            </div>
          )) : (
            <p className="text-base text-center py-5 font-medium text-placeholderText">
              No allowances found for this employee
            </p>
          )}
        </div>
      </CardContainer>

      <AllowancesForm 
        isOpen={open}
        onClose={handleClose}
        onSubmit={isEdit ? handleUpdate : handleAdd}
        initialValues={selectedAllowance || { name: '', value: '', paymentInterval: 'monthly' }}
        isEdit={isEdit}
        isLoading={loading}
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
