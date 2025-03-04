
import React from 'react'
import UniHeading from '../../UniHeading'
import { UserRoundPen } from 'lucide-react'
import CardContainer from '../../CardContainer'
import { useNavigate, useParams } from 'react-router-dom'

function PersonalInformation() {
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
            <p className="text-base font-medium text-text ont-[600]">Nouran</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-placeholderText text-base font-[500]">Last Name</h3>
            <p className="text-base font-medium text-text ont-[600]">Khaled Abdelwahab</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-placeholderText text-base font-[500]">Email Address</h3>
            <p className="text-base font-medium text-text ont-[600]">Nouran.khaled@gmail.com</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-placeholderText text-base font-[500]">Phone Number</h3>
            <p className="text-base font-medium text-text ont-[600]">012 079 818 17</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-placeholderText text-base font-[500]">Job Title</h3>
            <p className="text-base font-medium text-text ont-[600]">UI/UX Designer</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-placeholderText text-base font-[500]">Creation Date</h3>
            <p className="text-base font-medium text-text ont-[600]">Dec 09, 2024</p>
          </div>

          <div className="col-span-2 space-y-2">
            <h3 className="text-placeholderText text-base font-[500]">About</h3>
            <p className="text-base font-medium text-text ont-[600]">
              Experienced UI/UX designer with a passion for creating intuitive and visually appealing user interfaces. 
              Skilled in user research, wireframing, and prototyping. Strong focus on user-centered design principles 
              and accessibility standards.
            </p>
          </div>
        </div>
      </CardContainer>
    </div>
  )
}

export default PersonalInformation
