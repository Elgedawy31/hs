import React, { useState, useEffect } from 'react'
import CardContainer from '../../components/CardContainer'
import UniHeading from '../../components/UniHeading'
import { UserRoundPen } from 'lucide-react'
import EmployeeForm from '../../components/empolyees/EmployeeForm'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

function EditEmployee() {
    const [loading, setLoading] = useState(false)
    const [employeeData, setEmployeeData] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (data) => {
        console.log(data)
    }


    return (
        <CardContainer className={'p-6 space-y-4'}>
            <EmployeeForm 
                MainIcon={UserRoundPen}
                MainHead='Edit Employee Information'
                onSubmit={handleSubmit}
                loading={loading}
                initialValues={{}}
            />
        </CardContainer>
    )
}

export default EditEmployee
