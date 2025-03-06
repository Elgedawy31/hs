import React, { useEffect } from 'react'
import Hero from '../components/home/Hero'
import CanDo from '../components/home/CanDo'
import OurProducts from '../components/home/OurProducts'
import Doctors from '../components/home/Doctors'
import PeopleSay from '../components/home/PeopleSay'
import SEO from '../components/SEO'

function HomePage() {
  useEffect(() => {
    // Refresh AOS when component mounts
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  return (
    <div className='container mx-auto'>
      <SEO 
        title="HS - Healthcare Solutions"
        description="HS provides innovative healthcare solutions and products to improve your health and wellbeing."
        keywords="healthcare, medical solutions, health products, doctors, wellness"
        ogImage="/src/assets/Images/logo.svg"
      />
      <div data-aos="fade-up">
        <Hero />
      </div>
      <div data-aos="fade-right" data-aos-delay="100">
        <CanDo />
      </div>
      <div data-aos="fade-left" data-aos-delay="200">
        <OurProducts />
      </div>
      <div data-aos="fade-up" data-aos-delay="300">
        <Doctors />
      </div>
      <div data-aos="zoom-in" data-aos-delay="400">
        <PeopleSay />
      </div>
    </div>
  )
}

export default HomePage
