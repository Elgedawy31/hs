
import React, { useState } from 'react'
import UniHeading from '../../UniHeading'
import { BadgeDollarSign, Pencil, Trash2 } from 'lucide-react'
import CardContainer from '../../CardContainer'
import { useNavigate, useParams } from 'react-router-dom'
import DeleteConfirmation from '../../DeleteConfirmation'

function Bonuces() {
  const {id} = useParams()
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bonusToDelete, setBonusToDelete] = useState(null);
  const navigate = useNavigate();
  
  const handleClick = () => {
 navigate('/dashboard/bonus')
  }


  const handleEdit = (bonus) => {
    // setIsEdit(true);
    // setSelectedBonus({
    //   ...bonus,
    //   amount: bonus.amount.toString()
    // });
  }

  const handleDelete = (bonus) => {
    setBonusToDelete(bonus);
    setShowDeleteModal(true);
  }

  const handleConfirmDelete = () => {
    console.log('Deleting bonus:', bonusToDelete);
    // Here you would typically make an API call to delete the bonus
    setShowDeleteModal(false);
    setBonusToDelete(null);
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setBonusToDelete(null);
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
        text="Bonus" 
        showButton
        buttonText='Add Bouns'
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
                  <button 
                    className="hover:opacity-80"
                    onClick={() => handleEdit(bonus)}
                  >
                    <Pencil size={17} className='text-text' />
                  </button>
                  <button 
                    className="text-danger hover:opacity-80"
                    onClick={() => handleDelete(bonus)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
              <p className="text-base font-[600] text-text">${bonus.amount}</p>
            </div>
          ))}
        </div>
      </CardContainer>

      <DeleteConfirmation 
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        folderName={bonusToDelete?.title}
        title="Delete Bonus"
      />
    </div>
  )
}

export default Bonuces
