import { Bell } from 'lucide-react'
import React from 'react'

function NotificationBtn() {
  return (
    <div className='w-[48px] h-[48px] bg-[#F8EEE6] cursor-pointer duration-300 hover:bg-primary  text-primary hover:text-text hover:scale-105  rounded-full flex items-center justify-center'>
       <Bell size={24} />
    </div>
  )
}

export default NotificationBtn
