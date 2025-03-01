import React, { useEffect, useState } from 'react'
import { ListTodo } from 'lucide-react'
import UniHeading from '../../components/UniHeading'
import MemoCard from '../../components/MemoCard'
import CardContainer from '../../components/CardContainer'
import { useAuth } from '../../contexts/AuthContext'
import { useDispatch, useSelector } from 'react-redux'
import { getAllWarnings } from '../../store/reducers/warning'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import UniPagination from '../../components/UniPagination'
import NoDataMsg from '../../components/NoDataMsg'

function Memo() {
  const { user, token } = useAuth()
  const dispatch = useDispatch()
  const { warnings, loading, error, pagination } = useSelector((state) => state.warning)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)

  useEffect(() => {
    if (token && user?.id) {
      dispatch(getAllWarnings({ 
        token, 
        page: currentPage, 
        limit, 
        userId: user.id 
      }))
    }
  }, [dispatch, token, user, currentPage, limit])

  const handlePageChange = (page) => {
    setCurrentPage(page)
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

  const handleEdit = (memo) => {
    console.log('Edit memo:', memo)
  }

  const handleDelete = (memo) => {
    console.log('Delete memo:', memo)
  }

  return (
    <CardContainer className="space-y-4 p-6 min-h-[90vh]">
      <UniHeading 
        icon={ListTodo} 
        text="My Warnings" 
        showButton={false}
      />

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : formattedWarnings.length === 0 ? (
        <NoDataMsg message="No warnings found" />
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
    </CardContainer>
  )
}

export default Memo
