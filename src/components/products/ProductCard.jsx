import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div 
      className="rounded-lg overflow-hidden cursor-pointer transition-transform duration-300  card-radius card-shadow  hover:-translate-y-1"
      style={{ backgroundColor: theme.background }}
      onClick={() => navigate(`${product.id}`)}
    >
      <div className="relative">
        <img draggable="false"
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover rounded-lg"
        />
        {product.discount && (
          <div className="absolute top-3 left-3" data-aos="zoom-in" data-aos-duration="600">
            <span 
              className="text-xs font-medium px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: theme.primary }}
            >
              {product.discount} off
            </span>
          </div>
        )}
      </div>
      
      <div className="pt-2 px-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-placeholderText">{product.category}</span>
          <div className="flex items-center">
            <Star className="w-4 h-4" fill={theme.primary} stroke={theme.primary} />
            <span className="ml-1 text-sm font-medium" style={{ color: theme.text }}>
              {product.rating}
            </span>
          </div>
        </div>
        
        <h3 
          className="text-base font-semibold mt-1 mb-1 line-clamp-1"
          style={{ color: theme.text }}
        >
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span 
              className="text-base font-bold"
              style={{ color: theme.primary }}
            >
              {product.discountedPrice || product.price}
            </span>
            {product.discountedPrice && (
              <span className="text-sm line-through text-placeholderText">
                {product.price}
              </span>
            )}
          </div>
          
          <motion.button
            className="px-2 py-1 rounded-md flex items-center justify-center gap-1 text-white text-xs font-medium relative overflow-hidden"
            style={{ 
              backgroundColor: isAnimating ? 
                (isAnimating === 'success' ? '#4CAF50' : theme.primary) : 
                theme.primary, 
              minWidth: '50px', 
              height: '24px' 
            }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart(product));
              console.log('Added to cart:', product.name);
              
              // Start animation sequence
              setIsAnimating('animating');
              
              // Change to success state after cart animation
              setTimeout(() => {
                setIsAnimating('success');
              }, 600);
              
              // Reset after all animations complete
              setTimeout(() => {
                setIsAnimating(false);
              }, 1500);
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              backgroundColor: { duration: 0.3 },
              scale: { type: "spring", stiffness: 400, damping: 10 }
            }}
          >
            {/* Ripple effect */}
            {isAnimating && (
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                initial={{ scale: 0, opacity: 0.3 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            )}
            
            <AnimatePresence mode="wait">
              {isAnimating === 'animating' ? (
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
                    <ShoppingCart className="w-3 h-3" />
                  </motion.div>
                </motion.div>
              ) : isAnimating === 'success' ? (
                <motion.div
                  key="success"
                  className="flex items-center justify-center w-full h-full absolute inset-0"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.svg
                    width="14"
                    height="14"
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
                    <ShoppingCart className="w-3 h-3" />
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
  );
};

export default ProductCard;
