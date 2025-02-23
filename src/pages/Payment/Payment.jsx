import React from 'react'
import UniHeading from '../../components/UniHeading'
import { LucideFiles } from 'lucide-react';
import PayCards from '../../components/Payment/PayCards';
import AllPays from '../../components/Payment/AllPays';

function Payment() {
  const handleClick = () => {
    setIsNotificationModalOpen(true);
  };
  return (

    <div className='space-y-4'>
      <div className="">
        <UniHeading
          icon={LucideFiles}
          text="Payment"
          showButton
          buttonText='Export'
          onButtonClick={handleClick}
        />
      </div>
      <div>
        <PayCards />
      </div>
      <div>
        <AllPays />
      </div>

    </div>
  )
}

export default Payment