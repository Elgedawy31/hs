import React from 'react'
import Hero from '../components/home/Hero'
import CanDo from '../components/home/CanDo'
import OurProducts from '../components/home/OurProducts'

function HomePage() {
  return (
    <div className='container mx-auto'>
    <Hero />
    <CanDo />
    <OurProducts />
    </div>
  )
}

export default HomePage
