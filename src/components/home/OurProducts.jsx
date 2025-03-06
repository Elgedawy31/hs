import React from 'react';
import UniHeading from '../UniHeading';
import { useTheme } from '../../contexts/ThemeContext';

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
      reviews: 24
    },
    {
      id: 2,
      image: product2,
      name: 'Niacinamide Serum',
      price: '700 LE',
      reviews: 24
    },
    {
      id: 3,
      image: product3,
      name: 'Salicylic Acid Cleanser',
      price: '450 LE',
      reviews: 24
    }
  ];

  // Function to render stars using Lucide React
  const renderStars = (count) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={18} 
        fill={index < 4 ? "#FFD700" : "none"} 
        color={index < 4 ? "#FFD700" : "#D1D5DB"}
      />
    ));
  };

  return (
    <section className=" px-4">
      <UniHeading title="Boost Your Skin With Our Products" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col">
            <div className="mb-4">
              <img 
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
        ))}
      </div>
    </section>
  );
}

export default OurProducts;
