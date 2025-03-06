import React from 'react'
import Hero from '../components/home/Hero'
import CanDo from '../components/home/CanDo'
import OurProducts from '../components/home/OurProducts'
import Doctors from '../components/home/Doctors'
import PeopleSay from '../components/home/PeopleSay'
import SEO from '../components/SEO'

function HomePage() {
  return (
    <div className='container mx-auto'>
      <SEO 
        title="HS - Healthcare Solutions"
        description="HS provides innovative healthcare solutions and products to improve your health and wellbeing."
        keywords="healthcare, medical solutions, health products, doctors, wellness"
        ogImage="/src/assets/Images/logo.svg"
      />
      <Hero />
      <CanDo />
      <OurProducts />
      <Doctors />
      <PeopleSay />
    </div>
  )
}

export default HomePage
