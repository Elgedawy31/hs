import React from 'react'
import CardContainer from '@components/CardContainer'
import RequestingHeader from '../../components/user/requesting/RequestingHeader'
function Requesting() {
  const [open , setOpen] = React.useState(false)
  

  return (
    <div>
    <RequestingHeader onAddClick={() => setOpen(true)} />
    </div>
  )
}

export default Requesting
