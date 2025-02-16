
import React, { useState } from 'react'
import UniHeading from '../../UniHeading'
import { BadgeDollarSign, Pencil, Trash2 } from 'lucide-react'
import CardContainer from '../../CardContainer'
import { useParams } from 'react-router-dom'
import AllowancesForm from './AllowancesForm'

function Allowances() {
  const {id} = useParams()
  const [open, setOpen] = useState(false);
  
  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const bonusData = [
    {
      title: "Transportation Bonus",
      amount: 500
    },
    {
      title: "Overtime Bonus",
      amount: 4000
    },
    {
      title: "Performance Bonus",
      amount: 100
    }
  ]

  return (
    <div className='space-y-6'>
      <UniHeading 
        icon={BadgeDollarSign} 
        text="Allowances" 
        showButton
        buttonText='Add Bounes'
        onButtonClick={handleClick}
      />

      <CardContainer>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          {bonusData.map((bonus, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-placeholderText text-base font-[500]">
                  {bonus.title}
                </h3>
                <div className="flex gap-2">
                  <button className="hover:opacity-80">
                    <Pencil size={17} className='text-text' />
                  </button>
                  <button className="text-danger hover:opacity-80">
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
              <p className="text-base font-[600] text-text">${bonus.amount}</p>
            </div>
          ))}
        </div>
      </CardContainer>

      <AllowancesForm isOpen={open} onClose={handleClose} />
    </div>
  )
}

export default Allowances
