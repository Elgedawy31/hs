import React, { useState } from 'react'
import CardContainer from '../../CardContainer'
import { Info, Send } from 'lucide-react'
import UniBtn from '../../UniBtn'
import DeleteConfirmation from '../../DeleteConfirmation'

function Reminder() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSendReminder = () => {
    // Add your reminder sending logic here
    console.log('Reminder sent')
    setIsModalOpen(false)
  }

  return (
    <>
      <CardContainer className='flex p-2 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Info className='text-primary' size={24} />
          <span>Nader Ahmed was absent on 12 Apr 2025 without any intimation</span>
        </div>
        <UniBtn 
          text="Send a Reminder" 
          className='text-white'
          onClick={() => setIsModalOpen(true)}
        />
      </CardContainer>

      <DeleteConfirmation 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSendReminder}
        title="Send Reminder"
        Icon={Send}
        actionTxt="Send"
        fullMsg="Are you sure you want to send a reminder to Nader Ahmed regarding their absence on 12 Apr 2025?"
      />
    </>
  )
}

export default Reminder
