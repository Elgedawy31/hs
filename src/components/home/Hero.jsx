import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import '../home/CanDo.css';

import hero1 from '../../assets/Images/hero-1.svg';
import hero2 from '../../assets/Images/hero-2.svg';
import { Star } from 'lucide-react';
import UniHeading from '../UniHeading';

function Hero() {
  const { theme } = useTheme();
  
  // Features data array
  const features = [
    {
      id: 1,
      title: "Experienced Dermatologist",
      icon: <Star size={20} strokeWidth={2} />
    },
    {
      id: 2,
      title: "Advanced Technology",
      icon: <Star size={20} strokeWidth={2} />
    },
    {
      id: 3,
      title: "Personalized Treatment",
      icon: <Star size={20} strokeWidth={2} />
    },
    {
      id: 4,
      title: "10+ Years Experiences",
      icon: <Star size={20} strokeWidth={2} />
    }
  ];
  // Hero slides array with images and text
  const heroSlides = [
    {
      id: 1,
      image: hero1,
      alt: "Skin treatment procedure",
      title: "Glow with Confidence, Your Skin is our care",
      description: "At Dermatology Clinic, we believe that healthy skin is the key to confidence. Our expert dermatologists provide advanced treatments and personalized care."
    },
    {
      id: 2,
      image: hero2,
      alt: "Dermatology examination",
      title: "Advanced Skincare Solutions",
      description: "Experience the latest in dermatological treatments with our state-of-the-art technology and personalized care plans for your unique skin needs."
    }
  ];
  
  return (
    <div className="py-2 md:py-4">
      {/* Main hero container */}
      <div className="relative">
        {/* Hero Swiper with images and text */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          initialSlide={0}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.hero-button-next',
            prevEl: '.hero-button-prev',
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          className="cando-swiper hero-swiper"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative">
                {/* Image with overlay */}
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  {/* Base image */}
                  <img 
                    draggable="false" 
                    src={slide.image} 
                    alt={slide.alt} 
                    className="w-full h-auto"
                  />
                  
                  {/* Beautiful overlay for the entire image */}
                  <div className="absolute inset-0">
                    {/* Primary color overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/20 mix-blend-overlay"></div>
                    {/* Subtle texture overlay */}
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
                    {/* Vignette effect */}
                    <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.4)]"></div>
                    {/* Optional: subtle color tint */}
                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-color"></div>
                  </div>
                </div>
                
                {/* Text positioned at top center of the image+overlay */}
                <div className="absolute inset-0 flex flex-col justify-start items-center text-center pt-8 md:pt-12 lg:pt-16 px-6 md:px-10 lg:px-12 z-10">
                  {/* Slide title */}
                  <div className="mb-3 md:mb-4 max-w-3xl">
                    <p 
                      className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                      style={{ 
                        color: 'white',
                        fontFamily: 'Montaga, serif',
                        textShadow: '0px 2px 8px rgba(0, 0, 0, 0.7)'
                      }}
                    >
                      {slide.title}
                    </p>
                  </div>
                  
                  {/* Slide description */}
                  <div className="mb-2 max-w-2xl">
                    <p 
                      className="text-base md:text-xl lg:text-2xl"
                      style={{ 
                        color: 'white',
                        fontFamily: 'Montaga, serif',
                        textShadow: '0px 1px 4px rgba(0, 0, 0, 0.7)'
                      }}
                    >
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom navigation arrows */}
        <div className="hero-button-prev swiper-button-prev !absolute !left-2 md:!left-4 top-1/2 transform -translate-y-1/2 z-20">
          <svg className="transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
        <div className="hero-button-next swiper-button-next !absolute !right-2 md:!right-4 top-1/2 transform -translate-y-1/2 z-20">
          <svg className="transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {features.map((feature) => (
          <div key={feature.id} className="flex items-center">
            <div 
              className="mr-3 flex-shrink-0"
              style={{ color: theme.primary }}
            >
              {feature.icon}
            </div>
            <h3 
              className="text-base md:text-lg font-semibold"
              style={{ color: theme.text, textShadow: '0px 4px 2px rgba(0, 0, 0, 0.15)' }}
            >
              {feature.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
