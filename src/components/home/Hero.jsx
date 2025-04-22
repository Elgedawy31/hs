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
  // Hero images array
  const heroImages = [
    {
      id: 1,
      image: hero1,
      alt: "Skin treatment procedure"
    },
    {
      id: 2,
      image: hero2,
      alt: "Dermatology examination"
    }
  ];
  
  return (
    <div className="py-2 md:py-4">
      {/* Hero Images Swiper */}
      <div className="mb-6 relative">
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
          {heroImages.map((item) => (
            <SwiperSlide key={item.id}>
              <img draggable="false" 
                src={item.image} 
                alt={item.alt} 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom navigation arrows */}
        <div className="hero-button-prev swiper-button-prev !absolute !left-2 md:!left-4 top-1/2 transform -translate-y-1/2 z-10">
          <svg className="transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.background} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
        <div className="hero-button-next swiper-button-next !absolute !right-2 md:!right-4 top-1/2 transform -translate-y-1/2 z-10">
          <svg className="transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.background} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>

      
      {/* Hero title */}
      <div className="max-w-3xl mx-auto mb-6">
        <p 
          className="text-center text-lg md:text-2xl"
          style={{ color: theme.text ,
            fontFamily: 'Montaga, serif'

           }}
        >
        Glow with Confidence , Your  Skin is our care
        </p>
      </div>
      
      {/* Hero Description */}
      <div className="max-w-3xl mx-auto mb-12">
        <p 
          className="text-center text-sm md:text-lg"
          style={{ color: theme.placeholderText ,
            fontFamily: 'Montaga, serif'

          }}
        >
          At Dermatology Clinic , we believe that healthy skin is the key to
          confidence. Our expert dermatologists provide advanced treatments
          and personalized care to help you achieve radiant, flawless skin.
        </p>
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
              className="text-lg font-semibold"
              style={{ color: theme.text, textShadow: '0px 8px 4px rgba(0, 0, 0, 0.25)' }}
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
