import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div 
      className="rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
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
          <div className="absolute top-3 left-3">
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
        
        <div className="flex items-center gap-2 mb-2">
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
      </div>
    </div>
  );
};

export default ProductCard;
