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
import { Microscope, UserCheck, Heart, Award } from 'lucide-react';
import UniHeading from '../UniHeading';

function Hero() {
  const { theme } = useTheme();
  
  // Features data array
  const features = [
    {
      id: 1,
      title: "Experienced Dermatologist",
      description: "Board-certified specialists with extensive expertise in skin health and treatment.",
      icon: <UserCheck size={48} strokeWidth={1.5} />
    },
    {
      id: 2,
      title: "Advanced Technology",
      description: "Cutting-edge devices for safe and effective treatments.",
      icon: <Microscope size={48} strokeWidth={1.5} />
    },
    {
      id: 3,
      title: "Personalized Treatment",
      description: "Customized care plans tailored to your unique skin needs and concerns.",
      icon: <Heart size={48} strokeWidth={1.5} />
    },
    {
      id: 4,
      title: "10+ Years Experience",
      description: "Proven track record of successful treatments and satisfied patients.",
      icon: <Award size={48} strokeWidth={1.5} />
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
    <div className="py-2 md:py-4 mt-10">
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
                <div className="relative overflow-hidden card-radius card-shadow">
                  {/* Base image */}
                  <img 
                    draggable="false" 
                    src={slide.image} 
                    alt={slide.alt} 
                    className="w-full h-auto card-radius"
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
      
      {/* Features Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature) => (
          <div 
            key={feature.id} 
            className="group relative  rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border "
            style={{ 
              borderColor: theme.borderColor
            }}
          >
            {/* Icon Container */}
            <div className="flex justify-center mb-6">
              <div 
                className="p-4 rounded-full transition-all duration-300 group-hover:scale-110"
                style={{ 
                  backgroundColor: `${theme.primary}15`,
                  color: theme.primary 
                }}
              >
                {feature.icon}
              </div>
            </div>
            
            {/* Title */}
            <h3 
              className="text-xl font-bold text-center mb-4 transition-colors duration-300"
              style={{ 
                color: theme.text,
                fontFamily: 'Montaga, serif'
              }}
            >
              {feature.title}
            </h3>
            
            {/* Description */}
            <p 
              className="text-center text-sm leading-relaxed transition-colors duration-300"
              style={{ 
                color: theme.text === '#000000' ? '#6b7280' : '#8b949e',
                lineHeight: '1.6'
              }}
            >
              {feature.description}
            </p>
            
            {/* Hover Effect Overlay */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
              style={{ backgroundColor: theme.primary }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
