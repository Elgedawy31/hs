import React from 'react'
import CardContainer from '@components/CardContainer'
import RequestingHeader from '../../components/user/requesting/RequestingHeader'
import RequestUploadModal from '../../components/user/requesting/RequestUploadModal'
import RequestingCard from '../../components/user/requesting/RequestingCard'

function Requesting() {
  const [open, setOpen] = React.useState(false)
  
  // Sample request data
  const requests = [
    {
      id: 1,
      type: 'Annual leaves',
      description: 'Friend\'s Wedding Celebration',
      dateRange: '10 Apr 2025 to 13 Apr 2025',
      duration: '3 Days',
      status: 'Pending'
    },
    {
      id: 2,
      type: 'Annual leaves',
      description: 'Friend\'s Wedding Celebration',
      dateRange: '10 Apr 2025 to 13 Apr 2025',
      duration: '3 Days',
      status: 'Pending'
    },
    {
      id: 3,
      type: 'Annual leaves',
      description: 'Friend\'s Wedding Celebration',
      dateRange: '10 Apr 2025 to 13 Apr 2025',
      duration: '3 Days',
      status: 'Approved'
    },
    {
      id: 4,
      type: 'Equipment Request',
      description: 'Friend\'s Wedding Celebration',
      dateRange: '10 Apr 2025 to 13 Apr 2025',
      duration: '3 Days',
      status: 'Deny'
    }
  ]
  
  const handleCloseModal = () => {
    setOpen(false)
  }

  return (
    <div className='space-y-8'>
      <RequestingHeader onAddClick={() => setOpen(true)} />

      <CardContainer className="space-y-4 p-6">
        {requests.map(request => (
          <RequestingCard key={request.id} request={request} />
        ))}
      </CardContainer>

      <RequestUploadModal 
        isOpen={open} 
        onClose={handleCloseModal} 
      />
    </div>
  )
}

export default Requesting
