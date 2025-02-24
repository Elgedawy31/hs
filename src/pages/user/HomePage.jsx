import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const {user} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if(user?.role ==='admin'){
            navigate('/dashboard')
        }
    } , [user])
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div>osama</div>
        <div>osama</div>
        <div>osama</div>
      </div>
    </div>
  )
}

export default HomePage
