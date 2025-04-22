import React from 'react';
import UniHeading from '../UniHeading';
import { useTheme } from '../../contexts/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../home/CanDo.css';

// Import doctor images
import doctor1 from '../../assets/Images/doctor-1.svg';
import doctor2 from '../../assets/Images/doctor-2.svg';
import doctor3 from '../../assets/Images/doctor-3.svg';

function Doctors() {
  const { theme } = useTheme();

  const doctors = [
    {
      id: 1,
      image: doctor1,
      name: 'Dr. Malak Mohamed',
      description: 'A highly experienced dermatologist specializing in advanced skin treatments, providing personalized care for every patient.'
    },
    {
      id: 2,
      image: doctor2,
      name: 'Dr. Karim Salah',
      description: 'Known for expertise in diagnosing and treating complex skin conditions with the latest medical innovations.'
    },
    {
      id: 3,
      image: doctor3,
      name: 'Dr. Hana Magdy',
      description: 'Brings years of expertise in medical and cosmetic dermatology to provide exceptional care.'
    },
    {
      id: 2,
      image: doctor2,
      name: 'Dr. Karim Salah',
      description: 'Known for expertise in diagnosing and treating complex skin conditions with the latest medical innovations.'
    },
    {
      id: 1,
      image: doctor1,
      name: 'Dr. Malak Mohamed',
      description: 'A highly experienced dermatologist specializing in advanced skin treatments, providing personalized care for every patient.'
    },
  ];

  return (
    <section className="py-16 px-4 relative">
      <UniHeading title="Expert Dermatologists" />
      
      <div className="mt-8 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          initialSlide={0}
          loop={true}
          navigation={{
            nextEl: '.doctors-button-next',
            prevEl: '.doctors-button-prev',
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true
          }}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 4,
              spaceBetween: 20
            }
          }}
          className="cando-swiper doctors-swiper"
        >
          {doctors.map((doctor) => (
            <SwiperSlide key={doctor.id}>
              <div className="flex flex-col">
                <div className="mb-4">
                  <img draggable="false" 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-[350px] object-cover"
                  />
                </div>
                
                <h3 
                  className="text-2xl font-medium mb-2"
                  style={{ 
                    color: theme.text,
                    fontFamily: 'Montaga, serif'
                  }}
                >
                  {doctor.name}
                </h3>
                
                <p 
                  className="text-base mb-4 line-clamp-2" 
                  style={{ color: theme.text }}
                >
                  {doctor.description}
                </p>
                
                <button 
                  className="mt-auto py-2 px-6 rounded-md shadow-md w-full text-center"
                  style={{ 
                    backgroundColor: theme.altPrimary,
                    color: theme.text,
                    border: `1px solid ${theme.borderColor}`
                  }}
                >
                  View Profile
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom navigation arrows */}
        <div className="doctors-button-prev swiper-button-prev !absolute !left-2 md:!left-4 top-1/2 transform -translate-y-1/2 z-10">
          <svg className="transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.background} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
        <div className="doctors-button-next swiper-button-next !absolute !right-2 md:!right-4 top-1/2 transform -translate-y-1/2 z-10">
          <svg className="transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.background} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Doctors;
