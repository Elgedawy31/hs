import React from 'react'
import CardContainer from '../../components/CardContainer'
import UniHeading from '../../components/UniHeading'
import { UserRoundPlus } from 'lucide-react'
import EmployeeForm from '../../components/empolyees/EmployeeForm'

function AddEmployee() {
    return (
        <CardContainer className={'p-6 space-y-4'}>
            <UniHeading icon={UserRoundPlus} text="Add Employee " />
            <EmployeeForm />    

        </CardContainer>
    )
}

export default AddEmployee
