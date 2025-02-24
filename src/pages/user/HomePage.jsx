import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import HomeCard from '../../components/user/bonus/HomeCard'
import CardContainer from '../../components/CardContainer'
import { CircleCheckBig, ClockAlert, StepForward } from 'lucide-react'

function HomePage() {
    const {user} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if(user?.role ==='admin'){
            navigate('/dashboard')
        }
    } , [user])
  return (
    <CardContainer>
      <div className="grid grid-cols-3 gap-8">
        <HomeCard Icon={StepForward} title='Tracked Time' description='167 h 19 m' />
        <HomeCard Icon={CircleCheckBig} title='Producitity' description='167 h 19 m' />
        <HomeCard Icon={ClockAlert} title='Overtime' description='16 h' />
      </div>
    </CardContainer>
  )
}

export default HomePage
