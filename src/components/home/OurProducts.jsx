import React from 'react';
import UniHeading from '../UniHeading';
import { useTheme } from '../../contexts/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from '../products/ProductCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../home/CanDo.css';

// Import product images
import product1 from '../../assets/Images/products-1.svg';
import product2 from '../../assets/Images/products-2.svg';
import product3 from '../../assets/Images/products-3.svg';
import { Star } from 'lucide-react';

function OurProducts() {
  const { theme } = useTheme();

  const products = [
    {
      id: 1,
      image: product1,
      name: 'Niacinamide Serum',
      price: '370 LE',
      category: 'Skin Care',
      rating: '4.8',
      discount: '15%',
      discountedPrice: '314 LE'
    },
    {
      id: 2,
      image: product2,
      name: 'Niacinamide Serum',
      price: '700 LE',
      category: 'Skin Care',
      rating: '4.7'
    },
    {
      id: 3,
      image: product3,
      name: 'Salicylic Acid Cleanser',
      price: '450 LE',
      category: 'Cleansers',
      rating: '4.9'
    },
    {
      id: 4,
      image: product2,
      name: 'Niacinamide Serum',
      price: '700 LE',
      category: 'Skin Care',
      rating: '4.7'
    },
    {
      id: 5,
      image: product1,
      name: 'Niacinamide Serum',
      price: '370 LE',
      category: 'Skin Care',
      rating: '4.8',
      discount: '10%',
      discountedPrice: '333 LE'
    },
  ];
  const renderStars = (count) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={18} 
        fill={index < 4 ? theme.primary : "none"} 
        color={index < 4 ? theme.primary : theme.background}
      />
    ));
  };
  return (
    <section className="py-16 px-4 relative">
      <UniHeading title="Boost Your Skin With Our Products" />
      
      <div className="mt-8 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          initialSlide={0}
          loop={true}
          navigation={{
            nextEl: '.products-button-next',
            prevEl: '.products-button-prev',
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
          className="cando-swiper products-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
                <div key={product.id} className="flex flex-col">
            <div className="mb-4">
              <img  draggable="false" 
                src={product.image} 
                alt={product.name} 
                className="w-full h-[350px] object-cover"
              />
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h3 
                  className="text-xl font-medium"
                  style={{ 
                    color: theme.text,
                    fontFamily: 'Montaga, serif'
                  }}
                >
                  {product.name}
                </h3>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {renderStars(4)}
                  </div>
                  <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <p 
                  className="text-xl font-bold"
                  style={{ color: theme.text }}
                >
                  {product.price}
                </p>
                <button 
                  className="mt-2 px-4 py-1 text-sm rounded text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom navigation arrows */}
        <div className="products-button-prev swiper-button-prev !absolute !left-2 md:!left-4 top-1/2 transform -translate-y-1/2 z-10">
          <svg className="transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.background} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
        <div className="products-button-next swiper-button-next !absolute !right-2 md:!right-4 top-1/2 transform -translate-y-1/2 z-10">
          <svg className="transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.background} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default OurProducts;
