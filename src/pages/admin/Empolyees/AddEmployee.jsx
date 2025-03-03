import React, { useState, useEffect } from 'react'
import CardContainer from '@components/CardContainer'
import UniHeading from '@components/UniHeading'
import { UserRoundPlus } from 'lucide-react'
import EmployeeForm from '@components/empolyees/EmployeeForm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, resetUsersState } from '@store/reducers/users'

function AddEmployee() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error, isCreated } = useSelector((state) => state.users)
    
    // Reset users state when component unmounts
    useEffect(() => {
        return () => {
            dispatch(resetUsersState())
        }
    }, [dispatch])
    
    // Navigate to employees page when user is created
    useEffect(() => {
        if (isCreated) {
            toast.success('Employee added successfully')
            navigate('/employees')
        }
        
        if (error) {
            toast.error(error)
        }
    }, [isCreated, error, navigate])

    const handleSubmit = async (data) => {
        const token = localStorage.getItem('token')
        dispatch(createUser({ userData: data, token }))
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