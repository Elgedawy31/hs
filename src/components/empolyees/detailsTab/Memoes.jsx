import React, { useState, useEffect } from 'react'
import { ListTodo } from 'lucide-react'
import UniHeading from '../../UniHeading'
import MemoCard from '../../../components/MemoCard'
import MemoForm from './MemoForm'
import DeleteConfirmation from '../../DeleteConfirmation'
import { useDispatch, useSelector } from 'react-redux'
import { getAllWarnings, deleteWarning } from '../../../store/reducers/warning'
import { useAuth } from '../../../contexts/AuthContext'
import Loading from '../../Loading'
import ErrorMessage from '../../ErrorMessage'
import NoDataMsg from '../../NoDataMsg'
import UniPagination from '../../UniPagination'
import { useParams } from 'react-router-dom'

function Memoes() {
  const { token } = useAuth()
  const dispatch = useDispatch()
  const {id} = useParams()
  const { warnings, loading, error, pagination, isDeleted } = useSelector((state) => state.warning)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)
  const [open, setOpen] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memoToDelete, setMemoToDelete] = useState(null);

  useEffect(() => {
    if (token && id) {
      dispatch(getAllWarnings({ 
        token, 
        page: currentPage, 
        limit, 
        userId:id
      }))
    }
  }, [dispatch, token, id, currentPage, limit, isDeleted])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

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
    if (token && memoToDelete?._id) {
      dispatch(deleteWarning({
        warningId: memoToDelete._id,
        token
      }));
    }
    setShowDeleteModal(false);
    setMemoToDelete(null);
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setMemoToDelete(null);
  }

  // Map warnings to the format expected by MemoCard
  const formattedWarnings = warnings.map(warning => ({
    type: warning.title,
    warningType: warning.level,
    date: new Date(warning.createdAt || Date.now()).toLocaleDateString(),
    description: warning.description,
    requiredAction: warning.requiredAction || 'No specific action required',
    _id: warning._id,
    issuedBy: warning.issuedBy,
    attachments: warning.attachments
  }))

  return (
    <div className="space-y-4">
      <UniHeading 
        icon={ListTodo} 
        text="Memoes" 
        showButton
        buttonText='Add Memo'
        onButtonClick={handleClick}
      />

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : formattedWarnings.length === 0 ? (
        <NoDataMsg message="No warnings found for this employee" />
      ) : (
        <>
          {formattedWarnings.map((memo) => (
            <MemoCard 
              key={memo._id || Math.random()}
              memo={memo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          
          {pagination && pagination.totalPages > 1 && (
            <UniPagination 
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

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
