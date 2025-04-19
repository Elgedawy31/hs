import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function ProdcutDetails() {
  const { theme } = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: id,
    name: 'Psoralen-Based Cream',
    price: '430 LE',
    discountedPrice: '350 LE',
    discount: '19%',
    rating: 4,
    image: '/src/assets/Images/products-1.svg',
    description: 'Psoralen-based cream enhances skin sensitivity to UV light, aiding in conditions like psoriasis and vitiligo. It promotes pigmentation and reduces abnormal cell growth. Always use under medical supervision to avoid side effects.',
    features: [
      'Dermatologist tested and approved',
      'Suitable for all skin types',
      'Free from parabens and artificial fragrances'
    ],
    expertRecommendation: {
      name: 'Dr. Alejandro Gómez',
      image: '/src/assets/Images/doctor-1.svg',
      quote: 'This serum represents a breakthrough in hydration technology. Its molecular structure allows for deeper penetration,providing lasting moisture and visible results.'
    },
    keyBenefits: [
      'Reduces fine lines and wrinkles, Improves skin elasticity',
      'Enhances collagen production',
      'Provides deep hydration'
    ],
    ingredients: [
      'Hyaluronic Acid, Peptide Complex, Vitamin C',
      'Niacinamide, Plant Stem Cells',
      'Natural Extracts'
    ],
    howToUse: 'Apply 2-3 drops to clean, dry skin morning and evening. Gently pat into skin and follow with moisturizer.',
    relatedProducts: [
      {
        id: 2,
        name: 'Botanical Skin Essence',
        price: '1000 LE',
        discountedPrice: '850 LE',
        discount: '15%',
        image: '/src/assets/Images/products-2.svg'
      },
      {
        id: 3,
        name: 'Radiance Facial Oil',
        price: '760 LE',
        discountedPrice: '599 LE',
        discount: '21%',
        image: '/src/assets/Images/products-3.svg'
      },
      {
        id: 4,
        name: 'Golden Elixir Serum',
        price: '290 LE',
        discountedPrice: '232 LE',
        discount: '20%',
        image: '/src/assets/Images/products-1.svg'
      },
      {
        id: 5,
        name: 'Hydrating Glow Serum',
        price: '1280 LE',
        discountedPrice: '999 LE',
        discount: '22%',
        image: '/src/assets/Images/products-2.svg'
      }
    ]
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5"
            fill={i < rating ? theme.primary : "none"}
            stroke={theme.primary}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title={`HS - ${product.name}`}
        description={product.description}
        keywords="skincare, dermatology, cream, treatment"
        ogImage={product.image}
      />
      
      {/* Product Details Card */}
      <div className="rounded-lg overflow-hidden shadow-sm mb-8" style={{ backgroundColor: theme.body }}>
        <div className="flex flex-col md:flex-row p-6">
          {/* Product Image */}
          <div className="md:w-1/2 lg:w-2/5 mb-6 md:mb-0">
            <div className="bg-[#d9e6f2] rounded-lg overflow-hidden flex items-center justify-center p-4">
              <img  draggable="false" 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2 lg:w-3/5 md:pl-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>
              {product.name}
            </h1>
            
            <div className="mb-2">
              {renderStars(product.rating)}
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <p className="text-lg font-semibold" style={{ color: theme.primary }}>
                {product.discountedPrice}
              </p>
              <p className="text-sm line-through text-gray-500">
                {product.price}
              </p>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                -{product.discount}
              </span>
            </div>
            
            <p className="mb-6 text-sm" style={{ color: theme.text }}>
              {product.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                className="px-8 py-3 rounded-md font-medium text-white"
                style={{ backgroundColor: theme.primary }}
                onClick={() => dispatch(addToCart(product))}
              >
                Add To Cart
              </button>
              
              <button
                className="px-8 py-3 rounded-md font-medium border"
                style={{ 
                  borderColor: theme.primary,
                  color: theme.primary
                }}
              >
                Buy Now
              </button>
            </div>
            
            <div className="space-y-3">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: theme.primary }}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm" style={{ color: theme.text }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Expert Recommendation */}
      <div className="rounded-lg overflow-hidden shadow-sm mb-8 p-6" style={{ backgroundColor: theme.body }}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0 flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img  draggable="false" 
                src={product.expertRecommendation.image} 
                alt={product.expertRecommendation.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-3/4 md:pl-6 text-center md:text-left">
            <h2 className="text-xl font-bold mb-3" style={{ color: theme.text }}>
              Expert Recommendation
            </h2>
            
            <p className="italic mb-3 text-sm" style={{ color: theme.text }}>
              "{product.expertRecommendation.quote}"
            </p>
            
            <p className="font-medium" style={{ color: theme.primary }}>
              {product.expertRecommendation.name}
            </p>
          </div>
        </div>
      </div>
      
      {/* Product Information Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Key Benefits */}
        <div className="rounded-lg p-6 text-center" style={{ backgroundColor: theme.body }}>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 22h5a2 2 0 0 0 2-2v-7.5L14 6v16z"/>
                <path d="M9 16h1v6H9z"/>
                <path d="M5 16h1v6H5z"/>
                <path d="M1 16h1v6H1z"/>
                <path d="M4.5 16a3.5 3.5 0 0 1 0-7h5a3.5 3.5 0 0 0 0-7H6"/>
              </svg>
            </div>
          </div>
          
          <h3 className="text-lg font-bold mb-3" style={{ color: theme.text }}>
            Key Benefits
          </h3>
          
          <div className="space-y-2 text-sm" style={{ color: theme.text }}>
            {product.keyBenefits.map((benefit, index) => (
              <p key={index}>{benefit}</p>
            ))}
          </div>
        </div>
        
        {/* Ingredients */}
        <div className="rounded-lg p-6 text-center" style={{ backgroundColor: theme.body }}>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/>
                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>
                <path d="M18 12a2 2 0 0 0 0 4h2v-4h-2z"/>
              </svg>
            </div>
          </div>
          
          <h3 className="text-lg font-bold mb-3" style={{ color: theme.text }}>
            Ingredients
          </h3>
          
          <div className="space-y-2 text-sm" style={{ color: theme.text }}>
            {product.ingredients.map((ingredient, index) => (
              <p key={index}>{ingredient}</p>
            ))}
          </div>
        </div>
        
        {/* How To Use */}
        <div className="rounded-lg p-6 text-center" style={{ backgroundColor: theme.body }}>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
          </div>
          
          <h3 className="text-lg font-bold mb-3" style={{ color: theme.text }}>
            How To Use
          </h3>
          
          <div className="text-sm" style={{ color: theme.text }}>
            <p>{product.howToUse}</p>
          </div>
        </div>
      </div>
      
      {/* You May Also Like */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: theme.text }}>
          You May Also Like
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <div 
              key={relatedProduct.id}
              className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: theme.background }}
            >
              <div className="p-4">
                <img  draggable="false" 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name} 
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                
                <h3 className="font-medium mb-2 text-center" style={{ color: theme.text }}>
                  {relatedProduct.name}
                </h3>
                
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <p className="font-semibold" style={{ color: theme.primary }}>
                    {relatedProduct.discountedPrice}
                  </p>
                  <p className="text-xs line-through text-gray-500">
                    {relatedProduct.price}
                  </p>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                    -{relatedProduct.discount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProdcutDetails;
