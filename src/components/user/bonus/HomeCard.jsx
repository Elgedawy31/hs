import React from 'react'
import img1 from '@assets/cliped-card.png'
import img2 from '@assets/cliped-card-dark.png'
import img3 from '@assets/stars.png'
import { useTheme } from '../../../contexts/ThemeContext'
function HomeCard({ Icon, title, description }) {
    const { currentTheme } = useTheme()
    const isDarkMode = currentTheme === 'dark'
    return (
        <div className='relative min-h-[240px] '>
            <img src={isDarkMode ? img2 : img1} alt="" className=' absolute left-0 top-0 w-full h-full' />
            <img src={img3} alt="" className='w-full h-full absolute left-0 top-0' />
            <div className='w-[60px] h-[60px] rounded-full bg-primary left-[15px] top-[8px] absolute flex items-center justify-center'>
                <Icon className='w-[24px] h-[24px] text-white' />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 flex items-center justify-center flex-col gap-3 -translate-y-1/2">
                <h1 className='text-placeholderText text-base font-semibold'>{title}</h1>
                <p className='text-text text-3xl font-[600]'>{description}</p>
            
            </div>
        </div>
    )
}

export default HomeCard
