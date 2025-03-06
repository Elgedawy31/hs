import React, { useState } from 'react';
import SEO from '../components/SEO';
import ProductFilter from '../components/products/ProductFilter';
import ProductList from '../components/products/ProductList';
import ProductSort from '../components/products/ProductSort';
import ProductTags from '../components/products/ProductTags';
import UniPagination from '../components/UniPagination';

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: 'Body Firming Solution',
    category: 'Moisturizer',
    description: 'Activate, tone, and glow - the skincare essential you need',
    image: '/src/assets/Images/products-1.svg',
    rating: 4,
    price: 650
  },
  {
    id: 2,
    name: 'Body Firming Solution',
    category: 'Toner',
    description: 'Deep hydration with advanced peptide complex',
    image: '/src/assets/Images/products-2.svg',
    rating: 5,
    price: 300
  },
  {
    id: 3,
    name: 'Hydrating Toner',
    category: 'Toner',
    description: 'Clean, fresh, and refresh - gentle care for sensitive skin',
    image: '/src/assets/Images/products-3.svg',
    rating: 5,
    price: 700
  },
  {
    id: 4,
    name: 'Colloidal Oatmeal Cream',
    category: 'Serum',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-1.svg',
    rating: 4,
    price: 580
  },
  {
    id: 5,
    name: 'Psoralen-Based Cream',
    category: 'Serum',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-2.svg',
    rating: 4,
    price: 430
  },
  {
    id: 6,
    name: 'Acne Spot Treatment',
    category: 'SunScreen',
    description: 'Fast-acting blemish solution',
    image: '/src/assets/Images/products-3.svg',
    rating: 3,
    price: 1000
  },
  {
    id: 7,
    name: 'Cooling Anti-Itch Spray',
    category: 'Moisturizer',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-1.svg',
    rating: 3,
    price: 290
  },
  {
    id: 8,
    name: 'Ginkgo Biloba Extract',
    category: 'Cleanser',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-2.svg',
    rating: 3,
    price: 800
  },
  {
    id: 9,
    name: 'Coconut Oil with Turmeric',
    category: 'Cleanser',
    description: 'nourishing cream for extremely dry & sensitive skin',
    image: '/src/assets/Images/products-3.svg',
    rating: 3,
    price: 400
  }
];

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTags, setActiveTags] = useState(['Oily', 'Cleanser', 'Vitiligo']);
  
  const handleRemoveTag = (tagToRemove) => {
    setActiveTags(activeTags.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title="HS - Healthcare Solutions - Products"
        description="HS provides innovative healthcare solutions and products to improve your health and wellbeing."
        keywords="healthcare, medical solutions, health products, doctors, wellness"
        ogImage="/src/assets/Images/logo.svg"
      />
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar with filters - hidden on mobile by default */}
        <div className="lg:w-1/4 w-full">
          <ProductFilter />
        </div>
        
        {/* Main content */}
        <div className="lg:w-3/4 w-full">
          <ProductSort />
          
          <ProductTags 
            tags={activeTags} 
            onRemoveTag={handleRemoveTag} 
          />
          
          <ProductList products={sampleProducts} />
          
          <UniPagination 
            currentPage={currentPage}
            totalPages={3}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
