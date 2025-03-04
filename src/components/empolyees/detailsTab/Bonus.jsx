
import React, { useEffect, useState } from 'react'
import UniHeading from '../../UniHeading'
import { BadgeDollarSign, Pencil, Trash2 } from 'lucide-react'
import CardContainer from '../../CardContainer'
import { useNavigate, useParams } from 'react-router-dom'
import DeleteConfirmation from '../../DeleteConfirmation'
import { useSelector } from 'react-redux'

function Bonuces() {
  const {id} = useParams()
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bonusToDelete, setBonusToDelete] = useState(null);
  const { selectedUser } = useSelector((state) => state.users)
  const [bonuses, setBonuses] = useState([])
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

 useEffect(() => {

    if (selectedUser) {
      setBonuses(selectedUser.bonuses || []);
    }
  }
  , [selectedUser])
  return (
    <div className='space-y-6'>
      <UniHeading 
        icon={BadgeDollarSign} 
        text="Bonus" 
        buttonText='Add Bouns'
        onButtonClick={handleClick}
      />

      <CardContainer>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          {bonuses?.length > 0 ? bonuses.map((bonus, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-placeholderText text-base font-[500]">
                  {bonus.name}
                </h3>
              </div>
              <p className="text-base font-[600] text-text">${bonus.value}</p>
            </div>
          )):   <p className="text-base text-center py-5 font-medium text-placeholderText">
          No Bonuses found for this employee
        </p>}
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
