import React from 'react';
import UniHeading from '../UniHeading';
import { useTheme } from '../../contexts/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './CanDo.css';

// Import images
import canDo1 from '../../assets/Images/can-do-1.svg';
import canDo2 from '../../assets/Images/can-do-2.svg';
import canDo3 from '../../assets/Images/can-do-3.svg';

function CanDo() {
  const { theme } = useTheme();

  const services = [
    {
      id: 1,
      image: canDo1,
      description: <>Advanced treatments for <br /> eczema and skin allergies</>
    },
    {
      id: 2,
      image: canDo2,
      description: <> Innovative solutions for <br /> vitiligo management and treatment</>
    },
    {
      id: 3,
      image: canDo3,
      description: <>Expert care for <br /> psoriasis and skin infections</>
    },
    {
      id: 4,
      image: canDo2,
      description: <>Specialized treatment for <br /> acne and rosacea</>
    },
    {
      id: 1,
      image: canDo1,
      description: <>Advanced treatments for <br /> eczema and skin allergies</>
    },
  ];

  return (
    <section className="py-16 px-4 relative">
      <UniHeading title="What We Can Do For You" />

      <div className="mt-8 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          initialSlide={0}
          loop={true}
          navigation={{
            nextEl: '.cando-button-next',
            prevEl: '.cando-button-prev',
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
          className="cando-swiper"
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <div className="flex flex-col">
                <div className="overflow-hidden mb-4">
                  <img draggable="false"
                    src={service.image}
                    alt={service.description}
                    className="w-full h-[350px] object-cover"
                  />
                </div>
                <p
                  className="text-xl"
                  style={{
                    color: theme.placeholderText,
                    fontFamily: 'Montaga, serif'
                  }}
                >
                  {service.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom navigation arrows */}
        <div className="cando-button-prev swiper-button-prev !absolute !left-2 md:!left-4 top-1/2 transform -translate-y-1/2 z-10">
          <svg className="transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.background} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
        <div className="cando-button-next swiper-button-next !absolute !right-2 md:!right-4 top-1/2 transform -translate-y-1/2 z-10">
          <svg className="transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.background} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default CanDo;
