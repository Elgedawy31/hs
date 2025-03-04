import React, { useEffect, useState } from 'react'
import CustomTabs from '@components/CustomTabs'
import Leaves from '@components/empolyees/tabs/Leaves';
import DetailsTab from '@components/empolyees/tabs/DetailsTab';
import DeilyTab from '@components/empolyees/tabs/DailyActivities';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../contexts/AuthContext';
import { getOneUser } from '../../../store/reducers/users';
import Loading from '../../../components/Loading';

function EmployeeDetails() {
  const [activeTab, setActiveTab] = useState("details");
  const { selectedUser, loading, error } = useSelector((state) => state.users)
  
  const {id} = useParams();
  const dispatch = useDispatch()
  const {token} = useAuth()

  const tabs = [
    { id: "details", label: "Details" },
    { id: "daily", label: "Daily Activity" },
    { id: "leaves", label: "Leaves" },
  ];
    useEffect(() => {
        if (id && token) {
            dispatch(getOneUser({ userId: id, token }))
        }
    }, [dispatch, id, token])
  return (
    <div className="w-full">
      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {
        loading? <Loading /> :<div className="mt-4">
        {activeTab === "details" && <DetailsTab />}
        {activeTab === "daily" && <DeilyTab />}
        {activeTab === "leaves" && <Leaves />}
        </div>
      }
      
     
    </div>
  )
}

export default EmployeeDetails
