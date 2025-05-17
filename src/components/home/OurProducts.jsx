import React, { useState } from 'react';
import UniHeading from '../UniHeading';
import { useTheme } from '../../contexts/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from '../products/ProductCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../home/CanDo.css';

// Import product images
import product1 from '../../assets/Images/products-1.svg';
import product2 from '../../assets/Images/products-2.svg';
import product3 from '../../assets/Images/products-3.svg';
import { Star, ShoppingCart } from 'lucide-react';

function OurProducts() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [animatingItems, setAnimatingItems] = useState({});

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
            1024: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 25
            }
           
          }}
          className="cando-swiper products-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
                <div key={product.id} className="flex flex-col card-shadow card-radius">
            <div className="mb-4">
              <img  draggable="false" 
                src={product.image} 
                alt={product.name} 
                className="w-full h-[350px] object-cover card-radius "
              />
            </div>
            
            <div className="flex justify-between items-start p-3">
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
                <motion.button
                   className="h-6 rounded-md flex items-center justify-center gap-1 text-white text-xs font-medium relative overflow-hidden"
                  style={{ 
                    backgroundColor: animatingItems[product.id] ? 
                      (animatingItems[product.id] === 'success' ? '#4CAF50' : theme.primary) : 
                      theme.primary,
                    minWidth: '60px'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addToCart(product));
                    console.log('Added to cart:', product.name);
                    
                    // Start animation sequence
                    setAnimatingItems(prev => ({
                      ...prev,
                      [product.id]: 'animating'
                    }));
                    
                    // Change to success state after cart animation
                    setTimeout(() => {
                      setAnimatingItems(prev => ({
                        ...prev,
                        [product.id]: 'success'
                      }));
                    }, 600);
                    
                    // Reset after all animations complete
                    setTimeout(() => {
                      setAnimatingItems(prev => {
                        const newState = {...prev};
                        delete newState[product.id];
                        return newState;
                      });
                    }, 1500);
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    backgroundColor: { duration: 0.3 },
                    scale: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  {/* Ripple effect */}
                  {animatingItems[product.id] && (
                    <motion.div
                      className="absolute inset-0 bg-white rounded-full"
                      initial={{ scale: 0, opacity: 0.3 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                  
                  <AnimatePresence mode="wait">
                    {animatingItems[product.id] === 'animating' ? (
                      <motion.div
                        key="animating"
                        className="flex items-center justify-center w-full h-full absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          initial={{ scale: 0.5, y: 0 }}
                          animate={{ 
                            scale: [0.5, 1.3, 1],
                            rotate: [0, 15, -10, 0],
                            y: [0, -3, 0]
                          }}
                          transition={{ 
                            duration: 0.6,
                            times: [0, 0.4, 0.8, 1],
                            ease: "easeInOut"
                          }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </motion.div>
                      </motion.div>
                    ) : animatingItems[product.id] === 'success' ? (
                      <motion.div
                        key="success"
                        className="flex items-center justify-center w-full h-full absolute inset-0"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <path d="M20 6L9 17L4 12" />
                        </motion.svg>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        className="flex items-center justify-center gap-1 w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                        </motion.div>
                        <motion.span
                          initial={{ y: 0 }}
                          whileHover={{ y: [0, -2, 0], transition: { duration: 0.3, times: [0, 0.5, 1] } }}
                        >
                          Add
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
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
