import React from 'react'
import Hero from '../components/home/Hero'
import CanDo from '../components/home/CanDo'
import OurProducts from '../components/home/OurProducts'
import Doctors from '../components/home/Doctors'

function HomePage() {
  return (
    <div className='container mx-auto'>
    <Hero />
    <CanDo />
    <OurProducts />
    <Doctors />
    </div>
  )
}

export default HomePage
