
import React from 'react'
import UniHeading from '../../UniHeading'
import { UserRoundPen } from 'lucide-react'
import CardContainer from '../../CardContainer'
import { useNavigate, useParams } from 'react-router-dom'

function PersonalInformation({user}) {
  const navigate = useNavigate()
  const {id} = useParams()
  const handleClick = () => {
    navigate(`/dashboard/employees/edit/${id}`)
  }
  return (
    <div className='space-y-6'>
      <UniHeading 
        icon={UserRoundPen} 
        text="Personal Information" 
        showButton
        buttonText='Edit Employee Information'
        onButtonClick={handleClick}
      />

      <CardContainer>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="text-placeholderText text-base font-[500]">First Name</h3>
            <p className="text-base font-medium text-text ont-[600]">{user?.name?.first}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-placeholderText text-base font-[500]">Last Name</h3>
            <p className="text-base font-medium text-text ont-[600]">{user?.name?.last}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-placeholderText text-base font-[500]">Email Address</h3>
            <p className="text-base font-medium text-text ont-[600] capitalize">{user?.email}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-placeholderText text-base font-[500]">Role</h3>
            <p className="text-base font-medium text-text ont-[600] capitalize">{user?.role}</p>
          </div>

        </div>
      </CardContainer>
    </div>
  )
}

export default PersonalInformation
