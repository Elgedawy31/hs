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
            className="px-2 py-1 rounded-md flex items-center justify-center gap-1 text-white text-xs font-medium transition-colors duration-200 hover:opacity-90 relative overflow-hidden"
            style={{ backgroundColor: theme.primary, minWidth: '50px', height: '24px' }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCart(product));
              console.log('Added to cart:', product.name);
              
              // Animation is handled by framer-motion variants
              setIsAnimating(true);
              
              // Reset after animation completes
              setTimeout(() => {
                setIsAnimating(false);
              }, 1000); // Match this with the animation duration
            }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isAnimating ? (
                <motion.div
                  key="animating"
                  className="flex items-center justify-center w-full h-full absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ 
                      scale: [0.5, 1.2, 1],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 0.5,
                      times: [0, 0.6, 1]
                    }}
                  >
                    <ShoppingCart className="w-3 h-3" />
                  </motion.div>
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
                  <ShoppingCart className="w-3 h-3" />
                  <span>Add</span>
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
