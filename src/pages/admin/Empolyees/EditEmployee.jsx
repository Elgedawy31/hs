import React, { useEffect, useState } from 'react'
import CardContainer from '@components/CardContainer'
import { UserRoundPen } from 'lucide-react'
import EmployeeForm from '@components/empolyees/EmployeeForm'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneUser, updateUser, resetUsersState } from '@store/reducers/users'
import { useAuth } from '../../../contexts/AuthContext'
import { toast } from 'react-hot-toast'
import Loading from '@components/Loading'
import NoDataMsg from '@components/NoDataMsg'
import { getAllSystemUsers } from '../../../store/reducers/users'
import { select } from '@heroui/theme'

function EditEmployee() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { token } = useAuth()
    
    // Get user data from Redux store
    const { selectedUser, loading, error, isUpdated } = useSelector((state) => state.users)
    const [NewSeelctedUser, setNewSeelctedUser] = useState({});
    
    // Fetch user data on component mount
    useEffect(() => {
        if (id && token) {
            dispatch(getOneUser({ userId: id, token }))
        }
    }, [dispatch, id, token])
    
    // Reset users state when component unmounts
    useEffect(() => {
        return () => {
            dispatch(resetUsersState())
        }
    }, [dispatch])
    
    // Navigate back when user is updated
    useEffect(() => {
        if (isUpdated) {
            toast.success('Employee updated successfully')
            // navigate(-1)
        }
        
        if (error) {
            toast.error(error)
        }
    }, [isUpdated, error, navigate])
    useEffect(() => {
        dispatch(getAllSystemUsers({ token, page: 1, limit: 10000 }));
      }, [dispatch, token]);
    // Format initial values for the form
    useEffect(() => {
        if(selectedUser){
           setNewSeelctedUser({
            ...selectedUser,
            weeklyWorkingDays: selectedUser.weeklyWorkingDays?.toString() || "",
            dailyWorkingHours: selectedUser.dailyWorkingHours?.toString() || "",
            annualLeavs: selectedUser.annualLeavs?.toString() || "",
            weekEnd: selectedUser.weekEnd || [],
            salary: selectedUser.salary?.toString() || "",
            paymentInterval: selectedUser.paymentInterval || "monthly",
            paymentPeriod: selectedUser.paymentPeriod?.toString() || "",
           })
        }
    } , [selectedUser])
    const handleSubmit = async (data) => {
        dispatch(updateUser({ 
            userId: id, 
            userData: data, 
            token 
        }))
    }

    if (loading && !selectedUser) {
        return (
            <CardContainer className={'p-6 space-y-4'}>
                <Loading />
            </CardContainer>
        )
    }
    
    if (error && !selectedUser) {
        return (
            <CardContainer className={'p-6 space-y-4'}>
                <NoDataMsg 
                    title="Failed to load employee" 
                    description="An error occurred while loading employee data. Please try again later." 
                />
            </CardContainer>
        )
    }

    return (
        <CardContainer className={'p-6 space-y-4'}>
            <EmployeeForm 
                MainIcon={UserRoundPen}
                MainHead='Edit Employee Information'
                onSubmit={handleSubmit}
                loading={loading}
                initialValues={NewSeelctedUser}
            />
        </CardContainer>
    )
}

export default EditEmployee
