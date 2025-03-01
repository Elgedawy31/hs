import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InboxIcon } from '@heroicons/react/24/outline'
import CardContainer from '@components/CardContainer'
import RequestingHeader from '../../components/user/requesting/RequestingHeader'
import RequestUploadModal from '../../components/user/requesting/RequestUploadModal'
import RequestingCard from '../../components/user/requesting/RequestingCard'
import UniPagination from '../../components/UniPagination'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { getUserRequests, resetRequestsState } from '../../store/reducers/requests'
import { useAuth } from '../../contexts/AuthContext'
import NoDataMsg from '../../components/NoDataMsg'

function Requesting() {
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(10)
  
  const dispatch = useDispatch()
  const { user, token } = useAuth()
  const { requests, loading, error, pagination } = useSelector((state) => state.requests)
  
  // Use pagination values from the API response
  const totalPages = pagination?.totalPages || 1
  const apiCurrentPage = pagination?.currentPage ? Number(pagination.currentPage) : 1
  
  // Update local state if API returns a different page
  useEffect(() => {
    if (pagination?.currentPage && Number(pagination.currentPage) !== currentPage) {
      setCurrentPage(Number(pagination.currentPage))
    }
  }, [pagination])
  
  useEffect(() => {
    if (user && token) {
      dispatch(getUserRequests({ 
        userId: user._id, 
        token, 
        page: currentPage, 
        limit 
      }))
    }
    
    return () => {
      dispatch(resetRequestsState())
    }
  }, [dispatch, user, token, currentPage, limit])
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  
  const handleCloseModal = () => {
    setOpen(false)
  }

  return (
    <div className='space-y-8'>
      <RequestingHeader onAddClick={() => setOpen(true)} />

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          {requests && requests.length > 0 ? (
            <CardContainer className="space-y-4 p-6">
              {requests.map(request => (
                <RequestingCard key={request._id || request.id} request={request} />
              ))}
            </CardContainer>
          ) : (
            <NoDataMsg 
              title="No requests found" 
              description="You haven't submitted any requests yet"
              additionalMessage="Create a new request by clicking the 'Add Request' button above"
              icon={InboxIcon}
            />
          )}
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <UniPagination
                currentPage={apiCurrentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}

      <RequestUploadModal 
        isOpen={open} 
        onClose={handleCloseModal} 
      />
    </div>
  )
}

export default Requesting
