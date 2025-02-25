import React from 'react'
import CardContainer from '@components/CardContainer'
import RequestingHeader from '../../components/user/requesting/RequestingHeader'
import RequestUploadModal from '../../components/user/requesting/RequestUploadModal'

function Requesting() {
  const [open, setOpen] = React.useState(false)
  
  const handleCloseModal = () => {
    setOpen(false)
  }

  return (
    <div>
      <RequestingHeader onAddClick={() => setOpen(true)} />
      
      {/* Request Upload Modal */}
      <RequestUploadModal 
        isOpen={open} 
        onClose={handleCloseModal} 
      />
    </div>
  )
}

export default Requesting
