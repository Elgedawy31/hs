import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

const ProductCard = ({ product }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4"
            fill={i < rating ? theme.primary : "none"}
            stroke={theme.primary}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{ 
        backgroundColor: theme.background,
        borderColor: theme.borderColor
      }}
      onClick={() => navigate(`${product.id}`)}
    >
      <div className="relative">
        <img  draggable="false"
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span 
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ 
              backgroundColor: theme.primary,
              color: '#FFFFFF' 
            }}
          >
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 
          className="text-center font-semibold text-lg mb-1" 
          style={{ color: theme.primary }}
        >
          {product.name}
        </h3>
        
        <p 
          className="text-center text-sm mb-3"
          style={{ color: theme.placeholderText }}
        >
          {product.description}
        </p>
        
        <div className="flex justify-center mb-3">
          {renderStars(product.rating)}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            {product.discountedPrice ? (
              <>
                <span 
                  className="font-bold" 
                  style={{ color: theme.primary }}
                >
                  {product.discountedPrice} LE
                </span>
                <div className="flex items-center gap-1">
                  <span 
                    className="text-xs line-through text-gray-500"
                  >
                    {product.price} LE
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-1.5 py-0.5 rounded">
                    -{product.discount}
                  </span>
                </div>
              </>
            ) : (
              <span 
                className="font-bold" 
                style={{ color: theme.primary }}
              >
                {product.price} LE
              </span>
            )}
          </div>
          
          <button
            className="px-4 py-1 rounded text-sm flex items-center"
            style={{ 
              backgroundColor: theme.primary,
              color: '#FFFFFF'
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when clicking the button
              dispatch(addToCart(product));
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
