import React, { useState } from 'react'
import CardContainer from '@components/CardContainer'
import UniHeading from '@components/UniHeading'
import { UserRoundPlus } from 'lucide-react'
import EmployeeForm from '@components/empolyees/EmployeeForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function AddEmployee() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (data) => {
       console.log(data)
    }

    return (
        <CardContainer className={'p-6 space-y-4'}>
            <EmployeeForm 
            MainIcon={UserRoundPlus}
            MainHead='Add New Employee'
                onSubmit={handleSubmit}
                loading={loading}
            />
        </CardContainer>
    )
}

export default AddEmployee
